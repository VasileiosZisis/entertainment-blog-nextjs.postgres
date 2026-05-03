"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCategoryPath } from "./categories";
import { createUniquePostSlug } from "./slug";
import {
  getPostFields,
  getPostImageFile,
  type PostFormState,
  validatePostImage,
} from "./admin-validation";
import {
  deleteCloudinaryImage,
  uploadBlogImage,
} from "@/lib/cloudinary/images";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export async function createPostAction(
  _previousState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  await requireAdmin();

  const fields = getPostFields(formData);
  const image = getPostImageFile(formData);
  const imageErrors = validatePostImage(image, { required: true });

  if (!fields.success || imageErrors) {
    return {
      errors: {
        ...(!fields.success ? fields.errors : {}),
        ...(imageErrors ? { image: imageErrors } : {}),
      },
    };
  }

  if (!image) {
    return { errors: { image: ["Image is required."] } };
  }

  let uploadedImage: Awaited<ReturnType<typeof uploadBlogImage>> | null = null;

  try {
    uploadedImage = await uploadBlogImage(image);
  } catch {
    return { errors: { image: ["Image upload failed."] } };
  }

  try {
    const slug = await createUniquePostSlug(fields.data.title);

    const post = await prisma.blogPost.create({
      data: {
        title: fields.data.title,
        subtitle: fields.data.subtitle,
        slug,
        category: fields.data.category,
        content: fields.data.sanitizedContent,
        imageUrl: uploadedImage.secureUrl,
        imagePublicId: uploadedImage.publicId,
        imageAlt: fields.data.imageAlt,
        published: fields.data.published,
      },
      select: {
        id: true,
        slug: true,
        category: true,
      },
    });

    revalidatePostPaths({
      slug: post.slug,
      category: post.category,
    });
  } catch {
    await deleteCloudinaryImage(uploadedImage.publicId);

    return {
      errors: {
        form: ["Post could not be saved."],
      },
    };
  }

  redirect("/admin/posts");
}

export async function updatePostAction(
  _previousState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const fields = getPostFields(formData);
  const image = getPostImageFile(formData);
  const imageErrors = validatePostImage(image, { required: false });

  if (!id) {
    return { errors: { form: ["Post id is missing."] } };
  }

  if (!fields.success || imageErrors) {
    return {
      errors: {
        ...(!fields.success ? fields.errors : {}),
        ...(imageErrors ? { image: imageErrors } : {}),
      },
    };
  }

  const existingPost = await prisma.blogPost.findUnique({
    where: { id },
    select: {
      slug: true,
      category: true,
      imagePublicId: true,
      imageUrl: true,
    },
  });

  if (!existingPost) {
    return { errors: { form: ["Post was not found."] } };
  }

  let uploadedImage: Awaited<ReturnType<typeof uploadBlogImage>> | null = null;

  if (image) {
    try {
      uploadedImage = await uploadBlogImage(image);
    } catch {
      return { errors: { image: ["Image upload failed."] } };
    }
  }

  try {
    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: {
        title: fields.data.title,
        subtitle: fields.data.subtitle,
        category: fields.data.category,
        content: fields.data.sanitizedContent,
        imageUrl: uploadedImage?.secureUrl ?? existingPost.imageUrl,
        imagePublicId: uploadedImage?.publicId ?? existingPost.imagePublicId,
        imageAlt: fields.data.imageAlt,
        published: fields.data.published,
      },
      select: {
        slug: true,
        category: true,
      },
    });

    if (uploadedImage) {
      await deleteCloudinaryImage(existingPost.imagePublicId);
    }

    revalidatePostPaths({
      slug: existingPost.slug,
      category: existingPost.category,
    });
    revalidatePostPaths({
      slug: updatedPost.slug,
      category: updatedPost.category,
    });
  } catch {
    if (uploadedImage) {
      await deleteCloudinaryImage(uploadedImage.publicId);
    }

    return {
      errors: {
        form: ["Post could not be updated."],
      },
    };
  }

  redirect(`/admin/posts/${id}/edit?status=saved`);
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");

  if (!id) {
    redirect("/admin/posts");
  }

  const existingPost = await prisma.blogPost.findUnique({
    where: { id },
    select: {
      slug: true,
      category: true,
      imagePublicId: true,
    },
  });

  if (!existingPost) {
    redirect("/admin/posts");
  }

  await prisma.blogPost.delete({
    where: { id },
  });

  await deleteCloudinaryImage(existingPost.imagePublicId);

  revalidatePostPaths({
    slug: existingPost.slug,
    category: existingPost.category,
  });

  redirect("/admin/posts");
}

async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user?.isAdmin) {
    redirect("/login");
  }

  return user;
}

function revalidatePostPaths({
  slug,
  category,
}: {
  slug: string;
  category: Parameters<typeof getCategoryPath>[0];
}) {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath(getCategoryPath(category));
}

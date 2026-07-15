"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  getUpcomingFields,
  getUpcomingImageFile,
  type UpcomingFormState,
  validateUpcomingImage,
} from "./admin-validation";
import {
  deleteCloudinaryImage,
  uploadUpcomingImage,
} from "@/lib/cloudinary/images";
import { requireWritableAdmin } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export async function createUpcomingAction(
  _previousState: UpcomingFormState,
  formData: FormData,
): Promise<UpcomingFormState> {
  await requireWritableAdmin();

  const fields = getUpcomingFields(formData);
  const image = getUpcomingImageFile(formData);
  const imageErrors = validateUpcomingImage(image);

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

  let uploadedImage: Awaited<ReturnType<typeof uploadUpcomingImage>> | null =
    null;

  try {
    uploadedImage = await uploadUpcomingImage(image);
  } catch {
    return { errors: { image: ["Image upload failed."] } };
  }

  try {
    await prisma.upcoming.create({
      data: {
        kind: fields.data.kind,
        subtitle: fields.data.subtitle,
        imageUrl: uploadedImage.secureUrl,
        imagePublicId: uploadedImage.publicId,
        imageAlt: fields.data.imageAlt,
      },
    });

    revalidateUpcomingPaths();
  } catch {
    await deleteCloudinaryImage(uploadedImage.publicId);

    return {
      errors: {
        form: ["Upcoming card could not be saved."],
      },
    };
  }

  redirect("/admin/upcoming");
}

export async function deleteUpcomingAction(formData: FormData) {
  await requireWritableAdmin();

  const id = String(formData.get("id") ?? "");

  if (!id) {
    redirect("/admin/upcoming");
  }

  const existingCard = await prisma.upcoming.findUnique({
    where: { id },
    select: {
      imagePublicId: true,
    },
  });

  if (!existingCard) {
    redirect("/admin/upcoming");
  }

  await prisma.upcoming.delete({
    where: { id },
  });

  await deleteCloudinaryImage(existingCard.imagePublicId);

  revalidateUpcomingPaths();

  redirect("/admin/upcoming");
}

function revalidateUpcomingPaths() {
  revalidatePath("/");
  revalidatePath("/admin/upcoming");
}

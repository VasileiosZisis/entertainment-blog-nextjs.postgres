import { z } from "zod";
import { BlogCategory } from "@/generated/prisma/enums";
import { sanitizeRichText } from "@/lib/sanitize-html";

export const MAX_POST_IMAGE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_POST_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

const categoryValues = [
  BlogCategory.GAME,
  BlogCategory.ANIME,
  BlogCategory.BOOK,
  BlogCategory.TV,
] as const;

export type PostFormField =
  | "title"
  | "subtitle"
  | "category"
  | "content"
  | "image"
  | "imageAlt"
  | "form";

export type PostFormState = {
  errors?: Partial<Record<PostFormField, string[]>>;
};

export const postFieldsSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(80, "Title must be 80 characters or fewer."),
  subtitle: z
    .string()
    .trim()
    .min(3, "Subtitle must be at least 3 characters.")
    .max(140, "Subtitle must be 140 characters or fewer."),
  category: z.enum(categoryValues, {
    error: "Choose a valid category.",
  }),
  content: z.string().trim().min(1, "Content is required."),
  imageAlt: z
    .string()
    .trim()
    .min(8, "Image alt text must be descriptive.")
    .max(180, "Image alt text must be 180 characters or fewer."),
  published: z.boolean(),
});

export type ValidPostFields = z.infer<typeof postFieldsSchema> & {
  sanitizedContent: string;
};

export function getPostFields(formData: FormData) {
  const rawContent = String(formData.get("content") ?? "");
  const sanitizedContent = sanitizeRichText(rawContent);

  const result = postFieldsSchema.safeParse({
    title: String(formData.get("title") ?? ""),
    subtitle: String(formData.get("subtitle") ?? ""),
    category: String(formData.get("category") ?? ""),
    content: stripHtml(sanitizedContent),
    imageAlt: String(formData.get("imageAlt") ?? ""),
    published: formData.get("published") === "on",
  });

  if (!result.success) {
    return {
      success: false as const,
      errors: result.error.flatten().fieldErrors as PostFormState["errors"],
    };
  }

  return {
    success: true as const,
    data: {
      ...result.data,
      sanitizedContent,
    },
  };
}

export function getPostImageFile(formData: FormData) {
  const image = formData.get("image");

  if (!(image instanceof File) || image.size === 0) {
    return null;
  }

  return image;
}

export function validatePostImage(
  image: File | null,
  options: { required: boolean },
) {
  if (!image) {
    if (options.required) {
      return ["Image is required."];
    }

    return null;
  }

  if (!ALLOWED_POST_IMAGE_TYPES.includes(image.type as never)) {
    return ["Image must be a JPEG, PNG, or WebP file."];
  }

  if (image.size > MAX_POST_IMAGE_SIZE) {
    return ["Image must be 5 MB or smaller."];
  }

  return null;
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

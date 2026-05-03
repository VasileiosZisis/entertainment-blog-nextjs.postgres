import { z } from "zod";
import { UPCOMING_KIND_OPTIONS } from "./kinds";

export const MAX_UPCOMING_IMAGE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_UPCOMING_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type UpcomingFormField =
  | "kind"
  | "subtitle"
  | "image"
  | "imageAlt"
  | "form";

export type UpcomingFormState = {
  errors?: Partial<Record<UpcomingFormField, string[]>>;
};

const upcomingFieldsSchema = z.object({
  kind: z.enum(UPCOMING_KIND_OPTIONS, {
    error: "Choose a valid type.",
  }),
  subtitle: z
    .string()
    .trim()
    .min(2, "Subtitle is required.")
    .max(120, "Subtitle must be 120 characters or fewer."),
  imageAlt: z
    .string()
    .trim()
    .min(8, "Image alt text must be descriptive.")
    .max(180, "Image alt text must be 180 characters or fewer."),
});

export function getUpcomingFields(formData: FormData) {
  const result = upcomingFieldsSchema.safeParse({
    kind: String(formData.get("kind") ?? ""),
    subtitle: String(formData.get("subtitle") ?? ""),
    imageAlt: String(formData.get("imageAlt") ?? ""),
  });

  if (!result.success) {
    return {
      success: false as const,
      errors: result.error.flatten().fieldErrors as UpcomingFormState["errors"],
    };
  }

  return {
    success: true as const,
    data: result.data,
  };
}

export function getUpcomingImageFile(formData: FormData) {
  const image = formData.get("image");

  if (!(image instanceof File) || image.size === 0) {
    return null;
  }

  return image;
}

export function validateUpcomingImage(image: File | null) {
  if (!image) {
    return ["Image is required."];
  }

  if (!ALLOWED_UPCOMING_IMAGE_TYPES.includes(image.type as never)) {
    return ["Image must be a JPEG, PNG, or WebP file."];
  }

  if (image.size > MAX_UPCOMING_IMAGE_SIZE) {
    return ["Image must be 5 MB or smaller."];
  }

  return null;
}

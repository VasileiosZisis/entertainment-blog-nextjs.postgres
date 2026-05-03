import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

type UploadedImage = {
  secureUrl: string;
  publicId: string;
};

let configured = false;

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required for Cloudinary uploads.`);
  }

  return value;
}

function configureCloudinary() {
  if (configured) {
    return;
  }

  cloudinary.config({
    cloud_name: getRequiredEnv("CLOUDINARY_CLOUD_NAME"),
    api_key: getRequiredEnv("CLOUDINARY_API_KEY"),
    api_secret: getRequiredEnv("CLOUDINARY_SECRET"),
    secure: true,
  });

  configured = true;
}

async function uploadImage(
  file: File,
  folder: "blog" | "upcoming",
): Promise<UploadedImage> {
  configureCloudinary();

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  const result = (await cloudinary.uploader.upload(dataUri, {
    folder: `quick-and-honest/${folder}`,
    resource_type: "image",
  })) as UploadApiResponse;

  return {
    secureUrl: result.secure_url,
    publicId: result.public_id,
  };
}

export async function uploadBlogImage(file: File): Promise<UploadedImage> {
  return uploadImage(file, "blog");
}

export async function uploadUpcomingImage(file: File): Promise<UploadedImage> {
  return uploadImage(file, "upcoming");
}

export async function deleteCloudinaryImage(publicId: string) {
  if (!publicId) {
    return;
  }

  try {
    configureCloudinary();
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch (error) {
    console.error("Cloudinary cleanup failed", error);
  }
}

import crypto from "node:crypto";

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  uploadPreset: string;
  baseFolder: string;
}

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
}

/** Read Cloudinary environment variables cleanly on the server. */
export function getCloudinaryConfig(): CloudinaryConfig {
  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME?.trim() ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() ||
    "";
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim() || "";
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim() || "";
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET?.trim() || "";
  const baseFolder =
    process.env.CLOUDINARY_UPLOAD_FOLDER?.trim() || "nairsepigeneticwellness";

  return { cloudName, apiKey, apiSecret, uploadPreset, baseFolder };
}

/** Return true when signed (API key + secret) or preset uploads are configured. */
export function isCloudinaryConfigured(): boolean {
  const { cloudName, apiKey, apiSecret, uploadPreset } = getCloudinaryConfig();
  if (!cloudName) return false;
  return Boolean((apiKey && apiSecret) || uploadPreset);
}

function sanitizeSubfolder(subfolder?: string): string {
  if (!subfolder) return "";
  return subfolder
    .replace(/[^a-zA-Z0-9/_-]/g, "")
    .replace(/\/+/g, "/")
    .replace(/^\/|\/$/g, "");
}

/** Sign Cloudinary upload parameters using SHA-1 per Cloudinary Upload API spec. */
function signCloudinaryParams(
  params: Record<string, string | number>,
  apiSecret: string
): string {
  const sorted = Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== "")
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto
    .createHash("sha1")
    .update(`${sorted}${apiSecret}`)
    .digest("hex");
}

/** Validate and upload an image File to Cloudinary via REST Upload API. */
export async function uploadImageToCloudinary(
  file: File,
  options?: { subfolder?: string }
): Promise<CloudinaryUploadResult> {
  const { cloudName, apiKey, apiSecret, uploadPreset, baseFolder } =
    getCloudinaryConfig();

  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env.local."
    );
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type.toLowerCase())) {
    throw new Error(
      `Unsupported file type "${file.type || "unknown"}". Please upload JPG, PNG, WEBP, GIF, or AVIF images.`
    );
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(
      `Image "${file.name}" exceeds the 10MB limit. Please compress it and try again.`
    );
  }

  const cleanSubfolder = sanitizeSubfolder(options?.subfolder);
  const targetFolder = cleanSubfolder
    ? `${baseFolder}/${cleanSubfolder}`
    : baseFolder;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", targetFolder);

  if (apiKey && apiSecret) {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = signCloudinaryParams(
      { folder: targetFolder, timestamp },
      apiSecret
    );
    formData.append("api_key", apiKey);
    formData.append("timestamp", String(timestamp));
    formData.append("signature", signature);
  } else if (uploadPreset) {
    formData.append("upload_preset", uploadPreset);
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${encodeURIComponent(
    cloudName
  )}/image/upload`;

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  const payload = await response.json();

  if (!response.ok || !payload?.secure_url) {
    const remoteMsg =
      payload?.error?.message || `Cloudinary upload failed (${response.status})`;
    throw new Error(remoteMsg);
  }

  return {
    url: payload.secure_url as string,
    publicId: payload.public_id as string,
    width: typeof payload.width === "number" ? payload.width : undefined,
    height: typeof payload.height === "number" ? payload.height : undefined,
    format: typeof payload.format === "string" ? payload.format : undefined,
  };
}

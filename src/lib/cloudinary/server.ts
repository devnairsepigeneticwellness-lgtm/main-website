import crypto from "node:crypto";

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  rootFolder: string;
}

/**
 * Reads Cloudinary configuration from server environment variables.
 * Returns null if any required credential is missing.
 */
export function getCloudinaryConfig(): CloudinaryConfig | null {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim() || "";
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim() || "";
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim() || "";
  const rootFolder =
    process.env.CLOUDINARY_UPLOAD_FOLDER?.trim().replace(/^\/+|\/+$/g, "") ||
    "nairsepigeneticwellness";

  if (!cloudName || !apiKey || !apiSecret) {
    return null;
  }

  return { cloudName, apiKey, apiSecret, rootFolder };
}

export function isCloudinaryConfigured(): boolean {
  return getCloudinaryConfig() !== null;
}

/**
 * Generates SHA-1 signed upload parameters for direct browser-to-Cloudinary uploads.
 */
export function signCloudinaryUpload(
  config: CloudinaryConfig,
  subFolder = "events"
): {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
} {
  const sanitizedSub = subFolder
    .replace(/[^a-zA-Z0-9/_-]/g, "")
    .replace(/\/+/g, "/")
    .replace(/^\/+|\/+$/g, "");

  const folder = sanitizedSub
    ? `${config.rootFolder}/${sanitizedSub}`
    : config.rootFolder;

  const timestamp = Math.floor(Date.now() / 1000);
  // Cloudinary requires parameters sorted alphabetically before hashing + apiSecret
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}${config.apiSecret}`;
  const signature = crypto.createHash("sha1").update(paramsToSign).digest("hex");

  return {
    signature,
    timestamp,
    apiKey: config.apiKey,
    cloudName: config.cloudName,
    folder,
  };
}

/**
 * Extracts the Cloudinary public_id from a secure_url belonging to the configured cloud.
 */
export function extractCloudinaryPublicId(
  imageUrl: string,
  cloudName: string
): string | null {
  try {
    const parsed = new URL(imageUrl);
    if (parsed.hostname !== "res.cloudinary.com") return null;

    const prefix = `/${cloudName}/image/upload/`;
    if (!parsed.pathname.startsWith(prefix)) return null;

    let remainder = parsed.pathname.slice(prefix.length);
    // Strip optional transformation segments before version (`v123456/`)
    const versionMatch = remainder.match(/(?:^|\/)v\d+\/(.+)$/);
    if (versionMatch) {
      remainder = versionMatch[1];
    }

    // Strip file extension to yield public_id
    return remainder.replace(/\.[^/.]+$/, "") || null;
  } catch {
    return null;
  }
}

/**
 * Best-effort deletion of an uploaded asset from Cloudinary when removed from the admin gallery.
 */
export async function destroyCloudinaryImage(imageUrl: string): Promise<void> {
  const config = getCloudinaryConfig();
  if (!config) return;

  const publicId = extractCloudinaryPublicId(imageUrl, config.cloudName);
  if (!publicId) return;

  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}${config.apiSecret}`;
  const signature = crypto.createHash("sha1").update(paramsToSign).digest("hex");

  const body = new URLSearchParams({
    public_id: publicId,
    api_key: config.apiKey,
    timestamp: String(timestamp),
    signature,
  });

  await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/destroy`,
    {
      method: "POST",
      body,
    }
  );
}

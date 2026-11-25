export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  originalFilename: string;
}

interface SignedUploadPayload {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
  error?: string;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

/**
 * Requests a short-lived admin signature and uploads a single image file
 * directly from the browser to Cloudinary.
 */
export async function uploadImageToCloudinary(
  file: File,
  options?: { folder?: string }
): Promise<CloudinaryUploadResult> {
  if (!file.type.startsWith("image/")) {
    throw new Error(`"${file.name}" is not a supported image file.`);
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`"${file.name}" exceeds the 10MB upload limit.`);
  }

  const signRes = await fetch("/api/admin/cloudinary/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder: options?.folder || "events" }),
  });

  const signData = (await signRes.json()) as SignedUploadPayload;
  if (!signRes.ok) {
    throw new Error(
      signData?.error || "Failed to obtain Cloudinary upload signature."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signData.apiKey);
  formData.append("timestamp", String(signData.timestamp));
  formData.append("signature", signData.signature);
  formData.append("folder", signData.folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const uploadJson = await uploadRes.json();
  if (!uploadRes.ok || !uploadJson?.secure_url) {
    const cloudinaryMsg =
      uploadJson?.error?.message || "Cloudinary image upload failed.";
    throw new Error(cloudinaryMsg);
  }

  return {
    url: uploadJson.secure_url as string,
    publicId: uploadJson.public_id as string,
    width: Number(uploadJson.width) || 0,
    height: Number(uploadJson.height) || 0,
    originalFilename: file.name,
  };
}

/**
 * Uploads multiple selected image files sequentially to Cloudinary with progress updates.
 */
export async function uploadMultipleImagesToCloudinary(
  files: FileList | File[],
  options?: {
    folder?: string;
    onProgress?: (current: number, total: number, fileName: string) => void;
  }
): Promise<{
  uploaded: CloudinaryUploadResult[];
  errors: string[];
}> {
  const fileArray = Array.from(files);
  const uploaded: CloudinaryUploadResult[] = [];
  const errors: string[] = [];

  for (let i = 0; i < fileArray.length; i++) {
    const file = fileArray[i];
    options?.onProgress?.(i + 1, fileArray.length, file.name);
    try {
      const result = await uploadImageToCloudinary(file, {
        folder: options?.folder,
      });
      uploaded.push(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : `Failed: ${file.name}`;
      errors.push(msg);
    }
  }

  return { uploaded, errors };
}

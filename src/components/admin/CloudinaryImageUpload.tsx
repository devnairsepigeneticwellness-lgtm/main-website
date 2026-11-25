"use client";

import React, { useRef, useState } from "react";
import { Upload, Loader2, X, AlertCircle, CheckCircle2, Image as ImageIcon } from "lucide-react";

export interface UploadedCloudinaryImage {
  url: string;
  publicId: string;
  originalName: string;
  width?: number;
  height?: number;
  format?: string;
}

/**
 * Client helper that posts image files to /api/admin/upload and returns
 * verified Cloudinary secure URLs.
 */
export async function uploadFilesToCloudinary(
  files: FileList | File[],
  folder = "events"
): Promise<UploadedCloudinaryImage[]> {
  const fileArray = Array.from(files);
  if (fileArray.length === 0) return [];

  const formData = new FormData();
  formData.append("folder", folder);
  for (const file of fileArray) {
    formData.append("files", file);
  }

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || !data?.success) {
    throw new Error(data?.error || "Cloudinary upload failed.");
  }

  return data.uploads as UploadedCloudinaryImage[];
}

interface CloudinarySingleImageFieldProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  placeholder?: string;
  helperText?: string;
}

/**
 * Single-image Cloudinary uploader with live preview, drag-and-drop/file picker,
 * and direct URL fallback for event posters and cover photos.
 */
export function CloudinarySingleImageField({
  label = "Image",
  value,
  onChange,
  folder = "events/posters",
  placeholder = "https://res.cloudinary.com/...",
  helperText = "Upload directly to Cloudinary (JPG, PNG, WEBP up to 10MB) or paste an image URL.",
}: CloudinarySingleImageFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploadedOk, setUploadedOk] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setErrorMsg(null);
    setUploadedOk(false);

    try {
      const uploads = await uploadFilesToCloudinary([files[0]], folder);
      if (uploads[0]?.url) {
        onChange(uploads[0].url);
        setUploadedOk(true);
      }
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to upload image."
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2.5">
      <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider">
        {label}
      </label>

      {/* Upload + URL Input Bar */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => {
            setUploadedOk(false);
            onChange(e.target.value);
          }}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          disabled={isUploading}
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 shrink-0"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo</span>
            </>
          )}
        </button>

        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setUploadedOk(false);
            }}
            title="Clear image"
            className="inline-flex items-center justify-center px-3 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {helperText && (
        <span className="text-[10px] text-[#59675F] block">{helperText}</span>
      )}

      {uploadedOk && (
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>Uploaded to Cloudinary.</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-700 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Live Thumbnail Preview */}
      {value && (
        <div className="relative w-full max-w-xs rounded-2xl overflow-hidden border border-[#B58B50]/30 bg-[#102E27] aspect-video shadow-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Uploaded preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-[#102E27]/85 text-[#DFBD83] text-[10px] font-medium flex items-center gap-1">
            <ImageIcon className="w-3 h-3" />
            <span>Preview</span>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Upload, X, Loader2, AlertCircle, Image as ImageIcon } from "lucide-react";
import { uploadImageToCloudinary } from "@/lib/cloudinary/upload";

interface CloudinaryImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  placeholder?: string;
  helperText?: string;
}

/**
 * Reusable single-image uploader with Cloudinary direct upload, live thumbnail
 * preview, and direct URL fallback input.
 */
export default function CloudinaryImageField({
  label,
  value,
  onChange,
  folder = "events/posters",
  placeholder = "https://res.cloudinary.com/... or any image URL",
  helperText = "Upload an image directly to Cloudinary or paste a hosted image URL.",
}: CloudinaryImageFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage(null);

    try {
      const result = await uploadImageToCloudinary(file, { folder });
      onChange(result.url);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to upload image."
      );
    } finally {
      e.target.value = "";
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2.5">
      <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-start">
        {/* Upload Button / Drop Box */}
        <label className="relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer shrink-0 shadow-xs">
          <input
            type="file"
            accept="image/*"
            disabled={isUploading}
            onChange={handleFileChange}
            className="sr-only"
          />
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>Upload to Cloudinary</span>
            </>
          )}
        </label>

        {/* Direct URL Input */}
        <div className="relative flex-1">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 pr-9 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              title="Clear image URL"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#59675F] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {errorMessage && (
        <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-700 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {value ? (
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F7F5EF] border border-[#E8EDE4]">
          <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-[#102E27] shrink-0 border border-[#B58B50]/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-medium text-[#173D34] block">
              Image Preview Ready
            </span>
            <span className="text-[10px] text-[#59675F] truncate block">
              {value}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-[10px] text-[#59675F] flex items-center gap-1">
          <ImageIcon className="w-3 h-3 text-[#B58B50]" />
          <span>{helperText}</span>
        </p>
      )}
    </div>
  );
}

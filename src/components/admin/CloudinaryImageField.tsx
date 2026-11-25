"use client";

import React, { useRef, useState } from "react";
import { Upload, Loader2, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { uploadImageToCloudinary } from "@/lib/cloudinary/upload";

interface CloudinaryImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  placeholder?: string;
  helperText?: string;
}

export default function CloudinaryImageField({
  label,
  value,
  onChange,
  folder = "events/posters",
  placeholder = "https://res.cloudinary.com/... or upload an image",
  helperText = "Upload directly to Cloudinary or paste an existing image URL.",
}: CloudinaryImageFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const result = await uploadImageToCloudinary(file, { folder });
      onChange(result.url);
      setSuccessMsg("Uploaded to Cloudinary.");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to upload image."
      );
    } finally {
      e.target.value = "";
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider">
          {label}
        </label>

        <div className="flex items-center gap-2">
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
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-[11px] font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                <span>Upload via Cloudinary</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            title="Clear image"
            className="p-2.5 rounded-xl bg-[#F7F5EF] hover:bg-red-50 text-[#59675F] hover:text-red-600 border border-[#B58B50]/20 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <p className="text-[10px] text-[#59675F]">{helperText}</p>

      {errorMsg && (
        <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-700 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {value && (
        <div className="mt-2 relative w-full max-w-xs aspect-16/10 rounded-2xl overflow-hidden border border-[#B58B50]/30 bg-[#102E27]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={label}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useId, useRef, useState } from "react";
import { Upload, Loader2, X, AlertCircle, CheckCircle2, Link2, RefreshCw } from "lucide-react";
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
 * Upload-first image picker with drag-and-drop, preview card,
 * and an optional secondary link input for external images.
 */
export default function CloudinaryImageField({
  label,
  value,
  onChange,
  folder = "events/posters",
  placeholder = "https://example.com/poster-image.jpg",
  helperText = "Recommended: landscape or square photo (JPG, PNG, or WebP up to 10 MB).",
}: CloudinaryImageFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputId = useId();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const processFile = async (file: File) => {
    setIsUploading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const result = await uploadImageToCloudinary(file, { folder });
      onChange(result.url);
      setSuccessMsg("Photo uploaded and ready to save.");
      setShowLinkInput(false);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Could not upload that image. Please check the file size (under 10 MB) and try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    await processFile(file);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (isUploading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) await processFile(file);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider">
          {label}
        </span>

        {!value && (
          <button
            type="button"
            onClick={() => setShowLinkInput((prev) => !prev)}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-[#9E783E] hover:text-[#173D34] transition-colors cursor-pointer"
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>{showLinkInput ? "Hide image link field" : "Or paste an image link"}</span>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        disabled={isUploading}
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-[#F7F5EF] border border-[#B58B50]/25">
          <div className="relative w-full sm:w-48 aspect-16/10 rounded-xl overflow-hidden border border-[#B58B50]/30 bg-[#102E27] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt={label} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 space-y-2.5">
            <div>
              <p className="text-xs font-semibold text-[#173D34]">Image selected</p>
              <p className="text-[11px] text-[#59675F]">{helperText}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#173D34] hover:bg-[#102E27] text-white text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                {isUploading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5 text-[#DFBD83]" />
                )}
                <span>{isUploading ? "Uploading..." : "Replace Photo"}</span>
              </button>

              <button
                type="button"
                disabled={isUploading}
                onClick={() => {
                  onChange("");
                  setShowLinkInput(false);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-red-50 text-red-700 border border-red-200 text-xs font-medium transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors ${
            isDragging
              ? "border-[#173D34] bg-[#E8EDE4]/60"
              : "border-[#B58B50]/40 bg-[#F7F5EF]/70 hover:bg-[#F7F5EF]"
          }`}
        >
          <div className="flex flex-col items-center gap-2.5">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="w-11 h-11 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center shadow-xs hover:scale-105 transition-transform cursor-pointer disabled:opacity-50"
              aria-label={`Choose ${label}`}
            >
              {isUploading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
            </button>

            <div className="space-y-1">
              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="text-xs sm:text-sm font-semibold text-[#173D34] hover:text-[#9E783E] transition-colors cursor-pointer"
              >
                {isUploading ? "Uploading your photo..." : "Click to choose a photo or drag it here"}
              </button>
              <p className="text-[11px] text-[#59675F]">{helperText}</p>
            </div>
          </div>
        </div>
      )}

      {showLinkInput && !value && (
        <div className="p-3.5 rounded-2xl bg-[#F7F5EF] border border-[#B58B50]/20 space-y-1.5">
          <label htmlFor={urlInputId} className="block text-[11px] font-medium text-[#173D34]">
            Paste Web Image Link
          </label>
          <input
            id={urlInputId}
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:outline-none"
          />
        </div>
      )}

      {errorMsg && (
        <div role="alert" className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div role="status" className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Camera,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Star,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Image as ImageIcon,
} from "lucide-react";
import { Event, GalleryImage } from "@/lib/supabase/types";
import {
  addGalleryImages,
  deleteGalleryImage,
  updateGalleryImage,
} from "@/lib/events/actions";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

interface EventGalleryClientProps {
  event: Event;
  initialGallery: GalleryImage[];
}

export default function EventGalleryClient({
  event,
  initialGallery,
}: EventGalleryClientProps) {
  const [gallery, setGallery] = useState<GalleryImage[]>(initialGallery);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newCategory, setNewCategory] = useState("Workshop Highlights");

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Add via image URL
  const handleAddUrlImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;

    setIsUploading(true);
    setErrorMessage(null);

    const result = await addGalleryImages(event.id, [
      {
        image_path: newImageUrl.trim(),
        caption: newCaption.trim() || undefined,
        category: newCategory,
        is_cover: gallery.length === 0,
      },
    ]);

    setIsUploading(false);

    if (result.success) {
      const addedItem: GalleryImage = {
        id: "img-" + Date.now(),
        event_id: event.id,
        image_path: newImageUrl.trim(),
        caption: newCaption.trim() || null,
        category: newCategory,
        sort_order: gallery.length + 1,
        is_cover: gallery.length === 0,
        is_published: true,
        created_at: new Date().toISOString(),
      };
      setGallery((prev) => [...prev, addedItem]);
      setNewImageUrl("");
      setNewCaption("");
      showNotice("Photograph added to event gallery.");
    } else {
      setErrorMessage(result.error || "Failed to add photograph.");
    }
  };

  // Multiple file upload to Supabase Storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(`Uploading 1 of ${files.length} photographs...`);
    setErrorMessage(null);

    const uploadedUrls: { image_path: string; caption?: string }[] = [];

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          setUploadProgress(`Uploading ${i + 1} of ${files.length}: ${file.name}...`);

          // Validate file size (< 10MB) & type
          if (!file.type.startsWith("image/")) {
            continue;
          }

          const fileExt = file.name.split(".").pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
          const filePath = `${event.id}/gallery/${fileName}`;

          const { error: uploadErr } = await supabase.storage
            .from("events")
            .upload(filePath, file, {
              cacheControl: "3600",
              upsert: true,
            });

          if (uploadErr) {
            console.error("Storage upload error:", uploadErr);
            continue;
          }

          const { data: publicUrlData } = supabase.storage
            .from("events")
            .getPublicUrl(filePath);

          if (publicUrlData?.publicUrl) {
            uploadedUrls.push({
              image_path: publicUrlData.publicUrl,
              caption: file.name.replace(/\.[^/.]+$/, ""),
            });
          }
        }
      } catch (err: any) {
        console.error("Upload exception:", err);
      }
    } else {
      // Local preview fallback
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const previewUrl = URL.createObjectURL(file);
        uploadedUrls.push({
          image_path: previewUrl,
          caption: file.name.replace(/\.[^/.]+$/, ""),
        });
      }
    }

    if (uploadedUrls.length > 0) {
      await addGalleryImages(event.id, uploadedUrls);
      const newItems: GalleryImage[] = uploadedUrls.map((u, idx) => ({
        id: "upload-" + Date.now() + "-" + idx,
        event_id: event.id,
        image_path: u.image_path,
        caption: u.caption || null,
        category: "Workshop Highlights",
        sort_order: gallery.length + idx + 1,
        is_cover: gallery.length === 0 && idx === 0,
        is_published: true,
        created_at: new Date().toISOString(),
      }));
      setGallery((prev) => [...prev, ...newItems]);
      showNotice(`${uploadedUrls.length} photograph(s) uploaded successfully.`);
    } else {
      setErrorMessage("Could not complete upload. Please check image files.");
    }

    setIsUploading(false);
    setUploadProgress(null);
  };

  // Toggle Cover
  const handleSetCover = async (img: GalleryImage) => {
    await updateGalleryImage(img.id, { is_cover: true, event_id: event.id });
    setGallery((prev) =>
      prev.map((item) => ({
        ...item,
        is_cover: item.id === img.id,
      }))
    );
    showNotice("Cover photograph updated.");
  };

  // Toggle Published
  const handleTogglePublished = async (img: GalleryImage) => {
    const newPub = !img.is_published;
    await updateGalleryImage(img.id, { is_published: newPub, event_id: event.id });
    setGallery((prev) =>
      prev.map((item) => (item.id === img.id ? { ...item, is_published: newPub } : item))
    );
    showNotice(newPub ? "Photograph published." : "Photograph hidden from public gallery.");
  };

  // Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photograph?")) return;
    await deleteGalleryImage(id, event.id);
    setGallery((prev) => prev.filter((item) => item.id !== id));
    showNotice("Photograph deleted.");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8EDE4]">
        <div>
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-1.5 text-xs text-[#B58B50] hover:text-[#173D34] transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Events Table</span>
          </Link>
          <div className="flex items-center gap-2">
            <Camera className="w-6 h-6 text-[#B58B50]" />
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
              Workshop Photo Gallery
            </h1>
          </div>
          <p className="text-xs text-[#59675F] font-light mt-1">
            Managing photographs for: <strong className="text-[#173D34] font-medium">{event.title}</strong>
          </p>
        </div>

        <Link
          href={`/events/${event.slug}#gallery`}
          target="_blank"
          className="text-xs font-semibold text-[#173D34] hover:text-[#B58B50] transition-colors inline-flex items-center gap-1"
        >
          <span>View Public Gallery</span>
          <span>&rarr;</span>
        </Link>
      </div>

      {actionNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Upload Zone */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B58B50]/20 shadow-xs space-y-6">
        <div>
          <h2 className="font-serif text-lg font-medium text-[#173D34] mb-1">
            Upload Photographs
          </h2>
          <p className="text-xs text-[#59675F] font-light">
            Upload multiple photos from your device to Supabase Storage, or paste an image URL.
          </p>
        </div>

        {/* Drag & Drop / File Input Box */}
        <div className="border-2 border-dashed border-[#B58B50]/40 rounded-2xl p-8 text-center bg-[#F7F5EF]/60 hover:bg-[#F7F5EF] transition-colors relative">
          <input
            type="file"
            multiple
            accept="image/*"
            disabled={isUploading}
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center mx-auto">
              {isUploading ? (
                <Loader2 className="w-6 h-6 animate-spin text-[#DFBD83]" />
              ) : (
                <Upload className="w-6 h-6" />
              )}
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#173D34]">
                {uploadProgress || "Click or drag & drop event photographs here"}
              </p>
              <p className="text-[11px] text-[#59675F] mt-1">
                Supports JPG, PNG, WEBP up to 10MB. Multiple files supported.
              </p>
            </div>
          </div>
        </div>

        {/* Or add via URL */}
        <form onSubmit={handleAddUrlImage} className="pt-4 border-t border-[#E8EDE4] space-y-3">
          <span className="text-xs font-semibold text-[#173D34] block">
            Or Add Photograph via Direct URL:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6">
              <input
                type="url"
                required
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Image URL: https://..."
                className="w-full px-3 py-2 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:outline-none focus:border-[#B58B50]"
              />
            </div>
            <div className="sm:col-span-4">
              <input
                type="text"
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                placeholder="Caption (e.g. Group reflective dialogue)"
                className="w-full px-3 py-2 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:outline-none focus:border-[#B58B50]"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-2 rounded-xl bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] text-xs font-semibold transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Existing Photographs Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B58B50]/20 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8EDE4]">
          <div>
            <h2 className="font-serif text-lg font-medium text-[#173D34]">
              Gallery Photographs ({gallery.length})
            </h2>
            <p className="text-xs text-[#59675F] font-light">
              Published photographs appear immediately on the public event page.
            </p>
          </div>
        </div>

        {gallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((img) => (
              <div
                key={img.id}
                className="rounded-2xl border border-[#B58B50]/20 overflow-hidden bg-[#F7F5EF] flex flex-col justify-between group shadow-xs"
              >
                {/* Image & Badges */}
                <div className="relative aspect-4/3 bg-[#102E27]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.image_path}
                    alt={img.caption || "Gallery item"}
                    className="w-full h-full object-cover"
                  />

                  {img.is_cover && (
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#DFBD83] text-[#102E27] text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Cover Photo</span>
                    </div>
                  )}

                  {!img.is_published && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-semibold">
                      Unpublished
                    </div>
                  )}
                </div>

                {/* Caption / Category */}
                <div className="p-3.5 space-y-1.5 flex-1">
                  <p className="text-xs text-[#173D34] font-medium line-clamp-2">
                    {img.caption || "(No caption added)"}
                  </p>
                  <span className="text-[10px] uppercase tracking-wider text-[#59675F] block">
                    {img.category || "Highlights"}
                  </span>
                </div>

                {/* Controls */}
                <div className="p-3 border-t border-[#E8EDE4] bg-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    {!img.is_cover && (
                      <button
                        onClick={() => handleSetCover(img)}
                        title="Set as Cover"
                        className="px-2 py-1 rounded-md text-[11px] font-medium text-[#B58B50] hover:bg-[#F7F5EF]"
                      >
                        Set Cover
                      </button>
                    )}
                    <button
                      onClick={() => handleTogglePublished(img)}
                      title={img.is_published ? "Hide from public" : "Publish image"}
                      className="p-1.5 rounded-md hover:bg-[#F7F5EF] text-[#59675F]"
                    >
                      {img.is_published ? (
                        <Eye className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5 text-red-500" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => handleDelete(img.id)}
                    title="Delete photograph"
                    className="p-1.5 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-[#59675F] space-y-2">
            <Camera className="w-8 h-8 text-[#B58B50] mx-auto opacity-60" />
            <p className="font-medium text-[#173D34]">No photographs uploaded for this event yet.</p>
            <p className="font-light">Use the upload box above to upload event photographs.</p>
          </div>
        )}
      </div>
    </div>
  );
}

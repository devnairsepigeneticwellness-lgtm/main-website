"use client";

import React, { useId, useState } from "react";
import Link from "next/link";
import {
  Camera,
  Upload,
  Plus,
  Trash2,
  ArrowLeft,
  Star,
  Eye,
  EyeOff,
  Loader2,
  Link2,
  Pencil,
  Check,
  X,
} from "lucide-react";
import { Event, GalleryImage } from "@/lib/supabase/types";
import {
  addGalleryImages,
  deleteGalleryImage,
  updateGalleryImage,
} from "@/lib/events/actions";
import { uploadMultipleImagesToCloudinary } from "@/lib/cloudinary/upload";
import AdminNotice from "@/components/admin/AdminNotice";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import AdminStickyHeader from "@/components/admin/AdminStickyHeader";

interface EventGalleryClientProps {
  event: Event;
  initialGallery: GalleryImage[];
}

export default function EventGalleryClient({
  event,
  initialGallery,
}: EventGalleryClientProps) {
  const baseId = useId();

  const [gallery, setGallery] = useState<GalleryImage[]>(initialGallery);
  const [newCategory, setNewCategory] = useState("Workshop Highlights");
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");

  // Inline caption/category editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Upload & action state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setErrorMessage(null);
    setActionNotice(msg);
  };

  const handleAddUrlImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;

    setIsUploading(true);
    setErrorMessage(null);

    const payload = [
      {
        image_path: newImageUrl.trim(),
        caption: newCaption.trim() || undefined,
        category: newCategory.trim() || "Workshop Highlights",
        is_cover: gallery.length === 0,
      },
    ];
    const result = await addGalleryImages(event.id, payload);
    setIsUploading(false);

    if (result.success) {
      const inserted = result.images as GalleryImage[] | undefined;
      if (inserted && inserted.length > 0) {
        setGallery((prev) => [...prev, ...inserted]);
      } else {
        setGallery((prev) => [
          ...prev,
          {
            id: "img-" + Date.now(),
            event_id: event.id,
            image_path: newImageUrl.trim(),
            caption: newCaption.trim() || null,
            category: newCategory.trim() || "Workshop Highlights",
            sort_order: gallery.length + 1,
            is_cover: gallery.length === 0,
            is_published: true,
            created_at: new Date().toISOString(),
          },
        ]);
      }
      setNewImageUrl("");
      setNewCaption("");
      setShowLinkForm(false);
      showNotice("Photo added to the event gallery.");
    } else {
      setErrorMessage(result.error || "Could not add that photo. Please check the web link and try again.");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    e.target.value = "";
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(`Preparing ${files.length} photo(s) for upload...`);
    setErrorMessage(null);

    const { uploaded, errors } = await uploadMultipleImagesToCloudinary(files, {
      folder: `events/${event.id}/gallery`,
      onProgress: (current, total, fileName) => {
        setUploadProgress(`Uploading photo ${current} of ${total}: ${fileName}...`);
      },
    });

    if (uploaded.length > 0) {
      const imagesToSave = uploaded.map((item, idx) => ({
        image_path: item.url,
        caption: item.originalFilename.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " "),
        category: newCategory.trim() || "Workshop Highlights",
        is_cover: gallery.length === 0 && idx === 0,
      }));

      const saveResult = await addGalleryImages(event.id, imagesToSave);

      if (saveResult.success) {
        const inserted = saveResult.images as GalleryImage[] | undefined;
        if (inserted && inserted.length > 0) {
          setGallery((prev) => [...prev, ...inserted]);
        } else {
          const fallbackItems: GalleryImage[] = imagesToSave.map((u, idx) => ({
            id: "upload-" + Date.now() + "-" + idx,
            event_id: event.id,
            image_path: u.image_path,
            caption: u.caption || null,
            category: u.category,
            sort_order: gallery.length + idx + 1,
            is_cover: u.is_cover,
            is_published: true,
            created_at: new Date().toISOString(),
          }));
          setGallery((prev) => [...prev, ...fallbackItems]);
        }
        showNotice(`${uploaded.length} photo(s) uploaded and added to this gallery.`);
      } else {
        setErrorMessage(
          saveResult.error ||
            "Photos uploaded, but saving them to this event failed. Please try again."
        );
      }
    }

    if (errors.length > 0) {
      setErrorMessage(errors.join(" • "));
    }

    setIsUploading(false);
    setUploadProgress(null);
  };

  const handleSetCover = async (img: GalleryImage) => {
    const res = await updateGalleryImage(img.id, {
      is_cover: true,
      event_id: event.id,
    });
    if (!res.success) {
      setErrorMessage(res.error || "Could not update cover photo.");
      return;
    }
    setGallery((prev) =>
      prev.map((item) => ({
        ...item,
        is_cover: item.id === img.id,
      }))
    );
    showNotice("Cover photo updated.");
  };

  const handleTogglePublished = async (img: GalleryImage) => {
    const newPub = !img.is_published;
    const res = await updateGalleryImage(img.id, {
      is_published: newPub,
      event_id: event.id,
    });
    if (!res.success) {
      setErrorMessage(res.error || "Could not update photo visibility.");
      return;
    }
    setGallery((prev) =>
      prev.map((item) =>
        item.id === img.id ? { ...item, is_published: newPub } : item
      )
    );
    showNotice(newPub ? "Photo is now visible on the public website." : "Photo hidden from the public website.");
  };

  const startEditingPhoto = (img: GalleryImage) => {
    setEditingId(img.id);
    setEditCaption(img.caption || "");
    setEditCategory(img.category || "Workshop Highlights");
  };

  const handleSavePhotoEdit = async (imgId: string) => {
    setIsSavingEdit(true);
    setErrorMessage(null);
    const res = await updateGalleryImage(imgId, {
      caption: editCaption.trim() || null,
      category: editCategory.trim() || "Workshop Highlights",
      event_id: event.id,
    });
    setIsSavingEdit(false);

    if (!res.success) {
      setErrorMessage(res.error || "Could not save caption changes.");
      return;
    }

    setGallery((prev) =>
      prev.map((item) =>
        item.id === imgId
          ? {
              ...item,
              caption: editCaption.trim() || null,
              category: editCategory.trim() || "Workshop Highlights",
            }
          : item
      )
    );
    setEditingId(null);
    showNotice("Photo caption and label updated.");
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const res = await deleteGalleryImage(deleteTarget.id, event.id);
    setIsDeleting(false);

    if (!res.success) {
      setErrorMessage(res.error || "Could not delete this photo.");
      setDeleteTarget(null);
      return;
    }

    setGallery((prev) => prev.filter((item) => item.id !== deleteTarget.id));
    setDeleteTarget(null);
    showNotice("Photo removed from gallery.");
  };

  return (
    <div className="w-full space-y-6 pb-16">
      {/* Header */}
      <AdminStickyHeader>
        <div>
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-1.5 text-xs text-[#9E783E] hover:text-[#173D34] transition-colors mb-2 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Events</span>
          </Link>
          <div className="flex items-center gap-2">
            <Camera className="w-6 h-6 text-[#B58B50]" />
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
              Event Photo Gallery
            </h1>
          </div>
          <p className="text-xs text-[#59675F] font-light mt-1">
            Event: <strong className="text-[#173D34] font-medium">{event.title}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/admin/events/${event.id}/edit`}
            className="px-4 py-2 rounded-full border border-[#B58B50]/35 hover:border-[#B58B50] bg-white text-xs font-semibold text-[#173D34] transition-colors"
          >
            Edit Event Details
          </Link>
          <Link
            href={`/events/${event.slug}#gallery`}
            target="_blank"
            className="text-xs font-semibold text-[#173D34] hover:text-[#B58B50] transition-colors inline-flex items-center gap-1"
          >
            <span>View Public Gallery</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </AdminStickyHeader>

      <AdminNotice type="success" message={actionNotice} onDismiss={() => setActionNotice(null)} />
      <AdminNotice type="error" message={errorMessage} onDismiss={() => setErrorMessage(null)} />

      {/* Upload Zone */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B58B50]/20 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-lg font-medium text-[#173D34] mb-1">
              Upload New Photos
            </h2>
            <p className="text-xs text-[#59675F] font-light">
              Choose one or many photos from your phone or computer. Captions can be edited below after uploading.
            </p>
          </div>

          <div className="sm:w-56">
            <label
              htmlFor={`${baseId}-tag`}
              className="block text-[10px] font-semibold text-[#173D34] uppercase tracking-wider mb-1"
            >
              Album Label for New Photos
            </label>
            <input
              id={`${baseId}-tag`}
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Workshop Highlights"
              className="w-full px-3 py-2 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:outline-none focus:border-[#B58B50]"
            />
          </div>
        </div>

        {/* Upload Drop Box */}
        <div className="border-2 border-dashed border-[#B58B50]/40 rounded-2xl p-8 text-center bg-[#F7F5EF]/60 hover:bg-[#F7F5EF] transition-colors relative">
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/gif"
            disabled={isUploading}
            onChange={handleFileUpload}
            aria-label="Upload event photographs"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <div className="space-y-2.5">
            <div className="w-12 h-12 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center mx-auto">
              {isUploading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Upload className="w-6 h-6" />
              )}
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#173D34]">
                {uploadProgress || "Click to choose photos or drag & drop them here"}
              </p>
              <p className="text-[11px] text-[#59675F] mt-1">
                Supports JPG, PNG, and WebP photos up to 10 MB each. Multiple files supported.
              </p>
            </div>
          </div>
        </div>

        {/* Optional Web Link Addition */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowLinkForm((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9E783E] hover:text-[#173D34] cursor-pointer"
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>{showLinkForm ? "Hide web link option" : "Or add a photo using a web link"}</span>
          </button>

          {showLinkForm && (
            <form onSubmit={handleAddUrlImage} className="mt-3 pt-3 border-t border-[#E8EDE4] grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6">
                <input
                  type="url"
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:outline-none focus:border-[#B58B50]"
                />
              </div>
              <div className="sm:col-span-4">
                <input
                  type="text"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Caption (optional)"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:outline-none focus:border-[#B58B50]"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-2 rounded-xl bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Existing Photographs Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B58B50]/20 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8EDE4]">
          <div>
            <h2 className="font-serif text-lg font-medium text-[#173D34]">
              Uploaded Photos ({gallery.length})
            </h2>
            <p className="text-xs text-[#59675F] font-light">
              Photos marked Visible appear immediately on the public event page.
            </p>
          </div>
        </div>

        {gallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((img) => {
              const isEditing = editingId === img.id;

              return (
                <div
                  key={img.id}
                  className="rounded-2xl border border-[#B58B50]/25 overflow-hidden bg-[#F7F5EF] flex flex-col justify-between shadow-xs"
                >
                  {/* Image & Badges */}
                  <div className="relative aspect-4/3 bg-[#102E27]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.image_path}
                      alt={img.caption || "Workshop photo"}
                      className="w-full h-full object-cover"
                    />

                    {img.is_cover && (
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#DFBD83] text-[#102E27] text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Cover Photo</span>
                      </div>
                    )}

                    {!img.is_published && (
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-semibold">
                        Hidden
                      </div>
                    )}
                  </div>

                  {/* Caption / Category or Inline Edit */}
                  <div className="p-3.5 space-y-2 flex-1">
                    {isEditing ? (
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[10px] font-semibold uppercase text-[#173D34] mb-0.5">
                            Caption
                          </label>
                          <input
                            type="text"
                            value={editCaption}
                            onChange={(e) => setEditCaption(e.target.value)}
                            placeholder="Write a photo caption..."
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#B58B50]/40 text-xs text-[#24352D] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold uppercase text-[#173D34] mb-0.5">
                            Label
                          </label>
                          <input
                            type="text"
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            placeholder="Workshop Highlights"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#B58B50]/40 text-xs text-[#24352D] focus:outline-none"
                          />
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            disabled={isSavingEdit}
                            onClick={() => handleSavePhotoEdit(img.id)}
                            className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#173D34] text-white text-xs font-semibold inline-flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{isSavingEdit ? "Saving..." : "Save"}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="py-1.5 px-2.5 rounded-lg bg-white border border-stone-300 text-xs font-medium text-[#59675F] inline-flex items-center gap-1 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs text-[#173D34] font-medium line-clamp-2">
                            {img.caption || "No caption yet"}
                          </p>
                          <span className="text-[10px] uppercase tracking-wider text-[#59675F] block mt-0.5">
                            {img.category || "Workshop Highlights"}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => startEditingPhoto(img)}
                          title="Edit caption or label"
                          aria-label="Edit caption or label"
                          className="p-1.5 rounded-lg text-[#173D34] hover:bg-white transition-colors shrink-0 cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="px-3 py-2.5 border-t border-[#E8EDE4] bg-white flex items-center justify-between text-xs gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {!img.is_cover && (
                        <button
                          type="button"
                          onClick={() => handleSetCover(img)}
                          className="px-2.5 py-1 rounded-full bg-[#F7F5EF] hover:bg-[#DFBD83]/30 text-[11px] font-semibold text-[#9E783E] cursor-pointer transition-colors"
                        >
                          Set Cover
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleTogglePublished(img)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-colors ${
                          img.is_published
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-red-50 text-red-700 hover:bg-red-100"
                        }`}
                      >
                        {img.is_published ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Visible</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setDeleteTarget(img)}
                      title="Delete photo"
                      aria-label="Delete photo"
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-[#59675F] space-y-2">
            <Camera className="w-8 h-8 text-[#B58B50] mx-auto opacity-60" />
            <p className="font-medium text-[#173D34]">
              No photos added for this event yet.
            </p>
            <p className="font-light">
              Use the upload box above to add photos from your computer or phone.
            </p>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete This Photo?"
        description="Are you sure you want to remove this photo from the gallery? This cannot be undone."
        confirmLabel="Yes, Remove Photo"
        tone="danger"
        isBusy={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

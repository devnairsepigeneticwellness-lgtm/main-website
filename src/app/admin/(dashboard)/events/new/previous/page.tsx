"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  History,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Upload,
} from "lucide-react";
import { createHistoricalEvent } from "@/lib/events/actions";
import CloudinaryImageField from "@/components/admin/CloudinaryImageField";
import { uploadMultipleImagesToCloudinary } from "@/lib/cloudinary/upload";

interface GalleryPhotoInput {
  url: string;
  caption: string;
}

export default function AddPreviousEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [originalDate, setOriginalDate] = useState("2024-10-15");
  const [category, setCategory] = useState("Historical Workshop");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("Indore, Madhya Pradesh");
  const [speakerName, setSpeakerName] = useState("Ajit Kumar Nair");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  // Gallery photos
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhotoInput[]>([
    { url: "", caption: "" },
  ]);

  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [galleryUploadProgress, setGalleryUploadProgress] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddPhotoRow = () => {
    setGalleryPhotos((prev) => [...prev, { url: "", caption: "" }]);
  };

  const handleRemovePhotoRow = (index: number) => {
    setGalleryPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePhotoChange = (
    index: number,
    field: "url" | "caption",
    value: string
  ) => {
    setGalleryPhotos((prev) =>
      prev.map((photo, i) => (i === index ? { ...photo, [field]: value } : photo))
    );
  };

  const handleBulkGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingGallery(true);
    setGalleryUploadProgress(`Preparing ${files.length} photo(s) for Cloudinary...`);
    setErrorMessage(null);

    const { uploaded, errors } = await uploadMultipleImagesToCloudinary(files, {
      folder: "events/historical/gallery",
      onProgress: (current, total, fileName) => {
        setGalleryUploadProgress(
          `Uploading ${current} of ${total} to Cloudinary: ${fileName}...`
        );
      },
    });

    if (uploaded.length > 0) {
      const newRows: GalleryPhotoInput[] = uploaded.map((item) => ({
        url: item.url,
        caption: item.originalFilename.replace(/\.[^/.]+$/, ""),
      }));

      setGalleryPhotos((prev) => {
        const nonEmpty = prev.filter((p) => p.url.trim() || p.caption.trim());
        return [...nonEmpty, ...newRows];
      });

      if (!coverPhoto) {
        setCoverPhoto(uploaded[0].url);
      }
    }

    if (errors.length > 0) {
      setErrorMessage(errors.join(" | "));
    }

    e.target.value = "";
    setIsUploadingGallery(false);
    setGalleryUploadProgress(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalDate) {
      setErrorMessage("Please enter the historical date on which the event took place.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const validGallery = galleryPhotos.filter((p) => p.url.trim().length > 0);

    const result = await createHistoricalEvent(
      {
        title,
        original_date: originalDate,
        category,
        description,
        venue,
        speaker_name: speakerName,
        poster_path: coverPhoto || (validGallery[0]?.url ?? null),
        is_published: isPublished,
      },
      validGallery
    );

    setIsSubmitting(false);

    if (result.success) {
      router.push("/admin/events");
      router.refresh();
    } else {
      setErrorMessage(result.error || "Failed to record historical event.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#E8EDE4]">
        <div>
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-1.5 text-xs text-[#B58B50] hover:text-[#173D34] transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Events Table</span>
          </Link>
          <div className="flex items-center gap-2">
            <History className="w-6 h-6 text-[#B58B50]" />
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
              Add Previous Event &amp; Workshop
            </h1>
          </div>
          <p className="text-xs text-[#59675F] font-light mt-1">
            Record workshops and conferences conducted before this website was built. These are automatically classified as Completed and displayed in the public archive.
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-6 sm:p-10 border border-[#B58B50]/20 shadow-xs space-y-8"
      >
        {/* Section 1: Historical Meta */}
        <div className="space-y-4">
          <h2 className="font-serif text-lg font-medium text-[#173D34] border-b border-[#E8EDE4] pb-2">
            1. Historical Workshop Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Previous Workshop Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cognitive Reframing & Rational Emotive Mastery"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Original Date Conducted (Past Date) *
              </label>
              <input
                type="date"
                required
                value={originalDate}
                onChange={(e) => setOriginalDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
              <span className="text-[10px] text-[#59675F] mt-1 block">
                Preserves exact historical conducting date.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              >
                <option value="Historical Workshop">Historical Workshop</option>
                <option value="Clinical Training">Clinical Training</option>
                <option value="Relational Skills">Relational Skills</option>
                <option value="Crisis Intervention">Crisis Intervention</option>
                <option value="Educational Mental Health">
                  Educational Mental Health
                </option>
                <option value="Institutional Symposium">
                  Institutional Symposium
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Venue / Host Institution
              </label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Sayaji Hotel Auditorium, Indore"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Facilitator / Speaker
              </label>
              <input
                type="text"
                value={speakerName}
                onChange={(e) => setSpeakerName(e.target.value)}
                placeholder="e.g. Ajit Kumar Nair & Team"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
              Historical Overview &amp; Key Highlights
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summary of the workshop, attendance, key takeaways, and participant feedback..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Section 2: Cover Photo */}
        <div className="space-y-4">
          <h2 className="font-serif text-lg font-medium text-[#173D34] border-b border-[#E8EDE4] pb-2">
            2. Event Cover Photograph
          </h2>

          <CloudinaryImageField
            label="Cover Photograph"
            value={coverPhoto}
            onChange={setCoverPhoto}
            folder="events/historical/covers"
          />
        </div>

        {/* Section 3: Multiple Gallery Photographs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8EDE4] pb-2">
            <div>
              <h2 className="font-serif text-lg font-medium text-[#173D34]">
                3. Workshop Photo Gallery
              </h2>
              <p className="text-xs text-[#59675F] font-light">
                Upload multiple workshop photographs directly to Cloudinary or add image URLs below.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddPhotoRow}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8EDE4] hover:bg-[#173D34] hover:text-[#DFBD83] text-[#173D34] text-xs font-semibold transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Photo Row</span>
            </button>
          </div>

          {/* Multi-file Cloudinary Upload Box */}
          <div className="border-2 border-dashed border-[#B58B50]/40 rounded-2xl p-6 text-center bg-[#F7F5EF]/60 hover:bg-[#F7F5EF] transition-colors relative">
            <input
              type="file"
              multiple
              accept="image/*"
              disabled={isUploadingGallery}
              onChange={handleBulkGalleryUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center mx-auto">
                {isUploadingGallery ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
              </div>
              <p className="text-xs font-semibold text-[#173D34]">
                {galleryUploadProgress ||
                  "Click or drag & drop multiple gallery photos to upload to Cloudinary"}
              </p>
              <p className="text-[11px] text-[#59675F]">
                Supports JPG, PNG, WEBP up to 10MB each.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {galleryPhotos.map((photo, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#B58B50]/20 flex flex-col sm:flex-row items-start sm:items-center gap-3"
              >
                {photo.url ? (
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#102E27] shrink-0 border border-[#B58B50]/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.url}
                      alt={photo.caption || `Gallery photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-xs text-[#B58B50] shrink-0 border border-[#B58B50]/30">
                    {index + 1}
                  </div>
                )}

                <div className="flex-1 w-full sm:w-auto">
                  <input
                    type="url"
                    value={photo.url}
                    onChange={(e) =>
                      handlePhotoChange(index, "url", e.target.value)
                    }
                    placeholder="Image URL: https://res.cloudinary.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#B58B50]/20 text-xs text-[#24352D] focus:outline-none focus:border-[#B58B50]"
                  />
                </div>

                <div className="flex-1 w-full sm:w-auto">
                  <input
                    type="text"
                    value={photo.caption}
                    onChange={(e) =>
                      handlePhotoChange(index, "caption", e.target.value)
                    }
                    placeholder="Image Caption (e.g. Breakout discussion groups)"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#B58B50]/20 text-xs text-[#24352D] focus:outline-none focus:border-[#B58B50]"
                  />
                </div>

                {galleryPhotos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemovePhotoRow(index)}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Actions */}
        <div className="pt-4 border-t border-[#E8EDE4] flex items-center justify-between">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 rounded text-[#173D34] focus:ring-[#B58B50]"
            />
            <span className="text-xs font-semibold text-[#173D34]">
              Publish Immediately to Public Past Workshops Archive
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting || isUploadingGallery}
            className="px-7 py-3 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#DFBD83]" />
                <span>Recording Historical Workshop...</span>
              </>
            ) : (
              <>
                <span>Save Previous Event</span>
                <CheckCircle2 className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

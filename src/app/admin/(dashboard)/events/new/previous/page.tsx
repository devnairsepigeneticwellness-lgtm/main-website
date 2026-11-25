"use client";

import React, { useId, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  History,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Upload,
  Link2,
} from "lucide-react";
import { createHistoricalEvent } from "@/lib/events/actions";
import { EVENT_CATEGORIES } from "@/lib/admin/helpers";
import CloudinaryImageField from "@/components/admin/CloudinaryImageField";
import AdminNotice from "@/components/admin/AdminNotice";
import AdminStickyHeader from "@/components/admin/AdminStickyHeader";
import { uploadMultipleImagesToCloudinary } from "@/lib/cloudinary/upload";

interface GalleryPhotoInput {
  url: string;
  caption: string;
}

export default function AddPreviousEventPage() {
  const router = useRouter();
  const baseId = useId();

  const [title, setTitle] = useState("");
  const [originalDate, setOriginalDate] = useState("");
  const [category, setCategory] = useState("Historical Workshop");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("Indore, Madhya Pradesh");
  const [speakerName, setSpeakerName] = useState("Ajit Kumar Nair");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhotoInput[]>([]);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [manualUrl, setManualUrl] = useState("");
  const [manualCaption, setManualCaption] = useState("");

  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [galleryUploadProgress, setGalleryUploadProgress] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRemovePhotoRow = (index: number) => {
    setGalleryPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePhotoCaptionChange = (index: number, caption: string) => {
    setGalleryPhotos((prev) =>
      prev.map((photo, i) => (i === index ? { ...photo, caption } : photo))
    );
  };

  const handleAddManualLink = () => {
    if (!manualUrl.trim()) return;
    setGalleryPhotos((prev) => [
      ...prev,
      { url: manualUrl.trim(), caption: manualCaption.trim() },
    ]);
    if (!coverPhoto) setCoverPhoto(manualUrl.trim());
    setManualUrl("");
    setManualCaption("");
    setShowLinkInput(false);
  };

  const handleBulkGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    e.target.value = "";
    if (!files || files.length === 0) return;

    setIsUploadingGallery(true);
    setGalleryUploadProgress(`Preparing ${files.length} photo(s) for upload...`);
    setErrorMessage(null);

    const { uploaded, errors } = await uploadMultipleImagesToCloudinary(files, {
      folder: "events/historical/gallery",
      onProgress: (current, total, fileName) => {
        setGalleryUploadProgress(`Uploading photo ${current} of ${total}: ${fileName}...`);
      },
    });

    if (uploaded.length > 0) {
      const newRows: GalleryPhotoInput[] = uploaded.map((item) => ({
        url: item.url,
        caption: item.originalFilename.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " "),
      }));

      setGalleryPhotos((prev) => [...prev, ...newRows]);

      if (!coverPhoto) {
        setCoverPhoto(uploaded[0].url);
      }
    }

    if (errors.length > 0) {
      setErrorMessage(errors.join(" • "));
    }

    setIsUploadingGallery(false);
    setGalleryUploadProgress(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim() || title.trim().length < 3) {
      setErrorMessage("Please enter a workshop title (at least 3 characters).");
      return;
    }
    if (!originalDate) {
      setErrorMessage("Please choose the date when this workshop was held.");
      return;
    }

    setIsSubmitting(true);

    const validGallery = galleryPhotos.filter((p) => p.url.trim().length > 0);

    const result = await createHistoricalEvent(
      {
        title: title.trim(),
        original_date: originalDate,
        category,
        description: description.trim(),
        venue: venue.trim(),
        speaker_name: speakerName.trim(),
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
      setErrorMessage(result.error || "Could not save this past event. Please try again.");
    }
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
            <History className="w-6 h-6 text-[#B58B50]" />
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
              Add Past Workshop or Event
            </h1>
          </div>
          <p className="text-xs text-[#59675F] font-light mt-1">
            Add workshops held previously along with their photos so visitors can see them under Past Workshops.
          </p>
        </div>
      </AdminStickyHeader>

      <AdminNotice type="error" message={errorMessage} onDismiss={() => setErrorMessage(null)} />

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-6 sm:p-10 border border-[#B58B50]/20 shadow-xs space-y-8"
      >
        {/* Section 1: Workshop Details */}
        <section className="space-y-4">
          <h2 className="font-serif text-lg font-medium text-[#173D34] border-b border-[#E8EDE4] pb-2">
            1. Past Workshop Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label
                htmlFor={`${baseId}-title`}
                className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
              >
                Workshop Title <span className="text-red-600">*</span>
              </label>
              <input
                id={`${baseId}-title`}
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cognitive Reframing & Rational Emotive Mastery"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor={`${baseId}-date`}
                className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
              >
                Date Conducted <span className="text-red-600">*</span>
              </label>
              <input
                id={`${baseId}-date`}
                type="date"
                required
                value={originalDate}
                onChange={(e) => setOriginalDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
              <span className="text-[11px] text-[#59675F] mt-1 block">
                Shows visitors when the workshop took place.
              </span>
            </div>

            <div>
              <label
                htmlFor={`${baseId}-category`}
                className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
              >
                Category <span className="text-red-600">*</span>
              </label>
              <select
                id={`${baseId}-category`}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              >
                {EVENT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor={`${baseId}-venue`}
                className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
              >
                Venue or City
              </label>
              <input
                id={`${baseId}-venue`}
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Sayaji Hotel, Indore"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor={`${baseId}-speaker`}
                className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
              >
                Facilitator / Speaker
              </label>
              <input
                id={`${baseId}-speaker`}
                type="text"
                value={speakerName}
                onChange={(e) => setSpeakerName(e.target.value)}
                placeholder="e.g. Ajit Kumar Nair & Team"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor={`${baseId}-desc`}
              className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
            >
              Workshop Summary &amp; Highlights
            </label>
            <textarea
              id={`${baseId}-desc`}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summary of the session, topics covered, and key highlights..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
            />
          </div>
        </section>

        {/* Section 2: Cover Photo */}
        <section className="space-y-4">
          <h2 className="font-serif text-lg font-medium text-[#173D34] border-b border-[#E8EDE4] pb-2">
            2. Main Cover Photo (Optional)
          </h2>
          <p className="text-xs text-[#59675F] font-light">
            If left empty, the first gallery photo you upload below will automatically become the cover photo.
          </p>

          <CloudinaryImageField
            label="Cover Photo"
            value={coverPhoto}
            onChange={setCoverPhoto}
            folder="events/historical/covers"
          />
        </section>

        {/* Section 3: Multiple Gallery Photos */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8EDE4] pb-2">
            <div>
              <h2 className="font-serif text-lg font-medium text-[#173D34]">
                3. Event Photo Gallery ({galleryPhotos.length})
              </h2>
              <p className="text-xs text-[#59675F] font-light">
                Select one or many photos from your computer or phone to upload together.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowLinkInput((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9E783E] hover:text-[#173D34] cursor-pointer self-start sm:self-auto"
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>{showLinkInput ? "Hide link option" : "Add photo via web link"}</span>
            </button>
          </div>

          {/* Multi-file Upload Box */}
          <div className="border-2 border-dashed border-[#B58B50]/40 rounded-2xl p-6 text-center bg-[#F7F5EF]/60 hover:bg-[#F7F5EF] transition-colors relative">
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,image/gif"
              disabled={isUploadingGallery}
              onChange={handleBulkGalleryUpload}
              aria-label="Upload multiple workshop photos"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <div className="space-y-2">
              <div className="w-11 h-11 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center mx-auto">
                {isUploadingGallery ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#173D34]">
                {galleryUploadProgress || "Click to choose photos or drag multiple images here"}
              </p>
              <p className="text-[11px] text-[#59675F]">
                You can select multiple JPG, PNG, or WebP photos at once (up to 10 MB each).
              </p>
            </div>
          </div>

          {showLinkInput && (
            <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#B58B50]/20 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-6">
                <label className="block text-[11px] font-medium text-[#173D34] mb-1">
                  Photo Web Link
                </label>
                <input
                  type="url"
                  value={manualUrl}
                  onChange={(e) => setManualUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#B58B50]/25 text-xs focus:outline-none focus:border-[#B58B50]"
                />
              </div>
              <div className="sm:col-span-4">
                <label className="block text-[11px] font-medium text-[#173D34] mb-1">
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  value={manualCaption}
                  onChange={(e) => setManualCaption(e.target.value)}
                  placeholder="e.g. Group discussion session"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#B58B50]/25 text-xs focus:outline-none focus:border-[#B58B50]"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="button"
                  onClick={handleAddManualLink}
                  className="w-full py-2 px-3 rounded-xl bg-[#173D34] text-white text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          )}

          {galleryPhotos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {galleryPhotos.map((photo, index) => (
                <div
                  key={`${photo.url}-${index}`}
                  className="p-3 rounded-2xl bg-[#F7F5EF] border border-[#B58B50]/25 flex items-center gap-3"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#102E27] shrink-0 border border-[#B58B50]/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.url}
                      alt={photo.caption || `Uploaded photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#59675F]">
                      Photo Caption
                    </label>
                    <input
                      type="text"
                      value={photo.caption}
                      onChange={(e) => handlePhotoCaptionChange(index, e.target.value)}
                      placeholder="Add a short caption..."
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#B58B50]/20 text-xs text-[#24352D] focus:outline-none focus:border-[#B58B50]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemovePhotoRow(index)}
                    aria-label="Remove photo"
                    title="Remove photo"
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Submit Actions */}
        <div className="pt-5 border-t border-[#E8EDE4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 rounded accent-[#173D34]"
            />
            <span className="text-xs font-semibold text-[#173D34]">
              Show immediately on the public Past Workshops page
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting || isUploadingGallery}
            className="px-7 py-3 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Past Event...</span>
              </>
            ) : (
              <>
                <span>{isPublished ? "Save & Publish Past Event" : "Save Past Event as Draft"}</span>
                <CheckCircle2 className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

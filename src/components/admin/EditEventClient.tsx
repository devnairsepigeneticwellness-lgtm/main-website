"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Camera,
} from "lucide-react";
import { Event } from "@/lib/supabase/types";
import { updateEvent } from "@/lib/events/actions";
import CloudinaryImageField from "@/components/admin/CloudinaryImageField";

interface EditEventClientProps {
  initialEvent: Event;
}

export default function EditEventClient({ initialEvent }: EditEventClientProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialEvent.title);
  const [slug, setSlug] = useState(initialEvent.slug);
  const [shortDesc, setShortDesc] = useState(initialEvent.short_description || "");
  const [description, setDescription] = useState(initialEvent.description || "");
  const [category, setCategory] = useState(initialEvent.category);

  // Parse start_at and end_at to date and times
  const startDate = new Date(initialEvent.start_at);
  const endDate = new Date(initialEvent.end_at);
  const pad = (n: number) => String(n).padStart(2, "0");

  const [date, setDate] = useState(
    initialEvent.start_at.split("T")[0] || ""
  );
  const [startTime, setStartTime] = useState(
    `${pad(startDate.getHours())}:${pad(startDate.getMinutes())}`
  );
  const [endTime, setEndTime] = useState(
    `${pad(endDate.getHours())}:${pad(endDate.getMinutes())}`
  );

  const [timezone, setTimezone] = useState(initialEvent.timezone || "Asia/Kolkata");
  const [mode, setMode] = useState<"Online" | "In-Person" | "Hybrid">(initialEvent.mode);
  const [venue, setVenue] = useState(initialEvent.venue || "");
  const [speakerName, setSpeakerName] = useState(initialEvent.speaker_name || "");
  const [posterPath, setPosterPath] = useState(initialEvent.poster_path || "");
  const [regUrl, setRegUrl] = useState(initialEvent.registration_url || "");
  const [regButtonText, setRegButtonText] = useState(initialEvent.registration_button_text || "Register Now");
  const [regStatus, setRegStatus] = useState<"Open" | "Closed" | "Sold Out" | "Invite Only">(
    initialEvent.registration_status || "Open"
  );
  const [isPublished, setIsPublished] = useState(initialEvent.is_published);
  const [isArchived, setIsArchived] = useState(initialEvent.is_archived);
  const [isCancelled, setIsCancelled] = useState(initialEvent.is_cancelled);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const startAt = `${date}T${startTime}:00+05:30`;
    const endAt = `${date}T${endTime}:00+05:30`;

    const result = await updateEvent(initialEvent.id, {
      title,
      slug,
      short_description: shortDesc,
      description,
      category,
      start_at: startAt,
      end_at: endAt,
      timezone,
      mode,
      venue,
      speaker_name: speakerName,
      poster_path: posterPath || null,
      registration_url: regUrl || null,
      registration_button_text: regButtonText,
      registration_status: regStatus,
      is_published: isPublished,
      is_archived: isArchived,
      is_cancelled: isCancelled,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSuccessMessage("Event updated successfully!");
      router.refresh();
    } else {
      setErrorMessage(result.error || "Failed to update event.");
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
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
            Edit Workshop / Event
          </h1>
        </div>

        <Link
          href={`/admin/events/${initialEvent.id}/gallery`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E8EDE4] hover:bg-[#173D34] hover:text-white text-xs font-semibold text-[#173D34] transition-all"
        >
          <Camera className="w-3.5 h-3.5 text-[#B58B50]" />
          <span>Manage Gallery Photos</span>
        </Link>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-[#B58B50]/20 shadow-xs space-y-8">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="font-serif text-lg font-medium text-[#173D34] border-b border-[#E8EDE4] pb-2">
            1. Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Event Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Slug *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] font-mono focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
              Short Description
            </label>
            <textarea
              rows={2}
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
              Full Programme Description
            </label>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Date, Time & Mode */}
        <div className="space-y-4">
          <h2 className="font-serif text-lg font-medium text-[#173D34] border-b border-[#E8EDE4] pb-2">
            2. Date, Time &amp; Mode
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Start Time *
              </label>
              <input
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                End Time *
              </label>
              <input
                type="time"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Mode *
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              >
                <option value="In-Person">In-Person</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Venue
              </label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Facilitator
              </label>
              <input
                type="text"
                value={speakerName}
                onChange={(e) => setSpeakerName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Poster & Registration */}
        <div className="space-y-4">
          <h2 className="font-serif text-lg font-medium text-[#173D34] border-b border-[#E8EDE4] pb-2">
            3. Poster &amp; Registration
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <CloudinaryImageField
                label="Poster / Flyer Image"
                value={posterPath}
                onChange={setPosterPath}
                folder="events/posters"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Registration URL
              </label>
              <input
                type="url"
                value={regUrl}
                onChange={(e) => setRegUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Registration Button Label
              </label>
              <input
                type="text"
                value={regButtonText}
                onChange={(e) => setRegButtonText(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Registration Status
              </label>
              <select
                value={regStatus}
                onChange={(e) => setRegStatus(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Sold Out">Sold Out</option>
                <option value="Invite Only">Invite Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status Flags */}
        <div className="pt-4 border-t border-[#E8EDE4] space-y-3">
          <h2 className="font-serif text-sm font-medium text-[#173D34]">
            Lifecycle &amp; Visibility Flags
          </h2>

          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 rounded text-[#173D34] focus:ring-[#B58B50]"
              />
              <span className="text-xs font-medium text-[#173D34]">Published</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isCancelled}
                onChange={(e) => setIsCancelled(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
              />
              <span className="text-xs font-medium text-red-700">Cancelled Flag</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isArchived}
                onChange={(e) => setIsArchived(e.target.checked)}
                className="w-4 h-4 rounded text-stone-600 focus:ring-stone-500"
              />
              <span className="text-xs font-medium text-stone-700">Archived Flag</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-[#E8EDE4] flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#DFBD83]" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <span>Save All Changes</span>
                <CheckCircle2 className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}

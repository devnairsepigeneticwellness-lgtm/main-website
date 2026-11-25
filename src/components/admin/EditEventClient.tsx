"use client";

import React, { useId, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Camera,
  Link2,
  ExternalLink,
} from "lucide-react";
import { Event } from "@/lib/supabase/types";
import { updateEvent } from "@/lib/events/actions";
import {
  EVENT_CATEGORIES,
  slugifyTitle,
  toIstDateString,
  toIstTimeString,
} from "@/lib/admin/helpers";
import CloudinaryImageField from "@/components/admin/CloudinaryImageField";
import AdminNotice from "@/components/admin/AdminNotice";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import AdminStickyHeader from "@/components/admin/AdminStickyHeader";

interface EditEventClientProps {
  initialEvent: Event;
}

export default function EditEventClient({ initialEvent }: EditEventClientProps) {
  const router = useRouter();
  const baseId = useId();

  const initialDate = toIstDateString(initialEvent.start_at);
  const initialStartTime = toIstTimeString(initialEvent.start_at);
  const initialEndTime = toIstTimeString(initialEvent.end_at);

  const [title, setTitle] = useState(initialEvent.title);
  const [slug, setSlug] = useState(initialEvent.slug);
  const [showCustomLink, setShowCustomLink] = useState(false);
  const [shortDesc, setShortDesc] = useState(initialEvent.short_description || "");
  const [description, setDescription] = useState(initialEvent.description || "");
  const [category, setCategory] = useState(initialEvent.category);

  const [date, setDate] = useState(initialDate);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);

  const [mode, setMode] = useState<"Online" | "In-Person" | "Hybrid">(initialEvent.mode);
  const [venue, setVenue] = useState(initialEvent.venue || "");
  const [speakerName, setSpeakerName] = useState(initialEvent.speaker_name || "");
  const [posterPath, setPosterPath] = useState(initialEvent.poster_path || "");
  const [regUrl, setRegUrl] = useState(initialEvent.registration_url || "");
  const [regButtonText, setRegButtonText] = useState(
    initialEvent.registration_button_text || "Register Now"
  );
  const [regStatus, setRegStatus] = useState<"Open" | "Closed" | "Sold Out" | "Invite Only">(
    initialEvent.registration_status || "Open"
  );
  const [isPublished, setIsPublished] = useState(initialEvent.is_published);
  const [isArchived, setIsArchived] = useState(initialEvent.is_archived);
  const [isCancelled, setIsCancelled] = useState(initialEvent.is_cancelled);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const markDirty = () => {
    if (!isDirty) setIsDirty(true);
    if (successMessage) setSuccessMessage(null);
  };

  // Preserve custom category if the event has one not in the canonical dropdown
  const categoryOptions = Array.from(new Set([...EVENT_CATEGORIES, initialEvent.category]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!title.trim() || title.trim().length < 3) {
      setErrorMessage("Please enter an event title (at least 3 characters).");
      return;
    }
    if (!date) {
      setErrorMessage("Please select an event date.");
      return;
    }
    if (endTime <= startTime) {
      setErrorMessage("End time must be later than start time.");
      return;
    }

    const finalSlug = slugifyTitle(slug || title);
    if (!finalSlug || finalSlug.length < 3) {
      setErrorMessage("Please enter a valid page link name (at least 3 characters).");
      return;
    }

    setIsSubmitting(true);

    const startAt = `${date}T${startTime}:00+05:30`;
    const endAt = `${date}T${endTime}:00+05:30`;

    const result = await updateEvent(initialEvent.id, {
      title: title.trim(),
      slug: finalSlug,
      short_description: shortDesc.trim(),
      description: description.trim(),
      category,
      start_at: startAt,
      end_at: endAt,
      timezone: initialEvent.timezone || "Asia/Kolkata",
      mode,
      venue: venue.trim(),
      speaker_name: speakerName.trim(),
      poster_path: posterPath || null,
      registration_url: regUrl.trim() || null,
      registration_button_text: regButtonText.trim() || "Register Now",
      registration_status: regStatus,
      is_published: isPublished,
      is_archived: isArchived,
      is_cancelled: isCancelled,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSlug(finalSlug);
      setIsDirty(false);
      setSuccessMessage("Your changes have been saved.");
      router.refresh();
    } else {
      setErrorMessage(result.error || "Could not save changes. Please check your entries and try again.");
    }
  };

  return (
    <div className="w-full space-y-6 pb-16">
      {/* Header */}
      <AdminStickyHeader>
        <div>
          <button
            type="button"
            onClick={() => {
              if (isDirty) {
                setShowLeaveConfirm(true);
              } else {
                router.push("/admin/events");
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs text-[#9E783E] hover:text-[#173D34] transition-colors mb-2 font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Events</span>
          </button>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
            Edit Workshop or Event
          </h1>
          <p className="text-xs text-[#59675F] font-light mt-1">
            Update details, schedule, or visibility on the public website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/events/${initialEvent.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#B58B50]/35 hover:border-[#B58B50] bg-white text-xs font-semibold text-[#173D34] transition-colors"
          >
            <span>View Public Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#9E783E]" />
          </Link>
          <Link
            href={`/admin/events/${initialEvent.id}/gallery`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E8EDE4] hover:bg-[#173D34] hover:text-white text-xs font-semibold text-[#173D34] transition-all"
          >
            <Camera className="w-3.5 h-3.5 text-[#B58B50]" />
            <span>Manage Photos</span>
          </Link>
        </div>
      </AdminStickyHeader>

      <AdminNotice type="success" message={successMessage} onDismiss={() => setSuccessMessage(null)} />
      <AdminNotice type="error" message={errorMessage} onDismiss={() => setErrorMessage(null)} />

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-6 sm:p-10 border border-[#B58B50]/20 shadow-xs space-y-8"
      >
        {/* 1. Basic Information */}
        <section className="space-y-4">
          <h2 className="font-serif text-lg font-medium text-[#173D34] border-b border-[#E8EDE4] pb-2">
            1. Event Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label
                htmlFor={`${baseId}-title`}
                className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
              >
                Event Title <span className="text-red-600">*</span>
              </label>
              <input
                id={`${baseId}-title`}
                type="text"
                required
                value={title}
                onChange={(e) => {
                  markDirty();
                  setTitle(e.target.value);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
              <div className="flex flex-wrap items-center justify-between gap-2 mt-1.5">
                <span className="text-[11px] text-[#59675F]">
                  Website link: <strong className="font-medium text-[#173D34]">/events/{slug || "..."}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setShowCustomLink((prev) => !prev)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#9E783E] hover:text-[#173D34] cursor-pointer"
                >
                  <Link2 className="w-3 h-3" />
                  <span>{showCustomLink ? "Hide page link setting" : "Change page link"}</span>
                </button>
              </div>
            </div>

            {showCustomLink && (
              <div className="sm:col-span-2 p-3.5 rounded-2xl bg-[#F7F5EF] border border-[#B58B50]/20 space-y-1.5">
                <label htmlFor={`${baseId}-slug`} className="block text-xs font-semibold text-[#173D34]">
                  Page Link Name
                </label>
                <input
                  id={`${baseId}-slug`}
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => {
                    markDirty();
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
                  }}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:outline-none"
                />
                <p className="text-[11px] text-[#59675F]">
                  Note: Only change this if necessary — changing the link of a published event breaks any previously shared links.
                </p>
              </div>
            )}

            <div className="sm:col-span-2">
              <label
                htmlFor={`${baseId}-category`}
                className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
              >
                Workshop Category <span className="text-red-600">*</span>
              </label>
              <select
                id={`${baseId}-category`}
                value={category}
                onChange={(e) => {
                  markDirty();
                  setCategory(e.target.value);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor={`${baseId}-short`}
              className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
            >
              Short Summary
            </label>
            <textarea
              id={`${baseId}-short`}
              rows={2}
              maxLength={300}
              value={shortDesc}
              onChange={(e) => {
                markDirty();
                setShortDesc(e.target.value);
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor={`${baseId}-desc`}
              className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
            >
              Full Programme Description
            </label>
            <textarea
              id={`${baseId}-desc`}
              rows={6}
              value={description}
              onChange={(e) => {
                markDirty();
                setDescription(e.target.value);
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
            />
          </div>
        </section>

        {/* 2. Date, Time & Venue */}
        <section className="space-y-4">
          <h2 className="font-serif text-lg font-medium text-[#173D34] border-b border-[#E8EDE4] pb-2">
            2. Date, Time &amp; Venue
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor={`${baseId}-date`}
                className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
              >
                Date <span className="text-red-600">*</span>
              </label>
              <input
                id={`${baseId}-date`}
                type="date"
                required
                value={date}
                onChange={(e) => {
                  markDirty();
                  setDate(e.target.value);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor={`${baseId}-start`}
                className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
              >
                Start Time (IST) <span className="text-red-600">*</span>
              </label>
              <input
                id={`${baseId}-start`}
                type="time"
                required
                value={startTime}
                onChange={(e) => {
                  markDirty();
                  setStartTime(e.target.value);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor={`${baseId}-end`}
                className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
              >
                End Time (IST) <span className="text-red-600">*</span>
              </label>
              <input
                id={`${baseId}-end`}
                type="time"
                required
                value={endTime}
                onChange={(e) => {
                  markDirty();
                  setEndTime(e.target.value);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor={`${baseId}-mode`}
                className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
              >
                Session Format <span className="text-red-600">*</span>
              </label>
              <select
                id={`${baseId}-mode`}
                value={mode}
                onChange={(e) => {
                  markDirty();
                  setMode(e.target.value as "Online" | "In-Person" | "Hybrid");
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              >
                <option value="In-Person">In-Person</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label
                htmlFor={`${baseId}-venue`}
                className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
              >
                Venue or Platform
              </label>
              <input
                id={`${baseId}-venue`}
                type="text"
                value={venue}
                onChange={(e) => {
                  markDirty();
                  setVenue(e.target.value);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor={`${baseId}-speaker`}
                className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
              >
                Lead Facilitator
              </label>
              <input
                id={`${baseId}-speaker`}
                type="text"
                value={speakerName}
                onChange={(e) => {
                  markDirty();
                  setSpeakerName(e.target.value);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* 3. Poster & Registration */}
        <section className="space-y-4">
          <h2 className="font-serif text-lg font-medium text-[#173D34] border-b border-[#E8EDE4] pb-2">
            3. Event Poster &amp; Registration
          </h2>

          <div className="space-y-4">
            <CloudinaryImageField
              label="Event Poster / Cover Image"
              value={posterPath}
              onChange={(url) => {
                markDirty();
                setPosterPath(url);
              }}
              folder="events/posters"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label
                  htmlFor={`${baseId}-reg-url`}
                  className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
                >
                  Registration Link (Optional)
                </label>
                <input
                  id={`${baseId}-reg-url`}
                  type="url"
                  value={regUrl}
                  onChange={(e) => {
                    markDirty();
                    setRegUrl(e.target.value);
                  }}
                  placeholder="https://forms.gle/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor={`${baseId}-reg-text`}
                  className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
                >
                  Button Text
                </label>
                <input
                  id={`${baseId}-reg-text`}
                  type="text"
                  value={regButtonText}
                  onChange={(e) => {
                    markDirty();
                    setRegButtonText(e.target.value);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor={`${baseId}-reg-status`}
                  className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
                >
                  Sign-Up Availability
                </label>
                <select
                  id={`${baseId}-reg-status`}
                  value={regStatus}
                  onChange={(e) => {
                    markDirty();
                    setRegStatus(e.target.value as "Open" | "Closed" | "Sold Out" | "Invite Only");
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
                >
                  <option value="Open">Open for Registration</option>
                  <option value="Closed">Registration Closed</option>
                  <option value="Sold Out">Seats Full / Sold Out</option>
                  <option value="Invite Only">Invite Only</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Website Visibility */}
        <section className="pt-4 border-t border-[#E8EDE4] space-y-3">
          <h2 className="font-serif text-base font-medium text-[#173D34]">
            Website Visibility
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="p-3.5 rounded-2xl bg-[#F7F5EF] border border-[#B58B50]/20 flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => {
                  markDirty();
                  setIsPublished(e.target.checked);
                }}
                className="w-4 h-4 rounded mt-0.5 accent-[#173D34]"
              />
              <div>
                <span className="text-xs font-semibold text-[#173D34] block">Show on Website</span>
                <span className="text-[11px] text-[#59675F]">Uncheck to keep as a private draft.</span>
              </div>
            </label>

            <label className="p-3.5 rounded-2xl bg-[#F7F5EF] border border-[#B58B50]/20 flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isCancelled}
                onChange={(e) => {
                  markDirty();
                  setIsCancelled(e.target.checked);
                }}
                className="w-4 h-4 rounded mt-0.5 accent-red-600"
              />
              <div>
                <span className="text-xs font-semibold text-red-700 block">Mark as Cancelled</span>
                <span className="text-[11px] text-[#59675F]">Shows a Cancelled badge to visitors.</span>
              </div>
            </label>

            <label className="p-3.5 rounded-2xl bg-[#F7F5EF] border border-[#B58B50]/20 flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isArchived}
                onChange={(e) => {
                  markDirty();
                  setIsArchived(e.target.checked);
                }}
                className="w-4 h-4 rounded mt-0.5 accent-stone-600"
              />
              <div>
                <span className="text-xs font-semibold text-stone-700 block">Move to Archive</span>
                <span className="text-[11px] text-[#59675F]">Hides from public lists without deleting.</span>
              </div>
            </label>
          </div>
        </section>

        {/* Submit */}
        <div className="pt-4 border-t border-[#E8EDE4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs text-[#59675F]">
            {isDirty ? "You have unsaved changes." : "All changes saved."}
          </span>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
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

      <ConfirmDialog
        open={showLeaveConfirm}
        title="Leave Without Saving?"
        description="You have unsaved changes on this event. If you leave now, those edits will be lost."
        confirmLabel="Discard Changes & Leave"
        cancelLabel="Stay on Page"
        tone="warning"
        onConfirm={() => router.push("/admin/events")}
        onCancel={() => setShowLeaveConfirm(false)}
      />
    </div>
  );
}

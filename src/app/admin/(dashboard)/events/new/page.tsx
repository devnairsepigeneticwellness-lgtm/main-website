"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Globe,
  Upload,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Layers,
  Link as LinkIcon,
} from "lucide-react";
import { createEvent } from "@/lib/events/actions";

export default function CreateUpcomingEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Workshop");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("16:00");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [mode, setMode] = useState<"Online" | "In-Person" | "Hybrid">("In-Person");
  const [venue, setVenue] = useState("");
  const [speakerName, setSpeakerName] = useState("Ajit Kumar Nair");
  const [posterPath, setPosterPath] = useState("");
  const [regUrl, setRegUrl] = useState("");
  const [regButtonText, setRegButtonText] = useState("Register Now");
  const [regStatus, setRegStatus] = useState<"Open" | "Closed" | "Sold Out" | "Invite Only">("Open");
  const [isPublished, setIsPublished] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-slug generator
  const handleTitleChange = (val: string) => {
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setSlug(generatedSlug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setErrorMessage("Please select an event date.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    // Construct ISO datetimes in Asia/Kolkata (+05:30)
    const startAt = `${date}T${startTime}:00+05:30`;
    const endAt = `${date}T${endTime}:00+05:30`;

    const result = await createEvent({
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
      is_archived: false,
      is_cancelled: false,
    });

    setIsSubmitting(false);

    if (result.success) {
      router.push("/admin/events");
      router.refresh();
    } else {
      setErrorMessage(result.error || "Failed to create event. Please check required fields.");
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
            Create Upcoming Workshop or Event
          </h1>
        </div>

        <Link
          href="/admin/events/new/previous"
          className="text-xs text-[#B58B50] hover:underline font-medium"
        >
          Conducting a past event? + Add Previous Event &rarr;
        </Link>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-[#B58B50]/20 shadow-xs space-y-8">
        
        {/* Section 1: Title & Slug */}
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
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Suicide Prevention & Crisis Sensitisation Intensive"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Slug (URL Identifier) *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="suicide-prevention-intensive"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] font-mono focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
              <span className="text-[10px] text-[#59675F] mt-1 block">
                Public URL: /events/{slug || "slug-preview"}
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
                <option value="Workshop">Workshop</option>
                <option value="Crisis Intervention">Crisis Intervention</option>
                <option value="Relational Skills">Relational Skills</option>
                <option value="Wellbeing & Somatics">Wellbeing &amp; Somatics</option>
                <option value="Clinical Training">Clinical Training</option>
                <option value="Masterclass">Masterclass</option>
                <option value="Educational Mental Health">Educational Mental Health</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
              Short Description / Hook *
            </label>
            <textarea
              rows={2}
              required
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="A brief 1-2 sentence overview shown on preview cards..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
              Full Programme Description &amp; Agenda
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed syllabus, key takeaways, who should attend, and session breakdown..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Section 2: Date, Time & Logistics */}
        <div className="space-y-4">
          <h2 className="font-serif text-lg font-medium text-[#173D34] border-b border-[#E8EDE4] pb-2">
            2. Date, Time &amp; Location Logistics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Event Date *
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
                Format / Mode *
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              >
                <option value="In-Person">In-Person (Offline)</option>
                <option value="Online">Online Video Stream</option>
                <option value="Hybrid">Hybrid (In-Person + Live Stream)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Venue or Platform
              </label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Sayaji Hotel, Indore / Zoom"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Lead Facilitator / Speaker
              </label>
              <input
                type="text"
                value={speakerName}
                onChange={(e) => setSpeakerName(e.target.value)}
                placeholder="e.g. Ajit Kumar Nair"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Poster & Registration */}
        <div className="space-y-4">
          <h2 className="font-serif text-lg font-medium text-[#173D34] border-b border-[#E8EDE4] pb-2">
            3. Poster Image &amp; Registration URL
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                Poster Image URL
              </label>
              <input
                type="url"
                value={posterPath}
                onChange={(e) => setPosterPath(e.target.value)}
                placeholder="https://images.unsplash.com/... or Supabase Storage URL"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
              <span className="text-[10px] text-[#59675F] mt-1 block">
                Enter an image URL or upload directly to Supabase storage.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5">
                External Registration URL (Optional)
              </label>
              <input
                type="url"
                value={regUrl}
                onChange={(e) => setRegUrl(e.target.value)}
                placeholder="e.g. https://forms.gle/... (Leave empty to use built-in booking)"
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
                placeholder="Register Now / Reserve Seat"
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

        {/* Section 4: Publishing Status */}
        <div className="pt-4 border-t border-[#E8EDE4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 rounded text-[#173D34] focus:ring-[#B58B50]"
            />
            <span className="text-xs font-semibold text-[#173D34]">
              Publish Immediately (Visible on Public Website)
            </span>
          </label>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIsPublished(false);
                handleSubmit({ preventDefault: () => {} } as any);
              }}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-full border border-gray-300 hover:bg-gray-100 text-[#173D34] text-xs font-semibold transition-all cursor-pointer"
            >
              Save as Draft
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-7 py-2.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#DFBD83]" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>{isPublished ? "Publish Event" : "Save Event"}</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}

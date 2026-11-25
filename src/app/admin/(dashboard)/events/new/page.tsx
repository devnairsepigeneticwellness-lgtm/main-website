"use client";

import React, { useId, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  EyeOff,
  Link2,
  Loader2,
} from "lucide-react";
import { createEvent } from "@/lib/events/actions";
import { EVENT_CATEGORIES, slugifyTitle } from "@/lib/admin/helpers";
import CloudinaryImageField from "@/components/admin/CloudinaryImageField";
import AdminNotice from "@/components/admin/AdminNotice";
import AdminStickyHeader from "@/components/admin/AdminStickyHeader";

export default function CreateUpcomingEventPage() {
  const router = useRouter();
  const baseId = useId();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [showCustomLink, setShowCustomLink] = useState(false);
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(EVENT_CATEGORIES[0]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("16:00");
  const [mode, setMode] = useState<"Online" | "In-Person" | "Hybrid">("In-Person");
  const [venue, setVenue] = useState("");
  const [speakerName, setSpeakerName] = useState("Ajit Kumar Nair");
  const [posterPath, setPosterPath] = useState("");
  const [regUrl, setRegUrl] = useState("");
  const [regButtonText, setRegButtonText] = useState("Register Now");
  const [regStatus, setRegStatus] = useState<"Open" | "Closed" | "Sold Out" | "Invite Only">("Open");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugManuallyEdited) {
      setSlug(slugifyTitle(val));
    }
  };

  const submitEvent = async (publishNow: boolean, goToGallery = false) => {
    setErrorMessage(null);

    if (!title.trim() || title.trim().length < 3) {
      setErrorMessage("Please enter an event title (at least 3 characters).");
      return;
    }
    if (!shortDesc.trim()) {
      setErrorMessage("Please enter a short summary to display on the event card.");
      return;
    }
    if (!date) {
      setErrorMessage("Please pick the event date.");
      return;
    }
    if (endTime <= startTime) {
      setErrorMessage("End time must be later than start time.");
      return;
    }

    const finalSlug = slugifyTitle(slug || title);
    if (!finalSlug || finalSlug.length < 3) {
      setErrorMessage("Please enter a valid title or customize the page link.");
      return;
    }

    setIsSubmitting(true);

    const startAt = `${date}T${startTime}:00+05:30`;
    const endAt = `${date}T${endTime}:00+05:30`;

    const result = await createEvent({
      title: title.trim(),
      slug: finalSlug,
      short_description: shortDesc.trim(),
      description: description.trim(),
      category,
      start_at: startAt,
      end_at: endAt,
      timezone: "Asia/Kolkata",
      mode,
      venue: venue.trim(),
      speaker_name: speakerName.trim(),
      poster_path: posterPath || null,
      registration_url: regUrl.trim() || null,
      registration_button_text: regButtonText.trim() || "Register Now",
      registration_status: regStatus,
      is_published: publishNow,
      is_archived: false,
      is_cancelled: false,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error || "Could not save the event. Please check your entries and try again.");
      return;
    }

    const createdId = (result.event as { id?: string } | undefined)?.id;
    if (goToGallery && createdId && !createdId.startsWith("preview-")) {
      router.push(`/admin/events/${createdId}/gallery`);
    } else {
      router.push("/admin/events");
    }
    router.refresh();
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
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
            Add Upcoming Workshop or Event
          </h1>
          <p className="text-xs text-[#59675F] font-light mt-1">
            Fill in the details below. You can publish straight to the website or save as a hidden draft.
          </p>
        </div>

        <Link
          href="/admin/events/new/previous"
          className="text-xs text-[#9E783E] hover:text-[#173D34] hover:underline font-medium shrink-0"
        >
          Adding an older past workshop? Switch here &rarr;
        </Link>
      </AdminStickyHeader>

      <AdminNotice type="error" message={errorMessage} onDismiss={() => setErrorMessage(null)} />

      {/* Main Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void submitEvent(true);
        }}
        className="bg-white rounded-3xl p-6 sm:p-10 border border-[#B58B50]/20 shadow-xs space-y-8"
      >
        {/* Section 1: Event Details */}
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
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Suicide Prevention & Crisis Sensitisation Workshop"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
              <div className="flex flex-wrap items-center justify-between gap-2 mt-1.5">
                <span className="text-[11px] text-[#59675F]">
                  Website link preview: <strong className="font-medium text-[#173D34]">/events/{slug || "event-name"}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setShowCustomLink((prev) => !prev)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#9E783E] hover:text-[#173D34] cursor-pointer"
                >
                  <Link2 className="w-3 h-3" />
                  <span>{showCustomLink ? "Hide page link setting" : "Customize page link"}</span>
                </button>
              </div>
            </div>

            {showCustomLink && (
              <div className="sm:col-span-2 p-3.5 rounded-2xl bg-[#F7F5EF] border border-[#B58B50]/20 space-y-1.5">
                <label
                  htmlFor={`${baseId}-slug`}
                  className="block text-xs font-semibold text-[#173D34]"
                >
                  Custom Page Link Name (optional)
                </label>
                <input
                  id={`${baseId}-slug`}
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlugManuallyEdited(true);
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
                  }}
                  placeholder="suicide-prevention-workshop"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#B58B50]/30 text-xs text-[#24352D] focus:border-[#B58B50] focus:outline-none"
                />
                <p className="text-[11px] text-[#59675F]">
                  Created automatically from the title. Only lowercase letters, numbers, and hyphens (-).
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
          </div>

          <div>
            <label
              htmlFor={`${baseId}-short`}
              className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
            >
              Short Summary (1–2 sentences) <span className="text-red-600">*</span>
            </label>
            <textarea
              id={`${baseId}-short`}
              rows={2}
              required
              maxLength={300}
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="A brief summary shown on the Events overview card..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
            />
            <span className="text-[11px] text-[#59675F] mt-1 block text-right">
              {shortDesc.length} / 300 characters
            </span>
          </div>

          <div>
            <label
              htmlFor={`${baseId}-desc`}
              className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
            >
              Full Description &amp; Session Agenda (Optional)
            </label>
            <textarea
              id={`${baseId}-desc`}
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What participants will learn, who should attend, and schedule details..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
            />
          </div>
        </section>

        {/* Section 2: Date, Time & Venue */}
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
                Event Date <span className="text-red-600">*</span>
              </label>
              <input
                id={`${baseId}-date`}
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
                onChange={(e) => setStartTime(e.target.value)}
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
                onChange={(e) => setEndTime(e.target.value)}
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
                onChange={(e) => setMode(e.target.value as "Online" | "In-Person" | "Hybrid")}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              >
                <option value="In-Person">In-Person (Clinic / Venue)</option>
                <option value="Online">Online (Zoom / Live Video)</option>
                <option value="Hybrid">Hybrid (In-Person + Online)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor={`${baseId}-venue`}
                className="block text-xs font-semibold text-[#173D34] uppercase tracking-wider mb-1.5"
              >
                Location or Platform
              </label>
              <input
                id={`${baseId}-venue`}
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Indore Clinic / Zoom"
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
                onChange={(e) => setSpeakerName(e.target.value)}
                placeholder="e.g. Ajit Kumar Nair"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Section 3: Poster & Registration */}
        <section className="space-y-4">
          <h2 className="font-serif text-lg font-medium text-[#173D34] border-b border-[#E8EDE4] pb-2">
            3. Event Poster &amp; Registration
          </h2>

          <div className="space-y-4">
            <CloudinaryImageField
              label="Event Poster / Cover Image"
              value={posterPath}
              onChange={setPosterPath}
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
                  onChange={(e) => setRegUrl(e.target.value)}
                  placeholder="https://forms.gle/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#B58B50]/30 text-sm text-[#24352D] focus:border-[#B58B50] focus:bg-white focus:outline-none"
                />
                <span className="text-[10px] text-[#59675F] mt-1 block">
                  Leave blank to let visitors register via the clinic booking form.
                </span>
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
                  onChange={(e) => setRegButtonText(e.target.value)}
                  placeholder="Register Now"
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
                  onChange={(e) =>
                    setRegStatus(e.target.value as "Open" | "Closed" | "Sold Out" | "Invite Only")
                  }
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

        {/* Actions */}
        <div className="pt-6 border-t border-[#E8EDE4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => void submitEvent(false)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#C8D6C6] hover:bg-[#F7F5EF] text-[#173D34] text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
          >
            <EyeOff className="w-4 h-4 text-[#59675F]" />
            <span>Save as Hidden Draft</span>
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => void submitEvent(true, true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#B58B50] bg-[#F7F5EF] hover:bg-[#E8EDE4] text-[#173D34] text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
            >
              <Camera className="w-4 h-4 text-[#9E783E]" />
              <span>Publish &amp; Upload Photos</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Event...</span>
                </>
              ) : (
                <>
                  <span>Publish Event</span>
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

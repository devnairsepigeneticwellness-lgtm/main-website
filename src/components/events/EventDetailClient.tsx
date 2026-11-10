"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Globe,
  Laptop,
  ArrowLeft,
  ArrowUpRight,
  User,
  Share2,
  CheckCircle2,
  Camera,
  Layers,
} from "lucide-react";
import { Event, GalleryImage } from "@/lib/supabase/types";
import Lightbox from "../gallery/Lightbox";
import ConsultationModal from "../ConsultationModal";

interface EventDetailClientProps {
  event: Event;
  gallery: GalleryImage[];
  relatedEvents?: Event[];
}

export default function EventDetailClient({
  event,
  gallery,
  relatedEvents = [],
}: EventDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const startDate = new Date(event.start_at);
  const endDate = new Date(event.end_at);
  const [isPast, setIsPast] = useState(() => endDate < new Date("2026-11-09T00:00:00Z"));

  useEffect(() => {
    setIsPast(endDate < new Date());
  }, [endDate]);

  const formattedDate = startDate.toLocaleDateString("en-IN", {
    timeZone: event.timezone || "Asia/Kolkata",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedStartTime = startDate.toLocaleTimeString("en-IN", {
    timeZone: event.timezone || "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedEndTime = endDate.toLocaleTimeString("en-IN", {
    timeZone: event.timezone || "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const modeIcon = () => {
    switch (event.mode) {
      case "Online":
        return <Globe className="w-4 h-4 text-[#DFBD83]" />;
      case "In-Person":
        return <MapPin className="w-4 h-4 text-[#DFBD83]" />;
      case "Hybrid":
        return <Laptop className="w-4 h-4 text-[#DFBD83]" />;
      default:
        return <MapPin className="w-4 h-4 text-[#DFBD83]" />;
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.short_description || event.title,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const isRegistrationAvailable =
    !isPast &&
    !event.is_cancelled &&
    !event.is_archived &&
    event.registration_status === "Open";

  return (
    <article className="min-h-screen bg-[#F7F5EF] text-[#24352D] pb-24">
      {/* Editorial Header / Breadcrumb */}
      <div className="bg-[#173D34] text-[#F7F5EF] pt-8 pb-16 sm:pb-24 border-b border-[#B58B50]/30 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B58B50]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back link */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs text-[#DFBD83] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Workshops &amp; Events</span>
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#102E27] hover:bg-[#102E27]/80 text-[#DFBD83] text-xs border border-[#DFBD83]/30 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? "Link Copied!" : "Share"}</span>
            </button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#102E27] text-[#DFBD83] text-xs font-semibold tracking-wider uppercase border border-[#DFBD83]/40">
              {event.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium flex items-center gap-1.5 backdrop-blur-xs">
              {modeIcon()}
              <span>{event.mode}</span>
            </span>
            {isPast ? (
              <span className="px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-xs font-medium">
                Completed
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-[#DFBD83] text-[#102E27] text-xs font-semibold uppercase tracking-wider">
                {event.registration_status}
              </span>
            )}
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight mb-6">
            {event.title}
          </h1>

          {/* Event Quick Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-white/15 text-xs text-[#E8EDE4]">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#DFBD83] shrink-0" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#DFBD83] shrink-0" />
              <span>
                {formattedStartTime} – {formattedEndTime} ({event.timezone || "IST"})
              </span>
            </div>
            {event.venue && (
              <div className="flex items-center gap-2.5 sm:col-span-2 lg:col-span-1">
                <MapPin className="w-4 h-4 text-[#DFBD83] shrink-0" />
                <span className="truncate">{event.venue}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Column (8 cols): Poster & Full Description */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Poster / Featured Image */}
            {event.poster_path && (
              <div className="rounded-3xl overflow-hidden shadow-xl border border-[#B58B50]/30 bg-[#173D34]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.poster_path}
                  alt={event.title}
                  className="w-full h-auto max-h-[460px] object-cover"
                />
              </div>
            )}

            {/* Overview / Narrative */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#B58B50]/20 shadow-xs space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B58B50]">
                <Layers className="w-4 h-4" />
                <span>Programme Narrative &amp; Scope</span>
              </div>

              {event.short_description && (
                <p className="text-base sm:text-lg font-serif italic text-[#173D34] leading-relaxed border-l-2 border-[#B58B50] pl-4">
                  &ldquo;{event.short_description}&rdquo;
                </p>
              )}

              {event.description ? (
                <div className="font-sans text-sm sm:text-base text-[#59675F] font-light leading-relaxed space-y-4">
                  {event.description.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#59675F] font-light leading-relaxed">
                  This experiential workshop brings psychological theory into practical, human-centred dialogue. Guided by our clinical team, participants explore actionable strategies for self-regulation, interpersonal understanding, and systemic wellbeing.
                </p>
              )}

              {/* Facilitator Bio Highlight */}
              {event.speaker_name && (
                <div className="mt-8 pt-6 border-t border-[#E8EDE4] flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center font-serif text-base font-semibold shrink-0 border border-[#B58B50]/40">
                    <User className="w-5 h-5 text-[#DFBD83]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#B58B50] font-semibold block">
                      Lead Facilitator
                    </span>
                    <h4 className="font-serif text-base font-medium text-[#173D34]">
                      {event.speaker_name}
                    </h4>
                    <p className="text-xs text-[#59675F] font-light mt-0.5">
                      Practicing Counselling Psychologist, Clinical Hypnotherapist &amp; Rehabilitation Counselor (RCI).
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Photo Gallery (Especially for Completed Events) */}
            {gallery && gallery.length > 0 && (
              <div id="gallery" className="bg-white rounded-3xl p-6 sm:p-10 border border-[#B58B50]/20 shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B58B50] mb-1">
                      <Camera className="w-4 h-4" />
                      <span>Workshop Highlights</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#173D34]">
                      Photographs From This Workshop
                    </h3>
                  </div>
                  <span className="text-xs text-[#59675F]">
                    {gallery.length} Photograph{gallery.length === 1 ? "" : "s"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gallery.map((img, idx) => (
                    <div
                      key={img.id}
                      onClick={() => {
                        setLightboxIndex(idx);
                        setLightboxOpen(true);
                      }}
                      className="group relative rounded-2xl overflow-hidden aspect-4/3 bg-[#102E27] cursor-pointer border border-[#B58B50]/20 hover:border-[#B58B50] shadow-xs hover:shadow-md transition-all"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.image_path}
                        alt={img.caption || "Workshop Photograph"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {img.caption && (
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-[11px] text-white font-light">
                          <p className="line-clamp-1">{img.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (4 cols): Registration / Booking Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Registration Card */}
              <div className="bg-[#173D34] text-[#F7F5EF] rounded-3xl p-6 sm:p-7 border border-[#B58B50]/40 shadow-xl space-y-5">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#DFBD83] font-semibold block">
                    {isPast ? "Event Status" : "Enrolment Status"}
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-white mt-1">
                    {isPast ? "Event Completed" : "Secure Your Seat"}
                  </h3>
                </div>

                {isPast ? (
                  <div className="space-y-3 text-xs text-[#E8EDE4]/80 font-light">
                    <p>
                      This workshop has concluded. Browse our photo highlights or enquire about bringing this curriculum to your organisation or institution.
                    </p>
                    <Link
                      href="/book-consultation"
                      className="w-full py-3 rounded-full bg-[#DFBD83] hover:bg-[#c9a76d] text-[#102E27] text-xs font-semibold tracking-wide transition-all text-center flex items-center justify-center gap-1.5 shadow-md mt-4"
                    >
                      <span>Request Cohort Re-Run</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs py-2 border-y border-white/10">
                      <span className="text-[#E8EDE4]/70">Format</span>
                      <span className="font-medium text-[#DFBD83]">{event.mode}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs py-1">
                      <span className="text-[#E8EDE4]/70">Status</span>
                      <span className="font-semibold text-emerald-400">
                        {event.registration_status}
                      </span>
                    </div>

                    {isRegistrationAvailable ? (
                      event.registration_url ? (
                        <a
                          href={event.registration_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3.5 rounded-full bg-[#DFBD83] hover:bg-[#c9a76d] text-[#102E27] text-xs font-semibold tracking-wide transition-all text-center flex items-center justify-center gap-2 shadow-lg"
                        >
                          <span>{event.registration_button_text || "Register Now"}</span>
                          <ArrowUpRight className="w-4 h-4 text-[#102E27]" />
                        </a>
                      ) : (
                        <button
                          onClick={() => setBookingModalOpen(true)}
                          className="w-full py-3.5 rounded-full bg-[#DFBD83] hover:bg-[#c9a76d] text-[#102E27] text-xs font-semibold tracking-wide transition-all text-center flex items-center justify-center gap-2 shadow-lg"
                        >
                          <span>{event.registration_button_text || "Reserve Your Seat"}</span>
                          <ArrowUpRight className="w-4 h-4 text-[#102E27]" />
                        </button>
                      )
                    ) : (
                      <div className="p-3 rounded-xl bg-[#102E27] text-center text-xs text-[#E8EDE4]/70">
                        Registration is currently closed for this session.
                      </div>
                    )}

                    <div className="flex items-center justify-center gap-2 text-[11px] text-[#E8EDE4]/60 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DFBD83]" />
                      <span>Verified Certificate of Participation Included</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Enquiry Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#B58B50]/20 shadow-xs space-y-3">
                <span className="text-[11px] uppercase tracking-wider text-[#B58B50] font-semibold block">
                  Institutional Cohorts
                </span>
                <h4 className="font-serif text-base font-medium text-[#173D34]">
                  Interested in private campus or corporate delivery?
                </h4>
                <p className="text-xs text-[#59675F] font-light leading-relaxed">
                  We customize mental health workshops for colleges, schools, hospital teams, and corporate organizations.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D34] hover:text-[#B58B50] transition-colors pt-1"
                >
                  <span>Connect with our coordinator &rarr;</span>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        images={gallery}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />

      {/* Seat Reservation Modal */}
      <ConsultationModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedService={`Workshop: ${event.title}`}
      />
    </article>
  );
}

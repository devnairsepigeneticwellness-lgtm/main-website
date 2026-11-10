"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin, Globe, Laptop, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Event } from "@/lib/supabase/types";

interface EventCardProps {
  event: Event;
  onOpenBooking?: (title: string) => void;
}

export default function EventCard({ event, onOpenBooking }: EventCardProps) {
  // Date and Time formatting in Asia/Kolkata
  const startDate = new Date(event.start_at);
  const endDate = new Date(event.end_at);

  const formattedDate = startDate.toLocaleDateString("en-IN", {
    timeZone: event.timezone || "Asia/Kolkata",
    weekday: "short",
    month: "short",
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
        return <Globe className="w-3.5 h-3.5 text-[#B58B50]" />;
      case "In-Person":
        return <MapPin className="w-3.5 h-3.5 text-[#B58B50]" />;
      case "Hybrid":
        return <Laptop className="w-3.5 h-3.5 text-[#B58B50]" />;
      default:
        return <MapPin className="w-3.5 h-3.5 text-[#B58B50]" />;
    }
  };

  const isRegistrationOpen =
    event.registration_status === "Open" && !event.is_cancelled && !event.is_archived;

  return (
    <article className="group bg-white rounded-3xl overflow-hidden border border-[#B58B50]/20 hover:border-[#B58B50] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Top Poster Image */}
      <div className="relative aspect-16/9 bg-[#173D34] overflow-hidden">
        {event.poster_path ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.poster_path}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#173D34] to-[#102E27] p-6 text-center">
            <span className="font-serif text-lg text-[#DFBD83]">{event.title}</span>
          </div>
        )}

        {/* Category & Mode Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-[#102E27]/90 text-[#DFBD83] text-[10px] font-bold tracking-wider uppercase backdrop-blur-xs border border-[#DFBD83]/30">
            {event.category}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white/90 text-[#173D34] text-[10px] font-semibold tracking-wide flex items-center gap-1 backdrop-blur-xs shadow-xs">
            {modeIcon()}
            <span>{event.mode}</span>
          </span>
        </div>

        {/* Registration Status Pill */}
        <div className="absolute top-3.5 right-3.5">
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-xs ${
              event.registration_status === "Open"
                ? "bg-[#173D34] text-[#DFBD83] border border-[#DFBD83]/40"
                : "bg-gray-800 text-gray-200"
            }`}
          >
            {event.registration_status}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Date & Time Row */}
          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#59675F] font-medium">
            <div className="flex items-center gap-1.5 text-[#173D34]">
              <Calendar className="w-3.5 h-3.5 text-[#B58B50]" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#B58B50]" />
              <span>
                {formattedStartTime} – {formattedEndTime}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#173D34] group-hover:text-[#B58B50] transition-colors leading-snug">
            <Link href={`/events/${event.slug}`}>{event.title}</Link>
          </h3>

          {/* Short Description */}
          {event.short_description && (
            <p className="text-xs sm:text-sm text-[#59675F] font-light leading-relaxed line-clamp-2">
              {event.short_description}
            </p>
          )}

          {/* Venue & Speaker */}
          <div className="pt-2 space-y-1 text-xs text-[#59675F]">
            {event.venue && (
              <div className="flex items-start gap-1.5 line-clamp-1">
                <MapPin className="w-3.5 h-3.5 text-[#B58B50] shrink-0 mt-0.5" />
                <span className="truncate">{event.venue}</span>
              </div>
            )}
            {event.speaker_name && (
              <div className="flex items-center gap-1.5 text-[11px] text-[#24352D] font-medium pt-0.5">
                <span className="text-[#B58B50] font-serif italic">Facilitated by</span>
                <span>{event.speaker_name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 mt-6 border-t border-[#E8EDE4] flex items-center justify-between gap-3">
          <Link
            href={`/events/${event.slug}`}
            className="text-xs font-semibold text-[#173D34] hover:text-[#B58B50] inline-flex items-center gap-1 transition-colors"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B58B50]" />
          </Link>

          {isRegistrationOpen && (
            event.registration_url ? (
              <a
                href={event.registration_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide transition-all shadow-xs"
              >
                {event.registration_button_text || "Register Now"}
              </a>
            ) : onOpenBooking ? (
              <button
                onClick={() => onOpenBooking(event.title)}
                className="px-4 py-2 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide transition-all shadow-xs"
              >
                {event.registration_button_text || "Reserve Seat"}
              </button>
            ) : null
          )}
        </div>
      </div>
    </article>
  );
}

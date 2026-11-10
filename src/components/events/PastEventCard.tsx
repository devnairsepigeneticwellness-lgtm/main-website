"use client";

import React from "react";
import Link from "next/link";
import { Calendar, MapPin, Camera, ArrowUpRight } from "lucide-react";
import { Event } from "@/lib/supabase/types";

interface PastEventCardProps {
  event: Event;
}

export default function PastEventCard({ event }: PastEventCardProps) {
  const startDate = new Date(event.start_at);

  const formattedDate = startDate.toLocaleDateString("en-IN", {
    timeZone: event.timezone || "Asia/Kolkata",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="group bg-[#FCFAF6] rounded-3xl overflow-hidden border border-[#B58B50]/20 hover:border-[#B58B50] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      {/* Top Photograph */}
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
          <div className="w-full h-full flex items-center justify-center bg-[#173D34] text-[#DFBD83] font-serif p-4 text-center">
            {event.title}
          </div>
        )}

        {/* Category Badge & Photo Count */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#102E27]/90 text-[#DFBD83] text-[10px] font-bold tracking-wider uppercase backdrop-blur-xs border border-[#DFBD83]/30">
            {event.category}
          </span>
          {event.gallery_count && event.gallery_count > 0 ? (
            <span className="px-2.5 py-1 rounded-full bg-black/75 text-white text-[10px] font-semibold tracking-wide flex items-center gap-1 backdrop-blur-xs">
              <Camera className="w-3 h-3 text-[#DFBD83]" />
              <span>{event.gallery_count} Photos</span>
            </span>
          ) : null}
        </div>

        <div className="absolute top-3.5 right-3.5">
          <span className="px-2.5 py-1 rounded-full bg-stone-800/90 text-stone-300 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-xs">
            Completed
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Conducted Date */}
          <div className="flex items-center gap-1.5 text-xs text-[#B58B50] font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>Conducted in {formattedDate}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#173D34] group-hover:text-[#B58B50] transition-colors leading-snug">
            <Link href={`/events/${event.slug}`}>{event.title}</Link>
          </h3>

          {/* Description */}
          {event.short_description && (
            <p className="text-xs sm:text-sm text-[#59675F] font-light leading-relaxed line-clamp-3">
              {event.short_description}
            </p>
          )}

          {/* Venue & Speaker */}
          <div className="pt-2 space-y-1 text-xs text-[#59675F]">
            {event.venue && (
              <div className="flex items-center gap-1.5 line-clamp-1">
                <MapPin className="w-3.5 h-3.5 text-[#B58B50] shrink-0" />
                <span className="truncate">{event.venue}</span>
              </div>
            )}
            {event.speaker_name && (
              <div className="text-[11px] text-[#24352D] font-medium">
                <span className="text-[#B58B50] font-serif italic">Led by </span>
                <span>{event.speaker_name}</span>
              </div>
            )}
          </div>
        </div>

        {/* View Highlights Button */}
        <div className="pt-5 mt-5 border-t border-[#E8EDE4] flex items-center justify-between">
          <Link
            href={`/events/${event.slug}`}
            className="w-full py-2.5 rounded-full bg-[#173D34]/10 hover:bg-[#173D34] text-[#173D34] hover:text-[#DFBD83] text-xs font-semibold tracking-wide transition-all text-center flex items-center justify-center gap-1.5"
          >
            <span>View Highlights &amp; Insights</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

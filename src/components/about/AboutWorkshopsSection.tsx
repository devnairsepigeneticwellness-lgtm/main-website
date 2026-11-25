"use client";

import React from "react";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  Monitor, 
  MapPin, 
  MessageSquare, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2,
  Camera,
  Layers
} from "lucide-react";
import { aboutCopy } from "@/data/aboutData";
import { getWhatsAppUrl } from "@/components/SocialIcons";

interface AboutWorkshopsSectionProps {
  onOpenBooking: () => void;
}

export default function AboutWorkshopsSection({ onOpenBooking }: AboutWorkshopsSectionProps) {
  const { workshops } = aboutCopy;

  return (
    <section id="workshops-section" className="py-20 lg:py-28 bg-[#F4F7F2] relative overflow-hidden border-b border-[#C8D6C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-3 mb-3 justify-center">
            <span className="w-8 h-[1px] bg-[#9E783E]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#7D6335] uppercase font-sans">
              WORKSHOPS &amp; EVENTS
            </span>
            <span className="w-8 h-[1px] bg-[#9E783E]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Learn. Reflect. Practise.{" "}
            <span className="italic text-[#7D6335]">Grow.</span>
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#465A4F] leading-relaxed font-light">
            {workshops.intro}
          </p>
        </div>

        {/* 12 Program Topics Grid + Featured Live Event Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left: 12 Program Topics (7 cols) */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-[#C8D6C6] shadow-xs">
            <span className="text-xs font-mono font-bold text-[#7D6335] uppercase tracking-wider block mb-2">
              OUR PROGRAMS MAY INCLUDE:
            </span>
            <h3 className="font-serif text-2xl font-medium text-[#173D34] mb-6">
              Interactive Skill-Building &amp; Psychoeducation
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {workshops.programAreas.map((prog, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F7F5EF] border border-[#E0E7DC]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#7D6335] shrink-0" />
                  <span className="text-xs font-medium text-[#24352D]">{prog}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Featured Live Upcoming Event (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#173D34] via-[#102E27] to-[#0E2721] text-[#F7F5EF] p-8 rounded-3xl border border-[#B58B50]/40 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#DFBD83]/20 border border-[#DFBD83]/40 text-[10px] font-mono tracking-widest text-[#DFBD83] uppercase font-bold">
                  UPCOMING EVENT
                </span>
                <span className="text-xs text-[#DFBD83] font-mono">Live Interactive</span>
              </div>

              <h3 className="font-serif text-2xl font-medium text-white mb-4">
                {workshops.upcomingEvent.title}
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-[#E8EDE4]/90 font-light border-y border-[#B58B50]/20 py-4 mb-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#DFBD83] shrink-0" />
                  <span><strong>Date:</strong> {workshops.upcomingEvent.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#DFBD83] shrink-0" />
                  <span><strong>Time:</strong> {workshops.upcomingEvent.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Monitor className="w-4 h-4 text-[#DFBD83] shrink-0" />
                  <span><strong>Mode:</strong> {workshops.upcomingEvent.mode}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#DFBD83] shrink-0" />
                  <span><strong>Location:</strong> {workshops.upcomingEvent.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-[#DFBD83] shrink-0" />
                  <span><strong>Registration:</strong> {workshops.upcomingEvent.registration}</span>
                </div>
              </div>

              <p className="text-[11px] text-[#DFBD83]/80 italic mb-6">
                {workshops.upcomingEvent.note}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppUrl("Hi, I would like to register for the School Counselling Skills workshop.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#B58B50] hover:bg-[#A37B42] text-white text-xs font-semibold tracking-wide transition-all shadow-md"
              >
                <span>Register via WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <Link
                href="/events"
                className="inline-flex items-center justify-center px-4 py-3 rounded-full border border-[#DFBD83]/40 text-[#DFBD83] hover:bg-white/10 text-xs font-medium transition-all"
              >
                <span>All Events</span>
              </Link>
            </div>
          </div>

        </div>

        {/* OUR WORKSHOPS IN ACTION (Page 3 bottom) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#C8D6C6] shadow-sm mb-16">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold text-[#7D6335] uppercase tracking-wider block mb-2">
              {workshops.inAction.heading}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34] mb-3">
              {workshops.inAction.subheading}
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#465A4F] font-light leading-relaxed">
              {workshops.inAction.desc}
            </p>
          </div>
        </div>

        {/* PHOTO GALLERY CATEGORIES (Page 4 top) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-bold text-[#7D6335] uppercase tracking-wider block mb-1">
                PHOTO GALLERY
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
                Suggested Gallery Categories
              </h3>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D34] hover:text-[#7D6335] transition-colors"
            >
              <span>Explore Full Photo Gallery</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {workshops.galleryCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#C8D6C6] hover:border-[#7D6335] transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#EAF0E7] text-[#173D34] flex items-center justify-center mb-4">
                    <Camera className="w-5 h-5 text-[#7D6335]" />
                  </div>
                  <h4 className="font-serif text-base font-semibold text-[#173D34] mb-2">
                    {cat.title}
                  </h4>
                  <p className="font-sans text-xs text-[#59675F] font-light leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

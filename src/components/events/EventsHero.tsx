"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, Calendar, Sparkles, Users, Award } from "lucide-react";

export default function EventsHero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-[#173D34] text-[#F7F5EF] overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Decorative Gold & Emerald Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B58B50]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#102E27]/50 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#102E27] border border-[#B58B50]/40 text-[#DFBD83] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#DFBD83]" />
              <span>WORKSHOPS &amp; EVENTS</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight text-white">
              Learn. Reflect. <br className="hidden sm:inline" />
              <span className="italic text-[#DFBD83]">Connect. Grow.</span>
            </h1>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#E8EDE4]/85 font-light leading-relaxed max-w-xl">
              Discover learning experiences, workshops and wellbeing programmes designed to bring psychological understanding into everyday life.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => scrollTo("upcoming-events")}
                className="group px-7 py-3.5 rounded-full bg-[#DFBD83] hover:bg-[#c9a76d] text-[#102E27] text-sm font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Explore Upcoming Events</span>
                <ArrowDown className="w-4 h-4 text-[#102E27] group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo("past-events")}
                className="px-6 py-3.5 rounded-full border border-[#DFBD83]/40 hover:border-[#DFBD83] text-[#F7F5EF] hover:bg-[#102E27]/60 text-sm font-medium tracking-wide transition-all duration-200 text-center"
              >
                View Past Workshops
              </button>
            </div>

            {/* Credibility Badges */}
            <div className="pt-6 border-t border-[#DFBD83]/20 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#E8EDE4]/75">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#DFBD83] shrink-0" />
                <span>Small Cohort Capacity</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#DFBD83] shrink-0" />
                <span>RCI Ethical Standards</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Calendar className="w-4 h-4 text-[#DFBD83] shrink-0" />
                <span>Online &amp; In-Person Formats</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Featured Card / Photography (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-3 rounded-3xl border border-[#DFBD83]/25 -rotate-1 pointer-events-none" />

              {/* Card Container */}
              <div className="relative rounded-2xl overflow-hidden bg-[#102E27] border border-[#B58B50]/40 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80"
                  alt="Workshop participants engaged in active dialogue"
                  className="w-full h-72 sm:h-80 object-cover"
                />

                <div className="p-6 bg-[#102E27] text-left">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#DFBD83] font-semibold mb-2">
                    <span>Clinical Psychoeducation</span>
                    <span>Indore &amp; Online</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-white mb-2">
                    Bridging Science and Human Context
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E8EDE4]/80 font-light leading-relaxed">
                    Every workshop is led by licensed mental health practitioners, blending empirical psychology with empathetic, experiential practice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

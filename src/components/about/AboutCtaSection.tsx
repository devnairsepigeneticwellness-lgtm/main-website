"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react";
import { aboutCopy } from "@/data/aboutData";

interface AboutCtaSectionProps {
  onOpenBooking: () => void;
}

export default function AboutCtaSection({ onOpenBooking }: AboutCtaSectionProps) {
  const { footerCta } = aboutCopy;

  return (
    <section className="py-20 lg:py-28 bg-[#173D34] text-[#F7F5EF] relative overflow-hidden">
      {/* Decorative Radiance */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#102E27] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[450px] h-[450px] bg-[#B58B50]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-4 justify-center">
          <span className="w-8 h-[1px] bg-[#DFBD83]" />
          <span className="text-xs font-semibold tracking-[0.24em] text-[#DFBD83] uppercase font-sans">
            {footerCta.brand.toUpperCase()}
          </span>
          <span className="w-8 h-[1px] bg-[#DFBD83]" />
        </div>

        {/* Main Tagline (Exact PDF Copy) */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.18] tracking-tight mb-6">
          Because wellbeing begins with{" "}
          <span className="italic text-[#DFBD83]">understanding yourself.</span>
        </h2>

        {/* Services Ribbon List (Exact PDF Copy) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#E8EDE4]/90 mb-10 max-w-2xl mx-auto">
          {footerCta.servicesList.map((srv, idx) => (
            <React.Fragment key={idx}>
              <span className="font-medium tracking-wide">{srv}</span>
              {idx < footerCta.servicesList.length - 1 && (
                <span className="text-[#DFBD83]/60 font-light">&bull;</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Three Exact CTAs from PDF Page 5 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#B58B50] hover:bg-[#A37B42] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer"
          >
            <span>Book a Consultation</span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </button>

          <Link
            href="/screening"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F5EF] text-xs sm:text-sm font-medium tracking-wider uppercase border border-white/20 transition-all"
          >
            <span>Explore Our Assessment</span>
            <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
          </Link>

          <Link
            href="/events"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-transparent hover:bg-white/10 text-[#DFBD83] text-xs sm:text-sm font-medium tracking-wider uppercase border border-[#DFBD83]/40 transition-all"
          >
            <span>View Upcoming Events</span>
            <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
          </Link>
        </div>

      </div>
    </section>
  );
}

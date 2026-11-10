"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, ShieldCheck, Phone } from "lucide-react";

interface AboutCtaSectionProps {
  onOpenBooking: () => void;
}

export default function AboutCtaSection({ onOpenBooking }: AboutCtaSectionProps) {
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
            BEGIN THE CONVERSATION
          </span>
          <span className="w-8 h-[1px] bg-[#DFBD83]" />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.18] tracking-tight mb-6">
          Take the Next Step Towards{" "}
          <span className="italic text-[#DFBD83]">Greater Understanding.</span>
        </h2>

        {/* Supporting text */}
        <p className="font-sans text-base sm:text-lg text-[#E8EDE4]/90 font-light leading-relaxed max-w-2xl mx-auto mb-10">
          Connect with Nair&apos;s Epigenetic Wellness to explore our services, programmes and opportunities for support.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#B58B50] hover:bg-[#A37B42] text-white text-sm sm:text-base font-semibold tracking-wide shadow-xl hover:scale-[1.02] border border-[#DFBD83]/40 transition-all flex items-center justify-center gap-2"
          >
            <span>Book a Consultation</span>
            <ArrowUpRight className="w-4 h-4 text-[#F7F5EF]" />
          </button>

          <Link
            href="/services"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent hover:bg-white/10 text-[#F7F5EF] text-sm sm:text-base font-medium tracking-wide border border-[#E8EDE4]/30 hover:border-[#DFBD83] transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Our Services</span>
            <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
          </Link>
        </div>

        {/* Helpline note */}
        <div className="mt-12 pt-8 border-t border-[#102E27] flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-[#E8EDE4]/70 font-light">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#DFBD83]" />
            <span>Confidential &bull; RCI Registered Standards</span>
          </div>
          <span className="hidden sm:inline">&bull;</span>
          <a
            href="tel:+919446477779"
            className="flex items-center gap-2 hover:text-[#DFBD83] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#DFBD83]" />
            <span>Direct Line: +91 94464 77779</span>
          </a>
        </div>

      </div>
    </section>
  );
}


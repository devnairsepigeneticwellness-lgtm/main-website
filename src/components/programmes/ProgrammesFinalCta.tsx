"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Phone, Mail } from "lucide-react";

interface ProgrammesFinalCtaProps {
  onOpenBooking: (programmeName?: string) => void;
}

export default function ProgrammesFinalCta({ onOpenBooking }: ProgrammesFinalCtaProps) {
  const whatsappMessage = encodeURIComponent(
    "Hello Nair's Epigenetic Wellness team, I would like to enquire about your learning programmes."
  );

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-[#173D34] to-[#102E27] text-[#F7F5EF] relative overflow-hidden">
      {/* Soft Ambient Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B58B50]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Botanical Leaf Path (Subtle SVG, no sparkles) */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-[#DFBD83]">
          <path d="M40,160 Q100,60 160,40 Q140,120 40,160 Z" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102E27] border border-[#B58B50]/30 text-[#DFBD83] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DFBD83]" />
          START YOUR LEARNING JOURNEY
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.18] tracking-tight max-w-3xl mx-auto">
          Take the Next Step in Your <br />
          <span className="italic text-[#DFBD83]">Learning Journey.</span>
        </h2>

        {/* Supporting text */}
        <p className="mt-6 font-sans text-base sm:text-lg lg:text-xl text-[#E8EDE4]/85 leading-relaxed font-light max-w-2xl mx-auto">
          Explore opportunities for learning, reflection and professional growth with Nair&apos;s Epigenetic Wellness.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onOpenBooking("Programmes Inquiry")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#DFBD83] text-[#102E27] text-sm sm:text-base font-semibold hover:bg-white transition-all duration-300 shadow-lg group"
          >
            <span>Enquire About a Programme</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <Link
            href="/#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F5EF] text-sm sm:text-base font-medium border border-[#B58B50]/30 hover:border-[#DFBD83] transition-all duration-300"
          >
            <span>Contact Our Team</span>
            <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
          </Link>

          <a
            href={`https://wa.me/919446477779?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#102E27] border border-[#B58B50]/40 text-[#DFBD83] hover:text-white text-sm sm:text-base font-medium transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#DFBD83]" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Direct contact footer note */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#E8EDE4]/70 font-sans">
          <span className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#DFBD83]" />
            <span>+91 94464 77779</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#DFBD83]" />
            <span>ajit.navy@gmail.com</span>
          </span>
          <span className="text-white/20">•</span>
          <span>Panampilly Nagar, Kochi, Kerala</span>
        </div>

      </div>
    </section>
  );
}


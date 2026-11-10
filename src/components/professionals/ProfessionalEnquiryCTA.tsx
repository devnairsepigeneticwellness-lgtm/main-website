"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";

interface ProfessionalEnquiryCTAProps {
  onOpenBooking: (serviceOrName?: string) => void;
}

export default function ProfessionalEnquiryCTA({
  onOpenBooking,
}: ProfessionalEnquiryCTAProps) {
  return (
    <section className="py-20 lg:py-24 bg-[#E8EDE4] text-[#24352D] relative overflow-hidden border-b border-[#B58B50]/20">
      {/* Decorative Warm Elements */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#B58B50]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-white/40 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#173D34] text-xs font-semibold uppercase tracking-[0.2em] border border-[#B58B50]/30 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#B58B50]" />
          <span>COLLABORATIVE CARE</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.2] tracking-tight max-w-3xl mx-auto">
          Connect With the <span className="italic text-[#B58B50] font-light">N.E.W. Team.</span>
        </h2>

        {/* Supporting Text */}
        <p className="font-sans text-sm sm:text-base lg:text-lg text-[#59675F] max-w-2xl mx-auto font-light leading-relaxed">
          Whether you&apos;re exploring psychological support, professional guidance or learning opportunities, contact Nair&apos;s Epigenetic Wellness to understand the available options.
        </p>

        {/* Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onOpenBooking("Professional Team Enquiry")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white font-semibold text-sm sm:text-base tracking-wide border border-[#B58B50]/40 shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#DFBD83]" />
            <span>Enquire About a Professional</span>
          </button>

          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-[#F7F5EF] text-[#173D34] font-medium text-sm sm:text-base tracking-wide border border-[#B58B50]/40 transition-all cursor-pointer shadow-xs"
          >
            <span>Explore Our Services</span>
            <ArrowUpRight className="w-4 h-4 text-[#B58B50]" />
          </Link>
        </div>

      </div>
    </section>
  );
}

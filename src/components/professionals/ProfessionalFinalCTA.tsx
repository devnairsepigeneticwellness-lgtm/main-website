"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";

interface ProfessionalFinalCTAProps {
  onOpenBooking: (serviceOrName?: string) => void;
}

export default function ProfessionalFinalCTA({
  onOpenBooking,
}: ProfessionalFinalCTAProps) {
  return (
    <section className="py-20 lg:py-28 bg-[#102E27] text-[#F7F5EF] relative overflow-hidden">
      {/* Decorative Radial Gold Ambience */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#DFBD83]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#173D34]/80 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-7">
        
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#173D34] text-[#DFBD83] text-xs font-semibold uppercase tracking-[0.2em] border border-[#B58B50]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TAKE THE NEXT STEP</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.18] tracking-tight">
          Meaningful Support{" "}
          <span className="italic text-[#DFBD83] font-light">Begins With Understanding.</span>
        </h2>

        {/* Description */}
        <p className="font-sans text-sm sm:text-base lg:text-lg text-[#E8EDE4]/85 max-w-xl mx-auto font-light leading-relaxed">
          Explore our services or reach out to discuss your requirements with the N.E.W. team.
        </p>

        {/* Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onOpenBooking("Professional Team General Consultation")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#B58B50] hover:bg-[#A37B42] text-white font-semibold text-sm sm:text-base tracking-wide border border-[#DFBD83]/40 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>Contact Our Team</span>
          </button>

          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-transparent hover:bg-white/10 text-[#F7F5EF] font-medium text-sm sm:text-base tracking-wide border border-[#E8EDE4]/30 hover:border-[#DFBD83] transition-all cursor-pointer"
          >
            <span>View Services</span>
            <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
          </Link>
        </div>

      </div>
    </section>
  );
}

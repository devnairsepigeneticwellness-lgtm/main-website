"use client";

import React from "react";
import { Phone, Mail, ArrowUpRight } from "lucide-react";

export default function AnnouncementBar({
  onOpenBooking,
}: {
  onOpenBooking?: () => void;
}) {
  return (
    <aside aria-label="Announcement" className="bg-[#102E27] text-[#F7F5EF] border-b border-[#173D34]/50 text-xs sm:text-sm py-2 px-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        {/* Message */}
        <p className="flex items-center justify-center sm:justify-start gap-2 tracking-wide font-light text-[#E8EDE4]/90 text-center flex-wrap">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B58B50] animate-pulse shrink-0" />
          <span>Supporting wellbeing through understanding, awareness and meaningful change.</span>
        </p>

        {/* Quick Contact Links */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs tracking-wider uppercase text-[#E8EDE4]/80">
          <a
            href="tel:+919446477779"
            className="inline-flex items-center gap-1.5 hover:text-[#B58B50] transition-colors"
          >
            <Phone className="w-3 h-3 text-[#B58B50]" />
            <span className="hidden md:inline">+91 94464 77779</span>
            <span className="md:hidden">Call</span>
          </a>
          <span className="text-[#173D34]">|</span>
          <a
            href="mailto:ajit.navy@gmail.com"
            className="inline-flex items-center gap-1.5 hover:text-[#B58B50] transition-colors"
          >
            <Mail className="w-3 h-3 text-[#B58B50]" />
            <span className="hidden md:inline">ajit.navy@gmail.com</span>
            <span className="md:hidden">Email</span>
          </a>
          <span className="text-[#173D34]">|</span>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-1 text-[#DFBD83] hover:text-white font-medium transition-colors"
          >
            <span>Enquire</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </aside>
  );
}


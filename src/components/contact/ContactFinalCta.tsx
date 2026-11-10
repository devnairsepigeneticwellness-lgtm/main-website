"use client";

import React from "react";
import { ArrowDown, MessageCircle, Sparkles } from "lucide-react";

interface ContactFinalCtaProps {
  onScrollToForm: () => void;
}

export default function ContactFinalCta({ onScrollToForm }: ContactFinalCtaProps) {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-[#102E27] text-[#F7F5EF] relative overflow-hidden">
      {/* Soft Gold Radial Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-radial from-[#DFBD83]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#173D34]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Minimal Botanical Decoration SVG */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-48 h-48 opacity-10 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#DFBD83] stroke-current fill-none" strokeWidth="1.2">
          <path d="M50 90 Q50 40 85 20 Q50 35 50 90 Z" />
          <path d="M50 90 Q50 40 15 20 Q50 35 50 90 Z" />
          <path d="M50 90 L50 10" />
        </svg>
      </div>
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-48 h-48 opacity-10 pointer-events-none hidden lg:block scale-x-[-1]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#DFBD83] stroke-current fill-none" strokeWidth="1.2">
          <path d="M50 90 Q50 40 85 20 Q50 35 50 90 Z" />
          <path d="M50 90 Q50 40 15 20 Q50 35 50 90 Z" />
          <path d="M50 90 L50 10" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#173D34] border border-[#B58B50]/30 text-xs text-[#DFBD83] font-medium tracking-wide mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#DFBD83]" />
          <span>Integrative Psychological Care &bull; Professional Mentorship</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.18] tracking-tight">
          Take the First Step Towards{" "}
          <span className="italic font-serif text-[#DFBD83] block sm:inline">
            Greater Understanding.
          </span>
        </h2>

        {/* Supporting Text */}
        <p className="mt-6 max-w-2xl mx-auto font-sans text-base sm:text-lg lg:text-xl text-[#E8EDE4]/85 font-light leading-relaxed">
          Reach out to explore the available services, learning opportunities and ways to connect with Nair&apos;s Epigenetic Wellness.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <button
            type="button"
            onClick={onScrollToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#B58B50] hover:bg-[#A37B42] text-white text-sm sm:text-base font-semibold tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] border border-[#DFBD83]/40 transition-all duration-200 cursor-pointer"
          >
            <span>Send an Enquiry</span>
            <ArrowDown className="w-4 h-4 text-white" />
          </button>

          <a
            href="https://wa.me/919446477779?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Nair%27s%20Epigenetic%20Wellness."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-transparent hover:bg-white/10 text-[#F7F5EF] text-sm sm:text-base font-medium tracking-wide border border-[#E8EDE4]/30 hover:border-[#DFBD83] transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4 text-[#DFBD83]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <p className="mt-8 text-xs text-[#E8EDE4]/60 font-light">
          Indore Clinic Sessions &bull; Secure Video Appointments Worldwide &bull; Confidential &bull; Person-Centred
        </p>

      </div>
    </section>
  );
}


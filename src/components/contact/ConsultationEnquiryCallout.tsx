"use client";

import React from "react";
import { ArrowUpRight, Compass, HeartHandshake, Shield } from "lucide-react";
import { EnquiryType } from "./EnquiryFormSection";

interface ConsultationEnquiryCalloutProps {
  onRequestConsultation: (type: EnquiryType) => void;
}

export default function ConsultationEnquiryCallout({
  onRequestConsultation,
}: ConsultationEnquiryCalloutProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#E8EDE4] relative overflow-hidden border-t border-[#D9E2D4]">
      {/* Minimal Decorative Line Art */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-15 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#173D34] stroke-current fill-none">
          <circle cx="100" cy="100" r="80" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="50" strokeWidth="0.75" />
          <path d="M100 20 L100 180" strokeWidth="0.5" />
          <path d="M20 100 L180 100" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center justify-center gap-2.5 mb-3.5">
          <span className="w-6 h-[1px] bg-[#B58B50]" />
          <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
            START WITH A CONVERSATION
          </span>
          <span className="w-6 h-[1px] bg-[#B58B50]" />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] tracking-tight">
          Looking for Personalised Support?
        </h2>

        {/* Editorial Content */}
        <p className="mt-5 max-w-2xl mx-auto font-sans text-base sm:text-lg text-[#24352D]/85 font-light leading-relaxed">
          If you&apos;re unsure which service may be appropriate, you can contact N.E.W. to discuss the available options and possible next steps.
        </p>

        {/* Feature Highlights Strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#59675F]">
          <span className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#B58B50]" />
            <span>Integrative Guidance</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-[#B58B50]/40" />
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#B58B50]" />
            <span>Ethical Boundaries</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-[#B58B50]/40" />
          <span className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-[#B58B50]" />
            <span>Non-Judgmental Listening</span>
          </span>
        </div>

        {/* Premium Forest-Green CTA */}
        <div className="mt-9">
          <button
            type="button"
            onClick={() => onRequestConsultation("General Enquiry")}
            className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-[#173D34] hover:bg-[#102E27] text-white text-sm sm:text-base font-semibold tracking-wide shadow-md hover:shadow-xl hover:scale-[1.02] border border-[#B58B50]/40 transition-all duration-200 cursor-pointer"
          >
            <span>Request a Consultation</span>
            <ArrowUpRight className="w-4 h-4 text-[#DFBD83] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <p className="mt-3.5 text-xs text-[#59675F] font-light">
          No calendar commitment required upfront &bull; We will reach out to align on convenient timing
        </p>

      </div>
    </section>
  );
}


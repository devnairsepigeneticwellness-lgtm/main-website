"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ArrowUpRight } from "lucide-react";
import { PROFESSIONALS_FAQS } from "@/data/professionalsData";

interface ProfessionalFAQProps {
  onOpenBooking: (serviceOrName?: string) => void;
}

export default function ProfessionalFAQ({ onOpenBooking }: ProfessionalFAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5EF] text-[#24352D] relative overflow-hidden border-b border-[#B58B50]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#B58B50]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              COMMON QUESTIONS
            </span>
            <span className="w-6 h-[1px] bg-[#B58B50]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#173D34] leading-[1.2] tracking-tight">
            Frequently Asked <span className="italic text-[#B58B50] font-light">Questions.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#59675F] max-w-xl mx-auto font-light leading-relaxed">
            Essential clarity on consultations, professional allocations, and connecting with the N.E.W. clinical team.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {PROFESSIONALS_FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#E8EDE4] overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B58B50] cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg text-[#173D34] font-medium leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#E8EDE4]/60 flex items-center justify-center text-[#173D34] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#173D34] text-[#DFBD83]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#59675F] font-light leading-relaxed border-t border-[#E8EDE4]/60">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Help Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-[#B58B50]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#173D34]/10 text-[#173D34] flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5 text-[#B58B50]" />
            </div>
            <div>
              <span className="font-serif text-sm sm:text-base font-medium text-[#173D34] block">
                Have another specific question?
              </span>
              <span className="text-xs text-[#59675F] font-light block">
                Reach out to discuss your requirements with the N.E.W. team.
              </span>
            </div>
          </div>

          <button
            onClick={() => onOpenBooking("FAQ Professional Inquiry")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide border border-[#B58B50]/40 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Ask Our Team</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}

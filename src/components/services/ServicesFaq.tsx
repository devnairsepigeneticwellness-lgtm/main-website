"use client";

import React, { useState } from "react";
import { ChevronDown, PhoneCall, HelpCircle } from "lucide-react";

interface ServicesFaqProps {
  onOpenBooking: () => void;
}

export default function ServicesFaq({ onOpenBooking }: ServicesFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I know which service is appropriate for me?",
      a: "You can contact N.E.W. to discuss your concerns and understand the available options. The suitability of a service can be considered during the initial discussion.",
    },
    {
      q: "Are online sessions available?",
      a: "Online support may be available for certain services, depending on suitability and scheduling. Please contact the team for details.",
    },
    {
      q: "Can I enquire before booking a consultation?",
      a: "Yes. You can contact the team to ask about available services and possible next steps.",
    },
    {
      q: "Are services suitable for everyone?",
      a: "Individual needs and circumstances differ. The appropriate form of support should be considered with a qualified professional.",
    },
    {
      q: "How can I book a consultation?",
      a: "Use the Book a Consultation or Contact Us button to get in touch with N.E.W.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-3 justify-center">
            <span className="w-8 h-[1px] bg-[#B58B50]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <span className="w-8 h-[1px] bg-[#B58B50]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Clear Guidance on Our{" "}
            <span className="italic text-[#B58B50]">Services.</span>
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#59675F] leading-relaxed font-light">
            Answers to common questions about exploring services, online consultations and making an initial enquiry.
          </p>
        </div>

        {/* Accessible Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#B58B50]/20 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B58B50] cursor-pointer"
                >
                  <span className="font-serif text-lg sm:text-xl font-medium text-[#173D34]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-[#B58B50]/30 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#173D34] text-white" : "text-[#B58B50]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-[#59675F] font-light leading-relaxed border-t border-[#E8EDE4] pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Assistance Card */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-[#E8EDE4]/50 border border-[#B58B50]/20 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="font-serif text-xl font-medium text-[#173D34]">
              Have an individual question or specific context?
            </h4>
            <p className="text-xs sm:text-sm text-[#59675F] mt-1 font-light">
              Speak with our team to discuss your goals in a confidential conversation.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-full bg-[#173D34] text-white text-xs sm:text-sm font-medium hover:bg-[#102E27] transition-all"
            >
              Book Consultation
            </button>
            <a
              href="tel:+919446477779"
              className="px-4 py-2.5 rounded-full border border-[#B58B50] text-[#173D34] text-xs sm:text-sm font-medium hover:bg-[#B58B50]/10 flex items-center gap-1.5 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#B58B50]" />
              <span>Call Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}


"use client";

import React, { useState } from "react";
import { ChevronDown, MessageCircle, Mail } from "lucide-react";

interface ProgrammesFaqProps {
  onOpenBooking: () => void;
}

export default function ProgrammesFaq({ onOpenBooking }: ProgrammesFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Who are these programmes suitable for?",
      a: "Our programmes are designed for psychology students, emerging practitioners, educators, corporate teams, and institutions seeking evidence-informed learning, reflective understanding, and practical skill development.",
    },
    {
      q: "Are these accredited degree or licensing programmes?",
      a: "No. Programmes at N.E.W. are educational and experiential learning opportunities aimed at personal and professional development. They do not confer academic degrees, formal clinical licensing, or government accreditation.",
    },
    {
      q: "Are the programmes delivered online or in person?",
      a: "Delivery format varies by programme. Many modules are offered via interactive online cohorts, while select workshops, institutional training, and internship activities can be conducted in person at our Kochi centre or host premises.",
    },
    {
      q: "How do I apply or register for a programme?",
      a: "You can initiate an enquiry through our website or contact our administrative team via WhatsApp (+91 94464 77779) or email (ajit.navy@gmail.com). We will share the current schedule, prerequisites, and registration details.",
    },
    {
      q: "Can programmes be customised for our organisation or college?",
      a: "Yes. We regularly collaborate with academic institutions and corporate partners to design bespoke training modules aligned with their specific development goals, schedules, and learning needs.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EDE4] text-[#173D34] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B58B50]" />
            COMMONLY ASKED QUESTIONS
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.2] tracking-tight">
            Everything You Need to Know <br />
            <span className="italic text-[#B58B50]">About Our Programmes.</span>
          </h2>

          <p className="mt-4 font-sans text-base sm:text-lg text-[#59675F] leading-relaxed font-light">
            Clear information on cohorts, learning formats, institutional partnerships, and enquiry processes.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#B58B50]/20 overflow-hidden transition-all duration-200 shadow-xs"
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
                    className={`w-9 h-9 rounded-full border border-[#B58B50]/30 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#173D34] text-white" : "text-[#B58B50] bg-[#E8EDE4]/50"
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
        <div className="mt-12 p-8 rounded-3xl bg-[#E8EDE4]/70 border border-[#B58B50]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-xl font-medium text-[#173D34]">
              Have a Specific Question?
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#59675F] font-light mt-1">
              Our team is happy to discuss learning goals, cohort prerequisites, and institutional formats.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#173D34] text-[#F7F5EF] text-xs sm:text-sm font-semibold hover:bg-[#102E27] transition-all shadow-xs"
            >
              Enquire Now
            </button>
            <a
              href="https://wa.me/919446477779?text=Hello%20Nair's%20Epigenetic%20Wellness%20team,%20I%20have%20a%20question%20about%20your%20programmes."
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white text-[#173D34] border border-[#B58B50]/30 hover:border-[#B58B50] transition-colors"
              aria-label="WhatsApp enquiry"
            >
              <MessageCircle className="w-4 h-4 text-[#B58B50]" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

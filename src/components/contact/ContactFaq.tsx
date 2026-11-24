"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getWhatsAppUrl } from "@/components/SocialIcons";

export default function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I enquire about a service?",
      a: "You can complete the enquiry form, call or contact N.E.W. through WhatsApp.",
    },
    {
      q: "Can I enquire about internships and mentorship programmes?",
      a: "Yes. Select the relevant programme in the enquiry form or contact the team directly.",
    },
    {
      q: "Can organisations request workshops?",
      a: "Organisations can contact N.E.W. to discuss their learning requirements and possible workshop options.",
    },
    {
      q: "Are online consultations available?",
      a: "Availability depends on the service and individual circumstances. Please contact the team for current details.",
    },
    {
      q: "How soon will I receive a response?",
      a: "The team will respond based on enquiry volume and availability.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F7F5EF] relative overflow-hidden">
      {/* Decorative Gold & Forest Background Blur */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#B58B50]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Eyebrow */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2.5 mb-3.5">
            <span className="w-6 h-[1px] bg-[#B58B50]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              COMMON QUESTIONS
            </span>
            <span className="w-6 h-[1px] bg-[#B58B50]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] tracking-tight">
            Before You Reach Out.
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#59675F] font-light leading-relaxed">
            Helpful answers to common questions about connecting, consultations, learning programmes, and institutional workshops.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-heading-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={faq.q}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#FCFAF6] border-[#B58B50]/50 shadow-md"
                    : "bg-[#FCFAF6]/70 border-[#E8EDE4] hover:border-[#B58B50]/30"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={headingId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left py-5 px-6 sm:px-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B58B50]"
                  >
                    <span className="font-serif text-lg sm:text-xl font-medium text-[#173D34] leading-snug">
                      {faq.q}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "bg-[#173D34] text-[#DFBD83] rotate-180"
                          : "bg-[#E8EDE4] text-[#173D34]"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 border-t border-[#E8EDE4]/60 animate-in fade-in duration-200"
                  >
                    <p className="font-sans text-sm sm:text-base text-[#59675F] font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Prompt */}
        <div className="mt-10 sm:mt-12 text-center text-xs sm:text-sm text-[#59675F]">
          <span>Still have a question not covered here? </span>
          <a
            href={getWhatsAppUrl("Hello, I have a question about Nair's Epigenetic Wellness.")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#173D34] font-medium underline hover:text-[#B58B50] transition-colors"
          >
            Chat with us on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}

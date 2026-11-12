"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, PhoneCall } from "lucide-react";

export default function FaqSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What should I expect during my first consultation?",
      a: "The first session is a gentle, structured exploratory conversation. We will listen attentively to what brings you to seek support, explore your personal and family context, review any past coping mechanisms, and understand your immediate goals. There is no pressure or judgment; you are invited to share only what you feel ready to discuss.",
    },
    {
      q: "How does the 'Epigenetic Wellness' approach differ from traditional therapy?",
      a: "Traditional therapy often focuses strictly on symptom management. The N.E.W. Epigenetic approach recognizes that thoughts, emotional states, chronic stress, and lifestyle actively shape your neurological and physiological expression. By combining cognitive therapies, mindfulness, and practical behavioral restructuring, we foster shifts that positively impact both psychological clarity and bodily vitality.",
    },
    {
      q: "Are online consultations as effective as in-person sessions?",
      a: "Yes, extensive clinical research confirms that online psychotherapy and counselling produce outcomes equal to in-person sessions. We use secure, encrypted video platforms that allow you to connect from the comfort, privacy, and safety of your own home, whether you are in India or living abroad.",
    },
    {
      q: "How many sessions are typically required?",
      a: "Because each individual’s background and objectives are unique, therapy is never one-size-fits-all. Some clients seeking clarity around a specific transition or decision benefit from 4 to 8 focused sessions, while deeper pattern restructuring or rehabilitation may involve longer collaborative work. Progress is reviewed transparently together at regular intervals.",
    },
    {
      q: "What credentials and ethical standards does N.E.W. adhere to?",
      a: "Founder Ajit Kumar Nair is a qualified Counselling Psychologist and a registered Rehabilitation Counselor with the Rehabilitation Council of India (RCI). All clinical interactions strictly uphold established codes of confidentiality, professional boundaries, and informed client consent.",
    },
    {
      q: "How do I take the first step to book?",
      a: "You can click 'Book a Consultation' on this page, send a message through the contact form, or connect directly via phone or WhatsApp at +91 94464 77779. Our team will guide you through scheduling a convenient time slot and answer any preliminary questions.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F3F7F1] border-t border-[#C8D6C6] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-3 justify-center">
            <span className="w-6 h-[1px] bg-[#9E783E]" />
            <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
              Clarity &amp; Common Questions
            </span>
            <span className="w-6 h-[1px] bg-[#9E783E]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Frequently Asked{" "}
            <span className="italic text-[#7D6335]">Questions.</span>
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#465A4F] leading-relaxed font-light">
            Clear, transparent guidance to help you feel informed and comfortable before your initial conversation.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#E6EEE3] rounded-2xl border border-[#C8D6C6] hover:border-[#9E783E]/50 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="font-serif text-lg sm:text-xl font-medium text-[#173D34]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-[#B8C9B5] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#1E3F35] text-[#DFBD83]" : "bg-[#DCE7DA] text-[#1E3F35]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-[#384D42] font-normal leading-relaxed animate-in fade-in duration-200 border-t border-[#C8D6C6] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-[#DEE7DB] border border-[#C5D4C2] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="font-serif text-xl font-medium text-[#173D34]">
              Have a specific question not covered here?
            </h4>
            <p className="text-xs sm:text-sm text-[#465A4F] mt-1 font-light">
              Reach out directly to speak with our admissions and consultation team.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-full bg-[#1E3F35] text-[#F7F5EF] text-xs sm:text-sm font-medium hover:bg-[#285246] transition-all"
            >
              Ask a Question
            </button>
            <a
              href="tel:+919446477779"
              className="px-4 py-2.5 rounded-full border border-[#1E3F35] bg-[#EAF0E7] text-[#1E3F35] text-xs sm:text-sm font-medium hover:bg-[#1E3F35] hover:text-[#DFBD83] flex items-center gap-1.5 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#7D6335]" />
              <span>Call Team</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}


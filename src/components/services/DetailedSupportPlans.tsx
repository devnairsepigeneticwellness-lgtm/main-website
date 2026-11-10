"use client";

import React from "react";
import { ArrowUpRight, MessageSquare, ClipboardCheck, Compass, CheckCircle2 } from "lucide-react";

interface DetailedSupportPlansProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function DetailedSupportPlans({ onOpenBooking }: DetailedSupportPlansProps) {
  const steps = [
    {
      num: "01",
      step: "Step 1",
      title: "Initial Enquiry",
      desc: "The individual contacts N.E.W. with their concerns or requirements.",
      icon: MessageSquare,
    },
    {
      num: "02",
      step: "Step 2",
      title: "Understanding Needs",
      desc: "An appropriate professional discusses the concerns and relevant circumstances.",
      icon: ClipboardCheck,
    },
    {
      num: "03",
      step: "Step 3",
      title: "Exploring Options",
      desc: "Possible services and suitable therapeutic approaches are considered collaboratively.",
      icon: Compass,
    },
    {
      num: "04",
      step: "Step 4",
      title: "Next Steps & Review",
      desc: "The individual is guided towards the agreed next steps, reviewed periodically where appropriate.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="support-plans" className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#B58B50]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              INDIVIDUALISED APPROACH &bull; SERVICE 07
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Understanding Needs.{" "}
            <span className="italic text-[#B58B50]">Planning Appropriate Support.</span>
          </h2>

          <p className="mt-6 font-sans text-base sm:text-lg text-[#59675F] leading-relaxed font-light">
            Support planning involves considering the individual&apos;s concerns, priorities and goals before identifying appropriate next steps.
          </p>
        </div>

        {/* 4-Step Connected Timeline */}
        <div className="relative mb-12">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-[52px] left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#B58B50]/30 to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.num}
                  className="bg-white rounded-3xl p-7 border border-[#B58B50]/20 hover:border-[#B58B50] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Circle & Icon Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-full bg-[#173D34] text-[#DFBD83] border border-[#B58B50]/40 flex items-center justify-center font-serif text-base font-semibold shadow-sm group-hover:scale-105 group-hover:border-[#DFBD83] transition-transform">
                        {st.num}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#E8EDE4] text-[#173D34] flex items-center justify-center group-hover:bg-[#B58B50] group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" strokeWidth={1.5} />
                      </div>
                    </div>

                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#B58B50] font-semibold block mb-1">
                      {st.step}
                    </span>

                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#173D34] mb-3 group-hover:text-[#B58B50] transition-colors leading-snug">
                      {st.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-[#59675F] font-light leading-relaxed">
                      {st.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E8EDE4] text-[11px] text-[#B58B50] font-medium flex items-center justify-between">
                    <span>Collaborative Step</span>
                    <span>&bull;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Callout Bar */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#173D34] to-[#102E27] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#DFBD83] font-semibold">
              Tailored Consultation
            </span>
            <h4 className="font-serif text-2xl font-light mt-1">
              Discuss Your Individual Requirements
            </h4>
            <p className="text-xs sm:text-sm text-[#E8EDE4]/80 mt-1 font-light leading-relaxed">
              Every person&apos;s background is distinct. Our team is here to listen and help you identify the most suitable next steps without pressure.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking("Treatment & Support Plans")}
            className="shrink-0 px-8 py-3.5 rounded-full bg-[#DFBD83] hover:bg-[#c9a76d] text-[#102E27] text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all flex items-center gap-2"
          >
            <span>Request Support Plan Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}


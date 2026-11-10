"use client";

import React from "react";
import { ArrowUpRight, Globe, Target, RefreshCw, ShieldAlert } from "lucide-react";

interface DetailedRehabilitationProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function DetailedRehabilitation({ onOpenBooking }: DetailedRehabilitationProps) {
  const blocks = [
    {
      title: "Remote Accessibility",
      desc: "Access appropriate support without always requiring physical attendance, supported by secure digital platforms.",
      icon: Globe,
    },
    {
      title: "Individualised Goals",
      desc: "Consider practical goals according to the individual's needs, lifestyle context and developmental stage.",
      icon: Target,
    },
    {
      title: "Ongoing Guidance",
      desc: "Explore suitable strategies, monitor adaptive functioning and review progress collaboratively where appropriate.",
      icon: RefreshCw,
    },
  ];

  return (
    <section id="rehabilitation" className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#B58B50]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              ACCESSIBLE SUPPORT &bull; SERVICE 04
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Support Beyond{" "}
            <span className="italic text-[#B58B50]">Physical Boundaries.</span>
          </h2>

          <p className="mt-6 font-sans text-base sm:text-lg text-[#59675F] leading-relaxed font-light">
            Online rehabilitation offers the possibility of remote professional support where suitable, helping individuals work towards practical goals relating to functioning, independence and wellbeing.
          </p>
        </div>

        {/* 3 Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blocks.map((block, idx) => {
            const Icon = block.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-[#B58B50]/20 hover:border-[#B58B50] transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E8EDE4] text-[#173D34] flex items-center justify-center mb-6 group-hover:bg-[#173D34] group-hover:text-[#DFBD83] transition-colors">
                    <Icon className="w-6 h-6" strokeWidth={1.4} />
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[#173D34] mb-3 group-hover:text-[#B58B50] transition-colors">
                    {block.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-[#59675F] font-light leading-relaxed">
                    {block.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E8EDE4] text-xs text-[#B58B50] font-medium flex items-center justify-between">
                  <span>RCI Framework Support</span>
                  <span>&bull;</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ethical Disclaimer & Action */}
        <div className="p-8 rounded-3xl bg-[#E8EDE4]/60 border border-[#B58B50]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-3.5 max-w-xl text-xs sm:text-sm text-[#59675F] font-light leading-relaxed">
            <ShieldAlert className="w-5 h-5 text-[#B58B50] shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#173D34] font-medium">Clinical Scope:</strong> Online rehabilitation is subject to individual suitability. It is not designed to replace emergency medical care or specialized in-person physical interventions when those are clinically required.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking("Online Rehabilitation")}
            className="shrink-0 px-8 py-3.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all flex items-center gap-2"
          >
            <span>Enquire About Online Rehabilitation</span>
            <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
          </button>
        </div>

      </div>
    </section>
  );
}


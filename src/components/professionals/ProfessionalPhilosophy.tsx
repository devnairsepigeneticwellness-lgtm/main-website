"use client";

import React from "react";
import { PHILOSOPHY_PILLARS } from "@/data/professionalsData";

export default function ProfessionalPhilosophy() {
  return (
    <section className="py-20 lg:py-28 bg-[#102E27] text-[#F7F5EF] relative overflow-hidden border-b border-[#B58B50]/20">
      {/* Background Ambience & Botanical Overlay */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#DFBD83]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#173D34]/60 rounded-full blur-2xl pointer-events-none" />

      <svg
        className="absolute bottom-[-10%] right-[-5%] w-80 h-80 opacity-5 pointer-events-none text-[#DFBD83]"
        viewBox="0 0 200 200"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#DFBD83]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#DFBD83] uppercase font-sans">
              THE N.E.W. APPROACH
            </span>
            <span className="w-6 h-[1px] bg-[#DFBD83]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-white leading-[1.2] tracking-tight">
            Understanding the Individual{" "}
            <span className="italic text-[#DFBD83] font-light">Beyond a Single Concern.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base lg:text-lg text-[#E8EDE4]/85 leading-relaxed font-light">
            People bring different experiences, challenges, values and circumstances to professional support. N.E.W. emphasises understanding the individual and exploring appropriate approaches according to their needs.
          </p>
        </div>

        {/* Four Editorial Blocks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PHILOSOPHY_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="p-7 sm:p-8 rounded-3xl bg-[#173D34]/70 border border-[#B58B50]/30 hover:border-[#DFBD83]/60 transition-all duration-300 flex flex-col justify-between text-left group hover:bg-[#173D34]"
            >
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-light text-[#DFBD83] block mb-6 group-hover:scale-105 transition-transform origin-left">
                  {pillar.number}
                </span>

                <h3 className="font-serif text-xl font-normal text-white mb-3 leading-snug">
                  {pillar.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#E8EDE4]/80 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#DFBD83]/15 flex items-center justify-between text-[11px] text-[#DFBD83]">
                <span className="uppercase tracking-widest font-semibold">Principle</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#DFBD83]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

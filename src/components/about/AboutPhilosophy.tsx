"use client";

import React from "react";
import { User, Eye, Wrench, Sparkles, ArrowRight } from "lucide-react";
import { aboutCopy } from "@/data/aboutData";

export default function AboutPhilosophy() {
  const { philosophy } = aboutCopy;

  const icons = [User, Eye, Wrench, Sparkles];

  return (
    <section id="philosophy-section" className="py-20 lg:py-28 bg-[#173D34] text-[#F7F5EF] relative overflow-hidden">
      {/* Decorative Radiance */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[#102E27] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#B58B50]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#DFBD83]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#DFBD83] uppercase font-sans">
              CORE FOUNDATION
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.18] tracking-tight">
            Our <span className="italic text-[#DFBD83]">Philosophy.</span>
          </h2>

          <p className="mt-4 font-sans text-base sm:text-lg text-[#E8EDE4]/85 leading-relaxed font-light">
            A human-centred roadmap designed to move beyond symptom management toward self-awareness, grounded tools, and sustainable wellbeing.
          </p>
        </div>

        {/* Four Core Philosophy Cards (Exact PDF 4 Principles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophy.principles.map((item, idx) => {
            const Icon = icons[idx] || Sparkles;
            return (
              <div
                key={item.num}
                className="rounded-3xl bg-[#102E27]/90 border border-[#B58B50]/30 hover:border-[#DFBD83] p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-light text-[#DFBD83]">
                      {item.num}
                    </span>
                    <div className="w-11 h-11 rounded-full bg-[#173D34] border border-[#B58B50]/40 flex items-center justify-center text-[#DFBD83] group-hover:bg-[#B58B50] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.4} />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-3 group-hover:text-[#DFBD83] transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#E8EDE4]/80 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#173D34] flex items-center justify-between text-xs text-[#DFBD83]">
                  <span className="font-mono uppercase tracking-wider text-[10px]">
                    Step 0{idx + 1}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium group-hover:translate-x-1 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

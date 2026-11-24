"use client";

import React from "react";
import { TEAM_VALUES } from "@/data/professionalsData";
import { BookOpen, Heart, Compass } from "lucide-react";

export default function TeamIntroduction() {
  const valueIcons = [BookOpen, Heart, Compass];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5EF] text-[#24352D] relative overflow-hidden border-b border-[#B58B50]/20">
      {/* Decorative Warm Blur */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#B58B50]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              THE PEOPLE BEHIND N.E.W.
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#173D34] leading-[1.2] tracking-tight">
            Knowledge, Experience and a{" "}
            <span className="italic text-[#B58B50] font-light">Person-Centred Approach.</span>
          </h2>

          <div className="space-y-4 pt-3 font-sans text-sm sm:text-base lg:text-lg text-[#59675F] leading-relaxed font-light">
            <p>
              At Nair&apos;s Epigenetic Wellness, our professional community brings together knowledge and experience from different areas of psychological wellbeing, counselling, rehabilitation and related disciplines.
            </p>
            <p>
              Each professional brings an individual background and perspective to their work, while sharing an interest in thoughtful, respectful and appropriate support.
            </p>
          </div>
        </div>

        {/* Three Values Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TEAM_VALUES.map((val, idx) => {
            const Icon = valueIcons[idx] || Compass;
            return (
              <div
                key={val.number}
                className="group p-8 sm:p-10 rounded-3xl bg-white border border-[#E8EDE4] hover:border-[#B58B50]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden"
              >
                {/* Subtle top gold accent bar on hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-[#B58B50] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Card Number & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-serif text-2xl sm:text-3xl font-light text-[#B58B50]">
                      {val.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#E8EDE4]/60 text-[#173D34] group-hover:bg-[#173D34] group-hover:text-[#DFBD83] flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#173D34] mb-3 leading-snug">
                    {val.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm sm:text-[15px] text-[#59675F] leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E8EDE4] flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B58B50]">
                  <span>Core Principle</span>
                  <span className="w-2 h-2 rounded-full bg-[#B58B50]/40" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

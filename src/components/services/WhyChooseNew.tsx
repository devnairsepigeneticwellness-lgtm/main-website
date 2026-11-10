"use client";

import React from "react";
import { UserCheck, Brain, Compass, Sparkles } from "lucide-react";

export default function WhyChooseNew() {
  const highlights = [
    {
      num: "01",
      title: "Person-Centred Approach",
      desc: "Focuses on the whole human being, respecting personal values, pacing and unique life circumstances.",
      icon: UserCheck,
    },
    {
      num: "02",
      title: "Psychological Understanding",
      desc: "Deep exploration of the cognitive, emotional and behavioral patterns that shape everyday functioning.",
      icon: Brain,
    },
    {
      num: "03",
      title: "Integrative Perspective",
      desc: "Drawing upon diverse evidence-informed psychological modalities tailored to personal readiness.",
      icon: Compass,
    },
    {
      num: "04",
      title: "Practical Skill Development",
      desc: "Translating reflective insights into dependable everyday coping skills, emotional regulation and resilience.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#173D34] text-[#F7F5EF] relative overflow-hidden">
      {/* Decorative Radial Backdrop */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[#102E27] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#B58B50]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#DFBD83]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#DFBD83] uppercase font-sans">
              THE N.E.W. APPROACH
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.18] tracking-tight">
            Thoughtful Support Built on{" "}
            <span className="italic text-[#DFBD83]">Understanding.</span>
          </h2>
        </div>

        {/* Four Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="rounded-3xl bg-[#102E27]/90 border border-[#B58B50]/30 hover:border-[#DFBD83] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-2xl font-light text-[#DFBD83]">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#173D34] text-[#DFBD83] border border-[#B58B50]/30 flex items-center justify-center group-hover:bg-[#B58B50] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-white mb-2 group-hover:text-[#DFBD83] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#E8EDE4]/80 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#173D34] text-[10px] uppercase tracking-wider text-[#DFBD83]/70">
                  Integrative Pillar
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


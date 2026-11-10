"use client";

import React from "react";
import { Headphones, Search, Wrench, Sprout } from "lucide-react";

export default function AboutApproachTimeline() {
  const steps = [
    {
      num: "01",
      stepLabel: "Step 1",
      title: "Listen & Understand",
      desc: "Explore the person's concerns, life experiences, cultural background and personal goals in a respectful, unhurried space.",
      icon: Headphones,
    },
    {
      num: "02",
      stepLabel: "Step 2",
      title: "Reflect & Explore",
      desc: "Understand relevant emotional, behavioural and relational patterns that may be contributing to current challenges.",
      icon: Search,
    },
    {
      num: "03",
      stepLabel: "Step 3",
      title: "Learn & Practise",
      desc: "Introduce appropriate practical strategies, psychological coping tools and experiential learning opportunities.",
      icon: Wrench,
    },
    {
      num: "04",
      stepLabel: "Step 4",
      title: "Review & Grow",
      desc: "Reflect on progress, navigate emergent challenges collaboratively, and formulate sustainable next steps.",
      icon: Sprout,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5EF] border-t border-[#B58B50]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3 justify-center">
            <span className="w-8 h-[1px] bg-[#B58B50]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              OUR APPROACH IN PRACTICE
            </span>
            <span className="w-8 h-[1px] bg-[#B58B50]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            From Understanding to{" "}
            <span className="italic text-[#B58B50]">Practical Change.</span>
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#59675F] leading-relaxed font-light">
            An adaptive, person-centred pathway shaped around your individuality &mdash; not a rigid, formulaic procedure.
          </p>
        </div>

        {/* 4-Step Horizontal Timeline */}
        <div className="relative">
          {/* Subtle connecting line across cards on desktop */}
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
                    {/* Numbered Circle & Icon Top Row */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-full bg-[#173D34] text-[#DFBD83] border border-[#B58B50]/40 flex items-center justify-center font-serif text-base font-semibold shadow-sm group-hover:scale-105 group-hover:border-[#DFBD83] transition-transform">
                        {st.num}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#E8EDE4] text-[#173D34] flex items-center justify-center group-hover:bg-[#B58B50] group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" strokeWidth={1.5} />
                      </div>
                    </div>

                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#B58B50] font-semibold block mb-1">
                      {st.stepLabel}
                    </span>

                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#173D34] mb-3 group-hover:text-[#B58B50] transition-colors leading-snug">
                      {st.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-[#59675F] font-light leading-relaxed">
                      {st.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E8EDE4] text-[11px] text-[#B58B50] font-medium flex items-center justify-between">
                    <span>Collaborative Stage</span>
                    <span>&bull;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Adaptive Disclaimer Note */}
        <p className="text-center text-xs text-[#59675F] font-light mt-12 max-w-xl mx-auto">
          *Every person&apos;s pacing, readiness and requirements are distinct. The therapeutic trajectory is continuously adapted to your individual needs and therapeutic relationship.
        </p>

      </div>
    </section>
  );
}


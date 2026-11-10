"use client";

import React from "react";
import { BookOpen, MessagesSquare, Lightbulb, Compass, ArrowRight } from "lucide-react";

export default function LearningApproachTimeline() {
  const steps = [
    {
      num: "01",
      title: "Understand",
      subtitle: "Foundational Clarity",
      desc: "Delve into essential psychological and wellbeing concepts, theories and evidence-informed principles.",
      icon: BookOpen,
    },
    {
      num: "02",
      title: "Discuss",
      subtitle: "Guided Exploration",
      desc: "Participate in guided discussions, contextual case explorations and open dialogues with mentors and peers.",
      icon: MessagesSquare,
    },
    {
      num: "03",
      title: "Reflect",
      subtitle: "Inner Awareness",
      desc: "Connect concepts with real-world experiences, examining professional ethics, personal values and emotional boundaries.",
      icon: Lightbulb,
    },
    {
      num: "04",
      title: "Apply",
      subtitle: "Skill Integration",
      desc: "Develop grounded practical skills through structured exercises, communication practices and real-world integration.",
      icon: Compass,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EDE4] text-[#173D34] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B58B50]" />
            OUR METHODOLOGY
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.2] tracking-tight">
            Learning With Reflection, <br />
            <span className="italic text-[#B58B50]">Practice and Purpose.</span>
          </h2>

          <p className="mt-5 font-sans text-base sm:text-lg text-[#59675F] leading-relaxed font-light">
            Every learning experience at N.E.W. is anchored in a thoughtful progression from core concepts to reflective, grounded application.
          </p>
        </div>

        {/* 4-Step Timeline */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-14 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#B58B50]/30 via-[#B58B50] to-[#B58B50]/30 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex flex-col items-center text-center group">
                  {/* Step Number Circle */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-[#B58B50]/40 group-hover:border-[#B58B50] text-[#173D34] flex flex-col items-center justify-center shadow-md group-hover:scale-105 transition-all duration-300">
                      <span className="font-serif text-xs font-semibold text-[#B58B50] tracking-widest uppercase">
                        Step
                      </span>
                      <span className="font-serif text-lg sm:text-xl font-bold text-[#173D34] leading-tight">
                        {step.num}
                      </span>
                    </div>

                    {/* Minimal Icon Accent */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center shadow-xs">
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Step Title & Subtitle */}
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#173D34] mb-1 group-hover:text-[#B58B50] transition-colors">
                    {step.title}
                  </h3>
                  <span className="text-xs font-sans text-[#B58B50] font-medium uppercase tracking-wider mb-3">
                    {step.subtitle}
                  </span>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-[#59675F] font-light leading-relaxed max-w-xs">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="mt-16 text-center">
          <p className="text-xs font-sans text-[#59675F]/80 tracking-wide italic">
            * The exact learning activities and delivery methods depend on each approved programme format.
          </p>
        </div>

      </div>
    </section>
  );
}


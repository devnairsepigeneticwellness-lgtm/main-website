"use client";

import React from "react";
import { Compass, Lightbulb, Wrench, HeartPulse, ArrowRight } from "lucide-react";

export default function ApproachRoadmap({ onOpenBooking }: { onOpenBooking: () => void }) {
  const steps = [
    {
      num: "01",
      title: "Understand Your Experience",
      tagline: "Exploration & Contextual Listening",
      desc: "We explore the specific challenges, past conditioning, relational dynamics, and environmental triggers bringing you to seek support.",
      icon: Compass,
    },
    {
      num: "02",
      title: "Recognise Cognitive & Emotional Patterns",
      tagline: "Awareness Over Autopilot",
      desc: "Develop mindful clarity regarding how automatic thought loops, emotional vulnerabilities, and habitual behaviours interact.",
      icon: Lightbulb,
    },
    {
      num: "03",
      title: "Build Practical Psychological Skills",
      tagline: "Actionable Daily Strategies",
      desc: "Practice targeted psychological tools: distress tolerance, cognitive restructuring, assertive communication, and nervous system regulation.",
      icon: Wrench,
    },
    {
      num: "04",
      title: "Sustain Meaningful & Lasting Change",
      tagline: "Integration & Resilience",
      desc: "Establish renewed confidence, authentic self-direction, deeper interpersonal bonds, and a peaceful relationship with your mind.",
      icon: HeartPulse,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3 justify-center">
            <span className="w-6 h-[1px] bg-[#B58B50]" />
            <span className="text-xs font-semibold tracking-[0.22em] text-[#B58B50] uppercase font-sans">
              The N.E.W. Approach
            </span>
            <span className="w-6 h-[1px] bg-[#B58B50]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            More than theory.{" "}
            <span className="italic text-[#B58B50]">Practical support for everyday life.</span>
          </h2>

          <p className="mt-4 font-sans text-base text-[#59675F] leading-relaxed font-light">
            Psychological knowledge becomes transformative when it is understood, reflected upon,
            and translated into dependable everyday skills.
          </p>
        </div>

        {/* 4 Steps Horizontal Connected Grid */}
        <div className="relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#B58B50]/30 to-transparent -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-white rounded-2xl p-7 border border-[#B58B50]/20 hover:border-[#B58B50] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
                >
                  <div>
                    {/* Top Step Pill & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="w-8 h-8 rounded-full bg-[#173D34] text-[#DFBD83] font-serif text-sm font-semibold flex items-center justify-center">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[#E8EDE4] text-[#173D34] flex items-center justify-center group-hover:bg-[#B58B50] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                    </div>

                    <h3 className="font-serif text-xl font-medium text-[#173D34] mb-1 group-hover:text-[#B58B50] transition-colors leading-snug">
                      {step.title}
                    </h3>

                    <span className="block text-xs font-sans tracking-wide text-[#B58B50] mb-3 font-medium">
                      {step.tagline}
                    </span>

                    <p className="font-sans text-xs sm:text-sm text-[#59675F] leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E8EDE4] flex items-center justify-between text-xs text-[#B58B50]">
                    <span>Step {step.num} Phase</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#173D34] text-[#F7F5EF] text-sm font-medium tracking-wide shadow-md hover:bg-[#102E27] hover:scale-[1.02] border border-[#B58B50]/30 transition-all"
          >
            <span>Begin Your Personal Journey with N.E.W.</span>
            <ArrowRight className="w-4 h-4 text-[#DFBD83]" />
          </button>
        </div>

      </div>
    </section>
  );
}


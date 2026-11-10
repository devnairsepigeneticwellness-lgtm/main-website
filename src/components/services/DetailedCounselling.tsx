"use client";

import React from "react";
import { ArrowUpRight, Heart, Brain, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface DetailedCounsellingProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function DetailedCounselling({ onOpenBooking }: DetailedCounsellingProps) {
  const keyTopics = [
    "Stress and emotional concerns",
    "Relationship difficulties",
    "Life changes & transitions",
    "Self-understanding",
    "Behavioural patterns",
    "Emotional coping skills",
  ];

  return (
    <section id="counselling-psychotherapy" className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (5 cols): Editorial Calming Visual Holder */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px]">
              
              {/* Decorative Subtle Line Accent */}
              <div className="absolute -inset-4 rounded-3xl border border-[#B58B50]/30 pointer-events-none" />

              {/* Main Visual Card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-[#173D34] to-[#102E27] p-8 sm:p-10 text-[#F7F5EF] shadow-xl overflow-hidden flex flex-col justify-between min-h-[480px] border border-[#B58B50]/40">
                
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#DFBD83]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#E8EDE4]/10 rounded-full blur-2xl pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#DFBD83] font-semibold">
                    Core Clinical Care
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#102E27] border border-[#B58B50]/40 flex items-center justify-center text-[#DFBD83]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                {/* Center Visual Art */}
                <div className="relative z-10 my-auto text-center py-6">
                  <div className="w-20 h-20 mx-auto rounded-full border border-[#DFBD83]/40 bg-[#173D34]/90 flex items-center justify-center mb-6 shadow-inner">
                    <Heart className="w-10 h-10 text-[#DFBD83]" strokeWidth={1.2} />
                  </div>

                  <h3 className="font-serif text-2xl font-light text-white leading-snug">
                    Counselling &amp; Psychotherapy
                  </h3>

                  <div className="w-12 h-[1px] bg-[#B58B50] mx-auto my-3" />

                  <p className="text-xs text-[#E8EDE4]/80 font-light max-w-xs mx-auto leading-relaxed">
                    A safe, confidential therapeutic space to explore personal concerns and build emotional clarity.
                  </p>
                </div>

                {/* Bottom Card Footer */}
                <div className="relative z-10 pt-4 border-t border-[#B58B50]/30 flex items-center justify-between text-xs text-[#DFBD83]">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#DFBD83]" />
                    <span>Confidential &bull; Ethical Care</span>
                  </div>
                  <span className="font-serif italic">Indore &bull; Online</span>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column (7 cols): Detailed Text & Key Topics */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#B58B50]" />
              <span className="text-xs font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
                SERVICES 01 &amp; 02
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight mb-6">
              A Space to Be Heard,{" "}
              <span className="italic text-[#B58B50]">Understood and Supported.</span>
            </h2>

            <div className="space-y-4 font-sans text-base sm:text-lg text-[#59675F] leading-relaxed font-light mb-8">
              <p>
                Counselling provides an opportunity to discuss experiences, concerns and circumstances in a supportive professional setting.
              </p>
              <p>
                Psychotherapy may involve a more structured exploration of thoughts, emotions, behaviours and patterns, using approaches appropriate to the person&apos;s needs.
              </p>
            </div>

            {/* Key Topics Grid */}
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#173D34] block mb-3">
                Key Areas Explored:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {keyTopics.map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-[#B58B50]/20 shadow-2xs flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B58B50] shrink-0" />
                    <span className="text-xs sm:text-sm text-[#24352D] font-light">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => onOpenBooking("Counselling & Psychotherapy")}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-white text-sm font-semibold tracking-wide shadow-md transition-all self-start"
              >
                <span>Enquire About Counselling</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


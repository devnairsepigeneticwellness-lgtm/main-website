"use client";

import React from "react";
import { Brain, Heart, Users, Sparkles, ShieldCheck, Compass, Globe } from "lucide-react";
import { aboutCopy } from "@/data/aboutData";

export default function OurStorySection() {
  const { approach } = aboutCopy;

  const contexts = [
    { label: "Psychological & Emotional", desc: "Thoughts, feelings, belief systems, and internal states.", icon: Brain },
    { label: "Physical & Somatic", desc: "Nervous system regulation, bodily sensations, and energy.", icon: Heart },
    { label: "Social & Family", desc: "Relational patterns, communication, and home environments.", icon: Users },
    { label: "Spiritual & Environmental", desc: "Core values, meaning, transpersonal perspectives, and surroundings.", icon: Compass },
  ];

  return (
    <section id="our-approach" className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden border-b border-[#C8D6C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (5 cols): Visual Box */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px]">
              
              <div className="absolute -inset-4 rounded-3xl border border-[#B58B50]/30 pointer-events-none" />

              <div className="relative rounded-2xl bg-gradient-to-br from-[#173D34] to-[#102E27] p-8 sm:p-10 text-[#F7F5EF] shadow-xl overflow-hidden flex flex-col justify-between min-h-[460px] border border-[#B58B50]/40">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#DFBD83]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#E8EDE4]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#DFBD83] font-semibold">
                    The N.E.W. Standard
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#102E27] border border-[#B58B50]/40 flex items-center justify-center text-[#DFBD83]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <div className="relative z-10 my-auto text-center py-6">
                  <div className="w-20 h-20 mx-auto rounded-full border border-[#DFBD83]/40 bg-[#173D34]/90 flex items-center justify-center mb-6 shadow-inner">
                    <ShieldCheck className="w-10 h-10 text-[#DFBD83]" strokeWidth={1.2} />
                  </div>
                  
                  <blockquote className="font-serif italic text-xl sm:text-2xl text-[#F7F5EF] font-light leading-snug">
                    &ldquo;Our aim is to understand the whole person rather than focus only on a single concern.&rdquo;
                  </blockquote>
                  
                  <div className="w-12 h-[1px] bg-[#B58B50] mx-auto my-4" />

                  <p className="text-xs text-[#E8EDE4]/80 font-light max-w-xs mx-auto leading-relaxed">
                    Bridging psychological knowledge, evidence-informed therapies, mindfulness, and practical life skills.
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-[#B58B50]/30 flex items-center justify-between text-xs text-[#DFBD83]">
                  <span>Whole-Person Care</span>
                  <span className="font-serif italic">Indore &bull; Online Across India</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (7 cols): Editorial Text & Supporting Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#9E783E]" />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
                CORE ORIENTATION
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight mb-6">
              An Integrative &amp;{" "}
              <span className="italic text-[#7D6335]">Person-Centred Approach.</span>
            </h2>

            {/* Exact PDF Copy */}
            <div className="space-y-4 font-sans text-base sm:text-lg text-[#465A4F] leading-relaxed font-light mb-8">
              <p>{approach.p1}</p>
              <p>{approach.p2}</p>
            </div>

            {/* Unique Context Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-[#C8D6C6]">
              {contexts.map((ctx, idx) => {
                const Icon = ctx.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-[#C8D6C6] hover:border-[#7D6335] transition-all shadow-2xs flex items-start gap-3.5"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#EBF2E8] text-[#173D34] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#7D6335]" />
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-semibold text-[#173D34]">
                        {ctx.label}
                      </h3>
                      <p className="font-sans text-xs text-[#59675F] font-light mt-0.5 leading-relaxed">
                        {ctx.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

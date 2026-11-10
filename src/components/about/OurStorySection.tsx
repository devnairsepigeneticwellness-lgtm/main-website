"use client";

import React from "react";
import { Brain, Heart, TrendingUp, Sparkles, ShieldCheck } from "lucide-react";

export default function OurStorySection() {
  const highlights = [
    {
      num: "01",
      title: "Psychological Understanding",
      desc: "Understanding thoughts, emotions, behaviours and patterns with clarity.",
      icon: Brain,
    },
    {
      num: "02",
      title: "Person-Centred Support",
      desc: "Recognising unique individual needs, values and personal circumstances.",
      icon: Heart,
    },
    {
      num: "03",
      title: "Practical Growth",
      desc: "Supporting the development of useful, sustainable everyday skills.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (5 cols): Large Editorial Visual Composition Holder */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px]">
              
              {/* Outer Decorative Line Ring */}
              <div className="absolute -inset-4 rounded-3xl border border-[#B58B50]/30 pointer-events-none" />

              {/* Main Visual Box */}
              <div className="relative rounded-2xl bg-gradient-to-br from-[#173D34] to-[#102E27] p-8 sm:p-10 text-[#F7F5EF] shadow-xl overflow-hidden flex flex-col justify-between min-h-[460px] border border-[#B58B50]/40">
                
                {/* Background Texture & Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#DFBD83]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#E8EDE4]/10 rounded-full blur-2xl pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#DFBD83] font-semibold">
                    The N.E.W. Genesis
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#102E27] border border-[#B58B50]/40 flex items-center justify-center text-[#DFBD83]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                {/* Middle Quote / Graphic Motif */}
                <div className="relative z-10 my-auto text-center py-6">
                  <div className="w-20 h-20 mx-auto rounded-full border border-[#DFBD83]/40 bg-[#173D34]/90 flex items-center justify-center mb-6 shadow-inner">
                    <ShieldCheck className="w-10 h-10 text-[#DFBD83]" strokeWidth={1.2} />
                  </div>
                  
                  <blockquote className="font-serif italic text-xl sm:text-2xl text-[#F7F5EF] font-light leading-snug">
                    &ldquo;Understanding is where meaningful change begins.&rdquo;
                  </blockquote>
                  
                  <div className="w-12 h-[1px] bg-[#B58B50] mx-auto my-4" />

                  <p className="text-xs text-[#E8EDE4]/80 font-light max-w-xs mx-auto leading-relaxed">
                    Bridging psychological science and compassionate human connection to support real-life transformation.
                  </p>
                </div>

                {/* Bottom Signature Line */}
                <div className="relative z-10 pt-4 border-t border-[#B58B50]/30 flex items-center justify-between text-xs text-[#DFBD83]">
                  <span>Whole-Person Care</span>
                  <span className="font-serif italic">Indore &bull; Online</span>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column (7 cols): Editorial Text & Supporting Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#B58B50]" />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#B58B50] uppercase font-sans">
                Our Story
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight mb-6">
              A Thoughtful Approach to{" "}
              <span className="italic text-[#B58B50]">Human Wellbeing.</span>
            </h2>

            <div className="space-y-4 font-sans text-base sm:text-lg text-[#59675F] leading-relaxed font-light mb-8">
              <p>
                Nair&apos;s Epigenetic Wellness (N.E.W.) brings together psychological knowledge, therapeutic approaches, mindfulness and wellbeing practices to support individuals and groups.
              </p>
              <p>
                Our work recognises that emotional wellbeing, behaviour, relationships and everyday functioning are shaped by many interconnected influences. We aim to consider the whole person rather than focus exclusively on an isolated problem.
              </p>
            </div>

            {/* Supporting Highlights: 3 Minimal Items */}
            <div className="space-y-4 pt-4 border-t border-[#B58B50]/20">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.num}
                    className="p-5 rounded-2xl bg-white border border-[#B58B50]/20 hover:border-[#B58B50] transition-all flex items-start gap-4 group shadow-xs"
                  >
                    <span className="font-serif text-xl font-light text-[#B58B50] shrink-0 mt-0.5">
                      {item.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-serif text-lg font-medium text-[#173D34] group-hover:text-[#B58B50] transition-colors">
                          {item.title}
                        </h3>
                        <Icon className="w-4 h-4 text-[#B58B50] shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-[#59675F] font-light leading-relaxed">
                        {item.desc}
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


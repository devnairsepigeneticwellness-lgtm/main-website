"use client";

import React from "react";
import { ArrowUpRight, Sparkles, Compass, ShieldCheck } from "lucide-react";

interface DetailedHypnotherapyProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function DetailedHypnotherapy({ onOpenBooking }: DetailedHypnotherapyProps) {
  const steps = [
    {
      num: "01",
      title: "Initial Discussion",
      desc: "Understand the person's concerns, background and expectations thoroughly.",
    },
    {
      num: "02",
      title: "Consider Suitability",
      desc: "Discuss whether the clinical hypnotherapy approach is appropriate and aligned with personal goals.",
    },
    {
      num: "03",
      title: "Therapeutic Sessions",
      desc: "Explore the agreed structured relaxation and focused attention process with the relevant qualified professional.",
    },
  ];

  return (
    <section id="hypnotherapy" className="py-20 lg:py-28 bg-[#173D34] text-[#F7F5EF] relative overflow-hidden">
      {/* Decorative Subtle Radial Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#102E27] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#B58B50]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#DFBD83]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#DFBD83] uppercase font-sans">
              THERAPEUTIC APPROACHES &bull; SERVICE 03
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.18] tracking-tight">
            Focused Attention. Guided Relaxation.{" "}
            <span className="italic text-[#DFBD83]">Thoughtful Support.</span>
          </h2>

          <div className="mt-6 space-y-4 font-sans text-base sm:text-lg text-[#E8EDE4]/85 leading-relaxed font-light">
            <p>
              Clinical hypnotherapy may involve the use of focused attention, relaxation and therapeutic suggestion within an appropriate professional context.
            </p>
            <p>
              The suitability of any therapeutic approach depends on the individual&apos;s circumstances, needs and goals.
            </p>
          </div>
        </div>

        {/* 3 Explanatory Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-[#102E27] rounded-3xl p-8 border border-[#B58B50]/30 hover:border-[#DFBD83] transition-all duration-300 shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-3xl font-light text-[#DFBD83]">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center border border-[#B58B50]/30 group-hover:bg-[#B58B50] group-hover:text-white transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-medium text-white mb-3 group-hover:text-[#DFBD83] transition-colors">
                  {step.title}
                </h3>

                <p className="font-sans text-sm text-[#E8EDE4]/80 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#173D34] text-[10px] uppercase tracking-wider text-[#DFBD83] font-semibold">
                Phase {step.num}
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Transparency & CTA Bar */}
        <div className="p-8 rounded-3xl bg-[#102E27]/90 border border-[#B58B50]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-3.5 max-w-xl">
            <ShieldCheck className="w-5 h-5 text-[#DFBD83] shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-[#E8EDE4]/80 font-light leading-relaxed">
              <strong className="text-white font-medium">Professional Guidance:</strong> Clinical hypnotherapy is practiced within an integrative psychological framework. We do not make claims to cure specific medical conditions or promise uniform results.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking("Clinical Hypnotherapy")}
            className="shrink-0 px-8 py-3.5 rounded-full bg-[#DFBD83] hover:bg-[#c9a76d] text-[#102E27] text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all flex items-center gap-2"
          >
            <span>Enquire About Clinical Hypnotherapy</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}


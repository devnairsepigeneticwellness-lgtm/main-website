"use client";

import React from "react";
import { ArrowUpRight, Compass, Sun, Check } from "lucide-react";

interface DetailedRenewalSpiritualProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function DetailedRenewalSpiritual({ onOpenBooking }: DetailedRenewalSpiritualProps) {
  const renewalPoints = [
    "Dedicated self-reflection",
    "Recognising personal strengths & coping reserves",
    "Exploring habits and automatic stress responses",
    "Fostering sustainable personal growth & vitality",
  ];

  const spiritualPoints = [
    "Mindfulness & grounding practices",
    "Reflective contemplation & somatic presence",
    "Exploration of core personal values",
    "Deepening internal self-awareness & meaning",
  ];

  return (
    <section id="renewal-spiritual" className="py-20 lg:py-28 bg-[#E8EDE4]/30 border-y border-[#B58B50]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#B58B50]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              RENEWAL &amp; REFLECTION &bull; SERVICES 05 &amp; 06
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Nurturing Meaning, Rhythms &amp;{" "}
            <span className="italic text-[#B58B50]">Inner Balance.</span>
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#59675F] leading-relaxed font-light">
            Complementing clinical therapies with restorative pathways that reconnect you with personal purpose and daily vitality.
          </p>
        </div>

        {/* Two Large Feature Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Panel 1 — Renewal */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#B58B50]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#B58B50] font-semibold">
                  Service 05 &bull; Renewal
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#E8EDE4] text-[#173D34] flex items-center justify-center group-hover:bg-[#173D34] group-hover:text-[#DFBD83] transition-colors">
                  <Compass className="w-6 h-6" strokeWidth={1.4} />
                </div>
              </div>

              <h3 className="font-serif text-3xl font-normal text-[#173D34] mb-4 group-hover:text-[#B58B50] transition-colors">
                Reconnect With Yourself.
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#59675F] font-light leading-relaxed mb-6">
                Renewal focuses on personal reflection, awareness and opportunities to explore more constructive patterns in everyday life.
              </p>

              <div className="space-y-3 mb-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#173D34] block">
                  Core Restorative Elements:
                </span>
                {renewalPoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#24352D] font-light">
                    <Check className="w-4 h-4 text-[#B58B50] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8EDE4] flex items-center justify-between">
              <span className="text-xs text-[#59675F]">One-on-One Guided Pathway</span>
              <button
                onClick={() => onOpenBooking("Renewal Programme")}
                className="px-6 py-2.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-white text-xs font-medium tracking-wide transition-all shadow-xs flex items-center gap-2"
              >
                <span>Enquire About Renewal</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#DFBD83]" />
              </button>
            </div>
          </div>

          {/* Panel 2 — Spiritual Practices */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#B58B50]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#B58B50] font-semibold">
                  Service 06 &bull; Spiritual Practices
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#E8EDE4] text-[#173D34] flex items-center justify-center group-hover:bg-[#173D34] group-hover:text-[#DFBD83] transition-colors">
                  <Sun className="w-6 h-6" strokeWidth={1.4} />
                </div>
              </div>

              <h3 className="font-serif text-3xl font-normal text-[#173D34] mb-4 group-hover:text-[#B58B50] transition-colors">
                Space for Reflection and Meaning.
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#59675F] font-light leading-relaxed mb-6">
                Spiritual practices may offer opportunities for reflection, mindfulness and exploration of values and personal meaning, where appropriate to an individual&apos;s interests.
              </p>

              <div className="space-y-3 mb-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#173D34] block">
                  Core Contemplative Elements:
                </span>
                {spiritualPoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#24352D] font-light">
                    <Check className="w-4 h-4 text-[#B58B50] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8EDE4] flex items-center justify-between">
              <span className="text-xs text-[#59675F]">Mindfulness &amp; Value Alignment</span>
              <button
                onClick={() => onOpenBooking("Spiritual Practices & Reflection")}
                className="px-6 py-2.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-white text-xs font-medium tracking-wide transition-all shadow-xs flex items-center gap-2"
              >
                <span>Enquire About Practices</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#DFBD83]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}


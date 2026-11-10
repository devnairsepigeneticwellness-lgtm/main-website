"use client";

import React from "react";
import { ArrowUpRight, GraduationCap, HeartHandshake, Stethoscope, Landmark, Building2 } from "lucide-react";

interface WhoCanBenefitProps {
  onOpenBooking: (programmeName: string) => void;
}

export default function WhoCanBenefit({ onOpenBooking }: WhoCanBenefitProps) {
  const audiences = [
    {
      num: "01",
      title: "Psychology Students",
      desc: "Developing foundational understanding, contextual grounding and reflective perspective beyond theory.",
      icon: GraduationCap,
    },
    {
      num: "02",
      title: "Aspiring Counsellors",
      desc: "Gaining exposure to professional communication, ethical boundaries, active listening and practical awareness.",
      icon: HeartHandshake,
    },
    {
      num: "03",
      title: "Mental Health Professionals",
      desc: "Continuing reflective professional development, peer discussions, supervision and ethical exploration.",
      icon: Stethoscope,
    },
    {
      num: "04",
      title: "Educational Institutions",
      desc: "Enhancing campus wellbeing awareness, teacher capabilities, student life skills and pastoral support.",
      icon: Landmark,
    },
    {
      num: "05",
      title: "Corporate Organisations",
      desc: "Cultivating supportive workplace dialogue, healthy boundaries, resilience and mutual psychological safety.",
      icon: Building2,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#E8EDE4]/40 relative overflow-hidden border-t border-b border-[#173D34]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EDE4] text-[#173D34] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B58B50]" />
            WHO WE WORK WITH
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.2] tracking-tight">
            Learning Opportunities Across <br className="hidden sm:inline" />
            <span className="italic text-[#B58B50]">Different Communities.</span>
          </h2>

          <p className="mt-5 font-sans text-base sm:text-lg text-[#59675F] leading-relaxed font-light">
            Our programmes are intentionally structured to serve learners, practitioners, and institutions at every stage of their educational and organizational journeys.
          </p>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-14">
          {audiences.map((aud) => {
            const Icon = aud.icon;
            return (
              <div
                key={aud.num}
                className="bg-[#F7F5EF] rounded-3xl p-6 border border-[#B58B50]/20 hover:border-[#B58B50] transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-xl font-light text-[#B58B50]">
                      {aud.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white text-[#173D34] flex items-center justify-center group-hover:bg-[#173D34] group-hover:text-[#DFBD83] transition-colors border border-[#B58B50]/20">
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-medium text-[#173D34] mb-2 group-hover:text-[#B58B50] transition-colors leading-snug">
                    {aud.title}
                  </h3>

                  <p className="font-sans text-xs text-[#59675F] font-light leading-relaxed">
                    {aud.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E8EDE4] text-[9px] uppercase tracking-wider text-[#B58B50] font-semibold">
                  Beneficiary 0{aud.num.replace("0", "")}
                </div>
              </div>
            );
          })}
        </div>

        {/* Center CTA */}
        <div className="text-center">
          <button
            onClick={() => onOpenBooking("General Learning Inquiry")}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#173D34] text-[#F7F5EF] text-sm font-semibold hover:bg-[#102E27] transition-all shadow-md group"
          >
            <span>Discuss Your Learning Needs</span>
            <ArrowUpRight className="w-4 h-4 text-[#DFBD83] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}


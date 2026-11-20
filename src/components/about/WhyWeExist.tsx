"use client";

import React from "react";
import { 
  Users, 
  BookCheck, 
  Wrench, 
  Award, 
  SlidersHorizontal, 
  GraduationCap, 
  ShieldCheck, 
  HeartHandshake 
} from "lucide-react";
import { aboutCopy } from "@/data/aboutData";

export default function WhyWeExist() {
  const { whyChoose } = aboutCopy;

  const pillarIcons = [
    Users,
    BookCheck,
    Wrench,
    Award,
    SlidersHorizontal,
  ];

  return (
    <section id="why-choose-new" className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden border-b border-[#C8D6C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-3 mb-3 justify-center">
            <span className="w-8 h-[1px] bg-[#9E783E]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#7D6335] uppercase font-sans">
              STANDARDS &amp; INTEGRITY
            </span>
            <span className="w-8 h-[1px] bg-[#9E783E]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Why Choose <span className="italic text-[#7D6335]">N.E.W.?</span>
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#465A4F] leading-relaxed font-light">
            Five core clinical commitments that define our therapeutic philosophy, care quality, and ethical client engagement.
          </p>
        </div>

        {/* 5 Pillars Grid (Exact PDF Copy) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {whyChoose.pillars.map((pillar, idx) => {
            const Icon = pillarIcons[idx] || Award;
            return (
              <div
                key={idx}
                className="p-7 sm:p-8 rounded-3xl bg-white border border-[#C8D6C6] hover:border-[#7D6335] transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-[#7D6335] uppercase tracking-wider bg-[#EAF0E7] px-3 py-1 rounded-full border border-[#C8D6C6]">
                      PILLAR 0{idx + 1}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#EAF0E7] text-[#173D34] flex items-center justify-center group-hover:bg-[#173D34] group-hover:text-[#DFBD83] transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#173D34] mb-3 group-hover:text-[#7D6335] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Page 5 Commitments: Learning Beyond Therapy & Safe Space */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#C8D6C6]">
          
          {/* Learning Beyond Therapy */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#EAF0E7] border border-[#C8D6C6] flex flex-col justify-between">
            <div className="flex items-start gap-4 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-[#173D34]">
                  {whyChoose.learningBeyondTherapy.title}
                </h3>
                <p className="mt-2 font-sans text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                  {whyChoose.learningBeyondTherapy.desc}
                </p>
              </div>
            </div>
          </div>

          {/* A Safe and Respectful Space */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#EAF0E7] border border-[#C8D6C6] flex flex-col justify-between">
            <div className="flex items-start gap-4 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-[#173D34]">
                  {whyChoose.safeSpace.title}
                </h3>
                <p className="mt-2 font-sans text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                  {whyChoose.safeSpace.desc}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

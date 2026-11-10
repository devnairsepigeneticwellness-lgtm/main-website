"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  Brain,
  Shield,
  Sparkles,
  Compass,
  GraduationCap,
  ArrowUpRight
} from "lucide-react";
import { AREAS_OF_FOCUS } from "@/data/professionalsData";

export default function AreasOfFocus() {
  const iconMap: Record<string, React.ElementType> = {
    counselling: Heart,
    psychotherapy: Brain,
    rehabilitation: Shield,
    hypnotherapy: Sparkles,
    mindfulness: Compass,
    training: GraduationCap,
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5EF] text-[#24352D] relative overflow-hidden border-b border-[#B58B50]/20">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#B58B50]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#B58B50]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              OUR AREAS OF FOCUS
            </span>
            <span className="w-6 h-[1px] bg-[#B58B50]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#173D34] leading-[1.2] tracking-tight">
            Professional Knowledge Across{" "}
            <span className="italic text-[#B58B50] font-light">Different Areas of Wellbeing.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base lg:text-lg text-[#59675F] leading-relaxed font-light">
            N.E.W. brings together distinct areas of psychological practice, rehabilitation, and professional education to serve individuals, families, and organizations at every stage.
          </p>
        </div>

        {/* Six Refined Focus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {AREAS_OF_FOCUS.map((focus) => {
            const Icon = iconMap[focus.id] || Sparkles;
            return (
              <div
                key={focus.id}
                className="group p-8 rounded-3xl bg-white border border-[#E8EDE4] hover:border-[#B58B50]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#E8EDE4]/70 text-[#173D34] group-hover:bg-[#173D34] group-hover:text-[#DFBD83] flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-[#E8EDE4]/50 text-[#173D34]/70 border border-[#173D34]/10">
                      {focus.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#173D34] group-hover:text-[#B58B50] transition-colors mb-3 leading-snug">
                    {focus.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#59675F] leading-relaxed font-light">
                    {focus.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E8EDE4]">
                  <Link
                    href={focus.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D34] group-hover:text-[#B58B50] transition-colors"
                  >
                    <span>Explore Pathway</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B58B50] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

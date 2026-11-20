"use client";

import React from "react";
import { Dna, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";
import { aboutCopy } from "@/data/aboutData";

export default function EpigeneticsExplainer() {
  const { epigenetics } = aboutCopy;

  return (
    <section id="epigenetics-section" className="py-20 lg:py-28 bg-[#EAF0E7] border-b border-[#C8D6C6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (7 cols): Educational Explanatory Text */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#9E783E]" />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
                SCIENCE &amp; PHILOSOPHY
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
              {epigenetics.heading}
            </h2>

            <p className="text-sm sm:text-base font-sans tracking-wide text-[#7D6335] font-semibold">
              {epigenetics.subtitle}
            </p>

            {/* Exact PDF Copy: 5 Paragraphs */}
            <div className="space-y-4 font-sans text-sm sm:text-base text-[#465A4F] leading-relaxed font-light">
              <p className="text-base sm:text-lg text-[#173D34] font-normal leading-relaxed">
                {epigenetics.paragraphs[0]}
              </p>
              <p>{epigenetics.paragraphs[1]}</p>
              <p>{epigenetics.paragraphs[2]}</p>

              {/* Ethical Callout Box for Paragraph 4 */}
              <div className="p-5 rounded-2xl bg-white border border-[#C8D6C6] shadow-2xs">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-[#7D6335] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#24352D] font-medium leading-relaxed">
                    {epigenetics.paragraphs[3]}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#24352D] font-normal">
                {epigenetics.paragraphs[4]}
              </p>
            </div>

          </div>

          {/* Right Column (5 cols): Geometric DNA & Biology Diagram */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[480px] rounded-3xl bg-white border border-[#C8D6C6] p-8 sm:p-10 shadow-sm">
              
              <div className="text-center mb-6">
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#7D6335] font-semibold">
                  Conceptual Framework
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#173D34] mt-1">
                  Biology &bull; Environment &bull; Choices
                </h3>
              </div>

              {/* DNA Helix Wave Diagram */}
              <div className="relative py-4">
                <svg viewBox="0 0 320 200" className="w-full h-auto text-[#173D34]" fill="none">
                  {/* Organic Wave 1 */}
                  <path
                    d="M30 100 Q 75 30, 120 100 T 210 100 T 300 100"
                    stroke="#173D34"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Organic Wave 2 (Phase Inverted) */}
                  <path
                    d="M30 100 Q 75 170, 120 100 T 210 100 T 300 100"
                    stroke="#B58B50"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                  />

                  {/* Bridges */}
                  <line x1="75" y1="65" x2="75" y2="135" stroke="#DFBD83" strokeWidth="1.5" strokeDasharray="2 2" />
                  <circle cx="75" cy="65" r="4" fill="#173D34" />
                  <circle cx="75" cy="135" r="4" fill="#B58B50" />

                  <line x1="165" y1="65" x2="165" y2="135" stroke="#DFBD83" strokeWidth="1.5" strokeDasharray="2 2" />
                  <circle cx="165" cy="65" r="4" fill="#B58B50" />
                  <circle cx="165" cy="135" r="4" fill="#173D34" />

                  <line x1="255" y1="65" x2="255" y2="135" stroke="#DFBD83" strokeWidth="1.5" strokeDasharray="2 2" />
                  <circle cx="255" cy="65" r="4" fill="#173D34" />
                  <circle cx="255" cy="135" r="4" fill="#B58B50" />
                </svg>
              </div>

              {/* 3 Interconnected Pillars */}
              <div className="grid grid-cols-3 gap-2.5 pt-6 border-t border-[#E8EDE4] text-center text-xs">
                <div className="p-2.5 rounded-xl bg-[#F7F5EF] border border-[#C8D6C6]">
                  <span className="block font-serif font-semibold text-[#173D34]">Genetics</span>
                  <span className="text-[10px] text-[#59675F] block mt-0.5">Underlying blueprint</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F7F5EF] border border-[#C8D6C6]">
                  <span className="block font-serif font-semibold text-[#173D34]">Environment</span>
                  <span className="text-[10px] text-[#59675F] block mt-0.5">Lifestyle &amp; stressors</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F7F5EF] border border-[#C8D6C6]">
                  <span className="block font-serif font-semibold text-[#173D34]">Expression</span>
                  <span className="text-[10px] text-[#59675F] block mt-0.5">Adaptation &amp; health</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

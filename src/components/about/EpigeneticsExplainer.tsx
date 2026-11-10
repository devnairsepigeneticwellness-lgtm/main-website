"use client";

import React from "react";
import { Dna, Activity, Sun, HeartPulse, ShieldAlert } from "lucide-react";

export default function EpigeneticsExplainer() {
  return (
    <section className="py-20 lg:py-28 bg-[#E8EDE4]/40 border-y border-[#B58B50]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (6 cols): Educational Explanatory Text */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#B58B50]" />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#B58B50] uppercase font-sans">
                UNDERSTANDING EPIGENETICS
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
              The Relationship Between Our Biology{" "}
              <span className="italic text-[#B58B50]">and Our Environment.</span>
            </h2>

            <div className="space-y-4 font-sans text-base sm:text-lg text-[#59675F] leading-relaxed font-light">
              <p>
                Epigenetics explores how certain processes regulate gene activity without changing the underlying DNA sequence. Environmental influences, experiences and other factors can be associated with changes in gene expression.
              </p>
              <p>
                At N.E.W., the term reflects an interest in the interconnected influences on wellbeing, while our services draw on psychological understanding and relevant therapeutic and wellbeing practices.
              </p>
            </div>

            {/* Respectful Ethical Disclaimer Note */}
            <div className="p-5 rounded-2xl bg-white/80 border border-[#B58B50]/30 text-xs text-[#59675F] leading-relaxed font-light flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-[#B58B50] shrink-0 mt-0.5" />
              <p>
                <strong className="text-[#173D34] font-medium">Ethical Scientific Note:</strong> Psychological counselling, mindfulness, and lifestyle interventions foster self-awareness, emotional resilience, and healthier adaptive patterns. We do not claim that counselling directly rewrites DNA sequences or guarantees specific genetic outcomes.
              </p>
            </div>

          </div>

          {/* Right Column (6 cols): Premium Educational Visual with Organic DNA & Botanical Forms */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[480px] rounded-3xl bg-white border border-[#B58B50]/30 p-8 sm:p-10 shadow-lg">
              
              <div className="text-center mb-6">
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#B58B50] font-semibold">
                  Conceptual Framework
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#173D34] mt-1">
                  Interconnected Spheres of Expression
                </h3>
              </div>

              {/* DNA Helix & Botanical Geometric Diagram */}
              <div className="relative py-4">
                <svg viewBox="0 0 320 220" className="w-full h-auto text-[#173D34]" fill="none">
                  {/* Organic Wave 1 */}
                  <path
                    d="M30 110 Q 75 40, 120 110 T 210 110 T 300 110"
                    stroke="#173D34"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Organic Wave 2 (Phase Inverted) */}
                  <path
                    d="M30 110 Q 75 180, 120 110 T 210 110 T 300 110"
                    stroke="#B58B50"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                  />

                  {/* Soft Connection Bridges */}
                  <line x1="75" y1="75" x2="75" y2="145" stroke="#DFBD83" strokeWidth="1.5" strokeDasharray="2 2" />
                  <circle cx="75" cy="75" r="4" fill="#173D34" />
                  <circle cx="75" cy="145" r="4" fill="#B58B50" />

                  <line x1="165" y1="75" x2="165" y2="145" stroke="#DFBD83" strokeWidth="1.5" strokeDasharray="2 2" />
                  <circle cx="165" cy="75" r="4" fill="#B58B50" />
                  <circle cx="165" cy="145" r="4" fill="#173D34" />

                  <line x1="255" y1="75" x2="255" y2="145" stroke="#DFBD83" strokeWidth="1.5" strokeDasharray="2 2" />
                  <circle cx="255" cy="75" r="4" fill="#173D34" />
                  <circle cx="255" cy="145" r="4" fill="#B58B50" />

                  {/* Botanical Leaf Nodes */}
                  <path d="M75 55 C70 45, 80 40, 85 48 C85 55, 78 55, 75 55 Z" fill="#9AAA8A" />
                  <path d="M165 165 C160 175, 170 180, 175 172 C175 165, 168 165, 165 165 Z" fill="#9AAA8A" />
                  <path d="M255 55 C250 45, 260 40, 265 48 C265 55, 258 55, 255 55 Z" fill="#9AAA8A" />
                </svg>
              </div>

              {/* Minimal Three Dimension Labels */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#E8EDE4] text-center">
                <div className="p-2.5 rounded-xl bg-[#F7F5EF]">
                  <Activity className="w-4 h-4 text-[#B58B50] mx-auto mb-1.5" />
                  <span className="text-[11px] font-semibold text-[#173D34] block">Biology</span>
                  <span className="text-[10px] text-[#59675F] font-light">Physiology &amp; Stress</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F7F5EF]">
                  <Sun className="w-4 h-4 text-[#B58B50] mx-auto mb-1.5" />
                  <span className="text-[11px] font-semibold text-[#173D34] block">Environment</span>
                  <span className="text-[10px] text-[#59675F] font-light">Habits &amp; Context</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F7F5EF]">
                  <HeartPulse className="w-4 h-4 text-[#B58B50] mx-auto mb-1.5" />
                  <span className="text-[11px] font-semibold text-[#173D34] block">Experience</span>
                  <span className="text-[10px] text-[#59675F] font-light">Thoughts &amp; Coping</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}


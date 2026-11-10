"use client";

import React from "react";
import { Quote, Heart, Shield, Lightbulb, TrendingUp } from "lucide-react";

export default function WhyWeExist() {
  const values = [
    {
      title: "Respect for Individuality",
      desc: "Every human journey is shaped by a distinct narrative, personal pacing and unique needs.",
      icon: Heart,
    },
    {
      title: "Thoughtful Psychological Support",
      desc: "Clinical empathy informed by rigorous science, ethical care and unconditional respect.",
      icon: Shield,
    },
    {
      title: "Awareness and Learning",
      desc: "Demystifying psychological patterns so individuals gain lasting internal clarity.",
      icon: Lightbulb,
    },
    {
      title: "Personal & Professional Development",
      desc: "Equipping individuals and organisations with dependable everyday skills that foster thriving.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#E8EDE4]/30 border-y border-[#B58B50]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 cols): Large Quotation Statement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#B58B50]" />
              <span className="text-xs font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
                WHY N.E.W. EXISTS
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
              Creating Space for Understanding,{" "}
              <span className="italic text-[#B58B50]">Reflection and Growth.</span>
            </h2>

            <div className="relative p-6 sm:p-8 rounded-3xl bg-white border border-[#B58B50]/30 shadow-sm mt-6">
              <Quote className="w-8 h-8 text-[#DFBD83]/40 mb-3" />
              <p className="font-serif italic text-lg sm:text-xl text-[#173D34] font-light leading-relaxed">
                &ldquo;Wellbeing is influenced by many aspects of life. At N.E.W., our approach is to make psychological understanding and practical support more accessible to individuals, families, professionals and organisations.&rdquo;
              </p>
              <span className="block mt-4 text-xs font-sans uppercase tracking-widest text-[#B58B50] font-semibold">
                &mdash; The N.E.W. Mission
              </span>
            </div>
          </div>

          {/* Right Column (7 cols): Four Core Values Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-[#B58B50]/20 hover:border-[#B58B50] transition-all shadow-2xs hover:shadow-md flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#E8EDE4] text-[#173D34] flex items-center justify-center mb-4 group-hover:bg-[#173D34] group-hover:text-[#DFBD83] transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>

                    <h3 className="font-serif text-xl font-medium text-[#173D34] mb-2 group-hover:text-[#B58B50] transition-colors">
                      {v.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-[#59675F] font-light leading-relaxed">
                      {v.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#E8EDE4] text-[10px] uppercase tracking-wider text-[#B58B50] font-semibold">
                    Core Value 0{idx + 1}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}


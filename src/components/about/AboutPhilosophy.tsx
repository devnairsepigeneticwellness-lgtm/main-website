"use client";

import React from "react";
import { Compass, Eye, BookOpen, Sparkles } from "lucide-react";

export default function AboutPhilosophy() {
  const cards = [
    {
      num: "01",
      title: "Understand the Individual",
      desc: "Recognise each person's unique experiences, concerns and personal circumstances.",
      icon: Compass,
    },
    {
      num: "02",
      title: "Recognise Patterns",
      desc: "Explore connections between thoughts, emotions, behaviours and relationships.",
      icon: Eye,
    },
    {
      num: "03",
      title: "Develop Awareness",
      desc: "Encourage reflection, psychological understanding and practical learning.",
      icon: BookOpen,
    },
    {
      num: "04",
      title: "Support Meaningful Change",
      desc: "Work towards healthier responses, improved coping skills and personal development.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#173D34] text-[#F7F5EF] relative overflow-hidden">
      {/* Decorative Gold & Botanical Glow */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[#102E27] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#B58B50]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#DFBD83]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#DFBD83] uppercase font-sans">
              OUR PHILOSOPHY
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.18] tracking-tight">
            Understanding the{" "}
            <span className="italic text-[#DFBD83]">Whole Person.</span>
          </h2>

          <p className="mt-4 font-sans text-base sm:text-lg text-[#E8EDE4]/85 leading-relaxed font-light">
            Our approach considers the individual in the context of their psychological, emotional, physical, social and environmental experiences.
          </p>
        </div>

        {/* Four Editorial Philosophy Cards on Forest Green */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.num}
                className="rounded-3xl bg-[#102E27]/90 border border-[#B58B50]/30 hover:border-[#DFBD83] p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-light text-[#DFBD83]">
                      {card.num}
                    </span>
                    <div className="w-12 h-12 rounded-full bg-[#173D34] border border-[#B58B50]/40 flex items-center justify-center text-[#DFBD83] group-hover:bg-[#B58B50] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.4} />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-white mb-3 group-hover:text-[#DFBD83] transition-colors">
                    {card.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-[#E8EDE4]/85 leading-relaxed font-light">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#173D34] flex items-center justify-between text-xs text-[#DFBD83]">
                  <span className="font-sans uppercase tracking-wider text-[10px]">
                    Core Principle {card.num}
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-medium">
                    Exploration &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


"use client";

import React from "react";
import { UserCheck, Compass, Sparkles } from "lucide-react";

export default function ServicesIntro() {
  const highlights = [
    {
      num: "01",
      title: "Individual Understanding",
      desc: "Support begins with understanding the individual's experiences and concerns.",
      icon: UserCheck,
    },
    {
      num: "02",
      title: "Appropriate Approaches",
      desc: "Different therapeutic and wellbeing approaches may be considered based on individual needs.",
      icon: Compass,
    },
    {
      num: "03",
      title: "Practical Development",
      desc: "An emphasis on reflection, awareness and applicable skills for everyday life.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#B58B50]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              PERSON-CENTRED SUPPORT
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Every Individual Has a{" "}
            <span className="italic text-[#B58B50]">Different Story.</span>
          </h2>

          <div className="mt-6 space-y-3 font-sans text-base sm:text-lg text-[#59675F] leading-relaxed font-light">
            <p>
              People seek support for many reasons &mdash; emotional concerns, stress, relationships, personal development, changes in life circumstances or the desire to understand themselves better.
            </p>
            <p>
              At N.E.W., services are approached with consideration for individual needs, experiences, circumstances and goals.
            </p>
          </div>
        </div>

        {/* 3 Highlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.num}
                className="bg-white rounded-3xl p-8 border border-[#B58B50]/20 hover:border-[#B58B50] transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl font-light text-[#B58B50]">
                      {card.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#E8EDE4] text-[#173D34] flex items-center justify-center group-hover:bg-[#173D34] group-hover:text-[#DFBD83] transition-colors">
                      <Icon className="w-6 h-6" strokeWidth={1.4} />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[#173D34] mb-3 group-hover:text-[#B58B50] transition-colors">
                    {card.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-[#59675F] font-light leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E8EDE4] flex items-center justify-between text-xs text-[#B58B50] font-medium">
                  <span>Guiding Pillar</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


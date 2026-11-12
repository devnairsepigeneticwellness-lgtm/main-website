"use client";

import React from "react";
import { Compass, Eye, Sparkles, ArrowRight } from "lucide-react";

export default function PhilosophyStrip() {
  const items = [
    {
      number: "01",
      title: "Understand the Individual",
      description:
        "Recognising that every person's experiences, needs and circumstances are unique.",
      icon: Compass,
      anchor: "#about",
    },
    {
      number: "02",
      title: "Build Self-Awareness",
      description:
        "Exploring thoughts, emotions, behaviours and patterns with greater clarity.",
      icon: Eye,
      anchor: "#about",
    },
    {
      number: "03",
      title: "Support Meaningful Change",
      description:
        "Developing practical skills and healthier ways of responding to life's challenges.",
      icon: Sparkles,
      anchor: "#about",
    },
  ];

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(href.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="philosophy"
      className="bg-[#EAF0E7] border-y border-[#C8D6C6] py-14 lg:py-18 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2.5 mb-2">
            <span className="w-5 h-[1px] bg-[#9E783E]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#7D6335] font-semibold">
              The N.E.W. Wellness Foundation
            </span>
            <span className="w-5 h-[1px] bg-[#9E783E]" />
          </div>
          <p className="font-serif italic text-lg sm:text-xl lg:text-2xl text-[#173D34] font-light">
            Three guiding commitments informing every therapeutic relationship
          </p>
        </div>

        {/* 3 Symmetrically Balanced Columns with Clean Centered Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {items.map((item, idx) => {
            const Icon = item.icon;
            const isFirst = idx === 0;
            const isLast = idx === items.length - 1;

            return (
              <div
                key={item.number}
                className={`flex flex-col justify-between py-4 md:py-2 ${
                  isFirst
                    ? "md:pr-8 lg:pr-12"
                    : isLast
                    ? "md:pl-8 lg:pl-12"
                    : "md:px-8 lg:px-12"
                } ${
                  !isLast
                    ? "md:border-r border-[#C8D6C6] border-b md:border-b-0 pb-8 md:pb-2"
                    : "pb-4 md:pb-2"
                } group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl lg:text-3xl font-light text-[#9E783E] tracking-wider">
                      {item.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#D7E3D3] text-[#1E3F35] flex items-center justify-center group-hover:bg-[#1E3F35] group-hover:text-[#F7F5EF] transition-all duration-300 shadow-xs border border-[#C5D3C1]">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#173D34] mb-3 group-hover:text-[#2A5244] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-[15px] text-[#45574D] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#C8D6C6] flex items-center">
                  <a
                    href={item.anchor}
                    onClick={(e) => handleScrollTo(e, item.anchor)}
                    className="group/link inline-flex items-center gap-1.5 text-xs text-[#1E3F35] hover:text-[#9E783E] font-semibold tracking-wide transition-colors cursor-pointer"
                  >
                    <span>Read the principle approach</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

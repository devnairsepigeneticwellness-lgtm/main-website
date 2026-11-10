"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Compass, Target, TrendingUp } from "lucide-react";

export default function LearningExperience() {
  const highlights = [
    {
      num: "01",
      title: "Learn",
      desc: "Understand essential psychological and wellbeing concepts.",
      icon: BookOpen,
    },
    {
      num: "02",
      title: "Reflect",
      desc: "Explore how knowledge relates to everyday experiences and professional practice.",
      icon: Compass,
    },
    {
      num: "03",
      title: "Practise",
      desc: "Develop appropriate practical skills through structured learning activities.",
      icon: Target,
    },
    {
      num: "04",
      title: "Grow",
      desc: "Build confidence, awareness and opportunities for continued development.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden border-b border-[#B58B50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Content */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#B58B50]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              THE N.E.W. LEARNING EXPERIENCE
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Turning Knowledge Into{" "}
            <span className="italic text-[#B58B50] font-light">Practical Understanding.</span>
          </h2>

          <div className="mt-6 space-y-4 font-sans text-base sm:text-lg text-[#59675F] font-light leading-relaxed">
            <p>
              At Nair&apos;s Epigenetic Wellness, learning goes beyond simply understanding concepts. Our programmes are designed to encourage reflection, practical awareness, skill development and professional growth.
            </p>
            <p>
              We aim to connect psychological knowledge with real-world learning experiences relevant to students, professionals, educational institutions and organisations.
            </p>
          </div>
        </div>

        {/* Four Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#B58B50]/20">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col justify-between p-6 lg:px-8 first:pl-0 last:pr-0 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-light text-[#B58B50]">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#E8EDE4] text-[#173D34] flex items-center justify-center group-hover:bg-[#173D34] group-hover:text-[#DFBD83] transition-colors duration-300">
                      <Icon className="w-5 h-5" strokeWidth={1.4} />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[#173D34] mb-3">
                    {item.title}
                  </h3>

                  <p className="font-sans text-sm text-[#59675F] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


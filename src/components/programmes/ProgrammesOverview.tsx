"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, GraduationCap, Users, Briefcase, School, Check } from "lucide-react";

export default function ProgrammesOverview() {
  const programmes = [
    {
      num: "01",
      title: "Internship Programmes",
      targetId: "internships",
      desc: "Learning opportunities for students and aspiring professionals interested in psychology, counselling, mental health and wellbeing.",
      focusAreas: [
        "Understanding psychological concepts",
        "Exposure to professional practices",
        "Applied learning opportunities",
        "Professional skill development",
      ],
      ctaText: "Explore Internships",
      icon: GraduationCap,
    },
    {
      num: "02",
      title: "Mentorship Programmes",
      targetId: "mentorship",
      desc: "Guidance and learning support for individuals seeking to strengthen their psychological understanding, professional direction and practical skills.",
      focusAreas: [
        "Professional guidance",
        "Learning and reflection",
        "Skill development",
        "Career-related understanding",
      ],
      ctaText: "Explore Mentorship",
      icon: Users,
    },
    {
      num: "03",
      title: "Corporate Workshops",
      targetId: "corporate",
      desc: "Interactive learning experiences designed to support workplace wellbeing, communication, stress awareness and organisational development.",
      focusAreas: [
        "Stress management",
        "Workplace wellbeing",
        "Emotional awareness",
        "Communication and interpersonal skills",
      ],
      ctaText: "Explore Corporate Workshops",
      icon: Briefcase,
    },
    {
      num: "04",
      title: "Educational Training",
      targetId: "educational",
      desc: "Learning programmes for educational communities, including students, educators, parents and professionals.",
      focusAreas: [
        "Student wellbeing",
        "Emotional awareness",
        "Psychology education",
        "Communication and interpersonal development",
      ],
      ctaText: "Explore Educational Training",
      icon: School,
    },
  ];

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="programmes-overview" className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#B58B50]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              EXPLORE OUR PROGRAMMES
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Learning Opportunities for{" "}
            <span className="italic text-[#B58B50] font-light">Every Stage of Development.</span>
          </h2>
        </div>

        {/* 4 Cards in 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {programmes.map((prog, idx) => {
            const Icon = prog.icon;
            return (
              <motion.div
                key={prog.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-[#B58B50]/20 hover:border-[#B58B50]/60 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Top: Category Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl sm:text-4xl font-light text-[#B58B50]">
                      {prog.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#E8EDE4] text-[#173D34] flex items-center justify-center group-hover:bg-[#173D34] group-hover:text-[#DFBD83] transition-colors duration-300">
                      <Icon className="w-6 h-6" strokeWidth={1.4} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34] mb-3">
                    {prog.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm sm:text-base text-[#59675F] font-light leading-relaxed mb-6">
                    {prog.desc}
                  </p>

                  {/* Focus Areas */}
                  <div className="space-y-2.5 pt-4 border-t border-[#E8EDE4]">
                    <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#B58B50] block mb-2">
                      Key Focus Areas:
                    </span>
                    {prog.focusAreas.map((area) => (
                      <div key={area} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#24352D]/85 font-light">
                        <div className="w-4 h-4 rounded-full bg-[#E8EDE4] text-[#173D34] flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8 mt-6">
                  <button
                    onClick={() => handleScrollTo(prog.targetId)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full border border-[#B58B50]/40 text-[#173D34] text-xs sm:text-sm font-semibold tracking-wide hover:bg-[#173D34] hover:text-[#F7F5EF] hover:border-[#173D34] transition-all duration-200 group/btn"
                  >
                    <span>{prog.ctaText}</span>
                    <ArrowDown className="w-4 h-4 text-[#B58B50] group-hover/btn:text-[#DFBD83] group-hover/btn:translate-y-0.5 transition-all" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

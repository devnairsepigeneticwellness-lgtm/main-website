"use client";

import React from "react";
import { ArrowUpRight, Compass, Target, Shield, Sparkles, BookOpen, Quote, MessageCircle } from "lucide-react";
import { CONTACT_INFO } from "@/components/SocialIcons";

interface DetailedMentorshipProps {
  onOpenBooking: (programmeName: string) => void;
}

export default function DetailedMentorship({ onOpenBooking }: DetailedMentorshipProps) {
  const focusAreas = [
    {
      num: "01",
      title: "Professional Understanding",
      desc: "Explore relevant psychological and professional concepts with depth and contextual grounding.",
      icon: Compass,
    },
    {
      num: "02",
      title: "Practical Skill Development",
      desc: "Understand how learning connects with real-world professional situations, case dialogue and ethical responsibilities.",
      icon: Target,
    },
    {
      num: "03",
      title: "Reflective Learning",
      desc: "Encourage self-awareness, thoughtful decision-making, healthy boundaries and mindful professional reflection.",
      icon: BookOpen,
    },
    {
      num: "04",
      title: "Career Direction",
      desc: "Discuss individual interests, learning goals, continuing education avenues and potential developmental pathways.",
      icon: Shield,
    },
  ];

  const whatsappMessage = encodeURIComponent(
    "Hello Nair's Epigenetic Wellness team, I would like to enquire about your Mentorship Programmes."
  );

  return (
    <section id="mentorship" className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EDE4] text-[#173D34] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B58B50]" />
            GUIDANCE FOR PROFESSIONAL GROWTH
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.2] tracking-tight">
            Learn Through Guidance, <br />
            <span className="italic text-[#B58B50]">Reflection and Experience.</span>
          </h2>

          <p className="mt-5 font-sans text-base sm:text-lg text-[#59675F] leading-relaxed font-light">
            Mentorship offers an opportunity for developing professionals and learners to explore their interests, strengthen their understanding and receive guidance relevant to their professional growth.
          </p>
        </div>

        {/* 4 Focus Area Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {focusAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.num}
                className="bg-white rounded-3xl p-7 border border-[#B58B50]/20 hover:border-[#B58B50] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-2xl font-light text-[#B58B50]/80">
                      {area.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#E8EDE4] text-[#173D34] flex items-center justify-center group-hover:bg-[#173D34] group-hover:text-[#DFBD83] transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-medium text-[#173D34] mb-2.5 group-hover:text-[#B58B50] transition-colors">
                    {area.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#59675F] font-light leading-relaxed">
                    {area.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E8EDE4]/80 text-[10px] uppercase tracking-wider text-[#B58B50] font-semibold">
                  Mentorship Pillar
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial Quote Panel & Action Block */}
        <div className="bg-[#173D34] rounded-3xl p-8 sm:p-10 lg:p-12 text-[#F7F5EF] relative overflow-hidden shadow-xl border border-[#B58B50]/30">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-start gap-4">
                <Quote className="w-8 h-8 text-[#DFBD83] shrink-0 mt-1 opacity-70" />
                <div>
                  <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-light italic text-[#F7F5EF] leading-snug">
                    &ldquo;Learning becomes more meaningful when knowledge is supported by reflection and guidance.&rdquo;
                  </p>
                  <p className="mt-4 text-xs font-sans text-[#E8EDE4]/70 tracking-wide">
                    Mentorship is designed for educational development and professional reflection. Does not guarantee job placements, licensing, or career outcomes.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={() => onOpenBooking("Mentorship Programme")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#DFBD83] text-[#102E27] text-sm font-semibold hover:bg-white hover:text-[#102E27] transition-all shadow-md"
              >
                <span>Enquire About Mentorship</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappDigits}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#102E27]/80 text-[#F7F5EF] border border-[#B58B50]/40 text-sm font-medium hover:bg-[#102E27] transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#DFBD83]" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

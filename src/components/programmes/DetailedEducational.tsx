"use client";

import React from "react";
import { ArrowUpRight, MessageCircle, School, BookOpen, Heart, Landmark, CheckCircle2 } from "lucide-react";
import { CONTACT_INFO } from "@/components/SocialIcons";

interface DetailedEducationalProps {
  onOpenBooking: (programmeName: string) => void;
}

export default function DetailedEducational({ onOpenBooking }: DetailedEducationalProps) {
  const groups = [
    {
      num: "01",
      title: "Students",
      subtitle: "Emotional Literacy & Life Skills",
      desc: "Age-appropriate awareness sessions exploring emotional wellbeing, peer communication, stress management and healthy daily habits.",
      icon: School,
      points: [
        "Emotional awareness & regulation",
        "Exam stress & healthy study habits",
        "Constructive peer communication",
      ],
    },
    {
      num: "02",
      title: "Educators",
      subtitle: "Classroom Climate & Sensitivity",
      desc: "Structured training exploring student wellbeing support, constructive dialogue, classroom empathy and emotional awareness in schools.",
      icon: BookOpen,
      points: [
        "Recognising early distress signals",
        "Positive classroom communication",
        "Teacher wellbeing & burnout ease",
      ],
    },
    {
      num: "03",
      title: "Parents",
      subtitle: "Nurturing Relational Bonds",
      desc: "Practical sessions discussing adolescent development, supportive communication, positive home environments and active listening.",
      icon: Heart,
      points: [
        "Understanding developmental phases",
        "Healthy digital & screen balance",
        "Empathetic parent-child dialogue",
      ],
    },
    {
      num: "04",
      title: "Institutions",
      subtitle: "Campus-Wide Wellbeing Modules",
      desc: "Customised campus or institutional modules tailored to specific curriculum, student community needs or pastoral care objectives.",
      icon: Landmark,
      points: [
        "Customised institutional seminars",
        "Mental health awareness campaigns",
        "Pastoral support collaboration",
      ],
    },
  ];

  const whatsappMessage = encodeURIComponent(
    "Hello Nair's Epigenetic Wellness team, I would like to enquire about your Educational Training programmes for our institution."
  );

  return (
    <section id="educational" className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EDE4] text-[#173D34] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B58B50]" />
            EDUCATIONAL ECOSYSTEM EMPOWERMENT
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.2] tracking-tight">
            Supporting Awareness and Skills <br />
            <span className="italic text-[#B58B50]">Through Education.</span>
          </h2>

          <p className="mt-5 font-sans text-base sm:text-lg text-[#59675F] leading-relaxed font-light">
            Educational training programmes are designed for schools, colleges, educators, parents and students to support emotional awareness, understanding of human behaviour and practical communication skills.
          </p>
        </div>

        {/* 4 Target Group Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.num}
                className="bg-white rounded-3xl p-7 border border-[#B58B50]/20 hover:border-[#B58B50] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-2xl font-light text-[#B58B50]/80">
                      {group.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#E8EDE4] text-[#173D34] flex items-center justify-center group-hover:bg-[#173D34] group-hover:text-[#DFBD83] transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#173D34] mb-1 group-hover:text-[#B58B50] transition-colors">
                    {group.title}
                  </h3>
                  <p className="text-xs font-sans text-[#B58B50] font-medium tracking-wide uppercase mb-3">
                    {group.subtitle}
                  </p>

                  <p className="font-sans text-xs sm:text-sm text-[#59675F] font-light leading-relaxed mb-5">
                    {group.desc}
                  </p>

                  <ul className="space-y-2 border-t border-[#E8EDE4] pt-4">
                    {group.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-sans text-[#24352D]/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B58B50] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E8EDE4]/80 text-[10px] uppercase tracking-wider text-[#B58B50] font-semibold">
                  Community Pathway
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-[#E8EDE4]/70 rounded-3xl p-8 sm:p-10 border border-[#B58B50]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#173D34] font-medium">
              Partner With Nair&apos;s Epigenetic Wellness
            </h3>
            <p className="font-sans text-sm text-[#59675F] font-light mt-1">
              Connect with our team to discuss tailored learning schedules and interactive modules for your institution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={() => onOpenBooking("Educational Ecosystem Empowerment")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#173D34] text-[#F7F5EF] text-sm font-semibold hover:bg-[#102E27] transition-all shadow-md"
            >
              <span>Enquire About Educational Ecosystem Empowerment</span>
              <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
            </button>

            <a
              href={`https://wa.me/${CONTACT_INFO.whatsappDigits}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#173D34] border border-[#B58B50]/30 text-sm font-medium hover:border-[#B58B50] transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#B58B50]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import React from "react";
import { User, Users, GraduationCap, Briefcase, ArrowUpRight } from "lucide-react";

interface WhoCanExploreProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function WhoCanExplore({ onOpenBooking }: WhoCanExploreProps) {
  const categories = [
    {
      title: "Individuals",
      tagline: "Personal Emotional Wellbeing",
      desc: "People exploring emotional wellbeing, self-awareness, life changes, stress management or personal concerns.",
      serviceTag: "Individual Counselling & Psychotherapy",
      icon: User,
    },
    {
      title: "Families & Relationships",
      tagline: "Interpersonal Dynamics",
      desc: "People seeking support around communication, relationship dynamics, mutual understanding and family transitions.",
      serviceTag: "Relational & Family Guidance",
      icon: Users,
    },
    {
      title: "Students & Young Adults",
      tagline: "Academic Transitions",
      desc: "People navigating educational pressures, emotional adjustments, exam strain, career crossroads and personal identity.",
      serviceTag: "Student Wellbeing & Development",
      icon: GraduationCap,
    },
    {
      title: "Professionals",
      tagline: "Career Resilience",
      desc: "People interested in workplace wellbeing, avoiding burnout, leadership resilience, and practical psychological skills.",
      serviceTag: "Professional Resilience & Renewal",
      icon: Briefcase,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#E8EDE4]/30 border-y border-[#B58B50]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3 justify-center">
            <span className="w-8 h-[1px] bg-[#B58B50]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              WHO CAN EXPLORE
            </span>
            <span className="w-8 h-[1px] bg-[#B58B50]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Support for Different Needs and{" "}
            <span className="italic text-[#B58B50]">Life Situations.</span>
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#59675F] leading-relaxed font-light">
            Therapy and wellbeing support are not restricted to crisis moments. They offer thoughtful space for clarification, renewal and growth across life stages.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-[#B58B50]/20 hover:border-[#B58B50] transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E8EDE4] text-[#173D34] flex items-center justify-center mb-5 group-hover:bg-[#173D34] group-hover:text-[#DFBD83] transition-colors">
                    <Icon className="w-6 h-6" strokeWidth={1.4} />
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[#173D34] mb-1 group-hover:text-[#B58B50] transition-colors">
                    {cat.title}
                  </h3>

                  <span className="block text-xs font-sans tracking-wide text-[#B58B50] mb-3 font-medium">
                    {cat.tagline}
                  </span>

                  <p className="font-sans text-xs sm:text-sm text-[#59675F] font-light leading-relaxed mb-6">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8EDE4]">
                  <button
                    onClick={() => onOpenBooking(cat.serviceTag)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D34] hover:text-[#B58B50] group-hover:underline transition-colors"
                  >
                    <span>Enquire About Support</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B58B50]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


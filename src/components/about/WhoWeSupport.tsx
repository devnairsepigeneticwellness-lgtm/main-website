"use client";

import React from "react";
import Link from "next/link";
import { User, GraduationCap, Briefcase, Building2, ArrowUpRight } from "lucide-react";

export default function WhoWeSupport() {
  const groups = [
    {
      title: "Individuals",
      tagline: "Personal & Emotional Wellbeing",
      desc: "People seeking counselling, emotional support, relational clarity or greater self-awareness in navigating life's complexities.",
      href: "/services",
      linkText: "Explore Counselling & Psychotherapy",
      icon: User,
    },
    {
      title: "Students",
      tagline: "Academic & Developmental Growth",
      desc: "Learners and psychology students interested in emotional resilience, stress management, mental health basics, and personal growth.",
      href: "/#programmes",
      linkText: "Explore Internships & Learning",
      icon: GraduationCap,
    },
    {
      title: "Professionals",
      tagline: "Clinical Mentorship & Practice",
      desc: "Early-career counsellors, educators and healthcare practitioners seeking clinical supervision, boundary mastery, and ethical guidance.",
      href: "/#programmes",
      linkText: "Explore Professional Mentorship",
      icon: Briefcase,
    },
    {
      title: "Organisations",
      tagline: "Workplace Wellness & Culture",
      desc: "Corporate teams, institutions and schools looking for impactful workshops, communication labs and sustainable wellbeing programmes.",
      href: "/#workshops",
      linkText: "Explore Workshops & Training",
      icon: Building2,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3 justify-center">
            <span className="w-8 h-[1px] bg-[#B58B50]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              COMMUNITY &amp; AUDIENCE
            </span>
            <span className="w-8 h-[1px] bg-[#B58B50]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Support Across{" "}
            <span className="italic text-[#B58B50]">Different Stages of Life.</span>
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#59675F] leading-relaxed font-light">
            Whether you are taking your first step towards personal self-reflection or looking to empower your entire organization, our pathways are shaped to meet your context.
          </p>
        </div>

        {/* 4 Support Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-[#B58B50]/20 hover:border-[#B58B50] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E8EDE4] text-[#173D34] flex items-center justify-center mb-5 group-hover:bg-[#173D34] group-hover:text-[#DFBD83] transition-colors">
                    <Icon className="w-6 h-6" strokeWidth={1.4} />
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[#173D34] mb-1 group-hover:text-[#B58B50] transition-colors">
                    {group.title}
                  </h3>

                  <span className="block text-xs font-sans tracking-wide text-[#B58B50] mb-3 font-medium">
                    {group.tagline}
                  </span>

                  <p className="font-sans text-xs sm:text-sm text-[#59675F] font-light leading-relaxed mb-6">
                    {group.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8EDE4]">
                  <Link
                    href={group.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D34] hover:text-[#B58B50] group-hover:underline transition-colors"
                  >
                    <span>{group.linkText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B58B50]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


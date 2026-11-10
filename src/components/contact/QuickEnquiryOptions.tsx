"use client";

import React from "react";
import { ArrowUpRight, Heart, GraduationCap, Briefcase, HelpCircle } from "lucide-react";
import { EnquiryType } from "./EnquiryFormSection";

interface QuickEnquiryOptionsProps {
  onSelectOption: (type: EnquiryType) => void;
}

export default function QuickEnquiryOptions({ onSelectOption }: QuickEnquiryOptionsProps) {
  const categories: {
    number: string;
    title: string;
    description: string;
    cta: string;
    targetType: EnquiryType;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      number: "01",
      title: "Wellness Services",
      description: "Counselling, psychotherapy, hypnotherapy and related support.",
      cta: "Enquire About Services",
      targetType: "Counselling",
      icon: Heart,
    },
    {
      number: "02",
      title: "Professional Programmes",
      description: "Internships, mentorship and professional learning opportunities.",
      cta: "Enquire About Programmes",
      targetType: "Internship Programme",
      icon: GraduationCap,
    },
    {
      number: "03",
      title: "Corporate & Educational Workshops",
      description: "Training and wellbeing workshops for organisations and educational institutions.",
      cta: "Request Workshop Information",
      targetType: "Corporate Workshop",
      icon: Briefcase,
    },
    {
      number: "04",
      title: "General Enquiries",
      description: "Any questions about N.E.W. and its available services.",
      cta: "Contact Our Team",
      targetType: "General Enquiry",
      icon: HelpCircle,
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F7F5EF] relative overflow-hidden">
      {/* Decorative Ambient Radiance */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#173D34]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#B58B50]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2.5 mb-3.5">
            <span className="w-6 h-[1px] bg-[#B58B50]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              GUIDED PATHWAYS
            </span>
            <span className="w-6 h-[1px] bg-[#B58B50]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] tracking-tight">
            What Would You Like to Enquire About?
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#59675F] font-light leading-relaxed">
            Select a pathway below to jump directly into the enquiry form with your chosen focus preselected.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.number}
                className="group relative rounded-3xl bg-[#FCFAF6] border border-[#E8EDE4] p-7 sm:p-8 flex flex-col justify-between hover:border-[#B58B50]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl sm:text-3xl font-light text-[#B58B50] tracking-tight">
                      {cat.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#173D34]/10 text-[#173D34] group-hover:bg-[#173D34] group-hover:text-[#DFBD83] flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#173D34] font-medium leading-snug mb-3 group-hover:text-[#B58B50] transition-colors">
                    {cat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#59675F] font-light leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-8 pt-5 border-t border-[#E8EDE4]">
                  <button
                    type="button"
                    onClick={() => onSelectOption(cat.targetType)}
                    className="w-full inline-flex items-center justify-between text-xs sm:text-sm font-semibold text-[#173D34] group-hover:text-[#B58B50] transition-colors py-1 cursor-pointer focus:outline-none"
                  >
                    <span>{cat.cta}</span>
                    <div className="w-8 h-8 rounded-full bg-[#173D34]/5 group-hover:bg-[#B58B50] text-[#173D34] group-hover:text-white flex items-center justify-center transition-all">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
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


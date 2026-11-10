"use client";

import React from "react";
import { Search, MailCheck, MessageSquare, ArrowRight, Info } from "lucide-react";
import { CONNECTION_STEPS } from "@/data/professionalsData";

export default function ConnectionSteps() {
  const stepIcons = [Search, MailCheck, MessageSquare, ArrowRight];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5EF] text-[#24352D] relative overflow-hidden border-b border-[#B58B50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#B58B50]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              GETTING STARTED
            </span>
            <span className="w-6 h-[1px] bg-[#B58B50]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#173D34] leading-[1.2] tracking-tight">
            Finding the Right{" "}
            <span className="italic text-[#B58B50] font-light">Starting Point.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base lg:text-lg text-[#59675F] leading-relaxed font-light">
            Connecting with professional support is a personal and thoughtful step. We ensure each enquiry is received with confidentiality and individual care.
          </p>
        </div>

        {/* 4-Step Process with Connecting Timeline */}
        <div className="relative">
          {/* Horizontal Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-[#B58B50]/20 via-[#B58B50]/60 to-[#B58B50]/20 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {CONNECTION_STEPS.map((item, idx) => {
              const Icon = stepIcons[idx] || ArrowRight;
              return (
                <div
                  key={item.step}
                  className="flex flex-col items-center text-center p-6 sm:p-7 rounded-3xl bg-white border border-[#E8EDE4] shadow-xs hover:shadow-lg transition-all"
                >
                  {/* Step Number Circle */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#173D34] text-[#DFBD83] border-2 border-[#B58B50]/40 flex items-center justify-center font-serif text-lg font-semibold shadow-md">
                      {item.step}
                    </div>
                    <div className="absolute -bottom-2 -right-1 w-7 h-7 rounded-full bg-[#B58B50] text-white flex items-center justify-center border-2 border-white shadow-xs">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#173D34] mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-[#59675F] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reassurance Notice */}
        <div className="mt-12 max-w-2xl mx-auto p-4 rounded-2xl bg-[#E8EDE4]/60 border border-[#B58B50]/30 flex items-center gap-3 text-xs text-[#59675F] text-left">
          <Info className="w-5 h-5 text-[#B58B50] shrink-0" />
          <p className="font-light leading-relaxed">
            Appointments and professional availability are reviewed thoughtfully by our admissions team according to clinical suitability, rather than automated matching algorithms.
          </p>
        </div>

      </div>
    </section>
  );
}

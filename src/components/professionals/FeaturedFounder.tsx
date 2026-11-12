"use client";

import React from "react";
import Image from "next/image";
import {
  Award,
  ShieldCheck,
  GraduationCap,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";
import { Professional } from "@/data/professionalsData";

interface FeaturedFounderProps {
  founder: Professional;
  onOpenProfile: (professional: Professional) => void;
  onOpenBooking: (serviceOrName?: string) => void;
}

export default function FeaturedFounder({
  founder,
  onOpenProfile,
  onOpenBooking,
}: FeaturedFounderProps) {
  return (
    <section id="founder-profile" className="py-20 lg:py-28 bg-[#E8EDE4]/50 border-b border-[#B58B50]/20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B58B50]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (5 cols): Large Authentic Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px]">
              
              {/* Outer Golden Aura Ring */}
              <div className="absolute -inset-4 rounded-t-[200px] rounded-b-3xl border border-[#B58B50]/35 pointer-events-none" />
              <div className="absolute -inset-8 rounded-t-[230px] rounded-b-[42px] border border-[#B58B50]/15 pointer-events-none hidden sm:block" />

              {/* Arched Portrait Container */}
              <div className="relative h-[530px] sm:h-[600px] w-full rounded-t-[190px] rounded-b-3xl overflow-hidden bg-[#102E27] border-2 border-[#B58B50]/60 shadow-2xl flex flex-col justify-between p-6 group">
                
                {/* Real Founder Photo */}
                <div className="absolute inset-0">
                  <Image
                    src="/founder.jpeg"
                    alt="Ajit Kumar Nair — Founder of Nair's Epigenetic Wellness"
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover object-top filter contrast-[1.03] brightness-[0.98] transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle gradient vignette to protect top and bottom text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102E27] via-[#102E27]/40 via-45% to-transparent" />
                  <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
                  <div className="absolute inset-0 rounded-t-[190px] rounded-b-3xl border border-[#DFBD83]/20 pointer-events-none" />
                </div>

                {/* Bottom Signature Card */}
                <div className="relative z-10 bg-[#102E27]/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#B58B50]/40 text-left shadow-xl">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#F7F5EF]">
                      Ajit Kumar Nair
                    </h3>
                    <div className="p-1 rounded-full bg-[#B58B50]/20 text-[#DFBD83] border border-[#B58B50]/40">
                      <ShieldCheck className="w-4 h-4 text-[#DFBD83]" />
                    </div>
                  </div>
                  <span className="text-xs text-[#DFBD83] font-sans tracking-wide block font-semibold uppercase">
                    RCI REGISTERED REHABILITATION COUNSELLOR
                  </span>
                  <span className="text-[11px] text-[#E8EDE4]/90 font-sans tracking-wide block font-medium uppercase">
                    COUNSELLING PSYCHOLOGIST &bull; CLINICAL HYPNOTHERAPIST
                  </span>
                  <span className="text-[10px] text-[#DFBD83]/90 font-sans tracking-wide block mb-2 font-medium uppercase">
                    MENTAL HEALTH REHABILITATION &amp; TRAINING EXPERT
                  </span>
                  <p className="text-[11px] text-[#E8EDE4]/85 leading-relaxed font-light">
                    Former mariner turned clinical practitioner, blending worldwide life resilience with rigorous psychological mastery.
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column (7 cols): Founder Story, Credentials & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#B58B50]" />
              <span className="text-xs font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
                KNOW THE FOUNDER
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight mb-2">
              Ajit Kumar Nair
            </h2>

            {/* Professional Titles */}
            <p className="text-xs sm:text-sm font-sans tracking-wide text-[#9E783E] font-semibold uppercase mb-1">
              RCI REGISTERED REHABILITATION COUNSELLOR
            </p>
            <p className="text-xs sm:text-sm font-sans tracking-wide text-[#173D34] font-medium uppercase mb-1">
              COUNSELLING PSYCHOLOGIST &bull; CLINICAL HYPNOTHERAPIST
            </p>
            <p className="text-xs sm:text-sm font-sans tracking-wide text-[#7D6335] font-medium uppercase mb-6">
              MENTAL HEALTH REHABILITATION &amp; TRAINING EXPERT
            </p>

            {/* Narrative / Suggested Introduction */}
            <div className="space-y-4 font-sans text-sm sm:text-base text-[#59675F] leading-relaxed font-light">
              <p>
                Ajit Kumar Nair is the founder of Nair&apos;s Epigenetic Wellness. His professional background includes counselling, psychology, rehabilitation, clinical hypnotherapy, training and wellbeing.
              </p>
              <p>
                His work reflects an interest in psychological understanding, therapeutic approaches and practical skill development in supporting individuals and groups.
              </p>
              <p>
                Ajit also brings a distinctive, grounded perspective from his earlier career as a mariner, followed by his dedicated transition into psychology and mental health. This combination of vast global experience, cross-cultural awareness, and clinical depth informs his practical, empathetic, and human-centred approach to wellbeing.
              </p>
            </div>

            {/* Areas of Work: Compact Premium Tags */}
            <div className="mt-6 pt-5 border-t border-[#B58B50]/20">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#173D34] block mb-3">
                Areas of Work:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Counselling",
                  "Psychological Wellbeing",
                  "Rehabilitation Support",
                  "Clinical Hypnotherapy",
                  "Mindfulness",
                  "Training & Mentorship"
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-full bg-white text-[#173D34] text-xs font-medium border border-[#B58B50]/30 shadow-2xs hover:border-[#B58B50] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Qualifications / Background Structured Timeline */}
            <div className="mt-6 pt-5 border-t border-[#B58B50]/20">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#173D34] block mb-3">
                Credentials &amp; Statutory Registration:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {founder.qualifications.map((q, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <GraduationCap className="w-4 h-4 text-[#B58B50] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#24352D] font-light leading-relaxed">
                      {q}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-5 border-t border-[#B58B50]/20 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking("Consultation — Ajit Kumar Nair")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#F7F5EF] text-sm font-medium tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Enquire About a Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
              </button>

              <button
                onClick={() => onOpenProfile(founder)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#F7F5EF] text-[#173D34] text-sm font-medium tracking-wide border border-[#B58B50]/40 hover:border-[#B58B50] transition-all cursor-pointer"
              >
                <span>View Full Profile</span>
                <ChevronRight className="w-4 h-4 text-[#B58B50]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  GraduationCap,
  ArrowUpRight,
  Anchor,
} from "lucide-react";
import { Professional } from "@/data/professionalsData";

interface FeaturedFounderProps {
  founder: Professional;
  onOpenBooking: (serviceOrName?: string) => void;
}

export default function FeaturedFounder({
  founder,
  onOpenBooking,
}: FeaturedFounderProps) {
  return (
    <section id="founder-profile" className="py-20 lg:py-28 bg-[#E8EDE4]/50 border-b border-[#B58B50]/20 relative overflow-hidden scroll-mt-20">
      <div id={founder.id} className="scroll-mt-24" />
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B58B50]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 cols): Large Authentic Portrait Frame & Credentials */}
          <div className="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-24">
            <div className="relative w-full max-w-[420px] my-6">
              
              {/* Outer Golden Aura Ring */}
              <div className="absolute -inset-4 rounded-t-[200px] rounded-b-3xl border border-[#B58B50]/35 pointer-events-none" />
              <div className="absolute -inset-8 rounded-t-[230px] rounded-b-[42px] border border-[#B58B50]/15 pointer-events-none hidden sm:block" />

              {/* Top Apex Badge (placed outside overflow-hidden arch so it never clips) */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#102E27] border border-[#DFBD83]/60 text-[10px] font-mono tracking-widest text-[#DFBD83] uppercase font-semibold shadow-md">
                  RCI REGISTERED
                </span>
              </div>

              {/* Arched Portrait Container */}
              <div className="relative h-[530px] sm:h-[600px] w-full rounded-t-[190px] rounded-b-3xl overflow-hidden bg-[#102E27] border-2 border-[#B58B50]/60 shadow-2xl flex flex-col justify-end p-6 group">
                
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
                  {/* Subtle gradient vignette to protect bottom text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102E27] via-[#102E27]/40 via-45% to-transparent" />
                  <div className="absolute inset-0 rounded-t-[190px] rounded-b-3xl border border-[#DFBD83]/20 pointer-events-none" />
                </div>

                {/* Bottom Signature Card */}
                <div className="relative z-10 bg-[#102E27]/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#B58B50]/40 text-left shadow-xl mt-auto">
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
                    COUNSELLING PSYCHOLOGIST &bull; HYPNOTHERAPIST
                  </span>
                  <span className="text-[10px] text-[#DFBD83]/90 font-sans tracking-wide block font-medium uppercase">
                    PSYCHOTHERAPY &bull; MINDFULNESS TRAINER
                  </span>
                  <span className="text-[10px] text-[#E8EDE4]/80 font-sans tracking-wide block mb-2 font-medium uppercase">
                    TRAINER CERTIFICATION IN HYPNOTHERAPY (CALIFORNIA HYPNOSIS INSTITUTE)
                  </span>
                  <div className="flex items-center gap-2 pt-2 border-t border-[#B58B50]/30 text-[11px] text-[#E8EDE4]/85 font-light">
                    <Anchor className="w-3.5 h-3.5 text-[#DFBD83] shrink-0" />
                    <span>Former mariner turned clinical practitioner</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column (7 cols): Comprehensive Founder Story, Clinical Modalities & Approach */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            
            {/* Header Titles */}
            <div>
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
                COUNSELLING PSYCHOLOGIST &bull; PSYCHOTHERAPY &bull; HYPNOTHERAPIST &bull; MINDFULNESS TRAINER
              </p>
              <p className="text-xs sm:text-sm font-sans tracking-wide text-[#7D6335] font-medium uppercase">
                TRAINER CERTIFICATION IN HYPNOTHERAPY (CALIFORNIA HYPNOSIS INSTITUTE) &bull; MENTAL HEALTH REHABILITATION &amp; TRAINING EXPERT
              </p>
            </div>

            {/* Complete Comprehensive Clinical Narrative */}
            <div className="space-y-4 font-sans text-sm sm:text-base text-[#465A4F] leading-relaxed font-light">
              <p>
                Ajit Kumar Nair is the founder of Nair&apos;s Epigenetic Wellness. His professional background includes counselling, psychology, rehabilitation, clinical hypnotherapy, training and wellbeing.
              </p>
              <p>
                His work reflects an interest in psychological understanding, therapeutic approaches and practical skill development in supporting individuals and groups.
              </p>
              <p>
                Ajit brings extensive clinical experience across counselling psychology, psychotherapy, mental health rehabilitation, professional training, and wellbeing programmes. His formal education and advanced training span Clinical Psychology, Applied Psychology, Guidance and Counselling, Rehabilitation Psychology, and Clinical Hypnotherapy.
              </p>
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#C8D6C6] shadow-xs">
                <p className="text-[#24352D] font-normal leading-relaxed">
                  Ajit also brings a distinctive, grounded perspective from his earlier career as a mariner, followed by his dedicated transition into psychology and mental health. This combination of vast global experience, cross-cultural awareness, and clinical depth informs his practical, empathetic, and human-centred approach to wellbeing.
                </p>
              </div>
              <p className="font-normal text-[#173D34]">
                At N.E.W., his focus is on helping people truly understand themselves, develop practical psychological skills, and build meaningful, sustainable changes that endure.
              </p>
            </div>

            {/* Guiding Quote Callout */}
            {founder.quote && (
              <blockquote className="p-4 sm:p-5 rounded-2xl bg-[#173D34]/5 border-l-4 border-[#B58B50] text-[#173D34]">
                <p className="font-serif italic text-sm sm:text-base leading-snug">
                  &ldquo;{founder.quote}&rdquo;
                </p>
                <footer className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#9E783E]">
                  &mdash; Ajit Kumar Nair
                </footer>
              </blockquote>
            )}

            {/* Specialised Training Modalities */}
            <div className="pt-4 border-t border-[#B58B50]/20">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#173D34] block mb-2.5">
                Specialised Training Modalities:
              </span>
              <div className="flex flex-wrap gap-2">
                {founder.modalities.map((mod, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-full bg-white text-[#173D34] text-xs font-medium border border-[#B58B50]/30 shadow-2xs hover:border-[#B58B50] transition-colors"
                  >
                    {mod}
                  </span>
                ))}
              </div>
            </div>

            {/* Areas of Expertise / Focus */}
            <div className="pt-4 border-t border-[#B58B50]/20">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#173D34] block mb-2.5">
                Areas of Work &amp; Clinical Focus:
              </span>
              <div className="flex flex-wrap gap-2">
                {founder.expertise.map((exp, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-[#E8EDE4]/80 text-[#173D34] text-xs font-medium border border-[#173D34]/10"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            {/* Therapeutic Approach */}
            <div className="pt-4 border-t border-[#B58B50]/20">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#173D34] block mb-1.5">
                Therapeutic Philosophy &amp; Approach:
              </span>
              <p className="text-xs sm:text-sm text-[#59675F] leading-relaxed font-light">
                {founder.approach}
              </p>
            </div>

            {/* Qualifications / Background Structured Timeline */}
            <div className="pt-4 border-t border-[#B58B50]/20">
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
            <div className="pt-6 border-t border-[#B58B50]/20 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => onOpenBooking("Consultation — Ajit Kumar Nair")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#F7F5EF] text-sm font-medium tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Enquire About a Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
              </button>

              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                <Link
                  href="/services#counselling"
                  className="inline-flex items-center gap-1 text-[#7D6335] hover:text-[#173D34] transition-colors"
                >
                  <span>Counselling Services</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[#B58B50]/40">&bull;</span>
                <Link
                  href="/services#psychotherapies"
                  className="inline-flex items-center gap-1 text-[#7D6335] hover:text-[#173D34] transition-colors"
                >
                  <span>Psychotherapy Modalities</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

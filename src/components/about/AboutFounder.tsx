"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, ArrowUpRight, Anchor, Brain, Sparkles, GraduationCap } from "lucide-react";
import { aboutCopy } from "@/data/aboutData";

interface AboutFounderProps {
  onOpenBooking: () => void;
}

export default function AboutFounder({ onOpenBooking }: AboutFounderProps) {
  const { founder } = aboutCopy;

  const modalitiesList = [
    "Cognitive Behaviour Therapy (CBT)",
    "Rational Emotive Behaviour Therapy (REBT)",
    "Dialectical Behaviour Therapy (DBT)",
    "Acceptance & Commitment Therapy (ACT)",
    "Interpersonal Therapy (IPT)",
    "Emotionally Focused Therapy (EFT)",
    "Clinical Hypnotherapy",
    "Mindfulness & Rehabilitation",
  ];

  return (
    <section id="founder-about" className="py-20 lg:py-28 bg-[#F4F7F2] relative overflow-hidden border-b border-[#C8D6C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (5 cols): Authentic Founder Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px]">
              
              {/* Decorative Architectural Aura Rings */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-t-[210px] rounded-b-3xl border border-[#B58B50]/30 pointer-events-none" />
              <div className="absolute -inset-8 rounded-t-[230px] rounded-b-[40px] border border-[#B58B50]/15 pointer-events-none hidden sm:block" />

              {/* Architectural Rounded Portrait Frame */}
              <div className="relative h-[520px] sm:h-[580px] w-full rounded-t-[190px] rounded-b-3xl overflow-hidden bg-[#102E27] border-2 border-[#B58B50]/50 shadow-2xl flex flex-col justify-between p-6 group">
                
                {/* Real Founder Photo */}
                <div className="absolute inset-0">
                  <Image
                    src="/founder.jpeg"
                    alt="Ajit Kumar Nair — Founder of Nair's Epigenetic Wellness"
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-top filter contrast-[1.03] brightness-[0.98] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102E27] via-[#102E27]/40 via-45% to-transparent" />
                  <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
                  <div className="absolute inset-0 rounded-t-[190px] rounded-b-3xl border border-[#DFBD83]/20 pointer-events-none" />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#102E27]/90 backdrop-blur-sm border border-[#DFBD83]/40 text-[10px] font-mono tracking-widest text-[#DFBD83] uppercase font-semibold">
                    RCI REGISTERED
                  </span>
                </div>

                {/* Bottom Signature Card */}
                <div className="relative z-10 bg-[#102E27]/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#B58B50]/40 text-left shadow-xl">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#F7F5EF]">
                      {founder.title}
                    </h3>
                    <div className="p-1 rounded-full bg-[#B58B50]/20 text-[#DFBD83] border border-[#B58B50]/40">
                      <ShieldCheck className="w-4 h-4 text-[#DFBD83]" />
                    </div>
                  </div>
                  <span className="text-xs text-[#DFBD83] font-sans tracking-wide block font-semibold uppercase">
                    COUNSELLING PSYCHOLOGIST
                  </span>
                  <span className="text-[11px] text-[#E8EDE4]/90 font-sans tracking-wide block font-medium uppercase">
                    REHABILITATION COUNSELOR (RCI REGISTERED)
                  </span>
                  <span className="text-[10px] text-[#DFBD83]/90 font-sans tracking-wide block mb-2 font-medium uppercase">
                    CLINICAL HYPNOTHERAPIST &bull; TRAINER &bull; PRACTITIONER
                  </span>
                  <div className="flex items-center gap-2 pt-2 border-t border-[#B58B50]/30 text-[11px] text-[#E8EDE4]/85 font-light">
                    <Anchor className="w-3.5 h-3.5 text-[#DFBD83] shrink-0" />
                    <span>Former mariner turned clinical practitioner</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column (7 cols): Verbatim Founder Bio */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="w-6 h-[1px] bg-[#9E783E]" />
              <span className="text-xs font-semibold tracking-[0.24em] text-[#7D6335] uppercase font-sans">
                {founder.heading.toUpperCase()}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.15] tracking-tight mb-2">
              {founder.title}
            </h2>

            <p className="text-xs sm:text-sm font-sans tracking-wide text-[#7D6335] font-semibold mb-6">
              {founder.credentials}
            </p>

            {/* Exact PDF Copy: Paragraphs 1 to 5 */}
            <div className="space-y-4 font-sans text-sm sm:text-base text-[#465A4F] leading-relaxed font-light mb-6">
              <p>{founder.p1}</p>
              <p>{founder.p2}</p>
              <p>{founder.p3}</p>
              <div className="p-4 rounded-2xl bg-white border border-[#C8D6C6] shadow-2xs">
                <p className="text-[#24352D] font-normal">{founder.p4}</p>
              </div>
              <p className="font-normal text-[#173D34]">{founder.p5}</p>
            </div>

            {/* Specialised Training Badges */}
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#173D34] block mb-2.5">
                Specialised Training Modalities:
              </span>
              <div className="flex flex-wrap gap-2">
                {modalitiesList.map((mod, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full bg-white border border-[#C8D6C6] text-xs font-medium text-[#24352D] shadow-2xs"
                  >
                    {mod}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md cursor-pointer group"
              >
                <span>Book a Consultation with Ajit</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFBD83] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <Link
                href="/professionals"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#7D6335]/40 text-[#173D34] hover:bg-white text-xs sm:text-sm font-medium tracking-wide transition-all"
              >
                <span>View All Practitioners</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

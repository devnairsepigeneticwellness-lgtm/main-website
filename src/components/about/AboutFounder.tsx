"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Award, ShieldCheck, ArrowUpRight, GraduationCap } from "lucide-react";

export default function AboutFounder({ onOpenBooking }: { onOpenBooking: () => void }) {
  const areasOfWork = [
    { title: "Counselling", desc: "Individual, relational and life transition guidance" },
    { title: "Psychological Wellbeing", desc: "Understanding emotional, cognitive and behavioural patterns" },
    { title: "Rehabilitation Support", desc: "Structured psychosocial autonomy and functional coping" },
    { title: "Hypnotherapy", desc: "Focused relaxation and collaborative trance techniques" },
    { title: "Training & Mentorship", desc: "Professional development for students and practitioners" },
    { title: "Mindfulness", desc: "Grounded somatic regulation and attention practices" },
  ];

  return (
    <section id="founder-about" className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (5 cols): Large Authentic Founder Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px]">
              
              {/* Decorative Architectural Aura Rings */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-t-[210px] rounded-b-3xl border border-[#B58B50]/30 pointer-events-none" />
              <div className="absolute -inset-8 rounded-t-[230px] rounded-b-[40px] border border-[#B58B50]/15 pointer-events-none hidden sm:block" />

              {/* Architectural Rounded Portrait Frame */}
              <div className="relative h-[500px] sm:h-[560px] w-full rounded-t-[190px] rounded-b-3xl overflow-hidden bg-[#102E27] border-2 border-[#B58B50]/50 shadow-2xl flex flex-col justify-between p-6 group">
                
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
                  {/* Subtle gradient vignette to protect top and bottom text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102E27] via-[#102E27]/40 via-45% to-transparent" />
                  <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
                  <div className="absolute inset-0 rounded-t-[190px] rounded-b-3xl border border-[#DFBD83]/20 pointer-events-none" />
                </div>

                {/* Top Label: Centered in Arch Crown */}
                <div className="relative z-10 flex justify-center pt-1">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#102E27]/90 text-[#DFBD83] border border-[#B58B50]/50 backdrop-blur-md shadow-md">
                    <Award className="w-3.5 h-3.5 text-[#DFBD83] shrink-0" />
                    <span className="text-[10px] font-sans tracking-[0.18em] uppercase font-semibold">
                      Founder Portrait
                    </span>
                  </div>
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
                  <span className="text-xs text-[#DFBD83] font-sans tracking-wide block mb-2 font-medium">
                    Founder &bull; Counselling Psychologist &bull; RCI Reg.
                  </span>
                  <p className="text-[11px] text-[#E8EDE4]/85 leading-relaxed font-light">
                    Combining multi-disciplinary academic foundations with a calm, human-centred clinical ethos.
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column (7 cols): Founder Introduction & Areas of Work */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#B58B50]" />
              <span className="text-xs font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
                THE PERSON BEHIND N.E.W.
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.15] tracking-tight mb-2">
              Ajit Kumar Nair
            </h2>

            <p className="text-xs sm:text-sm font-sans tracking-wide text-[#B58B50] font-medium uppercase mb-6">
              Founder | Counselling Psychologist | Rehabilitation Counselor (RCI) | Clinical Hypnotherapist
            </p>

            {/* Approved Introductory Content */}
            <div className="space-y-4 font-sans text-base text-[#59675F] leading-relaxed font-light mb-8">
              <p>
                Ajit Kumar Nair is the founder of Nair&apos;s Epigenetic Wellness. His professional background encompasses counselling, psychology, rehabilitation, hypnotherapy, training and wellbeing.
              </p>
              <p>
                His approach brings together psychological understanding, therapeutic practices and practical skill development to support individuals and groups.
              </p>
            </div>

            {/* Areas of Work Tags */}
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#173D34] block mb-3">
                Key Areas of Work:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {areasOfWork.map((area, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white border border-[#B58B50]/20 shadow-2xs flex flex-col"
                  >
                    <span className="text-xs font-medium text-[#173D34] font-serif">
                      {area.title}
                    </span>
                    <span className="text-[11px] text-[#59675F] font-light mt-0.5">
                      {area.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/#founder"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#173D34] hover:bg-[#102E27] text-white text-xs sm:text-sm font-medium tracking-wide transition-all shadow-sm"
              >
                <span>Explore Our Professionals</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
              </Link>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#B58B50] text-[#173D34] hover:bg-[#B58B50]/10 text-xs sm:text-sm font-medium tracking-wide transition-all"
              >
                <span>Book a Consultation with Ajit</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


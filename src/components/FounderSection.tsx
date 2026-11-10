"use client";

import React from "react";
import Image from "next/image";
import { Award, Compass, GraduationCap, ShieldCheck, ArrowUpRight, Anchor, HeartHandshake } from "lucide-react";

export default function FounderSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  const credentials = [
    { label: "Counselling Psychologist", desc: "Applied Psychology & Clinical Foundations" },
    { label: "Rehabilitation Counselor (RCI)", desc: "Statutory Rehabilitation Council of India Registration" },
    { label: "Clinical Hypnotherapist", desc: "Specialist Certification in Focused Relaxation & Trance" },
    { label: "Guidance & Counselling", desc: "Comprehensive Developmental & Relational Training" },
  ];

  const modalities = [
    "CBT (Cognitive Behavioural)",
    "REBT (Rational Emotive)",
    "DBT (Dialectical Skills)",
    "ACT (Acceptance & Commitment)",
    "IPT (Interpersonal)",
    "EFT (Emotionally Focused)",
    "Mindfulness-Based Stress Reduction",
  ];

  return (
    <section id="founder" className="py-20 lg:py-28 bg-[#E8EDE4]/50 border-t border-[#B58B50]/20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B58B50]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (5 cols): Founder Portrait Placeholder Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px]">
              
              {/* Outer Golden Aura Ring */}
              <div className="absolute -inset-4 rounded-t-[190px] rounded-b-3xl border border-[#B58B50]/30 pointer-events-none" />
              <div className="absolute -inset-8 rounded-t-[220px] rounded-b-[40px] border border-[#B58B50]/15 pointer-events-none hidden sm:block" />

              {/* Arched Portrait Frame */}
              <div className="relative h-[500px] sm:h-[560px] w-full rounded-t-[180px] rounded-b-3xl overflow-hidden bg-[#102E27] border-2 border-[#B58B50]/50 shadow-2xl flex flex-col justify-between p-6 group">
                
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
                  <div className="absolute inset-0 rounded-t-[180px] rounded-b-3xl border border-[#DFBD83]/20 pointer-events-none" />
                </div>

                {/* Top Badge: Centered in Arch Crown */}
                <div className="relative z-10 flex justify-center pt-1">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#102E27]/90 text-[#DFBD83] border border-[#B58B50]/50 backdrop-blur-md shadow-md">
                    <Award className="w-3.5 h-3.5 text-[#DFBD83] shrink-0" />
                    <span className="text-[10px] font-sans tracking-[0.18em] uppercase font-semibold">
                      Founder Spotlight
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
                    Former ocean mariner turned Counselling Psychologist &amp; Rehabilitation Counselor, blending worldwide life resilience with psychological mastery.
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column (7 cols): Founder Story & Qualifications */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#B58B50]" />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#B58B50] uppercase font-sans">
                Meet the Founder
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight mb-4">
              Ajit Kumar Nair
            </h2>

            <p className="text-xs sm:text-sm font-sans tracking-wide text-[#B58B50] font-medium uppercase mb-6">
              Counselling Psychologist · Rehabilitation Counselor (RCI Registered) · Clinical Hypnotherapist
            </p>

            {/* Narrative */}
            <div className="space-y-4 font-sans text-sm sm:text-base text-[#59675F] leading-relaxed font-light">
              <p>
                Ajit Kumar Nair brings extensive clinical experience across counselling psychology,
                psychotherapy, mental health rehabilitation, professional training, and wellbeing programmes.
                His formal education and advanced training span <strong className="text-[#173D34] font-medium">Clinical Psychology</strong>, <strong className="text-[#173D34] font-medium">Applied Psychology</strong>, <strong className="text-[#173D34] font-medium">Guidance and Counselling</strong>, <strong className="text-[#173D34] font-medium">Rehabilitation Psychology</strong>, and <strong className="text-[#173D34] font-medium">Clinical Hypnotherapy</strong>.
              </p>
              <p>
                Ajit also brings a distinctive, grounded perspective from his earlier career as an ocean mariner,
                followed by his dedicated transition into psychology and mental health. This combination of vast global experience,
                cross-cultural awareness, and clinical depth informs his practical, empathetic, and human-centred approach to wellbeing.
              </p>
            </div>

            {/* Quote Block */}
            <blockquote className="my-6 p-5 rounded-2xl bg-white border-l-4 border-[#B58B50] shadow-sm">
              <p className="font-serif italic text-base sm:text-lg text-[#173D34] font-light leading-snug">
                &ldquo;At N.E.W., my focus is on helping people truly understand themselves, develop practical psychological skills, and build meaningful, sustainable changes that endure.&rdquo;
              </p>
              <cite className="block mt-2 text-xs font-sans not-italic text-[#B58B50] font-semibold tracking-wider uppercase">
                &mdash; Ajit Kumar Nair
              </cite>
            </blockquote>

            {/* Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#B58B50]/20">
              {credentials.map((cred, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#B58B50] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-medium text-[#173D34]">{cred.label}</span>
                    <span className="block text-[11px] text-[#59675F] font-light">{cred.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Modalities Chips */}
            <div className="mt-6 pt-4 border-t border-[#B58B50]/20">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#173D34] block mb-2">
                Approaches &amp; Therapeutic Modalities:
              </span>
              <div className="flex flex-wrap gap-2">
                {modalities.map((mod, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-white text-[#173D34] text-xs border border-[#B58B50]/30 font-medium shadow-2xs"
                  >
                    {mod}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#F7F5EF] text-sm font-medium tracking-wide shadow-md transition-all"
              >
                <span>Book a Consultation with Ajit</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


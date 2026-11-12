"use client";

import React from "react";
import Image from "next/image";
import { Award, Compass, GraduationCap, ShieldCheck, ArrowUpRight, Anchor, HeartHandshake } from "lucide-react";

export default function FounderSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  const credentials = [
    { label: "RCI Registered Rehabilitation Counsellor", desc: "Statutory Rehabilitation Council of India Registration" },
    { label: "Counselling Psychologist", desc: "Applied Psychology & Clinical Foundations" },
    { label: "Clinical Hypnotherapist", desc: "Specialist Certification in Focused Relaxation & Trance" },
    { label: "Mental Health Rehabilitation & Training Expert", desc: "Institutional, Academic & Professional Systems Mastery" },
  ];

  const modalities = [
    "Cognitive Behaviour Therapy (CBT)",
    "Rational Emotive Behaviour Therapy (REBT)",
    "Dialectical Behaviour Therapy (DBT)",
    "Acceptance and Commitment Therapy (ACT)",
    "Interpersonal Therapy (IPT)",
    "Emotionally Focused Therapy (EFT)",
    "Clinical Hypnotherapy",
    "Mindfulness-Based Cognitive Therapy (MBCT)",
  ];

  return (
    <section id="founder" className="py-20 lg:py-28 bg-[#EAF0E7] border-t border-[#C8D6C6] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#9E783E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (5 cols): Founder Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px]">
              
              {/* Outer Sage Rings */}
              <div className="absolute -inset-4 rounded-t-[190px] rounded-b-3xl border border-[#B8C8B6]/70 pointer-events-none" />
              <div className="absolute -inset-8 rounded-t-[220px] rounded-b-[40px] border border-[#B8C8B6]/40 pointer-events-none hidden sm:block" />

              {/* Arched Portrait Frame */}
              <div className="relative h-[500px] sm:h-[560px] w-full rounded-t-[180px] rounded-b-3xl overflow-hidden bg-[#244337] border-2 border-[#A8BBA2] shadow-xl flex flex-col justify-between p-6 group">
                
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E3F35] via-[#1E3F35]/40 via-45% to-transparent" />
                  <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/35 to-transparent" />
                  <div className="absolute inset-0 rounded-t-[180px] rounded-b-3xl border border-[#DFBD83]/20 pointer-events-none" />
                </div>

                {/* Bottom Signature Card */}
                <div className="relative z-10 bg-[#1E3F35]/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#DFBD83]/40 text-left shadow-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#F7F5EF]">
                      Ajit Kumar Nair
                    </h3>
                    <div className="p-1 rounded-full bg-[#DFBD83]/20 text-[#DFBD83] border border-[#DFBD83]/40">
                      <ShieldCheck className="w-4 h-4 text-[#DFBD83]" />
                    </div>
                  </div>
                  <span className="text-xs text-[#DFBD83] font-sans tracking-wider block font-semibold uppercase">
                    RCI REGISTERED REHABILITATION COUNSELLOR
                  </span>
                  <span className="text-[11px] text-[#E8EDE4]/90 font-sans tracking-wide block font-medium uppercase">
                    COUNSELLING PSYCHOLOGIST &bull; CLINICAL HYPNOTHERAPIST
                  </span>
                  <span className="text-[10px] text-[#DFBD83]/90 font-sans tracking-wide block mb-2 font-medium uppercase">
                    MENTAL HEALTH REHABILITATION &amp; TRAINING EXPERT
                  </span>
                  <p className="text-[11px] text-[#E8EDE4]/90 leading-relaxed font-light">
                    Former mariner turned clinical practitioner, blending worldwide life resilience with psychological mastery.
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column (7 cols): Founder Story & Qualifications */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#9E783E]" />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
                KNOW THE FOUNDER
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight mb-4">
              Ajit Kumar Nair
            </h2>

            <p className="text-xs sm:text-sm font-sans tracking-wide text-[#9E783E] font-semibold uppercase mb-1">
              RCI REGISTERED REHABILITATION COUNSELLOR
            </p>
            <p className="text-xs sm:text-sm font-sans tracking-wide text-[#3F5448] font-medium uppercase mb-1">
              COUNSELLING PSYCHOLOGIST &bull; CLINICAL HYPNOTHERAPIST
            </p>
            <p className="text-xs sm:text-sm font-sans tracking-wide text-[#7D6335] font-medium uppercase mb-6">
              MENTAL HEALTH REHABILITATION &amp; TRAINING EXPERT
            </p>

            {/* Narrative */}
            <div className="space-y-4 font-sans text-sm sm:text-base text-[#3F5448] leading-relaxed font-light">
              <p>
                Ajit Kumar Nair brings extensive clinical experience across counselling psychology,
                psychotherapy, mental health rehabilitation, professional training, and wellbeing programmes.
                His formal education and advanced training span <strong className="text-[#173D34] font-medium">Clinical Psychology</strong>, <strong className="text-[#173D34] font-medium">Applied Psychology</strong>, <strong className="text-[#173D34] font-medium">Guidance and Counselling</strong>, <strong className="text-[#173D34] font-medium">Rehabilitation Psychology</strong>, and <strong className="text-[#173D34] font-medium">Clinical Hypnotherapy</strong>.
              </p>
              <p>
                Ajit also brings a distinctive, grounded perspective from his earlier career as a mariner,
                followed by his dedicated transition into psychology and mental health. This combination of vast global experience,
                cross-cultural awareness, and clinical depth informs his practical, empathetic, and human-centred approach to wellbeing.
              </p>
            </div>

            {/* Quote Block — Sage Green background replaces white */}
            <blockquote className="my-6 p-5 rounded-2xl bg-[#DEE7DB] border-l-4 border-[#9E783E] shadow-2xs">
              <p className="font-serif italic text-base sm:text-lg text-[#173D34] font-light leading-snug">
                &ldquo;At N.E.W., my focus is on helping people truly understand themselves, develop practical psychological skills, and build meaningful, sustainable changes that endure.&rdquo;
              </p>
              <cite className="block mt-2 text-xs font-sans not-italic text-[#7D6335] font-semibold tracking-wider uppercase">
                &mdash; Ajit Kumar Nair
              </cite>
            </blockquote>

            {/* Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#C8D6C6]">
              {credentials.map((cred, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#7D6335] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-semibold text-[#173D34]">{cred.label}</span>
                    <span className="block text-[11px] text-[#4F6457] font-light">{cred.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Modalities Chips — Sage Green chips replace white */}
            <div className="mt-6 pt-4 border-t border-[#C8D6C6]">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#173D34] block mb-2">
                Approaches &amp; Therapeutic Modalities:
              </span>
              <div className="flex flex-wrap gap-2">
                {modalities.map((mod, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-[#DEE7DB] text-[#1E3F35] text-xs border border-[#C5D4C2] font-medium shadow-2xs"
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-sm font-semibold tracking-wide shadow-sm transition-all cursor-pointer border border-[#1E3F35]"
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


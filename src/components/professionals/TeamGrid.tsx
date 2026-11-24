"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Sparkles, UserCheck } from "lucide-react";
import { Professional } from "@/data/professionalsData";

interface TeamGridProps {
  professionals: Professional[];
  onOpenBooking: (serviceOrName?: string) => void;
}

export default function TeamGrid({
  professionals,
  onOpenBooking,
}: TeamGridProps) {
  // Non-founder team members are rendered in full inline below the Founder section
  const teamMembers = professionals.filter((p) => !p.isFounder);

  return (
    <section
      id="team-grid"
      className="py-20 lg:py-28 bg-[#F7F5EF] text-[#24352D] relative overflow-hidden border-b border-[#B58B50]/20"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#DFBD83]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#173D34]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#B58B50]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              MEET THE TEAM
            </span>
            <span className="w-6 h-[1px] bg-[#B58B50]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#173D34] leading-[1.2] tracking-tight">
            Different Perspectives.{" "}
            <span className="italic text-[#B58B50] font-light">
              A Shared Commitment to Wellbeing.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base lg:text-lg text-[#59675F] leading-relaxed font-light">
            Our multidisciplinary team brings together deep clinical knowledge,
            specialized modalities, and compassionate care tailored to diverse
            life stages and relational needs.
          </p>
        </div>

        {/* Quick Navigation Pills for All Practitioners on This Page */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14 sm:mb-16">
          {professionals.map((person) => (
            <a
              key={person.id}
              href={`#${person.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#173D34] text-[#173D34] hover:text-[#DFBD83] text-xs font-semibold tracking-wide border border-[#B58B50]/35 shadow-2xs transition-colors"
            >
              <span className="w-5 h-5 rounded-full bg-[#E8EDE4] text-[#173D34] flex items-center justify-center font-serif text-[10px] font-bold">
                {person.initials}
              </span>
              <span>{person.name}</span>
            </a>
          ))}
        </div>

        {/* Full Inline Profile Sections for Every Team Practitioner */}
        <div className="space-y-12 lg:space-y-16">
          {teamMembers.map((member) => (
            <article
              key={member.id}
              id={member.id}
              className="scroll-mt-24 rounded-3xl bg-white border border-[#E8EDE4] hover:border-[#B58B50]/45 shadow-sm transition-all duration-300 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Left Column (4 cols): Portrait / Branded Monogram Frame */}
                <div className="lg:col-span-4 bg-gradient-to-b from-[#183E35] via-[#12332B] to-[#0D251F] text-[#F7F5EF] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                  {/* Subtle Geometric Watermark */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg
                      className="w-full h-full text-[#DFBD83]"
                      viewBox="0 0 100 100"
                      fill="currentColor"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="30"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        fill="none"
                      />
                      <path
                        d="M50 10 L50 90 M10 50 L90 50"
                        stroke="currentColor"
                        strokeWidth="0.5"
                      />
                    </svg>
                  </div>

                  {/* Top Badge */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    {member.badge && (
                      <span className="text-[10px] uppercase tracking-[0.18em] font-semibold px-3 py-1 rounded-full bg-[#102E27]/90 text-[#DFBD83] border border-[#B58B50]/40 backdrop-blur-md">
                        {member.badge}
                      </span>
                    )}
                  </div>

                  {/* Center Portrait or Branded Seal */}
                  <div className="relative z-10 my-8 flex flex-col items-center justify-center text-center">
                    {member.image ? (
                      <div className="relative w-48 h-56 sm:w-52 sm:h-64 rounded-t-[110px] rounded-b-2xl overflow-hidden border-2 border-[#DFBD83]/60 shadow-2xl bg-[#102E27]">
                        <Image
                          src={member.image}
                          alt={`${member.name} — ${member.designation}`}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 220px, 240px"
                          className="object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#102E27]/70 via-transparent to-transparent" />
                      </div>
                    ) : (
                      <>
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#102E27] to-[#1F4F44] border-2 border-[#DFBD83]/60 shadow-xl flex items-center justify-center mb-4">
                          <span className="font-serif text-4xl font-light text-[#DFBD83] tracking-wider">
                            {member.initials}
                          </span>
                          <div className="absolute -inset-2.5 rounded-full border border-[#DFBD83]/20 pointer-events-none" />
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#102E27]/80 text-[#DFBD83] text-[10px] tracking-widest uppercase font-semibold border border-[#B58B50]/30">
                          <UserCheck className="w-3 h-3 text-[#DFBD83]" />
                          <span>Clinical Practitioner</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Bottom Signature Card */}
                  <div className="relative z-10 bg-[#102E27]/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#B58B50]/35 text-left shadow-lg">
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-white leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#DFBD83] font-sans tracking-wide font-medium mt-1 leading-relaxed">
                      {member.designation}
                    </p>
                  </div>
                </div>

                {/* Right Column (8 cols): Complete Full Profile Inline */}
                <div className="lg:col-span-8 p-7 sm:p-10 flex flex-col justify-between text-left space-y-6">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-[#E8EDE4] pb-5">
                      <div className="inline-flex items-center gap-2.5 mb-2">
                        <span className="w-5 h-[1px] bg-[#B58B50]" />
                        <span className="text-[11px] font-semibold tracking-[0.22em] text-[#B58B50] uppercase font-sans">
                          {member.badge || "PRACTITIONER PROFILE"}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#173D34] leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-sans tracking-wide text-[#7D6335] font-semibold mt-1.5 leading-relaxed">
                        {member.designation}
                      </p>
                    </div>

                    {/* Complete Biography */}
                    <div className="space-y-3 font-sans text-sm sm:text-[15px] text-[#465A4F] leading-relaxed font-light">
                      {member.fullBio.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>

                    {/* Guiding Quote */}
                    {member.quote && (
                      <blockquote className="p-4 sm:p-5 rounded-2xl bg-[#E8EDE4]/60 border-l-4 border-[#B58B50] text-[#173D34]">
                        <p className="font-serif italic text-sm sm:text-base leading-snug">
                          &ldquo;{member.quote}&rdquo;
                        </p>
                      </blockquote>
                    )}

                    {/* Therapeutic Modalities */}
                    {member.modalities && member.modalities.length > 0 && (
                      <div className="pt-4 border-t border-[#E8EDE4]">
                        <span className="text-xs uppercase tracking-wider font-semibold text-[#173D34] block mb-2.5">
                          Therapeutic Approaches &amp; Modalities:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {member.modalities.map((mod, i) => (
                            <span
                              key={i}
                              className="px-3.5 py-1.5 rounded-full bg-[#F7F5EF] text-[#173D34] text-xs font-medium border border-[#B58B50]/30 shadow-2xs"
                            >
                              {mod}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Areas of Focus */}
                    <div className="pt-4 border-t border-[#E8EDE4]">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#173D34] block mb-2.5">
                        Areas of Work &amp; Clinical Focus:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((exp, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg bg-[#E8EDE4]/70 text-[#173D34] text-xs font-medium border border-[#173D34]/10"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Professional Approach */}
                    {member.approach && (
                      <div className="pt-4 border-t border-[#E8EDE4]">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#173D34] mb-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#B58B50]" />
                          <span>Therapeutic Philosophy &amp; Approach</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#59675F] leading-relaxed font-light">
                          {member.approach}
                        </p>
                      </div>
                    )}

                    {/* Qualifications */}
                    <div className="pt-4 border-t border-[#E8EDE4]">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#173D34] block mb-3">
                        Credentials &amp; Statutory Registration:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {member.qualifications.map((q, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 bg-[#F7F5EF]/70 p-2.5 rounded-xl border border-[#E8EDE4]"
                          >
                            <GraduationCap className="w-4 h-4 text-[#B58B50] shrink-0 mt-0.5" />
                            <span className="text-xs text-[#24352D] font-light leading-relaxed">
                              {q}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-5 border-t border-[#E8EDE4] flex flex-wrap items-center justify-between gap-3">
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

                    <button
                      type="button"
                      onClick={() => onOpenBooking(`Consultation — ${member.name}`)}
                      className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs sm:text-sm font-semibold tracking-wide border border-[#B58B50]/40 transition-all cursor-pointer shadow-sm"
                    >
                      <span>Enquire With {member.name.split(" ")[0]}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

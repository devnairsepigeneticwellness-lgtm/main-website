"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronRight, UserCheck } from "lucide-react";
import { Professional } from "@/data/professionalsData";

interface TeamGridProps {
  professionals: Professional[];
  onOpenProfile: (professional: Professional) => void;
  onOpenBooking: (serviceOrName?: string) => void;
}

export default function TeamGrid({
  professionals,
  onOpenProfile,
  onOpenBooking,
}: TeamGridProps) {
  // Only display team members other than the founder in this grid, as founder has Section 4
  const teamMembers = professionals.filter((p) => !p.isFounder);

  return (
    <section id="team-grid" className="py-20 lg:py-28 bg-[#F7F5EF] text-[#24352D] relative overflow-hidden border-b border-[#B58B50]/20">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#DFBD83]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#173D34]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#B58B50]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              MEET THE TEAM
            </span>
            <span className="w-6 h-[1px] bg-[#B58B50]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#173D34] leading-[1.2] tracking-tight">
            Different Perspectives.{" "}
            <span className="italic text-[#B58B50] font-light">A Shared Commitment to Wellbeing.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base lg:text-lg text-[#59675F] leading-relaxed font-light">
            Our multidisciplinary team brings together deep clinical knowledge, specialized modalities, and compassionate care tailored to diverse life stages and relational needs.
          </p>
        </div>

        {/* Three-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 items-stretch">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group rounded-3xl bg-white border border-[#E8EDE4] hover:border-[#B58B50]/50 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden text-left"
            >
              <div>
                {/* Portrait Header Frame */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gradient-to-b from-[#183E35] to-[#102E27] p-6 flex flex-col justify-between">
                  {/* Subtle Botanical / Geometric Watermark */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full text-[#DFBD83]" viewBox="0 0 100 100" fill="currentColor">
                      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
                      <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
                      <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                  </div>

                  {member.image ? (
                    <div className="absolute inset-0">
                      <Image
                        src={member.image}
                        alt={`${member.name} — ${member.designation}`}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#102E27] via-transparent to-transparent opacity-80" />
                    </div>
                  ) : (
                    /* Abstract Branded Botanical Portrait Card (Strictly adhering to no lookalike stock faces) */
                    <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                      {/* Monogram Seal */}
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#102E27] to-[#1F4F44] border-2 border-[#DFBD83]/60 shadow-xl flex items-center justify-center mb-3 group-hover:border-[#DFBD83] group-hover:scale-105 transition-all">
                        <span className="font-serif text-3xl font-light text-[#DFBD83] tracking-wider">
                          {member.initials}
                        </span>
                        <div className="absolute -inset-2 rounded-full border border-[#DFBD83]/20 pointer-events-none" />
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102E27]/80 text-[#DFBD83] text-[10px] tracking-widest uppercase font-semibold border border-[#B58B50]/30 backdrop-blur-xs">
                        <UserCheck className="w-3 h-3 text-[#DFBD83]" />
                        <span>Professional Practitioner</span>
                      </div>
                    </div>
                  )}

                  {/* Top Badge */}
                  {member.badge && (
                    <div className="relative z-10 flex justify-between items-center">
                      <span className="text-[10px] uppercase tracking-[0.18em] font-semibold px-3 py-1 rounded-full bg-[#102E27]/90 text-[#DFBD83] border border-[#B58B50]/40 backdrop-blur-md">
                        {member.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7 space-y-4">
                  {/* Name & Title */}
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-[#173D34] group-hover:text-[#B58B50] transition-colors leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs font-sans tracking-wide text-[#B58B50] font-medium mt-1 leading-snug line-clamp-2">
                      {member.designation}
                    </p>
                  </div>

                  {/* Gold accent line */}
                  <div className="w-12 h-[1px] bg-[#B58B50]/40" />

                  {/* Short Bio Summary */}
                  <p className="font-sans text-xs sm:text-sm text-[#59675F] font-light leading-relaxed line-clamp-3">
                    {member.shortBio}
                  </p>

                  {/* Areas of Focus Chips */}
                  <div className="pt-2">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#173D34] block mb-2">
                      Areas of Focus:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {member.expertise.slice(0, 4).map((exp, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-[#E8EDE4]/60 text-[#173D34] text-[11px] font-medium border border-[#173D34]/10"
                        >
                          {exp}
                        </span>
                      ))}
                      {member.expertise.length > 4 && (
                        <span className="px-2 py-1 rounded-lg bg-transparent text-[#B58B50] text-[11px] font-medium">
                          +{member.expertise.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 sm:p-7 pt-0 border-t border-[#E8EDE4] mt-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => onOpenProfile(member)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-full bg-[#E8EDE4]/60 hover:bg-[#E8EDE4] text-[#173D34] text-xs font-medium tracking-wide border border-[#173D34]/10 transition-colors cursor-pointer"
                >
                  <span>View Profile</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#B58B50]" />
                </button>

                <button
                  onClick={() => onOpenBooking(`Consultation — ${member.name}`)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide border border-[#B58B50]/40 transition-all cursor-pointer shadow-xs"
                >
                  <span>Enquire</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#DFBD83]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

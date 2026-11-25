"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Users,
  HeartHandshake,
  Award
} from "lucide-react";

interface ProfessionalsHeroProps {
  onExploreTeam: () => void;
  onOpenBooking: (serviceOrName?: string) => void;
}

export default function ProfessionalsHero({
  onExploreTeam,
  onOpenBooking,
}: ProfessionalsHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#173D34] via-[#102E27] to-[#0B221C] text-[#F7F5EF] pt-14 pb-18 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32 border-b border-[#B58B50]/20">
      {/* Decorative Radial Background */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full border border-[#DFBD83]/15 bg-radial from-[#DFBD83]/10 to-transparent blur-2xl pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#173D34]/40 blur-3xl pointer-events-none" />

      {/* Subtle Botanical SVG watermark */}
      <svg
        className="absolute top-1/4 right-5 w-96 h-96 opacity-5 pointer-events-none text-[#DFBD83]"
        viewBox="0 0 200 200"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M100 0 C120 40 160 80 200 100 C160 120 120 160 100 200 C80 160 40 120 0 100 C40 80 80 40 100 0 Z" />
      </svg>

      {/* Thin Gold Dividing Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B58B50]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (7 cols): Editorial Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-7 sm:space-y-8 text-left">
            {/* Top Meta: Breadcrumb & Eyebrow */}
            <div className="space-y-3.5">
              {/* Breadcrumb Navigation */}
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-xs font-sans tracking-wider uppercase text-[#DFBD83]/80"
              >
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#B58B50]" />
                <span className="text-[#F7F5EF] font-semibold">Our Professionals</span>
              </nav>

              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-3 pt-1">
                <span className="w-8 h-[1px] bg-[#DFBD83]" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#DFBD83] uppercase font-sans">
                  MEET OUR PROFESSIONALS
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] font-normal leading-[1.14] tracking-tight text-[#F7F5EF]">
              People Dedicated to{" "}
              <span className="block mt-2 sm:mt-3 italic font-serif text-[#DFBD83] font-light">
                Understanding and Wellbeing.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="font-sans text-base sm:text-lg lg:text-xl text-[#E8EDE4]/85 font-light leading-relaxed max-w-xl">
              Get to know the professionals associated with Nair&apos;s Epigenetic Wellness and explore their backgrounds, approaches and areas of professional focus.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 pt-2">
              <button
                onClick={onExploreTeam}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#B58B50] hover:bg-[#A37B42] text-white text-sm sm:text-base font-semibold tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] border border-[#DFBD83]/40 transition-all duration-200 cursor-pointer"
              >
                <span>Explore Our Team</span>
                <ArrowDown className="w-4 h-4 text-[#F7F5EF] group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onOpenBooking("Professional Team Enquiry")}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-transparent hover:bg-white/10 text-[#F7F5EF] text-sm sm:text-base font-medium tracking-wide border border-[#E8EDE4]/30 hover:border-[#DFBD83] transition-all duration-200 cursor-pointer"
              >
                <span>Contact N.E.W.</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFBD83] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Team Highlights Strip */}
            <div className="pt-8 border-t border-[#DFBD83]/15 flex flex-wrap items-center gap-5 sm:gap-7 text-xs sm:text-sm text-[#E8EDE4]/80 font-light">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#DFBD83]" />
                <span>RCI Registered</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-[#DFBD83]/40" />
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#DFBD83]" />
                <span>PhD &amp; ACT Certified</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-[#DFBD83]/40" />
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#DFBD83]" />
                <span>Couple &amp; Family Care</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-[#DFBD83]/40" />
              <span className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#DFBD83]" />
                <span>Child &amp; Adolescent</span>
              </span>
            </div>
          </div>

          {/* Right Column (5 cols): Elegant Composition with Approved Portrait & Sage Accents */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px]">
              
              {/* Outer Golden Accent Ring */}
              <div className="absolute -inset-4 rounded-[36px] border border-[#B58B50]/30 pointer-events-none" />
              <div className="absolute -inset-8 rounded-[44px] border border-[#B58B50]/15 pointer-events-none hidden sm:block" />

              {/* Main Luxury Composition Card */}
              <div className="relative rounded-[32px] bg-gradient-to-b from-[#163D34] via-[#102E27] to-[#0A221C] border-2 border-[#B58B50]/50 shadow-2xl p-6 sm:p-7 overflow-hidden flex flex-col justify-between">
                
                {/* Sage Organic Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#DFBD83]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#173D34]/50 rounded-full blur-2xl pointer-events-none" />

                {/* Top Header Card */}
                <div className="relative z-10 flex items-center justify-between pb-5 border-b border-[#B58B50]/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#DFBD83]/20 border border-[#DFBD83]/40 flex items-center justify-center text-[#DFBD83]">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#DFBD83] block">
                        Professional Collective
                      </span>
                      <span className="font-serif text-sm font-medium text-white">
                        4 Dedicated Practitioners
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#DFBD83]/15 text-[#DFBD83] text-[10px] tracking-wider uppercase font-semibold border border-[#DFBD83]/30">
                    N.E.W. Team
                  </span>
                </div>

                {/* Arched Portrait Frame Featuring Founder Ajit Kumar Nair */}
                <div className="relative z-10 my-6 flex justify-center">
                  <div className="relative w-44 h-52 sm:w-48 sm:h-56 rounded-t-[100px] rounded-b-2xl overflow-hidden border-2 border-[#DFBD83]/60 shadow-xl bg-[#102E27] group">
                    <Image
                      src="/founder.jpeg"
                      alt="Ajit Kumar Nair — Founder of Nair's Epigenetic Wellness"
                      fill
                      priority
                      unoptimized
                      sizes="200px"
                      className="object-cover object-top filter contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102E27] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-2.5 inset-x-2 text-center">
                      <span className="text-[11px] font-serif font-medium text-white block">
                        Ajit Kumar Nair
                      </span>
                      <span className="text-[9px] text-[#DFBD83] uppercase tracking-wider block">
                        Founder &amp; Psychologist
                      </span>
                    </div>
                  </div>
                </div>

                {/* Abstract Branded Team Crests Row (Honoring Team Members without Inventing Faces) */}
                <div className="relative z-10 bg-[#102E27]/90 backdrop-blur-md rounded-2xl p-4 border border-[#B58B50]/30 shadow-lg space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-[#DFBD83]">
                    <span className="uppercase tracking-[0.18em] font-semibold text-[10px]">
                      Multidisciplinary Care
                    </span>
                    <span className="font-serif italic text-white/90">Person-Centred</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {/* Dr. Deepa Jain */}
                    <a
                      href="#dr-deepa-jain"
                      className="p-2 rounded-xl bg-[#173D34]/80 hover:bg-[#1E4D42] border border-[#DFBD83]/20 hover:border-[#DFBD83]/50 text-center transition-colors"
                    >
                      <div className="relative w-8 h-8 mx-auto rounded-full overflow-hidden border border-[#DFBD83]/50 mb-1.5 bg-[#102E27]">
                        <Image
                          src="/drDeepaJain.jpeg"
                          alt="Dr. Deepa Jain"
                          fill
                          unoptimized
                          sizes="32px"
                          className="object-cover object-top"
                        />
                      </div>
                      <span className="text-[10px] text-white font-medium block truncate">
                        Dr. Deepa Jain
                      </span>
                      <span className="text-[8px] text-[#DFBD83]/80 uppercase tracking-tight block">
                        PhD &bull; Hypnotherapy
                      </span>
                    </a>

                    {/* Zainab Aarsiwala */}
                    <a
                      href="#zainab-aarsiwala"
                      className="p-2 rounded-xl bg-[#173D34]/80 hover:bg-[#1E4D42] border border-[#DFBD83]/20 hover:border-[#DFBD83]/50 text-center transition-colors"
                    >
                      <div className="relative w-8 h-8 mx-auto rounded-full overflow-hidden border border-[#DFBD83]/50 mb-1.5 bg-[#102E27]">
                        <Image
                          src="/zainabAarsiwala.jpeg"
                          alt="Zainab Aarsiwala"
                          fill
                          unoptimized
                          sizes="32px"
                          className="object-cover object-top"
                        />
                      </div>
                      <span className="text-[10px] text-white font-medium block truncate">
                        Zainab Aarsiwala
                      </span>
                      <span className="text-[8px] text-[#DFBD83]/80 uppercase tracking-tight block">
                        Couple &bull; Marriage
                      </span>
                    </a>

                    {/* Bhavya Singh */}
                    <a
                      href="#bhavya-singh"
                      className="p-2 rounded-xl bg-[#173D34]/80 hover:bg-[#1E4D42] border border-[#DFBD83]/20 hover:border-[#DFBD83]/50 text-center transition-colors"
                    >
                      <div className="relative w-8 h-8 mx-auto rounded-full overflow-hidden border border-[#DFBD83]/50 mb-1.5 bg-[#102E27]">
                        <Image
                          src="/bhavyaSingh.jpeg"
                          alt="Bhavya Singh"
                          fill
                          unoptimized
                          sizes="32px"
                          className="object-cover object-top"
                        />
                      </div>
                      <span className="text-[10px] text-white font-medium block truncate">
                        Bhavya Singh
                      </span>
                      <span className="text-[8px] text-[#DFBD83]/80 uppercase tracking-tight block">
                        Child &bull; Adolescent
                      </span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

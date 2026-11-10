"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown, ChevronRight, GraduationCap, Users, Briefcase, School, BookOpen, Compass } from "lucide-react";

interface ProgrammesHeroProps {
  onOpenBooking: (programme?: string) => void;
  onExploreProgrammes: () => void;
}

export default function ProgrammesHero({
  onOpenBooking,
  onExploreProgrammes,
}: ProgrammesHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#173D34] via-[#102E27] to-[#0E2721] text-[#F7F5EF] pt-14 pb-18 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32 border-b border-[#B58B50]/20">
      {/* Decorative Radial Background */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full border border-[#DFBD83]/15 bg-radial from-[#DFBD83]/10 to-transparent blur-2xl pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#173D34]/40 blur-3xl pointer-events-none" />

      {/* Thin Gold Dividing Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B58B50]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (7 cols): Editorial Typography & Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center space-y-7 sm:space-y-8"
          >
            
            {/* Top Meta: Breadcrumb & Eyebrow */}
            <div className="space-y-3.5">
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans tracking-wider uppercase text-[#DFBD83]/80">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#B58B50]" />
                <span className="text-[#F7F5EF] font-semibold">Programmes</span>
              </nav>

              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-3 pt-1">
                <span className="w-8 h-[1px] bg-[#DFBD83]" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#DFBD83] uppercase font-sans">
                  LEARNING &amp; PROFESSIONAL DEVELOPMENT
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[60px] font-normal leading-[1.14] tracking-tight text-[#F7F5EF]">
              Learn With Purpose.{" "}
              <span className="block mt-2 sm:mt-3 italic font-serif text-[#DFBD83] font-light">
                Grow With Understanding.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="font-sans text-base sm:text-lg lg:text-xl text-[#E8EDE4]/85 font-light leading-relaxed max-w-xl">
              Explore learning experiences designed to build psychological knowledge, practical skills, professional confidence and greater awareness of human wellbeing.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 pt-2">
              <button
                onClick={onExploreProgrammes}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#B58B50] hover:bg-[#A37B42] text-white text-sm sm:text-base font-semibold tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] border border-[#DFBD83]/40 transition-all duration-200"
              >
                <span>Explore Our Programmes</span>
                <ArrowDown className="w-4 h-4 text-[#F7F5EF] group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onOpenBooking("Programmes General Enquiry")}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-transparent hover:bg-white/10 text-[#F7F5EF] text-sm sm:text-base font-medium tracking-wide border border-[#E8EDE4]/30 hover:border-[#DFBD83] transition-all duration-200"
              >
                <span>Enquire About a Programme</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFBD83] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* 4 Pillars Mini-Pills with Refined Dot Separators */}
            <div className="pt-8 border-t border-[#DFBD83]/15 flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm text-[#E8EDE4]/80 font-light">
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#DFBD83]" />
                <span>Internships</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-[#DFBD83]/40" />
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#DFBD83]" />
                <span>Mentorship</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-[#DFBD83]/40" />
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#DFBD83]" />
                <span>Corporate</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-[#DFBD83]/40" />
              <span className="flex items-center gap-2">
                <School className="w-4 h-4 text-[#DFBD83]" />
                <span>Education</span>
              </span>
            </div>

          </motion.div>

          {/* Right Column (5 cols): Geometric & Editorial Artwork Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl bg-gradient-to-b from-[#1E4D42] via-[#153B32] to-[#0E2822] border-2 border-[#B58B50]/40 p-8 sm:p-10 shadow-2xl flex flex-col justify-between overflow-hidden">
              
              {/* Organic Radial Radiance */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-[#DFBD83]/15 blur-2xl pointer-events-none" />
              <div className="absolute -inset-4 rounded-3xl border border-[#B58B50]/20 pointer-events-none" />

              {/* Center Emblem */}
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center my-auto py-6">
                <div className="relative mb-7">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-[#DFBD83]/40 bg-[#173D34]/90 backdrop-blur-sm flex items-center justify-center shadow-inner">
                    <GraduationCap className="w-16 h-16 sm:w-18 sm:h-18 text-[#DFBD83]" strokeWidth={1.2} />
                  </div>
                </div>

                <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#DFBD83] font-semibold">
                  Applied Psychology
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mt-2">
                  Theory Meets Practice
                </h3>
                <p className="text-xs sm:text-sm text-[#E8EDE4]/75 mt-3 max-w-[260px] mx-auto font-light leading-relaxed">
                  Experiential clinical training, reflective supervision, and institutional wellbeing.
                </p>
              </div>

              {/* Bottom Cohort Badge */}
              <div className="relative z-10 bg-[#102E27]/90 backdrop-blur-md rounded-2xl py-3.5 px-5 border border-[#B58B50]/30 shadow-md flex items-center justify-between text-xs text-[#DFBD83]">
                <span>Cohort &amp; Institutional Batches</span>
                <span className="font-serif italic text-white">Indore &bull; Online</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

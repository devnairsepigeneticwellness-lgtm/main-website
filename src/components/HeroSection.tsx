"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, BookOpen, Users } from "lucide-react";

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export default function HeroSection({
  onOpenBooking,
  onExploreServices,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-center min-h-[calc(100dvh-76px)] sm:min-h-[calc(100dvh-80px)] overflow-x-hidden overflow-y-visible bg-gradient-to-br from-[#102E27] via-[#173D34] to-[#214B40] text-[#F7F5EF] py-8 sm:py-10 lg:py-8 xl:py-12"
    >
      {/* Background Lighting & Global Decorative Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Warm Radial Lighting behind Portrait area */}
        <div className="absolute top-[5%] right-[5%] w-[600px] h-[600px] lg:w-[780px] lg:h-[780px] rounded-full bg-[radial-gradient(circle,rgba(223,189,131,0.20)_0%,rgba(33,75,64,0.38)_45%,transparent_70%)] blur-2xl pointer-events-none" />
        
        {/* Deep ambient forest tone at bottom-left */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-[#102E27]/50 blur-3xl pointer-events-none" />

        {/* Global Sweeping Gold Arcs & Sparkles across the hero canvas */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block"
          viewBox="0 0 1440 810"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="globalGoldArc1" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#DFBD83" stopOpacity="0.75" />
              <stop offset="55%" stopColor="#DFBD83" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#DFBD83" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="globalGoldArc2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#DFBD83" stopOpacity="0.65" />
              <stop offset="65%" stopColor="#DFBD83" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#DFBD83" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Sweeping outer arc — tightened to stay within canvas */}
          <path
            d="M 790,255 C 800,138 900,92 1016,88 C 1130,84 1222,148 1285,255 C 1340,345 1385,415 1430,448"
            stroke="url(#globalGoldArc1)"
            strokeWidth="0.9"
          />

          {/* Concentric right arc — pulled in from edge */}
          <path
            d="M 1068,92 C 1198,114 1272,235 1276,382 C 1280,518 1234,630 1180,710"
            stroke="url(#globalGoldArc2)"
            strokeWidth="0.8"
          />

          {/* Sparkle node 1: upper left of arch */}
          <g transform="translate(848, 155)">
            <circle cx="0" cy="0" r="1.8" fill="#DFBD83" />
            <circle cx="0" cy="0" r="5.5" fill="#DFBD83" fillOpacity="0.28" />
            <path d="M-5,0 L5,0 M0,-5 L0,5" stroke="#DFBD83" strokeWidth="0.7" />
          </g>

          {/* Sparkle node 2: right arc mid-point */}
          <g transform="translate(1278, 378)">
            <circle cx="0" cy="0" r="1.8" fill="#DFBD83" />
            <circle cx="0" cy="0" r="5.5" fill="#DFBD83" fillOpacity="0.28" />
            <path d="M-5,0 L5,0 M0,-5 L0,5" stroke="#DFBD83" strokeWidth="0.7" />
          </g>
        </svg>

        {/* Flowing abstract ribbon shapes near bottom-left corner */}
        <svg
          className="absolute -bottom-6 -left-6 w-[420px] lg:w-[580px] h-[240px] text-[#DFBD83] opacity-25 pointer-events-none"
          viewBox="0 0 580 240"
          fill="none"
        >
          <path
            d="M -40,200 C 120,140 220,220 380,160 C 450,130 510,170 580,140"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M -40,230 C 100,170 250,240 400,190 C 480,160 540,210 610,170"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />
        </svg>

        {/* Flowing abstract ribbon shapes near bottom-right corner */}
        <svg
          className="absolute -bottom-8 -right-6 w-[480px] lg:w-[640px] h-[260px] text-[#DFBD83] opacity-25 pointer-events-none"
          viewBox="0 0 640 260"
          fill="none"
        >
          <path
            d="M 40,240 C 180,180 320,250 450,170 C 540,110 590,150 680,100"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M 10,260 C 150,210 290,270 420,210 C 530,150 570,190 660,140"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />
        </svg>

        {/* Fine gold horizontal accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#DFBD83]/30 to-transparent" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
          
          {/* Left Column (approximately 52% on desktop = 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-5 sm:space-y-6 xl:space-y-7">
            
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#DFBD83]" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#DFBD83] uppercase font-sans">
                Nair&apos;s Epigenetic Wellness
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-[30px] xs:text-[32px] sm:text-5xl md:text-6xl lg:text-[52px] xl:text-[60px] 2xl:text-[66px] font-normal leading-[1.08] tracking-tight text-[#F7F5EF]">
              <span>Understand Yourself.</span>
              <span className="block mt-1 sm:mt-2 italic font-serif text-[#DFBD83] font-light xl:whitespace-nowrap">
                Transform Your Wellbeing.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="font-sans text-base sm:text-lg lg:text-[16.5px] xl:text-[17.5px] text-[#E8EDE4]/90 font-light leading-relaxed max-w-xl lg:max-w-2xl">
              Discover a thoughtful approach to emotional wellbeing, self-awareness and personal growth.
              We bring together psychological knowledge, therapeutic practices and practical guidance to support meaningful change.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1 sm:pt-2">
              <button
                onClick={onOpenBooking}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-[#DFBD83] hover:bg-[#E5B86F] text-[#102E27] text-base font-semibold tracking-wide shadow-lg shadow-black/30 hover:shadow-xl hover:scale-[1.02] border border-[#DFBD83] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBD83]"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-[#102E27] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <Link
                href="/services"
                onClick={onExploreServices}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-full bg-[#102E27]/40 hover:bg-[#DFBD83]/10 text-[#F7F5EF] text-base font-medium tracking-wide border border-[#DFBD83]/70 hover:border-[#DFBD83] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBD83]"
              >
                <span>Explore Our Services</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFBD83] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Services Statement below CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#E8EDE4]/85 font-sans tracking-wide">
              <span>Counselling</span>
              <span className="text-[#DFBD83]">•</span>
              <span>Psychotherapy</span>
              <span className="text-[#DFBD83]">•</span>
              <span>Mindfulness</span>
              <span className="text-[#DFBD83]">•</span>
              <span>Professional Training</span>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-4 border-t border-[#DFBD83]/15 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#E8EDE4]/75">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#DFBD83] shrink-0" />
                <span>RCI Registered Practice</span>
              </div>
              <span className="text-[#DFBD83]/30 hidden sm:inline">|</span>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#DFBD83] shrink-0" />
                <span>Evidence-Informed Modalities</span>
              </div>
              <span className="text-[#DFBD83]/30 hidden sm:inline">|</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#DFBD83] shrink-0" />
                <span>Confidential &amp; Person-Centred</span>
              </div>
            </div>

          </div>

          {/* Right Column (approximately 47% on desktop = 5 cols) - Portrait Holder */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-6 lg:mt-0 pb-8 lg:pb-0 lg:pr-2 xl:pr-4">
            <div className="relative w-full max-w-[320px] sm:max-w-[345px] lg:max-w-[358px] xl:max-w-[375px]">
              
              {/* Arch Container */}
              <div className="relative z-10">
                
                {/* Outer delicate gold contour outline — tighter, more compact */}
                <div className="absolute -inset-[8px] rounded-t-[210px] lg:rounded-t-[220px] xl:rounded-t-[230px] rounded-b-[42px] border border-[#DFBD83]/20 pointer-events-none" />
                {/* Second outer ring at distance */}
                <div className="absolute -inset-[16px] rounded-t-[218px] lg:rounded-t-[228px] xl:rounded-t-[238px] rounded-b-[46px] border border-[#DFBD83]/10 pointer-events-none hidden sm:block" />

                {/* Main Arch Frame */}
                <div className="relative h-[510px] sm:h-[555px] lg:h-[580px] xl:h-[600px] w-full rounded-t-[196px] lg:rounded-t-[206px] xl:rounded-t-[216px] rounded-b-[34px] overflow-hidden border-2 border-[#DFBD83]/75 shadow-2xl"
                  style={{ background: 'radial-gradient(ellipse 85% 70% at 50% 38%, #2A5A48 0%, #183F36 35%, #12332B 65%, #0A1F1A 100%)' }}>
                  
                  {/* Warm Radial Glow behind subject — enhanced for blazer separation */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-80 sm:h-80 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(223,189,131,0.42) 0%, rgba(180,140,80,0.18) 35%, rgba(23,61,52,0.08) 65%, transparent 100%)', filter: 'blur(28px)' }} />

                  {/* Secondary amber warmth mid-height for blazer edge separation */}
                  <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-56 h-56 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(180,130,60,0.22) 0%, rgba(140,100,40,0.10) 50%, transparent 100%)', filter: 'blur(22px)' }} />

                  {/* Soft bottom vignette to anchor the figure */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
                    style={{ background: 'linear-gradient(to top, rgba(10,31,26,0.55) 0%, rgba(10,31,26,0.20) 50%, transparent 100%)' }} />

                  {/* Soft edge vignette */}
                  <div className="absolute inset-0 pointer-events-none z-10"
                    style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(10,31,26,0.55) 100%)' }} />

                  {/* Authentic Photograph — scaled up ~18% to enlarge face/shoulders.
                      Wrapper has pt so the arch's rounded top doesn't clip the head.
                      The image is offset down via top padding in the wrapper. */}
                  <div className="relative w-full h-full overflow-hidden">
                    <div className="absolute inset-0" style={{ top: '32px' }}>
                      <Image
                        src="/founder_hero_arch.png"
                        alt="Ajit Kumar Nair - Founder & Clinical Lead, Nair's Epigenetic Wellness"
                        fill
                        priority
                        sizes="(max-width: 640px) 340px, (max-width: 1024px) 380px, 410px"
                        className="object-contain object-top select-none pointer-events-none drop-shadow-[0_8px_30px_rgba(0,0,0,0.70)]"
                        style={{ transform: 'scale(1.18)', transformOrigin: 'center 22%' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Elegant Overlapping Nameplate Plaque — wider, overlapping arch bottom */}
                <div className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 w-[96%] max-w-[380px] z-30 backdrop-blur-md border border-[#DFBD83]/65 rounded-[20px] py-3 px-5 sm:py-3.5 sm:px-6 text-center"
                  style={{ background: 'rgba(13,38,32,0.97)', boxShadow: '0 12px 40px rgba(0,0,0,0.65), 0 0 0 1px rgba(223,189,131,0.12)' }}>
                  <h3 className="font-serif text-[19px] sm:text-[21px] lg:text-[22px] font-semibold text-[#F7F5EF] tracking-tight leading-snug">
                    Ajit Kumar Nair
                  </h3>
                  <p className="font-sans text-[11px] sm:text-[12px] text-[#E8EDE4]/88 mt-1 leading-snug tracking-wide">
                    Counselling Psychologist · Rehabilitation Counselor
                  </p>
                  <p className="font-sans text-[10.5px] sm:text-[11.5px] text-[#DFBD83]/90 mt-0.5 leading-snug tracking-wide">
                    (RCI Registered) · Clinical Hypnotherapist
                  </p>
                  {/* Decorative gold diamond */}
                  <div className="mt-2 flex justify-center">
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                      <path d="M7 1 L13 4 L7 7 L1 4 Z" fill="#DFBD83" fillOpacity="0.7" />
                    </svg>
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

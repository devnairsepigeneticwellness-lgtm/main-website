"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowUpRight, ShieldCheck, HeartHandshake } from "lucide-react";
import { aboutCopy } from "@/data/aboutData";

interface AboutHeroProps {
  onOpenBooking: () => void;
}

export default function AboutHero({ onOpenBooking }: AboutHeroProps) {
  const { hero } = aboutCopy;

  return (
    <section className="relative overflow-hidden bg-[#F7F5EF] text-[#24352D] pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#B58B50]/20">
      {/* Background Soft Organic Textures */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full bg-[#E8EDE4]/80 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[450px] h-[450px] rounded-full bg-[#B58B50]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (7 cols): Editorial Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans tracking-wider uppercase text-[#59675F]">
              <Link href="/" className="hover:text-[#B58B50] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#B58B50]" />
              <span className="text-[#173D34] font-semibold">About Us</span>
            </nav>

            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#B58B50]" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#9E783E] uppercase font-sans">
                {hero.eyebrow}
              </span>
            </div>

            {/* Editorial Main Heading (Exact PDF Copy) */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[52px] font-normal leading-[1.15] tracking-tight text-[#173D34]">
              Understanding You. <br className="hidden sm:inline" />
              Supporting Change.{" "}
              <span className="block mt-1 sm:mt-2 italic font-serif text-[#9E783E] font-light">
                Enabling Wellbeing.
              </span>
            </h1>

            {/* Decorative Gold Accent Line */}
            <div className="w-24 h-[2px] bg-gradient-to-r from-[#B58B50] via-[#DFBD83] to-transparent my-1" />

            {/* Supporting Copy (Exact PDF Paragraphs 1 & 2) */}
            <div className="space-y-4 font-sans text-base sm:text-lg text-[#465A4F] font-light leading-relaxed max-w-2xl">
              <p>{hero.introP1}</p>
              <p className="text-sm sm:text-base text-[#24352D] font-normal bg-[#EBF2E8] p-4 rounded-2xl border border-[#C8D6C6]">
                {hero.introP2}
              </p>
            </div>

            {/* Quick Section Anchor Pills */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <a
                href="#our-approach"
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#E8EDE4] text-[#173D34] border border-[#C8D6C6] transition-colors shadow-2xs font-medium"
              >
                Our Approach
              </a>
              <a
                href="#founder-about"
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#E8EDE4] text-[#173D34] border border-[#C8D6C6] transition-colors shadow-2xs font-medium"
              >
                Meet Ajit Kumar Nair
              </a>
              <a
                href="#epigenetics-section"
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#E8EDE4] text-[#173D34] border border-[#C8D6C6] transition-colors shadow-2xs font-medium"
              >
                What Is Epigenetics?
              </a>
              <a
                href="#philosophy-section"
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#E8EDE4] text-[#173D34] border border-[#C8D6C6] transition-colors shadow-2xs font-medium"
              >
                Our Philosophy
              </a>
              <a
                href="#why-choose-new"
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#E8EDE4] text-[#173D34] border border-[#C8D6C6] transition-colors shadow-2xs font-medium"
              >
                Why Choose N.E.W.?
              </a>
              <a
                href="#workshops-section"
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#E8EDE4] text-[#173D34] border border-[#C8D6C6] transition-colors shadow-2xs font-medium"
              >
                Workshops &amp; Events
              </a>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#F7F5EF] text-sm font-semibold tracking-wide shadow-md transition-all self-start cursor-pointer group"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFBD83] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              
              <div className="flex items-center gap-3 text-xs text-[#59675F] font-light">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#9E783E]" />
                  <span>RCI Registered Ethics</span>
                </div>
                <span>&bull;</span>
                <div className="flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-[#9E783E]" />
                  <span>Person-Centred Whole Care</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Botanical & Organic Wellness Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl bg-gradient-to-br from-[#E8EDE4] via-[#F7F5EF] to-[#E2EADF] p-8 border border-[#B58B50]/30 shadow-lg flex items-center justify-center overflow-hidden">
              
              {/* Concentric Organic Aura Rings */}
              <div className="absolute w-[360px] h-[360px] rounded-full border border-[#B58B50]/20 pointer-events-none" />
              <div className="absolute w-[280px] h-[280px] rounded-full border border-[#B58B50]/25 pointer-events-none" />
              <div className="absolute w-[200px] h-[200px] rounded-full border border-[#B58B50]/30 pointer-events-none" />

              {/* Botanical Leaf & Geometric Flow Illustration */}
              <svg
                viewBox="0 0 240 240"
                className="w-full h-full text-[#173D34] relative z-10"
                fill="none"
              >
                <circle cx="120" cy="120" r="85" stroke="#DFBD83" strokeWidth="1" strokeDasharray="3 3" />
                <path
                  d="M120 40 C145 75 165 110 165 145 C165 175 145 195 120 195 C95 195 75 175 75 145 C75 110 95 75 120 40 Z"
                  fill="#173D34"
                  fillOpacity="0.08"
                  stroke="#173D34"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                
                <path
                  d="M120 145 C80 130 55 105 55 75 C85 75 110 100 120 145 Z"
                  fill="#B58B50"
                  fillOpacity="0.12"
                  stroke="#B58B50"
                  strokeWidth="1.2"
                />
                <path
                  d="M120 145 C160 130 185 105 185 75 C155 75 130 100 120 145 Z"
                  fill="#B58B50"
                  fillOpacity="0.12"
                  stroke="#B58B50"
                  strokeWidth="1.2"
                />

                <circle cx="120" cy="145" r="4" fill="#173D34" />
                <circle cx="120" cy="40" r="3" fill="#DFBD83" />
              </svg>

              {/* Floating Philosophy Tag */}
              <div className="absolute bottom-6 inset-x-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-[#B58B50]/30 shadow-md text-center">
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#9E783E] font-semibold block mb-0.5">
                  Holistic Philosophy
                </span>
                <span className="font-serif italic text-sm text-[#173D34]">
                  &ldquo;Understand the whole person rather than focus only on a single concern.&rdquo;
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

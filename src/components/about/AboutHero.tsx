"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ChevronRight, Leaf } from "lucide-react";

export default function AboutHero({ onOpenBooking }: { onOpenBooking: () => void }) {
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
              <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
                GET TO KNOW N.E.W.
              </span>
            </div>

            {/* Editorial Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-normal leading-[1.12] tracking-tight text-[#173D34]">
              Wellbeing Begins With{" "}
              <span className="block mt-1 sm:mt-2 italic font-serif text-[#B58B50] font-light">
                Understanding.
              </span>
            </h1>

            {/* Decorative Gold Accent Line */}
            <div className="w-24 h-[2px] bg-gradient-to-r from-[#B58B50] via-[#DFBD83] to-transparent my-1" />

            {/* Supporting Copy */}
            <p className="font-sans text-base sm:text-lg lg:text-xl text-[#59675F] font-light leading-relaxed max-w-2xl">
              At Nair&apos;s Epigenetic Wellness, we believe meaningful change begins with understanding the whole person &mdash; their experiences, emotions, relationships and the circumstances that shape everyday life.
            </p>

            {/* Callout / Sub-CTA */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#F7F5EF] text-sm font-medium tracking-wide shadow-md transition-all self-start"
              >
                <span>Connect With Our Team</span>
                <span className="text-[#DFBD83]">&rarr;</span>
              </button>
              
              <div className="flex items-center gap-2 text-xs text-[#59675F] font-light">
                <Leaf className="w-4 h-4 text-[#B58B50]" />
                <span>Integrative &bull; Person-Centred &bull; Grounded in Clinical Science</span>
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
                {/* Central Meditative Lotus / Seed Shape */}
                <path
                  d="M120 40 C145 75 165 110 165 145 C165 175 145 195 120 195 C95 195 75 175 75 145 C75 110 95 75 120 40 Z"
                  fill="#173D34"
                  fillOpacity="0.08"
                  stroke="#173D34"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                
                {/* Lateral Petal Left */}
                <path
                  d="M120 145 C80 130 55 105 55 75 C85 75 110 100 120 145 Z"
                  fill="#B58B50"
                  fillOpacity="0.12"
                  stroke="#B58B50"
                  strokeWidth="1.2"
                />

                {/* Lateral Petal Right */}
                <path
                  d="M120 145 C160 130 185 105 185 75 C155 75 130 100 120 145 Z"
                  fill="#B58B50"
                  fillOpacity="0.12"
                  stroke="#B58B50"
                  strokeWidth="1.2"
                />

                {/* Vertical Equilibrium Spine */}
                <line
                  x1="120"
                  y1="30"
                  x2="120"
                  y2="210"
                  stroke="#B58B50"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                {/* Radiant Core Node */}
                <circle cx="120" cy="145" r="10" fill="#173D34" />
                <circle cx="120" cy="145" r="5" fill="#DFBD83" />
                <circle cx="120" cy="80" r="3" fill="#B58B50" />
                <circle cx="120" cy="180" r="3" fill="#B58B50" />
              </svg>

              {/* Bottom Subtle Badge */}
              <div className="absolute bottom-5 inset-x-6 z-20 bg-white/90 backdrop-blur-md rounded-2xl py-2.5 px-4 border border-[#B58B50]/30 shadow-sm flex items-center justify-between text-xs text-[#173D34]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#B58B50]" />
                  <span className="font-serif italic">Holistic Harmony</span>
                </div>
                <span className="text-[10px] tracking-wider uppercase text-[#B58B50] font-semibold">
                  N.E.W. Philosophy
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


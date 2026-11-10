"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ArrowDown, MessageCircle, Phone, Sparkles, Shield, HeartHandshake } from "lucide-react";

interface ContactHeroProps {
  onScrollToForm: () => void;
}

export default function ContactHero({ onScrollToForm }: ContactHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#173D34] via-[#102E27] to-[#0E2721] text-[#F7F5EF] pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-28 border-b border-[#B58B50]/20">
      {/* Background Soft Gold Radial Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[550px] h-[550px] rounded-full border border-[#DFBD83]/15 bg-radial from-[#DFBD83]/10 to-transparent blur-2xl pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[450px] h-[450px] rounded-full bg-[#173D34]/50 blur-3xl pointer-events-none" />

      {/* Decorative Gold Dividing Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B58B50]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (7 cols): Editorial Content */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8"
          >
            {/* Breadcrumb & Eyebrow */}
            <div className="space-y-3.5">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans tracking-wider uppercase text-[#DFBD83]/80">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#B58B50]" />
                <span className="text-[#F7F5EF] font-semibold">Contact Us</span>
              </nav>

              <div className="inline-flex items-center gap-3 pt-1">
                <span className="w-8 h-[1px] bg-[#DFBD83]" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#DFBD83] uppercase font-sans">
                  WE&apos;D LOVE TO HEAR FROM YOU
                </span>
              </div>
            </div>

            {/* Main Editorial Heading */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[56px] font-normal leading-[1.14] tracking-tight text-[#F7F5EF]">
              Every Meaningful Journey{" "}
              <span className="block mt-2 sm:mt-3 italic font-serif text-[#DFBD83] font-light">
                Begins With a Conversation.
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="font-sans text-base sm:text-lg lg:text-xl text-[#E8EDE4]/85 font-light leading-relaxed max-w-xl">
              Whether you&apos;re looking for psychological support, professional guidance, a learning programme or an upcoming workshop, we&apos;re here to help you explore the next step.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 pt-2">
              <button
                onClick={onScrollToForm}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#B58B50] hover:bg-[#A37B42] text-white text-sm sm:text-base font-semibold tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] border border-[#DFBD83]/40 transition-all duration-200"
              >
                <span>Send an Enquiry</span>
                <ArrowDown className="w-4 h-4 text-[#F7F5EF] group-hover:translate-y-0.5 transition-transform" />
              </button>

              <a
                href="https://wa.me/919446477779?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Nair%27s%20Epigenetic%20Wellness."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-transparent hover:bg-white/10 text-[#F7F5EF] text-sm sm:text-base font-medium tracking-wide border border-[#E8EDE4]/30 hover:border-[#DFBD83] transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 text-[#DFBD83]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Subtle Reassurance Badges */}
            <div className="pt-6 border-t border-[#DFBD83]/15 flex flex-wrap items-center gap-5 sm:gap-7 text-xs sm:text-sm text-[#E8EDE4]/80 font-light">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#DFBD83]" />
                <span>Strict Confidentiality</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-[#DFBD83]/40" />
              <span className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#DFBD83]" />
                <span>Person-Centred Care</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-[#DFBD83]/40" />
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#DFBD83]" />
                <span>Indore &bull; Online Global</span>
              </span>
            </div>
          </motion.div>

          {/* Right Column (5 cols): Botanical & Abstract Wellness Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl bg-gradient-to-b from-[#1F4E43] via-[#163D34] to-[#0E2822] border-2 border-[#B58B50]/40 p-7 sm:p-9 shadow-2xl flex flex-col justify-between overflow-hidden">
              
              {/* Soft Gold Circular Ornaments */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full border border-[#DFBD83]/20 bg-radial from-[#DFBD83]/15 to-transparent blur-xl pointer-events-none" />
              <div className="absolute -inset-4 rounded-3xl border border-[#B58B50]/20 pointer-events-none" />

              {/* Decorative Geometric Botanical SVG Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-[#DFBD83]/15 pointer-events-none animate-subtle-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-dashed border-[#DFBD83]/20 pointer-events-none" />

              {/* Top Tag */}
              <div className="relative z-10 flex items-center justify-between text-xs text-[#DFBD83]">
                <span className="uppercase tracking-[0.2em] font-semibold text-[10px]">
                  N.E.W. Direct Connect
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#102E27]/80 border border-[#B58B50]/30 text-[11px] text-[#E8EDE4]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DFBD83] animate-pulse" />
                  <span>Enquiries Open</span>
                </span>
              </div>

              {/* Center Botanical Artwork Motif */}
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center my-auto py-4">
                <div className="relative mb-5">
                  {/* Concentric Golden Ornaments */}
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-[#DFBD83]/40 bg-[#173D34]/90 backdrop-blur-md flex items-center justify-center shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-2 rounded-full border border-[#DFBD83]/25" />
                    {/* Stylized Botanical Leaf / Spiral Life Motif */}
                    <svg
                      viewBox="0 0 100 100"
                      className="w-18 h-18 sm:w-20 sm:h-20 text-[#DFBD83] fill-none stroke-current"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M50 85 C50 65, 30 55, 30 35 C30 20, 42 12, 50 12 C58 12, 70 20, 70 35 C70 55, 50 65, 50 85 Z" opacity="0.3" fill="currentColor" />
                      <path d="M50 85 L50 20" stroke="#F7F5EF" strokeWidth="1.8" />
                      <path d="M50 35 Q38 32, 34 26" />
                      <path d="M50 45 Q62 42, 66 36" />
                      <path d="M50 55 Q36 53, 32 46" />
                      <path d="M50 65 Q64 63, 68 56" />
                      <circle cx="50" cy="16" r="3" fill="#DFBD83" />
                      <circle cx="34" cy="26" r="2" fill="#DFBD83" />
                      <circle cx="66" cy="36" r="2" fill="#DFBD83" />
                    </svg>
                  </div>
                </div>

                <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#DFBD83] font-semibold">
                  Personal &bull; Professional &bull; Organisational
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mt-1.5">
                  Responsive &amp; Discreet
                </h3>
                <p className="text-xs sm:text-sm text-[#E8EDE4]/80 mt-2.5 max-w-[270px] mx-auto font-light leading-relaxed">
                  Direct inquiries for psychotherapy, clinical supervision, cohort internships, and corporate workshops.
                </p>
              </div>

              {/* Bottom Information Card */}
              <div className="relative z-10 bg-[#102E27]/90 backdrop-blur-md rounded-2xl py-3 px-4 border border-[#B58B50]/30 shadow-md flex items-center justify-between text-xs">
                <span className="text-[#DFBD83] font-medium flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Direct Desk</span>
                </span>
                <span className="font-serif text-white tracking-wide">
                  +91 94464 77779
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


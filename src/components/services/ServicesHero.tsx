"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, ChevronRight, Sparkles, HeartHandshake, ShieldCheck } from "lucide-react";

interface ServicesHeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export default function ServicesHero({
  onOpenBooking,
  onExploreServices,
}: ServicesHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#173D34] via-[#102E27] to-[#0E2721] text-[#F7F5EF] pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#B58B50]/20">
      {/* Decorative Background Rings & Textures */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full border border-[#DFBD83]/15 bg-radial from-[#DFBD83]/10 to-transparent blur-2xl pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#173D34]/40 blur-3xl pointer-events-none" />

      {/* Thin Gold Dividing Lines */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B58B50]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (7 cols): Editorial Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans tracking-wider uppercase text-[#DFBD83]/80">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#B58B50]" />
              <span className="text-[#F7F5EF] font-semibold">Services</span>
            </nav>

            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#DFBD83]" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#DFBD83] uppercase font-sans">
                SERVICES WE OFFER
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-normal leading-[1.12] tracking-tight text-[#F7F5EF]">
              Support that meets you{" "}
              <span className="block mt-1 sm:mt-2 italic font-serif text-[#DFBD83] font-light">
                where you are.
              </span>
            </h1>

            {/* Supporting Description as given by user */}
            <div className="space-y-3 font-sans text-base sm:text-lg text-[#E8EDE4]/90 font-light leading-relaxed max-w-2xl">
              <p>
                Every person comes with a different experience, different challenges, and different needs. At Nair’s Epigenetic Wellness, we offer a range of psychological, emotional, behavioural, and wellbeing services so that support can be tailored to the individual.
              </p>
              <p className="text-sm sm:text-base text-[#DFBD83]/90 font-normal">
                Our aim is not simply to help you manage a problem for the moment. We work towards helping you understand yourself, develop useful skills, strengthen your emotional wellbeing, and create healthier ways of responding to life.
              </p>
            </div>

            {/* Section Jump Links */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <a href="#counselling" className="px-3.5 py-1.5 rounded-full bg-[#173D34] hover:bg-[#204E42] text-[#DFBD83] border border-[#B58B50]/30 transition-colors">
                Counselling
              </a>
              <a href="#psychotherapies" className="px-3.5 py-1.5 rounded-full bg-[#173D34] hover:bg-[#204E42] text-[#DFBD83] border border-[#B58B50]/30 transition-colors">
                Psychotherapies (10 Modalities)
              </a>
              <a href="#hypnotherapy" className="px-3.5 py-1.5 rounded-full bg-[#173D34] hover:bg-[#204E42] text-[#DFBD83] border border-[#B58B50]/30 transition-colors">
                Hypnotherapy
              </a>
              <a href="#rehabilitation" className="px-3.5 py-1.5 rounded-full bg-[#173D34] hover:bg-[#204E42] text-[#DFBD83] border border-[#B58B50]/30 transition-colors">
                Online Rehabilitation
              </a>
              <a href="#renewal" className="px-3.5 py-1.5 rounded-full bg-[#173D34] hover:bg-[#204E42] text-[#DFBD83] border border-[#B58B50]/30 transition-colors">
                Renewal
              </a>
              <a href="#spiritual-practices" className="px-3.5 py-1.5 rounded-full bg-[#173D34] hover:bg-[#204E42] text-[#DFBD83] border border-[#B58B50]/30 transition-colors">
                Spiritual Practices
              </a>
              <a href="#support-plans" className="px-3.5 py-1.5 rounded-full bg-[#173D34] hover:bg-[#204E42] text-[#DFBD83] border border-[#B58B50]/30 transition-colors">
                Treatment &amp; Support Plans
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#B58B50] hover:bg-[#A37B42] text-white text-sm sm:text-base font-semibold tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] border border-[#DFBD83]/40 transition-all"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-[#F7F5EF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onExploreServices}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-transparent hover:bg-white/10 text-[#F7F5EF] text-sm sm:text-base font-medium tracking-wide border border-[#E8EDE4]/30 hover:border-[#DFBD83] transition-all"
              >
                <span>Explore Our Services</span>
                <ArrowDown className="w-4 h-4 text-[#DFBD83] group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Supporting Clinical Reassurance */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#E8EDE4]/70 font-light">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#DFBD83]" />
                <span>RCI Registered Clinical Ethics</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#DFBD83]" />
                <span>Person-Centered &amp; Confidential</span>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Calming Abstract Wellness & Botanical Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl bg-gradient-to-b from-[#1E4D42] via-[#153B32] to-[#0E2822] border-2 border-[#B58B50]/40 p-8 shadow-2xl flex flex-col justify-between overflow-hidden">
              
              {/* Organic Radial Radiance */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-[#DFBD83]/15 blur-2xl pointer-events-none" />
              <div className="absolute -inset-4 rounded-3xl border border-[#B58B50]/20 pointer-events-none" />

              {/* Decorative Geometric Botanical Artwork */}
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center my-auto">
                <div className="relative mb-6">
                  <div className="w-36 h-36 rounded-full border border-[#DFBD83]/40 bg-[#173D34]/80 backdrop-blur-sm flex items-center justify-center shadow-inner">
                    <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#DFBD83]" fill="none">
                      {/* Concentric Petals */}
                      <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M50 18 C55 32 68 45 82 50 C68 55 55 68 50 82 C45 68 32 55 18 50 C32 45 45 32 50 18 Z" fill="#DFBD83" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="50" cy="50" r="5" fill="#DFBD83" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#B58B50] text-[#102E27] p-2 rounded-full shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#DFBD83] font-semibold">
                  Holistic Spectrum
                </span>
                <h3 className="font-serif text-2xl font-light text-white mt-1">
                  Integrative Care
                </h3>
                <p className="text-xs text-[#E8EDE4]/75 mt-2 max-w-[240px] mx-auto font-light leading-relaxed">
                  Counselling, psychotherapy, clinical hypnotherapy, rehabilitation and mindfulness tailored to your unique journey.
                </p>
              </div>

              {/* Bottom Badge */}
              <div className="relative z-10 bg-[#102E27]/90 backdrop-blur-md rounded-2xl py-3 px-4 border border-[#B58B50]/30 shadow-md flex items-center justify-between text-xs text-[#DFBD83]">
                <span>Support Tailored To You</span>
                <span className="font-serif italic text-white">Online &bull; In-Person</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


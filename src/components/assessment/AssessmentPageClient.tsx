"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  LayoutGrid,
  Leaf,
  AlertTriangle,
  Info,
  ArrowRight,
  Check,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import ProfessionalProfileModal from "@/components/professionals/ProfessionalProfileModal";
import { PROFESSIONALS, Professional } from "@/data/professionalsData";

const CHECKLIST_ITEMS = [
  "Persistent fatigue or mental exhaustion that does not go away even after resting or finishing the day's work.",
  "Racing thoughts before falling asleep or experiencing disturbed sleep due to excessive worry.",
  "Feeling stuck in repetitive habits, overthinking, or unhelpful behavioural patterns despite logically knowing what is right.",
  "Frequent irritability, mood swings, or feeling emotionally overwhelmed without any major triggers.",
  "Low motivation to start any task or persistently low energy levels throughout the day.",
  "A persistent inner critic or self-doubt, or carrying the fear that others might view you as an \"imposter\".",
  "Difficulty concentrating or maintaining focus on studies, office work, or daily responsibilities.",
  "Physical tension, tension headaches, or unexplained bodily discomfort caused by stress.",
  "Strained relationships, frequent friction, or a growing communication gap with close ones, partners, or family.",
  "Feeling deeply disconnected from your goals, your hobbies, or your authentic self.",
  "Sudden, intense anxiety or panic responses triggered by minor everyday stressors.",
  "A prolonged low mood or lingering sadness resulting from past or recent loss and grief.",
  "Struggling to cope with major life transitions, career shifts, or academic pressures.",
  "A tendency to avoid or escape problems rather than facing them.",
  "Ordinary daily responsibilities feeling overwhelming, as if you are carrying an enormous mountain.",
  "A deep sense of internal emptiness or loneliness despite everything seemingly being fine on the outside.",
  "Inability to express your emotions freely, keeping them bottled up inside.",
  "Excessive fear, worry, or uncertainty about what the future holds.",
  "Finding it impossible to carve out time for self-care while constantly living under external pressure.",
  "Trying endlessly to solve your problems on your own until reaching a point where it feels like \"I cannot carry this alone anymore\".",
];

export default function AssessmentPageClient() {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("20-Min Free Consultation Call");
  const [activeProfessional, setActiveProfessional] = useState<Professional | null>(null);

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleOpenBooking = (service: string = "20-Min Free Consultation Call") => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const selectedCount = checkedItems.length;
  const isHighIndicator = selectedCount >= 8;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE6] text-[#24352D] font-sans antialiased selection:bg-[#B58B50]/20 selection:text-[#173D34]">
      {/* Sticky Top Navbar */}
      <Navbar currentPage="assessment" onOpenBooking={() => handleOpenBooking("20-Min Free Consultation Call")} />

      <main className="flex-1">
        {/* ========================================================
            HERO SECTION: Self-Reflection & Guidance
           ======================================================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#1C4136] via-[#16382E] to-[#122F26] text-[#F7F5EF] pt-14 pb-16 sm:pt-20 sm:pb-24 border-b border-[#B58B50]/20">
          <div className="absolute top-[-15%] right-[-10%] w-[550px] h-[550px] rounded-full border border-[#DFBD83]/15 bg-radial from-[#DFBD83]/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-15%] left-[-10%] w-[450px] h-[450px] rounded-full bg-[#1C4136]/50 blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 text-[#DFBD83] text-xs font-semibold tracking-[0.22em] uppercase mb-5 backdrop-blur-xs border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFBD83]" />
              SELF-REFLECTION &amp; GUIDANCE
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal text-white leading-[1.18] tracking-tight">
              A gentle space to reflect on what{" "}
              <span className="block mt-1 sm:mt-2 italic font-serif text-[#DFBD83] font-light">
                you are carrying.
              </span>
            </h1>

            {/* Intro paragraph */}
            <p className="mt-6 text-sm sm:text-base md:text-lg text-[#E4ECE5]/90 max-w-2xl mx-auto font-light leading-relaxed">
              Take a quiet moment to read through these experiences. Check the ones you have been
              experiencing frequently over the past month.
            </p>
          </div>
        </section>

        {/* ========================================================
            INTERACTIVE SELF-REFLECTION CHECKLIST
           ======================================================== */}
        <section className="py-12 sm:py-16 md:py-20 relative bg-[#F5EFE6]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-[#E3D9CC]">
              {/* Header inside container */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#EAE1D4]">
                <div>
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-[#8C6239] uppercase font-sans">
                    EXPLORE YOUR CURRENT WELLBEING
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#173D34] font-medium mt-0.5">
                    Select any that resonate with your recent weeks:
                  </h2>
                </div>
                <div className="text-xs text-[#5D7065] sm:text-right font-light">
                  {selectedCount} selected &bull; Private &amp; confidential
                </div>
              </div>

              {/* 20 Checklist Items */}
              <div className="divide-y divide-[#EAE1D4] mt-2">
                {CHECKLIST_ITEMS.map((item, index) => {
                  const isChecked = checkedItems.includes(index);
                  return (
                    <label
                      key={index}
                      onClick={() => toggleCheck(index)}
                      className={`group flex items-start gap-4 py-4 px-2 sm:px-3 rounded-xl cursor-pointer transition-all duration-150 select-none ${
                        isChecked ? "bg-[#EDE5D8]/70" : "hover:bg-[#F2ECE1]/60"
                      }`}
                    >
                      {/* Checkbox Box */}
                      <span
                        className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 border transition-all duration-150 ${
                          isChecked
                            ? "bg-[#21493C] border-[#21493C] text-white shadow-xs"
                            : "bg-white border-[#C9C0B3] group-hover:border-[#21493C]"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      </span>

                      {/* Item Text */}
                      <span
                        className={`text-xs sm:text-sm leading-relaxed transition-colors flex-1 ${
                          isChecked ? "text-[#102E27] font-medium" : "text-[#3D5247] font-normal"
                        }`}
                      >
                        {item}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Real-time selection count helper */}
              {selectedCount > 0 && (
                <div className="mt-5 pt-3 border-t border-[#EAE1D4] flex items-center justify-between text-xs text-[#5D7065]">
                  <span>
                    <strong>{selectedCount}</strong> of 20 items checked
                  </span>
                  <button
                    onClick={() => setCheckedItems([])}
                    className="text-[#8C6239] hover:underline"
                  >
                    Reset all
                  </button>
                </div>
              )}

              {/* ========================================================
                  RESULT GUIDANCE & STARTING POINT NOTICE
                 ======================================================== */}
              <div className="mt-8 sm:mt-10 space-y-6">
                {/* Support Indicator Pill */}
                <div
                  className={`rounded-2xl sm:rounded-full px-5 sm:px-7 py-4 flex items-center gap-3.5 border transition-all ${
                    isHighIndicator
                      ? "bg-[#EAE4D7] border-[#B58B50]/60 shadow-xs"
                      : "bg-[#EDE5D8] border-[#E0D5C3]"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#173D34]/10 flex items-center justify-center shrink-0">
                    <Leaf className="w-4 h-4 text-[#21493C]" />
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#1A382F] leading-snug font-medium">
                    If you find yourself feeling around <strong>8 to 10 (or more)</strong> of the
                    above experiences in the past month or more, it is a sign that your mind and
                    nervous system are asking for support. You don&apos;t have to carry this weight
                    alone.
                  </p>
                </div>

                {/* Direct Placement: Starting Point Notice & Crisis Disclaimer */}
                <div className="bg-[#F4EFE7] border border-[#DFD6C7] rounded-2xl p-5 sm:p-7 shadow-2xs space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#8C6239]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Info className="w-4 h-4 text-[#8C6239]" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h4 className="font-serif text-base sm:text-lg text-[#173D34] font-medium leading-snug">
                        Your Results Are a Starting Point — Not a Diagnosis
                      </h4>
                      <p className="text-xs sm:text-[13px] text-[#4A5E53] leading-relaxed font-normal">
                        This screening is designed to promote self-awareness and early identification of
                        areas that may require attention. It is not intended to provide a clinical
                        diagnosis or replace an assessment by a qualified mental health professional.
                      </p>
                    </div>
                  </div>

                  {/* Crisis warning */}
                  <div className="flex items-start gap-3 bg-[#FAF2F0] border border-[#F3C7C4] rounded-xl p-3.5 text-[#7A2724]">
                    <AlertTriangle className="w-4 h-4 text-[#C8433F] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-[13px] leading-relaxed">
                      If you are experiencing an immediate mental health crisis or are at risk of
                      harming yourself or someone else, please seek urgent professional or emergency
                      support rather than relying on this screening.
                    </p>
                  </div>
                </div>

                {/* Unpack patterns statement */}
                <p className="text-center text-sm sm:text-base text-[#24352D] font-normal max-w-2xl mx-auto pt-2">
                  Talking to a professional can help you unpack these patterns, regulate your emotions, and regain your sense of balance.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenBooking("20-Min Free Consultation Call")}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#23493D] hover:bg-[#1B3A30] text-white text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all shadow-md hover:shadow-lg hover:scale-[1.01]"
                  >
                    <Calendar className="w-4 h-4 text-[#DFBD83]" />
                    <span>Book a 20 Min Free Consultation Call with Our Professionals</span>
                  </button>

                  <Link
                    href="/services"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#B58B50]/40 text-[#173D34] text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all shadow-2xs hover:shadow-sm"
                  >
                    <LayoutGrid className="w-4 h-4 text-[#B58B50]" />
                    <span>Explore Our Services</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            TRANSITION SECTION: OUR PROFESSIONALS
           ======================================================== */}
        <section className="py-14 sm:py-20 bg-[#F5EFE6]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Elegant Divider with OUR PROFESSIONALS */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-16 sm:w-24 bg-[#B58B50]/30" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-medium text-[#8C6239]">
                OUR PROFESSIONALS
              </span>
              <span className="h-px w-16 sm:w-24 bg-[#B58B50]/30" />
            </div>

            {/* Headline */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#173D34] font-normal leading-snug">
                Different expertise. <span className="italic text-[#8C6239] block sm:inline">One Shared Purpose: Wellbeing.</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#4E6258] leading-relaxed">
                Mental health and wellbeing are multidimensional. Different concerns may require
                different forms of professional support. At N.E.W., our team includes professionals
                with expertise across counselling, psychotherapy, rehabilitation, renewal,
                mindfulness, and related areas.
              </p>
            </div>

            {/* Professionals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {PROFESSIONALS.map((pro) => (
                <div
                  key={pro.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E3D9CC] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Portrait Photo / Avatar Frame */}
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gradient-to-b from-[#183E35] to-[#102E27] flex items-center justify-center">
                      {pro.image ? (
                        <div className="absolute inset-0">
                          <Image
                            src={pro.image}
                            alt={pro.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                      ) : (
                        <div className="relative z-10 flex flex-col items-center justify-center text-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#102E27] to-[#1F4F44] border-2 border-[#DFBD83]/60 shadow-lg flex items-center justify-center mb-1 group-hover:border-[#DFBD83] group-hover:scale-105 transition-all">
                            <span className="font-serif text-xl font-light text-[#DFBD83] tracking-wider">
                              {pro.initials}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#DFBD83]/80 uppercase tracking-widest font-sans font-medium">
                            Practitioner
                          </span>
                        </div>
                      )}

                      {/* Floating Badge */}
                      {pro.badge && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#102E27]/90 text-[#DFBD83] text-[9.5px] font-semibold tracking-wider uppercase border border-[#B58B50]/40 backdrop-blur-xs">
                            {pro.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-serif text-base text-[#173D34] font-medium mb-1">
                        {pro.name}
                      </h3>
                      <p className="text-[11px] text-[#8C6239] font-medium leading-snug mb-2.5">
                        {pro.designation}
                      </p>
                      <p className="text-xs text-[#4E6258] leading-relaxed line-clamp-3">
                        {pro.shortBio}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-[#F0EAE1] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveProfessional(pro)}
                      className="text-xs text-[#21493C] font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Profile</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenBooking(`Consultation with ${pro.name}`)}
                      className="px-3 py-1 rounded-full bg-[#21493C] hover:bg-[#18392F] text-white text-[11px] font-semibold tracking-wide transition-colors cursor-pointer"
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Section Link */}
            <div className="mt-10 text-center">
              <Link
                href="/professionals"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#173D34] hover:text-[#B58B50] transition-colors uppercase tracking-wider"
              >
                <span>Explore Full Professional Biographies &amp; Credentials</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking("Footer Booking")} />

      {/* Booking Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedService={selectedService}
      />

      {/* Professional Bio Modal */}
      {activeProfessional && (
        <ProfessionalProfileModal
          professional={activeProfessional}
          isOpen={!!activeProfessional}
          onClose={() => setActiveProfessional(null)}
          onBookConsultation={() => {
            const name = activeProfessional.name;
            setActiveProfessional(null);
            handleOpenBooking(`Consultation with ${name}`);
          }}
        />
      )}
    </div>
  );
}

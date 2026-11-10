"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  LayoutGrid,
  Leaf,
  MessageSquare,
  ClipboardList,
  Users,
  AlertTriangle,
  Info,
  ArrowRight,
  Check,
  CheckCircle2,
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

const DETAILED_SCREENING_QUESTIONS = [
  {
    category: "Emotional Wellbeing & Mood",
    question: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    category: "Stress & Anxiety",
    question: "How often have you experienced trouble relaxing or felt on edge?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    category: "Cognitive Focus & Energy",
    question: "Have you found it unusually difficult to concentrate on tasks, work, or reading?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    category: "Somatic & Physical Ease",
    question: "How frequently have you noticed muscle tension, headaches, or rapid heart rate under routine daily demands?",
    options: ["Rarely or never", "Occasionally", "Frequently", "Almost continuously"],
  },
  {
    category: "Restorative Sleep",
    question: "How would you describe your sleep quality and ability to wake feeling refreshed?",
    options: ["Restful & steady", "Occasionally broken", "Frequently disturbed by worry", "Consistently poor / exhausted"],
  },
];

export default function AssessmentPageClient() {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Self-Assessment Discussion");
  const [activeProfessional, setActiveProfessional] = useState<Professional | null>(null);

  // Guided 15-minute screening questionnaire state
  const [isScreeningOpen, setIsScreeningOpen] = useState(false);
  const [screeningAnswers, setScreeningAnswers] = useState<Record<number, number>>({});
  const [screeningSubmitted, setScreeningSubmitted] = useState(false);
  const screeningRef = useRef<HTMLDivElement>(null);

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleOpenBooking = (service: string = "Self-Assessment Consultation") => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleStartScreening = () => {
    setIsScreeningOpen(true);
    setTimeout(() => {
      screeningRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleScreeningOption = (qIdx: number, optIdx: number) => {
    setScreeningAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const selectedCount = checkedItems.length;
  const isHighIndicator = selectedCount >= 8;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE6] text-[#24352D] font-sans antialiased selection:bg-[#B58B50]/20 selection:text-[#173D34]">
      {/* Sticky Top Navbar */}
      <Navbar currentPage="assessment" onOpenBooking={() => handleOpenBooking("Assessment Consultation")} />

      <main className="flex-1">
        {/* ========================================================
            HERO HEADER: A Gentle Check-In With Yourself
           ======================================================== */}
        <section className="relative pt-12 sm:pt-16 pb-14 sm:pb-20 overflow-hidden bg-[#F5EFE6]">
          {/* Cozy Room Background (Armchair & Plant) blended on the right */}
          <div
            className="absolute top-0 right-0 w-full sm:w-[55%] md:w-[48%] lg:w-[44%] h-full bg-no-repeat bg-right-top bg-contain pointer-events-none select-none opacity-90 hidden sm:block"
            style={{
              backgroundImage: "url('/images/assessment-hero-room-blend.png')",
            }}
          />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-xl space-y-4 sm:space-y-5">
              {/* Pill Badge */}
              <div>
                <span className="inline-block px-4 py-1 rounded-full bg-[#E5D7C6] text-[#7A5A3D] text-[11px] font-semibold tracking-[0.2em] uppercase shadow-2xs">
                  ASSESSMENT
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#173D34] font-normal leading-[1.14] tracking-tight">
                A Gentle Check-In <br />
                With Yourself
              </h1>

              {/* Subtitle */}
              <p className="text-[#3A5046] text-xs sm:text-sm leading-relaxed font-normal pt-1">
                Every day, we navigate various pressures, transitions, and internal battles.
                Sometimes, we may not have a name for what we are going through, but we know things
                don&apos;t feel quite right.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            WHITE FLOATING CARD: ARE YOU EXPERIENCING ANY OF THESE?
           ======================================================== */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-16 -mt-8 sm:-mt-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl shadow-[#173D34]/5 border border-[#E3D8CC] p-6 sm:p-10 lg:p-12">
              {/* Card Title */}
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="font-serif text-lg sm:text-xl md:text-2xl text-[#173D34] font-semibold tracking-[0.08em] uppercase">
                  ARE YOU EXPERIENCING ANY OF THESE?
                </h2>
              </div>

              {/* 20 Checklist Items in 2 Columns (1-10 on left, 11-20 on right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-3.5 sm:gap-y-4">
                {/* Left Column: 1 - 10 */}
                <div className="space-y-3">
                  {CHECKLIST_ITEMS.slice(0, 10).map((item, idx) => {
                    const itemNumber = idx + 1;
                    const isChecked = checkedItems.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleCheck(idx)}
                        className={`group flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-colors duration-150 select-none ${
                          isChecked ? "bg-[#F3ECE1]/70" : "hover:bg-[#FAF7F2]"
                        }`}
                      >
                        <div
                          className={`mt-0.5 w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? "bg-[#21493C] border-[#21493C] text-white"
                              : "border-[#7A9084] group-hover:border-[#21493C] bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="text-xs sm:text-[13px] leading-relaxed text-[#2D4238]">
                          <span className="font-semibold text-[#173D34] mr-1.5">
                            {itemNumber}.
                          </span>
                          <span>{item}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Column: 11 - 20 */}
                <div className="space-y-3">
                  {CHECKLIST_ITEMS.slice(10, 20).map((item, idx) => {
                    const itemIndex = idx + 10;
                    const itemNumber = itemIndex + 1;
                    const isChecked = checkedItems.includes(itemIndex);
                    return (
                      <div
                        key={itemIndex}
                        onClick={() => toggleCheck(itemIndex)}
                        className={`group flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-colors duration-150 select-none ${
                          isChecked ? "bg-[#F3ECE1]/70" : "hover:bg-[#FAF7F2]"
                        }`}
                      >
                        <div
                          className={`mt-0.5 w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? "bg-[#21493C] border-[#21493C] text-white"
                              : "border-[#7A9084] group-hover:border-[#21493C] bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="text-xs sm:text-[13px] leading-relaxed text-[#2D4238]">
                          <span className="font-semibold text-[#173D34] mr-1.5">
                            {itemNumber}.
                          </span>
                          <span>{item}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
                  HIGHLIGHT CALLOUT PILL
                 ======================================================== */}
              <div className="mt-8 sm:mt-10">
                <div
                  className={`rounded-2xl sm:rounded-full px-5 sm:px-7 py-3.5 sm:py-4 flex items-center gap-3.5 border transition-all ${
                    isHighIndicator
                      ? "bg-[#EAE4D7] border-[#B58B50]/60 shadow-xs"
                      : "bg-[#EDE5D8] border-[#E0D5C3]"
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-[#173D34]/10 flex items-center justify-center shrink-0">
                    <Leaf className="w-4 h-4 text-[#21493C]" />
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#1A382F] leading-snug font-medium">
                    If you find yourself feeling around <strong>8 to 10 (or more)</strong> of the
                    above experiences in the past month or more, it is a sign that your mind and
                    nervous system are asking for support. You don&apos;t have to carry this weight
                    alone.
                  </p>
                </div>

                <p className="text-center text-xs sm:text-sm text-[#4E6258] mt-3.5 font-normal">
                  Talking to a professional can help you unpack these patterns, regulate your
                  emotions, and regain your sense of balance.
                </p>
              </div>

              {/* ========================================================
                  DUAL ACTION CARDS: Speak to a Professional | Explore Core Services
                 ======================================================== */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 sm:mt-7">
                {/* Left Card: Solid Dark Green */}
                <button
                  type="button"
                  onClick={() => handleOpenBooking("Check-in Consultation")}
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-[#23493D] hover:bg-[#1B3A30] text-white text-left transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#DFBD83]"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base text-white font-medium">
                      Speak to a Professional
                    </h3>
                    <p className="text-xs text-white/80 mt-0.5 leading-snug">
                      Book a consultation to discuss your specific concerns.
                    </p>
                  </div>
                </button>

                {/* Right Card: White with Thin Border */}
                <Link
                  href="/services"
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-white hover:bg-[#FAF7F2] border border-[#D8DFDA] text-left transition-all duration-200 shadow-2xs hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#23493D]"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#F0ECE3] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <LayoutGrid className="w-5 h-5 text-[#21493C]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base text-[#173D34] font-medium">
                      Explore Our Core Services
                    </h3>
                    <p className="text-xs text-[#4E6258] mt-0.5 leading-snug">
                      Discover our specialized offerings—from individual counseling and
                      psychotherapies to clinical hypnotherapy and online rehabilitation.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            PROCESS: WHAT HAPPENS AFTER YOU CONTACT US?
           ======================================================== */}
        <section className="relative py-14 sm:py-20 bg-[#E7ECE7] border-y border-[#D6DFD6] overflow-hidden">
          {/* Subtle botanical corner decoration */}
          <div className="absolute right-0 bottom-0 w-36 sm:w-44 h-36 sm:h-44 opacity-25 pointer-events-none select-none">
            <Image
              src="/images/botanical-branch.png"
              alt=""
              width={176}
              height={176}
              className="object-contain object-bottom-right"
            />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#173D34] font-normal leading-tight">
                What happens after you contact us?
              </h2>
              <p className="text-xs sm:text-[13px] text-[#3E554B] mt-2.5 leading-relaxed">
                At the end of the screening, you receive an indication of the areas that may
                require further attention and the level of concern indicated by the screening.
              </p>
            </div>

            {/* 4 Cards with Horizontal Right Arrows */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 sm:gap-4 items-stretch relative">
              {/* Card 1 */}
              <div className="relative bg-white rounded-2xl p-5 shadow-2xs border border-[#D5DFD6] flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#EAF2EC] flex items-center justify-center mb-3.5">
                    <Leaf className="w-4 h-4 text-[#21493C]" />
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-semibold text-[#173D34] mb-1.5 leading-snug">
                    Self-Help &amp; Wellbeing Support
                  </h3>
                  <p className="text-xs text-[#4A5E53] leading-relaxed">
                    For areas showing relatively low levels of concern, you may benefit from
                    practical wellbeing strategies, psychoeducation, mindfulness, and
                    stress-management techniques.
                  </p>
                </div>
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[#E7ECE7] border border-[#CCD8CD] items-center justify-center text-[#21493C]">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative bg-white rounded-2xl p-5 shadow-2xs border border-[#D5DFD6] flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#EAF2EC] flex items-center justify-center mb-3.5">
                    <MessageSquare className="w-4 h-4 text-[#21493C]" />
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-semibold text-[#173D34] mb-1.5 leading-snug">
                    Professional Consultation
                  </h3>
                  <p className="text-xs text-[#4A5E53] leading-relaxed">
                    If the screening suggests a greater level of difficulty, speaking with a
                    qualified mental health professional for a more detailed assessment.
                  </p>
                </div>
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[#E7ECE7] border border-[#CCD8CD] items-center justify-center text-[#21493C]">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative bg-white rounded-2xl p-5 shadow-2xs border border-[#D5DFD6] flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#EAF2EC] flex items-center justify-center mb-3.5">
                    <ClipboardList className="w-4 h-4 text-[#21493C]" />
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-semibold text-[#173D34] mb-1.5 leading-snug">
                    Further Psychological Assessment
                  </h3>
                  <p className="text-xs text-[#4A5E53] leading-relaxed">
                    Where appropriate, a professional may recommend a more comprehensive
                    psychological assessment to understand the concern in greater depth.
                  </p>
                </div>
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[#E7ECE7] border border-[#CCD8CD] items-center justify-center text-[#21493C]">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Card 4 */}
              <div className="relative bg-white rounded-2xl p-5 shadow-2xs border border-[#D5DFD6] flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#EAF2EC] flex items-center justify-center mb-3.5">
                    <Users className="w-4 h-4 text-[#21493C]" />
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-semibold text-[#173D34] mb-1.5 leading-snug">
                    Counselling or Psychotherapy
                  </h3>
                  <p className="text-xs text-[#4A5E53] leading-relaxed">
                    If ongoing emotional or psychological difficulties are affecting your wellbeing
                    or daily functioning, counselling or psychotherapy may be considered.
                  </p>
                </div>
              </div>
            </div>

            {/* ========================================================
                DISCLAIMER & CRISIS NOTICE BOX
               ======================================================== */}
            <div className="mt-10 sm:mt-12 bg-[#F4EFE7] border border-[#DFD6C7] rounded-2xl p-5 sm:p-7 shadow-2xs">
              {/* Top row: 2-column info layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pb-5 border-b border-[#E1D8CA]">
                <div className="md:col-span-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#8C6239]/15 flex items-center justify-center shrink-0">
                    <Info className="w-4 h-4 text-[#8C6239]" />
                  </div>
                  <h4 className="font-serif text-base sm:text-lg text-[#173D34] font-medium leading-snug">
                    Your Results Are a Starting Point — Not a Diagnosis
                  </h4>
                </div>

                <div className="md:col-span-7 md:border-l md:border-[#DFD6C7] md:pl-6">
                  <p className="text-xs sm:text-[13px] text-[#4A5E53] leading-relaxed font-normal">
                    This screening is designed to promote self-awareness and early identification of
                    areas that may require attention. It is not intended to provide a clinical
                    diagnosis or replace an assessment by a qualified mental health professional.
                  </p>
                </div>
              </div>

              {/* Bottom row: Crisis warning strip */}
              <div className="mt-4 pt-0.5 flex items-start gap-3 bg-[#FAF2F0] border border-[#F3C7C4] rounded-xl p-3.5 text-[#7A2724]">
                <AlertTriangle className="w-4 h-4 text-[#C8433F] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-[13px] leading-relaxed">
                  If you are experiencing an immediate mental health crisis or are at risk of
                  harming yourself or someone else, please seek urgent professional or emergency
                  support rather than relying on this screening.
                </p>
              </div>
            </div>

            {/* ========================================================
                CTA BUTTON: START 15-MINUTE SCREENING
               ======================================================== */}
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={handleStartScreening}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#23493D] hover:bg-[#1B3A30] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-sm hover:shadow-md hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-[#DFBD83]"
              >
                <span>START 15-MINUTE SCREENING</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            EXPANDABLE 15-MINUTE GUIDED SCREENING QUESTIONNAIRE
           ======================================================== */}
        {isScreeningOpen && (
          <section ref={screeningRef} className="py-12 bg-white border-b border-[#E2D8CC]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-8">
                <span className="text-[11px] uppercase tracking-widest text-[#B58B50] font-semibold">
                  Evidence-Informed Check-In
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#173D34] mt-1">
                  15-Minute Emotional &amp; Somatic Screening
                </h3>
                <p className="text-xs sm:text-sm text-[#4E6258] mt-2 max-w-xl mx-auto">
                  Take a few calm moments to answer these 5 core screening indicators. Your answers
                  remain completely private and help guide your next steps.
                </p>
              </div>

              <div className="space-y-6">
                {DETAILED_SCREENING_QUESTIONS.map((q, qIdx) => (
                  <div
                    key={qIdx}
                    className="p-5 sm:p-6 rounded-2xl bg-[#F8F5EE] border border-[#E3D9CC]"
                  >
                    <div className="text-[11px] uppercase tracking-wider text-[#B58B50] font-semibold mb-1">
                      {q.category}
                    </div>
                    <div className="font-serif text-sm sm:text-base text-[#173D34] font-medium mb-4">
                      {qIdx + 1}. {q.question}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = screeningAnswers[qIdx] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleScreeningOption(qIdx, optIdx)}
                            className={`p-3 rounded-xl text-xs text-left transition-all border ${
                              isSelected
                                ? "bg-[#21493C] text-white border-[#21493C] font-medium"
                                : "bg-white text-[#3A4E44] border-[#D8DDD8] hover:border-[#21493C]"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                {!screeningSubmitted ? (
                  <button
                    type="button"
                    onClick={() => setScreeningSubmitted(true)}
                    className="px-8 py-3 rounded-full bg-[#B58B50] hover:bg-[#A37B43] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-sm"
                  >
                    Complete &amp; Review Recommendations
                  </button>
                ) : (
                  <div className="p-6 rounded-2xl bg-[#EAF2EC] border border-[#CCD8CE] text-left max-w-2xl mx-auto space-y-3">
                    <div className="flex items-center gap-2 text-[#21493C] font-semibold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-[#21493C]" />
                      <span>Thank You for Completing the Check-In</span>
                    </div>
                    <p className="text-xs text-[#3E554B] leading-relaxed">
                      Your responses suggest that speaking with a qualified professional could offer
                      clarity and emotional grounding. You can schedule a confidential consultation
                      directly with one of our clinicians below.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleOpenBooking("Guided Screening Follow-Up")}
                        className="px-6 py-2.5 rounded-full bg-[#21493C] hover:bg-[#18392F] text-white text-xs font-semibold tracking-wide transition-all"
                      >
                        Book Confidential Follow-Up Consultation
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

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
                Different expertise. One shared purpose: wellbeing.
              </h2>
              <p className="text-xs sm:text-sm text-[#4E6258] leading-relaxed">
                Mental health and wellbeing are multidimensional. Different concerns may require
                different forms of professional support. At N.E.W., our team includes professionals
                with expertise across psychology, counselling, psychotherapy, mental health,
                rehabilitation, mindfulness, and related areas.
              </p>
            </div>

            {/* Professionals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {PROFESSIONALS.map((pro) => (
                <div
                  key={pro.id}
                  className="bg-white rounded-2xl p-5 border border-[#E3D9CC] shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Badge */}
                    {pro.badge && (
                      <span className="inline-block px-2 py-0.5 rounded-full bg-[#EAE2D5] text-[#7A5835] text-[10px] font-semibold tracking-wider uppercase mb-2.5">
                        {pro.badge}
                      </span>
                    )}
                    <h3 className="font-serif text-base text-[#173D34] font-medium mb-1">
                      {pro.name}
                    </h3>
                    <p className="text-[11px] text-[#8C6239] font-medium leading-snug mb-2.5">
                      {pro.designation}
                    </p>
                    <p className="text-xs text-[#4E6258] leading-relaxed line-clamp-3 mb-4">
                      {pro.shortBio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveProfessional(pro)}
                      className="text-xs text-[#21493C] font-medium hover:underline inline-flex items-center gap-1"
                    >
                      <span>Profile</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenBooking(`Consultation with ${pro.name}`)}
                      className="px-3 py-1 rounded-full bg-[#21493C] hover:bg-[#18392F] text-white text-[11px] font-semibold tracking-wide transition-colors"
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

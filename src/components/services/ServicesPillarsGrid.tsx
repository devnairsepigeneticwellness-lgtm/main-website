"use client";

import React, { useState } from "react";
import { 
  Heart, 
  Brain, 
  Sparkles, 
  Shield, 
  Compass, 
  Sun, 
  Layers, 
  ArrowUpRight, 
  CheckCircle2,
  Calendar,
  Sparkle
} from "lucide-react";
import { PillarId } from "@/components/services/PillarDetailModal";

interface ServicesPillarsGridProps {
  onSelectPillar: (pillar: PillarId) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export default function ServicesPillarsGrid({
  onSelectPillar,
  onOpenBooking,
}: ServicesPillarsGridProps) {
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const pillars = [
    {
      id: "counselling" as PillarId,
      number: "01",
      category: "therapy",
      badge: "One-to-One & Systems",
      icon: Heart,
      title: "Counselling",
      subtitle: "Personal, Relational & Transitional Guidance",
      tagline: "A space to understand, express, and work through what you are experiencing.",
      summary:
        "Counselling provides a safe, supportive space to talk about life challenges with a trained professional. Sessions help you make sense of your experiences, identify patterns, and develop practical ways of coping.",
      tags: ["Individual (1-on-1)", "Family Systems", "Group Community", "Youth & Adolescent"],
      cta: "Explore Counselling & 4 Streams",
    },
    {
      id: "psychotherapies" as PillarId,
      number: "02",
      category: "therapy",
      badge: "10 Clinical Modalities",
      icon: Brain,
      title: "Psychotherapies",
      subtitle: "Evidence-Informed Pattern Analysis & Healing",
      tagline: "Different approaches for different needs.",
      summary:
        "A deeper form of psychological support helping you understand patterns in thoughts, emotions, core beliefs, and behaviours across 10 proven therapeutic frameworks.",
      tags: ["CBT", "REBT", "DBT Skills", "ACT", "IPT", "MBCT", "SFBT", "EFT", "CT", "BT"],
      cta: "Explore All 10 Psychotherapies",
    },
    {
      id: "hypnotherapy" as PillarId,
      number: "03",
      category: "clinical",
      badge: "Subconscious Alignment",
      icon: Sparkles,
      title: "Clinical Hypnotherapy",
      subtitle: "Collaborative Focused Trance & Rapid Rewiring",
      tagline: "Subconscious alignment & collaborative focused trance.",
      summary:
        "An evidence-based clinical modality using guided relaxation and focused trance to bypass the 10% conscious analytical filter and update the 90% subconscious mind where habits and emotional patterns live.",
      tags: ["Alpha/Theta Brain States", "4 Session Stages", "Anxiety & Fears", "Habit Rewiring", "Psychosomatic Relief"],
      cta: "Explore Hypnotherapy & Brain Science",
    },
    {
      id: "rehabilitation" as PillarId,
      number: "04",
      category: "clinical",
      badge: "Structured Remote Care",
      icon: Shield,
      title: "Online Rehabilitation",
      subtitle: "Rebuilding Independence & Quality of Life",
      tagline: "Getting your life back on track wherever you are.",
      summary:
        "Structured, goal-oriented remote psychological rehabilitation helping you rebuild functional independence, quality daily routines, and adaptive coping skills through secure video care.",
      tags: ["Comfort & Zero Commute", "6 Online Offerings", "Suitability Criteria", "4-Step Roadmap"],
      cta: "Explore Online Rehabilitation",
    },
    {
      id: "renewal" as PillarId,
      number: "05",
      category: "mindfulness",
      badge: "Restorative Reset",
      icon: Compass,
      title: "Renewal Programme",
      subtitle: "Restorative Reset & Value Realignment",
      tagline: "A dedicated client-centered space for starting again.",
      summary:
        "A structured, client-centered service designed to help you navigate life transitions, alleviate chronic burnout, break unhelpful survival habits, and rebuild lasting psychological clarity and autonomy.",
      tags: ["01. REFLECT", "02. RECONNECT", "03. REBUILD", "Candidate Guidance", "Process Overview"],
      cta: "Explore Renewal Framework",
    },
    {
      id: "spiritual" as PillarId,
      number: "06",
      category: "mindfulness",
      badge: "Optional & Belief-Aligned",
      icon: Sun,
      title: "Spiritual Practices",
      subtitle: "Consciousness, Epigenetic Perception & Meaning",
      tagline: "Exploration of inner consciousness, transpersonal meaning, and cellular calm.",
      summary:
        "Optional, belief-aligned modalities for clients seeking transpersonal or subconscious exploration. Modern epigenetics shows biological health is deeply shaped by core perceptions, creating profound emotional catharsis.",
      tags: ["Transpersonal Therapy", "Past Life Regression (PLRT)", "Life Between Lives (LBL)"],
      cta: "Explore Spiritual Practices",
    },
    {
      id: "plans" as PillarId,
      number: "07",
      category: "therapy",
      badge: "Personalised Roadmaps",
      icon: Layers,
      title: "Treatment & Support Plans",
      subtitle: "Custom Care Formats & Crisis Safety",
      tagline: "Your support plan should fit you.",
      summary:
        "Structured care formats tailored to your unique goals and comfort levels, ranging from private 1-on-1 therapy to intensive multi-component cohorts, backed by immediate emergency guidance.",
      tags: ["Format 01 to 05", "Private & Cohort Formats", "Structure Details", "24/7 Crisis Helplines"],
      cta: "Explore Support Plans & Helplines",
    },
  ];

  const categories = [
    { id: "all", label: "All 7 Pathways" },
    { id: "therapy", label: "Therapy & Counselling" },
    { id: "clinical", label: "Clinical & Rehabilitation" },
    { id: "mindfulness", label: "Renewal & Mindfulness" },
  ];

  const filteredPillars =
    filterCategory === "all"
      ? pillars
      : pillars.filter((p) => p.category === filterCategory);

  return (
    <section id="services-grid" className="py-16 lg:py-24 bg-[#EAF0E7] border-b border-[#C8D6C6] relative overflow-hidden">
      {/* Decorative luxury gradient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#DFBD83]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#173D34]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#9E783E]" />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
                CORE CLINICAL &amp; THERAPEUTIC PATHWAYS
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
              Support designed around your{" "}
              <span className="italic text-[#7D6335]">human experience.</span>
            </h2>

            <p className="mt-4 font-sans text-sm sm:text-base text-[#3F5448] leading-relaxed font-light">
              Every person brings a unique background, emotional narrative, and set of goals. Explore our seven dedicated services. Click any pathway to inspect clinical approaches, evidence frameworks, session structures, and tailored modalities.
            </p>
          </div>

          {/* Clean Segment Filter (Wrapped, NO horizontal scrollbar!) */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer ${
                  filterCategory === cat.id
                    ? "bg-[#1E3F35] text-[#DFBD83] shadow-sm font-semibold"
                    : "bg-[#DDE7DB] text-[#24352D] hover:bg-[#D3E0D1] border border-[#C8D6C6]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* The 7 Pillars Luxury Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredPillars.map((p, idx) => {
            const Icon = p.icon;
            const isFeatured = p.id === "hypnotherapy" || p.id === "plans";

            return (
              <div
                key={p.id}
                onClick={() => onSelectPillar(p.id)}
                className={`group relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1.5 border ${
                  isFeatured
                    ? "bg-gradient-to-b from-[#1E4339] to-[#16352D] text-[#F7F5EF] border-[#DFBD83]/40"
                    : "bg-[#F4F8F2] hover:bg-white text-[#24352D] border-[#C8D6C6] hover:border-[#9E783E]"
                }`}
              >
                <div>
                  {/* Top Row: Number & Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`font-serif text-3xl font-light ${
                      isFeatured ? "text-[#DFBD83]" : "text-[#9E783E]"
                    }`}>
                      {p.number}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-sans uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border ${
                        isFeatured
                          ? "bg-white/10 text-[#DFBD83] border-[#DFBD83]/30"
                          : "bg-[#DEE7DB] text-[#7D6335] border-[#B8C9B5]"
                      }`}>
                        {p.badge}
                      </span>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isFeatured
                          ? "bg-white/10 text-[#DFBD83]"
                          : "bg-[#D7E3D3] text-[#1E3F35]"
                      }`}>
                        <Icon className="w-5 h-5" strokeWidth={1.75} />
                      </div>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className={`font-serif text-2xl font-medium mb-1 transition-colors ${
                    isFeatured ? "text-white group-hover:text-[#DFBD83]" : "text-[#173D34] group-hover:text-[#7D6335]"
                  }`}>
                    {p.title}
                  </h3>
                  <p className={`text-xs font-sans tracking-wide mb-3 font-semibold ${
                    isFeatured ? "text-[#DFBD83]" : "text-[#7D6335]"
                  }`}>
                    {p.subtitle}
                  </p>

                  {/* Summary */}
                  <p className={`text-xs sm:text-sm font-light leading-relaxed mb-6 ${
                    isFeatured ? "text-[#E8EDE4]/90" : "text-[#465A4F]"
                  }`}>
                    {p.summary}
                  </p>

                  {/* Highlights Pill Tags */}
                  <div className="mb-6">
                    <span className={`text-[10px] uppercase tracking-wider font-semibold block mb-2 ${
                      isFeatured ? "text-[#DFBD83]/80" : "text-[#7D6335]"
                    }`}>
                      Featured Frameworks &amp; Topics
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t, i) => (
                        <span
                          key={i}
                          className={`text-[11px] px-2.5 py-0.5 rounded-full ${
                            isFeatured
                              ? "bg-white/10 text-[#E8EDE4] border border-white/10"
                              : "bg-[#E6EEE3] text-[#24352D] border border-[#C8D6C6]/60"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className={`pt-4 border-t flex items-center justify-between ${
                  isFeatured ? "border-white/10" : "border-[#C8D6C6]"
                }`}>
                  <span className={`text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${
                    isFeatured
                      ? "text-[#DFBD83] group-hover:text-white"
                      : "text-[#173D34] group-hover:text-[#7D6335]"
                  }`}>
                    <span>{p.cta}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBooking(p.title);
                    }}
                    className={`text-[11px] font-semibold underline underline-offset-4 hover:opacity-80 cursor-pointer ${
                      isFeatured ? "text-[#DFBD83]" : "text-[#7D6335]"
                    }`}
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Crisis Reassurance Box */}
        <div className="mt-14 p-6 sm:p-7 rounded-3xl bg-[#FFF9F5] border border-[#D97706]/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-sans uppercase tracking-widest text-[#D97706] font-bold block">
              Emergency &amp; Crisis Support
            </span>
            <p className="text-xs sm:text-sm text-[#59675F] font-light">
              Nair’s Epigenetic Wellness is an outpatient mental health service. If in immediate danger, call <strong>112</strong> (Emergency) or <strong>14416</strong> (Tele-MANAS 24/7 Helpline).
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectPillar("plans")}
            className="px-5 py-2 rounded-full bg-[#D97706]/10 hover:bg-[#D97706]/20 text-[#D97706] text-xs font-semibold tracking-wide transition-colors whitespace-nowrap cursor-pointer"
          >
            View All Helplines &rarr;
          </button>
        </div>

      </div>
    </section>
  );
}

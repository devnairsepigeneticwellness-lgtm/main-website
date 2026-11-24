"use client";

import React, { useState, useEffect } from "react";
import { 
  Heart, 
  Brain, 
  Sparkles, 
  Shield, 
  Compass, 
  Sun, 
  Layers, 
  ArrowUpRight, 
  Check, 
  CheckCircle2, 
  AlertTriangle, 
  PhoneCall, 
  Filter,
} from "lucide-react";
import { servicesCopy } from "@/data/servicesData";
import { PillarId } from "@/components/services/PillarDetailModal";
import PractitionerLinks from "@/components/services/PractitionerLinks";

interface ServicesStudioProps {
  onOpenBooking: (serviceName?: string) => void;
  onOpenModal: (pillar: PillarId) => void;
}

export default function ServicesStudio({
  onOpenBooking,
  onOpenModal,
}: ServicesStudioProps) {
  const [activePillar, setActivePillar] = useState<number>(0);

  // Sub-states for specific pillars
  const [counsellingCategory, setCounsellingCategory] = useState<string>("all");
  const [activePsychotherapyIndex, setActivePsychotherapyIndex] = useState<number>(0);
  const [hypnoTab, setHypnoTab] = useState<"pillars" | "brain" | "stages" | "suitability" | "transform" | "psychologist">("pillars");
  const [rehabTab, setRehabTab] = useState<"advantages" | "offerings" | "suitability" | "pathway">("advantages");
  const [renewalTab, setRenewalTab] = useState<"phases" | "candidates" | "process">("phases");
  const [spiritualIndex, setSpiritualIndex] = useState<number>(0);
  const [planIndex, setPlanIndex] = useState<number>(0);

  // Sync URL hash (e.g. #counselling, #psychotherapies) to the active pillar tab
  useEffect(() => {
    const hashToPillar: Record<string, number> = {
      "#counselling": 0,
      "#psychotherapies": 1,
      "#hypnotherapy": 2,
      "#rehabilitation": 3,
      "#renewal": 4,
      "#spiritual": 5,
      "#support-plans": 6,
    };
    const syncFromHash = () => {
      const idx = hashToPillar[window.location.hash];
      if (idx !== undefined) {
        setActivePillar(idx);
        const explorer = document.getElementById("services-explorer");
        explorer?.scrollIntoView({ behavior: "smooth" });
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const pillarsNav = [
    { id: 0, num: "01", label: "Counselling", badge: `${servicesCopy.counselling.streams.length} Streams`, icon: Heart },
    { id: 1, num: "02", label: "Psychotherapies", badge: `${servicesCopy.psychotherapies.items.length} Modalities`, icon: Brain },
    { id: 2, num: "03", label: "Hypnotherapy", badge: "Subconscious", icon: Sparkles },
    { id: 3, num: "04", label: "Online Rehabilitation", badge: "Remote Care", icon: Shield },
    { id: 4, num: "05", label: "Renewal", badge: "3 Phases", icon: Compass },
    { id: 5, num: "06", label: "Spiritual Practices", badge: "Consciousness", icon: Sun },
    { id: 6, num: "07", label: "Treatment Plans", badge: "5 Formats", icon: Layers },
  ];

  // Counselling category filtering
  const counsellingStreams = servicesCopy.counselling.streams;
  const filteredStreams =
    counsellingCategory === "all"
      ? counsellingStreams
      : counsellingStreams.filter((s) => s.category === counsellingCategory);

  return (
    <section id="services-explorer" className="py-14 sm:py-20 lg:py-28 bg-[#F4F7F2] relative overflow-hidden border-b border-[#C8D6C6]">
      {/* Decorative luxury gradient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#DFBD83]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#173D34]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-3 mb-3 justify-center">
            <span className="w-8 h-[1px] bg-[#9E783E]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#7D6335] uppercase font-sans">
              INTERACTIVE CLINICAL &amp; WELLBEING EXPLORER
            </span>
            <span className="w-8 h-[1px] bg-[#9E783E]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Explore Our Seven Dedicated{" "}
            <span className="italic text-[#7D6335]">Care Pathways.</span>
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#465A4F] leading-relaxed font-light">
            Select any pathway below to explore its clinical approaches, evidence frameworks, focus areas, and session structures in an intuitive, distraction-free studio.
          </p>
        </div>

        {/* 7-PILLAR MASTER NAVIGATOR CARDS (Clean, wrap-friendly, NO horizontal scrollbar) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3 mb-10 sm:mb-12">
          {pillarsNav.map((item) => {
            const Icon = item.icon;
            const isActive = activePillar === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActivePillar(item.id)}
                className={`p-3.5 sm:p-4 rounded-2xl flex flex-col items-start justify-between text-left transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? "bg-[#173D34] text-[#F7F5EF] border-[#DFBD83] shadow-md scale-[1.02]"
                    : "bg-[#E6EEE3] text-[#1E3F35] hover:bg-[#DEE7DB] border-[#C8D6C6]"
                } ${item.id === 6 ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className={`text-[10px] font-mono font-bold tracking-wider ${
                    isActive ? "text-[#DFBD83]" : "text-[#7D6335]"
                  }`}>
                    {item.num}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#DFBD83]" : "text-[#1E3F35]"}`} />
                </div>
                <div>
                  <h4 className="font-serif text-sm sm:text-base font-medium leading-tight">
                    {item.label}
                  </h4>
                  <span className={`text-[10px] font-sans font-medium block mt-0.5 ${
                    isActive ? "text-[#E8EDE4]/80" : "text-[#62776A]"
                  }`}>
                    {item.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            ACTIVE PILLAR DISPLAY STAGE
        ========================================================================= */}
        <div className="rounded-3xl bg-white border border-[#C8D6C6] p-6 sm:p-10 shadow-sm transition-all">
          
          {/* ─────────────────────────────────────────────────────────────
              01. COUNSELLING STAGE
          ───────────────────────────────────────────────────────────── */}
          {activePillar === 0 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Header Box */}
              <div className="border-b border-[#C8D6C6] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#7D6335] uppercase tracking-wider bg-[#E6EEE3] px-2.5 py-0.5 rounded-full border border-[#C8D6C6]">
                      01. COUNSELLING
                    </span>
                    <span className="text-xs text-[#556A5E] font-medium">
                      {counsellingStreams.length} Specialized Streams
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#173D34]">
                    {servicesCopy.counselling.subtitle}
                  </h3>
                  <div className="mt-3 space-y-2 text-xs sm:text-sm text-[#465A4F] font-light max-w-3xl leading-relaxed">
                    {servicesCopy.counselling.intro.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto">
                  <button
                    type="button"
                    onClick={() => onOpenModal("counselling")}
                    className="px-4 py-2.5 rounded-full border border-[#7D6335]/40 hover:bg-[#7D6335]/10 text-[#7D6335] text-xs font-semibold tracking-wide transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Open Comprehensive Modal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenBooking("Counselling Consultation")}
                    className="px-5 py-2.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-xs font-semibold tracking-wide shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Book Counselling</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#DFBD83]" />
                  </button>
                </div>
              </div>

              {/* Category Filter for Counselling Streams */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[#173D34] flex items-center gap-1 mr-1">
                  <Filter className="w-3.5 h-3.5 text-[#7D6335]" />
                  <span>Category:</span>
                </span>
                {[
                  { id: "all", label: `All ${counsellingStreams.length} Streams` },
                  { id: "marital-relational", label: "Marital, Couple & Family" },
                  { id: "specialized-health", label: "Specialized & Health" },
                  { id: "trauma-transitions", label: "Trauma & Life Transitions" },
                  { id: "identity-career", label: "Identity & Career" },
                  { id: "personal", label: "Personal & Group" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCounsellingCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                      counsellingCategory === cat.id
                        ? "bg-[#1E3F35] text-[#DFBD83] font-semibold shadow-xs"
                        : "bg-[#EAF0E7] text-[#24352D] hover:bg-[#DEE7DB] border border-[#C8D6C6]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* 14 Streams Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStreams.map((stream) => (
                  <div
                    key={stream.id}
                    className="p-6 rounded-2xl bg-[#F4F8F2] hover:bg-[#EBF2E8] border border-[#C8D6C6] hover:border-[#9E783E] transition-all duration-200 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-sans uppercase tracking-wider font-semibold text-[#7D6335] bg-[#DEE7DB] px-2.5 py-0.5 rounded-full border border-[#B8C9B5]">
                          {stream.categoryLabel}
                        </span>
                      </div>

                      <h4 className="font-serif text-xl font-medium text-[#173D34] mb-2">
                        {stream.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed mb-4">
                        {stream.lead}
                      </p>

                      <div className="p-4 rounded-xl bg-white border border-[#C8D6C6]/80 mb-4">
                        <span className="text-xs font-semibold text-[#173D34] block mb-2">
                          {stream.focusTitle}
                        </span>
                        <div className="space-y-1.5 text-xs text-[#24352D]">
                          {stream.topics.map((t, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#7D6335] mt-1.5 shrink-0" />
                              <span className="font-light">{t}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {stream.closing && (
                        <p className="text-xs text-[#384D42] italic mb-4">
                          {stream.closing}
                        </p>
                      )}

                      <div className="mb-4">
                        <PractitionerLinks
                          professionalIds={stream.professionalIds}
                          label="Available With"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#C8D6C6] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => onOpenBooking(`Counselling: ${stream.title}`)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E3F35] hover:text-[#7D6335] transition-colors cursor-pointer"
                      >
                        <span>Book Session</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#7D6335]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              02. PSYCHOTHERAPIES STAGE (All 10 Modalities)
          ───────────────────────────────────────────────────────────── */}
          {activePillar === 1 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Header */}
              <div className="border-b border-[#C8D6C6] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#7D6335] uppercase tracking-wider bg-[#E6EEE3] px-2.5 py-0.5 rounded-full border border-[#C8D6C6]">
                      02. PSYCHOTHERAPIES
                    </span>
                    <span className="text-xs text-[#556A5E] font-medium">10 Evidence-Based Approaches</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#173D34]">
                    {servicesCopy.psychotherapies.subtitle}
                  </h3>
                  <div className="mt-3 space-y-2 text-xs sm:text-sm text-[#465A4F] font-light max-w-3xl leading-relaxed">
                    {servicesCopy.psychotherapies.intro.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto">
                  <button
                    type="button"
                    onClick={() => onOpenModal("psychotherapies")}
                    className="px-4 py-2.5 rounded-full border border-[#7D6335]/40 hover:bg-[#7D6335]/10 text-[#7D6335] text-xs font-semibold tracking-wide transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Open Comprehensive Modal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenBooking("Psychotherapy Consultation")}
                    className="px-5 py-2.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-xs font-semibold tracking-wide shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Enquire on Therapies</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#DFBD83]" />
                  </button>
                </div>
              </div>

              {/* 10 Modalities Pill Selector */}
              <div className="flex flex-wrap gap-2">
                {servicesCopy.psychotherapies.items.map((pt, idx) => (
                  <button
                    key={pt.code}
                    type="button"
                    onClick={() => setActivePsychotherapyIndex(idx)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      activePsychotherapyIndex === idx
                        ? "bg-[#1E3F35] text-[#DFBD83] font-bold shadow-xs scale-[1.02]"
                        : "bg-[#EAF0E7] text-[#24352D] hover:bg-[#DEE7DB] border border-[#C8D6C6]"
                    }`}
                  >
                    <span>{pt.code}</span>
                  </button>
                ))}
              </div>

              {/* Active Psychotherapy Showcase Card */}
              {(() => {
                const pt = servicesCopy.psychotherapies.items[activePsychotherapyIndex];
                return (
                  <div className="p-8 rounded-3xl bg-[#F4F8F2] border border-[#C8D6C6] space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C8D6C6] pb-4">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#7D6335] uppercase tracking-wider block mb-1">
                          MODALITY {activePsychotherapyIndex + 1} OF 10 • {pt.code}
                        </span>
                        <h4 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
                          {pt.title}
                        </h4>
                      </div>
                      <span className="text-xs font-sans tracking-wide text-[#7D6335] font-semibold bg-[#DEE7DB] px-3.5 py-1 rounded-full border border-[#B8C9B5] self-start sm:self-auto">
                        Clinical Approach
                      </span>
                    </div>

                    <p className="text-sm font-sans tracking-wide text-[#7D6335] font-semibold italic">
                      &ldquo;{pt.tagline}&rdquo;
                    </p>

                    <p className="text-sm sm:text-base text-[#465A4F] font-light leading-relaxed">
                      {pt.desc}
                    </p>

                    {pt.skills && (
                      <div className="p-5 rounded-2xl bg-white border border-[#C8D6C6]">
                        <span className="font-semibold text-xs text-[#173D34] block mb-2.5 uppercase tracking-wider">
                          It focuses on skills such as:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#24352D]">
                          {pt.skills.map((s, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-[#7D6335] shrink-0" />
                              <span>{s}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {pt.questions && (
                      <div className="p-5 rounded-2xl bg-white border border-[#C8D6C6]">
                        <span className="font-semibold text-xs text-[#173D34] block mb-2.5 uppercase tracking-wider">
                          Instead of spending all the time understanding the problem, sessions also explore:
                        </span>
                        <div className="space-y-1.5 text-xs sm:text-sm text-[#24352D] italic">
                          {pt.questions.map((q, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="text-[#7D6335]">&bull;</span>
                              <span>&ldquo;{q}&rdquo;</span>
                            </div>
                          ))}
                        </div>
                        <p className="mt-3 text-xs text-[#7D6335] font-medium not-italic">
                          This approach is practical and focused on achievable change.
                        </p>
                      </div>
                    )}

                    {pt.usedFor && (
                      <div className="p-4 rounded-xl bg-[#EAF0E7] border border-[#C8D6C6] text-xs sm:text-sm text-[#384D42]">
                        <span className="font-semibold text-[#173D34]">Often used for: </span>
                        <span>{pt.usedFor}</span>
                      </div>
                    )}

                    <PractitionerLinks
                      professionalIds={pt.professionalIds}
                      label={`Practitioners Trained in ${pt.code}`}
                    />

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => onOpenBooking(`Psychotherapy: ${pt.code}`)}
                        className="px-6 py-2.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                      >
                        Enquire About {pt.code} &rarr;
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              03. HYPNOTHERAPY STAGE
          ───────────────────────────────────────────────────────────── */}
          {activePillar === 2 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-[#C8D6C6] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#7D6335] uppercase tracking-wider bg-[#E6EEE3] px-2.5 py-0.5 rounded-full border border-[#C8D6C6]">
                      03. HYPNOTHERAPY
                    </span>
                    <span className="text-xs text-[#556A5E] font-medium">Subconscious Rewiring &amp; Trance</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#173D34]">
                    {servicesCopy.hypnotherapy.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm font-sans tracking-wide text-[#7D6335] font-semibold">
                    {servicesCopy.hypnotherapy.subtitle}
                  </p>
                  <div className="mt-3 space-y-2 text-xs sm:text-sm text-[#465A4F] font-light max-w-3xl leading-relaxed">
                    {servicesCopy.hypnotherapy.intro.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto">
                  <button
                    type="button"
                    onClick={() => onOpenModal("hypnotherapy")}
                    className="px-4 py-2.5 rounded-full border border-[#7D6335]/40 hover:bg-[#7D6335]/10 text-[#7D6335] text-xs font-semibold tracking-wide transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Open Comprehensive Modal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenBooking("Clinical Hypnotherapy")}
                    className="px-5 py-2.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-xs font-semibold tracking-wide shadow-sm transition-all shrink-0 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Book Hypnotherapy</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#DFBD83]" />
                  </button>
                </div>
              </div>

              {/* Hypno Console Tabs */}
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: "pillars", label: "3 Core Pillars" },
                    { id: "brain", label: "Brain Science (3 Changes)" },
                    { id: "stages", label: "What Happens in a Session" },
                    { id: "suitability", label: "Is Hypnotherapy Right for You?" },
                    { id: "transform", label: "Transformation Areas" },
                    { id: "psychologist", label: "Care with a Psychologist" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setHypnoTab(t.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      hypnoTab === t.id
                        ? "bg-[#1E3F35] text-[#DFBD83] font-bold shadow-xs scale-[1.02]"
                        : "bg-[#EAF0E7] text-[#24352D] hover:bg-[#DEE7DB] border border-[#C8D6C6]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Pillars */}
              {hypnoTab === "pillars" && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-[#1E3F35] text-[#F7F5EF] text-center text-xs sm:text-sm font-medium border border-[#DFBD83]/30">
                    <span className="text-[#DFBD83] block uppercase tracking-wider mb-1 font-semibold text-xs">
                      Clinical Transparency
                    </span>
                    {servicesCopy.hypnotherapy.disclaimer}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {servicesCopy.hypnotherapy.pillars.map((p, idx) => (
                      <div key={idx} className="p-6 rounded-2xl bg-[#F4F8F2] border border-[#C8D6C6]">
                        <span className="text-xs font-mono font-bold text-[#7D6335] block mb-1">
                          Pillar 0{idx + 1}
                        </span>
                        <h4 className="font-serif text-lg font-medium text-[#173D34] mb-2">{p.title}</h4>
                        <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Brain Science */}
              {hypnoTab === "brain" && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#F4F8F2] border border-[#C8D6C6] space-y-5">
                  <h4 className="font-serif text-2xl font-normal text-[#173D34]">
                    {servicesCopy.hypnotherapy.brainScience.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                    {servicesCopy.hypnotherapy.brainScience.intro}
                  </p>
                  <span className="text-xs font-semibold text-[#173D34] block uppercase tracking-wider">
                    {servicesCopy.hypnotherapy.brainScience.changesTitle}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {servicesCopy.hypnotherapy.brainScience.changes.map((bc, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white border border-[#C8D6C6]">
                        <span className="text-xs font-mono font-bold text-[#7D6335] block mb-1">Shift 0{idx + 1}</span>
                        <h5 className="font-serif text-base font-medium text-[#173D34] mb-1">{bc.title}</h5>
                        <p className="text-xs text-[#465A4F] font-light leading-relaxed">{bc.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Stages */}
              {hypnoTab === "stages" && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#F4F8F2] border border-[#C8D6C6] space-y-4">
                  <h4 className="font-serif text-2xl font-normal text-[#173D34]">
                    {servicesCopy.hypnotherapy.sessionStages.title}
                  </h4>
                  <div className="space-y-3">
                    {servicesCopy.hypnotherapy.sessionStages.stages.map((st, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white border border-[#C8D6C6]">
                        <span className="text-xs font-mono font-bold text-[#7D6335] block mb-1">STAGE 0{idx + 1}</span>
                        <h5 className="font-serif text-base sm:text-lg font-medium text-[#173D34] mb-1">{st.title}</h5>
                        <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Suitability */}
              {hypnoTab === "suitability" && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#F4F8F2] border border-[#C8D6C6] space-y-4">
                  <h4 className="font-serif text-2xl font-normal text-[#173D34]">
                    {servicesCopy.hypnotherapy.suitability.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                    {servicesCopy.hypnotherapy.suitability.intro}
                  </p>
                  <span className="text-xs font-semibold text-[#173D34] block uppercase tracking-wider">
                    {servicesCopy.hypnotherapy.suitability.heading}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {servicesCopy.hypnotherapy.suitability.items.map((item, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white border border-[#C8D6C6]">
                        <h5 className="font-serif text-base font-medium text-[#173D34] mb-1 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#7D6335] shrink-0 mt-0.5" />
                          <span>{item.title}</span>
                        </h5>
                        <p className="text-xs sm:text-sm text-[#465A4F] font-light pl-6 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: Transform */}
              {hypnoTab === "transform" && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#F4F8F2] border border-[#C8D6C6] space-y-4">
                  <h4 className="font-serif text-2xl font-normal text-[#173D34]">
                    {servicesCopy.hypnotherapy.transformation.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                    {servicesCopy.hypnotherapy.transformation.intro}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {servicesCopy.hypnotherapy.transformation.areas.map((area, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white border border-[#C8D6C6]">
                        <h5 className="font-serif text-base font-medium text-[#173D34] mb-1">{area.title}</h5>
                        <p className="text-xs text-[#465A4F] font-light leading-relaxed">{area.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 6: Psychologist Care */}
              {hypnoTab === "psychologist" && (
                <div className="p-8 rounded-3xl bg-[#1E3F35] text-[#F7F5EF] space-y-4">
                  <h4 className="font-serif text-2xl sm:text-3xl font-light text-white">
                    {servicesCopy.hypnotherapy.psychologistCare.title}
                  </h4>
                  <div className="space-y-3 text-xs sm:text-sm text-[#E8EDE4]/90 font-light leading-relaxed">
                    <p>{servicesCopy.hypnotherapy.psychologistCare.p1}</p>
                    <p>{servicesCopy.hypnotherapy.psychologistCare.p2}</p>
                    <p className="text-[#DFBD83] font-medium">{servicesCopy.hypnotherapy.psychologistCare.p3}</p>
                    <p className="pt-2 text-[11px] text-[#DFBD83]/90 italic border-t border-white/10">
                      *{servicesCopy.hypnotherapy.psychologistCare.disclaimer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              04. ONLINE REHABILITATION STAGE
          ───────────────────────────────────────────────────────────── */}
          {activePillar === 3 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-[#C8D6C6] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#7D6335] uppercase tracking-wider bg-[#E6EEE3] px-2.5 py-0.5 rounded-full border border-[#C8D6C6]">
                      04. ONLINE REHABILITATION
                    </span>
                    <span className="text-xs text-[#556A5E] font-medium">Rebuilding Functional Autonomy</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#173D34]">
                    {servicesCopy.rehabilitation.heading}
                  </h3>
                  <div className="mt-3 space-y-2 text-xs sm:text-sm text-[#465A4F] font-light max-w-3xl leading-relaxed">
                    {servicesCopy.rehabilitation.intro.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto">
                  <button
                    type="button"
                    onClick={() => onOpenModal("rehabilitation")}
                    className="px-4 py-2.5 rounded-full border border-[#7D6335]/40 hover:bg-[#7D6335]/10 text-[#7D6335] text-xs font-semibold tracking-wide transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Open Comprehensive Modal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenBooking("Online Rehabilitation")}
                    className="px-5 py-2.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-xs font-semibold tracking-wide shadow-sm transition-all shrink-0 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Enquire on Rehab</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#DFBD83]" />
                  </button>
                </div>
              </div>

              {/* Rehab Tabs */}
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: "advantages", label: "Why Choose Online Support?" },
                    { id: "offerings", label: "What We Offer Online" },
                    { id: "suitability", label: "Is Online Support Right for You?" },
                    { id: "pathway", label: "How It Works (4 Steps)" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setRehabTab(t.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      rehabTab === t.id
                        ? "bg-[#1E3F35] text-[#DFBD83] font-bold shadow-xs scale-[1.02]"
                        : "bg-[#EAF0E7] text-[#24352D] hover:bg-[#DEE7DB] border border-[#C8D6C6]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {rehabTab === "advantages" && (
                <div className="space-y-5">
                  <div className="p-6 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6] space-y-2">
                    <h5 className="font-serif text-lg font-medium text-[#173D34]">
                      {servicesCopy.rehabilitation.whatIsIt.title}
                    </h5>
                    <p className="text-xs font-sans tracking-wide text-[#7D6335] font-semibold">
                      {servicesCopy.rehabilitation.whatIsIt.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                      {servicesCopy.rehabilitation.whatIsIt.p1}
                    </p>
                    <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                      {servicesCopy.rehabilitation.whatIsIt.p2}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {servicesCopy.rehabilitation.whyChoose.points.map((pt, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-[#F4F8F2] border border-[#C8D6C6]">
                        <h5 className="font-serif text-base font-medium text-[#173D34] mb-1">{pt.title}</h5>
                        <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">{pt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {rehabTab === "offerings" && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#F4F8F2] border border-[#C8D6C6] space-y-4">
                  <h4 className="font-serif text-2xl font-normal text-[#173D34]">
                    {servicesCopy.rehabilitation.whatWeOffer.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#465A4F] font-light">
                    {servicesCopy.rehabilitation.whatWeOffer.intro}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {servicesCopy.rehabilitation.whatWeOffer.items.map((item, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white border border-[#C8D6C6]">
                        <h5 className="font-serif text-base font-medium text-[#173D34] mb-1">{item.title}</h5>
                        <p className="text-xs text-[#465A4F] font-light leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {rehabTab === "suitability" && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#F4F8F2] border border-[#C8D6C6] space-y-4">
                  <h4 className="font-serif text-2xl font-normal text-[#173D34]">
                    {servicesCopy.rehabilitation.suitability.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#465A4F] font-light">
                    {servicesCopy.rehabilitation.suitability.intro}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {servicesCopy.rehabilitation.suitability.items.map((item, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white border border-[#C8D6C6]">
                        <h5 className="font-serif text-base font-medium text-[#173D34] mb-1">{item.title}</h5>
                        <p className="text-xs text-[#465A4F] font-light leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {rehabTab === "pathway" && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#F4F8F2] border border-[#C8D6C6] space-y-4">
                  <h4 className="font-serif text-2xl font-normal text-[#173D34]">
                    {servicesCopy.rehabilitation.howItWorks.title}
                  </h4>
                  <div className="space-y-3">
                    {servicesCopy.rehabilitation.howItWorks.steps.map((st, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white border border-[#C8D6C6]">
                        <h5 className="font-serif text-base font-medium text-[#173D34] mb-1">{st.step}</h5>
                        <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              05. RENEWAL STAGE
          ───────────────────────────────────────────────────────────── */}
          {activePillar === 4 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-[#C8D6C6] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#7D6335] uppercase tracking-wider bg-[#E6EEE3] px-2.5 py-0.5 rounded-full border border-[#C8D6C6]">
                      05. RENEWAL
                    </span>
                    <span className="text-xs text-[#556A5E] font-medium">Restorative Reset</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#173D34]">
                    {servicesCopy.renewal.heading}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm font-sans tracking-wide text-[#7D6335] font-semibold">
                    {servicesCopy.renewal.tagline}
                  </p>
                  <div className="mt-3 space-y-2 text-xs sm:text-sm text-[#465A4F] font-light max-w-3xl leading-relaxed">
                    <p>{servicesCopy.renewal.feelingStuck.p1}</p>
                    <p>{servicesCopy.renewal.feelingStuck.p2}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto">
                  <button
                    type="button"
                    onClick={() => onOpenModal("renewal")}
                    className="px-4 py-2.5 rounded-full border border-[#7D6335]/40 hover:bg-[#7D6335]/10 text-[#7D6335] text-xs font-semibold tracking-wide transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Open Comprehensive Modal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenBooking("Renewal Programme")}
                    className="px-5 py-2.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-xs font-semibold tracking-wide shadow-sm transition-all shrink-0 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Begin Renewal</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#DFBD83]" />
                  </button>
                </div>
              </div>

              {/* Renewal Tabs */}
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: "phases", label: "Our Approach (3 Phases)" },
                    { id: "candidates", label: "Who Can Benefit?" },
                    { id: "process", label: "Process Overview (4 Steps)" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setRenewalTab(t.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      renewalTab === t.id
                        ? "bg-[#1E3F35] text-[#DFBD83] font-bold shadow-xs scale-[1.02]"
                        : "bg-[#EAF0E7] text-[#24352D] hover:bg-[#DEE7DB] border border-[#C8D6C6]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {renewalTab === "phases" && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-[#E6EEE3] text-center font-mono text-xs text-[#173D34] font-semibold">
                    {servicesCopy.renewal.approach.flow}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {servicesCopy.renewal.approach.phases.map((ph, idx) => (
                      <div key={idx} className="p-6 rounded-2xl bg-[#F4F8F2] border border-[#C8D6C6] flex flex-col justify-between">
                        <div>
                          <span className="font-serif text-3xl font-light text-[#9E783E] block mb-1">
                            0{idx + 1}
                          </span>
                          <h5 className="font-serif text-xl font-medium text-[#173D34] mb-3">{ph.name}</h5>
                          <div className="space-y-2">
                            {ph.points.map((pt, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-[#384D42]">
                                <Check className="w-3.5 h-3.5 text-[#7D6335] shrink-0 mt-0.5" />
                                <span className="font-light leading-relaxed">{pt}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {renewalTab === "candidates" && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#F4F8F2] border border-[#C8D6C6] space-y-4">
                  <h4 className="font-serif text-2xl font-normal text-[#173D34]">
                    {servicesCopy.renewal.whoCanBenefit.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#465A4F] font-light">
                    {servicesCopy.renewal.whoCanBenefit.intro}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {servicesCopy.renewal.whoCanBenefit.items.map((item, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white border border-[#C8D6C6]">
                        <h5 className="font-serif text-base font-medium text-[#173D34] mb-1">{item.title}</h5>
                        <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {renewalTab === "process" && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#F4F8F2] border border-[#C8D6C6] space-y-4">
                  <h4 className="font-serif text-2xl font-normal text-[#173D34]">
                    {servicesCopy.renewal.processOverview.title}
                  </h4>
                  <div className="space-y-3">
                    {servicesCopy.renewal.processOverview.steps.map((st, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white border border-[#C8D6C6]">
                        <h5 className="font-serif text-base font-medium text-[#173D34] mb-1">{st.step}</h5>
                        <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              06. SPIRITUAL PRACTICES STAGE
          ───────────────────────────────────────────────────────────── */}
          {activePillar === 5 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-[#C8D6C6] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#7D6335] uppercase tracking-wider bg-[#E6EEE3] px-2.5 py-0.5 rounded-full border border-[#C8D6C6]">
                      06. SPIRITUAL PRACTICES
                    </span>
                    <span className="text-xs text-[#556A5E] font-medium">Optional &amp; Belief-Aligned</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#173D34]">
                    {servicesCopy.spiritual.heading}
                  </h3>
                  <div className="mt-3 space-y-2 text-xs sm:text-sm text-[#465A4F] font-light max-w-3xl leading-relaxed">
                    {servicesCopy.spiritual.intro.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto">
                  <button
                    type="button"
                    onClick={() => onOpenModal("spiritual")}
                    className="px-4 py-2.5 rounded-full border border-[#7D6335]/40 hover:bg-[#7D6335]/10 text-[#7D6335] text-xs font-semibold tracking-wide transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Open Comprehensive Modal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenBooking("Spiritual Practices Inquiry")}
                    className="px-5 py-2.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-xs font-semibold tracking-wide shadow-sm transition-all shrink-0 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Enquire on Practices</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#DFBD83]" />
                  </button>
                </div>
              </div>

              {/* Disclaimer Notice */}
              <div className="p-4 rounded-2xl bg-[#E4EDE1] border border-[#B8C9B5] text-xs sm:text-sm text-[#2D4438] leading-relaxed">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7D6335] block mb-1">
                  Important Notice
                </span>
                <p className="font-light">{servicesCopy.spiritual.disclaimer}</p>
              </div>

              {/* Modality Selector */}
              <div className="flex flex-wrap gap-2">
                {servicesCopy.spiritual.modalities.map((m, idx) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSpiritualIndex(idx)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      spiritualIndex === idx
                        ? "bg-[#1E3F35] text-[#DFBD83] font-bold shadow-xs scale-[1.02]"
                        : "bg-[#EAF0E7] text-[#24352D] hover:bg-[#DEE7DB] border border-[#C8D6C6]"
                    }`}
                  >
                    {m.title}
                  </button>
                ))}
              </div>

              {(() => {
                const item = servicesCopy.spiritual.modalities[spiritualIndex];
                return (
                  <div className="p-8 rounded-3xl bg-[#F4F8F2] border border-[#C8D6C6] space-y-5">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
                        Consciousness Exploration
                      </span>
                      <h4 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#7D6335] font-semibold italic">
                        {item.quote}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-[#465A4F] font-light leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="p-5 rounded-2xl bg-white border border-[#C8D6C6]">
                      <span className="text-xs font-semibold text-[#173D34] block mb-1 uppercase tracking-wider">
                        The Epigenetic &amp; Science Connection:
                      </span>
                      <p className="text-xs sm:text-sm text-[#384D42] font-light leading-relaxed">
                        {item.epigeneticConnection}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-[#173D34] block mb-2.5 uppercase tracking-wider">
                        How This Helps You:
                      </span>
                      <div className="space-y-2">
                        {item.howItHelps.map((h, i) => (
                          <div key={i} className="p-3 rounded-xl bg-white border border-[#C8D6C6] text-xs sm:text-sm text-[#24352D] flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-[#7D6335] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              07. TREATMENT & SUPPORT PLANS STAGE
          ───────────────────────────────────────────────────────────── */}
          {activePillar === 6 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-[#C8D6C6] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#7D6335] uppercase tracking-wider bg-[#E6EEE3] px-2.5 py-0.5 rounded-full border border-[#C8D6C6]">
                      07. TREATMENT &amp; SUPPORT PLANS
                    </span>
                    <span className="text-xs text-[#556A5E] font-medium">Personalised Formats</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#173D34]">
                    {servicesCopy.supportPlans.heading}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#465A4F] font-light max-w-3xl leading-relaxed">
                    {servicesCopy.supportPlans.intro}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto">
                  <button
                    type="button"
                    onClick={() => onOpenModal("plans")}
                    className="px-4 py-2.5 rounded-full border border-[#7D6335]/40 hover:bg-[#7D6335]/10 text-[#7D6335] text-xs font-semibold tracking-wide transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Open Comprehensive Modal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenBooking("Treatment Plans Consultation")}
                    className="px-5 py-2.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-xs font-semibold tracking-wide shadow-sm transition-all shrink-0 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Select a Plan</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#DFBD83]" />
                  </button>
                </div>
              </div>

              {/* 5 Formats Pills */}
              <div className="flex flex-wrap gap-2">
                {servicesCopy.supportPlans.formats.map((f, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPlanIndex(idx)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      planIndex === idx
                        ? "bg-[#1E3F35] text-[#DFBD83] font-bold shadow-xs scale-[1.02]"
                        : "bg-[#EAF0E7] text-[#24352D] hover:bg-[#DEE7DB] border border-[#C8D6C6]"
                    }`}
                  >
                    Format 0{idx + 1}
                  </button>
                ))}
              </div>

              {/* Active Plan Format */}
              {(() => {
                const plan = servicesCopy.supportPlans.formats[planIndex];
                return (
                  <div className="p-8 rounded-3xl bg-[#F4F8F2] border border-[#C8D6C6] space-y-5">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#7D6335] uppercase tracking-wider block mb-1">
                        CARE FORMAT 0{planIndex + 1} OF 05
                      </span>
                      <h4 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
                        {plan.title}
                      </h4>
                    </div>

                    <p className="text-sm sm:text-base text-[#465A4F] font-light leading-relaxed">
                      {plan.desc}
                    </p>

                    {plan.suitableFor && (
                      <div className="p-4 rounded-xl bg-white border border-[#C8D6C6] text-xs sm:text-sm">
                        <span className="font-semibold text-[#173D34] block mb-1">Suitable for:</span>
                        <p className="text-[#384D42] font-light">{plan.suitableFor}</p>
                      </div>
                    )}

                    {plan.usefulFor && (
                      <div className="p-5 rounded-2xl bg-white border border-[#C8D6C6]">
                        <span className="font-semibold text-xs text-[#173D34] block mb-2 uppercase tracking-wider">
                          These can be useful for:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#24352D]">
                          {plan.usefulFor.map((u, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-[#7D6335] shrink-0" />
                              <span>{u}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Crisis Intervention Warning Notice */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#FFF9F5] border-2 border-[#D97706]/30 space-y-4">
                <div className="flex items-center gap-2 text-[#D97706] font-semibold text-xs tracking-wider uppercase">
                  <AlertTriangle className="w-5 h-5" />
                  <span>{servicesCopy.supportPlans.crisis.title}</span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-[#59675F] font-light leading-relaxed">
                  <p>{servicesCopy.supportPlans.crisis.p1}</p>
                  <p>{servicesCopy.supportPlans.crisis.p2}</p>
                  <p className="font-medium text-[#173D34]">{servicesCopy.supportPlans.crisis.warning}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                  {servicesCopy.supportPlans.crisis.helplines.map((hl) => (
                    <div key={hl.name} className="p-3.5 rounded-xl bg-white border border-[#D97706]/20 flex flex-col justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-[#7D6335] uppercase font-bold block mb-0.5">{hl.name}</span>
                        <span className="font-bold text-[#173D34] text-sm block">{hl.number}</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-[#E8EDE4] flex items-center justify-between">
                        <span className="text-[10px] text-[#59675F] font-light truncate">{hl.note}</span>
                        {hl.tel && (
                          <a href={`tel:${hl.tel}`} className="text-[#D97706] font-semibold flex items-center gap-1 hover:underline ml-1">
                            <PhoneCall className="w-3 h-3" />
                            <span>Call</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Not sure which service is right for you Decision Helper */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#173D34] text-white text-center space-y-4">
                <h4 className="font-serif text-2xl sm:text-3xl font-light text-[#F7F5EF]">
                  {servicesCopy.supportPlans.decisionHelper.title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#E8EDE4]/90 font-light max-w-xl mx-auto leading-relaxed">
                  {servicesCopy.supportPlans.decisionHelper.desc}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenBooking("Treatment Plans Consultation")}
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#DFBD83] hover:bg-[#c9a76d] text-[#102E27] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    BOOK A CONSULTATION
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

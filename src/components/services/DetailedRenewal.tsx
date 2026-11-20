"use client";

import React, { useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import ServiceDetailModal from "@/components/services/ServiceDetailModal";

interface DetailedRenewalProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function DetailedRenewal({ onOpenBooking }: DetailedRenewalProps) {
  const [selectedPhaseNum, setSelectedPhaseNum] = useState<string | null>(null);
  const [isRenewalPathwayOpen, setIsRenewalPathwayOpen] = useState(false);

  const renewalPhases = [
    {
      num: "01",
      name: "REFLECT",
      tagline: "Understand Your Story & Patterns",
      points: [
        "Understand Your Story: Unpack the experiences, life changes, or chronic stressors that have brought you to this point.",
        "Identify Patterns: Recognize underlying cognitive habits, emotional triggers, and relational patterns that may be keeping you feeling stuck.",
        "Process & Deconstruct: Create a safe space to process grief, frustration, or burnout without judgment.",
      ],
    },
    {
      num: "02",
      name: "RECONNECT",
      tagline: "Anchor in Values & Inner Agency",
      points: [
        "Anchor in Core Values: Realign with what truly matters to you, independent of external pressure or past expectations.",
        "Restore Self-Agency: Rebuild trust in your innate strengths, resilience, and decision-making capacity.",
        "Grounding & Regulation: Learn mind-body regulation techniques to restore emotional balance and calm the nervous system.",
      ],
    },
    {
      num: "03",
      name: "REBUILD",
      tagline: "Actionable Skills & Long-Term Resilience",
      points: [
        "Practical Coping Skills: Equip yourself with evidence-based strategies (CBT, ACT, and mindfulness-based approaches) tailored to your daily life.",
        "Sustainable Habits: Create healthier routines, set clear boundaries, and adopt adaptive responses to stress.",
        "Long-Term Resilience: Establish concrete relapse-prevention tools so you can maintain progress across home, work, and personal spaces.",
      ],
    },
  ];

  const whoCanBenefit = [
    {
      title: "Life Transitions & Identity Shifts",
      desc: "Adjusting to major life, career, or academic changes.",
    },
    {
      title: "Burnout & Chronic Stress",
      desc: "Recovering emotional energy and establishing healthy work-life boundaries.",
    },
    {
      title: "Unhelpful Behavioral or Thought Patterns",
      desc: "Overcoming persistent self-doubt, perfectionism, or avoidant coping styles.",
    },
    {
      title: "Post-Disruption Rehabilitation",
      desc: "Rebuilding self-confidence and functionality following emotional distress or health challenges.",
    },
  ];

  const renewalSteps = [
    {
      step: "01",
      title: "Initial Assessment",
      desc: "A comprehensive intake session to understand your context, concerns, and goals.",
    },
    {
      step: "02",
      title: "Collaborative Plan",
      desc: "Co-creating a personalized therapeutic roadmap using the Reflect-Reconnect-Rebuild framework.",
    },
    {
      step: "03",
      title: "Structured Sessions",
      desc: "Regular 1-on-1 sessions incorporating evidence-based therapeutic techniques and practical exercises.",
    },
    {
      step: "04",
      title: "Integration & Growth",
      desc: "Reviewing progress, fine-tuning daily coping strategies, and fostering long-term independence.",
    },
  ];

  const activePhase = renewalPhases.find((p) => p.num === selectedPhaseNum);

  return (
    <section id="renewal" className="py-16 lg:py-24 bg-[#F4F7F2] border-b border-[#C8D6C6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#9E783E]" />
            <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
              05. RENEWAL
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            A space for{" "}
            <span className="italic text-[#7D6335]">starting again.</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base font-sans tracking-wide text-[#7D6335] font-semibold">
            Reconnect with your strengths, break unhelpful patterns, and rebuild a resilient path forward.
          </p>

          <div className="mt-5 p-6 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6] text-xs sm:text-sm text-[#3F5448] font-light leading-relaxed space-y-3">
            <h4 className="font-serif text-lg font-medium text-[#173D34]">
              Feeling Stuck in Old Patterns?
            </h4>
            <p>
              Life transitions, burnout, health changes, or prolonged stress can leave us feeling disconnected from who we are. It is common to find yourself relying on habits, thought patterns, or emotional responses that once protected you, but no longer serve your present wellbeing.
            </p>
            <p>
              Renewal is a dedicated, client-centered service designed to help you navigate life transitions, regain psychological clarity, and rebuild a fulfilling sense of purpose and autonomy. It represents our core approach to helping individuals reconnect with themselves, understand what may no longer be working, and begin creating healthier, sustainable patterns for the future.
            </p>
          </div>
        </div>

        {/* 3 Phases Grid */}
        <div className="mb-10">
          <div className="max-w-2xl mb-6">
            <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
              Structured Integrative Framework
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173D34]">
              Our Approach to Renewal
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renewalPhases.map((phase) => (
              <div key={phase.num} className="p-6 sm:p-7 rounded-3xl bg-[#E6EEE3] border border-[#C8D6C6] hover:border-[#9E783E] shadow-xs flex flex-col justify-between transition-all">
                <div>
                  <span className="font-serif text-3xl font-light text-[#9E783E] block mb-1">
                    {phase.num}
                  </span>
                  <h4 className="font-serif text-xl font-medium text-[#173D34] mb-1">
                    {phase.name}
                  </h4>
                  <p className="text-xs text-[#7D6335] font-semibold mb-3">
                    {phase.tagline}
                  </p>

                  <div className="space-y-2 text-xs text-[#384D42] leading-relaxed mb-4">
                    {phase.points.slice(0, 2).map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#7D6335] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPhaseNum(phase.num)}
                  className="inline-flex items-center justify-between w-full pt-3 border-t border-[#C8D6C6] text-xs font-semibold text-[#173D34] hover:text-[#7D6335] transition-colors cursor-pointer"
                >
                  <span>View Phase Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7D6335]" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Combined Pathway & Benefit Actions Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#EAF0E7] border border-[#C8D6C6] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-xl font-medium text-[#173D34] mb-1">
              Candidate Guidance &amp; 4-Step Process Overview
            </h4>
            <p className="text-xs sm:text-sm text-[#465A4F] font-light">
              Discover who can benefit from renewal and review our structured 4-step intake-to-growth process.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsRenewalPathwayOpen(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#DEE7DB] hover:bg-[#D7E3D3] text-[#173D34] text-xs font-semibold tracking-wide border border-[#B8C9B5] transition-colors cursor-pointer"
            >
              <span>View Full Roadmap</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#7D6335]" />
            </button>
            <button
              type="button"
              onClick={() => onOpenBooking("Renewal Programme")}
              className="px-6 py-2.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-xs font-semibold tracking-wide transition-colors cursor-pointer whitespace-nowrap"
            >
              Begin Journey &rarr;
            </button>
          </div>
        </div>

      </div>

      {/* MODAL: RENEWAL PHASE DETAILS (EXACT CONTENT) */}
      {activePhase && (
        <ServiceDetailModal
          isOpen={!!selectedPhaseNum}
          onClose={() => setSelectedPhaseNum(null)}
          title={`Phase ${activePhase.num}: ${activePhase.name}`}
          badge="Renewal Approach"
          tagline={activePhase.tagline}
          onBook={() => onOpenBooking(`Renewal: Phase ${activePhase.num}`)}
          bookLabel="Begin Renewal Journey"
        >
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium text-[#173D34]">
              Phase Framework &amp; Focus Areas:
            </h4>
            <div className="space-y-3">
              {activePhase.points.map((pt, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6] flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#7D6335] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#384D42] font-light leading-relaxed">{pt}</p>
                </div>
              ))}
            </div>
          </div>
        </ServiceDetailModal>
      )}

      {/* MODAL: RENEWAL ROADMAP & SUITABILITY (EXACT CONTENT) */}
      <ServiceDetailModal
        isOpen={isRenewalPathwayOpen}
        onClose={() => setIsRenewalPathwayOpen(false)}
        title="Renewal: Candidate Guidance & Process Overview"
        badge="Integrative Pathway"
        tagline="A comprehensive client-centered service for rebuilding clarity and autonomy."
        onBook={() => onOpenBooking("Renewal Programme")}
        bookLabel="Begin Renewal Journey"
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-serif text-xl font-medium text-[#173D34] mb-2">
              Who Can Benefit?
            </h4>
            <p className="text-xs sm:text-sm text-[#465A4F] mb-4 font-light">
              This service is ideal for individuals navigating:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whoCanBenefit.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
                  <h5 className="font-serif text-base font-medium text-[#173D34] mb-1">
                    {item.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#C8D6C6]">
            <h4 className="font-serif text-xl font-medium text-[#173D34] mb-4">
              Process Overview
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renewalSteps.map((s) => (
                <div key={s.step} className="p-4 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
                  <span className="font-serif text-2xl font-light text-[#9E783E] block mb-1">
                    {s.step}
                  </span>
                  <h5 className="font-serif text-base font-medium text-[#173D34] mb-1">
                    {s.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ServiceDetailModal>
    </section>
  );
}

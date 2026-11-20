"use client";

import React, { useState } from "react";
import { Check, ArrowUpRight, ShieldCheck } from "lucide-react";
import ServiceDetailModal from "@/components/services/ServiceDetailModal";

interface DetailedSpiritualPracticesProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function DetailedSpiritualPractices({ onOpenBooking }: DetailedSpiritualPracticesProps) {
  const [selectedSpiritualId, setSelectedSpiritualId] = useState<string | null>(null);

  const spiritualModalities = [
    {
      id: "transpersonal",
      title: "Transpersonal Therapy",
      tagline: "Going Beyond the Surface Self to Find Deeper Meaning",
      desc: "Transpersonal Therapy expands traditional psychological frameworks to include the full spectrum of human experience—integrating mental, emotional, somatic, and spiritual aspects of life.",
      epigeneticConnection:
        "Research in psychoneuroimmunology shows that moving beyond ego-driven stress into states of 'self-transcendence,' connection, and deep inner meaning reduces systemic stress markers, shifts brainwave activity (Theta/Alpha), and promotes neuroplasticity.",
      benefits: [
        "Cultivates deep self-awareness and a sense of purpose.",
        "Helps integrate unexplainable life experiences, existential anxiety, or spiritual crises.",
        "Fosters holistic alignment between your daily actions and your core inner values.",
      ],
    },
    {
      id: "plrt",
      title: "Past Life Regression Therapy (PLRT)",
      tagline: "Exploring Subconscious Metaphors & Deep Origin Events",
      desc: "Past Life Regression utilizes gentle, focused trance and deep relaxation (hypnotic state) to allow the subconscious mind to retrieve symbolic narratives, memories, or impressions stored deep within the psyche.",
      epigeneticConnection:
        "Whether viewed through the lens of soul continuity or as subconscious somatic metaphors, the emotional release experienced in regression work is biologically real. Releasing deeply stored emotional charge shifts stress signaling pathways, helping the nervous system step out of chronic 'fight-or-flight' modes.",
      benefits: [
        "Provides symbolic resolution for unexplained phobias, recurring emotional blocks, or relationship patterns.",
        "Facilitates somatic and emotional catharsis for long-held internal tension.",
        "Offers fresh perspectives on current life struggles through sub-conscious narrative exploration.",
      ],
    },
    {
      id: "lbl",
      title: "Life Between Lives (LBL) Therapy",
      tagline: "Uncovers Life Purpose, Soul Contracts, and Universal Clarity",
      desc: "Building upon deep hypnotic states, Life Between Lives therapy guides individuals into a state of super-conscious awareness to explore themes of soul identity, personal life lessons, and overarching existence beyond physical form.",
      epigeneticConnection:
        "Epigenetics emphasizes the power of perception. When an individual gains a profound, expansive perspective on their life’s purpose, their chronic stress response collapses, replaced by deep emotional safety, coherence, and physiological calm.",
      benefits: [
        "Clarifies your overriding life purpose, career choices, and personal challenges.",
        "Brings peace, comfort, and existential clarity regarding mortality and grief.",
        "Re-aligns your daily living with long-term emotional resilience and higher clarity.",
      ],
    },
  ];

  const activeSpiritual = spiritualModalities.find((m) => m.id === selectedSpiritualId);

  return (
    <section id="spiritual-practices" className="py-16 lg:py-24 bg-[#EBF1E8] border-b border-[#C8D6C6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#9E783E]" />
            <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
              06. SPIRITUAL PRACTICES
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Exploration of Inner{" "}
            <span className="italic text-[#7D6335]">Consciousness &amp; Meaning.</span>
          </h2>

          <div className="mt-5 space-y-3 font-sans text-sm sm:text-base text-[#3F5448] leading-relaxed font-light">
            <p>
              At Nair’s Epigenetic Wellness, our core therapeutic services are rooted in evidence-based psychological, neurological, and scientific frameworks.
            </p>
            <p className="text-[#173D34] font-medium">
              However, modern epigenetics demonstrates a powerful truth: Our biological and emotional health is deeply influenced by our core beliefs, perceptions, and internal narratives.
            </p>
            <p>
              We recognize that true healing is not one-size-fits-all. We believe that true healing happens when therapy respects who you are and what you believe. For clients who find deep meaning in spiritual, transpersonal, or subconscious exploration, working within their own belief system creates a profound emotional relief, cellular calm and inner transformation.
            </p>
          </div>
        </div>

        {/* Essential Transparency & Selective Notice */}
        <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-[#E4EDE1] border border-[#B8C9B5] text-xs sm:text-sm text-[#2D4438] leading-relaxed">
          <div className="flex items-center gap-2 text-[#7D6335] font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Optional, Belief-Aligned Modalities</span>
          </div>
          <p className="font-light">
            <strong>Please note:</strong> The therapies listed in this specific section are optional, belief-aligned, and selective modalities. They are tailored exclusively for clients who explicitly request or resonate with these approaches as part of their personal self-exploration journey. These practices are non-clinical, non-medical, and designed to complement and not to replace standard medical or psychological treatment.
          </p>
        </div>

        {/* 3 Modalities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spiritualModalities.map((item) => (
            <div key={item.id} className="p-6 sm:p-7 rounded-3xl bg-[#F2F6F0] border border-[#C8D6C6] hover:border-[#9E783E] shadow-xs flex flex-col justify-between transition-all">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
                  Consciousness Exploration
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#173D34] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#7D6335] font-semibold italic mb-3">
                  &ldquo;{item.tagline}&rdquo;
                </p>

                <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed mb-4 line-clamp-3">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#C8D6C6] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSpiritualId(item.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#173D34] hover:text-[#7D6335] bg-[#DEE7DB] hover:bg-[#D7E3D3] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  <span>Explore Practice &amp; Science</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7D6335]" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenBooking(`Spiritual Practice: ${item.title}`)}
                  className="text-xs font-semibold text-[#1E3F35] hover:text-[#7D6335] transition-colors cursor-pointer"
                >
                  <span>Enquire</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* MODAL: SPIRITUAL MODALITY (EXACT CONTENT) */}
      {activeSpiritual && (
        <ServiceDetailModal
          isOpen={!!selectedSpiritualId}
          onClose={() => setSelectedSpiritualId(null)}
          title={activeSpiritual.title}
          badge="Consciousness Exploration"
          tagline={`“${activeSpiritual.tagline}”`}
          onBook={() => onOpenBooking(`Spiritual Practice: ${activeSpiritual.title}`)}
          bookLabel="Enquire About This Practice"
        >
          <div className="space-y-6">
            <p className="text-[#3F5448] font-light leading-relaxed text-base">
              {activeSpiritual.desc}
            </p>

            {/* Epigenetic & Mind-Body Connection Box */}
            <div className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
              <span className="text-xs font-semibold text-[#173D34] block mb-1 uppercase tracking-wider">
                The Epigenetic &amp; Mind-Body Connection:
              </span>
              <p className="text-sm text-[#384D42] font-light leading-relaxed">
                {activeSpiritual.epigeneticConnection}
              </p>
            </div>

            {/* How It Helps You */}
            <div>
              <span className="text-xs font-semibold text-[#173D34] block mb-3 uppercase tracking-wider">
                How This Helps You:
              </span>
              <div className="space-y-3">
                {activeSpiritual.benefits.map((b, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#EAF0E7] border border-[#C8D6C6] text-sm text-[#24352D] flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#7D6335] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ServiceDetailModal>
      )}
    </section>
  );
}

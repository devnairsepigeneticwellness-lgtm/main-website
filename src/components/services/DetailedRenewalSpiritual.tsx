"use client";

import React from "react";
import { Compass, Sun, Heart, Sparkles, Check, ArrowUpRight, ShieldCheck, ArrowRight, ShieldAlert } from "lucide-react";

interface DetailedRenewalSpiritualProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function DetailedRenewalSpiritual({ onOpenBooking }: DetailedRenewalSpiritualProps) {
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

  return (
    <div className="space-y-0">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: RENEWAL
      ───────────────────────────────────────────────────────────── */}
      <section id="renewal" className="py-20 lg:py-28 bg-[#F4F7F2] border-b border-[#C8D6C6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#9E783E]" />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
                RENEWAL
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

          {/* Our Approach to Renewal: 01. REFLECT -> 02. RECONNECT -> 03. REBUILD */}
          <div className="mb-16">
            <div className="max-w-2xl mb-8">
              <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
                Structured Integrative Framework
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173D34]">
                Our Approach to Renewal
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renewalPhases.map((phase) => (
                <div key={phase.num} className="p-7 rounded-3xl bg-[#E6EEE3] border border-[#C8D6C6] shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="font-serif text-3xl font-light text-[#9E783E] block mb-1">
                      {phase.num}
                    </span>
                    <h4 className="font-serif text-xl font-medium text-[#173D34] mb-1">
                      {phase.name}
                    </h4>
                    <p className="text-xs text-[#7D6335] font-semibold mb-4">
                      {phase.tagline}
                    </p>

                    <div className="space-y-3 text-xs text-[#384D42] leading-relaxed">
                      {phase.points.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#7D6335] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Who Can Benefit? */}
          <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-[#EAF0E7] border border-[#C8D6C6]">
            <div className="max-w-2xl mb-8">
              <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
                Candidate Guidance
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173D34]">
                Who Can Benefit?
              </h3>
              <p className="text-xs sm:text-sm text-[#465A4F] mt-2 font-light">
                This service is ideal for individuals navigating:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whoCanBenefit.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6]">
                  <h4 className="font-serif text-lg font-medium text-[#173D34] mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Process Overview Table */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#E6EEE3] border border-[#C8D6C6]">
            <div className="max-w-2xl mb-8">
              <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
                Step-by-Step Pathway
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173D34]">
                Process Overview
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {renewalSteps.map((s) => (
                <div key={s.step} className="p-6 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6] flex flex-col justify-between">
                  <div>
                    <span className="font-serif text-3xl font-light text-[#9E783E] block mb-2">
                      {s.step}
                    </span>
                    <h4 className="font-serif text-lg font-medium text-[#173D34] mb-2">
                      {s.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#C8D6C6] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#556A5E]">
                Comprehensive 1-on-1 personalized renewal program
              </span>
              <button
                onClick={() => onOpenBooking("Renewal Programme")}
                className="px-6 py-2.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
              >
                Begin Renewal Journey &rarr;
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: SPIRITUAL PRACTICES
      ───────────────────────────────────────────────────────────── */}
      <section id="spiritual-practices" className="py-20 lg:py-28 bg-[#EBF1E8] border-b border-[#C8D6C6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#9E783E]" />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
                SPIRITUAL PRACTICES
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
          <div className="mb-14 p-6 sm:p-7 rounded-2xl bg-[#E4EDE1] border border-[#B8C9B5] text-xs sm:text-sm text-[#2D4438] leading-relaxed">
            <div className="flex items-center gap-2 text-[#7D6335] font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Optional, Belief-Aligned Modalities</span>
            </div>
            <p className="font-light">
              <strong>Please note:</strong> The therapies listed in this specific section are optional, belief-aligned, and selective modalities. They are tailored exclusively for clients who explicitly request or resonate with these approaches as part of their personal self-exploration journey. These practices are non-clinical, non-medical, and designed to complement and not to replace standard medical or psychological treatment.
            </p>
          </div>

          {/* 3 Modalities Cards */}
          <div className="space-y-8">
            {spiritualModalities.map((item) => (
              <div key={item.id} className="p-8 sm:p-10 rounded-3xl bg-[#F2F6F0] border border-[#C8D6C6] shadow-xs">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
                      Consciousness Exploration
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#7D6335] font-semibold italic mt-1">
                      &ldquo;{item.tagline}&rdquo;
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenBooking(`Spiritual Practice: ${item.title}`)}
                    className="shrink-0 px-5 py-2.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-xs font-semibold tracking-wide transition-colors cursor-pointer self-start"
                  >
                    Enquire &rarr;
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed mb-5">
                  {item.desc}
                </p>

                {/* Epigenetic & Mind-Body Connection Box */}
                <div className="mb-5 p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
                  <span className="text-xs font-semibold text-[#173D34] block mb-1">
                    The Epigenetic &amp; Mind-Body Connection:
                  </span>
                  <p className="text-xs text-[#384D42] font-light leading-relaxed">
                    {item.epigeneticConnection}
                  </p>
                </div>

                {/* How It Helps You */}
                <div>
                  <span className="text-xs font-semibold text-[#173D34] block mb-2.5">
                    How This Helps You:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {item.benefits.map((b, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#EAF0E7] border border-[#C8D6C6] text-xs text-[#24352D] flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#7D6335] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, Dna, HeartHandshake, Leaf, Shield, Sparkles } from "lucide-react";

export default function AboutSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const pillars = [
    {
      num: "01",
      title: "Understand the Person",
      tagline: "The Whole Individual Context",
      desc: "We look beyond symptoms or isolated labels to understand your life story, personal values, family dynamics, social environment, and unique emotional makeup.",
      detail:
        "Every individual lives within a complex web of relationships and experiences. By taking the time to listen deeply, we build a safe, respectful space free of judgment.",
    },
    {
      num: "02",
      title: "Understand the Patterns",
      tagline: "Clarity Over Automatic Reactions",
      desc: "Identifying habitual thinking traps, emotional triggers, unhelpful coping mechanisms, and relationship cycles that may be keeping you stuck.",
      detail:
        "Through evidence-based models like Cognitive Behavioural Therapy and mindfulness, you discover how recurring loops develop and how to observe them with objectivity.",
    },
    {
      num: "03",
      title: "Develop Practical Skills",
      tagline: "Translating Insights Into Daily Tools",
      desc: "Moving beyond intellectual theory into experiential practices: nervous system regulation, cognitive reframing, assertive boundary-setting, and distress tolerance.",
      detail:
        "Therapy is most effective when it provides dependable tools you can turn to during high-stress moments at work, in relationships, or within personal solitude.",
    },
    {
      num: "04",
      title: "Create Meaningful Change",
      tagline: "Sustainable Transformation",
      desc: "Cultivating resilience, emotional independence, healthier relationship dynamics, and renewed alignment with what truly matters to you in life.",
      detail:
        "True wellbeing is not merely the absence of distress, but living with agency, calm discernment, vitality, and deep internal peace.",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F7F5EF] relative overflow-hidden">
      {/* Decorative Gold & Botanical Lines */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8EDE4]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B58B50]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#B58B50]" />
            <span className="text-xs font-semibold tracking-[0.22em] text-[#B58B50] uppercase font-sans">
              About Nair&apos;s Epigenetic Wellness
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Understanding you. Supporting change.{" "}
            <span className="italic text-[#B58B50] block mt-1">Enabling lifelong wellbeing.</span>
          </h2>

          <p className="mt-6 font-sans text-base sm:text-lg text-[#59675F] leading-relaxed font-light">
            At Nair&apos;s Epigenetic Wellness (N.E.W.), we believe wellbeing begins with understanding
            the experiences, patterns, and environments that shape how we think, feel, and relate.
            Our approach combines clinical psychology, cognitive behavioural therapies, clinical hypnotherapy,
            and mindfulness into an integrative, person-centred pathway.
          </p>
        </div>

        {/* The Epigenetic Wellness Insight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Left: What is Epigenetic Wellness? */}
          <div className="lg:col-span-7 bg-[#E8EDE4]/50 border border-[#B58B50]/20 rounded-3xl p-8 sm:p-10 lg:p-12 relative shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center">
                <Dna className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold tracking-[0.16em] uppercase text-[#B58B50]">
                  The Science of Adaptability
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#173D34]">
                  What is Epigenetic Wellness?
                </h3>
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#24352D] leading-relaxed mb-6 font-light">
              In biological science, <em className="font-medium text-[#173D34] not-italic">epigenetics</em> demonstrates
              that while our DNA code remains constant, how our genes express themselves is profoundly influenced
              by our psychological environment: thoughts, emotional stress, lifestyle, relationships, and learned patterns of coping.
            </p>

            <blockquote className="border-l-2 border-[#B58B50] pl-5 my-6 italic font-serif text-base sm:text-lg text-[#173D34] font-normal">
              &ldquo;Understanding is where meaningful change begins. By transforming how we respond to life&apos;s
              challenges, we help rewrite our psychological and physiological patterns.&rdquo;
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#B58B50]/20">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B58B50] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#24352D]">
                  <strong className="font-semibold block text-[#173D34]">Bio-Psycho-Social Model</strong>
                  Integrating biological, emotional, and relational dimensions.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B58B50] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#24352D]">
                  <strong className="font-semibold block text-[#173D34]">Neuroplastic Potential</strong>
                  Building healthier emotional circuits through conscious practice.
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Visual Composition Placeholder */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[380px] h-[420px] rounded-2xl border-2 border-[#B58B50]/30 bg-gradient-to-br from-[#173D34] to-[#102E27] p-8 text-[#F7F5EF] flex flex-col justify-between shadow-xl overflow-hidden">
              
              {/* Background Art */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#DFBD83]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#E8EDE4]/10 rounded-full blur-xl pointer-events-none" />
              
              {/* Top Card Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-[#DFBD83]" />
                  <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#DFBD83]">
                    Holistic Philosophy
                  </span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#B58B50]/20 border border-[#B58B50]/40 text-[#DFBD83]">
                  N.E.W.
                </span>
              </div>

              {/* Middle Feature Placeholder Graphic */}
              <div className="relative z-10 my-auto text-center py-6">
                <div className="w-20 h-20 mx-auto rounded-full border border-[#DFBD83]/40 bg-[#102E27]/80 flex items-center justify-center mb-4 shadow-inner">
                  <Sparkles className="w-10 h-10 text-[#DFBD83]" strokeWidth={1.3} />
                </div>
                <h4 className="font-serif text-2xl font-light text-[#F7F5EF]">
                  A Safe, Non-Judgemental Space
                </h4>
                <p className="text-xs text-[#E8EDE4]/80 mt-2 font-light max-w-xs mx-auto">
                  Every person’s path is honoured with dignity, clinical confidentiality, and unconditional positive regard.
                </p>
              </div>

              {/* Bottom Badge */}
              <div className="relative z-10 pt-4 border-t border-[#B58B50]/30 flex items-center justify-between text-xs text-[#DFBD83]">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#DFBD83]" />
                  <span>Licensed Clinical Guidance</span>
                </div>
                <span className="font-serif italic">Indore &bull; Online</span>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Pillars Interactive Tabs & Cards */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#B58B50]">
                Our 4 Pillars
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34] mt-1">
                The Four Pillars of Meaningful Transformation
              </h3>
            </div>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#173D34] hover:text-[#B58B50] group transition-colors"
            >
              <span>Schedule your initial discovery session</span>
              <ArrowUpRight className="w-4 h-4 text-[#B58B50] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => {
              const isSelected = activeTab === i;
              return (
                <div
                  key={pillar.num}
                  onClick={() => setActiveTab(i)}
                  className={`cursor-pointer rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between border ${
                    isSelected
                      ? "bg-[#173D34] text-[#F7F5EF] border-[#B58B50] shadow-xl scale-[1.02]"
                      : "bg-white text-[#24352D] border-[#B58B50]/20 hover:border-[#B58B50]/50 hover:shadow-md"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`font-serif text-3xl font-light ${
                          isSelected ? "text-[#DFBD83]" : "text-[#B58B50]"
                        }`}
                      >
                        {pillar.num}
                      </span>
                      <span
                        className={`text-[10px] font-sans tracking-widest uppercase px-2 py-0.5 rounded-full ${
                          isSelected
                            ? "bg-[#102E27] text-[#DFBD83]"
                            : "bg-[#E8EDE4] text-[#173D34]"
                        }`}
                      >
                        Pillar
                      </span>
                    </div>

                    <h4
                      className={`font-serif text-xl font-medium mb-1 ${
                        isSelected ? "text-white" : "text-[#173D34]"
                      }`}
                    >
                      {pillar.title}
                    </h4>

                    <span
                      className={`block text-xs font-sans tracking-wide mb-3 ${
                        isSelected ? "text-[#DFBD83]" : "text-[#B58B50]"
                      }`}
                    >
                      {pillar.tagline}
                    </span>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed font-light ${
                        isSelected ? "text-[#E8EDE4]/90" : "text-[#59675F]"
                      }`}
                    >
                      {pillar.desc}
                    </p>
                  </div>

                  <div
                    className={`mt-6 pt-4 border-t text-xs font-light leading-normal ${
                      isSelected
                        ? "border-[#102E27] text-[#DFBD83]"
                        : "border-[#E8EDE4] text-[#59675F]"
                    }`}
                  >
                    {pillar.detail}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}


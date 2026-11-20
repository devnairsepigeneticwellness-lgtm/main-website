"use client";

import React, { useState } from "react";
import { Shield, CheckCircle2, Video, Clock, Home, ArrowUpRight, Compass, Users, Sparkles } from "lucide-react";
import ServiceDetailModal from "@/components/services/ServiceDetailModal";

interface DetailedRehabilitationProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function DetailedRehabilitation({ onOpenBooking }: DetailedRehabilitationProps) {
  const [activeModal, setActiveModal] = useState<"advantages" | "offerings" | "pathway" | null>(null);

  const whyChooseOnline = [
    {
      title: "Comfort & Privacy",
      desc: "Speak freely from the safety, confidentiality, and comfort of your own space.",
    },
    {
      title: "No Travel Stress",
      desc: "Save time, money, and energy by skipping long commutes and busy waiting rooms.",
    },
    {
      title: "Consistent Care",
      desc: "Maintain unbroken progress with your sessions even during travel, busy work phases, or routine changes.",
    },
    {
      title: "Flexible Scheduling",
      desc: "Easily integrate regular sessions into your work, academic, or family life.",
    },
  ];

  const whatWeOffer = [
    {
      title: "1-on-1 Counselling",
      desc: "Personalized sessions focused on your specific goals and personal concerns.",
    },
    {
      title: "Guided Therapeutic Sessions",
      desc: "Evidence-based tools and exercises to help you manage unhelpful thoughts, emotional distress, and daily pressure.",
    },
    {
      title: "Mindfulness & Relaxation Practices",
      desc: "Practical techniques to calm your nervous system, enhance focus, and restore emotional balance.",
    },
    {
      title: "Practical Skill-Building",
      desc: "Developing healthy daily routines, adaptive coping mechanisms, and clear personal boundaries.",
    },
    {
      title: "Regular Progress Tracking",
      desc: "Continuously monitoring your functional gains and refining your plan as you grow.",
    },
    {
      title: "Family Guidance",
      desc: "Empowering your loved ones with insights on how to create a supportive environment at home.",
    },
  ];

  const whoIsItFor = [
    {
      title: "Busy Professionals & Students",
      desc: "Individuals balancing intense work hours, competitive exam prep, or tight schedules.",
    },
    {
      title: "Geographical Distance",
      desc: "Anyone residing in areas with limited access to specialized rehabilitation professionals.",
    },
    {
      title: "Home-Based Comfort",
      desc: "Individuals who prefer receiving guidance and building resilience from the comfort of their personal space.",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Assessment & Suitability",
      desc: "We begin with an initial consultation to understand your context, goals, and confirm that online support is the right fit.",
    },
    {
      step: "02",
      title: "Your Personal Roadmap",
      desc: "Together, we co-create a simple, step-by-step plan focused on your specific recovery and growth milestones.",
    },
    {
      step: "03",
      title: "Structured Virtual Sessions",
      desc: "We meet regularly over secure video calls for therapy, practical skill-building, and guided exercises.",
    },
    {
      step: "04",
      title: "Growth & Independence",
      desc: "We review your progress regularly, fine-tune coping strategies, and help you build long-term confidence and self-reliance.",
    },
  ];

  return (
    <section id="rehabilitation" className="py-16 lg:py-24 bg-[#EBF1E8] border-b border-[#C8D6C6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#9E783E]" />
            <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
              04. ONLINE REHABILITATION
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Getting Your Life{" "}
            <span className="italic text-[#7D6335]">Back on Track.</span>
          </h2>

          <div className="mt-5 space-y-4 font-sans text-sm sm:text-base text-[#3F5448] leading-relaxed font-light">
            <p>
              Rehabilitation is a goal-oriented process designed to help you regain, rebuild, and maintain your independence and quality of life.
            </p>
            <p>
              When life disruptions such as severe stress, illness, trauma, burnout, or emotional setbacks affect your ability to function at work, in studies, or within relationships, rehabilitation bridges the gap between where you are today and your highest potential for well-being and personal fulfillment.
            </p>
          </div>
        </div>

        {/* What is Online Rehabilitation? */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-[#F2F6F0] border border-[#C8D6C6]">
          <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
            Accessibility &amp; Care
          </span>
          <h3 className="font-serif text-2xl font-normal text-[#173D34] mb-2">
            What is Online Rehabilitation?
          </h3>
          <p className="text-xs font-sans tracking-wide text-[#7D6335] font-semibold mb-3 uppercase">
            Professional support that reaches you wherever you are.
          </p>
          <div className="space-y-3 font-sans text-xs sm:text-sm text-[#465A4F] leading-relaxed font-light">
            <p>
              You don’t always have to visit a clinic to receive quality care. Online Rehabilitation brings structured, professional psychological support directly to you through secure video calls.
            </p>
            <p>
              Whether you manage a busy schedule, live far away, face mobility challenges, or simply feel more at ease in your own environment, online sessions ensure that distance never stands in the way of your progress.
            </p>
          </div>
        </div>

        {/* 3 Core Interactive Hub Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Remote Advantages & Suitability */}
          <div className="rounded-3xl bg-[#E6EEE3] border border-[#C8D6C6] hover:border-[#9E783E] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#D7E3D3] text-[#1E3F35] flex items-center justify-center mb-4">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7D6335] block mb-1">
                Remote Advantages &amp; Suitability
              </span>
              <h4 className="font-serif text-xl font-medium text-[#173D34] mb-2">
                Why Choose Online Support?
              </h4>
              <p className="text-xs sm:text-sm text-[#465A4F] leading-relaxed font-light mb-4">
                Comfort, zero commute stress, consistent care during travel, and flexible scheduling designed for busy individuals.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal("advantages")}
              className="inline-flex items-center justify-between w-full pt-3 border-t border-[#C8D6C6] text-xs font-semibold text-[#173D34] hover:text-[#7D6335] transition-colors cursor-pointer"
            >
              <span>View Advantages &amp; Suitability</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#7D6335]" />
            </button>
          </div>

          {/* Card 2: What We Offer */}
          <div className="rounded-3xl bg-[#E6EEE3] border border-[#C8D6C6] hover:border-[#9E783E] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#D7E3D3] text-[#1E3F35] flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7D6335] block mb-1">
                Structured Guidance
              </span>
              <h4 className="font-serif text-xl font-medium text-[#173D34] mb-2">
                What We Offer Online
              </h4>
              <p className="text-xs sm:text-sm text-[#465A4F] leading-relaxed font-light mb-4">
                6 structured pathways: 1-on-1 Counselling, Guided Sessions, Mindfulness, Skill-Building, Tracking, and Family Guidance.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal("offerings")}
              className="inline-flex items-center justify-between w-full pt-3 border-t border-[#C8D6C6] text-xs font-semibold text-[#173D34] hover:text-[#7D6335] transition-colors cursor-pointer"
            >
              <span>View All 6 Online Offerings</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#7D6335]" />
            </button>
          </div>

          {/* Card 3: The 4-Step Pathway */}
          <div className="rounded-3xl bg-[#E6EEE3] border border-[#C8D6C6] hover:border-[#9E783E] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#D7E3D3] text-[#1E3F35] flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7D6335] block mb-1">
                The Pathway
              </span>
              <h4 className="font-serif text-xl font-medium text-[#173D34] mb-2">
                How It Works
              </h4>
              <p className="text-xs sm:text-sm text-[#465A4F] leading-relaxed font-light mb-4">
                A structured four-step journey from initial assessment and roadmap co-creation through virtual care and long-term autonomy.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal("pathway")}
              className="inline-flex items-center justify-between w-full pt-3 border-t border-[#C8D6C6] text-xs font-semibold text-[#173D34] hover:text-[#7D6335] transition-colors cursor-pointer"
            >
              <span>View Complete 4-Step Pathway</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#7D6335]" />
            </button>
          </div>
        </div>

        {/* Bottom Banner with Action */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F2F6F0] border border-[#C8D6C6] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs sm:text-sm text-[#556A5E] font-light">
            Continuous progress reviews and individualized care plans tailored to your recovery goals
          </span>
          <button
            onClick={() => onOpenBooking("Online Rehabilitation")}
            className="px-6 py-2.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-xs font-semibold tracking-wide transition-colors cursor-pointer shrink-0"
          >
            Enquire About Rehabilitation &rarr;
          </button>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 1: ADVANTAGES & SUITABILITY (EXACT CONTENT)
      ───────────────────────────────────────────────────────────── */}
      <ServiceDetailModal
        isOpen={activeModal === "advantages"}
        onClose={() => setActiveModal(null)}
        title="Why Choose Online Support & Suitability"
        badge="Remote Advantages"
        tagline="Online rehabilitation is thoughtfully planned according to your individual needs."
        onBook={() => onOpenBooking("Online Rehabilitation: Suitability")}
        bookLabel="Enquire About Rehabilitation"
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-serif text-xl font-medium text-[#173D34] mb-4">
              Why Choose Online Support?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyChooseOnline.map((item, idx) => (
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
            <h4 className="font-serif text-xl font-medium text-[#173D34] mb-2">
              Is Online Support Right for You?
            </h4>
            <p className="text-xs sm:text-sm text-[#465A4F] mb-4 font-light">
              Online rehabilitation is thoughtfully planned according to your individual needs and suitability for remote care. It is ideal for:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {whoIsItFor.map((item, idx) => (
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
        </div>
      </ServiceDetailModal>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 2: 6 OFFERINGS (EXACT CONTENT)
      ───────────────────────────────────────────────────────────── */}
      <ServiceDetailModal
        isOpen={activeModal === "offerings"}
        onClose={() => setActiveModal(null)}
        title="What We Offer Online"
        badge="Structured Guidance"
        tagline="Our remote services provide structured, comprehensive guidance tailored to your needs."
        onBook={() => onOpenBooking("Online Rehabilitation: Offerings")}
        bookLabel="Consult on Rehabilitation"
      >
        <div className="space-y-4">
          <p className="text-[#3F5448] font-light leading-relaxed text-sm sm:text-base">
            Our remote services provide structured, comprehensive guidance tailored to your needs:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whatWeOffer.map((offer, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
                <h5 className="font-serif text-lg font-medium text-[#173D34] mb-2">
                  {offer.title}
                </h5>
                <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                  {offer.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ServiceDetailModal>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 3: 4-STEP PATHWAY (EXACT CONTENT)
      ───────────────────────────────────────────────────────────── */}
      <ServiceDetailModal
        isOpen={activeModal === "pathway"}
        onClose={() => setActiveModal(null)}
        title="How It Works"
        badge="The Pathway"
        tagline="A clear, collaborative, step-by-step roadmap to recovery."
        onBook={() => onOpenBooking("Online Rehabilitation: Pathway")}
        bookLabel="Start Online Rehabilitation"
      >
        <div className="space-y-4">
          {howItWorks.map((step) => (
            <div key={step.step} className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
              <span className="font-serif text-2xl font-light text-[#9E783E] block mb-1">
                {step.step}
              </span>
              <h5 className="font-serif text-lg font-medium text-[#173D34] mb-2">
                {step.title}
              </h5>
              <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </ServiceDetailModal>
    </section>
  );
}

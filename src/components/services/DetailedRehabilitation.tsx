"use client";

import React from "react";
import { Shield, CheckCircle2, Video, Clock, Home, ArrowUpRight, Compass, Users } from "lucide-react";

interface DetailedRehabilitationProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function DetailedRehabilitation({ onOpenBooking }: DetailedRehabilitationProps) {
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
    <section id="rehabilitation" className="py-20 lg:py-28 bg-[#EBF1E8] border-b border-[#C8D6C6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#9E783E]" />
            <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
              ONLINE REHABILITATION
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
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-[#F2F6F0] border border-[#C8D6C6]">
          <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
            Accessibility &amp; Care
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173D34] mb-3">
            What is Online Rehabilitation?
          </h3>
          <p className="text-xs font-sans tracking-wide text-[#7D6335] font-semibold mb-4 uppercase">
            Professional support that reaches you wherever you are.
          </p>
          <div className="space-y-3 font-sans text-sm sm:text-base text-[#465A4F] leading-relaxed font-light">
            <p>
              You don’t always have to visit a clinic to receive quality care. Online Rehabilitation brings structured, professional psychological support directly to you through secure video calls.
            </p>
            <p>
              Whether you manage a busy schedule, live far away, face mobility challenges, or simply feel more at ease in your own environment, online sessions ensure that distance never stands in the way of your progress.
            </p>
          </div>
        </div>

        {/* Why Choose Online Support? */}
        <div className="mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
              Remote Advantages
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173D34]">
              Why Choose Online Support?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseOnline.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6] flex flex-col justify-between shadow-xs">
                <div>
                  <h4 className="font-serif text-lg font-medium text-[#173D34] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What We Offer Online */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-[#F2F6F0] border border-[#C8D6C6]">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
              Structured Guidance
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173D34]">
              What We Offer Online
            </h3>
            <p className="text-xs sm:text-sm text-[#465A4F] mt-2 font-light leading-relaxed">
              Our remote services provide structured, comprehensive guidance tailored to your needs:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeOffer.map((offer, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
                <h4 className="font-serif text-lg font-medium text-[#173D34] mb-2">
                  {offer.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                  {offer.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Is Online Support Right for You? */}
        <div className="mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
              Suitability
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173D34]">
              Is Online Support Right for You?
            </h3>
            <p className="text-xs sm:text-sm text-[#465A4F] mt-2 font-light leading-relaxed">
              Online rehabilitation is thoughtfully planned according to your individual needs and suitability for remote care. It is ideal for:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whoIsItFor.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
                <h4 className="font-serif text-lg font-medium text-[#173D34] mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Table / Timeline */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#E6EEE3] border border-[#C8D6C6]">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
              The Pathway
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173D34]">
              How It Works
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step) => (
              <div key={step.step} className="p-6 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6] flex flex-col justify-between">
                <div>
                  <span className="font-serif text-3xl font-light text-[#9E783E] block mb-2">
                    {step.step}
                  </span>
                  <h4 className="font-serif text-lg font-medium text-[#173D34] mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#C8D6C6] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#556A5E]">
              Continuous progress reviews and individualized care plans
            </span>
            <button
              onClick={() => onOpenBooking("Online Rehabilitation")}
              className="px-6 py-2.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              Enquire About Rehabilitation &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import React from "react";
import { ArrowUpRight, ArrowDown, Heart, Brain, Sparkles, Shield, Compass, Sun, ClipboardList, Check } from "lucide-react";

interface ServicesOverviewGridProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function ServicesOverviewGrid({ onOpenBooking }: ServicesOverviewGridProps) {
  const services = [
    {
      num: "01",
      title: "Counselling",
      targetId: "counselling-psychotherapy",
      desc: "A supportive environment to explore emotional concerns, personal challenges, relationships, stress and life transitions.",
      areas: [
        "Emotional difficulties and stress",
        "Relationships and communication",
        "Personal challenges and transitions",
      ],
      icon: Heart,
    },
    {
      num: "02",
      title: "Psychotherapy",
      targetId: "counselling-psychotherapy",
      desc: "Therapeutic approaches that support exploration of thoughts, emotions, behaviours and recurring psychological patterns.",
      areas: [
        "Emotional and behavioural patterns",
        "Self-understanding",
        "Psychological coping strategies",
      ],
      icon: Brain,
    },
    {
      num: "03",
      title: "Clinical Hypnotherapy",
      targetId: "hypnotherapy",
      desc: "An approach that may use guided relaxation, focused attention and therapeutic techniques as part of an appropriate support plan.",
      areas: [
        "Relaxation and focused attention",
        "Therapeutic exploration",
        "Relevant behavioural or emotional goals",
      ],
      icon: Sparkles,
    },
    {
      num: "04",
      title: "Online Rehabilitation",
      targetId: "rehabilitation",
      desc: "Remote support focused on practical rehabilitation needs, functioning and quality of life, subject to individual assessment and suitability.",
      areas: [
        "Remote support",
        "Practical skills and functioning",
        "Individual rehabilitation-related goals",
      ],
      icon: Shield,
    },
    {
      num: "05",
      title: "Renewal",
      targetId: "renewal-spiritual",
      desc: "A reflective wellbeing offering centred on reconnecting with personal strengths, exploring patterns and developing meaningful changes in daily life.",
      areas: [
        "Personal reflection",
        "Understanding life patterns",
        "Building healthier routines",
      ],
      icon: Compass,
    },
    {
      num: "06",
      title: "Spiritual Practices",
      targetId: "renewal-spiritual",
      desc: "An exploration of personal meaning, reflection and spiritual practices where these are relevant to individual interests, values and wellbeing goals.",
      areas: [
        "Reflection and self-awareness",
        "Personal meaning",
        "Mindfulness and relevant spiritual practices",
      ],
      icon: Sun,
    },
    {
      num: "07",
      title: "Treatment & Support Plans",
      targetId: "support-plans",
      desc: "An individualised approach to considering appropriate support options and practical next steps according to each person's circumstances and needs.",
      areas: [
        "Understanding individual requirements",
        "Identifying support goals",
        "Reviewing possible next steps",
      ],
      icon: ClipboardList,
    },
  ];

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services-overview" className="py-20 lg:py-28 bg-[#E8EDE4]/40 border-y border-[#B58B50]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#B58B50]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              EXPLORE OUR SERVICES
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Support Designed Around{" "}
            <span className="italic text-[#B58B50]">Your Needs.</span>
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#59675F] leading-relaxed font-light">
            Explore the seven primary offerings provided at Nair&apos;s Epigenetic Wellness. Each service is grounded in clinical ethics and shaped around personal suitability.
          </p>
        </div>

        {/* 3-Column Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.num}
                className="bg-white rounded-[18px] p-7 sm:p-8 border border-[#B58B50]/20 hover:border-[#B58B50] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  {/* Card Header: Category Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-2xl font-light text-[#B58B50]">
                      {svc.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#E8EDE4] text-[#173D34] flex items-center justify-center group-hover:bg-[#173D34] group-hover:text-[#DFBD83] transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl font-medium text-[#173D34] mb-3 group-hover:text-[#B58B50] transition-colors">
                    {svc.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-[#59675F] font-light leading-relaxed mb-6">
                    {svc.desc}
                  </p>

                  {/* 3 Supporting Details / Areas */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] uppercase tracking-wider text-[#173D34] font-semibold block">
                      Areas Explored:
                    </span>
                    {svc.areas.map((area, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#24352D] font-light">
                        <Check className="w-3.5 h-3.5 text-[#B58B50] shrink-0 mt-0.5" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-6 border-t border-[#E8EDE4] flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleScrollTo(svc.targetId)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D34] hover:text-[#B58B50] transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowDown className="w-3.5 h-3.5 text-[#B58B50]" />
                  </button>

                  <button
                    onClick={() => onOpenBooking(svc.title)}
                    className="px-4 py-2 rounded-full bg-[#173D34] hover:bg-[#102E27] text-white text-xs font-medium tracking-wide transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <span>Enquire Now</span>
                    <ArrowUpRight className="w-3 h-3 text-[#DFBD83]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


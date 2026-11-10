"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Sparkles, User, Users, Brain, Heart, Compass, Shield } from "lucide-react";

interface ServicesSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export default function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Pathways" },
    { id: "therapy", label: "Therapy & Counselling" },
    { id: "clinical", label: "Clinical & Rehabilitation" },
    { id: "mindfulness", label: "Mindfulness & Renewal" },
  ];

  const services = [
    {
      id: "counselling",
      number: "01",
      category: "therapy",
      title: "Counselling",
      subtitle: "Personal, Relational & Transitional Guidance",
      description:
        "A supportive, confidential space to explore personal concerns, emotional difficulties, relationship dynamics, career crossroads, and life transitions.",
      modalities: ["Person-Centred", "Solution-Focused", "Cognitive Reframing"],
      duration: "50–60 Minutes",
      format: "Online & In-Person",
      bestFor: "Stress, relationship strain, grief, life adjustments, clarity",
      icon: Heart,
    },
    {
      id: "psychotherapy",
      number: "02",
      category: "therapy",
      title: "Psychotherapy",
      subtitle: "In-Depth Pattern Analysis & Cognitive Healing",
      description:
        "Evidence-informed psychological therapies tailored to understand deep-seated patterns in thoughts, emotions, core beliefs, and behavioural loops.",
      modalities: ["CBT", "REBT", "DBT Skills", "ACT", "IPT", "EFT"],
      duration: "60 Minutes",
      format: "Online & In-Person",
      bestFor: "Chronic anxiety, persistent low mood, emotional dysregulation, self-esteem",
      icon: Brain,
    },
    {
      id: "hypnotherapy",
      number: "03",
      category: "clinical",
      title: "Clinical Hypnotherapy",
      subtitle: "Collaborative Focused Attention & Deep Relaxation",
      description:
        "A structured, clinical modality using guided focused attention and somatic calm to address subconscious blocks, habits, psychosomatic stress, and fear responses.",
      modalities: ["Clinical Trance Induction", "Ericksonian Metaphor", "Somatic Calming"],
      duration: "60–75 Minutes",
      format: "In-Person & Select Online",
      bestFor: "Phobias, stress manifestations, sleep habits, performance anxiety",
      icon: Sparkles,
    },
    {
      id: "rehabilitation",
      number: "04",
      category: "clinical",
      title: "Online Rehabilitation",
      subtitle: "Structured Autonomy & Psychosocial Functioning",
      description:
        "Specialized remote rehabilitation counselling (RCI framework) helping individuals rebuild functional independence, coping skills, and community participation.",
      modalities: ["RCI Standards", "Functional Skills", "Coping Adaptation"],
      duration: "Multi-Week Structured Plan",
      format: "Secure Remote Platform",
      bestFor: "Psychosocial recovery, neurodivergent adaptation, chronic condition coping",
      icon: Shield,
    },
    {
      id: "renewal",
      number: "05",
      category: "mindfulness",
      title: "Renewal Programme",
      subtitle: "Restorative Reset & Value Realignment",
      description:
        "A structured reflective journey designed to alleviate burnout, reconnect with intrinsic strengths, unlearn maladaptive exhaustion habits, and rebuild nourishing daily rhythms.",
      modalities: ["Life-Pacing", "Burnout Recovery", "Values Alignment"],
      duration: "4–8 Week Pathway",
      format: "One-on-One Guided",
      bestFor: "Burnout, professional fatigue, loss of purpose, emotional replenishment",
      icon: Compass,
    },
    {
      id: "mindfulness",
      number: "06",
      category: "mindfulness",
      title: "Mindfulness & Somatic Wellbeing",
      subtitle: "Grounded Present Awareness & Nervous System Regulation",
      description:
        "Individual and small-group experiential practices in conscious breathing, somatic body awareness, attention stabilization, and down-regulating acute fight-or-flight states.",
      modalities: ["MBSR Techniques", "Vagal Regulation", "Breathwork Practice"],
      duration: "Single or Weekly Series",
      format: "Online & In-Studio",
      bestFor: "Overactive mind, panic sensations, nervous exhaustion, emotional resilience",
      icon: Users,
    },
  ];

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#102E27] text-[#F7F5EF] relative overflow-hidden">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#173D34] rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#B58B50]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#DFBD83]" />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#DFBD83] uppercase font-sans">
                Areas of Clinical &amp; Therapeutic Support
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F7F5EF] leading-[1.18] tracking-tight">
              Support that meets you{" "}
              <span className="italic text-[#DFBD83]">where you are.</span>
            </h2>

            <p className="mt-4 font-sans text-sm sm:text-base text-[#E8EDE4]/80 leading-relaxed font-light">
              Every person brings a unique background, emotional narrative, and set of goals.
              Explore our structured pathways delivered with empathy, ethical integrity, and clinical precision.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#DFBD83] text-[#102E27] shadow-md"
                    : "bg-[#173D34]/70 text-[#E8EDE4]/80 hover:bg-[#173D34] hover:text-white border border-[#DFBD83]/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative rounded-2xl bg-[#173D34]/80 border border-[#B58B50]/30 hover:border-[#DFBD83] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30"
              >
                <div>
                  {/* Card Top Row */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-2xl font-light text-[#DFBD83]">
                      {service.number}
                    </span>
                    <div className="w-11 h-11 rounded-full bg-[#102E27] border border-[#B58B50]/40 flex items-center justify-center text-[#DFBD83] group-hover:scale-110 group-hover:bg-[#B58B50] group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-2xl font-medium text-[#F7F5EF] mb-1 group-hover:text-[#DFBD83] transition-colors">
                    {service.title}
                  </h3>
                  <span className="block text-xs font-sans tracking-wide text-[#DFBD83]/80 mb-4">
                    {service.subtitle}
                  </span>

                  {/* Description */}
                  <p className="font-sans text-sm text-[#E8EDE4]/85 leading-relaxed font-light mb-6">
                    {service.description}
                  </p>

                  {/* Modalities Badges */}
                  <div className="mb-6">
                    <span className="text-[10px] uppercase tracking-wider text-[#DFBD83]/70 block mb-2 font-medium">
                      Therapeutic Frameworks
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.modalities.map((mod) => (
                        <span
                          key={mod}
                          className="px-2 py-0.5 rounded-full bg-[#102E27] text-[#E8EDE4]/90 text-[11px] border border-[#B58B50]/20"
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Details */}
                <div className="pt-5 border-t border-[#B58B50]/20 space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#E8EDE4]/70">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#DFBD83]" />
                      {service.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#DFBD83]" />
                      {service.format}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenBooking(service.title)}
                    className="w-full py-2.5 rounded-full bg-transparent hover:bg-[#B58B50] text-[#DFBD83] hover:text-white border border-[#DFBD83]/40 text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Request Consultation</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to Dedicated Comprehensive Services Page */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#173D34] hover:bg-[#B58B50] text-[#F7F5EF] text-sm font-medium tracking-wide border border-[#B58B50]/40 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <span>Explore All 7 Services &amp; In-Depth Clinical Modalities</span>
            <ArrowUpRight className="w-4 h-4 text-[#DFBD83] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Bottom Assurance Note */}
        <div className="mt-14 p-6 rounded-2xl bg-[#173D34]/40 border border-[#B58B50]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#DFBD83] shrink-0" />
            <p className="text-xs sm:text-sm text-[#E8EDE4]/90 font-light">
              <strong className="text-white font-medium">Unsure which pathway aligns with your situation?</strong>{" "}
              Book an initial 20-minute exploratory conversation where our clinical team helps clarify your best path forward.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking("Exploratory Call")}
            className="shrink-0 px-5 py-2.5 rounded-full bg-[#B58B50] hover:bg-[#A37B42] text-white text-xs font-medium tracking-wide transition-colors"
          >
            Speak to a Specialist &rarr;
          </button>
        </div>

      </div>
    </section>
  );
}


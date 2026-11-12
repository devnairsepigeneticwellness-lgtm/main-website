"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Sparkles, User, Users, Brain, Heart, Compass, Shield, Building2, GraduationCap, ClipboardList } from "lucide-react";

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
    { id: "institutional", label: "Corporate & Educational" },
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
      modalities: ["Person-Centered Approach", "Solution-Focused", "Cognitive Reframing"],
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
        "Specialized remote rehabilitation counselling helping individuals rebuild functional independence, coping skills, and community participation.",
      modalities: ["Functional Autonomy", "Coping Adaptation", "Psychosocial Support"],
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
      title: "Mindfulness & Somatic Calm",
      subtitle: "Grounded Present Awareness & Nervous System Regulation",
      description:
        "Individual and small-group experiential practices in conscious breathing, somatic body awareness, attention stabilization, and down-regulating acute fight-or-flight states.",
      modalities: ["MBSR Techniques", "Vagal Regulation", "Breathwork Practice"],
      duration: "Single or Weekly Series",
      format: "Online & In-Studio",
      bestFor: "Overactive mind, panic sensations, nervous exhaustion, emotional resilience",
      icon: Users,
    },
    {
      id: "corporate-training",
      number: "07",
      category: "institutional",
      title: "Corporate Training & Leadership Wellbeing",
      subtitle: "Evidence-Based Workplace Resilience & High-Trust Culture",
      description:
        "Custom institutional programmes, executive stress mastery, non-violent communication frameworks, and proactive burnout prevention designed for leadership teams and enterprises.",
      modalities: ["Executive Resilience", "Workplace Stress Mastery", "Team Emotional Agility"],
      duration: "Half-Day / Multi-Week Tracks",
      format: "On-Site & Virtual Masterclasses",
      bestFor: "Corporate teams, leadership burnout, high-stress workplaces, team cohesion",
      icon: Building2,
    },
    {
      id: "educational-empowerment",
      number: "08",
      category: "institutional",
      title: "Educational Ecosystem Empowerment",
      subtitle: "School Mental Health & Educator-Student Flourishing",
      description:
        "Comprehensive student emotional regulation curricula, crisis management protocols, sensitization modules, and proactive campus mental wellness frameworks.",
      modalities: ["Sensitization Modules", "Student Coping Tools", "Institutional Frameworks"],
      duration: "Campus Immersion & Cohorts",
      format: "Institutional On-Campus & Hybrid",
      bestFor: "Schools, universities, adolescent guidance, educator burnout",
      icon: GraduationCap,
    },
    {
      id: "support-plans",
      number: "09",
      category: "therapy",
      title: "Treatment & Structured Support Plans",
      subtitle: "Collaborative Care Roadmaps with Measurable Milestones",
      description:
        "Personalised, multi-session therapeutic roadmaps integrating clinical psychological care, progress reviews, and coordinated psychoeducational resources.",
      modalities: ["Goal Formulation", "Progress Metrics", "Multi-Disciplinary Care"],
      duration: "Collaborative Phased Plan",
      format: "Online & In-Person",
      bestFor: "Complex life challenges, continuous therapeutic guidance, multi-stage recovery",
      icon: ClipboardList,
    },
  ];

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#E8EFE5] text-[#24352D] relative overflow-hidden border-b border-[#C8D6C6]">
      {/* Decorative Sage & Ambient Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#D7E3D3] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#9E783E]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#9E783E]" />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
                Areas of Clinical &amp; Therapeutic Support
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
              Support that meets you{" "}
              <span className="italic text-[#2F5A48]">where you are.</span>
            </h2>

            <p className="mt-4 font-sans text-sm sm:text-base text-[#3F5448] leading-relaxed font-light">
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
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#1E3F35] text-[#DFBD83] shadow-xs"
                    : "bg-[#DCE7DA] text-[#243A2F] hover:bg-[#D1DDD0] hover:text-[#173D34] border border-[#B8C9B5]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid — Sage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative rounded-2xl bg-[#F2F6F0] border border-[#C8D6C5] hover:border-[#9E783E] hover:bg-[#F6FAF4] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  {/* Card Top Row */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-2xl font-light text-[#9E783E]">
                      {service.number}
                    </span>
                    <div className="w-11 h-11 rounded-full bg-[#DCE6DA] border border-[#C8D6C5] flex items-center justify-center text-[#1E3F35] group-hover:scale-110 group-hover:bg-[#1E3F35] group-hover:text-[#F7F5EF] transition-all">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-2xl font-medium text-[#173D34] mb-1 group-hover:text-[#2A5244] transition-colors">
                    {service.title}
                  </h3>
                  <span className="block text-xs font-sans tracking-wide text-[#6A8274] mb-4 font-medium">
                    {service.subtitle}
                  </span>

                  {/* Description */}
                  <p className="font-sans text-sm text-[#45574D] leading-relaxed font-light mb-6">
                    {service.description}
                  </p>

                  {/* Modalities Badges */}
                  <div className="mb-6">
                    <span className="text-[10px] uppercase tracking-wider text-[#7D6335] block mb-2 font-semibold">
                      Therapeutic Frameworks
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.modalities.map((mod) => (
                        <span
                          key={mod}
                          className="px-2.5 py-0.5 rounded-full bg-[#E2EBE0] text-[#2D4438] text-[11px] border border-[#C6D4C3] font-medium"
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Details */}
                <div className="pt-5 border-t border-[#C8D6C5] space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#4F6457]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#7D6335]" />
                      {service.duration}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#7D6335]" />
                      {service.format}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenBooking(service.title)}
                    className="w-full py-2.5 rounded-full bg-transparent hover:bg-[#1E3F35] text-[#1E3F35] hover:text-[#F7F5EF] border border-[#1E3F35]/40 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
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
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-sm font-semibold tracking-wide border border-[#1E3F35] shadow-sm hover:shadow-md transition-all duration-200"
          >
            <span>Explore In-Depth Clinical Modalities &amp; Programmes</span>
            <ArrowUpRight className="w-4 h-4 text-[#DFBD83] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Bottom Assurance Note */}
        <div className="mt-14 p-6 rounded-2xl bg-[#DEE7DB] border border-[#C6D5C3] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#1E3F35] shrink-0" />
            <p className="text-xs sm:text-sm text-[#273C30] font-light">
              <strong className="text-[#173D34] font-semibold">Unsure which pathway aligns with your situation?</strong>{" "}
              Book an initial 20-minute exploratory conversation where our clinical team helps clarify your best path forward.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking("Exploratory Call")}
            className="shrink-0 px-5 py-2.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
          >
            Speak to a Specialist &rarr;
          </button>
        </div>

      </div>
    </section>
  );
}


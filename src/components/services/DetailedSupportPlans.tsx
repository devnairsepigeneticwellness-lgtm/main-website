"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  User, 
  Users, 
  Sparkles, 
  BrainCircuit, 
  Layers, 
  AlertTriangle, 
  PhoneCall, 
  CheckCircle2,
  HelpCircle,
  ClipboardList
} from "lucide-react";
import ServiceDetailModal from "@/components/services/ServiceDetailModal";

interface DetailedSupportPlansProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function DetailedSupportPlans({ onOpenBooking }: DetailedSupportPlansProps) {
  const [selectedPlanNum, setSelectedPlanNum] = useState<string | null>(null);

  const plans = [
    {
      num: "01",
      title: "Individual Counselling Plan",
      subtitle: "Dedicated One-to-One Focus",
      icon: User,
      desc: "Dedicated one-to-one sessions focused entirely on your specific concerns, whether that is anxiety, emotional difficulties, personal growth, relationships, or life transitions.",
      structure: "Regular individual sessions tailored to your pace and goals.",
      highlights: [
        "One-to-one dedicated clinician time",
        "Paced completely to your comfort",
        "Deep personal goal setting",
        "Flexible therapeutic modalities"
      ]
    },
    {
      num: "02",
      title: "Individual + Group Support",
      subtitle: "Combined Personal & Shared Learning",
      icon: Users,
      desc: "A combination that offers the depth of individual therapy along with the shared learning and peer support of group sessions.",
      structure: "Blended individual exploration with structured group learning.",
      highlights: [
        "Individual depth combined with peer solidarity",
        "Practical coping skills & emotional regulation",
        "Shared perspectives reduce isolation",
        "Continuous feedback and reinforcement"
      ]
    },
    {
      num: "03",
      title: "Individual Mindfulness Sessions",
      subtitle: "Personalised Breath & Awareness",
      icon: Sparkles,
      desc: "One-to-one sessions focused on mindfulness practices, breathing techniques, emotional awareness, and stress reduction tools tailored to your daily routine.",
      structure: "Customised private mindfulness practice and breathwork.",
      highlights: [
        "Customised somatic & breathing protocols",
        "Emotional regulation for daily routines",
        "Stress reduction tailored to lifestyle",
        "Nervous system grounding tools"
      ]
    },
    {
      num: "04",
      title: "Group Mindfulness Sessions",
      subtitle: "Supportive Group Practice",
      icon: BrainCircuit,
      desc: "Structured group sessions where participants learn and practice mindfulness, stress management, and emotional regulation techniques together in a supportive environment.",
      structure: "Cohort-based guided practices and collaborative sharing.",
      highlights: [
        "Structured collective mindfulness exercises",
        "Shared accountability and calm",
        "Practical stress-management toolsets",
        "Supportive, non-judgmental environment"
      ]
    },
    {
      num: "05",
      title: "Comprehensive Individual & Group Programme",
      subtitle: "Multi-Component Intensive Support",
      icon: Layers,
      desc: "A structured, multi-component programme designed for individuals who would benefit from intensive, multifaceted support.",
      structure: "Combines individual therapy, group learning, skill-building workshops, and regular progress reviews.",
      highlights: [
        "In-depth individual psychotherapy",
        "Cohort group learning & discussions",
        "Interactive skill-building workshops",
        "Regular structured progress reviews"
      ]
    }
  ];

  const emergencyHelplines = [
    {
      name: "National Emergency Service",
      number: "112",
      tel: "112",
      note: "Immediate police, fire, or medical ambulance"
    },
    {
      name: "Tele-MANAS (Govt. of India)",
      number: "14416 / 1800-891-4416",
      tel: "14416",
      note: "24/7 Toll-free mental health support"
    },
    {
      name: "KIRAN Mental Health Helpline",
      number: "1800-599-0019",
      tel: "18005990019",
      note: "24/7 Central mental health rehabilitation helpline"
    },
    {
      name: "Local Hospital Emergency",
      number: "Visit Nearest Casualty / ER",
      tel: "",
      note: "In-person acute psychiatric or medical evaluation"
    }
  ];

  const activePlan = plans.find((p) => p.num === selectedPlanNum);

  return (
    <section id="support-plans" className="py-16 lg:py-24 bg-[#F4F7F2] relative overflow-hidden border-t border-[#B58B50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#B58B50]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              07. TREATMENT &amp; SUPPORT PLANS
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Your support plan{" "}
            <span className="italic text-[#B58B50]">should fit you.</span>
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#59675F] leading-relaxed font-light">
            Different people need different levels and types of support. Based on your concerns, goals, and professional assessment, we may recommend one of the following formats:
          </p>
        </div>

        {/* 5 Plans Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            const isFeatured = idx === 4;

            return (
              <div
                key={plan.num}
                className={`rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between group shadow-xs ${
                  isFeatured
                    ? "md:col-span-2 lg:col-span-1 bg-[#173D34] text-[#F7F5EF] border-[#DFBD83]/40"
                    : "bg-white text-[#173D34] border-[#B58B50]/20 hover:border-[#B58B50]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-mono font-semibold tracking-widest px-2.5 py-0.5 rounded-full ${
                      isFeatured ? "bg-[#DFBD83] text-[#102E27]" : "bg-[#EBF1E8] text-[#173D34]"
                    }`}>
                      FORMAT {plan.num}
                    </span>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                      isFeatured ? "bg-white/10 text-[#DFBD83]" : "bg-[#F4F7F2] text-[#B58B50]"
                    }`}>
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                  </div>

                  <span className={`text-[11px] uppercase tracking-wider font-semibold block mb-1 ${
                    isFeatured ? "text-[#DFBD83]" : "text-[#B58B50]"
                  }`}>
                    {plan.subtitle}
                  </span>

                  <h3 className={`font-serif text-xl font-medium mb-2 ${
                    isFeatured ? "text-[#F7F5EF]" : "text-[#173D34]"
                  }`}>
                    {plan.title}
                  </h3>

                  <p className={`font-sans text-xs sm:text-sm leading-relaxed mb-4 font-light line-clamp-3 ${
                    isFeatured ? "text-[#E8EDE4]/90" : "text-[#59675F]"
                  }`}>
                    {plan.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C8D6C6]/40 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPlanNum(plan.num)}
                    className={`w-full py-2 px-4 rounded-full text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      isFeatured
                        ? "bg-white/10 hover:bg-white/20 text-[#DFBD83] border border-[#DFBD83]/30"
                        : "bg-[#EBF1E8] hover:bg-[#DEE7DB] text-[#173D34]"
                    }`}
                  >
                    <span>View Plan Details &amp; Structure</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenBooking(plan.title)}
                    className={`w-full py-2.5 px-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isFeatured
                        ? "bg-[#DFBD83] hover:bg-[#c9a76d] text-[#102E27] shadow-sm"
                        : "bg-[#173D34] hover:bg-[#204E42] text-white shadow-xs"
                    }`}
                  >
                    <span>Select Plan</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CRISIS INTERVENTION WARNING */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#FFF9F5] border-2 border-[#D97706]/30 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row md:items-start gap-5">
            <div className="w-11 h-11 rounded-2xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#D97706] font-semibold block mb-0.5">
                  CRISIS INTERVENTION
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#173D34]">
                  Important Notice
                </h3>
              </div>

              <div className="space-y-1.5 font-sans text-xs sm:text-sm text-[#59675F] leading-relaxed font-light">
                <p>
                  <strong className="font-medium text-[#173D34]">Nair’s Epigenetic Wellness is an outpatient mental health and wellbeing centre.</strong> We are not an emergency service or crisis facility.
                </p>
                <p>
                  If you or someone you know is in immediate danger, experiencing severe crisis, or having thoughts of self-harm, please reach out to emergency services immediately:
                </p>
              </div>

              {/* Helplines Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                {emergencyHelplines.map((hl) => (
                  <div key={hl.name} className="p-3.5 rounded-2xl bg-white border border-[#D97706]/20 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-medium text-[#7D6335] block uppercase tracking-wider mb-0.5">
                        {hl.name}
                      </span>
                      <span className="font-serif text-base font-bold text-[#173D34] block">
                        {hl.number}
                      </span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-[#E8EDE4] flex items-center justify-between text-[11px] text-[#59675F]">
                      <span className="font-light truncate">{hl.note}</span>
                      {hl.tel && (
                        <a
                          href={`tel:${hl.tel}`}
                          className="text-[#D97706] font-medium hover:underline inline-flex items-center gap-1 shrink-0 ml-1.5"
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>Call</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-sans text-xs text-[#7D6335] font-medium pt-1">
                Your safety is the priority. Please seek immediate medical help in an emergency.
              </p>
            </div>
          </div>
        </div>

        {/* DECISION HELPER & FINAL NAVIGATION CTA */}
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#173D34] via-[#12332B] to-[#0D241E] text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#DFBD83]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-5">
            <div className="w-11 h-11 rounded-full bg-[#DFBD83]/20 border border-[#DFBD83]/40 text-[#DFBD83] flex items-center justify-center mx-auto">
              <HelpCircle className="w-5 h-5" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#F7F5EF]">
              Not sure which service is{" "}
              <span className="italic text-[#DFBD83]">right for you?</span>
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#E8EDE4]/90 font-light leading-relaxed max-w-xl mx-auto">
              You don&apos;t need to figure everything out before reaching out. Start with our Mental Wellbeing Self-Assessment, or speak to one of our professionals about your concerns.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/assessment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#DFBD83] hover:bg-[#c9a76d] text-[#102E27] text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all hover:scale-[1.02]"
              >
                <ClipboardList className="w-4 h-4" />
                <span>TAKE THE ASSESSMENT</span>
              </Link>

              <button
                onClick={() => onOpenBooking("Treatment & Support Plans Consultation")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F5EF] text-xs sm:text-sm font-medium tracking-wide border border-[#DFBD83]/40 hover:border-[#DFBD83] transition-all cursor-pointer"
              >
                <span>BOOK A CONSULTATION</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: SUPPORT PLAN DETAILS (EXACT CONTENT)
      ───────────────────────────────────────────────────────────── */}
      {activePlan && (
        <ServiceDetailModal
          isOpen={!!selectedPlanNum}
          onClose={() => setSelectedPlanNum(null)}
          title={activePlan.title}
          badge={`FORMAT ${activePlan.num} • ${activePlan.subtitle}`}
          tagline={activePlan.subtitle}
          onBook={() => onOpenBooking(activePlan.title)}
          bookLabel="Select This Plan"
        >
          <div className="space-y-6">
            <p className="text-[#3F5448] font-light leading-relaxed text-base">
              {activePlan.desc}
            </p>

            <div className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
              <span className="font-semibold block mb-1 uppercase tracking-wider text-xs text-[#7D6335]">
                Structure
              </span>
              <p className="text-sm text-[#24352D] font-light leading-relaxed">
                {activePlan.structure}
              </p>
            </div>

            <div>
              <span className="font-semibold block mb-3 uppercase tracking-wider text-xs text-[#173D34]">
                Plan Highlights:
              </span>
              <div className="space-y-2.5">
                {activePlan.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm p-3 rounded-xl bg-[#EAF0E7] border border-[#C8D6C6]">
                    <CheckCircle2 className="w-4 h-4 text-[#7D6335] shrink-0 mt-0.5" />
                    <span className="text-[#24352D] font-light">{h}</span>
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

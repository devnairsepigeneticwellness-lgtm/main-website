"use client";

import React from "react";
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

interface DetailedSupportPlansProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function DetailedSupportPlans({ onOpenBooking }: DetailedSupportPlansProps) {
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

  return (
    <section id="support-plans" className="py-20 lg:py-28 bg-[#F4F7F2] relative overflow-hidden border-t border-[#B58B50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#B58B50]" />
            <span className="text-xs font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              TREATMENT &amp; SUPPORT PLANS
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Your support plan{" "}
            <span className="italic text-[#B58B50]">should fit you.</span>
          </h2>

          <p className="mt-6 font-sans text-base sm:text-lg text-[#59675F] leading-relaxed font-light">
            Different people need different levels and types of support. Based on your concerns, goals, and professional assessment, we may recommend one of the following formats:
          </p>
        </div>

        {/* 5 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            const isFeatured = idx === 4; // 5th plan spans nicely or stands out

            return (
              <div
                key={plan.num}
                className={`rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-sm hover:shadow-xl ${
                  isFeatured
                    ? "md:col-span-2 lg:col-span-2 bg-[#173D34] text-[#F7F5EF] border-[#DFBD83]/40"
                    : "bg-white text-[#173D34] border-[#B58B50]/20 hover:border-[#B58B50]"
                }`}
              >
                <div>
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-xs font-mono font-semibold tracking-widest px-3 py-1 rounded-full ${
                      isFeatured ? "bg-[#DFBD83] text-[#102E27]" : "bg-[#EBF1E8] text-[#173D34]"
                    }`}>
                      FORMAT {plan.num}
                    </span>
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                      isFeatured ? "bg-white/10 text-[#DFBD83]" : "bg-[#F4F7F2] text-[#B58B50]"
                    }`}>
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                  </div>

                  <span className={`text-xs uppercase tracking-wider font-semibold block mb-1 ${
                    isFeatured ? "text-[#DFBD83]" : "text-[#B58B50]"
                  }`}>
                    {plan.subtitle}
                  </span>

                  <h3 className={`font-serif text-2xl font-medium mb-3 ${
                    isFeatured ? "text-[#F7F5EF]" : "text-[#173D34]"
                  }`}>
                    {plan.title}
                  </h3>

                  <p className={`font-sans text-sm leading-relaxed mb-6 font-light ${
                    isFeatured ? "text-[#E8EDE4]/90" : "text-[#59675F]"
                  }`}>
                    {plan.desc}
                  </p>

                  <div className={`p-4 rounded-2xl mb-6 text-xs ${
                    isFeatured ? "bg-white/5 border border-white/10 text-[#E8EDE4]" : "bg-[#F7F5EF] border border-[#B58B50]/15 text-[#173D34]"
                  }`}>
                    <span className="font-semibold block mb-1 uppercase tracking-wider text-[11px] text-[#B58B50]">
                      Structure
                    </span>
                    <p className="font-light">{plan.structure}</p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="space-y-2 mb-8">
                    {plan.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isFeatured ? "text-[#DFBD83]" : "text-[#B58B50]"
                        }`} />
                        <span className={isFeatured ? "text-[#E8EDE4]/85 font-light" : "text-[#59675F] font-light"}>
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking(plan.title)}
                  className={`w-full py-3.5 px-6 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                    isFeatured
                      ? "bg-[#DFBD83] hover:bg-[#c9a76d] text-[#102E27] shadow-lg"
                      : "bg-[#173D34] hover:bg-[#204E42] text-white shadow-sm"
                  }`}
                >
                  <span>Select Plan Format</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* CRISIS INTERVENTION WARNING */}
        <div className="rounded-3xl p-8 sm:p-10 bg-[#FFF9F5] border-2 border-[#D97706]/30 shadow-md mb-16">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-12 h-12 rounded-2xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#D97706] font-semibold block mb-1">
                  CRISIS INTERVENTION
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
                  Important Notice
                </h3>
              </div>

              <div className="space-y-2 font-sans text-sm sm:text-base text-[#59675F] leading-relaxed font-light">
                <p>
                  <strong className="font-medium text-[#173D34]">Nair’s Epigenetic Wellness is an outpatient mental health and wellbeing centre.</strong> We are not an emergency service or crisis facility.
                </p>
                <p>
                  If you or someone you know is in immediate danger, experiencing severe crisis, or having thoughts of self-harm, please reach out to emergency services immediately:
                </p>
              </div>

              {/* Helplines Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3">
                {emergencyHelplines.map((hl) => (
                  <div key={hl.name} className="p-4 rounded-2xl bg-white border border-[#D97706]/20 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-medium text-[#7D6335] block uppercase tracking-wider mb-1">
                        {hl.name}
                      </span>
                      <span className="font-serif text-lg font-bold text-[#173D34] block">
                        {hl.number}
                      </span>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#E8EDE4] flex items-center justify-between text-[11px] text-[#59675F]">
                      <span className="font-light">{hl.note}</span>
                      {hl.tel && (
                        <a
                          href={`tel:${hl.tel}`}
                          className="text-[#D97706] font-medium hover:underline inline-flex items-center gap-1 shrink-0 ml-2"
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>Call</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#7D6335] font-medium pt-2">
                Your safety is the priority. Please seek immediate medical help in an emergency.
              </p>
            </div>
          </div>
        </div>

        {/* DECISION HELPER & FINAL NAVIGATION CTA */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#173D34] via-[#12332B] to-[#0D241E] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#DFBD83]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="w-12 h-12 rounded-full bg-[#DFBD83]/20 border border-[#DFBD83]/40 text-[#DFBD83] flex items-center justify-center mx-auto">
              <HelpCircle className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F7F5EF]">
              Not sure which service is{" "}
              <span className="italic text-[#DFBD83]">right for you?</span>
            </h3>

            <p className="font-sans text-base sm:text-lg text-[#E8EDE4]/90 font-light leading-relaxed max-w-2xl mx-auto">
              You don&apos;t need to figure everything out before reaching out. Start with our Mental Wellbeing Self-Assessment, or speak to one of our professionals about your concerns.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/assessment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#DFBD83] hover:bg-[#c9a76d] text-[#102E27] text-sm sm:text-base font-semibold tracking-wide shadow-xl transition-all hover:scale-[1.02]"
              >
                <ClipboardList className="w-4 h-4" />
                <span>TAKE THE ASSESSMENT</span>
              </Link>

              <button
                onClick={() => onOpenBooking("Treatment & Support Plans Consultation")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F5EF] text-sm sm:text-base font-medium tracking-wide border border-[#DFBD83]/40 hover:border-[#DFBD83] transition-all"
              >
                <span>BOOK A CONSULTATION</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

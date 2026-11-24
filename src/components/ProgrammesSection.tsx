"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Briefcase, Calendar, Check, GraduationCap, School, Users } from "lucide-react";

export default function ProgrammesSection({ onOpenBooking }: { onOpenBooking: (programName?: string) => void }) {
  const [activeTab, setActiveTab] = useState<"programmes" | "workshops">("programmes");

  const programmes = [
    {
      id: "internships",
      tag: "01 / LEARN",
      title: "Psychology & Counselling Internships",
      audience: "Undergraduate & Postgraduate Psychology Students",
      desc: "Immersive practical exposure designed to bridge academic theory and real-world clinical/counselling applications.",
      highlights: [
        "Case formulation & ethical practice",
        "Clinical observation & psychoeducation",
        "Counselling micro-skills laboratory",
        "Certificate of clinical completion",
      ],
      icon: GraduationCap,
    },
    {
      id: "mentorship",
      tag: "02 / DEVELOP",
      title: "Practitioner Mentorship",
      audience: "Early-Career Counsellors & Helping Professionals",
      desc: "One-on-one reflective supervision and guidance to help emerging practitioners cultivate their authentic clinical voice and boundaries.",
      highlights: [
        "Case conceptualisation review",
        "Managing therapeutic transference & countertransference",
        "Self-care & avoiding practitioner burnout",
        "Private practice setup & ethical compliance",
      ],
      icon: Users,
    },
    {
      id: "corporate",
      tag: "03 / WORKPLACE",
      title: "Corporate Wellbeing & Leadership",
      audience: "Enterprises, Startups & HR Departments",
      desc: "Science-backed interventions that transform workplace stress, emotional overwhelm, and conflict into engagement, psychological safety, increased focus and productivity.",
      highlights: [
        "Executive stress mastery & somatic pacing",
        "Non-Violent Communication in high-stakes teams",
        "Preventing quiet burnout & turnover",
        "Customized CSR mental health initiatives",
      ],
      icon: Briefcase,
    },
    {
      id: "educational",
      tag: "04 / EDUCATE",
      title: "Educational Ecosystem Empowerment",
      audience: "Schools, Teachers, Counselors & Parents",
      desc: "Comprehensive educational ecosystem empowerment curricula cultivating emotional awareness, adolescent resilience, and healthy classroom dynamics.",
      highlights: [
        "Screening, identification, referral, intervention",
        "Awareness campaigns and mental health events",
        "Parent-teacher collaborative communication",
        "Peer support, SEL framework & suicide prevention workshops",
      ],
      icon: School,
    },
  ];

  const workshops = [
    {
      title: "Suicide Prevention & Crisis Sensitisation",
      format: "Half-Day Intensive Workshop",
      desc: "Recognising subtle warning signs, active listening protocols, crisis de-escalation, and ethical referral pathways.",
      badge: "Community & Clinical",
    },
    {
      title: "Non-Violent Communication (NVC) in Daily Life",
      format: "2-Day Weekend Experiential Lab",
      desc: "Expressing feelings and needs clearly without blame, transforming defensiveness into empathetic dialogue.",
      badge: "Relational Skills",
    },
    {
      title: "Stress Mastery & Somatic Regulation",
      format: "Interactive 4-Week Series",
      desc: "Evidence-based techniques to down-regulate high-cortisol states, restore sleep architecture, and reset the vagus nerve.",
      badge: "Wellbeing & Health",
    },
    {
      title: "Mindful Parenting & Family Harmony",
      format: "Weekend Masterclass",
      desc: "Navigating child and adolescent emotional turbulence with calm presence, firm warmth, and mutual respect.",
      badge: "Family Systems",
    },
  ];

  return (
    <section id="programmes" className="py-20 lg:py-28 bg-[#F4F7F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#9E783E]" />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
                Learning &amp; Professional Development
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
              Learning that creates{" "}
              <span className="italic text-[#7D6335]">practical change.</span>
            </h2>

            <p className="mt-4 font-sans text-sm sm:text-base text-[#465A4F] leading-relaxed font-light">
              N.E.W. is not limited to individual therapy. We empower students, educators, professionals, and organizations with rigorous psychological knowledge made actionable.
            </p>
          </div>

          {/* Toggle Tab */}
          <div className="flex p-1 rounded-full bg-[#DCE7DA] border border-[#B8C9B5] self-start md:self-end">
            <button
              onClick={() => setActiveTab("programmes")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === "programmes"
                  ? "bg-[#1E3F35] text-[#F7F5EF] shadow-sm"
                  : "text-[#173D34] hover:text-[#7D6335]"
              }`}
            >
              Professional Tracks
            </button>
            <button
              onClick={() => setActiveTab("workshops")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === "workshops"
                  ? "bg-[#1E3F35] text-[#F7F5EF] shadow-sm"
                  : "text-[#173D34] hover:text-[#7D6335]"
              }`}
            >
              Workshops &amp; Events
            </button>
          </div>
        </div>

        {/* Tab 1: Professional Programmes */}
        {activeTab === "programmes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
            {programmes.map((prog) => {
              const Icon = prog.icon;
              return (
                <div
                  key={prog.id}
                  className="bg-[#E6EEE3] rounded-3xl p-8 border border-[#C8D6C6] hover:bg-[#EBF2E8] hover:border-[#9E783E] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-sans font-bold tracking-widest text-[#7D6335] uppercase">
                        {prog.tag}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[#D7E3D3] text-[#1E3F35] flex items-center justify-center group-hover:bg-[#1E3F35] group-hover:text-[#DFBD83] transition-colors">
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#173D34] mb-2 group-hover:text-[#7D6335] transition-colors">
                      {prog.title}
                    </h3>

                    <div className="inline-block px-3 py-1 rounded-full bg-[#DCE7DA] text-[11px] font-medium text-[#24352D] border border-[#B8C9B5] mb-4">
                      For: {prog.audience}
                    </div>

                    <p className="font-sans text-sm text-[#465A4F] leading-relaxed font-light mb-6">
                      {prog.desc}
                    </p>

                    <div className="space-y-2 mb-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#173D34] block">
                        Core Curriculum Focus:
                      </span>
                      {prog.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-[#24352D]">
                          <Check className="w-3.5 h-3.5 text-[#7D6335] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#C8D6C6] flex items-center justify-between">
                    <span className="text-xs text-[#465A4F]">Cohort &amp; Institutional Batches</span>
                    <button
                      onClick={() => onOpenBooking(prog.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3F35] hover:text-[#7D6335] group-hover:underline transition-colors"
                    >
                      <span>Apply / Enquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#7D6335]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Workshops & Events */}
        {activeTab === "workshops" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300" id="workshops">
            {workshops.map((ws, idx) => (
              <div
                key={idx}
                className="bg-[#E6EEE3] rounded-2xl p-7 border border-[#C8D6C6] hover:bg-[#EBF2E8] hover:border-[#9E783E] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#D7E3D3] text-[#1E3F35] text-[10px] font-bold tracking-widest uppercase">
                      {ws.badge}
                    </span>
                    <span className="text-xs text-[#7D6335] flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {ws.format}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#173D34] mb-3">
                    {ws.title}
                  </h3>

                  <p className="font-sans text-sm text-[#465A4F] leading-relaxed font-light mb-6">
                    {ws.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C8D6C6] flex items-center justify-between">
                  <span className="text-xs text-[#465A4F]">Open for Individual &amp; Group Registration</span>
                  <button
                    onClick={() => onOpenBooking(`Workshop: ${ws.title}`)}
                    className="px-4 py-2 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-xs font-medium tracking-wide transition-all"
                  >
                    Reserve Seat &rarr;
                  </button>
                </div>
              </div>
            ))}

            <div className="md:col-span-2 pt-2 text-center">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#DFBD83] hover:text-[#F7F5EF] text-xs font-semibold tracking-wide transition-all shadow-md"
              >
                <span>Explore All Upcoming &amp; Past Events &amp; Gallery</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Custom Corporate & Institutional Callout */}
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-[#274B3E] via-[#1E3F35] to-[#17352B] p-8 sm:p-10 text-[#F7F5EF] flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-[#C8D6C6]/20">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#DFBD83] font-semibold">
              Tailored Training Solutions
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mt-1">
              Custom Institutional &amp; Campus Workshops
            </h3>
            <p className="text-xs sm:text-sm text-[#E8EDE4]/90 mt-2 font-light leading-relaxed">
              We design bespoke mental wellness curricula, crisis management frameworks, and sensitization modules for institutions across India and internationally.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking("Institutional Collaboration")}
            className="shrink-0 px-6 py-3.5 rounded-full bg-[#DFBD83] hover:bg-[#c9a76d] text-[#17352B] text-sm font-semibold tracking-wide shadow-md transition-all"
          >
            Discuss Organisational Needs
          </button>
        </div>

      </div>
    </section>
  );
}


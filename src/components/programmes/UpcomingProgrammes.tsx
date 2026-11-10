"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Users, Clock, MessageCircle } from "lucide-react";

interface UpcomingProgrammesProps {
  onOpenBooking: (programmeName: string) => void;
}

export default function UpcomingProgrammes({ onOpenBooking }: UpcomingProgrammesProps) {
  const events = [
    {
      title: "Suicide Prevention & Crisis Sensitisation",
      category: "Interactive Masterclass",
      mode: "Online Cohort",
      audience: "Students & Early Practitioners",
      duration: "Intensive Weekend Module",
      desc: "Crucial clinical awareness, ethical protocols, early warning signs, empathetic risk assessment and structured referral paths.",
      date: "Upcoming Batch",
    },
    {
      title: "Non-Violent Communication (NVC) in Practice",
      category: "Skill Development Series",
      mode: "Hybrid / Kochi Centre",
      audience: "Professionals & Educators",
      duration: "2-Day Reflective Immersion",
      desc: "Transformative dialogue frameworks, de-escalating conflicts, compassionate listening, and emotional regulation in workplace and classrooms.",
      date: "Upcoming Batch",
    },
    {
      title: "Stress Mastery & Somatic Down-Regulation",
      category: "Applied Wellbeing Masterclass",
      mode: "Interactive Virtual Session",
      audience: "Open to All Learners & Teams",
      duration: "4-Hour Focused Workshop",
      desc: "Nervous system down-regulation techniques, epigenetic stress insights, breath protocols, and actionable daily recovery rituals.",
      date: "Upcoming Batch",
    },
  ];

  return (
    <section id="upcoming" className="py-20 lg:py-28 bg-[#102E27] text-[#F7F5EF] relative overflow-hidden">
      {/* Ambient background radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#173D34] rounded-full blur-3xl pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 lg:mb-18">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#173D34] border border-[#B58B50]/30 text-[#DFBD83] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFBD83]" />
              UPCOMING OPPORTUNITIES
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.2] tracking-tight">
              What&apos;s Coming Up <br />
              <span className="italic text-[#DFBD83]">at N.E.W.?</span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm sm:text-base text-[#E8EDE4]/80 font-light leading-relaxed">
            Upcoming programmes and workshops will be announced here. Contact us to learn more about future cohorts and institutional collaborations.
          </p>
        </div>

        {/* 3 Upcoming Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {events.map((ev, i) => (
            <div
              key={i}
              className="bg-[#173D34]/90 rounded-3xl p-7 border border-[#B58B50]/30 hover:border-[#DFBD83] transition-all duration-300 shadow-lg flex flex-col justify-between group"
            >
              <div>
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-[10px] font-sans uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#102E27] text-[#DFBD83] border border-[#B58B50]/30 font-medium">
                    {ev.category}
                  </span>
                  <span className="text-[10px] font-sans tracking-wide px-2.5 py-1 rounded-full bg-white/10 text-white/90">
                    {ev.mode}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-medium text-white mb-3 group-hover:text-[#DFBD83] transition-colors leading-snug">
                  {ev.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#E8EDE4]/80 font-light leading-relaxed mb-6">
                  {ev.desc}
                </p>

                {/* Details list */}
                <div className="space-y-2 border-t border-[#102E27] pt-4 text-xs font-sans text-[#E8EDE4]/70">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#DFBD83] shrink-0" />
                    <span>{ev.audience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#DFBD83] shrink-0" />
                    <span>{ev.duration}</span>
                  </div>
                </div>
              </div>

              {/* Card Action */}
              <div className="mt-6 pt-4 border-t border-[#102E27] flex items-center justify-between">
                <span className="text-xs font-serif text-[#DFBD83] italic">
                  {ev.date}
                </span>

                <button
                  onClick={() => onOpenBooking(ev.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#DFBD83] transition-colors"
                >
                  <span>Enquire Batch</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#DFBD83]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation Link */}
        <div className="text-center pt-4">
          <Link
            href="/#workshops"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F5EF] text-sm font-medium border border-white/10 hover:border-[#DFBD83]/40 transition-all"
          >
            <span>View All Workshops &amp; Events</span>
            <ArrowUpRight className="w-4 h-4 text-[#DFBD83]" />
          </Link>
        </div>

      </div>
    </section>
  );
}


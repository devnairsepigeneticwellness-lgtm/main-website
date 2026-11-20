"use client";

import React, { useState } from "react";
import { ArrowUpRight, Users, User, UserCheck } from "lucide-react";
import ServiceDetailModal from "@/components/services/ServiceDetailModal";

interface DetailedCounsellingProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function DetailedCounselling({ onOpenBooking }: DetailedCounsellingProps) {
  const [selectedStreamId, setSelectedStreamId] = useState<string | null>(null);

  const counsellingStreams = [
    {
      id: "individual",
      title: "Individual Counselling",
      tagline: "Dedicated one-to-one time with a professional.",
      icon: User,
      lead: "Individual counselling gives you dedicated one-to-one time with a professional. The sessions are tailored to your needs and pace.",
      focusTitle: "Sessions may focus on:",
      topics: [
        "Stress and emotional difficulties",
        "Anxiety and worry",
        "Low mood and motivation",
        "Self-esteem and confidence",
        "Relationship concerns",
        "Life transitions",
        "Emotional regulation",
        "Personal growth",
        "Difficult decisions",
        "Coping with challenging experiences",
      ],
      badge: "One-to-One",
    },
    {
      id: "family",
      title: "Family Counselling",
      tagline: "Better understanding and healthier ways of relating.",
      icon: Users,
      lead: "Sometimes a person's difficulties are closely connected with family relationships and communication. Family counselling provides a space where family members can better understand one another, communicate more openly, and work through difficulties together.",
      focusTitle: "It may be helpful when families are experiencing:",
      topics: [
        "Communication difficulties",
        "Frequent conflict",
        "Parenting concerns",
        "Changes within the family",
        "Difficulties involving children or adolescents",
        "Relationship strain",
        "Major life transitions",
      ],
      badge: "Family Systems",
      closing: "The goal is to create better understanding and healthier ways of relating to one another.",
    },
    {
      id: "group",
      title: "Group Counselling",
      tagline: "A structured, supportive environment for learning and sharing.",
      icon: Users,
      lead: "Some experiences become easier to work through when people realise that they are not alone. Group counselling brings together people who may be facing similar concerns and provides a structured, supportive environment for learning and sharing.",
      focusTitle: "Groups may focus on areas such as:",
      topics: [
        "Emotional regulation",
        "Stress management",
        "Relationships",
        "Mindfulness",
        "Self-development",
        "Grief and adjustment",
        "Addiction recovery",
        "Life skills",
      ],
      badge: "Peer Community",
      closing: "Group programs are facilitated by a trained professional and are designed around the needs of the participants.",
    },
    {
      id: "adolescent",
      title: "Adolescent & Young Adult Counselling",
      tagline: "Age-appropriate support through formative transitions.",
      icon: UserCheck,
      lead: "Growing up brings its own set of challenges. Young people may struggle with academic pressure, friendships, identity, family expectations, relationships, emotional changes, confidence, or uncertainty about the future.",
      focusTitle: "Core Areas of Guidance:",
      topics: [
        "Academic & exam pressure",
        "Friendships and peer identity",
        "Family expectations & communication",
        "Emotional changes & mood swings",
        "Confidence and self-worth",
        "Future uncertainty and career anxiety",
      ],
      badge: "Youth Guidance",
      closing: "We provide age-appropriate support that allows young people to talk openly and develop healthier ways of understanding and managing their experiences.",
    },
  ];

  const activeStream = counsellingStreams.find((s) => s.id === selectedStreamId);

  return (
    <section id="counselling" className="py-16 lg:py-24 bg-[#F4F7F2] border-b border-[#C8D6C6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#9E783E]" />
            <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
              01. COUNSELLING
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            A space to understand, express, and{" "}
            <span className="italic text-[#7D6335]">work through what you are experiencing.</span>
          </h2>

          <div className="mt-5 space-y-3 font-sans text-sm sm:text-base text-[#3F5448] leading-relaxed font-light">
            <p>
              Counselling provides a safe and supportive space where you can talk about what is happening in your life with a trained professional.
            </p>
            <p>
              You may seek counselling because you are going through a difficult period, struggling with relationships, feeling emotionally overwhelmed, or simply wanting to understand yourself better.
            </p>
            <p className="text-[#173D34] font-normal">
              Counselling can help you make sense of your experiences, identify patterns, explore choices, and develop practical ways of coping.
            </p>
          </div>
        </div>

        {/* 4 Streams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {counsellingStreams.map((stream) => {
            const Icon = stream.icon;
            return (
              <div
                key={stream.id}
                className="rounded-3xl bg-[#E6EEE3] border border-[#C8D6C6] hover:border-[#9E783E] hover:bg-[#EBF2E8] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#D7E3D3] text-[#1E3F35] flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" strokeWidth={1.75} />
                    </div>
                    <span className="text-[11px] font-sans uppercase tracking-[0.16em] font-semibold text-[#7D6335] bg-[#DEE7DB] px-3 py-1 rounded-full border border-[#B8C9B5]">
                      {stream.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[#173D34] mb-1">
                    {stream.title}
                  </h3>
                  <p className="text-xs font-sans tracking-wide text-[#7D6335] font-semibold mb-3">
                    {stream.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#465A4F] leading-relaxed font-light mb-4 line-clamp-3">
                    {stream.lead}
                  </p>

                  {/* Preview of Topics with direct trigger to open complete modal */}
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-[#173D34] block mb-2">
                      {stream.focusTitle}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#24352D]">
                      {stream.topics.slice(0, 4).map((t, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7D6335] mt-1.5 shrink-0" />
                          <span className="truncate">{t}</span>
                        </div>
                      ))}
                    </div>
                    {stream.topics.length > 4 && (
                      <p className="mt-2 text-[11px] text-[#7D6335] font-medium">
                        + {stream.topics.length - 4} more focus areas
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#C8D6C6] flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedStreamId(stream.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D34] hover:text-[#7D6335] bg-[#DEE7DB] hover:bg-[#D7E3D3] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                  >
                    <span>View Full Details &amp; Focus Areas</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#7D6335]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenBooking(stream.title)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E3F35] hover:text-[#7D6335] transition-colors cursor-pointer ml-auto"
                  >
                    <span>Book Consultation</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#7D6335]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* STREAM MODAL: FULL EXACT CONTENT (NO WORD CHANGED) */}
      {activeStream && (
        <ServiceDetailModal
          isOpen={!!selectedStreamId}
          onClose={() => setSelectedStreamId(null)}
          title={activeStream.title}
          badge={activeStream.badge}
          tagline={activeStream.tagline}
          onBook={() => onOpenBooking(activeStream.title)}
          bookLabel="Book Consultation"
        >
          <div className="space-y-6">
            <p className="text-[#3F5448] font-light leading-relaxed">
              {activeStream.lead}
            </p>

            <div className="p-6 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
              <h4 className="font-serif text-lg font-medium text-[#173D34] mb-4">
                {activeStream.focusTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#24352D]">
                {activeStream.topics.map((t, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7D6335] mt-2 shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {activeStream.closing && (
              <p className="p-4 rounded-xl bg-[#EBF2E8] border border-[#C8D6C6] text-sm text-[#384D42] italic">
                {activeStream.closing}
              </p>
            )}
          </div>
        </ServiceDetailModal>
      )}
    </section>
  );
}

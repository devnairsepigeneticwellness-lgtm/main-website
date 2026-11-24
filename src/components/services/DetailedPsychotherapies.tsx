"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import ServiceDetailModal from "@/components/services/ServiceDetailModal";
import PractitionerLinks from "@/components/services/PractitionerLinks";
import { servicesCopy } from "@/data/servicesData";

interface DetailedPsychotherapiesProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function DetailedPsychotherapies({ onOpenBooking }: DetailedPsychotherapiesProps) {
  const [selectedTherapyCode, setSelectedTherapyCode] = useState<string | null>(null);

  const psychotherapies = [
    {
      code: "CBT",
      title: "Cognitive Behaviour Therapy — CBT",
      tagline: "Understanding the connection between thoughts, feelings, and actions.",
      desc: "CBT helps you notice patterns in the way you think and how those thoughts influence your emotions and behaviour. For example, a thought such as “I am going to fail” may create anxiety, which may then lead to avoiding the situation altogether. CBT helps you examine these patterns and develop more balanced and helpful ways of responding.",
      usedFor: "Anxiety • Low mood • Stress • Confidence difficulties • Behavioural concerns",
    },
    {
      code: "REBT",
      title: "Rational Emotive Behaviour Therapy — REBT",
      tagline: "Understanding how our beliefs influence how we feel.",
      desc: "REBT focuses on the beliefs we hold about ourselves, other people, and the situations we experience. Sometimes it is not only what happens to us that creates emotional difficulty, but also the expectations and beliefs we attach to what happens. REBT helps people identify unhelpful beliefs and develop more flexible and realistic ways of thinking.",
      usedFor: "Rigid demands • Self-criticism • Frustration tolerance • Emotional balance",
    },
    {
      code: "DBT",
      title: "Dialectical Behaviour Therapy — DBT",
      tagline: "Learning to manage strong emotions and difficult situations.",
      desc: "DBT teaches practical skills for handling intense emotions, relationships, stress, and difficult situations. DBT can be particularly useful for people who feel that their emotions sometimes become overwhelming or difficult to manage.",
      skills: [
        "Understanding emotions",
        "Managing emotional reactions",
        "Handling stressful situations",
        "Improving relationships",
        "Becoming more aware of the present moment",
      ],
      usedFor: "Intense emotions • Distress tolerance • Interpersonal effectiveness",
    },
    {
      code: "ACT",
      title: "Acceptance and Commitment Therapy — ACT",
      tagline: "Learning to make room for difficult experiences while moving towards what matters.",
      desc: "ACT helps people understand their thoughts and feelings without allowing difficult internal experiences to completely control their actions. It focuses on building psychological flexibility and identifying the values that matter to you. The aim is to help you take meaningful steps towards the life you want to build.",
      usedFor: "Psychological flexibility • Value clarification • Mindful action",
    },
    {
      code: "IPT",
      title: "Interpersonal Therapy — IPT",
      tagline: "Understanding how relationships and life changes affect emotional wellbeing.",
      desc: "Our relationships can have a significant impact on how we feel. IPT focuses on difficulties in relationships, communication, grief, major changes in life, and the role these experiences can play in emotional wellbeing. It can help people understand relationship patterns and develop healthier ways of communicating and connecting.",
      usedFor: "Relationship transitions • Grief & loss • Interpersonal disputes",
    },
    {
      code: "MBCT",
      title: "Mindfulness-Based Cognitive Therapy — MBCT",
      tagline: "Learning to become more aware of your thoughts and emotions.",
      desc: "MBCT combines mindfulness practices with elements of CBT. It teaches you to notice thoughts, feelings, and reactions with greater awareness, helping you develop a different relationship with your internal experiences. Mindfulness can also become a practical everyday skill for managing stress and improving emotional awareness.",
      usedFor: "Depressive relapse prevention • Chronic rumination • Emotional awareness",
    },
    {
      code: "SFBT",
      title: "Solution-Focused Brief Therapy — SFBT",
      tagline: "Focusing on where you want to go, not only on what has gone wrong.",
      desc: "SFBT focuses on your strengths, resources, existing abilities, and the changes you would like to make. Instead of spending all the time understanding the problem, sessions explore practical and achievable change.",
      questions: [
        "What would you like to be different?",
        "What is already working?",
        "What small change could you make next?",
      ],
      usedFor: "Goal orientation • Resource activation • Actionable next steps",
    },
    {
      code: "EFT",
      title: "Emotionally Focused Therapy — EFT",
      tagline: "Understanding emotions and strengthening relationships.",
      desc: "EFT helps people understand the emotions underneath relationship difficulties. It can help individuals and couples recognise emotional patterns, communicate their needs, and develop stronger and more secure relationships.",
      usedFor: "Couples & individuals • Attachment safety • Deep emotional bonding",
    },
    {
      code: "CT",
      title: "Cognitive Therapy — CT",
      tagline: "Looking at the thinking patterns behind emotional difficulties.",
      desc: "Cognitive Therapy focuses on identifying patterns of thinking that may contribute to emotional distress. It helps individuals examine these patterns and develop healthier and more balanced perspectives.",
      usedFor: "Cognitive distortions • Core beliefs • Perspective reframing",
    },
    {
      code: "BT",
      title: "Behaviour Therapy — BT",
      tagline: "Changing behaviours to create positive change.",
      desc: "Behaviour Therapy focuses on the relationship between behaviour and the environment around us. It helps individuals understand behaviours that may be creating difficulties and develop healthier, more useful behavioural patterns.",
      usedFor: "Habit restructuring • Environmental conditioning • Positive reinforcement",
    },
  ];

  const activeTherapy = psychotherapies.find((p) => p.code === selectedTherapyCode);

  return (
    <section id="psychotherapies" className="py-16 lg:py-24 bg-[#EBF1E8] border-b border-[#C8D6C6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#9E783E]" />
            <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
              02. PSYCHOTHERAPIES
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Different approaches for{" "}
            <span className="italic text-[#7D6335]">different needs.</span>
          </h2>

          <div className="mt-5 space-y-3 font-sans text-sm sm:text-base text-[#3F5448] leading-relaxed font-light">
            <p>
              Psychotherapy is a deeper form of psychological support that helps people understand patterns in their thoughts, emotions, behaviours, and relationships.
            </p>
            <p>
              There is no single therapy that works in exactly the same way for everyone. Different approaches can be used depending on the person&apos;s concerns and goals.
            </p>
            <p className="text-[#173D34] font-normal">
              At N.E.W., our professionals have training in a comprehensive range of evidence-based therapeutic approaches.
            </p>
          </div>
        </div>

        {/* 10 Psychotherapies Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {psychotherapies.map((pt) => (
            <div
              key={pt.code}
              className="rounded-3xl bg-[#F2F6F0] border border-[#C8D6C6] hover:border-[#9E783E] hover:bg-[#F6FAF4] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-sans uppercase tracking-[0.2em] font-bold text-[#7D6335]">
                    {pt.code}
                  </span>
                  <span className="text-[11px] font-medium text-[#1E3F35] bg-[#DEE7DB] px-2.5 py-0.5 rounded-full border border-[#B8C9B5]">
                    Clinical Modality
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-medium text-[#173D34] mb-1">
                  {pt.title}
                </h3>
                <p className="text-xs font-sans tracking-wide text-[#7D6335] font-semibold mb-3">
                  {pt.tagline}
                </p>

                <p className="text-xs sm:text-sm text-[#465A4F] leading-relaxed font-light mb-4 line-clamp-3">
                  {pt.desc}
                </p>

                {pt.usedFor && (
                  <div className="pt-2.5 border-t border-[#C8D6C6]/60 text-xs text-[#384D42] line-clamp-2">
                    <span className="font-semibold text-[#173D34]">Often used for: </span>
                    <span>{pt.usedFor}</span>
                  </div>
                )}

                {(() => {
                  const matched = servicesCopy.psychotherapies.items.find((item) => item.code === pt.code);
                  return matched ? (
                    <div className="mt-3">
                      <PractitionerLinks
                        professionalIds={matched.professionalIds}
                        label={`Practitioners Trained in ${pt.code}`}
                      />
                    </div>
                  ) : null;
                })()}
              </div>

              <div className="mt-5 pt-4 border-t border-[#C8D6C6] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTherapyCode(pt.code)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#173D34] hover:text-[#7D6335] bg-[#DEE7DB] hover:bg-[#D7E3D3] px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  <span>View Approach &amp; Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7D6335]" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenBooking(`Psychotherapy: ${pt.code}`)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E3F35] hover:text-[#7D6335] transition-colors cursor-pointer"
                >
                  <span>Enquire</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7D6335]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* THERAPY MODAL: FULL EXACT CONTENT (NO WORD CHANGED) */}
      {activeTherapy && (
        <ServiceDetailModal
          isOpen={!!selectedTherapyCode}
          onClose={() => setSelectedTherapyCode(null)}
          title={activeTherapy.title}
          badge={`Clinical Modality • ${activeTherapy.code}`}
          tagline={activeTherapy.tagline}
          onBook={() => onOpenBooking(`Psychotherapy: ${activeTherapy.code}`)}
          bookLabel="Enquire About This Therapy"
        >
          <div className="space-y-6">
            <p className="text-[#3F5448] font-light leading-relaxed text-base">
              {activeTherapy.desc}
            </p>

            {activeTherapy.skills && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
                <h4 className="font-serif text-lg font-medium text-[#173D34] mb-3">
                  Focus Skills Taught:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#24352D]">
                  {activeTherapy.skills.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#7D6335] shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTherapy.questions && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
                <h4 className="font-serif text-lg font-medium text-[#173D34] mb-3">
                  Key Exploration Questions:
                </h4>
                <div className="space-y-2 text-sm text-[#24352D] italic">
                  {activeTherapy.questions.map((q, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <span className="text-[#7D6335] text-base">&bull;</span>
                      <span>&ldquo;{q}&rdquo;</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTherapy.usedFor && (
              <div className="p-4 rounded-xl bg-[#EAF0E7] border border-[#C8D6C6] text-sm text-[#384D42]">
                <span className="font-semibold text-[#173D34]">Often used for: </span>
                <span>{activeTherapy.usedFor}</span>
              </div>
            )}
          </div>
        </ServiceDetailModal>
      )}
    </section>
  );
}

"use client";

import React from "react";
import { ArrowUpRight, Heart, Users, User, UserCheck, Brain, Check, Sparkles } from "lucide-react";

interface DetailedCounsellingProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function DetailedCounselling({ onOpenBooking }: DetailedCounsellingProps) {
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

  return (
    <div className="space-y-0">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: COUNSELLING
      ───────────────────────────────────────────────────────────── */}
      <section id="counselling" className="py-20 lg:py-28 bg-[#F4F7F2] border-b border-[#C8D6C6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#9E783E]" />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
                COUNSELLING
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {counsellingStreams.map((stream) => {
              const Icon = stream.icon;
              return (
                <div
                  key={stream.id}
                  className="rounded-3xl bg-[#E6EEE3] border border-[#C8D6C6] hover:border-[#9E783E] hover:bg-[#EBF2E8] p-8 flex flex-col justify-between transition-all duration-300 shadow-xs"
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

                    <p className="text-xs sm:text-sm text-[#465A4F] leading-relaxed font-light mb-5">
                      {stream.lead}
                    </p>

                    <div className="mb-4">
                      <span className="text-xs font-semibold text-[#173D34] block mb-2.5">
                        {stream.focusTitle}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#24352D]">
                        {stream.topics.map((t, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7D6335] mt-1.5 shrink-0" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {stream.closing && (
                      <p className="mt-4 pt-3 border-t border-[#C8D6C6] text-xs text-[#384D42] italic">
                        {stream.closing}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-5 border-t border-[#C8D6C6] flex items-center justify-between">
                    <span className="text-xs text-[#556A5E]">Tailored to your pace</span>
                    <button
                      onClick={() => onOpenBooking(stream.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3F35] hover:text-[#7D6335] transition-colors cursor-pointer"
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
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: PSYCHOTHERAPIES (10 Modalities)
      ───────────────────────────────────────────────────────────── */}
      <section id="psychotherapies" className="py-20 lg:py-28 bg-[#EBF1E8] border-b border-[#C8D6C6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#9E783E]" />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
                PSYCHOTHERAPIES
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
                There is no single therapy that works in exactly the same way for everyone. Different approaches can be used depending on the person's concerns and goals.
              </p>
              <p className="text-[#173D34] font-normal">
                At N.E.W., our professionals have training in a comprehensive range of evidence-based therapeutic approaches.
              </p>
            </div>
          </div>

          {/* 10 Psychotherapies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {psychotherapies.map((pt) => (
              <div
                key={pt.code}
                className="rounded-3xl bg-[#F2F6F0] border border-[#C8D6C6] hover:border-[#9E783E] hover:bg-[#F6FAF4] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-sans uppercase tracking-[0.2em] font-bold text-[#7D6335]">
                      {pt.code}
                    </span>
                    <span className="text-[11px] font-medium text-[#1E3F35] bg-[#DEE7DB] px-3 py-0.5 rounded-full border border-[#B8C9B5]">
                      Clinical Modality
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#173D34] mb-1">
                    {pt.title}
                  </h3>
                  <p className="text-xs font-sans tracking-wide text-[#7D6335] font-semibold mb-3">
                    {pt.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#465A4F] leading-relaxed font-light mb-4">
                    {pt.desc}
                  </p>

                  {pt.skills && (
                    <div className="mb-4 p-3.5 rounded-xl bg-[#E6EEE3] border border-[#C8D6C6]">
                      <span className="text-xs font-semibold text-[#173D34] block mb-2">
                        Focus Skills Taught:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#24352D]">
                        {pt.skills.map((s, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#7D6335] shrink-0" />
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {pt.questions && (
                    <div className="mb-4 p-3.5 rounded-xl bg-[#E6EEE3] border border-[#C8D6C6]">
                      <span className="text-xs font-semibold text-[#173D34] block mb-2">
                        Key Exploration Questions:
                      </span>
                      <div className="space-y-1 text-xs text-[#24352D] italic">
                        {pt.questions.map((q, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-[#7D6335]">&bull;</span>
                            <span>&ldquo;{q}&rdquo;</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {pt.usedFor && (
                    <div className="pt-3 border-t border-[#C8D6C6]/60 text-xs text-[#384D42]">
                      <span className="font-semibold text-[#173D34]">Often used for: </span>
                      <span>{pt.usedFor}</span>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-[#C8D6C6] flex items-center justify-between">
                  <span className="text-[11px] text-[#556A5E]">Evidence-based psychological care</span>
                  <button
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
      </section>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Sparkles, Brain, CheckCircle2, ShieldCheck, Zap, ArrowUpRight, Clock, HelpCircle, Activity } from "lucide-react";
import ServiceDetailModal from "@/components/services/ServiceDetailModal";

interface DetailedHypnotherapyProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function DetailedHypnotherapy({ onOpenBooking }: DetailedHypnotherapyProps) {
  const [activeModal, setActiveModal] = useState<"brain" | "stages" | "suitability" | "transform" | null>(null);

  const threePillars = [
    {
      title: "A State of Deep Focus",
      desc: "A natural state of physical relaxation paired with heightened mental absorption (similar to deep meditation or daydreaming).",
    },
    {
      title: "Subconscious Rewiring",
      desc: "A direct pathway to update the 90% of your mind that governs automatic habits, anxiety triggers, and core emotional patterns.",
    },
    {
      title: "Evidence-Based & Collaborative",
      desc: "A clinically validated psychological tool where you work actively with a therapist to achieve your specific goals.",
    },
  ];

  const brainChanges = [
    {
      title: 'Bypasses the "Critical Filter"',
      desc: "Relaxes the analytical conscious mind so positive, therapeutic suggestions reach the subconscious directly without resistance.",
    },
    {
      title: "Boosts Neuroplasticity",
      desc: "Makes the brain exceptionally receptive to creating new, healthy cognitive habits and thought patterns faster than conventional talk therapy.",
    },
    {
      title: "Enhances Deep Focus",
      desc: "Allows your physical body to fully relax while your inner mind locks onto solutions, memories, and emotional insights hidden beneath daily mental noise.",
    },
  ];

  const sessionStages = [
    {
      num: "01",
      title: "Goal Setting: Before we begin",
      desc: "We start with a friendly conversation. We talk about what brought you in, what you want to work on, and answer any questions you have so you feel completely comfortable.",
    },
    {
      num: "02",
      title: "Getting Relaxed (Induction): Easing into trance",
      desc: "You sit back comfortably, close your eyes, and listen to my voice. Through deep breathing and gentle relaxing exercises, your body completely unwinds just like settling in for a quiet break.",
    },
    {
      num: "03",
      title: "The Main Work: Tailored to your needs",
      desc: "While you are deeply relaxed, your mind becomes focused and open. Depending on what you need, we might reframe negative thoughts, use positive imagery, or look back at where an old habit or emotional reaction started so we can untangle it.",
    },
    {
      num: "04",
      title: "Waking Back Up (Emergence): Completing the process",
      desc: "Therapists gently guide you back to full alertness. You open your eyes feeling clear-headed, grounded, and well-rested—very much like waking up from a relaxing power nap.",
    },
  ];

  const suitabilityList = [
    {
      title: "Knowing What to Do, But Unable to Do It",
      desc: "You feel stuck in repetitive habits, overthinking, or emotional patterns despite knowing logically what you 'should' do.",
    },
    {
      title: "Exhausting Stress & Anxiety",
      desc: "Racing thoughts keep you awake at night, leave you feeling overwhelmed, or manifest as physical tension and fatigue.",
    },
    {
      title: "Talking Hasn't Changed How You Feel",
      desc: "Traditional talk therapy helps you understand why you feel a certain way, but the deep emotional reaction or habit remains untouched.",
    },
    {
      title: "Self-Sabotage & Imposter Syndrome",
      desc: "Sudden intense reactions to minor triggers, a persistent inner critic, or holding yourself back from reaching your full potential.",
    },
  ];

  const transformAreas = [
    {
      title: "Anxiety, Panic & Stress Management",
      desc: "Calms hyperactive fight-or-flight responses, lowers stress hormones, and conditions your nervous system to stay peaceful under pressure.",
    },
    {
      title: "Phobias & Fears",
      desc: "Safely desensitizes intense, irrational fears—such as fear of public speaking, flying, heights, or medical procedures—in a safe, controlled space.",
    },
    {
      title: "Trauma & Unresolved Emotional Pain",
      desc: "Accesses and gently releases painful emotional memories without forcing you to relive or re-traumatize yourself consciously.",
    },
    {
      title: "Breaking Stubborn Habits",
      desc: "Re-educates automatic subconscious patterns like emotional binge eating, smoking, nail-biting, and chronic procrastination.",
    },
    {
      title: "Mind-Body & Psychosomatic Relief",
      desc: "Alters the brain’s perception of physical discomfort to help manage tension headaches, IBS, sleep disturbances, and chronic muscle tightness.",
    },
    {
      title: "Confidence & High Performance",
      desc: "Overcomes imposter syndrome, rebuilds core self-worth, and sharpens mental focus for career, academics, athletics, or creative pursuits.",
    },
  ];

  return (
    <section id="hypnotherapy" className="py-16 lg:py-24 bg-[#F4F7F2] border-b border-[#C8D6C6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#9E783E]" />
            <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
              03. HYPNOTHERAPY
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] leading-[1.18] tracking-tight">
            Subconscious alignment &amp;{" "}
            <span className="italic text-[#7D6335]">collaborative focused trance.</span>
          </h2>

          <div className="mt-5 space-y-4 font-sans text-sm sm:text-base text-[#3F5448] leading-relaxed font-light">
            <p>
              Hypnotherapy is a safe, evidence-based, and highly structured therapeutic modality that utilizes trance—a natural state of deep relaxation and focused attention.
            </p>
            <p>
              In clinical terms, it is a tool used to bypass the critical, analytical filter of the conscious mind in order to communicate directly with the subconscious mind.
            </p>
            <div className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6] text-[#173D34] font-normal">
              When you try to break a habit or overcome an anxiety using willpower alone, you are using the <strong>10% conscious mind</strong> to battle the <strong>90% subconscious mind</strong>. Hypnotherapy bridges this gap. By guiding you into a calm, receptive state, we can update old &ldquo;mental software,&rdquo; release buried emotional blocks, and install healthier behavioral patterns at the root level.
            </div>
          </div>
        </div>

        {/* 3 Core Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {threePillars.map((p, idx) => (
            <div key={idx} className="p-6 sm:p-7 rounded-3xl bg-[#E6EEE3] border border-[#C8D6C6] shadow-xs">
              <span className="text-xs font-sans uppercase tracking-widest text-[#7D6335] font-semibold block mb-2">
                Pillar 0{idx + 1}
              </span>
              <h3 className="font-serif text-xl font-medium text-[#173D34] mb-2">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* What Hypnotherapy is NOT Banner */}
        <div className="mb-12 p-6 rounded-2xl bg-[#1E3F35] text-[#F7F5EF] text-center border border-[#DFBD83]/30 shadow-sm">
          <span className="text-xs uppercase tracking-widest text-[#DFBD83] font-semibold block mb-1">
            Clinical Transparency &amp; Safety
          </span>
          <p className="font-serif text-base sm:text-lg lg:text-xl text-[#F7F5EF] font-medium tracking-wide">
            HYPNOTHERAPY IS NEITHER stage performance OR entertainment NOR mind control or loss of will.
          </p>
        </div>

        {/* Interactive Feature Hub — Replaces 4 Giant Vertical Sections with Modal Access */}
        <div className="mb-12">
          <div className="max-w-2xl mb-6">
            <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
              Explore The Practice
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173D34]">
              Deep Dive into Hypnotherapy
            </h3>
            <p className="text-xs sm:text-sm text-[#465A4F] mt-1 font-light">
              Explore the neuroscience, step-by-step session walkthrough, self-assessment checklist, and transformational areas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Neuroscience */}
            <div className="rounded-3xl bg-[#EAF0E7] border border-[#C8D6C6] hover:border-[#9E783E] p-6 flex flex-col justify-between transition-all duration-300 shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#D7E3D3] text-[#1E3F35] flex items-center justify-center mb-4">
                  <Brain className="w-5 h-5" />
                </div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7D6335] block mb-1">
                  Neuroscience Basis
                </span>
                <h4 className="font-serif text-xl font-medium text-[#173D34] mb-2">
                  How Hypnotherapy Works in the Brain
                </h4>
                <p className="text-xs text-[#465A4F] leading-relaxed font-light mb-4">
                  Guided transitions from fast Beta waves into slower Alpha and Theta states, activating neuroplasticity and subconscious receptivity.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal("brain")}
                className="inline-flex items-center justify-between w-full pt-3 border-t border-[#C8D6C6] text-xs font-semibold text-[#173D34] hover:text-[#7D6335] transition-colors cursor-pointer"
              >
                <span>View 3 Brain Shifts</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#7D6335]" />
              </button>
            </div>

            {/* Card 2: Session Walkthrough */}
            <div className="rounded-3xl bg-[#E6EEE3] border border-[#C8D6C6] hover:border-[#9E783E] p-6 flex flex-col justify-between transition-all duration-300 shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#D7E3D3] text-[#1E3F35] flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7D6335] block mb-1">
                  Session Walkthrough
                </span>
                <h4 className="font-serif text-xl font-medium text-[#173D34] mb-2">
                  What Actually Happens During a Session
                </h4>
                <p className="text-xs text-[#465A4F] leading-relaxed font-light mb-4">
                  A four-stage clinical pathway: Goal Setting, Induction, The Main Work, and Emergence back to clear-headed alertness.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal("stages")}
                className="inline-flex items-center justify-between w-full pt-3 border-t border-[#C8D6C6] text-xs font-semibold text-[#173D34] hover:text-[#7D6335] transition-colors cursor-pointer"
              >
                <span>View 4-Stage Walkthrough</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#7D6335]" />
              </button>
            </div>

            {/* Card 3: Suitability Checklist */}
            <div className="rounded-3xl bg-[#EAF0E7] border border-[#C8D6C6] hover:border-[#9E783E] p-6 flex flex-col justify-between transition-all duration-300 shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#D7E3D3] text-[#1E3F35] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7D6335] block mb-1">
                  Self-Assessment
                </span>
                <h4 className="font-serif text-xl font-medium text-[#173D34] mb-2">
                  Is Hypnotherapy Right for You?
                </h4>
                <p className="text-xs text-[#465A4F] leading-relaxed font-light mb-4">
                  Key indicators from chronic overthinking to self-sabotage that suggest hypnotherapy is the ideal evidence-based tool.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal("suitability")}
                className="inline-flex items-center justify-between w-full pt-3 border-t border-[#C8D6C6] text-xs font-semibold text-[#173D34] hover:text-[#7D6335] transition-colors cursor-pointer"
              >
                <span>View Self-Assessment</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#7D6335]" />
              </button>
            </div>

            {/* Card 4: Transformation Areas */}
            <div className="rounded-3xl bg-[#E6EEE3] border border-[#C8D6C6] hover:border-[#9E783E] p-6 flex flex-col justify-between transition-all duration-300 shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#D7E3D3] text-[#1E3F35] flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7D6335] block mb-1">
                  Applications
                </span>
                <h4 className="font-serif text-xl font-medium text-[#173D34] mb-2">
                  How Hypnotherapy Can Help You Transform
                </h4>
                <p className="text-xs text-[#465A4F] leading-relaxed font-light mb-4">
                  6 areas of lasting change: Anxiety relief, phobias, unresolved trauma, habit rewiring, psychosomatic calm, and performance.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal("transform")}
                className="inline-flex items-center justify-between w-full pt-3 border-t border-[#C8D6C6] text-xs font-semibold text-[#173D34] hover:text-[#7D6335] transition-colors cursor-pointer"
              >
                <span>View All 6 Transform Areas</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#7D6335]" />
              </button>
            </div>
          </div>
        </div>

        {/* Why Choose Clinical Hypnotherapy with a Psychologist? */}
        <div className="rounded-3xl bg-gradient-to-br from-[#274B3E] via-[#1E3F35] to-[#17352B] p-8 sm:p-12 text-[#F7F5EF] shadow-md border border-[#C8D6C6]/20">
          <span className="text-xs uppercase tracking-widest text-[#DFBD83] font-semibold block mb-2">
            Clinical Standards &amp; Safety
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-4">
            Why Choose Clinical Hypnotherapy with a Psychologist?
          </h3>
          <div className="space-y-4 font-sans text-xs sm:text-sm text-[#E8EDE4]/90 font-light leading-relaxed max-w-3xl">
            <p>
              Psychological healing doesn&apos;t always have to take years of purely logical discussion. By combining standard psychological expertise with clinical hypnotherapy, we treat the mind as a complete system—working with both your conscious reasoning and your subconscious emotions. This empowers you to stop struggling against your own mind and align your deepest beliefs with the peace, health, and life you consciously desire.
            </p>
            <p>
              Receiving care from a qualified psychologist ensures that your therapy is rooted in rigorous clinical science, professional ethics, and psychological safety. It is an evidence-based tool seamlessly integrated into a comprehensive, personalized treatment plan designed just for you—using YOUR focused attention to foster healthy change in you.
            </p>
            <p className="pt-2 text-[11px] text-[#DFBD83]/85 italic border-t border-[#C8D6C6]/20">
              *Hypnotherapy is used as a complementary approach and is not presented as a replacement for appropriate medical or psychological care.
            </p>
          </div>
          <div className="mt-8 pt-4">
            <button
              onClick={() => onOpenBooking("Clinical Hypnotherapy")}
              className="px-7 py-3 rounded-full bg-[#DFBD83] hover:bg-[#c9a76d] text-[#17352B] text-xs font-semibold tracking-wide shadow-md transition-all cursor-pointer"
            >
              Consult About Hypnotherapy &rarr;
            </button>
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 1: BRAIN SHIFTS (EXACT CONTENT)
      ───────────────────────────────────────────────────────────── */}
      <ServiceDetailModal
        isOpen={activeModal === "brain"}
        onClose={() => setActiveModal(null)}
        title="How Hypnotherapy Works in the Brain"
        badge="Neuroscience Basis"
        tagline="From Beta stress into slower Alpha and Theta brainwave states."
        onBook={() => onOpenBooking("Clinical Hypnotherapy: Neuroscience")}
        bookLabel="Consult About Hypnotherapy"
      >
        <div className="space-y-6">
          <p className="text-[#3F5448] font-light leading-relaxed">
            During normal daily activity, your brain operates in fast, alert <strong>Beta waves</strong> focused on active thinking and stress. In a hypnotherapy session, you are guided into slower <strong>Alpha and Theta brainwave states</strong>, the same natural states experienced during deep relaxation, meditation, or light daydreaming.
          </p>

          <div className="grid grid-cols-1 gap-4">
            {brainChanges.map((bc, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
                <span className="text-xs font-mono font-bold text-[#7D6335] block mb-1">
                  Shift 0{idx + 1}
                </span>
                <h4 className="font-serif text-lg font-medium text-[#173D34] mb-2">
                  {bc.title}
                </h4>
                <p className="text-sm text-[#465A4F] font-light leading-relaxed">
                  {bc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ServiceDetailModal>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 2: 4 SESSION STAGES (EXACT CONTENT)
      ───────────────────────────────────────────────────────────── */}
      <ServiceDetailModal
        isOpen={activeModal === "stages"}
        onClose={() => setActiveModal(null)}
        title="What Actually Happens During a Session"
        badge="Session Walkthrough"
        tagline="A comfortable, four-stage clinical pathway."
        onBook={() => onOpenBooking("Clinical Hypnotherapy: Session Info")}
        bookLabel="Book Consultation"
      >
        <div className="space-y-4">
          {sessionStages.map((stage) => (
            <div key={stage.num} className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
              <span className="font-serif text-2xl font-light text-[#9E783E] block mb-1">
                {stage.num}
              </span>
              <h4 className="font-serif text-lg font-medium text-[#173D34] mb-2">
                {stage.title}
              </h4>
              <p className="text-sm text-[#465A4F] font-light leading-relaxed">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </ServiceDetailModal>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 3: SUITABILITY CHECKLIST (EXACT CONTENT)
      ───────────────────────────────────────────────────────────── */}
      <ServiceDetailModal
        isOpen={activeModal === "suitability"}
        onClose={() => setActiveModal(null)}
        title="Is Hypnotherapy Right for You?"
        badge="Self-Assessment"
        tagline="Evidence-based suitability indicators for lasting relief."
        onBook={() => onOpenBooking("Clinical Hypnotherapy: Suitability")}
        bookLabel="Discuss Your Situation"
      >
        <div className="space-y-6">
          <p className="text-[#3F5448] font-light leading-relaxed">
            Many people ask themselves: <em>&ldquo;Is my issue suitable for hypnotherapy, or is it not big enough?&rdquo;</em> If you are experiencing any of the following challenges, hypnotherapy offers a fast, gentle, and evidence-based pathway toward lasting relief.
          </p>

          <div className="grid grid-cols-1 gap-4">
            {suitabilityList.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
                <h4 className="font-serif text-lg font-medium text-[#173D34] mb-2 flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#7D6335] shrink-0 mt-0.5" />
                  <span>{item.title}</span>
                </h4>
                <p className="text-sm text-[#465A4F] font-light leading-relaxed pl-7">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ServiceDetailModal>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 4: 6 TRANSFORMATION AREAS (EXACT CONTENT)
      ───────────────────────────────────────────────────────────── */}
      <ServiceDetailModal
        isOpen={activeModal === "transform"}
        onClose={() => setActiveModal(null)}
        title="How Hypnotherapy Can Help You Transform"
        badge="Key Application Areas"
        tagline="Working directly with the subconscious mind where automatic patterns live."
        onBook={() => onOpenBooking("Clinical Hypnotherapy: Applications")}
        bookLabel="Consult on Hypnotherapy"
      >
        <div className="space-y-6">
          <p className="text-[#3F5448] font-light leading-relaxed">
            By working directly with the subconscious mind where automatic patterns and emotional responses live, hypnotherapy creates meaningful, long-term shifts:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {transformAreas.map((area, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
                <h4 className="font-serif text-lg font-medium text-[#173D34] mb-2">
                  {area.title}
                </h4>
                <p className="text-sm text-[#465A4F] font-light leading-relaxed">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ServiceDetailModal>
    </section>
  );
}

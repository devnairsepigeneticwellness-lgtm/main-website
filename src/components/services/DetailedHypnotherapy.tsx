"use client";

import React from "react";
import { Sparkles, Brain, CheckCircle2, ShieldCheck, Zap, ArrowUpRight, ShieldAlert, Activity, Heart, Clock } from "lucide-react";

interface DetailedHypnotherapyProps {
  onOpenBooking: (serviceName: string) => void;
}

export default function DetailedHypnotherapy({ onOpenBooking }: DetailedHypnotherapyProps) {
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
    <section id="hypnotherapy" className="py-20 lg:py-28 bg-[#F4F7F2] border-b border-[#C8D6C6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#9E783E]" />
            <span className="text-xs font-semibold tracking-[0.22em] text-[#7D6335] uppercase font-sans">
              HYPNOTHERAPY
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {threePillars.map((p, idx) => (
            <div key={idx} className="p-7 rounded-3xl bg-[#E6EEE3] border border-[#C8D6C6] shadow-xs">
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
        <div className="mb-14 p-6 rounded-2xl bg-[#1E3F35] text-[#F7F5EF] text-center border border-[#DFBD83]/30 shadow-sm">
          <span className="text-xs uppercase tracking-widest text-[#DFBD83] font-semibold block mb-1">
            Clinical Transparency &amp; Safety
          </span>
          <p className="font-serif text-lg sm:text-xl text-[#F7F5EF] font-medium tracking-wide">
            HYPNOTHERAPY IS NEITHER stage performance OR entertainment NOR mind control or loss of will.
          </p>
        </div>

        {/* How It Works in the Brain */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-[#EAF0E7] border border-[#C8D6C6]">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
              Neuroscience Basis
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173D34]">
              How Hypnotherapy Works in the Brain
            </h3>
            <p className="text-xs sm:text-sm text-[#465A4F] mt-2 font-light leading-relaxed">
              During normal daily activity, your brain operates in fast, alert <strong>Beta waves</strong> focused on active thinking and stress. In a hypnotherapy session, you are guided into slower <strong>Alpha and Theta brainwave states</strong>, the same natural states experienced during deep relaxation, meditation, or light daydreaming.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brainChanges.map((bc, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6]">
                <span className="text-xs font-mono font-bold text-[#7D6335] block mb-2">
                  Shift 0{idx + 1}
                </span>
                <h4 className="font-serif text-lg font-medium text-[#173D34] mb-2">
                  {bc.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                  {bc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What Actually Happens During a Session */}
        <div className="mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
              Session Walkthrough
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173D34]">
              What Actually Happens During a Session
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sessionStages.map((stage) => (
              <div key={stage.num} className="p-6 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6] flex flex-col justify-between">
                <div>
                  <span className="font-serif text-3xl font-light text-[#9E783E] block mb-2">
                    {stage.num}
                  </span>
                  <h4 className="font-serif text-lg font-medium text-[#173D34] mb-2">
                    {stage.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Is Hypnotherapy Right for You? Checklist */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-[#EAF0E7] border border-[#C8D6C6]">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
              Self-Assessment
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173D34]">
              Is Hypnotherapy Right for You?
            </h3>
            <p className="text-xs sm:text-sm text-[#465A4F] mt-2 font-light leading-relaxed">
              Many people ask themselves: <em>&ldquo;Is my issue suitable for hypnotherapy, or is it not big enough?&rdquo;</em> If you are experiencing any of the following challenges, hypnotherapy offers a fast, gentle, and evidence-based pathway toward lasting relief.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suitabilityList.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6]">
                <h4 className="font-serif text-lg font-medium text-[#173D34] mb-2 flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#7D6335] shrink-0 mt-0.5" />
                  <span>{item.title}</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed pl-7">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How Hypnotherapy Can Help You Transform */}
        <div className="mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
              Key Application Areas
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173D34]">
              How Hypnotherapy Can Help You Transform
            </h3>
            <p className="text-xs sm:text-sm text-[#465A4F] mt-2 font-light leading-relaxed">
              By working directly with the subconscious mind where automatic patterns and emotional responses live, hypnotherapy creates meaningful, long-term shifts:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformAreas.map((area, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6] flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-xl font-medium text-[#173D34] mb-2">
                    {area.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#465A4F] font-light leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </div>
            ))}
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
    </section>
  );
}

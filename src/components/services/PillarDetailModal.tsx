"use client";

import React, { useEffect, useRef } from "react";
import { X, ArrowUpRight, Check, CheckCircle2, ShieldAlert, PhoneCall } from "lucide-react";
import { servicesCopy } from "@/data/servicesData";

export type PillarId =
  | "counselling"
  | "psychotherapies"
  | "hypnotherapy"
  | "rehabilitation"
  | "renewal"
  | "spiritual"
  | "plans";

interface PillarDetailModalProps {
  pillar: PillarId | null;
  onClose: () => void;
  onBook: (serviceName: string) => void;
}

export default function PillarDetailModal({
  pillar,
  onClose,
  onBook,
}: PillarDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = React.useId();

  // Internal sub-tab state for each pillar
  const [counsellingTab, setCounsellingTab] = React.useState<number>(0);
  const [therapyTab, setTherapyTab] = React.useState<number>(0);
  const [hypnoTab, setHypnoTab] = React.useState<"pillars" | "brain" | "stages" | "suitability" | "transform" | "clinical">("pillars");
  const [rehabTab, setRehabTab] = React.useState<"overview" | "offerings" | "suitability" | "pathway">("overview");
  const [renewalTab, setRenewalTab] = React.useState<"phases" | "candidates" | "process">("phases");
  const [spiritualIndex, setSpiritualIndex] = React.useState<number>(0);
  const [planIndex, setPlanIndex] = React.useState<number>(0);

  // Sync open state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (pillar) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [pillar]);

  // Handle native cancel (Esc key)
  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    e.preventDefault();
    onClose();
  };

  // Light dismiss on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!pillar) return null;

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-labelledby={titleId}
      className="m-auto p-0 rounded-3xl bg-[#F7F5EF] text-[#24352D] border border-[#C8D6C6] shadow-2xl max-w-4xl w-[94vw] sm:w-[90vw] md:w-[880px] max-h-[90vh] overflow-hidden backdrop:bg-[#102E27]/80 backdrop:backdrop-blur-md"
    >
      <div className="flex flex-col max-h-[90vh]">
        {/* =========================================================
            MODAL HEADER
        ========================================================= */}
        <div className="p-6 sm:p-8 bg-[#173D34] text-[#F7F5EF] relative flex items-start justify-between gap-4 border-b border-[#B58B50]/30">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#DFBD83] font-semibold block mb-1">
              {pillar === "counselling" && "01. COUNSELLING PATHWAY"}
              {pillar === "psychotherapies" && "02. EVIDENCE-BASED PSYCHOTHERAPIES"}
              {pillar === "hypnotherapy" && "03. CLINICAL HYPNOTHERAPY"}
              {pillar === "rehabilitation" && "04. ONLINE REHABILITATION"}
              {pillar === "renewal" && "05. RENEWAL PROGRAMME"}
              {pillar === "spiritual" && "06. SPIRITUAL PRACTICES"}
              {pillar === "plans" && "07. TREATMENT & SUPPORT PLANS"}
            </span>

            <h2 id={titleId} className="font-serif text-2xl sm:text-3xl font-light text-[#F7F5EF]">
              {pillar === "counselling" && "Counselling: 14 Specialized Streams"}
              {pillar === "psychotherapies" && "10 Evidence-Based Psychotherapy Modalities"}
              {pillar === "hypnotherapy" && "Clinical Hypnotherapy & Subconscious Alignment"}
              {pillar === "rehabilitation" && "Online Rehabilitation: Getting Life Back on Track"}
              {pillar === "renewal" && "Renewal: Reflect, Reconnect & Rebuild"}
              {pillar === "spiritual" && "Spiritual Practices: Consciousness & Meaning"}
              {pillar === "plans" && "Personalised Support Plans & Crisis Intervention"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-[#DFBD83] flex items-center justify-center transition-colors shrink-0 cursor-pointer border border-[#DFBD83]/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* =========================================================
            MODAL BODY (SCROLLABLE & FILTERABLE)
        ========================================================= */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#3F5448] font-light text-sm sm:text-base leading-relaxed overscroll-contain">
          {/* 1. COUNSELLING */}
          {pillar === "counselling" && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6] space-y-2 text-xs sm:text-sm text-[#24352D]">
                {servicesCopy.counselling.intro.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Stream Selector Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {servicesCopy.counselling.streams.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCounsellingTab(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      counsellingTab === idx
                        ? "bg-[#1E3F35] text-[#DFBD83] shadow-sm font-bold"
                        : "bg-[#E6EEE3] text-[#1E3F35] hover:bg-[#D7E3D3] border border-[#C8D6C6]"
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>

              {/* Active Stream Details */}
              {(() => {
                const stream = servicesCopy.counselling.streams[counsellingTab];
                return (
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#F2F6F0] border border-[#C8D6C6] space-y-5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-sans uppercase tracking-widest font-bold text-[#7D6335] bg-[#DEE7DB] px-3 py-1 rounded-full border border-[#B8C9B5]">
                        {stream.categoryLabel}
                      </span>
                      <span className="text-xs text-[#556A5E]">Stream {counsellingTab + 1} of 14</span>
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl font-medium text-[#173D34] mb-1">
                        {stream.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-[#465A4F] leading-relaxed">
                      {stream.lead}
                    </p>

                    <div className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
                      <span className="font-semibold text-xs text-[#173D34] block mb-3 uppercase tracking-wider">
                        {stream.focusTitle}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#24352D]">
                        {stream.topics.map((t, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7D6335] mt-1.5 shrink-0" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {stream.closing && (
                      <p className="p-4 rounded-xl bg-[#EAF0E7] border border-[#C8D6C6] text-xs sm:text-sm text-[#384D42] italic">
                        {stream.closing}
                      </p>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* 2. PSYCHOTHERAPIES */}
          {pillar === "psychotherapies" && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6] space-y-2 text-xs sm:text-sm text-[#24352D]">
                {servicesCopy.psychotherapies.intro.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Modalities Pill Selector */}
              <div className="flex flex-wrap gap-2 pt-1">
                {servicesCopy.psychotherapies.items.map((pt, idx) => (
                  <button
                    key={pt.code}
                    onClick={() => setTherapyTab(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      therapyTab === idx
                        ? "bg-[#1E3F35] text-[#DFBD83] shadow-sm font-bold"
                        : "bg-[#E6EEE3] text-[#1E3F35] hover:bg-[#D7E3D3] border border-[#C8D6C6]"
                    }`}
                  >
                    {pt.code}
                  </button>
                ))}
              </div>

              {/* Active Therapy Details */}
              {(() => {
                const pt = servicesCopy.psychotherapies.items[therapyTab];
                return (
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#F2F6F0] border border-[#C8D6C6] space-y-5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#7D6335] uppercase tracking-wider">
                        {pt.code} • Clinical Approach
                      </span>
                      <span className="text-xs text-[#556A5E]">Modality {therapyTab + 1} of 10</span>
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl font-medium text-[#173D34] mb-1">
                        {pt.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-sans tracking-wide text-[#7D6335] font-semibold italic">
                        &ldquo;{pt.tagline}&rdquo;
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-[#465A4F] leading-relaxed">
                      {pt.desc}
                    </p>

                    {pt.skills && (
                      <div className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
                        <span className="font-semibold text-xs text-[#173D34] block mb-2.5 uppercase tracking-wider">
                          It focuses on skills such as:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#24352D]">
                          {pt.skills.map((s, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-[#7D6335] shrink-0" />
                              <span>{s}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {pt.questions && (
                      <div className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
                        <span className="font-semibold text-xs text-[#173D34] block mb-2.5 uppercase tracking-wider">
                          Instead of spending all the time understanding the problem, sessions also explore:
                        </span>
                        <div className="space-y-1.5 text-xs sm:text-sm text-[#24352D] italic">
                          {pt.questions.map((q, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="text-[#7D6335]">&bull;</span>
                              <span>&ldquo;{q}&rdquo;</span>
                            </div>
                          ))}
                        </div>
                        <p className="mt-2 text-xs text-[#7D6335] font-medium not-italic">
                          This approach is practical and focused on achievable change.
                        </p>
                      </div>
                    )}

                    {pt.usedFor && (
                      <div className="p-4 rounded-xl bg-[#EAF0E7] border border-[#C8D6C6] text-xs sm:text-sm text-[#384D42]">
                        <span className="font-semibold text-[#173D34]">Often used for: </span>
                        <span>{pt.usedFor}</span>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* 3. HYPNOTHERAPY */}
          {pillar === "hypnotherapy" && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6] space-y-2 text-xs sm:text-sm text-[#24352D]">
                <p>{servicesCopy.hypnotherapy.subtitle}</p>
                {servicesCopy.hypnotherapy.intro.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Sub-Tabs Selector */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { id: "pillars", label: "3 Pillars" },
                  { id: "brain", label: "Brain Science (3 Changes)" },
                  { id: "stages", label: "Session Walkthrough" },
                  { id: "suitability", label: "Suitability Checklist" },
                  { id: "transform", label: "Transformation Areas" },
                  { id: "clinical", label: "Psychologist Care Rationale" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setHypnoTab(t.id as any)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      hypnoTab === t.id
                        ? "bg-[#1E3F35] text-[#DFBD83] shadow-sm font-bold"
                        : "bg-[#E6EEE3] text-[#1E3F35] hover:bg-[#D7E3D3] border border-[#C8D6C6]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Sub-Tab 1: Pillars */}
              {hypnoTab === "pillars" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-4 rounded-xl bg-[#1E3F35] text-[#F7F5EF] text-center text-xs font-medium border border-[#DFBD83]/30">
                    <span className="text-[#DFBD83] block uppercase tracking-wider mb-1 font-semibold text-xs">Clinical Transparency</span>
                    {servicesCopy.hypnotherapy.disclaimer}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {servicesCopy.hypnotherapy.pillars.map((p, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6]">
                        <span className="text-xs font-mono font-bold text-[#7D6335] block mb-1">Pillar 0{idx + 1}</span>
                        <h4 className="font-serif text-lg font-medium text-[#173D34] mb-2">{p.title}</h4>
                        <p className="text-xs sm:text-sm text-[#465A4F]">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: Brain Science */}
              {hypnoTab === "brain" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <p className="text-xs sm:text-sm text-[#465A4F]">
                    {servicesCopy.hypnotherapy.brainScience.intro}
                  </p>
                  <span className="text-xs font-semibold text-[#173D34] block uppercase tracking-wider">
                    {servicesCopy.hypnotherapy.brainScience.changesTitle}
                  </span>
                  <div className="space-y-3">
                    {servicesCopy.hypnotherapy.brainScience.changes.map((bc, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6]">
                        <span className="text-xs font-mono font-bold text-[#7D6335] block mb-1">Shift 0{idx + 1}</span>
                        <h4 className="font-serif text-lg font-medium text-[#173D34] mb-1">{bc.title}</h4>
                        <p className="text-xs sm:text-sm text-[#465A4F]">{bc.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Stages */}
              {hypnoTab === "stages" && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  {servicesCopy.hypnotherapy.sessionStages.stages.map((stage, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6]">
                      <span className="font-serif text-2xl font-light text-[#9E783E] block mb-1">STAGE 0{idx + 1}</span>
                      <h4 className="font-serif text-lg font-medium text-[#173D34] mb-1">{stage.title}</h4>
                      <p className="text-xs sm:text-sm text-[#465A4F]">{stage.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Sub-Tab 4: Suitability */}
              {hypnoTab === "suitability" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <p className="text-xs sm:text-sm text-[#465A4F]">
                    {servicesCopy.hypnotherapy.suitability.intro}
                  </p>
                  <span className="text-xs font-semibold text-[#173D34] block uppercase tracking-wider">
                    {servicesCopy.hypnotherapy.suitability.heading}
                  </span>
                  <div className="space-y-3">
                    {servicesCopy.hypnotherapy.suitability.items.map((item, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6]">
                        <h4 className="font-serif text-lg font-medium text-[#173D34] mb-1 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#7D6335] shrink-0 mt-1" />
                          <span>{item.title}</span>
                        </h4>
                        <p className="text-xs sm:text-sm text-[#465A4F] pl-6">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-Tab 5: Transform */}
              {hypnoTab === "transform" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <p className="text-xs sm:text-sm text-[#465A4F]">
                    {servicesCopy.hypnotherapy.transformation.intro}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesCopy.hypnotherapy.transformation.areas.map((area, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6]">
                        <h4 className="font-serif text-base sm:text-lg font-medium text-[#173D34] mb-1">{area.title}</h4>
                        <p className="text-xs sm:text-sm text-[#465A4F]">{area.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-Tab 6: Clinical Rationale */}
              {hypnoTab === "clinical" && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#1E3F35] text-[#F7F5EF] space-y-4 animate-in fade-in duration-200">
                  <h4 className="font-serif text-2xl font-light text-white">
                    {servicesCopy.hypnotherapy.psychologistCare.title}
                  </h4>
                  <div className="space-y-3 text-xs sm:text-sm text-[#E8EDE4]/90 font-light leading-relaxed">
                    <p>{servicesCopy.hypnotherapy.psychologistCare.p1}</p>
                    <p>{servicesCopy.hypnotherapy.psychologistCare.p2}</p>
                    <p className="text-[#DFBD83] font-medium">{servicesCopy.hypnotherapy.psychologistCare.p3}</p>
                    <p className="pt-2 text-[11px] text-[#DFBD83]/90 italic border-t border-white/10">
                      *{servicesCopy.hypnotherapy.psychologistCare.disclaimer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. ONLINE REHABILITATION */}
          {pillar === "rehabilitation" && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6] space-y-2 text-xs sm:text-sm text-[#24352D]">
                {servicesCopy.rehabilitation.intro.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Sub-Tabs */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { id: "overview", label: "Remote Advantages" },
                  { id: "offerings", label: "6 Online Offerings" },
                  { id: "suitability", label: "Who Is It For?" },
                  { id: "pathway", label: "4-Step Pathway" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setRehabTab(t.id as any)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      rehabTab === t.id
                        ? "bg-[#1E3F35] text-[#DFBD83] shadow-sm font-bold"
                        : "bg-[#E6EEE3] text-[#1E3F35] hover:bg-[#D7E3D3] border border-[#C8D6C6]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {rehabTab === "overview" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-5 rounded-2xl bg-white border border-[#C8D6C6]">
                    <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
                      {servicesCopy.rehabilitation.whatIsIt.title}
                    </span>
                    <p className="text-xs sm:text-sm text-[#465A4F] leading-relaxed">
                      {servicesCopy.rehabilitation.whatIsIt.p1}
                    </p>
                    <p className="text-xs sm:text-sm text-[#465A4F] leading-relaxed mt-2">
                      {servicesCopy.rehabilitation.whatIsIt.p2}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesCopy.rehabilitation.whyChoose.points.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6]">
                        <h4 className="font-serif text-base font-medium text-[#173D34] mb-1">{item.title}</h4>
                        <p className="text-xs sm:text-sm text-[#465A4F]">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {rehabTab === "offerings" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in duration-200">
                  {servicesCopy.rehabilitation.whatWeOffer.items.map((offer, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6]">
                      <h4 className="font-serif text-base sm:text-lg font-medium text-[#173D34] mb-1">{offer.title}</h4>
                      <p className="text-xs sm:text-sm text-[#465A4F]">{offer.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {rehabTab === "suitability" && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <p className="text-xs sm:text-sm text-[#465A4F]">
                    {servicesCopy.rehabilitation.suitability.intro}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {servicesCopy.rehabilitation.suitability.items.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6]">
                        <h4 className="font-serif text-base font-medium text-[#173D34] mb-1">{item.title}</h4>
                        <p className="text-xs sm:text-sm text-[#465A4F]">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {rehabTab === "pathway" && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  {servicesCopy.rehabilitation.howItWorks.steps.map((step, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6]">
                      <h4 className="font-serif text-lg font-medium text-[#173D34] mb-1">{step.step}</h4>
                      <p className="text-xs sm:text-sm text-[#465A4F]">{step.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. RENEWAL */}
          {pillar === "renewal" && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6] space-y-2 text-xs sm:text-sm text-[#24352D]">
                <h4 className="font-serif text-lg font-medium text-[#173D34]">
                  {servicesCopy.renewal.feelingStuck.title}
                </h4>
                <p>{servicesCopy.renewal.feelingStuck.p1}</p>
                <p>{servicesCopy.renewal.feelingStuck.p2}</p>
              </div>

              {/* Sub-Tabs */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { id: "phases", label: "Our Approach (3 Phases)" },
                  { id: "candidates", label: "Who Can Benefit?" },
                  { id: "process", label: "Process Overview (4 Steps)" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setRenewalTab(t.id as any)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      renewalTab === t.id
                        ? "bg-[#1E3F35] text-[#DFBD83] shadow-sm font-bold"
                        : "bg-[#E6EEE3] text-[#1E3F35] hover:bg-[#D7E3D3] border border-[#C8D6C6]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {renewalTab === "phases" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-3 bg-[#EAF0E7] text-center font-mono text-xs text-[#173D34] font-semibold rounded-xl">
                    {servicesCopy.renewal.approach.flow}
                  </div>
                  {servicesCopy.renewal.approach.phases.map((phase, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6]">
                      <h4 className="font-serif text-xl font-medium text-[#173D34] mb-2">{phase.name}</h4>
                      <div className="space-y-2">
                        {phase.points.map((pt, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#384D42]">
                            <Check className="w-4 h-4 text-[#7D6335] shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {renewalTab === "candidates" && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <p className="text-xs sm:text-sm text-[#465A4F]">{servicesCopy.renewal.whoCanBenefit.intro}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesCopy.renewal.whoCanBenefit.items.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6]">
                        <h4 className="font-serif text-base font-medium text-[#173D34] mb-1">{item.title}</h4>
                        <p className="text-xs sm:text-sm text-[#465A4F]">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {renewalTab === "process" && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  {servicesCopy.renewal.processOverview.steps.map((s, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#F2F6F0] border border-[#C8D6C6]">
                      <h4 className="font-serif text-base font-medium text-[#173D34] mb-1">{s.step}</h4>
                      <p className="text-xs sm:text-sm text-[#465A4F]">{s.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 6. SPIRITUAL PRACTICES */}
          {pillar === "spiritual" && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6] space-y-2 text-xs sm:text-sm text-[#24352D]">
                {servicesCopy.spiritual.intro.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#E4EDE1] border border-[#B8C9B5] text-xs sm:text-sm text-[#2D4438] leading-relaxed">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7D6335] block mb-1">
                  Important Notice
                </span>
                <p className="font-light">{servicesCopy.spiritual.disclaimer}</p>
              </div>

              {/* Modality Selector */}
              <div className="flex flex-wrap gap-2 pt-1">
                {servicesCopy.spiritual.modalities.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => setSpiritualIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      spiritualIndex === idx
                        ? "bg-[#1E3F35] text-[#DFBD83] shadow-sm font-bold"
                        : "bg-[#E6EEE3] text-[#1E3F35] hover:bg-[#D7E3D3] border border-[#C8D6C6]"
                    }`}
                  >
                    {m.title}
                  </button>
                ))}
              </div>

              {(() => {
                const item = servicesCopy.spiritual.modalities[spiritualIndex];
                return (
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#F2F6F0] border border-[#C8D6C6] space-y-5 animate-in fade-in duration-200">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#7D6335] font-semibold block mb-1">
                        Consciousness Exploration
                      </span>
                      <h3 className="font-serif text-2xl font-medium text-[#173D34] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#7D6335] font-semibold italic">
                        {item.quote}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-[#465A4F] leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
                      <span className="text-xs font-semibold text-[#173D34] block mb-1 uppercase tracking-wider">
                        The Epigenetic &amp; Science Connection:
                      </span>
                      <p className="text-xs sm:text-sm text-[#384D42] font-light leading-relaxed">
                        {item.epigeneticConnection}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-[#173D34] block mb-3 uppercase tracking-wider">
                        How This Helps You:
                      </span>
                      <div className="space-y-2.5">
                        {item.howItHelps.map((b, i) => (
                          <div key={i} className="p-3.5 rounded-xl bg-white border border-[#C8D6C6] text-xs sm:text-sm text-[#24352D] flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-[#7D6335] shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* 7. TREATMENT & SUPPORT PLANS */}
          {pillar === "plans" && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6] space-y-2 text-xs sm:text-sm text-[#24352D]">
                <p>{servicesCopy.supportPlans.intro}</p>
              </div>

              {/* Format Selector */}
              <div className="flex flex-wrap gap-2 pt-1">
                {servicesCopy.supportPlans.formats.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPlanIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      planIndex === idx
                        ? "bg-[#1E3F35] text-[#DFBD83] shadow-sm font-bold"
                        : "bg-[#E6EEE3] text-[#1E3F35] hover:bg-[#D7E3D3] border border-[#C8D6C6]"
                    }`}
                  >
                    Format 0{idx + 1}
                  </button>
                ))}
              </div>

              {/* Active Plan */}
              {(() => {
                const plan = servicesCopy.supportPlans.formats[planIndex];
                return (
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#F2F6F0] border border-[#C8D6C6] space-y-5 animate-in fade-in duration-200">
                    <span className="text-xs font-mono font-bold text-[#7D6335] uppercase tracking-wider">
                      FORMAT 0{planIndex + 1} OF 05
                    </span>
                    <h3 className="font-serif text-2xl font-medium text-[#173D34] mb-1">
                      {plan.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#465A4F] leading-relaxed">
                      {plan.desc}
                    </p>

                    {plan.suitableFor && (
                      <div className="p-4 rounded-xl bg-[#E6EEE3] border border-[#C8D6C6] text-xs sm:text-sm">
                        <span className="font-semibold text-[#173D34] block mb-1">Suitable for:</span>
                        <p className="text-[#384D42] font-light">{plan.suitableFor}</p>
                      </div>
                    )}

                    {plan.usefulFor && (
                      <div className="p-5 rounded-2xl bg-[#E6EEE3] border border-[#C8D6C6]">
                        <span className="font-semibold text-xs text-[#173D34] block mb-2.5 uppercase tracking-wider">
                          These can be useful for:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#24352D]">
                          {plan.usefulFor.map((u, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-[#7D6335] shrink-0" />
                              <span>{u}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Crisis Intervention Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9F5] border-2 border-[#D97706]/30 space-y-3">
                <div className="flex items-center gap-2 text-[#D97706] font-semibold text-xs tracking-wider uppercase">
                  <ShieldAlert className="w-4 h-4" />
                  <span>{servicesCopy.supportPlans.crisis.title}</span>
                </div>
                <div className="space-y-1.5 text-xs sm:text-sm text-[#59675F] font-light">
                  <p>{servicesCopy.supportPlans.crisis.p1}</p>
                  <p>{servicesCopy.supportPlans.crisis.p2}</p>
                  <p className="font-medium text-[#173D34]">{servicesCopy.supportPlans.crisis.warning}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {servicesCopy.supportPlans.crisis.helplines.map((hl) => (
                    <div key={hl.name} className="p-3 rounded-xl bg-white border border-[#D97706]/20 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-[#7D6335] uppercase font-bold block">{hl.name}</span>
                        <span className="font-bold text-[#173D34] text-sm">{hl.number}</span>
                      </div>
                      {hl.tel && (
                        <a href={`tel:${hl.tel}`} className="text-[#D97706] font-semibold flex items-center gap-1 hover:underline">
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================
            MODAL FOOTER (DIRECT ACTION)
        ========================================================= */}
        <div className="p-5 sm:p-6 bg-[#EAF0E7] border-t border-[#C8D6C6] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#556A5E] font-sans">
            Personalised, confidential psychological care at Nair’s Epigenetic Wellness
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-[#C8D6C6] text-xs font-semibold text-[#1E3F35] hover:bg-[#DEE7DB] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                const serviceTitles: Record<PillarId, string> = {
                  counselling: "Counselling",
                  psychotherapies: "Psychotherapies",
                  hypnotherapy: "Clinical Hypnotherapy",
                  rehabilitation: "Online Rehabilitation",
                  renewal: "Renewal Programme",
                  spiritual: "Spiritual Practices",
                  plans: "Treatment & Support Plans",
                };
                onClose();
                onBook(serviceTitles[pillar]);
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#1E3F35] hover:bg-[#285246] text-[#F7F5EF] text-xs font-semibold tracking-wide shadow-sm transition-colors cursor-pointer"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#DFBD83]" />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

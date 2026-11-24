"use client";

import React from "react";
import { ArrowUpRight, MessageCircle, Building2, Users, ShieldAlert, Sparkles, MessageSquareHeart, HeartHandshake } from "lucide-react";
import { CONTACT_INFO } from "@/components/SocialIcons";

interface DetailedCorporateProps {
  onOpenBooking: (programmeName: string) => void;
}

export default function DetailedCorporate({ onOpenBooking }: DetailedCorporateProps) {
  const topics = [
    {
      num: "01",
      title: "Workplace Stress Awareness",
      desc: "Understand common sources of occupational stress and explore helpful, grounded coping strategies for daily workplace demands.",
      icon: ShieldAlert,
    },
    {
      num: "02",
      title: "Emotional Awareness",
      desc: "Develop greater understanding of emotional responses in professional situations, leadership contexts and team interactions.",
      icon: MessageSquareHeart,
    },
    {
      num: "03",
      title: "Communication Skills",
      desc: "Explore healthy communication, constructive dialogue, empathetic listening and interpersonal effectiveness across hierarchies.",
      icon: Users,
    },
    {
      num: "04",
      title: "Team Wellbeing",
      desc: "Encourage reflection on supportive work environments, psychological safety, mutual respect and healthy workplace relationships.",
      icon: HeartHandshake,
    },
  ];

  const whatsappMessage = encodeURIComponent(
    "Hello Nair's Epigenetic Wellness team, I would like to enquire about your Corporate Workshops for our organisation."
  );

  return (
    <section id="corporate" className="py-20 lg:py-28 bg-[#173D34] text-[#F7F5EF] relative overflow-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#102E27] rounded-full blur-3xl pointer-events-none opacity-60" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#B58B50]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Screen 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, Intro, Organisation Panel, CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102E27] border border-[#B58B50]/30 text-[#DFBD83] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DFBD83]" />
                WORKPLACE WELLBEING
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.18] tracking-tight">
                Healthier Conversations. <br />
                <span className="italic text-[#DFBD83]">Stronger Workplace Awareness.</span>
              </h2>

              <p className="mt-6 font-sans text-base sm:text-lg text-[#E8EDE4]/85 leading-relaxed font-light">
                Corporate workshops at N.E.W. are designed to help organisations explore psychological wellbeing, interpersonal effectiveness and practical skills relevant to the workplace.
              </p>

              {/* Workshops for Organisations Callout */}
              <div className="mt-8 p-6 rounded-3xl bg-[#102E27]/90 border border-[#B58B50]/30 shadow-lg">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#DFBD83] mb-2 font-sans">
                  <Building2 className="w-4 h-4 text-[#DFBD83]" />
                  <span>Workshops for Organisations</span>
                </div>
                <p className="font-sans text-sm text-[#E8EDE4]/90 font-light leading-relaxed">
                  Programme content can be discussed according to the learning goals and needs of the organisation.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenBooking("Corporate Workshop")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#DFBD83] text-[#102E27] text-sm font-semibold hover:bg-white hover:text-[#102E27] transition-all shadow-md"
              >
                <span>Enquire About Corporate Training</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappDigits}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#102E27] border border-[#B58B50]/40 text-[#F7F5EF] text-sm font-medium hover:bg-[#102E27]/80 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#DFBD83]" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>

          {/* Right Column: 4 Workshop Focus Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <div
                  key={topic.num}
                  className="rounded-3xl p-7 bg-[#102E27]/80 border border-[#B58B50]/20 hover:border-[#DFBD83]/60 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-serif text-2xl font-light text-[#DFBD83]/80">
                        {topic.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#173D34] text-[#DFBD83] border border-[#B58B50]/30 flex items-center justify-center group-hover:bg-[#DFBD83] group-hover:text-[#102E27] transition-colors">
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-medium text-white mb-2.5 group-hover:text-[#DFBD83] transition-colors">
                      {topic.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-[#E8EDE4]/80 font-light leading-relaxed">
                      {topic.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#173D34] text-[10px] uppercase tracking-wider text-[#DFBD83]/80 font-semibold">
                    Core Workshop Module
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

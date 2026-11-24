"use client";

import React from "react";
import { Phone, Mail, MessageCircle, ArrowUpRight, Clock, ShieldCheck } from "lucide-react";
import {
  CONTACT_INFO,
  InstagramIcon,
  LinkedInIcon,
  SOCIAL_LINKS,
  getWhatsAppUrl,
} from "@/components/SocialIcons";

export default function ContactInfoCards() {
  const cards = [
    {
      title: "Call Us",
      label: "Direct Consultation Line",
      value: CONTACT_INFO.phoneDisplay,
      href: CONTACT_INFO.phoneHref,
      description: "Speak directly with our team regarding consultations, appointments, and general service enquiries.",
      buttonText: "Call Now",
      icon: Phone,
      external: false,
      tag: "Voice & Consultation",
    },
    {
      title: "Email Us",
      label: "Confidential Written Desk",
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
      description: "Send detailed requirements, institutional proposals, workshop briefs, or professional mentorship requests.",
      buttonText: "Send Email",
      icon: Mail,
      external: false,
      tag: "Written & Proposals",
    },
    {
      title: "WhatsApp",
      label: "Instant Mobile Messaging",
      value: CONTACT_INFO.phoneDisplay,
      href: getWhatsAppUrl("Hello, I would like to know more about Nair's Epigenetic Wellness."),
      description: "Connect via WhatsApp for quick queries, scheduling questions, or preliminary assistance with prefilled message.",
      buttonText: "Chat on WhatsApp",
      icon: MessageCircle,
      external: true,
      tag: "Quick Messaging",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F7F5EF] relative overflow-hidden">
      {/* Subtle Sage & Gold Ambient Shimmers */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8EDE4]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#B58B50]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2.5 mb-3.5">
            <span className="w-6 h-[1px] bg-[#B58B50]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#B58B50] uppercase font-sans">
              GET IN TOUCH
            </span>
            <span className="w-6 h-[1px] bg-[#B58B50]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D34] tracking-tight">
            Let&apos;s Connect.
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#59675F] font-light leading-relaxed">
            Choose the contact channel that feels most comfortable for you. Every conversation is handled with discretion, warmth, and professional integrity.
          </p>
        </div>

        {/* 3 Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group relative rounded-3xl bg-[#FCFAF6] border border-[#E8EDE4] p-7 sm:p-8 lg:p-9 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#B58B50]/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Row: Icon & Tag */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#173D34] text-[#DFBD83] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#B58B50] group-hover:text-white transition-all shadow-md">
                      <Icon className="w-6 h-6" strokeWidth={1.75} />
                    </div>

                    <span className="text-[11px] font-sans uppercase tracking-[0.16em] font-medium text-[#B58B50] bg-[#B58B50]/10 px-3 py-1 rounded-full border border-[#B58B50]/20">
                      {card.tag}
                    </span>
                  </div>

                  <span className="text-xs uppercase tracking-wider text-[#59675F] font-medium block">
                    {card.label}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-2xl text-[#173D34] font-medium mt-1 mb-2 group-hover:text-[#B58B50] transition-colors">
                    {card.title}
                  </h3>

                  <div className="font-sans text-base sm:text-lg font-semibold text-[#173D34] tracking-tight break-all mb-3.5">
                    {card.value}
                  </div>

                  <p className="text-xs sm:text-sm text-[#59675F] font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="mt-8 pt-5 border-t border-[#E8EDE4]">
                  <a
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#173D34] text-[#F7F5EF] group-hover:bg-[#B58B50] group-hover:text-white text-xs sm:text-sm font-medium tracking-wide transition-colors shadow-sm"
                  >
                    <span>{card.buttonText}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#DFBD83] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Social & Professional Connect Cards */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group rounded-3xl bg-[#FCFAF6] border border-[#E8EDE4] p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#B58B50]/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#173D34] text-[#DFBD83] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#B58B50] group-hover:text-white transition-all shadow-md">
                  <InstagramIcon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-sans uppercase tracking-[0.16em] font-medium text-[#B58B50] bg-[#B58B50]/10 px-3 py-1 rounded-full border border-[#B58B50]/20">
                  Visual &amp; Reflections
                </span>
              </div>
              <span className="text-xs uppercase tracking-wider text-[#59675F] font-medium block">
                Official Instagram
              </span>
              <h3 className="font-serif text-2xl text-[#173D34] font-medium mt-1 mb-1 group-hover:text-[#B58B50] transition-colors">
                Instagram Profile
              </h3>
              <div className="font-sans text-base font-semibold text-[#173D34] tracking-tight mb-2">
                {SOCIAL_LINKS.instagram.handle}
              </div>
              <p className="text-xs sm:text-sm text-[#59675F] font-light leading-relaxed">
                Follow psychoeducational reflections, clinic updates, and mindful epigenetic wellness posts.
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-[#E8EDE4]">
              <a
                href={SOCIAL_LINKS.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#173D34] text-[#F7F5EF] group-hover:bg-[#B58B50] group-hover:text-white text-xs sm:text-sm font-medium tracking-wide transition-colors shadow-sm"
              >
                <span>Visit Instagram Profile</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFBD83] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          <div className="group rounded-3xl bg-[#FCFAF6] border border-[#E8EDE4] p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#B58B50]/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#173D34] text-[#DFBD83] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#B58B50] group-hover:text-white transition-all shadow-md">
                  <LinkedInIcon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-sans uppercase tracking-[0.16em] font-medium text-[#B58B50] bg-[#B58B50]/10 px-3 py-1 rounded-full border border-[#B58B50]/20">
                  Professional Network
                </span>
              </div>
              <span className="text-xs uppercase tracking-wider text-[#59675F] font-medium block">
                Professional Profile
              </span>
              <h3 className="font-serif text-2xl text-[#173D34] font-medium mt-1 mb-1 group-hover:text-[#B58B50] transition-colors">
                LinkedIn Profile
              </h3>
              <div className="font-sans text-base font-semibold text-[#173D34] tracking-tight mb-2">
                {SOCIAL_LINKS.linkedin.handle}
              </div>
              <p className="text-xs sm:text-sm text-[#59675F] font-light leading-relaxed">
                Connect for psychological science research, institutional collaborations, and clinical leadership.
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-[#E8EDE4]">
              <a
                href={SOCIAL_LINKS.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#173D34] text-[#F7F5EF] group-hover:bg-[#B58B50] group-hover:text-white text-xs sm:text-sm font-medium tracking-wide transition-colors shadow-sm"
              >
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFBD83] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Reassurance Banner Below Cards */}
        <div className="mt-10 sm:mt-12 rounded-2xl bg-[#E8EDE4]/60 border border-[#E8EDE4] py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#59675F]">
          <div className="flex items-center gap-2 text-[#173D34] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#B58B50] shrink-0" />
            <span>Ethical Clinical Standards:</span>
          </div>
          <p className="font-light text-center sm:text-left flex-1">
            All calls, emails and messages are managed in accordance with ethical psychological confidentiality standards.
          </p>
          <div className="flex items-center gap-1.5 text-[#173D34] shrink-0 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#B58B50]" />
            <span>Indore (IST) Timezone</span>
          </div>
        </div>

      </div>
    </section>
  );
}


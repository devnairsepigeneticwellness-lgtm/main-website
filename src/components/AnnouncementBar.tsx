"use client";

import React from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import {
  CONTACT_INFO,
  SOCIAL_LINKS,
  InstagramIcon,
  LinkedInIcon,
  FacebookIcon,
  WhatsAppIcon,
} from "@/components/SocialIcons";

export default function AnnouncementBar({
  onOpenBooking,
}: {
  onOpenBooking?: () => void;
}) {
  const socialHandles = [
    {
      name: "Instagram",
      url: SOCIAL_LINKS.instagram.url,
      icon: InstagramIcon,
    },
    {
      name: "LinkedIn",
      url: SOCIAL_LINKS.linkedin.url,
      icon: LinkedInIcon,
    },
    {
      name: "Facebook",
      url: SOCIAL_LINKS.facebook.url,
      icon: FacebookIcon,
    },
    {
      name: "WhatsApp",
      url: SOCIAL_LINKS.whatsapp.url,
      icon: WhatsAppIcon,
    },
  ];

  return (
    <aside
      aria-label="Announcement"
      className="bg-[#102E27] text-[#F7F5EF] border-b border-[#173D34]/50 text-xs sm:text-sm py-2 px-4 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        {/* Message */}
        <p className="flex items-center justify-center sm:justify-start gap-2 tracking-wide font-light text-[#E8EDE4]/90 text-center flex-wrap">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B58B50] animate-pulse shrink-0" />
          <span>
            Supporting wellbeing through understanding, awareness and meaningful
            change.
          </span>
        </p>

        {/* Quick Social & Email Links */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs tracking-wider uppercase text-[#E8EDE4]/80">
          <div className="flex items-center gap-2" aria-label="Social Media Links">
            {socialHandles.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  title={item.name}
                  className="p-1 rounded-full text-[#E8EDE4]/85 hover:text-[#DFBD83] hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}
          </div>
          <span className="text-[#173D34]">|</span>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="inline-flex items-center gap-1.5 hover:text-[#B58B50] transition-colors"
          >
            <Mail className="w-3 h-3 text-[#B58B50]" />
            <span className="hidden md:inline">{CONTACT_INFO.email}</span>
            <span className="md:hidden">Email</span>
          </a>
          <span className="text-[#173D34]">|</span>
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-1 text-[#DFBD83] hover:text-white font-medium transition-colors cursor-pointer"
          >
            <span>Enquire</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </aside>
  );
}

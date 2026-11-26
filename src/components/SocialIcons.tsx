import React from "react";
import { ArrowUpRight } from "lucide-react";

// TODO(client-input): Confirm official voice phone number (Task 4.2) and Google Maps Place URL below (Task 5.1).
export const CONTACT_INFO = {
  phoneDisplay: "+91 94464 77779",
  phoneHref: "tel:+919446477779",
  whatsappDisplay: "+91 94464 67779",
  whatsappDigits: "919446467779",
  email: "ajit.navy@gmail.com",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Indore%2C+Madhya+Pradesh%2C+India",
} as const;

export function getWhatsAppUrl(
  message = "Hello, I would like to know more about Nair's Epigenetic Wellness."
): string {
  return `https://wa.me/${CONTACT_INFO.whatsappDigits}?text=${encodeURIComponent(message)}`;
}

// TODO(client-input): Confirm official WhatsApp link (Task 4.1); LinkedIn URLs confirmed.
export const SOCIAL_LINKS = {
  linkedin: {
    url: "https://www.linkedin.com/in/nairsepigeneticwellness/",
    handle: "Nair's Epigenetic Wellness",
    name: "LinkedIn",
    description: "Connect for psychological wellness updates & institutional collaborations",
  },
  whatsapp: {
    url: getWhatsAppUrl(),
    handle: CONTACT_INFO.whatsappDisplay,
    name: "WhatsApp",
    description: "Message us directly on WhatsApp",
  },
};

export const FOUNDER_LINKS = {
  linkedin: {
    url: "https://www.linkedin.com/in/ajit-kumar-04b51323/",
    handle: "Ajit Kumar Nair",
    name: "LinkedIn",
    description: "Connect with Ajit Kumar Nair on LinkedIn",
  },
} as const;

export function LinkedInIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

/** Shared header and announcement bar social links. */
export const HEADER_SOCIAL_LINKS = [
  { name: "LinkedIn", url: SOCIAL_LINKS.linkedin.url, icon: LinkedInIcon },
  { name: "WhatsApp", url: SOCIAL_LINKS.whatsapp.url, icon: WhatsAppIcon },
] as const;

/** External LinkedIn pill button linking to the founder's personal profile. */
export function FounderLinkedInLink({
  href = FOUNDER_LINKS.linkedin.url,
  personName = FOUNDER_LINKS.linkedin.handle,
  label = "LinkedIn",
  className = "inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#7D6335]/40 text-[#173D34] hover:bg-white text-xs sm:text-sm font-medium tracking-wide transition-all group",
}: {
  href?: string;
  personName?: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Connect with ${personName} on LinkedIn`}
      className={className}
    >
      <LinkedInIcon className="w-4 h-4 text-[#7D6335] group-hover:text-[#173D34] transition-colors shrink-0" />
      <span>{label}</span>
      <ArrowUpRight className="w-3.5 h-3.5 text-[#7D6335] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
    </a>
  );
}

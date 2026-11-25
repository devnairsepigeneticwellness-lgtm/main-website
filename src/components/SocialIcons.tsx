import React from "react";

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

// TODO(client-input): Confirm official Instagram, LinkedIn, Facebook, and WhatsApp links (Task 4.1).
export const SOCIAL_LINKS = {
  instagram: {
    url: "https://www.instagram.com/nairsepigeneticwellness/",
    handle: "@nairsepigeneticwellness",
    name: "Instagram",
    description: "Follow updates, reflections & mental wellbeing insights",
  },
  linkedin: {
    url: "https://www.linkedin.com/in/ajit-kumar-nair/",
    handle: "Ajit Kumar Nair",
    name: "LinkedIn",
    description: "Connect for professional & clinical psychology network",
  },
  facebook: {
    url: "https://www.facebook.com/",
    handle: "Nair's Epigenetic Wellness",
    name: "Facebook",
    description: "Follow community updates and mental wellness initiatives",
  },
  whatsapp: {
    url: getWhatsAppUrl(),
    handle: CONTACT_INFO.whatsappDisplay,
    name: "WhatsApp",
    description: "Message us directly on WhatsApp",
  },
};

export function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
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
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

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

export function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
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

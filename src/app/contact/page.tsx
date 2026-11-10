import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us | Nair's Epigenetic Wellness",
  description:
    "Contact Nair's Epigenetic Wellness for counselling, psychotherapy, wellness services, internships, mentorship and professional workshops.",
  openGraph: {
    title: "Contact Us | Nair's Epigenetic Wellness",
    description:
      "Contact Nair's Epigenetic Wellness for counselling, psychotherapy, wellness services, internships, mentorship and professional workshops.",
    url: "https://www.nairsepigeneticwellness.com/contact",
    siteName: "Nair's Epigenetic Wellness",
    locale: "en_US",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}


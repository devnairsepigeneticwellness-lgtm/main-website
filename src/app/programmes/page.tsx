import type { Metadata } from "next";
import ProgrammesPageClient from "@/components/programmes/ProgrammesPageClient";

export const metadata: Metadata = {
  title: "Programmes | Nair's Epigenetic Wellness",
  description:
    "Explore psychology internships, practitioner mentorship, corporate wellbeing workshops, and educational training programmes at Nair's Epigenetic Wellness.",
  openGraph: {
    title: "Programmes | Nair's Epigenetic Wellness",
    description:
      "Practical psychological learning, clinical internships, professional supervision, and corporate workshops designed for lasting impact.",
    url: "https://www.nairsepigeneticwellness.com/programmes",
    siteName: "Nair's Epigenetic Wellness",
    locale: "en_US",
    type: "website",
  },
};

export default function ProgrammesPage() {
  return <ProgrammesPageClient />;
}


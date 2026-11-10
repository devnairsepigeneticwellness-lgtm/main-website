import type { Metadata } from "next";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About Us | Nair's Epigenetic Wellness",
  description:
    "Discover Nair's Epigenetic Wellness (N.E.W.), our integrative whole-person philosophy, and founder Ajit Kumar Nair. Providing counselling, psychotherapy, clinical hypnotherapy, and rehabilitation support.",
  openGraph: {
    title: "About Us | Nair's Epigenetic Wellness",
    description:
      "Wellbeing begins with understanding. Learn about Nair's Epigenetic Wellness and our person-centred psychological approach.",
    url: "https://www.nairsepigeneticwellness.com/about",
    siteName: "Nair's Epigenetic Wellness",
    locale: "en_US",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}


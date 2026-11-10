import type { Metadata } from "next";
import ServicesPageClient from "@/components/services/ServicesPageClient";

export const metadata: Metadata = {
  title: "Services | Nair's Epigenetic Wellness",
  description:
    "Explore counselling, psychotherapy, hypnotherapy, online rehabilitation and wellbeing services at Nair's Epigenetic Wellness.",
  openGraph: {
    title: "Services | Nair's Epigenetic Wellness",
    description:
      "Thoughtful care for mind, life & wellbeing. Person-centred psychological and therapeutic services at Nair's Epigenetic Wellness.",
    url: "https://www.nairsepigeneticwellness.com/services",
    siteName: "Nair's Epigenetic Wellness",
    locale: "en_US",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}


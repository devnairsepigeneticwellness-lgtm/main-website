import type { Metadata } from "next";
import ProfessionalsPageClient from "@/components/professionals/ProfessionalsPageClient";

export const metadata: Metadata = {
  title: "Our Professionals | Nair's Epigenetic Wellness",
  description:
    "Meet the professionals associated with Nair's Epigenetic Wellness and explore their backgrounds, areas of focus and approaches to wellbeing.",
  openGraph: {
    title: "Our Professionals | Nair's Epigenetic Wellness",
    description:
      "Meet the professionals associated with Nair's Epigenetic Wellness and explore their backgrounds, areas of focus and approaches to wellbeing.",
    url: "https://www.nairsepigeneticwellness.com/professionals",
    siteName: "Nair's Epigenetic Wellness",
    locale: "en_US",
    type: "website",
  },
};

export default function ProfessionalsPage() {
  return <ProfessionalsPageClient />;
}

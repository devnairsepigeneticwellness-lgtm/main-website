import { Metadata } from "next";
import AssessmentPageClient from "@/components/assessment/AssessmentPageClient";

export const metadata: Metadata = {
  title: "Self-Assessment | A Gentle Check-In With Yourself | Nair's Epigenetic Wellness",
  description:
    "Take a gentle, reflective check-in with yourself. Explore early signs of emotional exhaustion, anxiety, sleep disruption, or stress, and understand appropriate wellbeing pathways.",
  openGraph: {
    title: "Self-Assessment — Nair's Epigenetic Wellness",
    description:
      "A thoughtful self-assessment and screening framework to support mental health, emotional grounding, and professional care.",
  },
};

export default function AssessmentPage() {
  return <AssessmentPageClient />;
}


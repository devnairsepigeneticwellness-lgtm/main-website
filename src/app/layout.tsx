import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nair's Epigenetic Wellness (N.E.W.) | Understand Yourself. Transform Your Wellbeing.",
  description:
    "A premier wellness organisation offering counselling, psychotherapy, clinical hypnotherapy, online rehabilitation, and professional training founded by Ajit Kumar Nair.",
  keywords: [
    "Epigenetic Wellness",
    "Counselling Psychologist",
    "Psychotherapy",
    "Ajit Kumar Nair",
    "Clinical Hypnotherapy",
    "Rehabilitation Counselor",
    "Mental Health",
    "Mindfulness",
    "Wellbeing Programmes",
    "Indore Mental Health"
  ],
  authors: [{ name: "Ajit Kumar Nair", url: "https://www.nairsepigeneticwellness.com" }],
  openGraph: {
    title: "Nair's Epigenetic Wellness (N.E.W.)",
    description: "Understand Yourself. Transform Your Wellbeing. Person-centred integrative mental health and psychological training.",
    siteName: "Nair's Epigenetic Wellness",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#F7F5EF] text-[#24352D] font-sans selection:bg-[#B58B50]/20 selection:text-[#173D34]">
        {children}
      </body>
    </html>
  );
}

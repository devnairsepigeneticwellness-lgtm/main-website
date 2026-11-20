"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import AboutHero from "@/components/about/AboutHero";
import OurStorySection from "@/components/about/OurStorySection";
import EpigeneticsExplainer from "@/components/about/EpigeneticsExplainer";
import AboutPhilosophy from "@/components/about/AboutPhilosophy";
import AboutFounder from "@/components/about/AboutFounder";
import WhyWeExist from "@/components/about/WhyWeExist";
import AboutWorkshopsSection from "@/components/about/AboutWorkshopsSection";
import WhoWeSupport from "@/components/about/WhoWeSupport";
import AboutApproachTimeline from "@/components/about/AboutApproachTimeline";
import AboutCtaSection from "@/components/about/AboutCtaSection";

export default function AboutPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("General Consultation");

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#24352D] font-sans">
      {/* Announcement Bar */}
      <AnnouncementBar onOpenBooking={() => handleOpenBooking("About Page Discovery")} />

      {/* Header & Sticky Navigation (Active on About Us) */}
      <Navbar
        currentPage="about"
        onOpenBooking={() => handleOpenBooking("General Consultation")}
      />

      <main className="flex-1">
        {/* Section 1 — Hero: Understanding You. Supporting Change. Enabling Wellbeing. */}
        <AboutHero onOpenBooking={() => handleOpenBooking("About N.E.W. Exploration")} />

        {/* Section 2 — Our Integrative & Person-Centred Approach */}
        <OurStorySection />

        {/* Section 3 — Meet Ajit Kumar Nair (Founder Bio, Mariners background, Modalities) */}
        <AboutFounder onOpenBooking={() => handleOpenBooking("Consultation with Ajit")} />

        {/* Section 4 — What Is Epigenetics? (Science & Ethics) */}
        <EpigeneticsExplainer />

        {/* Section 5 — Our Philosophy (4 Pillars) */}
        <AboutPhilosophy />

        {/* Section 6 — Why Choose N.E.W.? (5 Pillars + Commitments) */}
        <WhyWeExist />

        {/* Section 7 — Workshops & Events (Programs, Live School Counselling, Gallery) */}
        <AboutWorkshopsSection onOpenBooking={() => handleOpenBooking("Workshops Registration")} />

        {/* Section 8 — Who We Support */}
        <WhoWeSupport />

        {/* Section 9 — Our Approach in Practice */}
        <AboutApproachTimeline />

        {/* Section 10 — Closing Statement & 3 CTAs */}
        <AboutCtaSection onOpenBooking={() => handleOpenBooking("About Page CTA")} />
      </main>

      {/* Section 11 — Footer */}
      <Footer onOpenBooking={() => handleOpenBooking("Footer Booking")} />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        preselectedService={selectedService}
      />
    </div>
  );
}

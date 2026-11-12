"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import ProfessionalsHero from "@/components/professionals/ProfessionalsHero";
import TeamIntroduction from "@/components/professionals/TeamIntroduction";
import FeaturedFounder from "@/components/professionals/FeaturedFounder";
import TeamGrid from "@/components/professionals/TeamGrid";
import ProfessionalProfileModal from "@/components/professionals/ProfessionalProfileModal";
import AreasOfFocus from "@/components/professionals/AreasOfFocus";
import ProfessionalPhilosophy from "@/components/professionals/ProfessionalPhilosophy";
import ConnectionSteps from "@/components/professionals/ConnectionSteps";
import ProfessionalEnquiryCTA from "@/components/professionals/ProfessionalEnquiryCTA";
import ProfessionalFAQ from "@/components/professionals/ProfessionalFAQ";
import ProfessionalFinalCTA from "@/components/professionals/ProfessionalFinalCTA";
import { PROFESSIONALS, Professional } from "@/data/professionalsData";

export default function ProfessionalsPageClient() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Professional Team Enquiry");
  const [activeProfile, setActiveProfile] = useState<Professional | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Founder is the first professional in the data array
  const founder = PROFESSIONALS.find((p) => p.isFounder) || PROFESSIONALS[0];

  const handleOpenBooking = (serviceOrName?: string) => {
    if (serviceOrName) {
      setSelectedService(serviceOrName);
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleOpenProfile = (professional: Professional) => {
    setActiveProfile(professional);
    setIsProfileModalOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileModalOpen(false);
  };

  const handleExploreTeam = () => {
    const el = document.getElementById("founder-profile");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#24352D] font-sans antialiased selection:bg-[#B58B50]/20 selection:text-[#173D34]">
      {/* Section 1 — Navigation & Announcement */}
      <AnnouncementBar onOpenBooking={() => handleOpenBooking("Professional Announcement Inquiry")} />
      <Navbar
        currentPage="professionals"
        onOpenBooking={() => handleOpenBooking("Professional Team General Consultation")}
      />

      <main className="flex-1">
        {/* Section 2 — Premium Professionals Hero */}
        <ProfessionalsHero
          onExploreTeam={handleExploreTeam}
          onOpenBooking={handleOpenBooking}
        />

        {/* Section 3 — Team Introduction */}
        <TeamIntroduction />

        {/* Section 4 — Featured Founder Profile */}
        <FeaturedFounder
          founder={founder}
          onOpenProfile={handleOpenProfile}
          onOpenBooking={handleOpenBooking}
        />

        {/* Section 5 — Our Professional Team (Dr. Deepa Jain, Zainab Aarsiwala, Bhavya Singh) */}
        <TeamGrid
          professionals={PROFESSIONALS}
          onOpenProfile={handleOpenProfile}
          onOpenBooking={handleOpenBooking}
        />

        {/* Section 7 — Areas of Professional Focus */}
        <AreasOfFocus />

        {/* Section 8 — Our Professional Philosophy */}
        <ProfessionalPhilosophy />

        {/* Section 9 — How to Connect With a Professional */}
        <ConnectionSteps />

        {/* Section 10 — Professional Enquiry CTA */}
        <ProfessionalEnquiryCTA onOpenBooking={handleOpenBooking} />

        {/* Section 11 — Frequently Asked Questions */}
        <ProfessionalFAQ onOpenBooking={handleOpenBooking} />

        {/* Section 12 — Final CTA */}
        <ProfessionalFinalCTA onOpenBooking={handleOpenBooking} />
      </main>

      {/* Section 13 — Footer */}
      <Footer onOpenBooking={() => handleOpenBooking("Footer Professional Booking")} />

      {/* Section 6 — Detailed Profile Interaction Modal */}
      <ProfessionalProfileModal
        professional={activeProfile}
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfile}
        onOpenBooking={handleOpenBooking}
      />

      {/* Interactive Consultation / Booking Modal */}
      <ConsultationModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedService={selectedService}
      />
    </div>
  );
}

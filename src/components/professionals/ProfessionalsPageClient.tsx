"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import ProfessionalsHero from "@/components/professionals/ProfessionalsHero";
import FeaturedFounder from "@/components/professionals/FeaturedFounder";
import TeamGrid from "@/components/professionals/TeamGrid";
import ConnectionSteps from "@/components/professionals/ConnectionSteps";
import ProfessionalEnquiryCTA from "@/components/professionals/ProfessionalEnquiryCTA";
import ProfessionalFAQ from "@/components/professionals/ProfessionalFAQ";
import ProfessionalFinalCTA from "@/components/professionals/ProfessionalFinalCTA";
import { PROFESSIONALS } from "@/data/professionalsData";

export default function ProfessionalsPageClient() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Professional Team Enquiry");

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
        <ConnectionSteps />

        {/* Section 4 — Featured Founder Profile */}
        <FeaturedFounder
          founder={founder}
          onOpenBooking={handleOpenBooking}
        />

        {/* Section 5 — Our Professional Team (Dr. Deepa Jain, Zainab Aarsiwala, Bhavya Singh) */}
        <TeamGrid
          professionals={PROFESSIONALS}
          onOpenBooking={handleOpenBooking}
        />

        {/* Section 6 — Professional Enquiry CTA */}
        <ProfessionalEnquiryCTA onOpenBooking={handleOpenBooking} />

        {/* Section 8 — Frequently Asked Questions */}
        <ProfessionalFAQ onOpenBooking={handleOpenBooking} />

        {/* Section 9 — Final CTA */}
        <ProfessionalFinalCTA onOpenBooking={handleOpenBooking} />
      </main>
  
      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking("Footer Professional Booking")} />

      {/* Interactive Consultation / Booking Modal */}
      <ConsultationModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedService={selectedService}
      />
    </div>
  );
}

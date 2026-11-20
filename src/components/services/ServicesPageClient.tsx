"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesStudio from "@/components/services/ServicesStudio";
import PillarDetailModal, { PillarId } from "@/components/services/PillarDetailModal";
import ServicesFaq from "@/components/services/ServicesFaq";

export default function ServicesPageClient() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Counselling");
  const [activePillarModal, setActivePillarModal] = useState<PillarId | null>(null);

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsConsultationModalOpen(true);
  };

  const handleCloseConsultationModal = () => {
    setIsConsultationModalOpen(false);
  };

  const handleExploreServices = () => {
    const el = document.getElementById("services-explorer") || document.getElementById("services-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#24352D] font-sans">
      {/* Announcement Bar */}
      <AnnouncementBar onOpenBooking={() => handleOpenBooking("Services Inquiry")} />

      {/* Header & Sticky Navigation (Services Active) */}
      <Navbar
        currentPage="services"
        onOpenBooking={() => handleOpenBooking("Services Discovery")}
      />

      <main className="flex-1">
        {/* Section 1 — Hero: Services We Offer */}
        <ServicesHero
          onOpenBooking={() => handleOpenBooking("General Services Consultation")}
          onExploreServices={handleExploreServices}
        />

        {/* Section 2 — The Interactive 7-Pathways Studio (Clean, Zero Horizontal Scrollbars, Verbatim Copy) */}
        <ServicesStudio
          onOpenBooking={handleOpenBooking}
          onOpenModal={(pillarId) => setActivePillarModal(pillarId)}
        />

        {/* Section 3 — Frequently Asked Questions */}
        <ServicesFaq onOpenBooking={() => handleOpenBooking("FAQ Inquiry")} />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking("Footer Booking")} />

      {/* Comprehensive 7-Pillar Detail Modal (Houses 100% of exact clinical content & modalities) */}
      <PillarDetailModal
        pillar={activePillarModal}
        onClose={() => setActivePillarModal(null)}
        onBook={handleOpenBooking}
      />

      {/* Interactive Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={handleCloseConsultationModal}
        preselectedService={selectedService}
      />
    </div>
  );
}

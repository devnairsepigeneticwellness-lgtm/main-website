"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import ServicesHero from "@/components/services/ServicesHero";
import DetailedCounselling from "@/components/services/DetailedCounselling";
import DetailedHypnotherapy from "@/components/services/DetailedHypnotherapy";
import DetailedRehabilitation from "@/components/services/DetailedRehabilitation";
import DetailedRenewalSpiritual from "@/components/services/DetailedRenewalSpiritual";
import DetailedSupportPlans from "@/components/services/DetailedSupportPlans";
import ServicesFaq from "@/components/services/ServicesFaq";

export default function ServicesPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Counselling");

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleExploreServices = () => {
    const el = document.getElementById("counselling");
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

        {/* Section 2 — Counselling & Psychotherapies (All 10 Modalities) */}
        <DetailedCounselling onOpenBooking={handleOpenBooking} />

        {/* Section 3 — Clinical Hypnotherapy */}
        <DetailedHypnotherapy onOpenBooking={handleOpenBooking} />

        {/* Section 4 — Online Rehabilitation */}
        <DetailedRehabilitation onOpenBooking={handleOpenBooking} />

        {/* Section 5 — Renewal & Spiritual Practices */}
        <DetailedRenewalSpiritual onOpenBooking={handleOpenBooking} />

        {/* Section 6 — Treatment & Support Plans + Crisis Intervention + Next Steps */}
        <DetailedSupportPlans onOpenBooking={handleOpenBooking} />

        {/* Section 7 — Frequently Asked Questions */}
        <ServicesFaq onOpenBooking={() => handleOpenBooking("FAQ Inquiry")} />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking("Footer Booking")} />

      {/* Interactive Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        preselectedService={selectedService}
      />
    </div>
  );
}

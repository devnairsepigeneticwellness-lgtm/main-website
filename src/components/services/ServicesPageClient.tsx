"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesIntro from "@/components/services/ServicesIntro";
import ServicesOverviewGrid from "@/components/services/ServicesOverviewGrid";
import DetailedCounselling from "@/components/services/DetailedCounselling";
import DetailedHypnotherapy from "@/components/services/DetailedHypnotherapy";
import DetailedRehabilitation from "@/components/services/DetailedRehabilitation";
import DetailedRenewalSpiritual from "@/components/services/DetailedRenewalSpiritual";
import DetailedSupportPlans from "@/components/services/DetailedSupportPlans";
import WhoCanExplore from "@/components/services/WhoCanExplore";
import WhyChooseNew from "@/components/services/WhyChooseNew";
import ServicesFaq from "@/components/services/ServicesFaq";
import ServicesFinalCta from "@/components/services/ServicesFinalCta";

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
    const el = document.getElementById("services-overview");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#24352D] font-sans">
      {/* Announcement Bar */}
      <AnnouncementBar onOpenBooking={() => handleOpenBooking("Services Inquiry")} />

      {/* Header & Sticky Navigation (Services Active, No Assessment) */}
      <Navbar
        currentPage="services"
        onOpenBooking={() => handleOpenBooking("Services Discovery")}
      />

      <main className="flex-1">
        {/* Section 2 — Hero */}
        <ServicesHero
          onOpenBooking={() => handleOpenBooking("General Services Consultation")}
          onExploreServices={handleExploreServices}
        />

        {/* Section 3 — Introduction to Our Services */}
        <ServicesIntro />

        {/* Section 4 — Main Services Overview (7 Cards with Learn More scroll) */}
        <ServicesOverviewGrid onOpenBooking={handleOpenBooking} />

        {/* Section 5 — Detailed Counselling & Psychotherapy */}
        <DetailedCounselling onOpenBooking={handleOpenBooking} />

        {/* Section 6 — Clinical Hypnotherapy */}
        <DetailedHypnotherapy onOpenBooking={handleOpenBooking} />

        {/* Section 7 — Online Rehabilitation */}
        <DetailedRehabilitation onOpenBooking={handleOpenBooking} />

        {/* Section 8 — Renewal & Spiritual Practices */}
        <DetailedRenewalSpiritual onOpenBooking={handleOpenBooking} />

        {/* Section 9 — Treatment & Support Plans */}
        <DetailedSupportPlans onOpenBooking={handleOpenBooking} />

        {/* Section 10 — Who Can Explore Our Services? */}
        <WhoCanExplore onOpenBooking={handleOpenBooking} />

        {/* Section 11 — Why Choose N.E.W.? */}
        <WhyChooseNew />

        {/* Section 12 — Frequently Asked Questions */}
        <ServicesFaq onOpenBooking={() => handleOpenBooking("FAQ Inquiry")} />

        {/* Section 13 — Final Consultation CTA */}
        <ServicesFinalCta onOpenBooking={() => handleOpenBooking("Services Page Final CTA")} />
      </main>

      {/* Section 14 — Luxury Editorial Footer */}
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


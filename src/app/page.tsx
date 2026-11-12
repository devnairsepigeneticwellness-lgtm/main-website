"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PhilosophyStrip from "@/components/PhilosophyStrip";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ApproachRoadmap from "@/components/ApproachRoadmap";
import FounderSection from "@/components/FounderSection";
import ProgrammesSection from "@/components/ProgrammesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";

export default function HomePage() {
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
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#24352D] font-sans">
      {/* Sticky Main Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking("Counselling")}
      />

      <main className="flex-1">
        {/* Section 2 — Hero Section */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking("Counselling")}
          onExploreServices={handleExploreServices}
        />

        {/* Section 3 — Wellness Philosophy Highlights */}
        <PhilosophyStrip />

        {/* Section 4 — About Epigenetic Wellness & Pillars */}
        <AboutSection onOpenBooking={() => handleOpenBooking("Counselling")} />

        {/* Section 5 — Core Services Showcase */}
        <ServicesSection onOpenBooking={handleOpenBooking} />

        {/* Section 6 — The N.E.W. Method & Approach */}
        <ApproachRoadmap onOpenBooking={() => handleOpenBooking("Counselling")} />

        {/* Section 7 — Founder Spotlight: Ajit Kumar Nair */}
        <FounderSection onOpenBooking={() => handleOpenBooking("Consultation — Ajit Kumar Nair")} />

        {/* Section 8 — Professional Programmes, Internships & Corporate */}
        <ProgrammesSection onOpenBooking={handleOpenBooking} />

        {/* Section 9 — Testimonials & Client Reflections */}
        <TestimonialsSection />

        {/* Section 11 — FAQ Accordion */}
        <FaqSection onOpenBooking={() => handleOpenBooking("Counselling")} />

        {/* Section 12 — Direct Contact & Booking Inquiries */}
        <ContactSection />
      </main>

      {/* Section 13 — Luxury Editorial Footer */}
      <Footer onOpenBooking={() => handleOpenBooking("Counselling")} />

      {/* Interactive Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        preselectedService={selectedService}
      />
    </div>
  );
}

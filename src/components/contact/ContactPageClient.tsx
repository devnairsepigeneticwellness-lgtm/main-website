"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
import EnquiryFormSection, { EnquiryType } from "@/components/contact/EnquiryFormSection";
import QuickEnquiryOptions from "@/components/contact/QuickEnquiryOptions";
import ConsultationEnquiryCallout from "@/components/contact/ConsultationEnquiryCallout";
import LocationDirections from "@/components/contact/LocationDirections";
import ContactFaq from "@/components/contact/ContactFaq";
import ContactFinalCta from "@/components/contact/ContactFinalCta";

export default function ContactPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState<string>("General Consultation");
  const [selectedEnquiryType, setSelectedEnquiryType] = useState<EnquiryType>("General Enquiry");

  const handleOpenBooking = (serviceOrProgramme?: string) => {
    if (serviceOrProgramme) {
      setModalService(serviceOrProgramme);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleScrollToForm = () => {
    const el = document.getElementById("enquiry-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      const nameInput = document.getElementById("name");
      if (nameInput) {
        nameInput.focus();
      }
    }, 450);
  };

  const handleSelectEnquiryType = (type: EnquiryType) => {
    setSelectedEnquiryType(type);
    handleScrollToForm();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#24352D] font-sans antialiased selection:bg-[#B58B50]/20 selection:text-[#173D34]">
      {/* Top Announcement Bar */}
      <AnnouncementBar onOpenBooking={() => handleOpenBooking("Announcement Consultation")} />

      {/* Section 1 — Navigation Header */}
      <Navbar
        currentPage="contact"
        onOpenBooking={() => handleOpenBooking("Navbar Consultation")}
      />

      <main className="flex-1">
        {/* Section 2 — Premium Contact Hero */}
        <ContactHero onScrollToForm={handleScrollToForm} />

        {/* Section 3 — Contact Information Cards */}
        <ContactInfoCards />

        {/* Section 4 — Premium Enquiry Form */}
        <EnquiryFormSection
          selectedEnquiryType={selectedEnquiryType}
          onChangeEnquiryType={setSelectedEnquiryType}
        />

        {/* Section 5 — Quick Enquiry Options */}
        <QuickEnquiryOptions onSelectOption={handleSelectEnquiryType} />

        {/* Section 6 — Consultation Enquiry Callout */}
        <ConsultationEnquiryCallout onRequestConsultation={handleSelectEnquiryType} />

        {/* Section 7 — Location & Directions */}
        <LocationDirections />

        {/* Section 8 — Frequently Asked Questions */}
        <ContactFaq />

        {/* Section 9 — Final Call to Action */}
        <ContactFinalCta onScrollToForm={handleScrollToForm} />
      </main>

      {/* Section 10 — Footer */}
      <Footer onOpenBooking={() => handleOpenBooking("Footer Consultation")} />

      {/* Interactive Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        preselectedService={modalService}
      />
    </div>
  );
}


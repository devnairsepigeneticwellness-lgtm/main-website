"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import ProgrammesHero from "@/components/programmes/ProgrammesHero";
import LearningExperience from "@/components/programmes/LearningExperience";
import ProgrammesOverview from "@/components/programmes/ProgrammesOverview";
import DetailedInternships from "@/components/programmes/DetailedInternships";
import DetailedMentorship from "@/components/programmes/DetailedMentorship";
import DetailedCorporate from "@/components/programmes/DetailedCorporate";
import DetailedEducational from "@/components/programmes/DetailedEducational";
import WhoCanBenefit from "@/components/programmes/WhoCanBenefit";
import LearningApproachTimeline from "@/components/programmes/LearningApproachTimeline";
import UpcomingProgrammes from "@/components/programmes/UpcomingProgrammes";
import ProgrammesFaq from "@/components/programmes/ProgrammesFaq";
import ProgrammesFinalCta from "@/components/programmes/ProgrammesFinalCta";

export default function ProgrammesPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState<string>("Programmes Inquiry");

  const handleOpenBooking = (programmeName?: string) => {
    if (programmeName) {
      setSelectedProgramme(programmeName);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleExploreProgrammes = () => {
    const el = document.getElementById("programmes-overview");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#24352D] font-sans antialiased selection:bg-[#B58B50]/20 selection:text-[#173D34]">
      {/* Section 1 — Navigation Bar & Announcement */}
      <AnnouncementBar onOpenBooking={() => handleOpenBooking("Programmes Announcement")} />
      <Navbar
        currentPage="programmes"
        onOpenBooking={() => handleOpenBooking("Programmes Consultation")}
      />

      <main className="flex-1">
        {/* Section 2 — Premium Programmes Hero */}
        <ProgrammesHero
          onOpenBooking={() => handleOpenBooking("Programmes Discovery")}
          onExploreProgrammes={handleExploreProgrammes}
        />

        {/* Section 3 — Introduction to Learning at N.E.W. (4 Highlights) */}
        <LearningExperience />

        {/* Section 4 — Programme Overview (4 Overview Cards with anchor links) */}
        <ProgrammesOverview />

        {/* Section 5 — Internship Programmes (Split-Screen & Approved Placeholders) */}
        <DetailedInternships onOpenBooking={handleOpenBooking} />

        {/* Section 6 — Mentorship Programmes (4 Focus Cards + Editorial Quote) */}
        <DetailedMentorship onOpenBooking={handleOpenBooking} />

        {/* Section 7 — Corporate Workshops (Dark Forest Section + 4 Topics) */}
        <DetailedCorporate onOpenBooking={handleOpenBooking} />

        {/* Section 8 — Educational Training (4 Target Groups) */}
        <DetailedEducational onOpenBooking={handleOpenBooking} />

        {/* Section 9 — Who Can Benefit (5 Categories Grid) */}
        <WhoCanBenefit onOpenBooking={handleOpenBooking} />

        {/* Section 10 — Learning Approach Timeline (4-Step Connected Process) */}
        <LearningApproachTimeline />

        {/* Section 11 — Upcoming Programmes & Workshops */}
        <UpcomingProgrammes onOpenBooking={handleOpenBooking} />

        {/* Section 12 — Frequently Asked Questions (Accordion) */}
        <ProgrammesFaq onOpenBooking={() => handleOpenBooking("Programmes FAQ Inquiry")} />

        {/* Section 13 — Final Call to Action */}
        <ProgrammesFinalCta onOpenBooking={handleOpenBooking} />
      </main>

      {/* Section 14 — Footer */}
      <Footer onOpenBooking={() => handleOpenBooking("Footer Booking")} />

      {/* Interactive Consultation / Booking Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        preselectedService={selectedProgramme}
      />
    </div>
  );
}

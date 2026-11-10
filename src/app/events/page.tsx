import React, { Suspense } from "react";
import { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventsPageClient from "@/components/events/EventsPageClient";
import { getPublishedEvents, getPublishedGalleryImages } from "@/lib/events/queries";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Workshops & Events | Nair's Epigenetic Wellness (N.E.W.)",
  description:
    "Discover learning experiences, mental health workshops and wellbeing programmes designed to bring psychological understanding into everyday life.",
  openGraph: {
    title: "Workshops & Events | Nair's Epigenetic Wellness",
    description:
      "Explore upcoming and historical workshops on suicide prevention, non-violent communication, stress mastery, and emotional regulation.",
  },
};

async function EventsList() {
  const [events, galleryImages] = await Promise.all([
    getPublishedEvents(),
    getPublishedGalleryImages(),
  ]);

  return <EventsPageClient initialEvents={events} galleryImages={galleryImages} />;
}

export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#24352D]">
      <AnnouncementBar />
      <Navbar currentPage="workshops" />
      <div className="flex-1">
        <Suspense
          fallback={
            <div className="py-24 flex flex-col items-center justify-center text-[#59675F] space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#B58B50]" />
              <span className="text-xs font-medium">Loading workshops and events...</span>
            </div>
          }
        >
          <EventsList />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

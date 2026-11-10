"use client";

import React, { useState, useMemo } from "react";
import EventsHero from "./EventsHero";
import EventsFilterBar, { EventFilterType } from "./EventsFilterBar";
import EventCard from "./EventCard";
import PastEventCard from "./PastEventCard";
import PublicGalleryGrid from "../gallery/PublicGalleryGrid";
import ConsultationModal from "../ConsultationModal";
import { Event, GalleryImage } from "@/lib/supabase/types";
import { Calendar, Sparkles } from "lucide-react";

interface EventsPageClientProps {
  initialEvents: Event[];
  galleryImages: GalleryImage[];
}

export default function EventsPageClient({
  initialEvents,
  galleryImages,
}: EventsPageClientProps) {
  const [activeFilter, setActiveFilter] = useState<EventFilterType>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<string>("Workshop Registration");
  const [now, setNow] = useState<Date>(() => new Date("2026-11-09T00:00:00Z"));

  React.useEffect(() => {
    setNow(new Date());
  }, []);

  // Split into upcoming and past
  const { upcomingList, pastList } = useMemo(() => {
    const upcoming: Event[] = [];
    const past: Event[] = [];

    initialEvents.forEach((ev) => {
      if (ev.is_cancelled || ev.is_archived || !ev.is_published) return;

      const endDate = new Date(ev.end_at);
      if (endDate >= now) {
        upcoming.push(ev);
      } else {
        past.push(ev);
      }
    });

    // Sort upcoming nearest date first
    upcoming.sort(
      (a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime()
    );
    // Sort past newest to oldest
    past.sort(
      (a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime()
    );

    return { upcomingList: upcoming, pastList: past };
  }, [initialEvents, now]);

  // Apply filters and search query
  const filterEvent = (ev: Event) => {
    // Search check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ev.title.toLowerCase().includes(q);
      const matchDesc = ev.short_description?.toLowerCase().includes(q) || false;
      const matchCategory = ev.category.toLowerCase().includes(q);
      const matchSpeaker = ev.speaker_name?.toLowerCase().includes(q) || false;
      if (!matchTitle && !matchDesc && !matchCategory && !matchSpeaker) {
        return false;
      }
    }

    if (activeFilter === "all") return true;
    if (activeFilter === "upcoming") return new Date(ev.end_at) >= now;
    if (activeFilter === "completed") return new Date(ev.end_at) < now;
    if (activeFilter === "online") return ev.mode === "Online";
    if (activeFilter === "offline") return ev.mode === "In-Person";
    if (activeFilter === "hybrid") return ev.mode === "Hybrid";

    return true;
  };

  const filteredUpcoming = upcomingList.filter(filterEvent);
  const filteredPast = pastList.filter(filterEvent);

  const handleOpenBooking = (title: string) => {
    setSelectedService(`Workshop: ${title}`);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#24352D] font-sans">
      {/* Hero Section */}
      <EventsHero />

      {/* Main Events Showcase */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Filter & Search Bar */}
        <EventsFilterBar
          activeFilter={activeFilter}
          onFilterChange={(f) => setActiveFilter(f)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
        />

        {/* Section 1: Upcoming Events */}
        {activeFilter !== "completed" && (
          <section id="upcoming-events" className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B58B50] mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Scheduled Cohorts</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#173D34]">
                  Upcoming Workshops &amp; Events
                </h2>
              </div>
              <span className="text-xs text-[#59675F] font-light">
                Showing {filteredUpcoming.length} upcoming programme
                {filteredUpcoming.length === 1 ? "" : "s"}
              </span>
            </div>

            {filteredUpcoming.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredUpcoming.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onOpenBooking={handleOpenBooking}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-6 rounded-3xl bg-white border border-[#B58B50]/20 shadow-xs max-w-2xl mx-auto">
                <div className="w-14 h-14 rounded-full bg-[#E8EDE4] text-[#173D34] flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-[#B58B50]" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#173D34]">
                  New workshops and events will be announced soon.
                </h3>
                <p className="text-sm text-[#59675F] font-light mt-2 max-w-md mx-auto leading-relaxed">
                  We are finalising upcoming clinical training cohorts and community sensitisation workshops. Check back shortly or view our completed events below.
                </p>
              </div>
            )}
          </section>
        )}

        {/* Section 2: Past Events & Workshops */}
        {activeFilter !== "upcoming" && (
          <section id="past-events" className="pt-8 border-t border-[#B58B50]/20 mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B58B50] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Archive &amp; Retrospectives</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#173D34]">
                  Past Events &amp; Workshops
                </h2>
                <p className="text-xs sm:text-sm text-[#59675F] font-light mt-1">
                  Explore previous workshops conducted by Ajit Kumar Nair and the N.E.W. team.
                </p>
              </div>
              <span className="text-xs text-[#59675F] font-light">
                {filteredPast.length} completed workshop
                {filteredPast.length === 1 ? "" : "s"}
              </span>
            </div>

            {filteredPast.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPast.map((event) => (
                  <PastEventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4 rounded-3xl bg-white border border-[#B58B50]/20 max-w-lg mx-auto">
                <p className="text-sm text-[#59675F]">
                  No past events matched your search filter.
                </p>
              </div>
            )}
          </section>
        )}

        {/* Section 3: Visual Workshop Gallery */}
        <PublicGalleryGrid images={galleryImages} />
      </main>

      {/* Booking / Seat Reservation Modal */}
      <ConsultationModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedService={selectedService}
      />
    </div>
  );
}

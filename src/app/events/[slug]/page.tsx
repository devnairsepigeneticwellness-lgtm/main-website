import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventDetailClient from "@/components/events/EventDetailClient";
import { getEventBySlug, getPublishedEvents } from "@/lib/events/queries";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const events = await getPublishedEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { event } = await getEventBySlug(slug);

  if (!event || (!event.is_published && !event.is_archived)) {
    return {
      title: "Event Not Found | Nair's Epigenetic Wellness",
    };
  }

  return {
    title: `${event.title} | Workshops & Events | N.E.W.`,
    description:
      event.short_description ||
      "Explore clinical workshops and psychological wellbeing programmes by Nair's Epigenetic Wellness.",
    openGraph: {
      title: `${event.title} | Nair's Epigenetic Wellness`,
      description: event.short_description || undefined,
      images: event.poster_path ? [{ url: event.poster_path }] : undefined,
    },
  };
}

async function EventContent({ params }: PageProps) {
  const { slug } = await params;
  const { event, gallery } = await getEventBySlug(slug);

  if (!event || !event.is_published) {
    notFound();
  }

  return <EventDetailClient event={event} gallery={gallery} />;
}

export default function EventDetailPage(props: PageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#24352D]">
      <AnnouncementBar />
      <Navbar currentPage="workshops" />
      <div className="flex-1">
        <Suspense
          fallback={
            <div className="py-24 flex flex-col items-center justify-center text-[#59675F] space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#B58B50]" />
              <span className="text-xs font-medium">Loading workshop details...</span>
            </div>
          }
        >
          <EventContent {...props} />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

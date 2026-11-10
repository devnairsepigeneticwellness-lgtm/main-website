import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import EventGalleryClient from "@/components/admin/EventGalleryClient";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { SEED_EVENTS, SEED_GALLERY } from "@/lib/events/seedData";
import { Event, GalleryImage } from "@/lib/supabase/types";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function EventGalleryContent({ params }: PageProps) {
  const { id } = await params;
  let event: Event | null = null;
  let gallery: GalleryImage[] = [];

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerSupabaseClient();
      const { data: eventData } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (eventData) {
        event = eventData as Event;
        const { data: galleryData } = await supabase
          .from("gallery_images")
          .select("*")
          .eq("event_id", id)
          .order("sort_order", { ascending: true });

        if (galleryData) gallery = galleryData as GalleryImage[];
      }
    } catch (err) {
      console.error("Error loading gallery from Supabase:", err);
    }
  }

  if (!event) {
    const fallback = SEED_EVENTS.find((e) => e.id === id);
    if (fallback) {
      event = fallback;
      gallery = SEED_GALLERY.filter((g) => g.event_id === fallback.id);
    }
  }

  if (!event) {
    notFound();
  }

  return <EventGalleryClient event={event!} initialGallery={gallery} />;
}

export default function EventGalleryPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex flex-col items-center justify-center text-[#59675F] space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#B58B50]" />
          <span className="text-xs font-medium">Loading event gallery...</span>
        </div>
      }
    >
      <EventGalleryContent {...props} />
    </Suspense>
  );
}

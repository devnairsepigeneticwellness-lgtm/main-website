import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { SEED_EVENTS } from "@/lib/events/seedData";
import { Event } from "@/lib/supabase/types";
import EditEventClient from "@/components/admin/EditEventClient";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function EditEventContent({ params }: PageProps) {
  const { id } = await params;
  let event: Event | null = null;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerSupabaseClient();
      const { data } = await supabase.from("events").select("*").eq("id", id).maybeSingle();
      if (data) event = data as Event;
    } catch (err) {
      console.error("Error fetching event for edit:", err);
    }
  }

  if (!event) {
    event = SEED_EVENTS.find((e) => e.id === id) || null;
  }

  if (!event) {
    notFound();
  }

  return <EditEventClient initialEvent={event!} />;
}

export default function EditEventPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex flex-col items-center justify-center text-[#59675F] space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#B58B50]" />
          <span className="text-xs font-medium">Loading event editor...</span>
        </div>
      }
    >
      <EditEventContent {...props} />
    </Suspense>
  );
}

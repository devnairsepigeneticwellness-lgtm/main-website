import React from "react";
import AdminEventsClient from "@/components/admin/AdminEventsClient";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { SEED_EVENTS } from "@/lib/events/seedData";
import { Event } from "@/lib/supabase/types";
import { connection } from "next/server";

export default async function AdminEventsPage() {
  await connection();
  let events: Event[] = SEED_EVENTS;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase
        .from("events")
        .select("*, gallery_images(id)")
        .order("start_at", { ascending: false });

      if (!error && data) {
        events = data.map((item: any) => ({
          ...item,
          gallery_count: item.gallery_images?.length || 0,
        })) as Event[];
      }
    } catch (err) {
      console.error("Error loading admin events from Supabase:", err);
    }
  }

  return <AdminEventsClient initialEvents={events} />;
}

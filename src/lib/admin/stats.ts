import { createServerSupabaseClient } from "../supabase/server";
import { isSupabaseConfigured } from "../supabase/client";
import { SEED_EVENTS, SEED_GALLERY } from "../events/seedData";

export interface DashboardStats {
  totalEvents: number;
  upcomingEvents: number;
  completedEvents: number;
  archivedEvents: number;
  draftEvents: number;
  galleryPhotos: number;
  pendingBookings: number;
  confirmedBookings: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  if (!isSupabaseConfigured()) {
    const now = new Date();
    const total = SEED_EVENTS.length;
    const upcoming = SEED_EVENTS.filter(
      (e) => e.is_published && !e.is_cancelled && !e.is_archived && new Date(e.end_at) >= now
    ).length;
    const completed = SEED_EVENTS.filter(
      (e) => e.is_published && !e.is_cancelled && !e.is_archived && new Date(e.end_at) < now
    ).length;
    const archived = SEED_EVENTS.filter((e) => e.is_archived).length;
    const drafts = SEED_EVENTS.filter((e) => !e.is_published).length;
    const galleryPhotos = SEED_GALLERY.length;

    return {
      totalEvents: total,
      upcomingEvents: upcoming,
      completedEvents: completed,
      archivedEvents: archived,
      draftEvents: drafts,
      galleryPhotos,
      pendingBookings: 2,
      confirmedBookings: 5,
    };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const nowIso = new Date().toISOString();

    // 1. Total events
    const { count: totalEvents } = await supabase
      .from("events")
      .select("*", { count: "exact", head: true });

    // 2. Upcoming (published, not archived, not cancelled, end_at >= now)
    const { count: upcomingEvents } = await supabase
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true)
      .eq("is_archived", false)
      .eq("is_cancelled", false)
      .gte("end_at", nowIso);

    // 3. Completed (published, not archived, not cancelled, end_at < now)
    const { count: completedEvents } = await supabase
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true)
      .eq("is_archived", false)
      .eq("is_cancelled", false)
      .lt("end_at", nowIso);

    // 4. Archived
    const { count: archivedEvents } = await supabase
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("is_archived", true);

    // 5. Drafts
    const { count: draftEvents } = await supabase
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("is_published", false);

    // 6. Gallery photos
    const { count: galleryPhotos } = await supabase
      .from("gallery_images")
      .select("*", { count: "exact", head: true });

    // 7. Pending Bookings
    const { count: pendingBookings } = await supabase
      .from("consultation_bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "Pending");

    // 8. Confirmed Bookings
    const { count: confirmedBookings } = await supabase
      .from("consultation_bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "Confirmed");

    return {
      totalEvents: totalEvents ?? 0,
      upcomingEvents: upcomingEvents ?? 0,
      completedEvents: completedEvents ?? 0,
      archivedEvents: archivedEvents ?? 0,
      draftEvents: draftEvents ?? 0,
      galleryPhotos: galleryPhotos ?? 0,
      pendingBookings: pendingBookings ?? 0,
      confirmedBookings: confirmedBookings ?? 0,
    };
  } catch (err) {
    console.error("Error computing dashboard stats from Supabase:", err);
    return {
      totalEvents: 0,
      upcomingEvents: 0,
      completedEvents: 0,
      archivedEvents: 0,
      draftEvents: 0,
      galleryPhotos: 0,
      pendingBookings: 0,
      confirmedBookings: 0,
    };
  }
}

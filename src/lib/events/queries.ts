import { createPublicClient } from "../supabase/public";
import { isSupabaseConfigured } from "../supabase/client";
import { Event, GalleryImage } from "../supabase/types";
import { SEED_EVENTS, SEED_GALLERY } from "./seedData";

export type EventStatusComputed = "Upcoming" | "Completed" | "Draft" | "Cancelled" | "Archived";

export function computeEventStatus(event: Event): EventStatusComputed {
  if (event.is_archived) return "Archived";
  if (event.is_cancelled) return "Cancelled";
  if (!event.is_published) return "Draft";

  const now = new Date();
  const endDate = new Date(event.end_at);
  if (endDate < now) {
    return "Completed";
  }
  return "Upcoming";
}

/**
 * Fetch all published events for the public site.
 */
export async function getPublishedEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured()) {
    return SEED_EVENTS.filter((e) => e.is_published && !e.is_archived);
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("events")
      .select("*, gallery_images(id)")
      .eq("is_published", true)
      .eq("is_archived", false)
      .order("start_at", { ascending: true });

    if (error || !data || data.length === 0) {
      return SEED_EVENTS.filter((e) => e.is_published && !e.is_archived);
    }

    return data.map((item: any) => ({
      ...item,
      gallery_count: item.gallery_images?.length || 0,
    })) as Event[];
  } catch (err) {
    console.error("Error fetching published events:", err);
    return SEED_EVENTS.filter((e) => e.is_published && !e.is_archived);
  }
}

/**
 * Fetch upcoming events (scheduled in future, published, not cancelled/archived).
 * Sorted nearest date first.
 */
export async function getUpcomingEvents(): Promise<Event[]> {
  const events = await getPublishedEvents();
  const now = new Date();

  return events
    .filter((e) => !e.is_cancelled && new Date(e.end_at) >= now)
    .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());
}

/**
 * Fetch past/historical events (scheduled in past, published).
 * Sorted newest to oldest.
 */
export async function getPastEvents(): Promise<Event[]> {
  const events = await getPublishedEvents();
  const now = new Date();

  return events
    .filter((e) => !e.is_cancelled && new Date(e.end_at) < now)
    .sort((a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime());
}

/**
 * Fetch a single event by slug with its published gallery images.
 */
export async function getEventBySlug(slug: string): Promise<{ event: Event | null; gallery: GalleryImage[] }> {
  if (!isSupabaseConfigured()) {
    const event = SEED_EVENTS.find((e) => e.slug === slug) || null;
    if (!event) return { event: null, gallery: [] };
    const gallery = SEED_GALLERY.filter((g) => g.event_id === event.id && g.is_published);
    return { event: { ...event, gallery_count: gallery.length }, gallery };
  }

  try {
    const supabase = createPublicClient();
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .single();

    if (eventError || !event) {
      const fallback = SEED_EVENTS.find((e) => e.slug === slug) || null;
      if (!fallback) return { event: null, gallery: [] };
      const gallery = SEED_GALLERY.filter((g) => g.event_id === fallback.id && g.is_published);
      return { event: { ...fallback, gallery_count: gallery.length }, gallery };
    }

    const { data: gallery } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("event_id", event.id)
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    return {
      event: { ...event, gallery_count: gallery?.length || 0 },
      gallery: (gallery || []) as GalleryImage[],
    };
  } catch (err) {
    console.error("Error fetching event by slug:", err);
    const fallback = SEED_EVENTS.find((e) => e.slug === slug) || null;
    if (!fallback) return { event: null, gallery: [] };
    const gallery = SEED_GALLERY.filter((g) => g.event_id === fallback.id && g.is_published);
    return { event: { ...fallback, gallery_count: gallery.length }, gallery };
  }
}

/**
 * Fetch all published gallery images across all events for the public gallery showcase.
 */
export async function getPublishedGalleryImages(): Promise<GalleryImage[]> {
  if (!isSupabaseConfigured()) {
    return SEED_GALLERY.filter((g) => g.is_published);
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*, events(title)")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return SEED_GALLERY.filter((g) => g.is_published);
    }

    return data.map((item: any) => ({
      ...item,
      event_title: item.events?.title,
    })) as GalleryImage[];
  } catch (err) {
    console.error("Error fetching published gallery images:", err);
    return SEED_GALLERY.filter((g) => g.is_published);
  }
}

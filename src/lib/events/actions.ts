"use server";

import { revalidatePath } from "next/cache";
import { eventSchema, EventInput, historicalEventSchema, HistoricalEventInput } from "../validation/events";
import { isSupabaseConfigured } from "../supabase/client";
import { createAdminClient } from "../supabase/admin";
import { destroyCloudinaryImage } from "../cloudinary/server";

export async function createEvent(input: EventInput) {
  const parsed = eventSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const data = parsed.data;

  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminClient();
      const { data: event, error } = await supabase
        .from("events")
        .insert({
          title: data.title,
          slug: data.slug,
          short_description: data.short_description || null,
          description: data.description || null,
          category: data.category,
          start_at: data.start_at,
          end_at: data.end_at,
          timezone: data.timezone,
          mode: data.mode,
          venue: data.venue || null,
          speaker_name: data.speaker_name || null,
          poster_path: data.poster_path || null,
          registration_url: data.registration_url || null,
          registration_button_text: data.registration_button_text,
          registration_status: data.registration_status,
          is_published: data.is_published,
          is_archived: data.is_archived,
          is_cancelled: data.is_cancelled,
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      revalidatePath("/events");
      revalidatePath(`/events/${data.slug}`);
      revalidatePath("/admin/events");
      return { success: true, event };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  return {
    success: true,
    message: "Event simulated in local preview mode. Configure Supabase in .env.local to persist.",
    event: { id: "preview-" + Date.now(), ...data },
  };
}

export async function createHistoricalEvent(
  input: HistoricalEventInput,
  galleryImages?: { url: string; caption?: string }[]
) {
  const parsed = historicalEventSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const data = parsed.data;
  const slug =
    data.slug ||
    data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  // Past event dates: start at 09:30 AM, end at 05:00 PM on the original historical date
  const startAt = `${data.original_date}T09:30:00+05:30`;
  const endAt = `${data.original_date}T17:00:00+05:30`;

  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminClient();
      const { data: event, error } = await supabase
        .from("events")
        .insert({
          title: data.title,
          slug,
          short_description: data.description ? data.description.slice(0, 150) + "..." : null,
          description: data.description || null,
          category: data.category,
          start_at: startAt,
          end_at: endAt,
          timezone: "Asia/Kolkata",
          mode: "In-Person",
          venue: data.venue || "Indore",
          speaker_name: data.speaker_name || "Ajit Kumar Nair",
          poster_path: data.poster_path || null,
          registration_url: null,
          registration_button_text: "Completed",
          registration_status: "Closed",
          is_published: data.is_published,
          is_archived: false,
          is_cancelled: false,
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      // If photographs provided, insert them into gallery_images
      if (galleryImages && galleryImages.length > 0 && event?.id) {
        const imageRows = galleryImages.map((img, idx) => ({
          event_id: event.id,
          image_path: img.url,
          caption: img.caption || null,
          category: "Highlights",
          sort_order: idx + 1,
          is_cover: idx === 0,
          is_published: true,
        }));

        await supabase.from("gallery_images").insert(imageRows);
      }

      revalidatePath("/events");
      revalidatePath(`/events/${slug}`);
      revalidatePath("/admin/events");
      return { success: true, event };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  return {
    success: true,
    message: "Historical event created in preview mode.",
    event: { id: "preview-hist-" + Date.now(), ...data, slug },
  };
}

export async function updateEvent(id: string, updates: Partial<EventInput>) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("events")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) return { success: false, error: error.message };

      revalidatePath("/events");
      if (data?.slug) revalidatePath(`/events/${data.slug}`);
      revalidatePath("/admin/events");
      return { success: true, event: data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  return { success: true, message: "Updated in local preview mode" };
}

export async function deleteEvent(id: string) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminClient();
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) return { success: false, error: error.message };

      revalidatePath("/events");
      revalidatePath("/admin/events");
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  return { success: true };
}

export async function togglePublishEvent(id: string, is_published: boolean) {
  return updateEvent(id, { is_published } as any);
}

export async function toggleArchiveEvent(id: string, is_archived: boolean) {
  return updateEvent(id, { is_archived } as any);
}

export async function toggleCancelEvent(id: string, is_cancelled: boolean) {
  return updateEvent(id, { is_cancelled } as any);
}

// ============================================================================
// GALLERY ACTIONS
// ============================================================================

export async function addGalleryImages(
  eventId: string,
  images: { image_path: string; caption?: string; category?: string; is_cover?: boolean }[]
) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminClient();
      const rows = images.map((img, idx) => ({
        event_id: eventId,
        image_path: img.image_path,
        caption: img.caption || null,
        category: img.category || "Highlights",
        sort_order: idx + 1,
        is_cover: Boolean(img.is_cover),
        is_published: true,
      }));

      const { data, error } = await supabase.from("gallery_images").insert(rows).select();
      if (error) return { success: false, error: error.message };

      revalidatePath("/events");
      revalidatePath(`/admin/events/${eventId}/gallery`);
      revalidatePath("/admin/gallery");
      return { success: true, images: data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  return { success: true };
}

export async function deleteGalleryImage(id: string, eventId?: string) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminClient();

      // Look up image URL first for best-effort Cloudinary cleanup
      const { data: existing } = await supabase
        .from("gallery_images")
        .select("image_path")
        .eq("id", id)
        .single();

      const { error } = await supabase.from("gallery_images").delete().eq("id", id);
      if (error) return { success: false, error: error.message };

      if (existing?.image_path) {
        await destroyCloudinaryImage(existing.image_path).catch((err) => {
          console.warn("Cloudinary cleanup warning:", err);
        });
      }

      revalidatePath("/events");
      if (eventId) revalidatePath(`/admin/events/${eventId}/gallery`);
      revalidatePath("/admin/gallery");
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  return { success: true };
}

export async function updateGalleryImage(
  id: string,
  updates: {
    caption?: string;
    sort_order?: number;
    is_cover?: boolean;
    is_published?: boolean;
    event_id?: string;
  }
) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminClient();

      // If setting this image as cover, remove cover from other images for the same event
      if (updates.is_cover && updates.event_id) {
        await supabase
          .from("gallery_images")
          .update({ is_cover: false })
          .eq("event_id", updates.event_id);
      }

      const { data, error } = await supabase
        .from("gallery_images")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) return { success: false, error: error.message };

      revalidatePath("/events");
      if (updates.event_id) revalidatePath(`/admin/events/${updates.event_id}/gallery`);
      revalidatePath("/admin/gallery");
      return { success: true, image: data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  return { success: true };
}

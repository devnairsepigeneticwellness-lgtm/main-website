"use server";

import { revalidatePath } from "next/cache";
import { isSupabaseConfigured } from "../supabase/client";
import { createAdminClient } from "../supabase/admin";
import { BookingStatus } from "../supabase/types";

export async function updateBookingStatus(bookingId: string, newStatus: BookingStatus) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("consultation_bookings")
        .update({ status: newStatus })
        .eq("id", bookingId)
        .select()
        .single();

      if (error) return { success: false, error: error.message };

      revalidatePath("/admin/bookings");
      revalidatePath("/admin");
      return { success: true, booking: data };
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : "Failed to update booking status." };
    }
  }

  return { success: true, message: `Status updated to ${newStatus} in preview mode.` };
}

export async function addAvailabilityException(input: {
  professional_id: string;
  date: string;
  start_time?: string | null;
  end_time?: string | null;
  reason?: string | null;
}) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("availability_exceptions")
        .insert({
          professional_id: input.professional_id,
          date: input.date,
          start_time: input.start_time || null,
          end_time: input.end_time || null,
          reason: input.reason || null,
        })
        .select()
        .single();

      if (error) return { success: false, error: error.message };

      revalidatePath("/admin/availability");
      return { success: true, exception: data };
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : "Failed to add blocked date." };
    }
  }

  return { success: true, message: "Exception added in preview mode" };
}

export async function deleteAvailabilityException(id: string) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminClient();
      const { error } = await supabase.from("availability_exceptions").delete().eq("id", id);
      if (error) return { success: false, error: error.message };

      revalidatePath("/admin/availability");
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : "Failed to remove blocked date." };
    }
  }

  return { success: true };
}

export async function updateWeeklySchedule(
  professionalId: string,
  schedule: {
    weekday: number;
    start_time: string;
    end_time: string;
    consultation_duration_minutes: number;
    is_active: boolean;
  }[]
) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminClient();

      // Fetch existing rows first so saving works with or without a UNIQUE constraint on (professional_id, weekday)
      const { data: existingRows, error: fetchError } = await supabase
        .from("consultation_availability")
        .select("id, weekday")
        .eq("professional_id", professionalId);

      if (fetchError) {
        return { success: false, error: fetchError.message };
      }

      for (const item of schedule) {
        const matchingIds = (existingRows || [])
          .filter((r) => r.weekday === item.weekday)
          .map((r) => r.id as string);

        if (matchingIds.length > 0) {
          const { error: updateErr } = await supabase
            .from("consultation_availability")
            .update({
              start_time: item.start_time,
              end_time: item.end_time,
              consultation_duration_minutes: item.consultation_duration_minutes,
              is_active: item.is_active,
            })
            .eq("id", matchingIds[0]);

          if (updateErr) {
            return { success: false, error: updateErr.message };
          }

          // Clean up any duplicate rows created before the unique constraint was applied
          if (matchingIds.length > 1) {
            await supabase
              .from("consultation_availability")
              .delete()
              .in("id", matchingIds.slice(1));
          }
        } else {
          const { error: insertErr } = await supabase
            .from("consultation_availability")
            .insert({
              professional_id: professionalId,
              weekday: item.weekday,
              start_time: item.start_time,
              end_time: item.end_time,
              consultation_duration_minutes: item.consultation_duration_minutes,
              mode: "Both",
              is_active: item.is_active,
            });

          if (insertErr) {
            return { success: false, error: insertErr.message };
          }
        }
      }

      revalidatePath("/admin/availability");
      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to update working hours.",
      };
    }
  }

  return { success: true, message: "Schedule updated in preview mode" };
}

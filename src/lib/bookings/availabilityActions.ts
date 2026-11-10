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
    } catch (err: any) {
      return { success: false, error: err.message };
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
    } catch (err: any) {
      return { success: false, error: err.message };
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
    } catch (err: any) {
      return { success: false, error: err.message };
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

      for (const item of schedule) {
        await supabase
          .from("consultation_availability")
          .upsert(
            {
              professional_id: professionalId,
              weekday: item.weekday,
              start_time: item.start_time,
              end_time: item.end_time,
              consultation_duration_minutes: item.consultation_duration_minutes,
              is_active: item.is_active,
            },
            { onConflict: "professional_id,weekday" }
          );
      }

      revalidatePath("/admin/availability");
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  return { success: true, message: "Schedule updated in preview mode" };
}

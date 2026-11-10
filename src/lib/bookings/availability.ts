import { createServerSupabaseClient } from "../supabase/server";
import { isSupabaseConfigured } from "../supabase/client";
import { TimeSlot } from "../supabase/types";
import { SEED_PROFESSIONALS } from "../events/seedData";

export interface ProfessionalOption {
  id: string;
  name: string;
  designation: string;
}

export async function getActiveProfessionals(): Promise<ProfessionalOption[]> {
  if (!isSupabaseConfigured()) {
    return SEED_PROFESSIONALS.filter((p) => p.is_active);
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("professionals")
      .select("id, name, designation")
      .eq("is_active", true)
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) {
      return SEED_PROFESSIONALS.filter((p) => p.is_active);
    }
    return data;
  } catch (err) {
    console.error("Error fetching professionals:", err);
    return SEED_PROFESSIONALS.filter((p) => p.is_active);
  }
}

/**
 * Generate time slots for a given professional on a selected calendar date (YYYY-MM-DD).
 */
export async function getAvailableTimeSlots(
  dateStr: string, // YYYY-MM-DD
  professionalId?: string
): Promise<TimeSlot[]> {
  const targetDate = new Date(`${dateStr}T00:00:00`);
  if (isNaN(targetDate.getTime())) {
    return [];
  }

  // Weekday index (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const weekday = targetDate.getDay();

  // If Sunday (0), clinic is closed for regular routine consultations
  if (weekday === 0) {
    return [];
  }

  const now = new Date();
  const selectedDate = new Date(`${dateStr}T23:59:59`);
  if (selectedDate < now) {
    // Past dates cannot have available slots
    return [];
  }

  let scheduleStart = "09:00:00";
  let scheduleEnd = "18:00:00";
  let durationMinutes = 50;
  let blockedRanges: { start: Date; end: Date }[] = [];

  if (isSupabaseConfigured() && professionalId) {
    try {
      const supabase = await createServerSupabaseClient();

      // 1. Fetch weekly availability rule
      const { data: avail } = await supabase
        .from("consultation_availability")
        .select("*")
        .eq("professional_id", professionalId)
        .eq("weekday", weekday)
        .eq("is_active", true)
        .maybeSingle();

      if (avail) {
        scheduleStart = avail.start_time;
        scheduleEnd = avail.end_time;
        durationMinutes = avail.consultation_duration_minutes || 50;
      }

      // 2. Fetch exceptions (holidays/leaves)
      const { data: exceptions } = await supabase
        .from("availability_exceptions")
        .select("*")
        .eq("professional_id", professionalId)
        .eq("date", dateStr);

      if (exceptions && exceptions.length > 0) {
        for (const exc of exceptions) {
          if (!exc.start_time && !exc.end_time) {
            // Whole day blocked
            return [];
          }
          if (exc.start_time && exc.end_time) {
            blockedRanges.push({
              start: new Date(`${dateStr}T${exc.start_time}`),
              end: new Date(`${dateStr}T${exc.end_time}`),
            });
          }
        }
      }

      // 3. Fetch existing confirmed or pending bookings
      const dayStart = `${dateStr}T00:00:00Z`;
      const dayEnd = `${dateStr}T23:59:59Z`;

      const { data: bookings } = await supabase
        .from("consultation_bookings")
        .select("start_at, end_at, status")
        .eq("professional_id", professionalId)
        .neq("status", "Cancelled")
        .gte("start_at", dayStart)
        .lte("start_at", dayEnd);

      if (bookings) {
        for (const b of bookings) {
          blockedRanges.push({
            start: new Date(b.start_at),
            end: new Date(b.end_at),
          });
        }
      }
    } catch (err) {
      console.error("Error checking Supabase slots:", err);
    }
  }

  // Generate slots throughout the work day
  const slots: TimeSlot[] = [];
  const [startH, startM] = scheduleStart.split(":").map(Number);
  const [endH, endM] = scheduleEnd.split(":").map(Number);

  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  // e.g. 50 mins session + 10 mins buffer = 60 mins step
  const stepMinutes = durationMinutes <= 50 ? 60 : durationMinutes;

  for (let m = startMinutes; m + durationMinutes <= endMinutes; m += stepMinutes) {
    const slotStartH = Math.floor(m / 60);
    const slotStartM = m % 60;
    const slotEndH = Math.floor((m + durationMinutes) / 60);
    const slotEndM = (m + durationMinutes) % 60;

    const pad = (n: number) => String(n).padStart(2, "0");
    const startTimeStr = `${pad(slotStartH)}:${pad(slotStartM)}:00`;
    const endTimeStr = `${pad(slotEndH)}:${pad(slotEndM)}:00`;

    // Asia/Kolkata (+05:30) slot ISO construction
    const slotStartIso = `${dateStr}T${startTimeStr}+05:30`;
    const slotEndIso = `${dateStr}T${endTimeStr}+05:30`;

    const slotStartDate = new Date(slotStartIso);
    const slotEndDate = new Date(slotEndIso);

    // Check if slot has already passed
    let isAvailable = slotStartDate > now;

    // Check if slot collides with any blocked range or booking
    if (isAvailable && blockedRanges.length > 0) {
      const collides = blockedRanges.some((range) => {
        return slotStartDate < range.end && slotEndDate > range.start;
      });
      if (collides) {
        isAvailable = false;
      }
    }

    // Format human-friendly time label: "09:00 AM - 09:50 AM"
    const formatTimeLabel = (h: number, min: number) => {
      const ampm = h >= 12 ? "PM" : "AM";
      const displayH = h % 12 || 12;
      return `${displayH}:${pad(min)} ${ampm}`;
    };

    const timeLabel = `${formatTimeLabel(slotStartH, slotStartM)} – ${formatTimeLabel(
      slotEndH,
      slotEndM
    )}`;

    slots.push({
      start_at: slotStartIso,
      end_at: slotEndIso,
      time_label: timeLabel,
      is_available: isAvailable,
    });
  }

  return slots;
}

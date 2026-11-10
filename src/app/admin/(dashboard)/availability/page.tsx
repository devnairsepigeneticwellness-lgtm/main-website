import React from "react";
import AdminAvailabilityClient from "@/components/admin/AdminAvailabilityClient";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { ConsultationAvailability, AvailabilityException } from "@/lib/supabase/types";
import { SEED_PROFESSIONALS } from "@/lib/events/seedData";
import { connection } from "next/server";

export default async function AdminAvailabilityPage() {
  await connection();
  let professionals = SEED_PROFESSIONALS.map((p) => ({
    id: p.id,
    name: p.name,
    designation: p.designation,
  }));
  let availabilities: ConsultationAvailability[] = [];
  let exceptions: AvailabilityException[] = [];

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerSupabaseClient();

      const { data: profs } = await supabase
        .from("professionals")
        .select("id, name, designation")
        .eq("is_active", true);
      if (profs && profs.length > 0) {
        professionals = profs;
      }

      const { data: avData } = await supabase
        .from("consultation_availability")
        .select("*");
      if (avData) availabilities = avData as ConsultationAvailability[];

      const { data: exData } = await supabase
        .from("availability_exceptions")
        .select("*");
      if (exData) exceptions = exData as AvailabilityException[];
    } catch (err) {
      console.error("Error loading availability from Supabase:", err);
    }
  }

  // Fallback default availability if table is empty
  if (availabilities.length === 0 && professionals.length > 0) {
    const profId = professionals[0].id;
    availabilities = [1, 2, 3, 4, 5, 6].map((day) => ({
      id: `default-avail-${day}`,
      professional_id: profId,
      weekday: day,
      start_time: "09:00:00",
      end_time: "18:00:00",
      consultation_duration_minutes: 50,
      mode: "Both",
      is_active: true,
    }));
  }

  return (
    <AdminAvailabilityClient
      professionals={professionals}
      initialAvailabilities={availabilities}
      initialExceptions={exceptions}
    />
  );
}

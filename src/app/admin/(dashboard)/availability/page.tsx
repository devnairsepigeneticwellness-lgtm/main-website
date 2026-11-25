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
        .eq("is_active", true)
        .order("created_at", { ascending: true });
      if (profs && profs.length > 0) {
        professionals = profs;
      }

      const { data: avData } = await supabase
        .from("consultation_availability")
        .select("*");
      if (avData) availabilities = avData as ConsultationAvailability[];

      const { data: exData } = await supabase
        .from("availability_exceptions")
        .select("*")
        .order("date", { ascending: true });
      if (exData) exceptions = exData as AvailabilityException[];
    } catch (err) {
      console.error("Error loading availability from Supabase:", err);
    }
  }

  return (
    <AdminAvailabilityClient
      professionals={professionals}
      initialAvailabilities={availabilities}
      initialExceptions={exceptions}
    />
  );
}

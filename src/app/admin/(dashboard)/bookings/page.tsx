import React from "react";
import { connection } from "next/server";
import AdminBookingsClient from "@/components/admin/AdminBookingsClient";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { ConsultationBooking } from "@/lib/supabase/types";
import { SEED_PROFESSIONALS } from "@/lib/events/seedData";

interface AdminBookingsPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminBookingsPage({ searchParams }: AdminBookingsPageProps) {
  await connection();
  const resolvedParams = await searchParams;
  const isConnected = isSupabaseConfigured();

  let bookings: ConsultationBooking[] = [];
  let professionalsList = SEED_PROFESSIONALS.map((p) => ({ id: p.id, name: p.name }));

  if (isConnected) {
    try {
      const supabase = await createServerSupabaseClient();

      const { data: profs } = await supabase
        .from("professionals")
        .select("id, name")
        .eq("is_active", true);
      if (profs && profs.length > 0) {
        professionalsList = profs;
      }

      const { data: bData, error } = await supabase
        .from("consultation_bookings")
        .select("*, professionals(name)")
        .order("start_at", { ascending: false });

      if (!error && bData) {
        type BookingRowWithProf = ConsultationBooking & {
          professionals?: { name?: string } | null;
        };
        bookings = (bData as BookingRowWithProf[]).map((item) => ({
          ...item,
          professional_name: item.professionals?.name,
        }));
      }
    } catch (err) {
      console.error("Error loading admin bookings from Supabase:", err);
    }
  } else {
    // Only display sample bookings in Demo Preview Mode (when database is not configured)
    bookings = [
      {
        id: "b-sample-1",
        booking_reference: "NEW-2026-1042",
        client_name: "Aarav Mehra",
        email: "aarav.mehra@example.com",
        phone: "+91 98260 12345",
        professional_id: professionalsList[0]?.id || null,
        service: "Counselling",
        mode: "Online Video Consultation",
        start_at: "2026-11-15T10:00:00+05:30",
        end_at: "2026-11-15T10:50:00+05:30",
        message: "Looking for guidance around career anxiety and emotional pacing.",
        status: "Pending",
        created_at: "2026-11-08T10:00:00Z",
        updated_at: "2026-11-08T10:00:00Z",
        professional_name: professionalsList[0]?.name,
      },
      {
        id: "b-sample-2",
        booking_reference: "NEW-2026-1039",
        client_name: "Sneha Kapur",
        email: "sneha.k@example.com",
        phone: "+91 98930 54321",
        professional_id: professionalsList[1]?.id || null,
        service: "Hypnotherapy",
        mode: "In-Person (Indore Clinic)",
        start_at: "2026-11-16T11:00:00+05:30",
        end_at: "2026-11-16T11:50:00+05:30",
        message: "Chronic insomnia and somatic nervous system stress.",
        status: "Confirmed",
        created_at: "2026-11-08T11:00:00Z",
        updated_at: "2026-11-08T11:00:00Z",
        professional_name: professionalsList[1]?.name,
      },
    ];
  }

  const initialStatus = resolvedParams?.status || "All";

  return (
    <AdminBookingsClient
      key={`${initialStatus}-${bookings.length}`}
      initialBookings={bookings}
      professionalsList={professionalsList}
      initialStatus={initialStatus}
      isPreviewMode={!isConnected}
    />
  );
}

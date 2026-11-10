"use server";

import { consultationBookingSchema, ConsultationBookingInput } from "../validation/booking";
import { isSupabaseConfigured } from "../supabase/client";
import { createAdminClient } from "../supabase/admin";

export interface BookingSubmissionResult {
  success: boolean;
  booking_reference?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
  data?: {
    booking_reference: string;
    client_name: string;
    service: string;
    mode: string;
    start_at: string;
    end_at: string;
    status: string;
  };
}

export async function submitConsultationBooking(
  input: ConsultationBookingInput
): Promise<BookingSubmissionResult> {
  // 1. Zod Validation
  const validation = consultationBookingSchema.safeParse(input);
  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};
    validation.error.issues.forEach((err: any) => {
      const field = err.path.join(".");
      fieldErrors[field] = err.message;
    });
    return {
      success: false,
      error: "Please review the form errors and try again.",
      fieldErrors,
    };
  }

  const data = validation.data;

  // 2. Generate unique human-readable booking reference: e.g. NEW-2026-7842
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const currentYear = new Date().getFullYear();
  const bookingReference = `NEW-${currentYear}-${randomSuffix}`;

  // 3. Database Insertion
  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminClient();

      // Check slot conflict before insert if professional is specified
      if (data.professional_id) {
        const { data: existingConflict, error: conflictErr } = await supabase
          .from("consultation_bookings")
          .select("id")
          .eq("professional_id", data.professional_id)
          .neq("status", "Cancelled")
          .lt("start_at", data.end_at)
          .gt("end_at", data.start_at)
          .maybeSingle();

        if (existingConflict) {
          return {
            success: false,
            error:
              "The requested time slot has just been reserved by another client. Please select an alternate time.",
          };
        }
      }

      const { data: inserted, error: insertError } = await supabase
        .from("consultation_bookings")
        .insert({
          booking_reference: bookingReference,
          client_name: data.client_name,
          email: data.email,
          phone: data.phone,
          professional_id: data.professional_id || null,
          service: data.service,
          mode: data.mode,
          start_at: data.start_at,
          end_at: data.end_at,
          message: data.message || null,
          status: "Pending",
        })
        .select()
        .single();

      if (insertError) {
        console.error("Supabase booking insert error:", insertError);
        return {
          success: false,
          error: "Failed to save booking. Please contact our helpline directly.",
        };
      }

      return {
        success: true,
        booking_reference: bookingReference,
        data: {
          booking_reference: bookingReference,
          client_name: data.client_name,
          service: data.service,
          mode: data.mode,
          start_at: data.start_at,
          end_at: data.end_at,
          status: "Pending",
        },
      };
    } catch (err) {
      console.error("Database connection exception during booking:", err);
      return {
        success: false,
        error: "A database error occurred. Please try again shortly.",
      };
    }
  }

  // Graceful fallback for local development before Supabase keys are entered
  console.log("Mock booking created:", {
    reference: bookingReference,
    client: data.client_name,
    service: data.service,
    mode: data.mode,
    time: data.start_at,
  });

  return {
    success: true,
    booking_reference: bookingReference,
    data: {
      booking_reference: bookingReference,
      client_name: data.client_name,
      service: data.service,
      mode: data.mode,
      start_at: data.start_at,
      end_at: data.end_at,
      status: "Pending",
    },
  };
}

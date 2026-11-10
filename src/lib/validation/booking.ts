import { z } from "zod";

export const consultationBookingSchema = z.object({
  client_name: z
    .string()
    .min(2, { message: "Please enter your full name (minimum 2 characters)" })
    .max(100),
  email: z
    .string()
    .email({ message: "Please provide a valid email address" }),
  phone: z
    .string()
    .min(8, { message: "Please provide a valid contact number (minimum 8 digits)" })
    .max(20),
  service: z.string().min(1, { message: "Please select a consultation service" }),
  professional_id: z.string().nullable().optional(),
  mode: z.enum([
    "Online Video Consultation",
    "In-Person (Indore Clinic)",
    "Phone Call",
  ]),
  start_at: z.string().datetime({ offset: true, message: "Please select an available start time" }),
  end_at: z.string().datetime({ offset: true, message: "Please select an available end time" }),
  message: z.string().max(1000).optional().nullable(),
  privacy_consent: z.boolean().refine((val) => val === true, {
    message: "You must accept the confidentiality and privacy policy",
  }),
});

export type ConsultationBookingInput = z.infer<typeof consultationBookingSchema>;

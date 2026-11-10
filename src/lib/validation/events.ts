import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must consist of lowercase letters, numbers, and hyphens only",
    }),
  short_description: z.string().max(300).optional().nullable(),
  description: z.string().optional().nullable(),
  category: z.string().min(2, { message: "Please specify a category" }),
  start_at: z.string().datetime({ offset: true, message: "Valid start datetime required" }),
  end_at: z.string().datetime({ offset: true, message: "Valid end datetime required" }),
  timezone: z.string().default("Asia/Kolkata"),
  mode: z.enum(["Online", "In-Person", "Hybrid"]),
  venue: z.string().optional().nullable(),
  speaker_name: z.string().optional().nullable(),
  poster_path: z.string().optional().nullable(),
  registration_url: z.string().url().optional().or(z.literal("")).nullable(),
  registration_button_text: z.string().default("Register Now"),
  registration_status: z.enum(["Open", "Closed", "Sold Out", "Invite Only"]).default("Open"),
  is_published: z.boolean().default(false),
  is_archived: z.boolean().default(false),
  is_cancelled: z.boolean().default(false),
});

export type EventInput = z.infer<typeof eventSchema>;

export const historicalEventSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  slug: z.string().min(3).optional(),
  original_date: z.string().min(10, { message: "Valid original date required (YYYY-MM-DD)" }),
  category: z.string().min(2, { message: "Please specify a category" }),
  description: z.string().optional().nullable(),
  venue: z.string().optional().nullable(),
  speaker_name: z.string().optional().nullable(),
  poster_path: z.string().optional().nullable(),
  is_published: z.boolean().default(true),
});

export type HistoricalEventInput = z.infer<typeof historicalEventSchema>;

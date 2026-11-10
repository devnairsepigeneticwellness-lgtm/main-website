export type EventMode = "Online" | "In-Person" | "Hybrid";
export type RegistrationStatus = "Open" | "Closed" | "Sold Out" | "Invite Only";
export type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed";
export type AvailabilityMode = "Online" | "In-Person" | "Both";
export type UserRole = "admin" | "staff" | "superadmin";

export interface Event {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  category: string;
  start_at: string;
  end_at: string;
  timezone: string;
  mode: EventMode;
  venue: string | null;
  speaker_name: string | null;
  poster_path: string | null;
  registration_url: string | null;
  registration_button_text: string;
  registration_status: RegistrationStatus;
  is_published: boolean;
  is_archived: boolean;
  is_cancelled: boolean;
  created_at: string;
  updated_at: string;
  // Computed or joined
  gallery_count?: number;
  gallery_images?: GalleryImage[];
}

export interface GalleryImage {
  id: string;
  event_id: string | null;
  image_path: string;
  caption: string | null;
  category: string | null;
  sort_order: number;
  is_cover: boolean;
  is_published: boolean;
  created_at: string;
  // Joined
  event_title?: string;
}

export interface Professional {
  id: string;
  name: string;
  designation: string;
  is_active: boolean;
  created_at: string;
}

export interface ConsultationAvailability {
  id: string;
  professional_id: string;
  weekday: number; // 0=Sunday, 1=Monday, ..., 6=Saturday
  start_time: string; // HH:mm:ss
  end_time: string; // HH:mm:ss
  consultation_duration_minutes: number;
  mode: AvailabilityMode;
  is_active: boolean;
}

export interface AvailabilityException {
  id: string;
  professional_id: string;
  date: string; // YYYY-MM-DD
  start_time: string | null;
  end_time: string | null;
  reason: string | null;
  created_at: string;
}

export interface ConsultationBooking {
  id: string;
  booking_reference: string;
  client_name: string;
  email: string;
  phone: string;
  professional_id: string | null;
  service: string;
  mode: string;
  start_at: string;
  end_at: string;
  message: string | null;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
  // Joined
  professional_name?: string;
}

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  created_at: string;
}

export interface TimeSlot {
  start_at: string; // ISO string
  end_at: string; // ISO string
  time_label: string; // e.g. "10:00 AM - 10:50 AM"
  is_available: boolean;
}

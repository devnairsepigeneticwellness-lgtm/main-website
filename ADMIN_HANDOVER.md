# Nair's Epigenetic Wellness (N.E.W.)
## Workshops, Events & Gallery System + Supabase Consultation Booking Engine
### Administrator Handover & Operations Guide

---

## 1. System Overview

This system provides a full-stack, production-ready solution for managing:
1. **Public Workshops & Events Page (`/events`)**: Dynamic upcoming and completed event listings with mode filters, search, and direct detail pages (`/events/[slug]`).
2. **Interactive Photo Gallery (`/events#gallery`)**: Responsive masonry showcase with high-resolution lightbox, category filtering, captions, and keyboard navigation.
3. **Dedicated Consultation Booking System (`/book-consultation`)**: 50-minute slot calendar, service selection, professional choice, contact intake, and unique reference codes (`NEW-YYYY-XXXX`).
4. **Secure Admin Console (`/admin`)**: A centralized management interface for non-technical administrators to manage events, historical workshops, photo galleries, professional working hours, and client bookings.

---

## 2. Supabase Database & Storage Setup

The system is designed to run seamlessly with Supabase PostgreSQL, Authentication, and Storage.

### Step 2.1 — Run Database Migration

In your Supabase project dashboard:
1. Open the **SQL Editor**.
2. Click **New Query**.
3. Copy and paste the entire contents of `supabase/migrations/20261109000000_create_events_and_bookings.sql`.
4. Click **Run**.

This migration automatically sets up:
- `profiles`: Admin accounts linked to Supabase Auth (`auth.users`).
- `professionals`: Clinical practitioners (Ajit Kumar Nair, Dr. Deepa Jain, Zainab Arsiwala, Bhavya Singh).
- `events`: Upcoming, draft, and completed historical workshops with slug indexing and status tracking.
- `gallery_images`: Photo metadata, captions, categories, and cover image flags.
- `consultation_availability`: Weekly working hours, appointment duration (50 mins), and consultation modes.
- `availability_exceptions`: Date-specific blocks and public holidays.
- `consultation_bookings`: Confidential client intake requests with overlap exclusion constraints (`btree_gist`).
- Storage bucket `events` with public read access and admin-only upload/delete policies.
- Initial seed data for immediate testing.

### Step 2.2 — Configure Environment Variables

Create or update `.env.local` in your project root:

```env
# Supabase Project Configuration (Project Settings -> API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...

# Server-Side Administrative Key (Project Settings -> API -> service_role secret)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...

# Email Notifications
CONTACT_EMAIL_RECIPIENT=ajit.navy@gmail.com
```

### Step 2.3 — Create Your Administrator User

1. Go to **Authentication -> Users** in your Supabase dashboard.
2. Click **Add User** -> **Create User**.
3. Enter your administrator email and a secure password.
4. Insert a matching profile record into `public.profiles`:
   ```sql
   INSERT INTO public.profiles (id, full_name, role)
   VALUES ('<USER-UUID-FROM-AUTH>', 'Ajit Kumar Nair', 'admin');
   ```
5. Log in at `https://your-domain.com/admin/login`.

---

## 3. Administrator Workflows

### 3.1 Creating an Upcoming Event
1. Go to **Admin Console -> Add New Event** (`/admin/events/new`).
2. Fill in:
   - **Event Title**: The public name (e.g., *Suicide Prevention & Crisis Sensitisation Intensive*).
   - **Slug**: Automatically generated from title; can be customized.
   - **Category**: E.g., *Crisis Intervention*, *Relational Skills*, *Clinical Training*.
   - **Short Description**: 1–2 sentences for card previews.
   - **Full Description**: Detailed syllabus, agenda, and takeaways.
   - **Date & Times**: Event date, start time, and end time.
   - **Mode**: *In-Person (Offline)*, *Online*, or *Hybrid*.
   - **Venue**: Physical venue address or online webinar link.
   - **Facilitator**: E.g., *Ajit Kumar Nair*.
   - **Poster Image**: Enter image URL or upload to Supabase Storage.
   - **Registration URL**: External link (e.g. Google Forms) or leave blank for internal booking.
   - **Registration Status**: *Open*, *Closed*, *Sold Out*, or *Invite Only*.
3. Choose **Publish Immediately** or click **Save as Draft**.

### 3.2 Adding a Historical / Previous Workshop
1. Go to **Admin Console -> + Add Previous Event** (`/admin/events/new/previous`).
2. Enter the **Original Date Conducted** (past dates are fully supported).
3. Provide the workshop title, host institution, and summary.
4. Add the cover photograph and multiple gallery photos with captions.
5. Click **Save Previous Event**.
6. The workshop is automatically classified as **Completed** and displayed in the public archive.

### 3.3 Uploading Photos After an Event Takes Place
1. Go to **Admin Console -> Manage Events** (`/admin/events`).
2. Click the **Camera icon** next to the completed event, or navigate to `/admin/events/[id]/gallery`.
3. Drag and drop multiple photos into the upload box (or paste image URLs).
4. For each photo:
   - Add a descriptive caption.
   - Set as **Cover Photo** if desired.
   - Toggle visibility (**Publish / Hide**).
5. Uploaded photographs immediately appear under **"Highlights From This Workshop"** on the event's public page and in the main gallery.

### 3.4 Managing Consultation Working Hours & Holidays
1. Go to **Admin Console -> Availability Settings** (`/admin/availability`).
2. Select the practitioner from the dropdown.
3. Configure the active weekdays (Monday through Saturday), daily working hours (e.g. 09:00 to 18:00), and consultation duration (50 minutes).
4. Click **Save Working Hours**.
5. To block a holiday or leave, use **+ Block a Specific Date / Time** and provide a reason (e.g. *Annual Clinic Recess*).

### 3.5 Processing Consultation Requests
1. Go to **Admin Console -> Consultation Bookings** (`/admin/bookings`).
2. Review incoming requests with status **Pending**.
3. Click the **Eye icon** to view the client's contact details, selected service, format, and personal message.
4. Click **Confirm** to lock in the appointment and coordinate with the client.
5. After the session is conducted, click **Completed**.

---

## 4. Security & Data Protection Highlights

- **Row Level Security (RLS)**: Public visitors can only view published events and gallery images.
- **Client Privacy**: Consultation booking requests are completely hidden from public queries. Only authenticated administrators can inspect client contact numbers and messages.
- **Double-Booking Prevention**: The database uses PostgreSQL exclusion constraints (`EXCLUDE USING gist`) to guarantee that two clients cannot confirm overlapping time slots for the same practitioner.
- **Timezone Awareness**: All schedule calculations and event times are handled in **Asia/Kolkata (IST, UTC+5:30)**.

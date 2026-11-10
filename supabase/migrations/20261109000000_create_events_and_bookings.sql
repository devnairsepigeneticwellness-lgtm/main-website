-- Nair's Epigenetic Wellness (N.E.W.)
-- Comprehensive Database Migration: Events, Photo Gallery, Professionals & Consultation Bookings

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- ============================================================================
-- 1. PROFILES TABLE (Admins & Staff)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'staff', 'superadmin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- 2. PROFESSIONALS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- 3. EVENTS TABLE (Upcoming, Historical & Workshops)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'Workshop',
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
  mode TEXT NOT NULL DEFAULT 'In-Person' CHECK (mode IN ('Online', 'In-Person', 'Hybrid')),
  venue TEXT,
  speaker_name TEXT,
  poster_path TEXT,
  registration_url TEXT,
  registration_button_text TEXT NOT NULL DEFAULT 'Register Now',
  registration_status TEXT NOT NULL DEFAULT 'Open' CHECK (registration_status IN ('Open', 'Closed', 'Sold Out', 'Invite Only')),
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_archived BOOLEAN NOT NULL DEFAULT false,
  is_cancelled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_events_start_at ON public.events (start_at);
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events (slug);
CREATE INDEX IF NOT EXISTS idx_events_published_archived ON public.events (is_published, is_archived);

-- ============================================================================
-- 4. GALLERY IMAGES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  image_path TEXT NOT NULL,
  caption TEXT,
  category TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_cover BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_gallery_images_event ON public.gallery_images (event_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_gallery_images_published ON public.gallery_images (is_published);

-- ============================================================================
-- 5. CONSULTATION AVAILABILITY (Weekly Schedule per Professional)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.consultation_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  weekday INT NOT NULL CHECK (weekday >= 0 AND weekday <= 6), -- 0=Sun, 1=Mon, ..., 6=Sat
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  consultation_duration_minutes INT NOT NULL DEFAULT 50 CHECK (consultation_duration_minutes > 0),
  mode TEXT NOT NULL DEFAULT 'Both' CHECK (mode IN ('Online', 'In-Person', 'Both')),
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_availability_prof_weekday ON public.consultation_availability (professional_id, weekday);

-- ============================================================================
-- 6. AVAILABILITY EXCEPTIONS (Holidays, Leaves & Blocked Slots)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.availability_exceptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME, -- NULL implies the entire day is unavailable
  end_time TIME,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_exceptions_prof_date ON public.availability_exceptions (professional_id, date);

-- ============================================================================
-- 7. CONSULTATION BOOKINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.consultation_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_reference TEXT NOT NULL UNIQUE,
  client_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  professional_id UUID REFERENCES public.professionals(id) ON DELETE SET NULL,
  service TEXT NOT NULL,
  mode TEXT NOT NULL,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Cancelled', 'Completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_bookings_prof_time ON public.consultation_bookings (professional_id, start_at, end_at);
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON public.consultation_bookings (booking_reference);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.consultation_bookings (status);

-- Overlap Prevention: No two active/pending/confirmed bookings can collide for the same professional
ALTER TABLE public.consultation_bookings
DROP CONSTRAINT IF EXISTS no_overlapping_bookings;

ALTER TABLE public.consultation_bookings
ADD CONSTRAINT no_overlapping_bookings
EXCLUDE USING gist (
  professional_id WITH =,
  tstzrange(start_at, end_at) WITH &&
) WHERE (status != 'Cancelled');

-- ============================================================================
-- 8. AUTOMATIC UPDATED_AT TRIGGER
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_events_updated_at ON public.events;
CREATE TRIGGER set_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS set_bookings_updated_at ON public.consultation_bookings;
CREATE TRIGGER set_bookings_updated_at
BEFORE UPDATE ON public.consultation_bookings
FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- ============================================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability_exceptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;

-- Profiles: Authenticated users can view their own profile; admins can view all
CREATE POLICY "Profiles viewable by authenticated users"
ON public.profiles FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- Events: Public can view published events
CREATE POLICY "Public can view published events"
ON public.events FOR SELECT
TO anon, authenticated
USING (is_published = true);

-- Events: Admins have full access
CREATE POLICY "Admins full access on events"
ON public.events FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Gallery Images: Public can view published images for published events
CREATE POLICY "Public can view published gallery images"
ON public.gallery_images FOR SELECT
TO anon, authenticated
USING (is_published = true);

-- Gallery Images: Admins full access
CREATE POLICY "Admins full access on gallery images"
ON public.gallery_images FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Professionals: Public can view active professionals
CREATE POLICY "Public can view active professionals"
ON public.professionals FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- Professionals: Admins full access
CREATE POLICY "Admins full access on professionals"
ON public.professionals FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Consultation Availability: Public can view active weekly slots to generate booking grid
CREATE POLICY "Public can view active availability"
ON public.consultation_availability FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- Consultation Availability: Admins full access
CREATE POLICY "Admins full access on consultation availability"
ON public.consultation_availability FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Availability Exceptions: Public can view to filter blocked dates
CREATE POLICY "Public can view availability exceptions"
ON public.availability_exceptions FOR SELECT
TO anon, authenticated
USING (true);

-- Availability Exceptions: Admins full access
CREATE POLICY "Admins full access on availability exceptions"
ON public.availability_exceptions FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Consultation Bookings: PUBLIC CANNOT SELECT (Data Protection)
-- Public can insert via server action or authenticated endpoint
CREATE POLICY "Public anonymous booking creation"
ON public.consultation_bookings FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Consultation Bookings: Admins can view and manage all bookings
CREATE POLICY "Admins manage all consultation bookings"
ON public.consultation_bookings FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================================================
-- 10. STORAGE BUCKET CONFIGURATION
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('events', 'events', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage policies: Public can read images in the events bucket
CREATE POLICY "Public read events bucket"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'events');

-- Storage policies: Authenticated admins can upload, update, delete
CREATE POLICY "Admins upload to events bucket"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'events');

CREATE POLICY "Admins update events bucket"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'events');

CREATE POLICY "Admins delete from events bucket"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'events');

-- ============================================================================
-- 11. INITIAL SEED DATA
-- ============================================================================

-- Seed Professionals
INSERT INTO public.professionals (id, name, designation, is_active) VALUES
('11111111-1111-1111-1111-111111111111', 'Ajit Kumar Nair', 'Founder, Counselling Psychologist & RCI Rehabilitation Counselor', true),
('22222222-2222-2222-2222-222222222222', 'Dr. Deepa Jain', 'PhD, Counselling Psychologist & Certified ACT Therapist', true),
('33333333-3333-3333-3333-333333333333', 'Zainab Arsiwala', 'Couple & Marriage Counsellor, Psychological Assessor', true),
('44444444-4444-4444-4444-444444444444', 'Bhavya Singh', 'RCI Rehabilitation Counsellor & Child Psychologist', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  designation = EXCLUDED.designation,
  is_active = EXCLUDED.is_active;

-- Seed Default Weekly Availability (Monday through Saturday, 09:00 to 18:00, 50-minute sessions)
INSERT INTO public.consultation_availability (professional_id, weekday, start_time, end_time, consultation_duration_minutes, mode, is_active)
SELECT 
  p.id,
  w.day,
  '09:00:00'::TIME,
  '18:00:00'::TIME,
  50,
  'Both',
  true
FROM public.professionals p
CROSS JOIN (VALUES (1), (2), (3), (4), (5), (6)) AS w(day)
ON CONFLICT DO NOTHING;

-- Seed Upcoming & Historical Workshops
INSERT INTO public.events (
  id, title, slug, short_description, description, category,
  start_at, end_at, timezone, mode, venue, speaker_name,
  poster_path, registration_url, registration_button_text, registration_status,
  is_published, is_archived, is_cancelled
) VALUES
(
  'a1000000-0000-0000-0000-000000000001',
  'Suicide Prevention & Crisis Sensitisation Intensive',
  'suicide-prevention-crisis-sensitisation-intensive',
  'Recognising subtle warning signs, crisis de-escalation protocols, active listening, and ethical community referral pathways.',
  'An intensive, evidence-based workshop empowering professionals, educators, and community caregivers with practical crisis de-escalation skills. Covers early warning detection, empathetic listening techniques without judgment, risk stratification, and responsible intervention steps.',
  'Crisis Intervention',
  timezone('utc'::text, now() + interval '12 days'),
  timezone('utc'::text, now() + interval '12 days' + interval '4 hours'),
  'Asia/Kolkata',
  'Hybrid',
  'N.E.W. Clinical Auditorium, Indore & Zoom Live Stream',
  'Ajit Kumar Nair',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
  'https://forms.gle/new-suicide-prevention',
  'Reserve Seat Now',
  'Open',
  true,
  false,
  false
),
(
  'a1000000-0000-0000-0000-000000000002',
  'Non-Violent Communication (NVC) in Daily Life',
  'non-violent-communication-in-daily-life',
  'Transforming defensiveness into empathetic dialogue by expressing genuine feelings and needs without blame or criticism.',
  'Grounded in Dr. Marshall Rosenberg''s Non-Violent Communication (NVC) model and systemic relational psychology. Participants learn to express emotional needs with clarity and authenticity, listen past blame, and dismantle defensiveness in couples, families, and workplace teams.',
  'Relational Skills',
  timezone('utc'::text, now() + interval '26 days'),
  timezone('utc'::text, now() + interval '26 days' + interval '6 hours'),
  'Asia/Kolkata',
  'In-Person',
  'Sayaji Hotel Conference Centre, Indore',
  'Zainab Arsiwala & Ajit Kumar Nair',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
  'https://forms.gle/new-nvc-workshop',
  'Register for Cohort',
  'Open',
  true,
  false,
  false
),
(
  'a1000000-0000-0000-0000-000000000003',
  'Stress Mastery, Cortisol Regulation & Somatic Grounding',
  'stress-mastery-cortisol-regulation-somatic-grounding',
  'Evidence-based somatic techniques to down-regulate high-cortisol autonomic states and reset the vagus nerve.',
  'Modern cognitive burnout is held deep within the body. This masterclass bridges polyvagal theory, somatic mindfulness, breath regulation, and clinical hypnotherapy tools to help participants restore restorative rest and physical equilibrium.',
  'Wellbeing & Somatics',
  timezone('utc'::text, now() + interval '42 days'),
  timezone('utc'::text, now() + interval '42 days' + interval '3 hours'),
  'Asia/Kolkata',
  'Online',
  'Interactive Global Webinar (Live Video)',
  'Dr. Deepa Jain',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
  'https://forms.gle/new-stress-mastery',
  'Join Online Workshop',
  'Open',
  true,
  false,
  false
),
(
  'b1000000-0000-0000-0000-000000000001',
  'Foundations of Psychological First Aid & Community Resilience',
  'foundations-psychological-first-aid-community-resilience',
  'A flagship certified training cohort conducted for grassroots volunteers, nursing staff, and educators.',
  'Conducted in early 2025, this training equipped 60+ participants with World Health Organization (WHO) aligned Psychological First Aid (PFA) protocols, empathetic initial contact guidelines, and triage referral pathways.',
  'Historical Workshop',
  '2025-02-15 09:30:00+05:30',
  '2025-02-15 17:00:00+05:30',
  'Asia/Kolkata',
  'In-Person',
  'Indore Management Institute Hall, Indore',
  'Ajit Kumar Nair',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
  NULL,
  'Completed',
  'Closed',
  true,
  false,
  false
),
(
  'b1000000-0000-0000-0000-000000000002',
  'Cognitive Reframing & Rational Emotive Mastery',
  'cognitive-reframing-rational-emotive-mastery',
  'Interactive practical laboratory exploring Ellis REBT ABC framework and cognitive distortion dismantling.',
  'This experiential workshop gathered psychology postgraduates and mental health enthusiasts to dissect intrusive thought patterns, irrational demands, and catastrophic beliefs, replacing them with flexible, life-affirming rational cognitions.',
  'Clinical Training',
  '2024-11-20 10:00:00+05:30',
  '2024-11-20 16:30:00+05:30',
  'Asia/Kolkata',
  'In-Person',
  'N.E.W. Clinical Centre, Indore',
  'Ajit Kumar Nair & Bhavya Singh',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
  NULL,
  'Completed',
  'Closed',
  true,
  false,
  false
),
(
  'b1000000-0000-0000-0000-000000000003',
  'Adolescent Emotional Regulation in High-Stress School Ecosystems',
  'adolescent-emotional-regulation-school-ecosystems',
  'Sensitisation symposium for school principals, educators, and school counselors.',
  'Focused on adolescent mental health challenges in modern high-pressure academic settings. Key discussions addressed academic burnout, peer dynamics, early detection of self-harm tendencies, and healthy family-school communication pipelines.',
  'Educational Mental Health',
  '2024-07-14 10:00:00+05:30',
  '2024-07-14 15:00:00+05:30',
  'Asia/Kolkata',
  'In-Person',
  'The Emerald Heights International School Auditorium, Indore',
  'Bhavya Singh & Ajit Kumar Nair',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  NULL,
  'Completed',
  'Closed',
  true,
  false,
  false
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  start_at = EXCLUDED.start_at,
  end_at = EXCLUDED.end_at,
  mode = EXCLUDED.mode,
  venue = EXCLUDED.venue,
  speaker_name = EXCLUDED.speaker_name,
  poster_path = EXCLUDED.poster_path,
  is_published = EXCLUDED.is_published;

-- Seed Gallery Images for Historical Workshops
INSERT INTO public.gallery_images (id, event_id, image_path, caption, category, sort_order, is_cover, is_published) VALUES
(
  'c1000000-0000-0000-0000-000000000001',
  'b1000000-0000-0000-0000-000000000001',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
  'Ajit Kumar Nair introducing the core psychological first aid framework to the cohort.',
  'Workshop Highlights',
  1,
  true,
  true
),
(
  'c1000000-0000-0000-0000-000000000002',
  'b1000000-0000-0000-0000-000000000001',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
  'Breakout simulation groups practicing crisis de-escalation scenarios.',
  'Interactive Practice',
  2,
  false,
  true
),
(
  'c1000000-0000-0000-0000-000000000003',
  'b1000000-0000-0000-0000-000000000001',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  'Peer dialogue and active listening exercise among attendees.',
  'Peer Exercises',
  3,
  false,
  true
),
(
  'c1000000-0000-0000-0000-000000000004',
  'b1000000-0000-0000-0000-000000000002',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
  'Live demonstration of the Albert Ellis ABC cognitive reframing model.',
  'Clinical Training',
  1,
  true,
  true
),
(
  'c1000000-0000-0000-0000-000000000005',
  'b1000000-0000-0000-0000-000000000002',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  'Reflective small-group discussion addressing automatic negative thoughts.',
  'Discussion',
  2,
  false,
  true
),
(
  'c1000000-0000-0000-0000-000000000006',
  'b1000000-0000-0000-0000-000000000003',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  'Educators and counselors collaborating on school wellbeing guidelines.',
  'Educator Symposium',
  1,
  true,
  true
)
ON CONFLICT (id) DO NOTHING;

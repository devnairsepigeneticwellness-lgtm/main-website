import { Event, GalleryImage, Professional } from "../supabase/types";

export const SEED_PROFESSIONALS: Professional[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "Ajit Kumar Nair",
    designation: "Founder, Counselling Psychologist & RCI Rehabilitation Counselor",
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "Dr. Deepa Jain",
    designation: "PhD, Counselling Psychologist & Certified ACT Therapist",
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    name: "Zainab Aarsiwala",
    designation: "Couple & Marriage Counsellor, Psychological Assessor",
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    name: "Bhavya Singh",
    designation: "RCI Rehabilitation Counsellor & Child Psychologist",
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
];

// Reference future dates relative to current local time (Nov 2026)
export const SEED_EVENTS: Event[] = [
  {
    id: "a1000000-0000-0000-0000-000000000001",
    title: "Suicide Prevention & Crisis Sensitisation Intensive",
    slug: "suicide-prevention-crisis-sensitisation-intensive",
    short_description:
      "Recognising subtle warning signs, crisis de-escalation protocols, active listening, and ethical community referral pathways.",
    description:
      "An intensive, evidence-based workshop empowering professionals, educators, and community caregivers with practical crisis de-escalation skills. Covers early warning detection, empathetic listening techniques without judgment, risk stratification, and responsible intervention steps.",
    category: "Crisis Intervention",
    start_at: "2026-11-22T10:00:00+05:30",
    end_at: "2026-11-22T14:00:00+05:30",
    timezone: "Asia/Kolkata",
    mode: "Hybrid",
    venue: "N.E.W. Clinical Auditorium, Indore & Zoom Live Stream",
    speaker_name: "Ajit Kumar Nair",
    poster_path:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    registration_url: "https://forms.gle/new-suicide-prevention",
    registration_button_text: "Reserve Seat Now",
    registration_status: "Open",
    is_published: true,
    is_archived: false,
    is_cancelled: false,
    created_at: "2026-10-01T10:00:00Z",
    updated_at: "2026-10-01T10:00:00Z",
    gallery_count: 0,
  },
  {
    id: "a1000000-0000-0000-0000-000000000002",
    title: "Non-Violent Communication (NVC) in Daily Life",
    slug: "non-violent-communication-in-daily-life",
    short_description:
      "Transforming defensiveness into empathetic dialogue by expressing genuine feelings and needs without blame or criticism.",
    description:
      "Grounded in Dr. Marshall Rosenberg's Non-Violent Communication (NVC) model and systemic relational psychology. Participants learn to express emotional needs with clarity and authenticity, listen past blame, and dismantle defensiveness in couples, families, and workplace teams.",
    category: "Relational Skills",
    start_at: "2026-12-05T10:00:00+05:30",
    end_at: "2026-12-05T16:00:00+05:30",
    timezone: "Asia/Kolkata",
    mode: "In-Person",
    venue: "Sayaji Hotel Conference Centre, Indore",
    speaker_name: "Zainab Aarsiwala & Ajit Kumar Nair",
    poster_path:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    registration_url: "https://forms.gle/new-nvc-workshop",
    registration_button_text: "Register for Cohort",
    registration_status: "Open",
    is_published: true,
    is_archived: false,
    is_cancelled: false,
    created_at: "2026-10-05T10:00:00Z",
    updated_at: "2026-10-05T10:00:00Z",
    gallery_count: 0,
  },
  {
    id: "a1000000-0000-0000-0000-000000000003",
    title: "Stress Mastery, Cortisol Regulation & Somatic Grounding",
    slug: "stress-mastery-cortisol-regulation-somatic-grounding",
    short_description:
      "Evidence-based somatic techniques to down-regulate high-cortisol autonomic states and reset the vagus nerve.",
    description:
      "Modern cognitive burnout is held deep within the body. This masterclass bridges polyvagal theory, somatic mindfulness, breath regulation, and clinical hypnotherapy tools to help participants restore restorative rest and physical equilibrium.",
    category: "Wellbeing & Somatics",
    start_at: "2026-12-20T11:00:00+05:30",
    end_at: "2026-12-20T14:00:00+05:30",
    timezone: "Asia/Kolkata",
    mode: "Online",
    venue: "Interactive Global Webinar (Live Video)",
    speaker_name: "Dr. Deepa Jain",
    poster_path:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    registration_url: "https://forms.gle/new-stress-mastery",
    registration_button_text: "Join Online Workshop",
    registration_status: "Open",
    is_published: true,
    is_archived: false,
    is_cancelled: false,
    created_at: "2026-10-10T10:00:00Z",
    updated_at: "2026-10-10T10:00:00Z",
    gallery_count: 0,
  },
  // Historical Workshops conducted in past years
  {
    id: "b1000000-0000-0000-0000-000000000001",
    title: "Educational Ecosystem Empowerment: Manifesting Academic Excellence Through Mindfulness",
    slug: "educational-ecosystem-empowerment-sendhwa-schools",
    short_description:
      "A 1.5-hour interactive workshop for 10th, 11th, and 12th-grade students at Vidhyakunj International School and Lions Convent Higher Secondary School, Sendhwa.",
    description:
      "Nair's Epigenetic Wellness conducted a 1.5-hour interactive workshop for 10th, 11th, and 12th-grade students themed \"Unlocking Your Highest Potential: Manifesting Academic Excellence Through Mindfulness\" across two schools in Sendhwa: Vidhyakunj International School and Lions Convent Higher Secondary School. The session introduced practical mindfulness and mental focus techniques to help students reduce academic pressure, clarify their goals, boost inner motivation, and build lasting emotional balance.",
    category: "Educational Ecosystem Empowerment",
    start_at: "2025-02-15T09:30:00+05:30",
    end_at: "2025-02-15T11:00:00+05:30",
    timezone: "Asia/Kolkata",
    mode: "In-Person",
    venue: "Vidhyakunj International School & Lions Convent Higher Secondary School, Sendhwa",
    speaker_name: "Ajit Kumar Nair & Team",
    poster_path:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    registration_url: null,
    registration_button_text: "Completed",
    registration_status: "Closed",
    is_published: true,
    is_archived: false,
    is_cancelled: false,
    created_at: "2025-02-01T10:00:00Z",
    updated_at: "2025-02-16T18:00:00Z",
    gallery_count: 3,
  },
  {
    id: "b1000000-0000-0000-0000-000000000002",
    title: "Empowering Educators: Safeguarding Young Minds — Suicide Prevention & Gatekeeper Training",
    slug: "suicide-prevention-gatekeeper-training-educators-sendhwa",
    short_description:
      "A CBSE-aligned, free-of-cost outreach workshop equipping educators in Sendhwa with Psychological First Aid and the Gatekeeper Model.",
    description:
      "Under the banner of Nair's Epigenetic Wellness, our team conducted a CBSE-aligned \"Empowering Educators: Safeguarding Young Minds - Suicide Prevention & Gatekeeper Training Workshop\" for teachers across two schools in Sendhwa: Vidhyakunj International School and Lions Convent Higher Secondary School. Designed to build safer and more resilient school communities, this free-of-cost outreach program equipped educators with essential skills to identify early warning signs of student distress and administer Psychological First Aid. Through practical modules on the Gatekeeper Model and actionable referral pathways, teachers were empowered to respond effectively to crises while fulfilling mandatory CBSE staff training guidelines.",
    category: "Suicide Prevention & Educator Training",
    start_at: "2024-11-20T10:00:00+05:30",
    end_at: "2024-11-20T16:30:00+05:30",
    timezone: "Asia/Kolkata",
    mode: "In-Person",
    venue: "Vidhyakunj International School & Lions Convent Higher Secondary School, Sendhwa",
    speaker_name: "Ajit Kumar Nair & Team",
    poster_path:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    registration_url: null,
    registration_button_text: "Completed",
    registration_status: "Closed",
    is_published: true,
    is_archived: false,
    is_cancelled: false,
    created_at: "2024-11-01T10:00:00Z",
    updated_at: "2024-11-21T18:00:00Z",
    gallery_count: 2,
  },
  {
    id: "b1000000-0000-0000-0000-000000000003",
    title: "Level 1 Clinical Hypnotherapy Workshop for Psychology Interns",
    slug: "level-1-clinical-hypnotherapy-workshop-psychology-interns",
    short_description:
      "Accredited by the California Hypnosis Institute and led by Mr. Ajit Kumar Nair for psychologists, counselors, and healthcare professionals.",
    description:
      "Empower Your Practice with the California Hypnosis Institute: Led and facilitated by Mr. Ajit Kumar Nair, founder of Nair's Epigenetic Wellness, this comprehensive Level 1 Clinical Hypnotherapy certification program is accredited by the California Hypnosis Institute. The workshop explores the foundational science and practical techniques of clinical hypnotherapy, equipping psychologists, counselors, and healthcare professionals with actionable tools for subconscious exploration, stress and anxiety management, and behavioral transformation.",
    category: "Clinical Hypnotherapy Certification",
    start_at: "2024-07-14T10:00:00+05:30",
    end_at: "2024-07-14T17:00:00+05:30",
    timezone: "Asia/Kolkata",
    mode: "In-Person",
    venue: "Indore Clinical Training Centre",
    speaker_name: "Ajit Kumar Nair",
    poster_path:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    registration_url: null,
    registration_button_text: "Completed",
    registration_status: "Closed",
    is_published: true,
    is_archived: false,
    is_cancelled: false,
    created_at: "2024-07-01T10:00:00Z",
    updated_at: "2024-07-15T18:00:00Z",
    gallery_count: 1,
  },
];

export const SEED_GALLERY: GalleryImage[] = [
  {
    id: "c1000000-0000-0000-0000-000000000001",
    event_id: "b1000000-0000-0000-0000-000000000001",
    image_path:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    caption:
      "Mindfulness and mental focus session with Grade 10–12 students in Sendhwa.",
    category: "Educational Ecosystem Empowerment",
    sort_order: 1,
    is_cover: true,
    is_published: true,
    created_at: "2025-02-16T10:00:00Z",
    event_title: "Educational Ecosystem Empowerment: Manifesting Academic Excellence Through Mindfulness",
  },
  {
    id: "c1000000-0000-0000-0000-000000000002",
    event_id: "b1000000-0000-0000-0000-000000000001",
    image_path:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    caption: "Students practicing goal-clarity and stress-management exercises.",
    category: "Student Workshop",
    sort_order: 2,
    is_cover: false,
    is_published: true,
    created_at: "2025-02-16T10:15:00Z",
    event_title: "Educational Ecosystem Empowerment: Manifesting Academic Excellence Through Mindfulness",
  },
  {
    id: "c1000000-0000-0000-0000-000000000003",
    event_id: "b1000000-0000-0000-0000-000000000001",
    image_path:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    caption: "Interactive group reflection at Vidhyakunj International & Lions Convent schools.",
    category: "Interactive Practice",
    sort_order: 3,
    is_cover: false,
    is_published: true,
    created_at: "2025-02-16T10:30:00Z",
    event_title: "Educational Ecosystem Empowerment: Manifesting Academic Excellence Through Mindfulness",
  },
  {
    id: "c1000000-0000-0000-0000-000000000004",
    event_id: "b1000000-0000-0000-0000-000000000002",
    image_path:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    caption:
      "Educators training in Psychological First Aid and the Gatekeeper Model.",
    category: "Educator Training",
    sort_order: 1,
    is_cover: true,
    is_published: true,
    created_at: "2024-11-21T10:00:00Z",
    event_title: "Empowering Educators: Safeguarding Young Minds — Suicide Prevention & Gatekeeper Training",
  },
  {
    id: "c1000000-0000-0000-0000-000000000005",
    event_id: "b1000000-0000-0000-0000-000000000002",
    image_path:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    caption:
      "CBSE-aligned crisis response and referral pathway discussions with teachers.",
    category: "Gatekeeper Model",
    sort_order: 2,
    is_cover: false,
    is_published: true,
    created_at: "2024-11-21T10:30:00Z",
    event_title: "Empowering Educators: Safeguarding Young Minds — Suicide Prevention & Gatekeeper Training",
  },
  {
    id: "c1000000-0000-0000-0000-000000000006",
    event_id: "b1000000-0000-0000-0000-000000000003",
    image_path:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    caption:
      "Ajit Kumar Nair leading the California Hypnosis Institute accredited Level 1 certification.",
    category: "Clinical Hypnotherapy",
    sort_order: 1,
    is_cover: true,
    is_published: true,
    created_at: "2024-07-15T10:00:00Z",
    event_title: "Level 1 Clinical Hypnotherapy Workshop for Psychology Interns",
  },
];

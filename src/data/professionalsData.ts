export interface Professional {
  id: string;
  name: string;
  designation: string;
  badge?: string;
  isFounder?: boolean;
  image?: string;
  initials: string;
  shortBio: string;
  fullBio: string[];
  qualifications: string[];
  expertise: string[];
  modalities: string[];
  approach: string;
  quote?: string;
}

export const PROFESSIONALS: Professional[] = [
  {
    id: "ajit-kumar-nair",
    name: "Ajit Kumar Nair",
    designation:
      "RCI Registered Rehabilitation Counsellor | Counselling Psychologist | Clinical Hypnotherapist | Mental Health Rehabilitation & Training Expert",
    isFounder: true,
    image: "/founder.jpeg",
    initials: "AN",
    shortBio:
      "Ajit Kumar Nair is the founder of Nair's Epigenetic Wellness. His professional background includes counselling, psychology, rehabilitation, clinical hypnotherapy, training and wellbeing.",
    fullBio: [
      "Ajit Kumar Nair is the founder of Nair's Epigenetic Wellness. His professional background includes counselling, psychology, rehabilitation, clinical hypnotherapy, training and wellbeing.",
      "His work reflects an interest in psychological understanding, therapeutic approaches and practical skill development in supporting individuals and groups.",
      "Ajit Kumar Nair brings extensive clinical experience across counselling psychology, psychotherapy, mental health rehabilitation, professional training, and wellbeing programmes. His formal education and advanced training span Clinical Psychology, Applied Psychology, Guidance and Counselling, Rehabilitation Psychology, and Clinical Hypnotherapy.",
      "His areas of professional training include Cognitive Behaviour Therapy (CBT), Rational Emotive Behaviour Therapy (REBT), Dialectical Behaviour Therapy (DBT), Acceptance and Commitment Therapy (ACT), Interpersonal Therapy (IPT), Emotionally Focused Therapy, mindfulness, clinical hypnotherapy, and psychological skills training.",
      "Ajit also brings a distinctive, grounded perspective from his earlier career as a mariner, followed by his dedicated transition into psychology and mental health. This combination of vast global experience, cross-cultural awareness, and clinical depth informs his practical, adaptable, and human-centred approach to wellbeing."
    ],
    qualifications: [
      "RCI Registered Rehabilitation Counsellor (Statutory Council of India)",
      "Counselling Psychologist (Applied Psychology & Clinical Foundations)",
      "Hypnotherapist",
      "Clinical Hypnotherapist (Specialist Certification in Focused Relaxation & Trance)",
      "Trainer Certification in Hypnotherapy from California Hypnosis Institute",
      "Mental Health Rehabilitation & Training Expert",
      "Specialised Training in CBT, REBT, DBT, ACT, IPT & Mindfulness"
    ],
    expertise: [
      "Counselling",
      "Psychotherapy",
      "Psychological Wellbeing",
      "Rehabilitation Support",
      "Clinical Hypnotherapy",
      "Mindfulness",
      "Mindfulness Trainer",
      "Resilience & Coping",
      "Relationships",
      "Training & Mentorship"
    ],
    modalities: [
      "Cognitive Behaviour Therapy (CBT)",
      "Rational Emotive Behaviour Therapy (REBT)",
      "Dialectical Behaviour Therapy (DBT)",
      "Acceptance and Commitment Therapy (ACT)",
      "Interpersonal Therapy (IPT)",
      "Emotionally Focused Therapy (EFT)",
      "Clinical Hypnotherapy",
      "Mindfulness-Based Cognitive Therapy (MBCT)"
    ],
    approach:
      "Integrative, person-centred approach recognising each individual's unique psychological, emotional, physical, social, family, and environmental context. Focuses on understanding root patterns, cultivating practical self-regulation skills, and fostering sustainable, enduring personal change.",
    quote:
      "At N.E.W., my focus is on helping people truly understand themselves, develop practical psychological skills, and build meaningful, sustainable changes that endure."
  },
  {
    id: "dr-deepa-jain",
    name: "Dr. Deepa Jain",
    designation:
      "Counselling Psychologist | Rehabilitation Counselor (RCI) | Clinical Hypnotherapist | Certified ACT Therapist | Art Therapy Practitioner",
    badge: "PhD & Certified ACT Therapist",
    isFounder: false,
    image: "/drDeepaJain.jpeg",
    initials: "DJ",
    shortBio:
      "Dr. Deepa Jain is a PhD holder in Clinical Hypnotherapy and skilled Counselling Psychologist committed to promoting emotional wellbeing, resilience, and personal growth. She is a Certified ACT (Acceptance and Commitment Therapy), Clinical Hypnotherapist Therapist and Art Therapy Practitioner.",
    fullBio: [
      "Dr. Deepa Jain is a PhD holder in Clinical Hypnotherapy and skilled Counselling Psychologist committed to promoting emotional wellbeing, resilience, and personal growth. She is a Certified ACT (Acceptance and Commitment Therapy), Clinical Hypnotherapist Therapist and Art Therapy Practitioner.",
      "With extensive experience working across diverse populations including children, adolescents, adults, and families, she integrates cognitive-behavioral, experiential, expressive, art therapy, and mindfulness-based approaches to address a wide range of emotional and behavioural difficulties.",
      "Her practice provides a secure, reflective space where clients can explore deeply held concerns, release emotional blockages through expressive art and hypnotherapy, and cultivate values-aligned living."
    ],
    qualifications: [
      "PhD in Clinical Hypnotherapy",
      "Counselling Psychologist",
      "Rehabilitation Counselor (RCI Registered)",
      "Certified ACT (Acceptance and Commitment Therapy) Therapist",
      "Certified Art Therapy Practitioner"
    ],
    expertise: [
      "Counselling & Psychotherapy",
      "Career Counselling",
      "De-addiction",
      "Anxiety",
      "Trauma Support",
      "Communication Skills",
      "Individual, Adolescent & Family Counselling"
    ],
    modalities: [
      "Acceptance and Commitment Therapy (ACT)",
      "Clinical Hypnotherapy",
      "Art Therapy & Expressive Modalities",
      "Cognitive Behavioral Therapy (CBT)",
      "Emotionally Focused Therapy (EFT)",
      "Experiential Therapy",
      "Mindfulness-Based Interventions"
    ],
    approach:
      "Integrates cognitive-behavioral, experiential, expressive, art therapy, and mindfulness-based approaches to address emotional and behavioural difficulties, tailored to the person's unique developmental and emotional stage.",
    quote:
      "Promoting emotional wellbeing, resilience, and personal growth through evidence-based psychological insight and creative therapeutic expression."
  },
  {
    id: "zainab-aarsiwala",
    name: "Zainab Aarsiwala",
    designation:
      "Couple & Marriage Counsellor | Counselling Psychologist | Psychological Assessor",
    badge: "Couple & Relationship Specialist",
    isFounder: false,
    image: "/zainabAarsiwala.jpeg",
    initials: "ZA",
    shortBio:
      "Zainab Aarsiwala brings extensive experience across pre-marital counselling, conflict resolution, couple and marriage counselling, psychological assessment, and structured group sessions.",
    fullBio: [
      "Zainab Aarsiwala brings extensive experience across pre-marital counselling, conflict resolution, couple and marriage counselling, psychological assessment, and structured group sessions.",
      "Her areas of professional training and therapeutic modalities include Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT) skills training, and psychological skill-building approaches.",
      "She works with individuals, couples, and groups around pre-marital counselling, conflict resolution, couple dynamics, marriage counselling, emotional wellbeing, psychological assessment, relationship growth, and behavioral health."
    ],
    qualifications: [
      "Counselling Psychologist",
      "Couple & Marriage Counsellor",
      "Psychological Assessor",
      "CBT & DBT Skills Training Certified"
    ],
    expertise: [
      "Pre-Marital Counselling",
      "Conflict Resolution",
      "Couple Counselling",
      "Marriage Therapy",
      "Psychological Assessment",
      "CBT & DBT Skills",
      "Group Sessions",
      "Relationship Dynamics"
    ],
    modalities: [
      "Cognitive Behavioral Therapy (CBT)",
      "Dialectical Behavior Therapy (DBT Skills)",
      "Emotionally Focused Therapy (EFT)",
      "Interpersonal Conflict Resolution",
      "Psychometric & Psychological Assessment",
      "Systemic Couple & Relationship Frameworks"
    ],
    approach:
      "Focused on empathetic, structured communication, emotion regulation, and interpersonal skill-building to help couples and individuals navigate relational crossroads and build lasting emotional security.",
    quote:
      "Meaningful relationships are built on clear understanding, respectful communication, and practical skills that bridge emotional differences."
  },
  {
    id: "bhavya-singh",
    name: "Bhavya Singh",
    designation:
      "Counselling Psychologist | Rehabilitation Counsellor (RCI Registered) | Child & Adolescent Psychologist",
    badge: "Child & Adolescent Specialist",
    isFounder: false,
    image: "/bhavyaSingh.jpeg",
    initials: "BS",
    shortBio:
      "Bhavya Singh is an RCI-registered Rehabilitation Counsellor and Child & Adolescent Psychologist specialising in evidence-based therapy, psychological rehabilitation, and supporting young individuals navigating developmental and high-stress environments.",
    fullBio: [
      "Bhavya Singh is an RCI-registered Rehabilitation Counsellor and Child & Adolescent Psychologist specialising in evidence-based therapy, psychological rehabilitation, and supporting young individuals navigating developmental and high-stress environments.",
      "Her extensive background in educational environments has given her a deep, practical understanding of child psychology and adolescent dynamics. She works effectively with young minds dealing with emotional distress, crisis situations, and academic or occupational pressures, utilising integrative therapeutic approaches including CBT, DBT, REBT, Mindfulness, Emotionally Focused Therapy, and Clinical Hypnosis."
    ],
    qualifications: [
      "Counselling Psychologist",
      "Rehabilitation Counsellor (RCI Registered)",
      "Child & Adolescent Psychologist",
      "Educational & Institutional Mental Health Specialist"
    ],
    expertise: [
      "Child & Adolescent Psychology",
      "Counselling & Rehabilitation Interventions",
      "High-Stress Environment Coping & Crisis Support",
      "Wellbeing & Psychoeducation",
      "Life Skills Training"
    ],
    modalities: [
      "Cognitive Behaviour Therapy (CBT)",
      "Dialectical Behaviour Therapy (DBT)",
      "Rational Emotive Behaviour Therapy (REBT)",
      "Mindfulness",
      "Emotionally Focused Therapy (EFT)",
      "Clinical Hypnosis"
    ],
    approach:
      "Integrative, developmentally sensitive, and strength-based support that provides children, adolescents, and families with practical emotional regulation tools and crisis coping strategies.",
    quote:
      "Every young mind deserves to be heard, understood, and equipped with the psychological resilience to thrive through life's pressures."
  }
];

export const TEAM_VALUES = [
  {
    number: "01",
    title: "Professional Understanding",
    description:
      "Recognising the importance of relevant professional knowledge and experience in delivering grounded, ethical care."
  },
  {
    number: "02",
    title: "Individual Respect",
    description:
      "Approaching each person with consideration for their unique circumstances, developmental context, needs and goals."
  },
  {
    number: "03",
    title: "Thoughtful Support",
    description:
      "Encouraging awareness, emotional understanding and collaborative, appropriate next steps toward lasting wellbeing."
  }
];

export const AREAS_OF_FOCUS = [
  {
    id: "counselling",
    title: "Counselling & Emotional Wellbeing",
    description:
      "Professional support relating to emotional experiences, life transitions and personal concerns.",
    href: "/services#counselling",
    badge: "Core Service"
  },
  {
    id: "psychotherapy",
    title: "Psychotherapy",
    description:
      "Approaches focused on exploring psychological and behavioural patterns for deeper personal transformation.",
    href: "/services#counselling",
    badge: "Evidence-Based"
  },
  {
    id: "rehabilitation",
    title: "Rehabilitation Support",
    description:
      "Support relating to rehabilitation needs, neurodevelopmental challenges and everyday functioning.",
    href: "/services#rehabilitation",
    badge: "RCI Registered"
  },
  {
    id: "hypnotherapy",
    title: "Clinical Hypnotherapy",
    description:
      "Relevant professional approaches involving focused attention, subconscious alignment and therapeutic techniques.",
    href: "/services#hypnotherapy",
    badge: "Specialist Care"
  },
  {
    id: "mindfulness",
    title: "Mindfulness & Personal Growth",
    description:
      "Learning and practices that encourage self-awareness, somatic reflection and grounded emotional regulation.",
    href: "/services#support-plans",
    badge: "Integrative"
  },
  {
    id: "training",
    title: "Training & Mentorship",
    description:
      "Educational and professional learning opportunities for students, emerging clinicians and institutions.",
    href: "/programmes",
    badge: "Academic"
  }
];

export const PHILOSOPHY_PILLARS = [
  {
    number: "01",
    title: "Individual Understanding",
    description:
      "Recognising that every individual has a unique psychological, emotional, physical, social, family and environmental context."
  },
  {
    number: "02",
    title: "Respectful Communication",
    description:
      "Creating an environment of trust, dignity, strict confidentiality and compassionate, non-judgmental listening."
  },
  {
    number: "03",
    title: "Appropriate Professional Guidance",
    description:
      "Selecting evidence-based therapeutic frameworks and ethical practices tailored to the person's readiness and goals."
  },
  {
    number: "04",
    title: "Practical Learning and Reflection",
    description:
      "Fostering self-awareness, emotional resilience, and practical psychological skills that serve long after sessions conclude."
  }
];

export const CONNECTION_STEPS = [
  {
    step: "01",
    title: "Explore",
    description: "Learn about the professionals and their areas of focus."
  },
  {
    step: "02",
    title: "Enquire",
    description: "Contact N.E.W. about the support or programme you are interested in."
  },
  {
    step: "03",
    title: "Discuss",
    description: "Share basic requirements and understand available options."
  },
  {
    step: "04",
    title: "Next Steps",
    description: "Receive information about the relevant service and how to proceed."
  }
];

export const PROFESSIONALS_FAQS = [
  {
    question: "How can I enquire about a specific professional?",
    answer:
      "You can contact N.E.W. and mention the professional you would like to enquire about. Our admissions team will provide full details on their consultation format and availability."
  },
  {
    question: "Can I choose a particular professional?",
    answer:
      "You can share your preference when making an enquiry. Availability and suitability will be confirmed by the team based on your specific requirements and goals."
  },
  {
    question: "Are online consultations available?",
    answer:
      "Online availability depends on the professional and service. Please contact N.E.W. for current information regarding online video sessions and in-person appointments."
  },
  {
    question: "How do I know which service may suit my needs?",
    answer:
      "You can discuss your concerns with the team to understand the available services and possible next steps. Our team will guide you toward the most appropriate pathway."
  },
  {
    question: "Can I contact N.E.W. for professional training?",
    answer:
      "Yes. You can enquire about internships, mentorship and professional development programmes designed for psychology students and mental health practitioners."
  }
];

/** Resolve ordered professional profiles from a list of practitioner IDs. */
export function getProfessionalsByIds(ids: string[]): Professional[] {
  return ids
    .map((id) => PROFESSIONALS.find((p) => p.id === id))
    .filter((p): p is Professional => Boolean(p));
}

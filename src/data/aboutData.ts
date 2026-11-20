export interface AboutCopy {
  hero: {
    eyebrow: string;
    title: string;
    tagline: string;
    introP1: string;
    introP2: string;
  };
  approach: {
    heading: string;
    p1: string;
    p2: string;
  };
  founder: {
    heading: string;
    title: string;
    credentials: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
  };
  epigenetics: {
    heading: string;
    subtitle: string;
    paragraphs: string[];
  };
  philosophy: {
    heading: string;
    principles: {
      num: string;
      title: string;
      desc: string;
    }[];
  };
  workshops: {
    heading: string;
    tagline: string;
    intro: string;
    programAreas: string[];
    upcomingEvent: {
      title: string;
      date: string;
      time: string;
      mode: string;
      location: string;
      registration: string;
      note: string;
    };
    inAction: {
      heading: string;
      subheading: string;
      desc: string;
    };
    galleryCategories: {
      title: string;
      desc: string;
    }[];
  };
  whyChoose: {
    heading: string;
    pillars: {
      title: string;
      desc: string;
    }[];
    learningBeyondTherapy: {
      title: string;
      desc: string;
    };
    safeSpace: {
      title: string;
      desc: string;
    };
  };
  footerCta: {
    brand: string;
    tagline: string;
    servicesList: string[];
    buttons: {
      label: string;
      actionType: "booking" | "link";
      href?: string;
    }[];
  };
}

export const aboutCopy: AboutCopy = {
  hero: {
    eyebrow: "ABOUT US",
    title: "Understanding You. Supporting Change. Enabling Wellbeing.",
    tagline: "Integrative, Person-Centred Psychological Care & Guidance",
    introP1:
      "At Nair’s Epigenetic Wellness (N.E.W.), we believe that wellbeing is more than simply the absence of illness. It is about understanding the different factors that shape how we think, feel, behave, connect with others, and respond to life.",
    introP2:
      "Founded by Ajit Kumar Nair, Counselling Psychologist, Rehabilitation Counselor (RCI Registered), Clinical Hypnotherapist, Trainer and Practitioner, N.E.W. brings together psychological knowledge, evidence-based therapeutic approaches, mindfulness,and emotional wellbeing practices, to create a more holistic approach to personal wellbeing.",
  },

  approach: {
    heading: "Our Integrative & Person-Centred Approach",
    p1: "With extensive experience across counselling, psychotherapy, rehabilitation, mental health, training, and educational settings,Nair’s Epigenetic Wellness works with individuals and groups to help them develop greater self-awareness, emotional regulation, resilience, healthier relationships, and practical skills for everyday life.",
    p2: "Our approach is integrative and person-centred. We recognise that every individual has a unique psychological, emotional, physical, social, family, spiritual and environmental context. Our aim is to understand the whole person rather than focus only on a single concern.",
  },

  founder: {
    heading: "Meet Ajit Kumar Nair",
    title: "Ajit Kumar Nair",
    credentials:
      "Founder | Counselling Psychologist | Rehabilitation Counselor (RCI) | Clinical Hypnotherapist",
    p1: "Ajit Kumar Nair is a Counselling Psychologist and Rehabilitation Counselor with extensive experience in counselling, psychotherapy, mental health rehabilitation, training, and wellbeing.",
    p2: "His professional training includes Clinical Psychology, Applied Psychology, Guidance and Counselling, Rehabilitation Psychology, and Clinical Hypnotherapy, along with specialised training in approaches such as Cognitive Behaviour Therapy (CBT), Rational Emotive Behaviour Therapy (REBT), Dialectical Behaviour Therapy (DBT), Acceptance and Commitment Therapy (ACT), Interpersonal Therapy (IPT), Emotionally Focused Therapy, and Mindfulness.",
    p3: "His work extends across individual counselling, psychotherapy, rehabilitation, emotional wellbeing, mindfulness, training, and professional development.",
    p4: "Ajit also brings a distinctive perspective from his earlier professional experience as a mariner, followed by his transition into psychology and mental health. This combination of professional and life experience informs his practical, adaptable, and human-centred approach to wellbeing.",
    p5: "At N.E.W., his focus is on helping people understand themselves better, develop practical psychological skills, and create meaningful and sustainable changes in their lives.",
  },

  epigenetics: {
    heading: "What Is Epigenetics?",
    subtitle: "Understanding the interaction between our biology and our environment",
    paragraphs: [
      "Epigenetics is the study of changes in the way genes are expressed without changing the underlying DNA sequence.",
      "Our genetic makeup is one part of who we are. The way our biology interacts with factors such as our environment, experiences, lifestyle, stress, relationships, and other influences is an important area of scientific research.",
      "At N.E.W., the idea of epigenetic wellness provides a broader framework for thinking about wellbeing: we are influenced by multiple interconnected factors, and understanding these influences can help us make more informed choices about our health and wellbeing.",
      "Our approach does not suggest that people can simply \"think their way\" into changing their genes. Instead, we focus on the factors within a person's psychological and behavioural environment that can be understood, supported, and worked with.",
      "Through counselling, psychological interventions, mindfulness, emotional skills training, and wellbeing programs, we aim to help individuals build healthier patterns and strengthen their capacity to respond to life's challenges.",
    ],
  },

  philosophy: {
    heading: "Our philosophy",
    principles: [
      {
        num: "01",
        title: "Understand the person.",
        desc: "We recognise that every individual has a unique psychological, emotional, physical, social, family, spiritual and environmental context.",
      },
      {
        num: "02",
        title: "Understand the patterns.",
        desc: "We help people identify cognitive habits, emotional reactions, and recurring relational patterns that shape daily functioning.",
      },
      {
        num: "03",
        title: "Develop practical skills.",
        desc: "We focus on grounded psychological coping tools, mindfulness practices, and adaptive strategies that can be used in everyday life.",
      },
      {
        num: "04",
        title: "Create meaningful change.",
        desc: "We work towards sustainable shifts in wellbeing, stronger resilience, healthier boundaries, and personal autonomy.",
      },
    ],
  },

  workshops: {
    heading: "UPCOMING WORKSHOPS & EVENTS",
    tagline: "Learn. Reflect. Practise. Grow.",
    intro:
      "N.E.W. regularly conducts workshops and learning experiences designed to make psychological knowledge practical and accessible.",
    programAreas: [
      "Suicide Prevention",
      "Stress management",
      "Mindfulness",
      "Emotional regulation",
      "Self-awareness and emotional intelligence",
      "Relationships and communication",
      "Non-Violent Communication",
      "Parenting and family wellbeing",
      "Mental health awareness",
      "Workplace wellbeing",
      "Student wellbeing",
      "Personal growth and self-development",
      "Professional training for counsellors and helping professionals",
    ],
    upcomingEvent: {
      title: "SCHOOL COUNSELLING SKILLS",
      date: "21.10.26",
      time: "7-9PM",
      mode: "Online",
      location: "GOOGLE MEET",
      registration: "via Whatsapp",
      note: "New workshops and events are added regularly. Follow our updates or contact us to know about upcoming programs.",
    },
    inAction: {
      heading: "OUR WORKSHOPS IN ACTION",
      subheading: "Learning is more meaningful when it is experienced.",
      desc: "From interactive psychological skills sessions to mindfulness programs and professional training, our workshops are designed to encourage participation, reflection, discussion, and practical application.",
    },
    galleryCategories: [
      {
        title: "Mindfulness Sessions",
        desc: "Practical experiences in awareness, attention, relaxation, and emotional wellbeing.",
      },
      {
        title: "Psychology & Mental Health Workshops",
        desc: "Interactive sessions that make psychological concepts understandable and applicable.",
      },
      {
        title: "Professional Training",
        desc: "Learning experiences for counsellors, educators, mental health professionals, and other helping professionals.",
      },
      {
        title: "Wellbeing Programs",
        desc: "Sessions focused on resilience, emotional intelligence, communication, relationships, and personal growth.",
      },
    ],
  },

  whyChoose: {
    heading: "WHY CHOOSE N.E.W.?",
    pillars: [
      {
        title: "A Whole-Person Perspective",
        desc: "We look beyond a single symptom or concern and consider the person within their broader psychological, relational, behavioural, and environmental context.",
      },
      {
        title: "Evidence-Informed Practice",
        desc: "Our psychological work draws from established therapeutic approaches and professional training, including CBT, REBT, DBT, ACT, IPT, mindfulness, and other approaches relevant to individual needs.",
      },
      {
        title: "Practical, Not Just Theoretical",
        desc: "We aim to translate psychological knowledge into practical skills that people can use in their everyday lives.",
      },
      {
        title: "Experienced Professionals",
        desc: "Our team brings together professionals from different areas of psychology, counselling, mental health, and wellbeing.",
      },
      {
        title: "Individualised Support",
        desc: "There is no single approach that works for everyone. Our interventions are adapted to the individual's concerns, circumstances, goals, and readiness for change.",
      },
    ],
    learningBeyondTherapy: {
      title: "Learning Beyond Therapy",
      desc: "N.E.W. is not limited to one-to-one counselling. Through workshops, training, mindfulness programs, psychoeducation, and wellbeing initiatives, we aim to make psychological knowledge accessible to a wider community.",
    },
    safeSpace: {
      title: "A Safe and Respectful Space",
      desc: "We strive to create an environment where individuals can explore their concerns with dignity, respect, confidentiality, and without unnecessary judgement.",
    },
  },

  footerCta: {
    brand: "Nair's Epigenetic Wellness",
    tagline: "Because wellbeing begins with understanding yourself.",
    servicesList: [
      "Counselling",
      "Psychotherapy",
      "Mindfulness",
      "Psychological Skills",
      "Training",
      "Wellbeing Programs",
    ],
    buttons: [
      {
        label: "BOOK A CONSULTATION",
        actionType: "booking",
      },
      {
        label: "EXPLORE OUR ASSESSMENT",
        actionType: "link",
        href: "/screening",
      },
      {
        label: "VIEW UPCOMING EVENTS",
        actionType: "link",
        href: "/events",
      },
    ],
  },
};

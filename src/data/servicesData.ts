// Master Services Data - 100% Verbatim Content from Official Document

export interface CounsellingStream {
  id: string;
  title: string;
  category:
    | "personal"
    | "marital-relational"
    | "specialized-health"
    | "trauma-transitions"
    | "identity-career";
  categoryLabel: string;
  lead: string;
  focusTitle: string;
  topics: string[];
  closing?: string;
  professionalIds: string[];
}

export interface PsychotherapyItem {
  code: string;
  title: string;
  tagline: string;
  desc: string;
  skills?: string[];
  questions?: string[];
  usedFor?: string;
  professionalIds: string[];
}

export const servicesCopy = {
  hero: {
    eyebrow: "SERVICES WE OFFER",
    title: "Support that meets you where you are.",
    p1: "Every person comes with a different experience, different challenges, and different needs. At Nair’s Epigenetic Wellness, we offer a range of psychological, emotional, behavioural, and wellbeing services so that support can be tailored to the individual.",
    p2: "Our aim is not simply to help you manage a problem for the moment. We work towards helping you understand yourself, develop useful skills, strengthen your emotional wellbeing, and create healthier ways of responding to life.",
  },

  counselling: {
    number: "01",
    title: "Counselling",
    subtitle: "A space to understand, express, and work through what you are experiencing.",
    intro: [
      "Counselling provides a safe and supportive space where you can talk about what is happening in your life with a trained professional.",
      "You may seek counselling because you are going through a difficult period, struggling with relationships, feeling emotionally overwhelmed, or simply wanting to understand yourself better.",
      "Counselling can help you make sense of your experiences, identify patterns, explore choices, and develop practical ways of coping.",
    ],
    streams: [
      {
        id: "individual",
        title: "Individual Counselling",
        category: "personal",
        categoryLabel: "Personal & Group",
        lead: "Individual counselling gives you dedicated one-to-one time with a professional.",
        focusTitle: "Sessions may focus on:",
        topics: [
          "Stress and emotional difficulties",
          "Anxiety and worry",
          "Low mood and motivation",
          "Self-esteem and confidence",
          "Relationship concerns",
          "Life transitions",
          "Emotional regulation",
          "Personal growth",
          "Difficult decisions",
          "Coping with challenging experiences",
        ],
        closing: "The sessions are tailored to your needs and pace.",
        professionalIds: ["ajit-kumar-nair", "dr-deepa-jain", "zainab-aarsiwala", "bhavya-singh"],
      },
      {
        id: "group",
        title: "Group Counselling",
        category: "personal",
        categoryLabel: "Personal & Group",
        lead: "Some experiences become easier to work through when people realise that they are not alone. Group counselling brings together people who may be facing similar concerns and provides a structured, supportive environment for learning and sharing.",
        focusTitle: "Groups may focus on areas such as:",
        topics: [
          "Emotional regulation",
          "Stress management",
          "Relationships",
          "Mindfulness",
          "Self-development",
          "Grief and adjustment",
          "Addiction recovery",
          "Life skills",
        ],
        closing: "Group programs are facilitated by a trained professional and are designed around the needs of the participants.",
        professionalIds: ["zainab-aarsiwala", "ajit-kumar-nair"],
      },
      {
        id: "marital",
        title: "Marital & Marriage Counselling",
        category: "marital-relational",
        categoryLabel: "Marital & Marriage",
        lead: "Marriage brings deep companionship alongside evolving responsibilities and expectations. Marital and marriage counselling supports partners in navigating long-term relational dynamics, communication gaps, and shared commitments in a neutral, respectful space.",
        focusTitle: "It may be helpful when couples are experiencing:",
        topics: [
          "Ongoing marital conflict or misalignment",
          "Expectation and role stress",
          "Extended family boundaries",
          "Emotional disconnection or resentment",
          "Rebuilding after a breach of trust",
          "Strengthening companionship and shared goals",
        ],
        closing: "The sessions are tailored to help you move forward with clarity and mutual respect.",
        professionalIds: ["zainab-aarsiwala", "ajit-kumar-nair"],
      },
      {
        id: "premarital",
        title: "Premarital Counselling",
        category: "marital-relational",
        categoryLabel: "Marital & Marriage",
        lead: "Premarital counselling gives engaged or committed partners a structured space to explore values, communication styles, expectations, and life plans before marriage.",
        focusTitle: "Sessions may focus on:",
        topics: [
          "Expectation alignment and shared values",
          "Communication and conflict-resolution skills",
          "Family roles and boundary setting",
          "Financial, career, and lifestyle planning",
          "Emotional safety and attachment needs",
        ],
        closing: "Built to lay a resilient, transparent foundation for lifelong partnership.",
        professionalIds: ["zainab-aarsiwala", "ajit-kumar-nair"],
      },
      {
        id: "relationship",
        title: "Couple & Relationship Counselling",
        category: "marital-relational",
        categoryLabel: "Relational & Family",
        lead: "Healthy relationships take understanding, effort, and safe communication. Couple counselling offers partners a supportive space to explore emotional patterns, rebuild trust, and strengthen their connection.",
        focusTitle: "Sessions may focus on:",
        topics: [
          "Communication breakdowns and recurring arguments",
          "Trust issues and emotional distance",
          "Couple dynamics and attachment needs",
          "Navigating life changes together",
          "Setting healthy boundaries",
        ],
        closing: "The goal is to help both partners feel heard and build a more fulfilling connection.",
        professionalIds: ["zainab-aarsiwala", "ajit-kumar-nair"],
      },
      {
        id: "family",
        title: "Family Counselling",
        category: "marital-relational",
        categoryLabel: "Relational & Family",
        lead: "Sometimes a person's difficulties are closely connected with family relationships and communication. Family counselling provides a space where family members can better understand one another, communicate more openly, and work through difficulties together.",
        focusTitle: "It may be helpful when families are experiencing:",
        topics: [
          "Communication difficulties",
          "Frequent conflict",
          "Changes within the family",
          "Difficulties involving children or adolescents",
          "Relationship strain",
          "Major life transitions",
        ],
        closing: "The goal is to create better understanding and healthier ways of relating to one another.",
        professionalIds: ["dr-deepa-jain", "ajit-kumar-nair", "bhavya-singh"],
      },
      {
        id: "parenting",
        title: "Parenting Counselling",
        category: "marital-relational",
        categoryLabel: "Relational & Family",
        lead: "Raising children and supporting adolescents brings unique emotional demands and evolving developmental questions. Parenting counselling equips parents and caregivers with calm, evidence-informed strategies for connection and guidance.",
        focusTitle: "Sessions may focus on:",
        topics: [
          "Understanding child and adolescent developmental stages",
          "Managing behavioural challenges with empathy and boundaries",
          "Parent-child communication and emotional regulation",
          "Navigating academic stress and screen-time balance",
          "Co-parenting alignment and caregiver burnout",
        ],
        closing: "Designed to strengthen parent-child trust and foster calmer, more supportive home environments.",
        professionalIds: ["bhavya-singh", "dr-deepa-jain"],
      },
      {
        id: "maternal",
        title: "Pre and Postnatal Counselling",
        category: "specialized-health",
        categoryLabel: "Specialized & Health",
        lead: "Pregnancy and early parenthood bring profound physical, emotional, and identity shifts. Pre and postnatal counselling provides compassionate, non-judgmental support for mothers and parents before, during, and after childbirth.",
        focusTitle: "Sessions may focus on:",
        topics: [
          "Prenatal anxiety and emotional preparation",
          "Adjustment to parenthood and identity shifts",
          "Postnatal recovery and emotional overwhelm",
          "Postpartum low mood and perinatal distress",
          "Parent-infant bonding concerns",
          "Support after a difficult birth or pregnancy loss",
        ],
        closing: "The space is designed to support your well-being at a gentle, comfortable pace.",
        professionalIds: ["dr-deepa-jain", "ajit-kumar-nair"],
      },
      {
        id: "chronic-illness",
        title: "Chronic Illness Counselling",
        category: "specialized-health",
        categoryLabel: "Specialized & Health",
        lead: "Living with a long-term health condition affects far more than just the body. It can weigh heavily on your mind, energy, and daily life. Chronic illness counselling helps you navigate the emotional toll of ongoing medical challenges while improving your overall quality of life.",
        focusTitle: "Sessions may focus on:",
        topics: [
          "Coping with a new or long-term diagnosis",
          "Health-related anxiety, fatigue, and frustration",
          "Grief for changes in lifestyle or independence",
          "Managing pain-related stress and burnout",
          "Communicating needs with family and caregivers",
          "Finding balance and resilience alongside treatment",
        ],
        closing: "The sessions are adapted to your energy levels and personal health journey.",
        professionalIds: ["ajit-kumar-nair", "dr-deepa-jain"],
      },
      {
        id: "eating-disorder",
        title: "Eating Disorder Counselling",
        category: "specialized-health",
        categoryLabel: "Specialized & Health",
        lead: "Difficulties with food, body image, and eating patterns often reflect deeper emotional pain, stress, or a need for control. Eating disorder counselling provides a compassionate, non-judgmental space to rebuild a balanced relationship with food, self-worth, and the body.",
        focusTitle: "Sessions may focus on:",
        topics: [
          "Disordered eating habits and emotional eating cycles",
          "Body image distress and perfectionism",
          "Understanding emotional triggers and coping patterns",
          "Self-compassion and nervous system regulation",
          "Collaborative support alongside medical or nutritional care",
        ],
        closing: "Approached gently, prioritizing safety, dignity, and sustainable recovery.",
        professionalIds: ["dr-deepa-jain", "ajit-kumar-nair"],
      },
      {
        id: "grief",
        title: "Grief Counselling",
        category: "trauma-transitions",
        categoryLabel: "Trauma & Life Transitions",
        lead: "Loss changes our world, and everyone experiences grief in their own way and time. Grief counselling provides a compassionate space to honor what you have lost while learning how to carry your grief forward.",
        focusTitle: "It may be helpful when you are navigating:",
        topics: [
          "The loss of a loved one",
          "Feelings of numbness, anger, or deep sadness",
          "Complicated or unresolved grief",
          "Major life losses and sudden endings",
          "Adjusting to life after bereavement",
          "Finding meaning and support during mourning",
        ],
        closing: "There is no fixed timeline for healing; the sessions meet you wherever you are.",
        professionalIds: ["ajit-kumar-nair", "dr-deepa-jain"],
      },
      {
        id: "trauma",
        title: "Trauma Counselling",
        category: "trauma-transitions",
        categoryLabel: "Trauma & Life Transitions",
        lead: "Overwhelming experiences can continue to affect how safe, grounded, or connected you feel long after they have passed. Trauma counselling offers a steady, supportive environment to process difficult memories without feeling rushed or overwhelmed.",
        focusTitle: "Sessions may focus on:",
        topics: [
          "Past or recent traumatic experiences",
          "Emotional triggers and heightened alertness",
          "Feeling disconnected or numb",
          "Difficulties with trust and safety",
          "Shame, self-blame, or lingering distress",
          "Rebuilding a sense of control and calm",
        ],
        closing: "The sessions move strictly at your pace, prioritizing emotional safety at every step.",
        professionalIds: ["dr-deepa-jain", "ajit-kumar-nair", "bhavya-singh"],
      },
      {
        id: "addiction",
        title: "Addiction Counselling",
        category: "trauma-transitions",
        categoryLabel: "Trauma & Life Transitions",
        lead: "Struggling with habits or substances often affects not just the individual, but every part of their daily life and relationships. Addiction counselling offers structured, non-judgmental support to understand underlying triggers and build sustainable recovery.",
        focusTitle: "Sessions may focus on:",
        topics: [
          "Substance use and dependency concerns",
          "Behavioural addictions (such as screen, gaming, or spending habits)",
          "Identifying emotional triggers and cravings",
          "Relapse prevention and coping strategies",
          "Rebuilding routines, self-trust, and relationships",
          "Healing underlying stress or emotional pain",
        ],
        closing: "The focus is on steady, practical progress in a supportive environment.",
        professionalIds: ["dr-deepa-jain", "ajit-kumar-nair"],
      },
      {
        id: "adolescent",
        title: "Adolescent & Young Adult Counselling",
        category: "trauma-transitions",
        categoryLabel: "Trauma & Life Transitions",
        lead: "Growing up brings its own set of challenges. Young people often navigate intense social, academic, and personal shifts while trying to figure out who they are and where they belong.",
        focusTitle: "Sessions may focus on:",
        topics: [
          "Academic pressure and exam stress",
          "Friendships, peer dynamics, and social anxiety",
          "Identity exploration and self-discovery",
          "Family expectations and communication gaps",
          "Navigating early romantic relationships",
          "Emotional regulation and mood shifts",
          "Self-esteem, body image, and confidence",
          "Uncertainty and anxiety about the future",
        ],
        closing: "We provide age-appropriate support that allows young people to talk openly and develop healthier ways of understanding and managing their experiences.",
        professionalIds: ["bhavya-singh", "dr-deepa-jain"],
      },
      {
        id: "career",
        title: "Career & Vocational Counselling",
        category: "identity-career",
        categoryLabel: "Identity & Career",
        lead: "Work and career choices play a major role in our sense of purpose, stability, and daily well-being. Career and vocational counselling helps you gain clarity, navigate professional crossroads, and align your work with your strengths and values.",
        focusTitle: "Sessions may focus on:",
        topics: [
          "Career confusion and choosing the right path",
          "Workplace stress, burnout, and work-life balance",
          "Career transitions and mid-career shifts",
          "Imposter syndrome and professional confidence",
          "Decision-making around higher studies or job changes",
          "Aligning personal strengths with vocational goals",
        ],
        closing: "The goal is to help you move forward in your professional life with clarity and confidence.",
        professionalIds: ["dr-deepa-jain", "bhavya-singh"],
      },
      {
        id: "geriatric",
        title: "Geriatric Counselling",
        category: "identity-career",
        categoryLabel: "Identity & Career",
        lead: "Later life brings unique reflections, transitions, and emotional needs that deserve thoughtful care. Geriatric counselling offers older adults a warm, respectful space to talk openly, stay emotionally connected, and navigate aging with dignity.",
        focusTitle: "It may be helpful when experiencing:",
        topics: [
          "Adjustment to retirement and changing daily routines",
          "Loneliness, isolation, or empty-nest transitions",
          "Coping with health changes or loss of independence",
          "Grief and loss of peers or a spouse",
          "Memory concerns and emotional anxiety",
          "Reflecting on life experiences and finding peace",
        ],
        closing: "The sessions are paced gently to ensure comfort, respect, and meaningful support.",
        professionalIds: ["ajit-kumar-nair", "dr-deepa-jain"],
      },
      {
        id: "lgbtq",
        title: "LGBTQ+ Affirmative Counselling",
        category: "identity-career",
        categoryLabel: "Identity & Career",
        lead: "Everyone deserves a therapeutic space where their identity is fully respected, understood, and affirmed. LGBTQ+ affirmative counselling provides a safe, inclusive environment to explore personal, relational, and social experiences without fear of judgment.",
        focusTitle: "Sessions may focus on:",
        topics: [
          "Exploring sexual orientation or gender identity",
          "Navigating coming-out decisions and family dynamics",
          "Coping with minority stress, stigma, or discrimination",
          "Self-acceptance, confidence, and authenticity",
          "Relationship and intimacy concerns",
          "Life transitions and community belonging",
        ],
        closing: "The space is built on respect, confidentiality, and genuine acceptance.",
        professionalIds: ["ajit-kumar-nair", "zainab-aarsiwala"],
      },
      {
        id: "sex-intimacy",
        title: "Sex and Intimacy Counselling",
        category: "identity-career",
        categoryLabel: "Identity & Career",
        lead: "Emotional closeness, physical intimacy, and sexual wellbeing are vital parts of adult life and relationships. Sex and intimacy counselling offers a discreet, respectful, non-judgmental space for individuals and couples to address intimacy concerns openly.",
        focusTitle: "Sessions may focus on:",
        topics: [
          "Emotional and physical intimacy difficulties",
          "Desire differences and relational communication",
          "Performance anxiety and body confidence",
          "Rebuilding intimacy after stress, illness, or life changes",
          "Navigating shame, expectations, and healthy boundaries",
        ],
        closing: "Guided with sensitivity, confidentiality, and evidence-informed psychological care.",
        professionalIds: ["zainab-aarsiwala", "ajit-kumar-nair"],
      },
    ] as CounsellingStream[],
  },

  psychotherapies: {
    number: "02",
    title: "Psychotherapies",
    subtitle: "Different approaches for different needs.",
    intro: [
      "Psychotherapy is a deeper form of psychological support that helps people understand patterns in their thoughts, emotions, behaviours, and relationships.",
      "There is no single therapy that works in exactly the same way for everyone. Different approaches can be used depending on the person's concerns and goals.",
      "At N.E.W., our professionals have training in a range of therapeutic approaches.",
    ],
    items: [
      {
        code: "CBT",
        title: "Cognitive Behaviour Therapy — CBT",
        tagline: "Understanding the connection between thoughts, feelings, and actions.",
        desc: "CBT helps you notice patterns in the way you think and how those thoughts influence your emotions and behaviour. For example, a thought such as “I am going to fail” may create anxiety, which may then lead to avoiding the situation altogether. CBT helps you examine these patterns and develop more balanced and helpful ways of responding.",
        usedFor: "Anxiety • Low mood • Stress • Confidence difficulties • Behavioural concerns",
        professionalIds: ["ajit-kumar-nair", "dr-deepa-jain", "zainab-aarsiwala", "bhavya-singh"],
      },
      {
        code: "REBT",
        title: "Rational Emotive Behaviour Therapy — REBT",
        tagline: "Understanding how our beliefs influence how we feel.",
        desc: "REBT focuses on the beliefs we hold about ourselves, other people, and the situations we experience. Sometimes it is not only what happens to us that creates emotional difficulty, but also the expectations and beliefs we attach to what happens. REBT helps people identify unhelpful beliefs and develop more flexible and realistic ways of thinking.",
        professionalIds: ["ajit-kumar-nair", "bhavya-singh"],
      },
      {
        code: "DBT",
        title: "Dialectical Behaviour Therapy — DBT",
        tagline: "Learning to manage strong emotions and difficult situations.",
        desc: "DBT teaches practical skills for handling intense emotions, relationships, stress, and difficult situations. DBT can be particularly useful for people who feel that their emotions sometimes become overwhelming or difficult to manage.",
        skills: [
          "Understanding emotions",
          "Managing emotional reactions",
          "Handling stressful situations",
          "Improving relationships",
          "Becoming more aware of the present moment",
        ],
        professionalIds: ["ajit-kumar-nair", "zainab-aarsiwala", "bhavya-singh"],
      },
      {
        code: "ACT",
        title: "Acceptance and Commitment Therapy — ACT",
        tagline: "Learning to make room for difficult experiences while moving towards what matters.",
        desc: "ACT helps people understand their thoughts and feelings without allowing difficult internal experiences to completely control their actions. It focuses on building psychological flexibility and identifying the values that matter to you. The aim is to help you take meaningful steps towards the life you want to build.",
        professionalIds: ["ajit-kumar-nair", "dr-deepa-jain"],
      },
      {
        code: "IPT",
        title: "Interpersonal Therapy — IPT",
        tagline: "Understanding how relationships and life changes affect emotional wellbeing.",
        desc: "Our relationships can have a significant impact on how we feel. IPT focuses on difficulties in relationships, communication, grief, major changes in life, and the role these experiences can play in emotional wellbeing. It can help people understand relationship patterns and develop healthier ways of communicating and connecting.",
        professionalIds: ["ajit-kumar-nair", "zainab-aarsiwala"],
      },
      {
        code: "MBCT",
        title: "Mindfulness-Based Cognitive Therapy — MBCT",
        tagline: "Learning to become more aware of your thoughts and emotions.",
        desc: "MBCT combines mindfulness practices with elements of CBT. It teaches you to notice thoughts, feelings, and reactions with greater awareness, helping you develop a different relationship with your internal experiences. Mindfulness can also become a practical everyday skill for managing stress and improving emotional awareness.",
        professionalIds: ["ajit-kumar-nair", "dr-deepa-jain", "bhavya-singh"],
      },
      {
        code: "SFBT",
        title: "Solution-Focused Brief Therapy — SFBT",
        tagline: "Focusing on where you want to go, not only on what has gone wrong.",
        desc: "SFBT focuses on your strengths, resources, existing abilities, and the changes you would like to make. Instead of spending all the time understanding the problem, sessions also explore practical and achievable change.",
        questions: [
          "What would you like to be different?",
          "What is already working?",
          "What small change could you make next?",
        ],
        professionalIds: ["ajit-kumar-nair", "zainab-aarsiwala"],
      },
      {
        code: "EFT",
        title: "Emotionally Focused Therapy — EFT",
        tagline: "Understanding emotions and strengthening relationships.",
        desc: "EFT helps people understand the emotions underneath relationship difficulties. It can help individuals and couples recognise emotional patterns, communicate their needs, and develop stronger and more secure relationships.",
        professionalIds: ["ajit-kumar-nair", "dr-deepa-jain", "zainab-aarsiwala", "bhavya-singh"],
      },
      {
        code: "CT",
        title: "Cognitive Therapy — CT",
        tagline: "Looking at the thinking patterns behind emotional difficulties.",
        desc: "Cognitive Therapy focuses on identifying patterns of thinking that may contribute to emotional distress. It helps individuals examine these patterns and develop healthier and more balanced perspectives.",
        professionalIds: ["ajit-kumar-nair", "dr-deepa-jain", "zainab-aarsiwala", "bhavya-singh"],
      },
      {
        code: "BT",
        title: "Behaviour Therapy — BT",
        tagline: "Changing behaviours to create positive change.",
        desc: "Behaviour Therapy focuses on the relationship between behaviour and the environment around us. It helps individuals understand behaviours that may be creating difficulties and develop healthier, more useful behavioural patterns.",
        professionalIds: ["ajit-kumar-nair", "dr-deepa-jain", "bhavya-singh"],
      },
    ] as PsychotherapyItem[],
  },

  hypnotherapy: {
    number: "03",
    title: "Hypnotherapy",
    subtitle: "A safe, evidence-based, and highly structured therapeutic modality that utilizes trance- a natural state of deep relaxation and focused attention.",
    intro: [
      "In clinical terms, it is a tool used to bypass the critical, analytical filter of the conscious mind in order to communicate directly with the subconscious mind.",
      "When you try to break a habit or overcome an anxiety using willpower alone, you are using the 10% conscious mind to battle the 90% subconscious mind. Hypnotherapy bridges this gap. By guiding you into a calm, receptive state, we can update old \"mental software,\" release buried emotional blocks, and install healthier behavioral patterns at the root level.",
    ],
    pillars: [
      {
        title: "A State of Deep Focus:",
        desc: "A natural state of physical relaxation paired with heightened mental absorption (similar to deep meditation or daydreaming).",
      },
      {
        title: "Subconscious Rewiring:",
        desc: "A direct pathway to update the 90% of your mind that governs automatic habits, anxiety triggers, and core emotional patterns.",
      },
      {
        title: "Evidence-Based & Collaborative:",
        desc: "A clinically validated psychological tool where you work actively with a therapist to achieve your specific goals.",
      },
    ],
    disclaimer: "HYPNOTHERAPY IS NEITHER stage performance OR entertainment Nor mind control or loss of will",
    brainScience: {
      title: "HOW HYPNOTHERAPY WORKS IN THE BRAIN",
      intro: "During normal daily activity, your brain operates in fast, alert Beta waves focused on active thinking and stress. In a hypnotherapy session, you are guided into slower Alpha and Theta brainwave states, the same natural states experienced during deep relaxation, meditation, or lightday dreaming.",
      changesTitle: "In this relaxed state, three key changes occur:",
      changes: [
        {
          title: 'Bypasses the "Critical Filter"',
          desc: "Relaxes the analytical conscious mind so positive, therapeutic suggestions reach the subconscious directly without resistance.",
        },
        {
          title: "Boosts Neuroplasticity",
          desc: "Makes the brain exceptionally receptive to creating new, healthy cognitive habits and thought patterns faster than conventional talk therapy.",
        },
        {
          title: "Enhances Deep Focus",
          desc: "Allows your physical body to fully relax while your inner mind locks onto solutions, memories, and emotional insights hidden beneath daily mental noise.",
        },
      ],
    },
    sessionStages: {
      title: "WHAT ACTUALLY HAPPENS DURING A SESSION-",
      stages: [
        {
          title: "Goal Setting: Before we begin.",
          desc: "We start with a friendly conversation. We talk about what brought you in, what you want to work on, and answer any questions you have so you feel completely comfortable.",
        },
        {
          title: "Getting Relaxed (Induction): Easing into trance.",
          desc: "You sit back comfortably, close your eyes, and listen to my voice. Through deep breathing and gentle relaxing exercises, your body completely unwinds just like settling in for a quiet break.",
        },
        {
          title: "The Main Work: Tailored to your needs.",
          desc: "While you are deeply relaxed, your mind becomes focused and open. Depending on what you need, we might reframe negative thoughts, use positive imagery, or look back at where an old habit or emotional reaction started so we can untangle it.",
        },
        {
          title: "Waking Back Up (Emergence):Completing the process.",
          desc: "Therapists gently guide you back to full alertness. You open your eyes feeling clear-headed, grounded, and well-rested very much like waking up from a relaxing power nap",
        },
      ],
    },
    suitability: {
      title: "Is Hypnotherapy Right for You?",
      intro: 'Many people ask themselves: "Is my issue suitable for hypnotherapy, or is it not big enough?" If you are experiencing any of the following challenges, hypnotherapy offers a fast, gentle, and evidence-based pathway toward lasting relief.',
      heading: "Are You Experiencing Any of These?",
      items: [
        {
          title: "Knowing What to Do, But Unable to Do It:",
          desc: 'You feel stuck in repetitive habits, overthinking, or emotional patterns despite knowing logically what you "should" do.',
        },
        {
          title: "Exhausting Stress & Anxiety:",
          desc: "Racing thoughts keep you awake at night, leave you feeling overwhelmed, or manifest as physical tension and fatigue.",
        },
        {
          title: "Talking Hasn't Changed How You Feel:",
          desc: "Traditional talk therapy helps you understand why you feel a certain way, but the deep emotional reaction or habit remains untouched.",
        },
        {
          title: "Self-Sabotage & Imposter Syndrome:",
          desc: "Sudden intense reactions to minor triggers, a persistent inner critic, or holding yourself back from reaching your full potential.",
        },
      ],
    },
    transformation: {
      title: "How Hypnotherapy Can Help You Transform",
      intro: "By working directly with the subconscious mind where these automatic patterns and emotional responses live hypnotherapy creates meaningful, long-term shifts in several key areas:",
      areas: [
        {
          title: "Anxiety, Panic & Stress Management:",
          desc: "Calms hyperactive fight-or-flight responses, lowers stress hormones, and conditions your nervous system to stay peaceful under pressure.",
        },
        {
          title: "Phobias & Fears:",
          desc: "Safely desensitizes intense, irrational fears—such as fear of public speaking, flying, heights, or medical procedures—in a safe, controlled space.",
        },
        {
          title: "Trauma & Unresolved Emotional Pain:",
          desc: "Accesses and gently releases painful emotional memories without forcing you to relive or re-traumatize yourself consciously.",
        },
        {
          title: "Breaking Stubborn Habits:",
          desc: "Re-educates automatic subconscious patterns like emotional binge eating, smoking, nail-biting, and chronic procrastination.",
        },
        {
          title: "Mind-Body & Psychosomatic Relief:",
          desc: "Alters the brain’s perception of physical discomfort to help manage tension headaches, IBS, sleep disturbances, and chronic muscle tightness.",
        },
        {
          title: "Confidence & High Performance:",
          desc: "Overcomes imposter syndrome, rebuilds core self-worth, and sharpens mental focus for career, academics, athletics, or creative pursuits.",
        },
      ],
    },
    psychologistCare: {
      title: "Why Choose Clinical Hypnotherapy with a Psychologist?",
      p1: "Psychological healing doesn't always have to take years of purely logical discussion. By combining standard psychological expertise with clinical hypnotherapy, we treat the mind as a complete system working with both your conscious reasoning and your subconscious emotions. This empowers you to stop struggling against your own mind and align your deepest beliefs with the peace, health, and life you consciously desire.",
      p2: "Receiving care from a licensed psychologist ensures that your therapy is rooted in rigorous clinical science, professional ethics, and psychological safety.",
      p3: "it is an evidence-based tool seamlessly integrated into a comprehensive, personalized treatment plan designed just for you Using YOUR focused attention to foster healthy change in you",
      disclaimer: "Hypnotherapy is used as a complementary approach and is not presented as a replacement for appropriate medical or psychological care.",
    },
  },

  rehabilitation: {
    number: "04",
    title: "ONLINE REHABILITATION",
    heading: "Getting Your Life Back on Track",
    intro: [
      "Rehabilitation is a goal-oriented process designed to help you regain, rebuild, and maintain your independence and quality of life.",
      "When life disruptions such as severe stress, illness, trauma, burnout, or emotional setbacks affect your ability to function at work, in studies, or within relationships, rehabilitation bridges the gap between where you are today and your highest potential for well-being and personal fulfillment.",
    ],
    whatIsIt: {
      title: "What is Online Rehabilitation?",
      subtitle: "Professional support that reaches you wherever you are.",
      p1: "You don’t always have to visit a clinic to receive quality care. Online Rehabilitation brings structured, professional psychological support directly to you through secure video calls.",
      p2: "Whether you manage a busy schedule, live far away, face mobility challenges, or simply feel more at ease in your own environment, online sessions ensure that distance never stands in the way of your progress.",
    },
    whyChoose: {
      title: "Why Choose Online Support?",
      points: [
        {
          title: "Comfort & Privacy",
          desc: "Speak freely from the safety, confidentiality, and comfort of your own space.",
        },
        {
          title: "No Travel Stress",
          desc: "Save time, money, and energy by skipping long commutes and busy waiting rooms.",
        },
        {
          title: "Consistent Care",
          desc: "Maintain unbroken progress with your sessions even during travel, busy work phases, or routine changes.",
        },
        {
          title: "Flexible Scheduling",
          desc: "Easily integrate regular sessions into your work, academic, or family life.",
        },
      ],
    },
    whatWeOffer: {
      title: "What We Offer Online",
      intro: "Our remote services provide structured, comprehensive guidance tailored to your needs:",
      items: [
        {
          title: "1-on-1 Counselling",
          desc: "Personalized sessions focused on your specific goals and personal concerns.",
        },
        {
          title: "Guided Therapeutic Sessions",
          desc: "Evidence-based tools and exercises to help you manage unhelpful thoughts, emotional distress, and daily pressure.",
        },
        {
          title: "Mindfulness & Relaxation Practices",
          desc: "Practical techniques to calm your nervous system, enhance focus, and restore emotional balance.",
        },
        {
          title: "Practical Skill-Building",
          desc: "Developing healthy daily routines, adaptive coping mechanisms, and clear personal boundaries.",
        },
        {
          title: "Regular Progress Tracking",
          desc: "Continuously monitoring your functional gains and refining your plan as you grow.",
        },
        {
          title: "Family Guidance",
          desc: "Empowering your loved ones with insights on how to create a supportive environment at home.",
        },
      ],
    },
    suitability: {
      title: "Is Online Support Right for You?",
      intro: "Online rehabilitation is thoughtfully planned according to your individual needs and suitability for remote care. It is ideal for:",
      items: [
        {
          title: "Busy Professionals & Students",
          desc: "Individuals balancing intense work hours, competitive exam prep, or tight schedules.",
        },
        {
          title: "Geographical Distance",
          desc: "Anyone residing in areas with limited access to specialized rehabilitation professionals.",
        },
        {
          title: "Home-Based Comfort",
          desc: "Individuals who prefer receiving guidance and building resilience from the comfort of their personal space.",
        },
      ],
    },
    howItWorks: {
      title: "How It Works",
      steps: [
        {
          step: "1. Assessment & Suitability",
          desc: "We begin with an initial consultation to understand your context, goals, and confirm that online support is the right fit.",
        },
        {
          step: "2. Your Personal Roadmap",
          desc: "Together, we co-create a simple, step-by-step plan focused on your specific recovery and growth milestones.",
        },
        {
          step: "3. Structured Virtual Sessions",
          desc: "We meet regularly over secure video calls for therapy, practical skill-building, and guided exercises.",
        },
        {
          step: "4. Growth & Independence",
          desc: "We review your progress regularly, fine-tune coping strategies, and help you build long-term confidence and self-reliance.",
        },
      ],
    },
  },

  renewal: {
    number: "05",
    title: "RENEWAL",
    heading: "A space for starting again.",
    tagline: "Reconnect with your strengths, break unhelpful patterns, and rebuild a resilient path forward.",
    feelingStuck: {
      title: "Feeling Stuck in Old Patterns?",
      p1: "Life transitions, burnout, health changes, or prolonged stress can leave us feeling disconnected from who we are. It is common to find yourself relying on habits, thought patterns, or emotional responses that once protected you, but no longer serve your present wellbeing.",
      p2: "Renewal is a dedicated, client-centered service designed to help you navigate life transitions, regain psychological clarity, and rebuild a fulfilling sense of purpose and autonomy. It represents our core approach to helping individuals reconnect with themselves, understand what may no longer be working, and begin creating healthier, sustainable patterns for the future.",
    },
    approach: {
      title: "Our Approach to Renewal",
      subtitle: "We guide you through a structured, integrative therapeutic process designed to move you from feeling stuck to taking empowered action:",
      flow: "| 01. REFLECT ───> 02. RECONNECT ───> 03. REBUILD |",
      phases: [
        {
          name: "Reflect",
          points: [
            "Understand Your Story: Unpack the experiences, life changes, or chronic stressors that have brought you to this point.",
            "Identify Patterns: Recognize underlying cognitive habits, emotional triggers, and relational patterns that may be keeping you feeling stuck.",
            "Process & Deconstruct: Create a safe space to process grief, frustration, or burnout without judgment.",
          ],
        },
        {
          name: "2. Reconnect",
          points: [
            "Anchor in Core Values: Realign with what truly matters to you, independent of external pressure or past expectations.",
            "Restore Self-Agency: Rebuild trust in your innate strengths, resilience, and decision-making capacity.",
            "Grounding & Regulation: Learn mind-body regulation techniques to restore emotional balance and calm the nervous system.",
          ],
        },
        {
          name: "3. Rebuild",
          points: [
            "Practical Coping Skills: Equip yourself with evidence-based strategies (CBT, ACT, and mindfulness-based approaches) tailored to your daily life.",
            "Sustainable Habits: Create healthier routines, set clear boundaries, and adopt adaptive responses to stress.",
            "Long-Term Resilience: Establish concrete relapse-prevention tools so you can maintain progress across home, work, and personal spaces.",
          ],
        },
      ],
    },
    whoCanBenefit: {
      title: "4. Who Can Benefit?",
      intro: "This Service Is Ideal For Individuals Navigating:",
      items: [
        {
          title: "Life Transitions & Identity Shifts",
          desc: "Adjusting to major life, career, or academic changes.",
        },
        {
          title: "Burnout & Chronic Stress",
          desc: "Recovering emotional energy and establishing healthy work-life boundaries.",
        },
        {
          title: "Unhelpful Behavioral or Thought Patterns",
          desc: "Overcoming persistent self-doubt, perfectionism, or avoidant coping styles.",
        },
        {
          title: "Post-Disruption Rehabilitation",
          desc: "Rebuilding self-confidence and functionality following emotional distress or health challenges.",
        },
      ],
    },
    processOverview: {
      title: "Process Overview",
      steps: [
        {
          step: "1. Initial Assessment",
          desc: "A comprehensive intake session to understand your context, concerns, and goals.",
        },
        {
          step: "2. Collaborative Plan",
          desc: "Co-creating a personalized therapeutic roadmap using the Reflect-Reconnect-Rebuild framework.",
        },
        {
          step: "3. Structured Sessions",
          desc: "Regular 1-on-1 sessions incorporating evidence-based therapeutic techniques and practical exercises.",
        },
        {
          step: "4. Integration & Growth",
          desc: "Reviewing progress, fine-tuning daily coping strategies, and fostering long-term independence.",
        },
      ],
    },
  },

  spiritual: {
    number: "06",
    title: "SPIRITUAL PRACTICES",
    heading: "Exploration of Inner Consciousness & Meaning",
    intro: [
      "At Nair’s Epigenetic Wellness, our core therapeutic services are rooted in evidence-based psychological, neurological, and scientific frameworks.",
      "However, modern epigenetics demonstrates a powerful truth:",
      "Our biological and emotional health is deeply influenced by our core beliefs, perceptions, and internal narratives.",
      "We recognize that true healing is not one-size-fits-all. We believe that true healing happens when therapy respects who you are and what you believe. For clients who find deep meaning in spiritual, transpersonal, or subconscious exploration, working within their own belief system creates a profound emotional relief, cellular calm and inner transformation.",
    ],
    disclaimer: "Please note: The therapies listed in this specific section are optional, belief-aligned, and selective modalities. They are tailored exclusively for clients who explicitly request or resonate with these approaches as part of their personal self-exploration journey. These practices are non-clinical, non-medical, and designed to complement and not to replace standard medical or psychological treatment.",
    subheading: "Exploring inner awareness and meaning.",
    modalities: [
      {
        id: "transpersonal",
        title: "transpersonal Therapy",
        quote: '"Going Beyond the Surface Self to Find Deeper Meaning"',
        desc: "Transpersonal Therapy expands traditional psychological frameworks to include the full spectrum of human experience integrating mental, emotional, somatic, and spiritual aspects of life.",
        epigeneticConnection: "Research in psychoneuroimmunology shows that moving beyond ego-driven stress into states of \"self-transcendence,\" connection, and deep inner meaning reduces systemic stress markers, shifts brainwave activity (Theta/Alpha), and promotes neuroplasticity.",
        howItHelps: [
          "Cultivates deep self-awareness and a sense of purpose.",
          "Helps integrate unexplainable life experiences, existential anxiety, or spiritual crises.",
          "Fosters holistic alignment between your daily actions and your core inner values.",
        ],
      },
      {
        id: "plrt",
        title: "Past Life Regression Therapy (PLRT)",
        quote: "Exploring Subconscious Metaphors & Deep Origin Events",
        desc: "Past Life Regression utilizes gentle, focused trance and deep relaxation (hypnotic state) to allow the subconscious mind to retrieve symbolic narratives, memories, or impressions stored deep within the psyche.",
        epigeneticConnection: "Whether viewed through the lens of soul continuity or as subconscious somatic metaphors, the emotional release experienced in regression work is biologically real. Releasing deeply stored emotional charge shifts stress signaling pathways, helping the nervous system step out of chronic \"fight-or-flight\" modes.",
        howItHelps: [
          "Provides symbolic resolution for unexplained phobias, recurring emotional blocks, or relationship patterns.",
          "Facilitates somatic and emotional catharsis for long-held internal tension.",
          "Offers fresh perspectives on current life struggles through sub-conscious narrative exploration.",
        ],
      },
      {
        id: "lbl",
        title: "Life Between Lives (LBL) Therapy",
        quote: "Life Between Lives (LBL) Therapy Uncovers Life Purpose, Soul Contracts, and Universal Clarity",
        desc: "Building upon deep hypnotic states, Life Between Lives therapy guides individuals into a state of super-conscious awareness to explore themes of soul identity, personal life lessons, and overarching existence beyond physical form.",
        epigeneticConnection: "Epigenetics emphasizes the power of perception. When an individual gains a profound, expansive perspective on their life’s purpose, their chronic stress response collapses, replaced by deep emotional safety, coherence, and physiological calm.",
        howItHelps: [
          "Clarifies your overriding life purpose, career choices, and personal challenges.",
          "Brings peace, comfort, and existential clarity regarding mortality and grief.",
          "Re-aligns your daily living with long-term emotional resilience and higher clarity.",
        ],
      },
    ],
  },

  supportPlans: {
    number: "07",
    title: "TREATMENT & SUPPORT PLANS",
    heading: "Your support plan should fit you.",
    intro: "Different people need different levels and types of support. Based on your concerns, goals, and professional assessment, we may recommend one of the following formats.",
    formats: [
      {
        title: "Individual Counselling Plan",
        desc: "One-to-one sessions designed around your specific concerns and goals.",
        suitableFor: "Personal concerns • Emotional difficulties • Stress • Relationships • Self-development",
      },
      {
        title: "Individual + Group Support",
        desc: "A combination of individual sessions and structured group sessions. This can provide both personalised attention and the opportunity to learn and practise skills in a group setting.",
        suitableFor: "Emotional regulation • Recovery • Relationship skills • Personal development • Skill building",
      },
      {
        title: "Individual Mindfulness Sessions",
        desc: "Personalised mindfulness sessions based on your needs and comfort level. Sessions may focus on awareness, attention, relaxation, emotional regulation, or developing a regular mindfulness practice.",
      },
      {
        title: "Group Mindfulness Sessions",
        desc: "Guided mindfulness sessions conducted for small or larger groups.",
        usefulFor: [
          "Stress management",
          "Workplace wellbeing",
          "Student wellbeing",
          "Emotional awareness",
          "Relaxation",
          "Building a regular mindfulness practice",
        ],
      },
      {
        title: "Comprehensive Individual & Group Programme",
        desc: "An integrated pathway combining individual counselling, structured group support, and guided group mindfulness sessions. It provides personal guidance, a supportive community learning space, and dedicated practices to build long-term emotional resilience.",
        suitableFor: "Whole-person growth • Stress & burnout recovery • Holistic skill-building • Deep emotional regulation • Mind-body well-being",
      },
    ],
    crisis: {
      title: "Crisis Intervention",
      p1: "Sometimes immediate support is needed when a person is going through a highly distressing situation.",
      p2: "Crisis intervention focuses on helping the person become safer and more stable, understand what support is needed, and identify appropriate next steps.",
      warning: "Crisis intervention is not a substitute for emergency medical or psychiatric care. Where there is an immediate risk to someone's safety, urgent emergency or medical support should be sought.",
      helplines: [
        { name: "National Emergency Service", number: "112", tel: "112", note: "Immediate emergency ambulance / police" },
        { name: "Tele-MANAS (Govt. of India)", number: "14416 / 1800-891-4416", tel: "14416", note: "24/7 Toll-free mental health support" },
        { name: "KIRAN Mental Health Helpline", number: "1800-599-0019", tel: "18005990019", note: "24/7 Central mental health helpline" },
        { name: "Local Hospital Emergency", number: "Visit Nearest Casualty / ER", tel: "", note: "In-person acute evaluation" },
      ],
    },
    decisionHelper: {
      title: "Not sure which service is right for you?",
      desc: "You don't need to figure everything out before reaching out. Speak with one of our professionals about your concerns to explore the right pathway.",
      actions: [
        { label: "BOOK A CONSULTATION", action: "booking" },
      ],
    },
  },
};

/**
 * Annai Foundation - Central Data Store
 * Contains authentic details, programs, stories, events, and metrics.
 * Uses official imagery downloaded from the original Annai Foundation organization.
 */

const ANNAI_DATA = {
  organization: {
    name: "Annai Foundation",
    tagline: "Restoring Dignity, Saving Lives, Empowering Communities",
    location: "Karaikal, Puducherry & Surrounding Regions, India",
    registrationNo: "DARPAN: PY/2021/0289412 | 80G Certified (Reg. No. 12612/23)",
    phone: "+91 95004 15161",
    email: "contact@annaifoundation.com",
    established: "2015",
    ambulanceHelpline: "+91 95004 15161",
    bloodHelpline: "+91 95004 15161"
  },

  stats: {
    livesImpacted: 15850,
    ambulanceDispatches: 4280,
    bloodUnitsArranged: 2940,
    destituteFinalRites: 1240,
    studentsTrained: 3650,
    mealsDistributed: 48200
  },

  programs: [
    {
      id: "ambulance-emergency",
      title: "24/7 Emergency Ambulance & Critical Transport",
      category: "Healthcare",
      categoryBadge: "24/7 Emergency",
      shortDesc: "Round-the-clock free/subsidized emergency ambulance service saving road accident victims and critical patients in Karaikal and rural coastal regions.",
      fullDesc: "Our dedicated fleet of equipped ambulances operates 24 hours a day, 365 days a year. We provide immediate paramedic response, oxygen support, and transport to Government & specialized tertiary hospitals in Karaikal, Nagapattinam, and Puducherry.",
      image: "assets/images/original/Emergency-Ambulance-Service.png",
      raised: 680000,
      goal: 1000000,
      donorsCount: 342,
      impactMetric: "4,280+ Critical Dispatches Completed",
      actionLabel: "Support Ambulance Fuel & Care"
    },
    {
      id: "blood-donation-network",
      title: "Emergency Blood Donor Network & Camps",
      category: "Healthcare",
      categoryBadge: "Life Saving",
      shortDesc: "A connected registry of 3,000+ voluntary blood donors and bi-monthly mobile blood donation camps serving district general hospitals.",
      fullDesc: "In life-and-death moments, finding rare blood groups (such as O-negative, AB-negative, and platelets) is crucial. Annai Foundation manages a rapid-response voluntary donor network providing immediate matching within 30 minutes.",
      image: "assets/images/blood-donation.jpg",
      raised: 290000,
      goal: 400000,
      donorsCount: 188,
      impactMetric: "2,940+ Units Arranged",
      actionLabel: "Fund Blood Drives"
    },
    {
      id: "destitute-final-rites",
      title: "Dignified Final Rites for the Destitute",
      category: "Humanitarian",
      categoryBadge: "Sacred Dignity",
      shortDesc: "Providing respectful, sacred last rites according to cultural traditions for unclaimed bodies, destitute elders, and homeless individuals.",
      fullDesc: "Every human being deserves dignity in departure. Annai Foundation volunteers reverently step forward to perform honorable funeral rituals, burials, and cremations for abandoned bodies, unknown accident victims, and destitute souls with full respect.",
      image: "assets/images/original/Social-Welfare.png",
      raised: 410000,
      goal: 500000,
      donorsCount: 295,
      impactMetric: "1,240+ Souls Honored with Dignity",
      actionLabel: "Sponsor Final Rites"
    },
    {
      id: "digital-skills-education",
      title: "Grow with Google & Youth Digital Skills",
      category: "Education",
      categoryBadge: "Youth Empowerment",
      shortDesc: "Imparting digital literacy, Google workspace tools, resume building, and career soft-skills to underprivileged UG/PG students.",
      fullDesc: "Bridging the rural-urban digital divide by organizing accredited workshops in partnership with colleges. We empower youth with practical computing, AI tools, communication confidence, and job interview readiness.",
      image: "assets/images/google-skills-lab.jpg",
      raised: 375000,
      goal: 600000,
      donorsCount: 215,
      impactMetric: "3,650+ College Youths Certified",
      actionLabel: "Sponsor Student Workshops"
    },
    {
      id: "child-education-support",
      title: "Underprivileged Child Education & School Kits",
      category: "Education",
      categoryBadge: "Child Welfare",
      shortDesc: "Providing free school bags, notebooks, uniforms, evening tuition centers, and nutritional snacks to prevent school dropouts.",
      fullDesc: "We support children from low-income fishing and agricultural families with essential learning supplies, evening tuition centers, and mentorship so no bright mind is forced to drop out due to poverty.",
      image: "assets/images/original/about-img-2.jpg",
      raised: 520000,
      goal: 750000,
      donorsCount: 310,
      impactMetric: "1,850+ School Children Supported",
      actionLabel: "Sponsor a Child's Education"
    },
    {
      id: "women-livelihood-training",
      title: "Women Empowerment & Tailoring Centers",
      category: "Livelihood",
      categoryBadge: "Self-Reliance",
      shortDesc: "Vocational tailoring, handicrafts, micro-enterprise training, and sewing machine sponsorships for single mothers and widows.",
      fullDesc: "Empowering rural women with financial independence through 3-month certified stitching and apparel designing courses, financial literacy, and facilitating sewing machines on course completion.",
      image: "assets/images/women-tailoring.jpg",
      raised: 310000,
      goal: 500000,
      donorsCount: 165,
      impactMetric: "480+ Women Earning Livelihood",
      actionLabel: "Gift a Sewing Machine"
    },
    {
      id: "disaster-food-relief",
      title: "Disaster Relief & Daily Food Distribution",
      category: "Humanitarian",
      categoryBadge: "Crisis Support",
      shortDesc: "Rapid disaster response during cyclones/floods in the delta belt and daily warm meal packages for abandoned elderly citizens.",
      fullDesc: "The coastal delta region frequently experiences severe cyclones and waterlogging. Our rapid disaster volunteers supply clean drinking water, dry rations, cooked meals, tarpaulins, and medical aid kits directly to cut-off coastal hamlets.",
      image: "assets/images/original/img-2.png",
      raised: 490000,
      goal: 650000,
      donorsCount: 280,
      impactMetric: "48,200+ Hot Meals & Kits Provided",
      actionLabel: "Feed Hungry Families"
    }
  ],

  stories: [
    {
      id: "story-1",
      title: "A 2:00 AM Call That Saved Murugesan’s Life",
      category: "Ambulance Care",
      snippet: "When Murugesan suffered severe trauma after a road mishap on the ECR highway, Annai Foundation’s ambulance arrived within 9 minutes.",
      fullStory: "On a rainy Tuesday midnight, 46-year-old farmer Murugesan was struck on the deserted Karaikal-Nagore bypass. With severe internal bleeding, local bystanders called the Annai Foundation 24/7 hotline. Paramedics stabilized him with oxygen and transported him swiftly to the Government General Hospital. Today, Murugesan is back on his feet, farming and supporting his two young daughters.",
      author: "Murugesan & Family",
      location: "Thirunallar Village",
      image: "assets/images/murugesan-profile.jpg",
      date: "August 2026"
    },
    {
      id: "story-2",
      title: "From College Dropout Threat to Digital Pioneer",
      category: "Grow with Google",
      snippet: "Priya, daughter of a daily-wage laborer, gained Google digital skills certification and secured her first job in IT administration.",
      fullStory: "Priya had top grades in BSc Computer Science but lacked confidence in workplace software and professional English. Through Annai Foundation's complimentary 'Grow with Google' soft-skills boot camp, she mastered cloud tools, resume drafting, and interview techniques. She now works as a Junior Operations Assistant in Puducherry.",
      author: "Priya S.",
      location: "Karaikal Campus",
      image: "assets/images/priya-profile.jpg",
      date: "July 2026"
    },
    {
      id: "story-3",
      title: "Dignity in Departure for an Unknown Stranger",
      category: "Destitute Care",
      snippet: "Volunteers ensured an elderly homeless man who passed away at the railway station received prayer, flowers, and an honorable final farewell.",
      fullStory: "When an elderly destitute man with no family was found deceased near the railway terminal, local police contacted Annai Foundation. Our team stepped forward, arranged holy water, clean cloth, traditional rituals, and a respectful burial attended by our volunteers who treated him as their own elder.",
      author: "Community Officer Vignesh",
      location: "Karaikal Town",
      image: "assets/images/original/img-2.png",
      date: "June 2026"
    }
  ],

  events: [
    {
      id: "evt-1",
      title: "Emergency First-Aid & CPR Life-Saver Workshop",
      category: "Healthcare",
      date: "2026-09-18",
      displayDate: "18 Sep 2026",
      day: "18",
      month: "SEP",
      time: "09:30 AM - 01:30 PM",
      location: "Annai Foundation Emergency HQ, Beach Road, Karaikal",
      seatsAvailable: 40,
      description: "Hands-on emergency lifesaving training covering adult & child CPR, bleeding control, choking response, and road trauma first-aid.",
      badge: "Life Saving Skills",
      image: "assets/images/original/Emergency-Ambulance-Service.png"
    },
    {
      id: "evt-2",
      title: "Grow with Google: AI Tools & Modern Career Masterclass",
      category: "Education",
      date: "2026-09-28",
      displayDate: "28 Sep 2026",
      day: "28",
      month: "SEP",
      time: "10:00 AM - 04:00 PM",
      location: "Arignar Anna Govt Arts College Auditorium, Karaikal",
      seatsAvailable: 45,
      description: "Hands-on masterclass covering Google Workspace productivity tools, generative AI for career acceleration, and professional interview coaching.",
      badge: "Free Certification",
      image: "assets/images/google-skills-lab.jpg"
    }
  ],

  recentDonors: [
    { name: "Karthik Subramanian", amount: "₹5,000", cause: "Ambulance Fuel Fund", time: "12 mins ago" },
    { name: "Ananya Ramesh", amount: "₹2,500", cause: "Child Education Kit", time: "34 mins ago" },
    { name: "Suresh Kumar S.", amount: "₹10,000", cause: "Destitute Care", time: "1 hour ago" },
    { name: "Lakshmi Narayanan", amount: "₹1,500", cause: "Elderly Meal Support", time: "2 hours ago" },
    { name: "Dr. P. Venkatesh", amount: "₹25,000", cause: "Emergency Medical Equipment", time: "4 hours ago" }
  ]
};

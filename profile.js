// Your content lives here. Changes to this file are included when you publish.
// Project details were adapted from your public GitHub READMEs.
export const profile = {
  name: "Anthony Cordial",
  role: "Software Engineer",
  location: "Metro Manila, Philippines",
  availability: "Open to opportunities",
  email: "anthonycordial2124@gmail.com",
  github: "https://github.com/Anthony2124",
  linkedin: "https://www.linkedin.com/in/anthony-cordial-a2b118433/",
  resume: "assets/Anthony_Cordial_Resume.pdf",
  photo: "assets/profile.jpg", // Set to "" to use automatic local photo detection.
  photoPosition: "center top",
  introduction: "I’m Anthony Cordial. I build reliable platforms and thoughtful experiences — from payments at scale to Android and the web.",
  about: "I'm a software engineer based in Metro Manila, with 4+ years building payment and merchant platforms. I connect thoughtful interfaces with reliable systems — and care about what happens on both sides of the screen.",
  approach: "At PayMongo, my work spans checkout performance, webhook reliability, and tools for merchants. Outside of that, I build projects like KasiGuru and Steady: technology that connects people with their culture and helps them care for themselves.",
  currently: "Building KasiGuru — connecting language, culture, and technology.",
  // Experience and highlights are from the résumé supplied in this folder.
  highlights: [
    { value: "4+", label: "Years of experience" },
    { value: "62%", label: "Lower checkout latency" },
    { value: "99.95%", label: "Webhook delivery success" }
  ],
  experience: [
    { role: "Software Engineer II", company: "PayMongo", period: "Apr 2024 — Present", highlights: ["Reduced p95 checkout latency from 820 ms to 310 ms with Redis caching and PostgreSQL query improvements.", "Improved webhook delivery success from 97.1% to 99.95% across 2M+ monthly events with a Go retry service and SQS queues.", "Led a squad of four engineers to ship QR Ph payment acceptance in 10 weeks.", "Reduced on-call pages by 45% through SLO-based alerting and service runbooks."] },
    { role: "Software Engineer I", company: "PayMongo", period: "Jun 2022 — Mar 2024", highlights: ["Built React and TypeScript payout and reporting tools used by 8,000+ merchants.", "Reduced CI runs from 25 to 9 minutes through test parallelization and Docker layer caching.", "Expanded backend test coverage from 48% to 82% with PostgreSQL integration tests."] }
  ],
  education: [
    { title: "B.S. Information Technology", institution: "Aurora State College of Technology", year: "2022", icon: "book" },
    { title: "AWS Certified Developer", institution: "Associate", year: "2024", icon: "award" }
  ],
  // Tools documented in the supplied résumé and public project READMEs.
  skillGroups: [
    { id: "mobile", label: "Android", icon: "smartphone", description: "Native Android tools used to build KasiGuru.", skills: ["Kotlin", "Jetpack Compose", "Room / SQLite", "Hilt", "Firebase", "Push notifications"] },
    { id: "web", label: "Web", icon: "layout", description: "Thoughtful interfaces, from merchant dashboards to personal projects.", skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML & CSS", "Progressive Web Apps"] },
    { id: "backend", label: "Backend", icon: "server", description: "Reliable APIs, secure data, and systems that scale.", skills: ["Node.js", "Go", "PostgreSQL", "Redis", "Supabase", "Firestore", "REST & gRPC"] },
    { id: "cloud", label: "Cloud", icon: "cloud", description: "Getting software into production — and keeping it healthy.", skills: ["AWS", "Docker", "Terraform", "GitHub Actions", "Amazon SQS", "Datadog", "Automated testing"] }
  ],
  projects: [
    {
      id: "kasiguru", name: "KasiGuru", category: "Android + Web", type: "mobile", visual: "kasiguru",
      tagline: "A language worth keeping alive.", description: "A gamified learning application for the preservation and learning of the Kasiguranin dialect, with a native Android app, a web learner experience, and an admin dashboard.",
      tags: ["Kotlin", "Jetpack Compose", "Firebase"], number: "01", sample: false,
      challenge: "Make learning a local dialect accessible on Android, iPhone, and computers while keeping vocabulary and learning progress organized.",
      approach: "A Kotlin and Jetpack Compose Android app backed by Room and Firebase, paired with a web learner app and content administration tools.",
      features: ["Gamified language learning and pronunciation content", "Room storage and Firestore synchronization", "Cross-device learning progress", "Web learner experience and admin dashboard", "Push notifications and deep links"],
      liveUrl: "", sourceUrl: "https://github.com/Anthony2124/KasiGuru"
    },
    {
      id: "steady", name: "Steady", category: "Full stack · PWA", type: "fullstack", visual: "steady",
      tagline: "Small habits. A steadier you.", description: "An installable wellness app that brings habits, mood, sleep, fitness, and guided breathing into one place. Built with React and TypeScript, with private per-user data in Supabase.",
      tags: ["React", "TypeScript", "Supabase"], number: "02", sample: false,
      challenge: "Bring everyday wellness tracking together in a calm interface while keeping personal journal and activity data private.",
      approach: "A responsive React PWA with Supabase authentication, PostgreSQL storage, and row-level security. The service worker caches static assets rather than personal API responses.",
      features: ["Habits with streaks and consistency heatmaps", "Mood journal, sleep logs, and fitness tracking", "Guided breathing and visual insights", "Installable PWA with an offline app shell", "Data export and account deletion"],
      liveUrl: "", sourceUrl: "https://github.com/Anthony2124/MyFit"
    },
    {
      id: "portfolio", name: "This portfolio", category: "Frontend", type: "frontend", visual: "portfolio",
      tagline: "A little code. A lot of personality.", description: "A personal space for my work, built with lightweight web fundamentals and a focus on typography, interaction, and accessibility. You’re exploring it right now.",
      tags: ["JavaScript", "CSS", "Accessibility"], number: "03", sample: false,
      challenge: "Give people a clear sense of my projects and the person behind them, with room to explore at their own pace.",
      approach: "A responsive, dependency-free website with project filters, focused case studies, an interactive skills explorer, and a playful terminal.",
      features: ["Filterable projects and keyboard-accessible case studies", "Light and dark themes", "Interactive portfolio terminal", "Responsive layouts and reduced-motion support", "Locally detected profile photo"],
      liveUrl: "", sourceUrl: "https://github.com/Anthony2124/Profile"
    }
  ]
};

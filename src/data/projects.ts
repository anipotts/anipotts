export interface Project {
  id: string;
  title: string;
  slug: string;
  shortSummary: string;
  category: "ai" | "product" | "quant" | "music";
  duration: string;
  role: string;
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
  hasVideo: boolean;
  videoFilename?: string;
  screenshot?: string;
  public: boolean;
  caseStudy: boolean;
  status: "draft" | "published" | "revamp_pending";
  keyPoints: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "ChainedChat",
    slug: "chainedchat",
    shortSummary:
      "Full-stack AI chat application built and shipped in 2 weeks with real-time conversations and AI model chaining.",
    category: "ai",
    duration: "2 weeks",
    role: "Full-stack Developer",
    stack: ["Next.js", "TypeScript", "OpenAI API", "Supabase", "Tailwind CSS"],
    repoUrl: "https://github.com/anipotts/chainedchat",
    demoUrl: "https://chainedchat.app",
    hasVideo: true,
    videoFilename: "chainedchat.mp4",
    public: true,
    caseStudy: true,
    status: "published",
    keyPoints: [
      "Built and deployed production-ready AI chat app in 2 weeks",
      "Implemented real-time message streaming with AI model chaining",
      "Achieved 95+ Lighthouse performance score",
    ],
  },
  {
    id: "2",
    title: "NYU Purity Test",
    slug: "nyu-purity-test",
    shortSummary:
      "Viral gamified quiz that went viral across NYU campus, built in 4 hours with shareable results.",
    category: "product",
    duration: "4 hours",
    role: "Solo Developer",
    stack: ["React", "TypeScript", "Vercel", "Tailwind CSS"],
    demoUrl: "https://nyupuritytest.com",
    hasVideo: true,
    videoFilename: "purity-test.mp4",
    public: true,
    caseStudy: false,
    status: "published",
    keyPoints: [
      "Viral product across NYU campus with 10k+ completions",
      "Built and shipped in 4 hours",
      "Shareable results drove organic growth",
    ],
  },
  {
    id: "3",
    title: "HabitTracks",
    slug: "habitracks",
    shortSummary:
      'Music habit tracker for Burna Boy\'s "Our Bad Habit" campaign at Atlantic Records.',
    category: "music",
    duration: "3 weeks",
    role: "Full-stack Developer",
    stack: ["React", "Node.js", "MongoDB", "Spotify API"],
    screenshot: "/assets/projects/screenshots/badhabit.jpg",
    hasVideo: false,
    public: true,
    caseStudy: false,
    status: "revamp_pending",
    keyPoints: [
      "Built for Atlantic Records artist campaign",
      "Integrated Spotify API for music tracking",
      "UI revamp in progress",
    ],
  },
  {
    id: "4",
    title: "RSS Scraping Engine",
    slug: "rss-scraping-engine",
    shortSummary:
      "Real-time RSS feed scraper with intelligent content aggregation and filtering.",
    category: "product",
    duration: "4 weeks",
    role: "Backend Engineer",
    stack: ["Node.js", "PostgreSQL", "Redis", "Docker"],
    screenshot: "/assets/projects/screenshots/rss.jpg",
    hasVideo: false,
    public: true,
    caseStudy: false,
    status: "revamp_pending",
    keyPoints: [
      "Processes 1000+ RSS feeds in real-time",
      "Intelligent content filtering and deduplication",
      "Architecture diagram available - UI pending",
    ],
  },
  {
    id: "5",
    title: "Quantercise",
    slug: "quantercise",
    shortSummary:
      "Quantitative finance exercise platform with real-time market data integration.",
    category: "quant",
    duration: "4 weeks",
    role: "Full-stack Developer",
    stack: ["React", "Python", "FastAPI", "PostgreSQL", "Redis"],
    screenshot: "/assets/projects/screenshots/quantercise.jpg",
    hasVideo: false,
    public: false,
    caseStudy: true,
    status: "published",
    keyPoints: [
      "Interactive quant finance exercises with real data",
      "Built custom pricing models and backtesting engine",
      "Used by 200+ students in quant club",
    ],
  },
  {
    id: "6",
    title: "300-Member Quant Platform",
    slug: "quant-platform",
    shortSummary:
      "Full-stack member portal for 300-member intercollegiate quantitative finance club.",
    category: "quant",
    duration: "1 week",
    role: "Full-stack Developer",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    repoUrl: "https://github.com/anipotts/quant-platform",
    demoUrl: "https://quantclub.app",
    hasVideo: true,
    videoFilename: "quant-platform.mp4",
    public: true,
    caseStudy: true,
    status: "published",
    keyPoints: [
      "Built and shipped in 1 week for 300+ active members",
      "Member portal with events, resources, and networking",
      "Reduced admin overhead by 80%",
    ],
  },
  {
    id: "7",
    title: "2500 IG Account Tracker",
    slug: "ig-tracker",
    shortSummary:
      "A&R project tracking 2,500 Instagram accounts for music industry talent discovery.",
    category: "music",
    duration: "4 days",
    role: "Data Engineer",
    stack: ["Python", "PostgreSQL", "Instagram API", "Docker"],
    screenshot: "/assets/projects/screenshots/spykdb.jpg",
    hasVideo: false,
    public: true,
    caseStudy: false,
    status: "revamp_pending",
    keyPoints: [
      "Tracked 2,500 Instagram accounts for A&R discovery",
      "Automated engagement and growth metrics",
      "Dashboard UI in development - architecture available",
    ],
  },
];

export function getProjectsByCategory(category?: string) {
  if (!category || category === "all") return projects.filter((p) => p.public);
  return projects.filter((p) => p.category === category && p.public);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.caseStudy && p.public);
}

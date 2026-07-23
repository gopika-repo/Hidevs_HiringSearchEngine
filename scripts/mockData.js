/* ==========================================================================
   HiDevs Hiring Search Engine — Clean Mock Dataset
   ========================================================================== */

export const mockRecruiterData = {
  currentUser: {
    name: "Alex Rivera",
    role: "Technical Recruiting Lead",
    avatar: "AR",
    savedCount: 4,
    workspaceCount: 2
  },
  recentSearches: [
    "Python LLM Engineers Bangalore",
    "Senior Full Stack React FastAPI",
    "Go Distributed Systems Remote"
  ],
  suggestedSearches: [
    "LangChain AI Agent Builders",
    "Immediate Joiners Python",
    "Hackathon Winners ML Track"
  ],
  quickFilters: [
    { id: "open_work", label: "Open to Work", icon: "●" },
    { id: "remote", label: "Remote Ready", icon: "🌐" },
    { id: "immediate", label: "Immediate Joiners (≤15d)", icon: "⚡" },
    { id: "active_builders", label: "Active Builders (30d)", icon: "🔥" },
    { id: "hackathon_winners", label: "Hackathon Winners", icon: "🏆" },
    { id: "ai_engineers", label: "AI Engineers", icon: "🤖" },
    { id: "top_ranked", label: "Top Ranked (Top 25%)", icon: "★" }
  ]
};

export const mockQuickFilters = mockRecruiterData.quickFilters;

export const mockCandidates = [
  {
    id: "cand-1",
    name: "Arjun Sharma",
    avatar: "AS",
    headline: "Senior ML Engineer",
    company: "Swiggy",
    location: "Bangalore",
    workMode: "Remote",
    experienceYears: 4,
    noticePeriodDays: 15,
    availability: "Open to Work",
    lastActive: "3 days ago",
    skills: ["Python", "FastAPI", "LangChain", "PyTorch", "Docker", "PostgreSQL", "LlamaIndex", "Redis", "AWS"],
    primarySkills: ["Python", "FastAPI", "LangChain"],
    roleTypes: ["AI / ML Engineer", "Backend"],
    builderProof: {
      projectsCount: 6,
      deployedProjectsCount: 3,
      hackathonWinsCount: 2,
      challengesCount: 4,
      aiRankPercentile: 8,
      streakDays: 23,
      monthsActiveCount: 10
    },
    aiSummary: "Backend engineer with 4 years in production ML systems. Deployed 2 LLM agents with 340+ daily active users. Top 8% AI Challenge rank.",
    whyInterview: [
      {
        claim: "Direct stack match: FastAPI + LangChain + Python",
        evidence: "Built production AI agents & RAG pipelines with 340+ daily queries."
      },
      {
        claim: "Proven production delivery",
        evidence: "6 of 8 projects are deployed live with active user traction."
      },
      {
        claim: "Competitive peer validation",
        evidence: "Top 8% on HiDevs AI challenges, ranked above 340+ peers in LLM deployment track."
      }
    ],
    potentialConcerns: [
      "No team leadership experience visible from profile data. Suitable for IC role; senior/lead role needs validation.",
      "Frontend experience limited to React basics. Backend-only or full-stack role needs clarification."
    ],
    projects: [
      {
        name: "TalentGraph AI",
        description: "AI-powered talent matching engine using LangChain + RAG",
        techStack: ["Python", "LangChain", "FastAPI"],
        usersCount: "200+ active users",
        verified: true,
        deployed: true,
        links: { live: "https://talentgraph.demo", github: "github.com/arjunsharma/talentgraph" }
      },
      {
        name: "CodeReview Summarizer",
        description: "Automated PR summarize bot leveraging Claude API & FastAPI",
        techStack: ["Python", "FastAPI", "Claude API"],
        usersCount: "89 active users",
        verified: true,
        deployed: true,
        links: { live: "#", github: "github.com/arjunsharma/codereview-bot" }
      }
    ],
    aiAgents: [
      { name: "TalentGraph Analyzer", status: "Active", dailyQueries: 340, stack: "LangChain + GPT-4", deployedMonthsAgo: 4 },
      { name: "Code Review Summarizer", status: "Active", dailyQueries: 89, stack: "Claude API + FastAPI", deployedMonthsAgo: 8 }
    ],
    intelligenceCards: [
      {
        title: "Builder Momentum",
        signal: "Strong ↑",
        observation: "Project output has grown consistently across 3 years with increasing complexity.",
        evidence: ["2022: 2 beginner projects", "2023: 4 deployed APIs", "2024: 6 production AI systems", "Challenge rank: Top 30% → Top 8%"],
        takeaway: "Upward trajectory — best work is recent and accelerating."
      },
      {
        title: "Learning Velocity",
        signal: "Strong ↑",
        observation: "Adopted LangChain and deployed a production app within 60 days of first usage.",
        evidence: ["LangChain: First commit Jan 2024 → Deployed Mar 2024 (60 days)", "FastAPI: 61 days time-to-deployment"],
        takeaway: "Productive in new technologies within 2 months."
      }
    ]
  },
  {
    id: "cand-2",
    name: "Priya Mehta",
    avatar: "PM",
    headline: "AI Engineer & Full Stack Builder",
    company: "Razorpay",
    location: "Mumbai",
    workMode: "Hybrid",
    experienceYears: 3,
    noticePeriodDays: 30,
    availability: "Open to Select Roles",
    lastActive: "1 day ago",
    skills: ["Python", "React", "TypeScript", "FastAPI", "OpenAI SDK", "Next.js", "Tailwind", "PostgreSQL"],
    primarySkills: ["React", "TypeScript", "Python", "FastAPI"],
    roleTypes: ["AI / ML Engineer", "Full Stack"],
    builderProof: {
      projectsCount: 4,
      deployedProjectsCount: 3,
      hackathonWinsCount: 1,
      challengesCount: 3,
      aiRankPercentile: 15,
      streakDays: 14,
      monthsActiveCount: 8
    },
    aiSummary: "Full-stack engineer building AI applications with React, Next.js, and OpenAI API. 3 deployed projects with responsive UI.",
    whyInterview: [
      {
        claim: "Full-Stack AI capability",
        evidence: "Combines modern Next.js frontend with FastAPI + OpenAI backend."
      }
    ],
    potentialConcerns: [
      "Deep ML infrastructure is limited compared to API-level LLM work."
    ],
    projects: [
      {
        name: "PromptCraft Workspace",
        description: "Visual prompt engineering workbench for LLM teams",
        techStack: ["React", "TypeScript", "OpenAI SDK"],
        usersCount: "150 active users",
        verified: true,
        deployed: true,
        links: { live: "https://promptcraft.app", github: "github.com/priyamehta/promptcraft" }
      }
    ],
    aiAgents: [
      { name: "Support Ticket Router", status: "Active", dailyQueries: 120, stack: "Next.js + OpenAI API", deployedMonthsAgo: 3 }
    ],
    intelligenceCards: [
      {
        title: "Product Engineering Fit",
        signal: "Strong",
        observation: "Builds complete product interfaces over backend APIs.",
        evidence: ["Next.js + Tailwind UI", "Deployed web workspace with 150 users"],
        takeaway: "Ideal candidate for AI product teams needing full-stack execution."
      }
    ]
  },
  {
    id: "cand-3",
    name: "Rahul Kumar",
    avatar: "RK",
    headline: "Lead Backend & Distributed Systems Engineer",
    company: "Amazon",
    location: "Remote",
    workMode: "Remote Only",
    experienceYears: 6,
    noticePeriodDays: 0,
    availability: "Open to Work",
    lastActive: "Today",
    skills: ["Go", "Python", "Docker", "Kubernetes", "PostgreSQL", "Redis", "Kafka", "gRPC", "AWS"],
    primarySkills: ["Go", "Python", "Kubernetes", "Kafka"],
    roleTypes: ["Backend", "Platform Engineering"],
    builderProof: {
      projectsCount: 8,
      deployedProjectsCount: 6,
      hackathonWinsCount: 0,
      challengesCount: 6,
      aiRankPercentile: 22,
      streakDays: 45,
      monthsActiveCount: 12
    },
    aiSummary: "Distributed systems architect with 6 years experience in high-throughput Go and Python microservices at Amazon scale.",
    whyInterview: [
      {
        claim: "Senior Systems Architect",
        evidence: "6 years at Amazon building high-throughput event-driven microservices."
      }
    ],
    potentialConcerns: [
      "AI/LLM experience is foundational; primary strength is systems engineering."
    ],
    projects: [
      {
        name: "GoStream Pipeline",
        description: "Event streaming broker in Go handling 50k msgs/sec",
        techStack: ["Go", "Kafka", "Docker"],
        usersCount: "Production System",
        verified: true,
        deployed: true,
        links: { github: "github.com/rahulkumar/gostream" }
      }
    ],
    aiAgents: [],
    intelligenceCards: [
      {
        title: "Platform Engineering Fit",
        signal: "Elite ★",
        observation: "Top 2% System Design challenge performance with continuous production deployments.",
        evidence: ["Amazon high-scale background", "Go & Kubernetes expert"],
        takeaway: "Ideal for senior backend or platform architecture roles."
      }
    ]
  },
  {
    id: "cand-4",
    name: "Ananya Verma",
    avatar: "AV",
    headline: "Lead Frontend & UI Architect",
    company: "Flipkart",
    location: "Delhi NCR",
    workMode: "Hybrid",
    experienceYears: 7,
    noticePeriodDays: 15,
    availability: "Open to Work",
    lastActive: "Today",
    skills: ["React", "TypeScript", "Next.js", "Tailwind", "GraphQL", "Python", "FastAPI"],
    primarySkills: ["React", "TypeScript", "Next.js"],
    roleTypes: ["Full Stack", "Backend"],
    builderProof: {
      projectsCount: 10,
      deployedProjectsCount: 8,
      hackathonWinsCount: 3,
      challengesCount: 7,
      aiRankPercentile: 5,
      streakDays: 60,
      monthsActiveCount: 14
    },
    aiSummary: "Frontend architect with 7 years specializing in high-performance web applications and design system engines.",
    whyInterview: [
      {
        claim: "Top 5% Frontend Architect",
        evidence: "Built Flipkart core design tokens and micro-frontend platform."
      }
    ],
    potentialConcerns: [],
    projects: [
      {
        name: "DesignSystem Engine",
        description: "Cross-platform design token engine for e-commerce apps",
        techStack: ["TypeScript", "React", "Next.js"],
        usersCount: "1M+ daily users",
        verified: true,
        deployed: true,
        links: { github: "github.com/ananya/design-engine" }
      }
    ],
    aiAgents: [],
    intelligenceCards: []
  },
  {
    id: "cand-5",
    name: "Devansh Patel",
    avatar: "DP",
    headline: "MLOps & Cloud Infrastructure Engineer",
    company: "PhonePe",
    location: "Hyderabad",
    workMode: "Remote",
    experienceYears: 2,
    noticePeriodDays: 30,
    availability: "Open to Select Roles",
    lastActive: "2 days ago",
    skills: ["Python", "FastAPI", "Kubernetes", "Docker", "PyTorch", "AWS", "PostgreSQL"],
    primarySkills: ["Python", "FastAPI", "Kubernetes"],
    roleTypes: ["AI / ML Engineer", "Platform Engineering"],
    builderProof: {
      projectsCount: 5,
      deployedProjectsCount: 4,
      hackathonWinsCount: 1,
      challengesCount: 4,
      aiRankPercentile: 12,
      streakDays: 18,
      monthsActiveCount: 6
    },
    aiSummary: "MLOps engineer focused on model deployment pipelines, Kubernetes orchestration, and GPU inference scaling.",
    whyInterview: [
      {
        claim: "Automated ML Deployments",
        evidence: "Deployed 4 PyTorch inference pipelines on EKS."
      }
    ],
    potentialConcerns: [],
    projects: [],
    aiAgents: [],
    intelligenceCards: []
  },
  {
    id: "cand-6",
    name: "Sneha Reddy",
    avatar: "SR",
    headline: "Senior AI Researcher & LLM Specialist",
    company: "CRED",
    location: "Pune",
    workMode: "Remote Only",
    experienceYears: 5,
    noticePeriodDays: 0,
    availability: "Open to Work",
    lastActive: "Today",
    skills: ["Python", "PyTorch", "LangChain", "LlamaIndex", "FastAPI", "Docker", "PostgreSQL"],
    primarySkills: ["Python", "PyTorch", "LangChain", "LlamaIndex"],
    roleTypes: ["AI / ML Engineer"],
    builderProof: {
      projectsCount: 9,
      deployedProjectsCount: 6,
      hackathonWinsCount: 4,
      challengesCount: 8,
      aiRankPercentile: 3,
      streakDays: 90,
      monthsActiveCount: 18
    },
    aiSummary: "Top 3% AI Researcher specializing in fine-tuning open-source LLMs, RAG architectures, and custom embedding pipelines.",
    whyInterview: [
      {
        claim: "Elite AI Practitioner",
        evidence: "4 hackathon wins and Top 3% global AI Challenge ranking."
      }
    ],
    potentialConcerns: [],
    projects: [],
    aiAgents: [],
    intelligenceCards: []
  }
];

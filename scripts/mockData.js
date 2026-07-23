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
    links: {
      github: "https://github.com/arjunsharma-ml",
      linkedin: "https://linkedin.com/in/arjunsharma-ml",
      portfolio: "https://arjunsharma.dev"
    },
    interviewReadiness: {
      completed: true,
      score: 88,
      assessedOn: "Jul 20, 2026"
    },
    builderProof: {
      projectsCount: 6,
      deployedProjectsCount: 3,
      hackathonWinsCount: 2,
      challengesCount: 4,
      aiRankPercentile: 8,
      streakDays: 23,
      monthsActiveCount: 10
    },
    fitVerdict: {
      status: "Strong Fit",
      reason: "4 years building production ML APIs with FastAPI & LangChain; deployed 2 live AI agents with 340+ daily users."
    },
    aiSummary: "Backend engineer with 4 years in production ML systems. Deployed 2 LLM agents with 340+ daily active users. Top 8% AI Challenge rank.",
    whyInterview: [
      {
        claim: "Top 8% AI Challenge Rank",
        evidence: "Ranked #8 out of 100+ candidates in LLM Agent & RAG Deployment Benchmark."
      },
      {
        claim: "Production API Velocity",
        evidence: "Built TalentGraph AI & CodeReview bot handling 340+ daily production queries."
      },
      {
        claim: "2-Time Hackathon Champion",
        evidence: "Won 1st place in 2 Agentic AI Hackathons (2023, 2024)."
      }
    ],
    potentialConcerns: [
      "No visible team-lead experience — best suited for Senior IC role; team lead capability needs interview check.",
      "Frontend scope limited to basic React components — verify full-stack depth if required."
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
    links: {
      github: "https://github.com/priyamehta-dev",
      linkedin: "https://linkedin.com/in/priyamehta-dev",
      portfolio: "https://priyamehta.io"
    },
    interviewReadiness: {
      completed: true,
      score: 82,
      assessedOn: "Jul 18, 2026"
    },
    builderProof: {
      projectsCount: 4,
      deployedProjectsCount: 3,
      hackathonWinsCount: 1,
      challengesCount: 3,
      aiRankPercentile: 15,
      streakDays: 14,
      monthsActiveCount: 8
    },
    fitVerdict: {
      status: "Strong Fit",
      reason: "Full-stack AI developer with 3 years experience combining Next.js frontend UI with FastAPI + OpenAI SDK backend."
    },
    aiSummary: "Full-stack engineer building AI applications with React, Next.js, and OpenAI API. 3 deployed projects with responsive UI.",
    whyInterview: [
      {
        claim: "Proven Full-Stack AI Delivery",
        evidence: "Shipped PromptCraft Workspace serving 150+ active monthly users."
      },
      {
        claim: "Top 15% AI Challenge Rank",
        evidence: "Ranked Top 15% in Full-Stack LLM Application Benchmark."
      },
      {
        claim: "75% Deployment Ratio",
        evidence: "3 out of 4 built projects are deployed live with verified user traffic."
      }
    ],
    potentialConcerns: [
      "Custom ML model training experience is limited; primary strength is API-level LLM product integration.",
      "30-day notice period — check if immediate joining is required."
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
    links: {
      github: "https://github.com/rahulkumar-backend",
      linkedin: "https://linkedin.com/in/rahulkumar-backend",
      portfolio: "https://rahulkumar.tech"
    },
    interviewReadiness: {
      completed: true,
      score: 94,
      assessedOn: "Jul 22, 2026"
    },
    builderProof: {
      projectsCount: 8,
      deployedProjectsCount: 6,
      hackathonWinsCount: 0,
      challengesCount: 6,
      aiRankPercentile: 22,
      streakDays: 45,
      monthsActiveCount: 12
    },
    fitVerdict: {
      status: "Good Fit",
      reason: "6 years at Amazon building high-throughput distributed Go & Python services; 0-day immediate joiner."
    },
    aiSummary: "Distributed systems architect with 6 years experience in high-throughput Go and Python microservices at Amazon scale.",
    whyInterview: [
      {
        claim: "High-Scale Systems Architecture",
        evidence: "Architected GoStream Event Pipeline handling 50k msgs/sec at Amazon scale."
      },
      {
        claim: "Immediate 0-Day Joiner",
        evidence: "Notice period is 0 days; available for instant onboarding."
      },
      {
        claim: "Top 2% System Design Performance",
        evidence: "Scored in Top 2% across Distributed Systems & Kubernetes architecture challenges."
      }
    ],
    potentialConcerns: [
      "AI/LLM framework experience is foundational; core expertise is distributed systems engineering."
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
    links: {
      github: "https://github.com/ananya-verma",
      linkedin: "https://linkedin.com/in/ananyaverma-ui",
      portfolio: "https://ananya.design"
    },
    interviewReadiness: {
      completed: true,
      score: 91,
      assessedOn: "Jul 21, 2026"
    },
    builderProof: {
      projectsCount: 10,
      deployedProjectsCount: 8,
      hackathonWinsCount: 3,
      challengesCount: 7,
      aiRankPercentile: 5,
      streakDays: 60,
      monthsActiveCount: 14
    },
    fitVerdict: {
      status: "Strong Fit",
      reason: "7 years UI architect at Flipkart building micro-frontend engines and design systems serving 1M+ daily users."
    },
    aiSummary: "Frontend architect with 7 years specializing in high-performance web applications and design system engines.",
    whyInterview: [
      {
        claim: "Top 5% Global UI Architect",
        evidence: "Ranked Top 5% in Frontend Architecture & Performance benchmarks."
      },
      {
        claim: "1M+ User Scale Impact",
        evidence: "Created DesignSystem Engine adopted across Flipkart's web platform serving 1M+ users."
      },
      {
        claim: "3-Time Hackathon Winner",
        evidence: "Secured 1st place in 3 competitive Web Performance & React hackathons."
      }
    ],
    potentialConcerns: [
      "Primarily frontend & UI architecture focused — test backend FastAPI capabilities during technical interview."
    ],
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
    links: {
      github: "https://github.com/devansh-patel",
      linkedin: "https://linkedin.com/in/devansh-mlops"
    },
    interviewReadiness: {
      completed: false,
      score: 0,
      assessedOn: ""
    },
    builderProof: {
      projectsCount: 5,
      deployedProjectsCount: 4,
      hackathonWinsCount: 1,
      challengesCount: 4,
      aiRankPercentile: 12,
      streakDays: 18,
      monthsActiveCount: 6
    },
    fitVerdict: {
      status: "Good Fit",
      reason: "2 years experience deploying PyTorch model pipelines on EKS with 80% project deployment ratio."
    },
    aiSummary: "MLOps engineer focused on model deployment pipelines, Kubernetes orchestration, and GPU inference scaling.",
    whyInterview: [
      {
        claim: "Top 12% MLOps Benchmark",
        evidence: "Scored Top 12% in Kubernetes Model Deployment & GPU Inference challenges."
      },
      {
        claim: "Automated ML Deployments",
        evidence: "Deployed 4 PyTorch inference APIs on PhonePe Kubernetes infrastructure."
      },
      {
        claim: "Hackathon Winner",
        evidence: "Won 1st place in Cloud Native ML Infrastructure Challenge (2024)."
      }
    ],
    potentialConcerns: [
      "2 years total experience — verify independent distributed system architecture capacity."
    ],
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
    links: {
      github: "https://github.com/sneha-reddy",
      linkedin: "https://linkedin.com/in/snehareddy-ai",
      portfolio: "https://snehareddy.ai"
    },
    interviewReadiness: {
      completed: true,
      score: 96,
      assessedOn: "Jul 23, 2026"
    },
    builderProof: {
      projectsCount: 9,
      deployedProjectsCount: 6,
      hackathonWinsCount: 4,
      challengesCount: 8,
      aiRankPercentile: 3,
      streakDays: 90,
      monthsActiveCount: 18
    },
    fitVerdict: {
      status: "Strong Fit",
      reason: "Top 3% AI Researcher with 5 years fine-tuning open-source LLMs and building RAG pipelines; 0-day joiner."
    },
    aiSummary: "Top 3% AI Researcher specializing in fine-tuning open-source LLMs, RAG architectures, and custom embedding pipelines.",
    whyInterview: [
      {
        claim: "Top 3% Global AI Challenge Rank",
        evidence: "Ranked #3 out of 100+ candidates in LLM Fine-Tuning & Vector Search benchmark."
      },
      {
        claim: "4-Time Hackathon Champion",
        evidence: "4 first-place wins across Generative AI & RAG Hackathons."
      },
      {
        claim: "Immediate 0-Day Joiner",
        evidence: "Notice period is 0 days; available for immediate remote hire."
      }
    ],
    potentialConcerns: [
      "Deep specialization in AI research — confirm interest in day-to-day web application engineering."
    ],
    projects: [],
    aiAgents: [],
    intelligenceCards: []
  }
];

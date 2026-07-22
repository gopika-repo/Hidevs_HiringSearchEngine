/* ==========================================================================
   HiDevs Hiring Search Engine — Mock Data Engine
   Rich candidates with builder proof, AI agents, hackathons, and intelligence
   ========================================================================== */

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
      },
      {
        name: "RAG Pipeline for Legal Docs",
        description: "Vector indexing engine using LlamaIndex and Qdrant",
        techStack: ["Python", "LlamaIndex", "Qdrant"],
        usersCount: "Internal Beta",
        verified: true,
        deployed: false,
        links: { github: "github.com/arjunsharma/legal-rag" }
      }
    ],
    aiAgents: [
      { name: "TalentGraph Analyzer", status: "Active", dailyQueries: 340, stack: "LangChain + GPT-4", deployedMonthsAgo: 4 },
      { name: "Code Review Summarizer", status: "Active", dailyQueries: 89, stack: "Claude API + FastAPI", deployedMonthsAgo: 8 }
    ],
    hackathons: [
      { title: "HiDevs National AI Hackathon 2024", placement: "1st Place", project: "CodeGraph", duration: "72 hours", teamSize: 3 },
      { title: "HiDevs Startup Sprint 2023", placement: "2nd Place", project: "CodeReview Bot", duration: "48 hours", teamSize: 1 }
    ],
    challenges: [
      { track: "AI / LLM Track", rankPercentile: 8, completedCount: 14 },
      { track: "Backend / API Track", rankPercentile: 15, completedCount: 9 },
      { track: "Algorithm Track", rankPercentile: 31, completedCount: 5 }
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
        evidence: ["LangChain: First commit Jan 2024 → Deployed Mar 2024 (60 days)", "FastAPI: 61 days time-to-deployment", "Avg velocity: 64 days per stack"],
        takeaway: "Productive in new technologies within 2 months."
      },
      {
        title: "Deployment Experience",
        signal: "Strong",
        observation: "6 of 8 projects live in production with active users.",
        evidence: ["Infrastructure: AWS, GCP, Railway", "2 AI agents with 340+ daily queries", "CI/CD automated pipelines"],
        takeaway: "Demonstrated and repeated production delivery."
      }
    ],
    github: { handle: "arjunsharma", starsCount: 340, reposCount: 24, activityMonthsCount: 10 }
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
      },
      {
        claim: "Strong product orientation",
        evidence: "All projects feature end-to-end user interfaces and active deployments."
      }
    ],
    potentialConcerns: [
      "Deep ML infrastructure (PyTorch/Custom fine-tuning) is limited compared to API-level LLM work."
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
    hackathons: [
      { title: "HiDevs GenAI Sprint 2024", placement: "2nd Place", project: "PromptCraft", duration: "48 hours", teamSize: 2 }
    ],
    challenges: [
      { track: "AI / LLM Track", rankPercentile: 15, completedCount: 8 },
      { track: "Frontend Track", rankPercentile: 10, completedCount: 6 }
    ],
    intelligenceCards: [
      {
        title: "Product Engineering Fit",
        signal: "Strong",
        observation: "Builds complete product interfaces over backend APIs.",
        evidence: ["Next.js + Tailwind UI", "Deployed web workspace with 150 users"],
        takeaway: "Ideal candidate for AI product teams needing full-stack execution."
      }
    ],
    github: { handle: "priyamehta", starsCount: 180, reposCount: 16, activityMonthsCount: 8 }
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
      },
      {
        claim: "Immediate Joiner",
        evidence: "0 days notice period, ready for immediate backend leadership."
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
    hackathons: [],
    challenges: [
      { track: "Backend / API Track", rankPercentile: 4, completedCount: 18 },
      { track: "System Design Track", rankPercentile: 2, completedCount: 12 }
    ],
    intelligenceCards: [
      {
        title: "Platform Engineering Fit",
        signal: "Elite ★",
        observation: "Top 2% System Design challenge performance with continuous production deployments.",
        evidence: ["Amazon high-scale background", "Go & Kubernetes expert"],
        takeaway: "Ideal for senior backend or platform architecture roles."
      }
    ],
    github: { handle: "rahulkumar", starsCount: 620, reposCount: 32, activityMonthsCount: 12 }
  }
];

export const mockQuickFilters = [
  { id: "open_work", label: "Open to Work", icon: "●" },
  { id: "remote", label: "Remote Ready", icon: "🌐" },
  { id: "immediate", label: "Immediate Joiners (≤15d)", icon: "⚡" },
  { id: "active_builders", label: "Active Builders (30d)", icon: "🔥" },
  { id: "hackathon_winners", label: "Hackathon Winners", icon: "🏆" },
  { id: "ai_engineers", label: "AI Engineers", icon: "🤖" },
  { id: "top_ranked", label: "Top Ranked (Top 25%)", icon: "★" }
];

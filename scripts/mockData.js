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
    employment: {
      types: ["Full-time"],
      openToWork: true,
      noticePeriodDays: 15,
      salaryRange: { min: 30, max: 50, currency: "LPA" },
      culturePrefs: ["Small team (< 20)", "Remote-first", "High ownership", "Fast-moving startup"],
      preferredCompanySize: "Startup / Series A-B",
      preferredIndustry: ["AI / ML", "Developer Tools", "FinTech"],
      willingToRelocate: false,
      openToContract: false
    },
    skills: [
      { name: "Python", score: 94, basis: "Assessed via 6 production FastAPI services + Top 5% Python LeetPrompt" },
      { name: "FastAPI", score: 90, basis: "4 years production API deployment at Swiggy scale" },
      { name: "LangChain", score: 88, basis: "Built TalentGraph AI RAG pipeline with 340+ DAU" },
      { name: "PyTorch", score: 82, basis: "Model fine-tuning benchmark assessment" }
    ],
    primarySkills: ["Python", "FastAPI", "LangChain"],
    techStack: {
      preferred: [
        { name: "Python", pct: 94, color: "#3776AB" },
        { name: "FastAPI", pct: 90, color: "#009688" },
        { name: "LangChain", pct: 88, color: "#6E4FF2" },
        { name: "PyTorch", pct: 82, color: "#EE4C2C" }
      ],
      additional: ["Redis", "PostgreSQL", "Docker", "AWS Lambda", "Celery", "Pinecone"],
      notes: "Primary stack is Python ML APIs. Comfortable with async FastAPI patterns and RAG vector pipelines."
    },
    roleTypes: ["AI / ML Engineer", "Backend"],
    contact: {
      email: "arjun.sharma@hidevs.io",
      phone: "+91 98201 34567"
    },
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
    about: "Backend-leaning ML engineer who's spent the last 4 years shipping production LLM features at consumer scale. Prefers small, fast-moving teams and has a strong bias toward deploying over prototyping.",
    whyInterview: [
      { claim: "Top 8% AI Challenge Rank", evidence: "Ranked #8 out of 100+ candidates in LLM Agent & RAG Deployment Benchmark." },
      { claim: "Production API Velocity", evidence: "Built TalentGraph AI & CodeReview bot handling 340+ daily production queries." },
      { claim: "2-Time Hackathon Champion", evidence: "Won 1st place in 2 Agentic AI Hackathons (2023, 2024)." }
    ],
    potentialConcerns: [
      "No visible team-lead experience — best suited for Senior IC role; team lead capability needs interview check.",
      "Frontend scope limited to basic React components — verify full-stack depth if required."
    ],
    experience: [
      { title: "Senior ML Engineer", company: "Swiggy", duration: "2023 - Present", highlights: ["Deployed LLM RAG recommendation engine handling 120k daily queries.", "Optimized FastAPI model inference latency from 450ms to 120ms."] },
      { title: "Backend Engineer", company: "Zomato", duration: "2021 - 2023", highlights: ["Architected order routing microservices in Python & Redis."] }
    ],
    projects: [
      { name: "TalentGraph AI", description: "AI-powered talent matching engine using LangChain + RAG", techStack: ["Python", "LangChain", "FastAPI"], usersCount: "200+ active users", verified: true, deployed: true, links: { live: "https://talentgraph.demo", github: "github.com/arjunsharma/talentgraph" } },
      { name: "CodeReview Summarizer", description: "Automated PR summarize bot leveraging Claude API & FastAPI", techStack: ["Python", "FastAPI", "Claude API"], usersCount: "89 active users", verified: true, deployed: true, links: { live: "#", github: "github.com/arjunsharma/codereview-bot" } }
    ],
    hackathons: [
      { name: "Agentic AI Hackathon 2024", rank: "1st Place (Winner)", date: "Mar 2024" },
      { name: "HiDevs LLM Challenge #4", rank: "Top 8 Percentile", date: "Jan 2024" }
    ],
    intelligenceCards: [
      { title: "Builder Momentum", signal: "Strong ↑", observation: "Project output has grown consistently across 3 years with increasing complexity.", takeaway: "Upward trajectory — best work is recent and accelerating." }
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
    employment: {
      types: ["Full-time", "Contract"],
      openToWork: true,
      noticePeriodDays: 30,
      salaryRange: { min: 25, max: 40, currency: "LPA" },
      culturePrefs: ["Product-driven culture", "Design + Engineering parity", "Collaborative"],
      preferredCompanySize: "Series B-D / Growth Stage",
      preferredIndustry: ["FinTech", "AI Products", "SaaS"],
      willingToRelocate: true,
      openToContract: true
    },
    skills: [
      { name: "React", score: 92, basis: "3 years building enterprise Next.js & React dashboards" },
      { name: "TypeScript", score: 89, basis: "Strong type-safe application architecture" },
      { name: "Python", score: 85, basis: "FastAPI & OpenAI API integration" }
    ],
    primarySkills: ["React", "TypeScript", "Python", "FastAPI"],
    techStack: {
      preferred: [
        { name: "React", pct: 92, color: "#61DAFB" },
        { name: "TypeScript", pct: 89, color: "#3178C6" },
        { name: "Python", pct: 85, color: "#3776AB" },
        { name: "FastAPI", pct: 80, color: "#009688" }
      ],
      additional: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL", "OpenAI SDK", "Vercel"],
      notes: "Strong UI-to-API product engineer. Prefers Next.js + FastAPI stack for AI product development."
    },
    roleTypes: ["AI / ML Engineer", "Full Stack"],
    contact: { email: "priya.mehta@hidevs.io", phone: "+91 97301 22456" },
    links: { github: "https://github.com/priyamehta-dev", linkedin: "https://linkedin.com/in/priyamehta-dev", portfolio: "https://priyamehta.io" },
    interviewReadiness: { completed: true, score: 82, assessedOn: "Jul 18, 2026" },
    builderProof: { projectsCount: 4, deployedProjectsCount: 3, hackathonWinsCount: 1, challengesCount: 3, aiRankPercentile: 15, streakDays: 14, monthsActiveCount: 8 },
    fitVerdict: { status: "Strong Fit", reason: "Full-stack AI developer with 3 years experience combining Next.js frontend UI with FastAPI + OpenAI SDK backend." },
    aiSummary: "Full-stack engineer building AI applications with React, Next.js, and OpenAI API. 3 deployed projects with responsive UI.",
    about: "Product-minded full stack engineer who loves bridging slick frontend UI with intelligent backend APIs. Experienced in payments & fintech workflows.",
    whyInterview: [
      { claim: "Proven Full-Stack AI Delivery", evidence: "Shipped PromptCraft Workspace serving 150+ active monthly users." },
      { claim: "Top 15% AI Challenge Rank", evidence: "Ranked Top 15% in Full-Stack LLM Application Benchmark." }
    ],
    potentialConcerns: [
      "Custom ML model training experience is limited; primary strength is API-level LLM product integration.",
      "30-day notice period — check if immediate joining is required."
    ],
    experience: [
      { title: "Full Stack Engineer", company: "Razorpay", duration: "2022 - Present", highlights: ["Built merchant onboarding dashboard in Next.js & TypeScript."] }
    ],
    projects: [
      { name: "PromptCraft Workspace", description: "Visual prompt engineering workbench for LLM teams", techStack: ["React", "TypeScript", "OpenAI SDK"], usersCount: "150 active users", verified: true, deployed: true, links: { live: "https://promptcraft.app", github: "github.com/priyamehta/promptcraft" } }
    ],
    hackathons: [{ name: "FinTech AI Sprint 2023", rank: "1st Place", date: "Nov 2023" }],
    intelligenceCards: [{ title: "Product Engineering Fit", signal: "Strong", observation: "Builds complete product interfaces over backend APIs.", takeaway: "Ideal candidate for AI product teams needing full-stack execution." }]
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
    employment: {
      types: ["Full-time"],
      openToWork: true,
      noticePeriodDays: 0,
      salaryRange: { min: 50, max: 90, currency: "LPA" },
      culturePrefs: ["Engineering-first culture", "High technical bar", "Zero-to-one problems"],
      preferredCompanySize: "Enterprise or FAANG-scale",
      preferredIndustry: ["Cloud Infrastructure", "Developer Tools", "Platform Engineering"],
      willingToRelocate: false,
      openToContract: false
    },
    skills: [
      { name: "Go", score: 96, basis: "Architected GoStream event broker handling 50k msgs/sec at Amazon" },
      { name: "Kubernetes", score: 92, basis: "Production EKS deployment & cloud infra" },
      { name: "Python", score: 88, basis: "Backend API microservices" }
    ],
    primarySkills: ["Go", "Python", "Kubernetes", "Kafka"],
    techStack: {
      preferred: [
        { name: "Go", pct: 96, color: "#00ACD7" },
        { name: "Kubernetes", pct: 92, color: "#326CE5" },
        { name: "Kafka", pct: 89, color: "#231F20" },
        { name: "Python", pct: 88, color: "#3776AB" }
      ],
      additional: ["gRPC", "Terraform", "AWS EKS", "Prometheus", "Redis Streams", "Argo Workflows"],
      notes: "Elite distributed systems engineer. Thrives in high-throughput event-driven backend infrastructure."
    },
    roleTypes: ["Backend", "Platform Engineering"],
    contact: { email: "rahul.kumar@hidevs.io", phone: "+91 90001 78901" },
    links: { github: "https://github.com/rahulkumar-backend", linkedin: "https://linkedin.com/in/rahulkumar-backend", portfolio: "https://rahulkumar.tech" },
    interviewReadiness: { completed: true, score: 94, assessedOn: "Jul 22, 2026" },
    builderProof: { projectsCount: 8, deployedProjectsCount: 6, hackathonWinsCount: 0, challengesCount: 6, aiRankPercentile: 2, streakDays: 45, monthsActiveCount: 12 },
    fitVerdict: { status: "Good Fit", reason: "6 years at Amazon building high-throughput distributed Go & Python services; 0-day immediate joiner." },
    aiSummary: "Distributed systems architect with 6 years experience in high-throughput Go and Python microservices at Amazon scale.",
    about: "Systems engineer passionate about extreme throughput, fault tolerance, and zero-downtime infrastructure. Experienced in high-volume event streaming.",
    whyInterview: [
      { claim: "High-Scale Systems Architecture", evidence: "Architected GoStream Event Pipeline handling 50k msgs/sec at Amazon scale." },
      { claim: "Immediate 0-Day Joiner", evidence: "Notice period is 0 days; available for instant onboarding." }
    ],
    potentialConcerns: ["AI/LLM framework experience is foundational; core expertise is distributed systems engineering."],
    experience: [{ title: "SDE II", company: "Amazon", duration: "2020 - 2026", highlights: ["Led tier-1 messaging engine team for AWS internal tools."] }],
    projects: [{ name: "GoStream Pipeline", description: "Event streaming broker in Go handling 50k msgs/sec", techStack: ["Go", "Kafka", "Docker"], usersCount: "Production System", verified: true, deployed: true, links: { github: "github.com/rahulkumar/gostream" } }],
    hackathons: [{ name: "AWS Cloud Architecture Cup", rank: "Top 2 Percentile", date: "Aug 2023" }],
    intelligenceCards: [{ title: "Platform Engineering Fit", signal: "Elite ★", observation: "Top 2% System Design challenge performance.", takeaway: "Ideal for senior backend or platform architecture roles." }]
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
    employment: {
      types: ["Full-time"],
      openToWork: true,
      noticePeriodDays: 15,
      salaryRange: { min: 40, max: 70, currency: "LPA" },
      culturePrefs: ["Design-centric", "Cross-functional teams", "Structured processes"],
      preferredCompanySize: "Mid-size (200-2000)",
      preferredIndustry: ["E-commerce", "Consumer Tech", "SaaS"],
      willingToRelocate: false,
      openToContract: true
    },
    skills: [
      { name: "React", score: 97, basis: "Built Flipkart core design token engine for 1M+ daily users" },
      { name: "TypeScript", score: 95, basis: "7 years enterprise UI architecture" },
      { name: "Next.js", score: 91, basis: "SSR web performance optimization" }
    ],
    primarySkills: ["React", "TypeScript", "Next.js"],
    techStack: {
      preferred: [
        { name: "React", pct: 97, color: "#61DAFB" },
        { name: "TypeScript", pct: 95, color: "#3178C6" },
        { name: "Next.js", pct: 91, color: "#000000" },
        { name: "CSS / Design Systems", pct: 93, color: "#663399" }
      ],
      additional: ["Storybook", "Radix UI", "Framer Motion", "GraphQL", "Figma Tokens", "Chromatic"],
      notes: "Frontend architect specialising in component systems and rendering performance. Not a backend-first profile."
    },
    roleTypes: ["Full Stack", "Backend"],
    contact: { email: "ananya.verma@hidevs.io", phone: "+91 88001 56789" },
    links: { github: "https://github.com/ananya-verma", linkedin: "https://linkedin.com/in/ananyaverma-ui", portfolio: "https://ananya.design" },
    interviewReadiness: { completed: true, score: 91, assessedOn: "Jul 21, 2026" },
    builderProof: { projectsCount: 10, deployedProjectsCount: 8, hackathonWinsCount: 3, challengesCount: 7, aiRankPercentile: 5, streakDays: 60, monthsActiveCount: 14 },
    fitVerdict: { status: "Strong Fit", reason: "7 years UI architect at Flipkart building micro-frontend engines and design systems serving 1M+ daily users." },
    aiSummary: "Frontend architect with 7 years specializing in high-performance web applications and design system engines.",
    about: "Design system architect and performance obsessive. Specialized in micro-frontends, rendering optimization, and component accessibility.",
    whyInterview: [
      { claim: "Top 5% Global UI Architect", evidence: "Ranked Top 5% in Frontend Architecture & Performance benchmarks." },
      { claim: "1M+ User Scale Impact", evidence: "Created DesignSystem Engine adopted across Flipkart's web platform serving 1M+ users." }
    ],
    potentialConcerns: ["Primarily frontend & UI architecture focused — test backend FastAPI capabilities during technical interview."],
    experience: [{ title: "Lead Frontend Engineer", company: "Flipkart", duration: "2019 - Present", highlights: ["Maintained design token pipeline across 14 web products."] }],
    projects: [{ name: "DesignSystem Engine", description: "Cross-platform design token engine for e-commerce apps", techStack: ["TypeScript", "React", "Next.js"], usersCount: "1M+ daily users", verified: true, deployed: true, links: { github: "github.com/ananya/design-engine" } }],
    hackathons: [{ name: "React India Hackathon", rank: "1st Place", date: "Oct 2023" }],
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
    employment: {
      types: ["Full-time", "Internship"],
      openToWork: true,
      noticePeriodDays: 30,
      salaryRange: { min: 15, max: 28, currency: "LPA" },
      culturePrefs: ["Learning culture", "Mentorship access", "Cloud-native teams"],
      preferredCompanySize: "Startup or Hyperscaler",
      preferredIndustry: ["AI / ML", "Cloud", "FinTech"],
      willingToRelocate: true,
      openToContract: false
    },
    skills: [
      { name: "Python", score: 82, basis: "PyTorch model training scripts" },
      { name: "Kubernetes", score: 86, basis: "4 model inference deployments on EKS" }
    ],
    primarySkills: ["Python", "FastAPI", "Kubernetes"],
    techStack: {
      preferred: [
        { name: "Python", pct: 82, color: "#3776AB" },
        { name: "Kubernetes", pct: 86, color: "#326CE5" },
        { name: "PyTorch", pct: 78, color: "#EE4C2C" },
        { name: "FastAPI", pct: 74, color: "#009688" }
      ],
      additional: ["Kubeflow", "MLflow", "Argo Workflows", "Prometheus", "Grafana", "AWS EKS"],
      notes: "MLOps & cloud infra focus. Strong on model serving pipelines, lighter on pure ML research."
    },
    roleTypes: ["AI / ML Engineer", "Platform Engineering"],
    contact: { email: "devansh.patel@hidevs.io", phone: "+91 91500 34501" },
    links: { github: "https://github.com/devansh-patel", linkedin: "https://linkedin.com/in/devansh-mlops" },
    interviewReadiness: { completed: false, score: 0, assessedOn: "" },
    builderProof: { projectsCount: 5, deployedProjectsCount: 4, hackathonWinsCount: 1, challengesCount: 4, aiRankPercentile: 12, streakDays: 18, monthsActiveCount: 6 },
    fitVerdict: { status: "Good Fit", reason: "2 years experience deploying PyTorch model pipelines on EKS with 80% project deployment ratio." },
    aiSummary: "MLOps engineer focused on model deployment pipelines, Kubernetes orchestration, and GPU inference scaling.",
    about: "Cloud-native ML infrastructure enthusiast. Focuses on automating PyTorch model serving pipelines and optimizing GPU cluster workloads.",
    whyInterview: [
      { claim: "Top 12% MLOps Benchmark", evidence: "Scored Top 12% in Kubernetes Model Deployment & GPU Inference challenges." },
      { claim: "Automated ML Deployments", evidence: "Deployed 4 PyTorch inference APIs on PhonePe Kubernetes infrastructure." }
    ],
    potentialConcerns: ["2 years total experience — verify independent distributed system architecture capacity."],
    experience: [{ title: "MLOps Engineer", company: "PhonePe", duration: "2024 - Present", highlights: ["Configured Kubeflow pipelines for transaction fraud ML models."] }],
    projects: [],
    hackathons: [{ name: "Cloud Native ML Challenge", rank: "1st Place", date: "Jan 2024" }],
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
    employment: {
      types: ["Full-time", "Contract"],
      openToWork: true,
      noticePeriodDays: 0,
      salaryRange: { min: 45, max: 80, currency: "LPA" },
      culturePrefs: ["Research-driven", "Academic + industry hybrid", "Autonomous work"],
      preferredCompanySize: "AI-focused lab or Series B+",
      preferredIndustry: ["AI Research", "LLM Products", "Healthcare AI"],
      willingToRelocate: false,
      openToContract: true
    },
    skills: [
      { name: "Python", score: 98, basis: "Fine-tuned Llama 3 & Mistral 7B for financial RAG" },
      { name: "PyTorch", score: 95, basis: "5 years deep learning & embedding pipeline development" },
      { name: "LangChain", score: 92, basis: "Multi-agent graph architectures" }
    ],
    primarySkills: ["Python", "PyTorch", "LangChain", "LlamaIndex"],
    techStack: {
      preferred: [
        { name: "Python", pct: 98, color: "#3776AB" },
        { name: "PyTorch", pct: 95, color: "#EE4C2C" },
        { name: "LangChain", pct: 92, color: "#6E4FF2" },
        { name: "LlamaIndex", pct: 90, color: "#FF6B35" }
      ],
      additional: ["HuggingFace", "FAISS", "Qdrant", "vLLM", "LoRA / QLoRA", "Weights & Biases"],
      notes: "Deep AI researcher. Best for LLM fine-tuning, embedding pipeline, and RAG-specialised AI roles."
    },
    roleTypes: ["AI / ML Engineer"],
    contact: { email: "sneha.reddy@hidevs.io", phone: "+91 93300 12345" },
    links: { github: "https://github.com/sneha-reddy", linkedin: "https://linkedin.com/in/snehareddy-ai", portfolio: "https://snehareddy.ai" },
    interviewReadiness: { completed: true, score: 96, assessedOn: "Jul 23, 2026" },
    builderProof: { projectsCount: 9, deployedProjectsCount: 6, hackathonWinsCount: 4, challengesCount: 8, aiRankPercentile: 3, streakDays: 90, monthsActiveCount: 18 },
    fitVerdict: { status: "Strong Fit", reason: "Top 3% AI Researcher with 5 years fine-tuning open-source LLMs and building RAG pipelines; 0-day joiner." },
    aiSummary: "Top 3% AI Researcher specializing in fine-tuning open-source LLMs, RAG architectures, and custom embedding pipelines.",
    about: "Applied AI researcher dedicated to making open-source LLMs performant for vertical domain tasks. Experienced in quantization and vector search.",
    whyInterview: [
      { claim: "Top 3% Global AI Challenge Rank", evidence: "Ranked #3 out of 100+ candidates in LLM Fine-Tuning & Vector Search benchmark." },
      { claim: "4-Time Hackathon Champion", evidence: "4 first-place wins across Generative AI & RAG Hackathons." }
    ],
    potentialConcerns: ["Deep specialization in AI research — confirm interest in day-to-day web application engineering."],
    experience: [{ title: "Senior AI Scientist", company: "CRED", duration: "2021 - Present", highlights: ["Built internal LLM agent assistant used by 400+ employees."] }],
    projects: [],
    hackathons: [
      { name: "GenAI World Hackathon", rank: "1st Place", date: "Feb 2024" },
      { name: "Vector Search Open Cup", rank: "1st Place", date: "Nov 2023" }
    ],
    intelligenceCards: []
  },
  // Candidates 7 - 50 generated with realistic spread across roles, experience, notice periods, and scores
  ...Array.from({ length: 44 }, (_, i) => {
    const idx = i + 7;
    const roles = [["AI / ML Engineer", "Backend"], ["Full Stack"], ["Backend", "Platform Engineering"], ["AI / ML Engineer"], ["Full Stack", "Backend"]];
    const locations = ["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Chennai", "Remote"];
    const workModes = ["Remote", "Hybrid", "Remote Only"];
    const availabilities = ["Open to Work", "Open to Select Roles", "Not Available"];
    const companies = ["Zomato", "Paytm", "MakeMyTrip", "Urban Company", "Ola Cabs", "Postman", "Groww", "Unacademy", "Nykaa", "InMobi"];
    const techStacks = [["Python", "FastAPI", "Docker"], ["React", "TypeScript", "Next.js"], ["Go", "Kubernetes", "Kafka"], ["PyTorch", "LangChain", "Python"]];
    const stackColors = {
      "Python": "#3776AB", "FastAPI": "#009688", "Docker": "#2496ED",
      "React": "#61DAFB", "TypeScript": "#3178C6", "Next.js": "#000000",
      "Go": "#00ACD7", "Kubernetes": "#326CE5", "Kafka": "#231F20",
      "PyTorch": "#EE4C2C", "LangChain": "#6E4FF2"
    };
    const additionalSkillsMap = {
      0: ["Redis", "PostgreSQL", "AWS Lambda", "Celery"],
      1: ["Storybook", "GraphQL", "Figma", "Vercel"],
      2: ["gRPC", "Terraform", "Prometheus", "Argo Workflows"],
      3: ["HuggingFace", "FAISS", "vLLM", "Weights & Biases"]
    };
    
    const roleSel = roles[i % roles.length];
    const locSel = locations[i % locations.length];
    const wmSel = workModes[i % workModes.length];
    const avSel = availabilities[i % availabilities.length];
    const compSel = companies[i % companies.length];
    const stackSel = techStacks[i % techStacks.length];
    const expYrs = (i % 8) + 1;
    const rankPct = Math.min(95, Math.floor(5 + (i * 2.1)));
    const noticeDays = (i % 3) === 0 ? 0 : ((i % 2) === 0 ? 15 : 30);
    const mockScore = Math.floor(65 + (i % 32));
    const isCompleted = i % 4 !== 0;

    return {
      id: `cand-${idx}`,
      name: `Candidate ${idx} (${['Rohan', 'Kavya', 'Vikram', 'Aditi', 'Siddharth', 'Meera', 'Aditya', 'Pooja', 'Tanmay', 'Divya'][i % 10]} ${['Gupta', 'Nair', 'Malhotra', 'Sen', 'Joshi', 'Kapoor', 'Rao', 'Bhat', 'Saxena', 'Iyer'][i % 10]})`,
      avatar: `${['RG', 'KN', 'VM', 'AS', 'SJ', 'MK', 'AR', 'PB', 'TS', 'DI'][i % 10]}`,
      headline: `${expYrs > 5 ? 'Senior' : 'Software'} ${roleSel[0]}`,
      company: compSel,
      location: locSel,
      workMode: wmSel,
      experienceYears: expYrs,
      noticePeriodDays: noticeDays,
      availability: avSel,
      lastActive: `${(i % 7) + 1} days ago`,
      employment: {
        types: i % 5 === 0 ? ["Full-time", "Contract"] : i % 3 === 0 ? ["Full-time", "Internship"] : ["Full-time"],
        openToWork: avSel !== "Not Available",
        noticePeriodDays: noticeDays,
        salaryRange: { min: 10 + expYrs * 3, max: 20 + expYrs * 6, currency: "LPA" },
        culturePrefs: [
          ["Fast-moving startup", "High ownership", "Remote-first"],
          ["Collaborative culture", "Clear processes", "Mentorship"],
          ["Engineering-first", "High autonomy", "No micro-management"],
          ["Research-driven", "Data-informed decisions", "Inclusive"],
          ["Product-driven", "Cross-functional teams", "Design + Dev parity"]
        ][i % 5],
        preferredCompanySize: ["Startup / Series A-B", "Series B-D", "Mid-size (200-2000)", "Enterprise", "AI-focused lab"][i % 5],
        preferredIndustry: [
          ["AI / ML", "Developer Tools"],
          ["FinTech", "SaaS"],
          ["E-commerce", "Consumer Tech"],
          ["Healthcare AI", "EdTech"],
          ["Cloud", "Platform Engineering"]
        ][i % 5],
        willingToRelocate: i % 3 === 0,
        openToContract: i % 4 === 0
      },
      skills: stackSel.map(s => ({
        name: s,
        score: Math.floor(70 + Math.random() * 25),
        basis: `Assessed via ${s} code challenge benchmark`
      })),
      primarySkills: stackSel,
      techStack: {
        preferred: stackSel.map((s, si) => ({
          name: s,
          pct: Math.floor(70 + Math.random() * 26),
          color: stackColors[s] || ['#6E4FF2','#00ACD7','#EE4C2C','#009688'][si % 4]
        })),
        additional: additionalSkillsMap[i % 4],
        notes: `${expYrs} years building ${roleSel[0]} systems using ${stackSel.join(' & ')}.`
      },
      roleTypes: roleSel,
      contact: {
        email: `candidate.${idx}@hidevs.io`,
        phone: `+91 ${90000 + idx * 3}0 ${10000 + idx * 7}`
      },
      links: {
        github: `https://github.com/candidate-${idx}`,
        linkedin: `https://linkedin.com/in/candidate-${idx}`,
        portfolio: (i % 3 === 0) ? `https://candidate-${idx}.dev` : undefined
      },
      interviewReadiness: {
        completed: isCompleted,
        score: isCompleted ? mockScore : 0,
        assessedOn: isCompleted ? `Jul ${10 + (i % 12)}, 2026` : ""
      },
      builderProof: {
        projectsCount: (i % 6) + 2,
        deployedProjectsCount: (i % 4) + 1,
        hackathonWinsCount: (i % 3),
        challengesCount: (i % 5) + 3,
        aiRankPercentile: rankPct,
        streakDays: (i * 3) % 40,
        monthsActiveCount: (i % 12) + 3
      },
      fitVerdict: {
        status: rankPct <= 25 ? "Strong Fit" : (rankPct <= 60 ? "Good Fit" : "Stretch Fit"),
        reason: `${expYrs} years developing ${stackSel.join(', ')} systems with Top ${rankPct}% AI Rank.`
      },
      aiSummary: `${roleSel[0]} with ${expYrs} years experience in ${stackSel.join(' & ')} at ${compSel}.`,
      about: `Experienced ${roleSel[0]} specializing in ${stackSel.join(', ')}. Focused on building scalable applications with robust test coverage.`,
      whyInterview: [
        { claim: `Top ${rankPct}% Rank Performance`, evidence: `Scored in Top ${rankPct}% in ${roleSel[0]} benchmark challenges.` },
        { claim: `Proven ${compSel} Tenure`, evidence: `${expYrs} years shipping production software in ${locSel}.` }
      ],
      potentialConcerns: [
        `Notice period is ${noticeDays} days — verify timeline compatibility.`
      ],
      experience: [
        { title: `${expYrs > 5 ? 'Senior' : 'Software'} Engineer`, company: compSel, duration: "2023 - Present", highlights: [`Built core ${stackSel[0]} features.`, `Improved build pipeline efficiency by 25%.`] }
      ],
      projects: [
        { name: `Project ${idx} Alpha`, description: `Scalable ${stackSel[0]} service for data processing`, techStack: stackSel, usersCount: `${(i + 1) * 40}+ users`, verified: true, deployed: true, links: { github: `github.com/candidate-${idx}/alpha` } }
      ],
      hackathons: (i % 3 === 0) ? [{ name: `HiDevs Challenge #${i + 1}`, rank: `Top ${rankPct}%`, date: "2024" }] : [],
      intelligenceCards: []
    };
  })
];

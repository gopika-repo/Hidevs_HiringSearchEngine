/* ==========================================================================
   HiDevs Hiring Search Engine — Realistic Recruiter Mock Dataset
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

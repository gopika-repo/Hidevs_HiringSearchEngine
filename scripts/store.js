/* ==========================================================================
   HiDevs Hiring Search Engine — Clean Central State Manager
   ========================================================================== */

import { mockCandidates } from './mockData.js';

class Store {
  constructor() {
    this.state = {
      candidates: [...mockCandidates],
      searchQuery: '',
      activeQuickFilters: new Set(),
      filters: {
        availability: null,
        experienceLevel: null,
        roleTypes: new Set(),
        skills: new Set(),
        workMode: null,
        builderSignals: new Set(),
        rankingPercentile: 100
      },
      shortlistedIds: new Set(["cand-1"]),
      savedCollections: [
        { id: "col-1", name: "AI Engineers Q3", candidateIds: ["cand-1", "cand-2"] },
        { id: "col-2", name: "Immediate Joiners", candidateIds: ["cand-3"] }
      ],
      compareQueue: new Set(),
      activePreviewCandidateId: null,
      activeView: 'search', // 'search' | 'workspace' | 'profile'
      activeProfileCandidateId: "cand-1",
      pipeline: {
        saved: ["cand-2"],
        shortlisted: ["cand-1"],
        interview: ["cand-3"],
        offered: [],
        hired: []
      }
    };

    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // --- Mutators ---
  setSearchQuery(query) {
    this.state.searchQuery = query;
    this.notify();
  }

  toggleQuickFilter(filterId) {
    if (this.state.activeQuickFilters.has(filterId)) {
      this.state.activeQuickFilters.delete(filterId);
    } else {
      this.state.activeQuickFilters.add(filterId);
    }
    this.notify();
  }

  setFilter(category, value) {
    if (category === 'availability') {
      this.state.filters.availability = this.state.filters.availability === value ? null : value;
    } else if (category === 'workMode') {
      this.state.filters.workMode = this.state.filters.workMode === value ? null : value;
    }
    this.notify();
  }

  toggleSkillFilter(skill) {
    if (this.state.filters.skills.has(skill)) {
      this.state.filters.skills.delete(skill);
    } else {
      this.state.filters.skills.add(skill);
    }
    this.notify();
  }

  toggleRoleFilter(role) {
    if (this.state.filters.roleTypes.has(role)) {
      this.state.filters.roleTypes.delete(role);
    } else {
      this.state.filters.roleTypes.add(role);
    }
    this.notify();
  }

  toggleBuilderSignal(signal) {
    if (this.state.filters.builderSignals.has(signal)) {
      this.state.filters.builderSignals.delete(signal);
    } else {
      this.state.filters.builderSignals.add(signal);
    }
    this.notify();
  }

  clearAllFilters() {
    this.state.searchQuery = '';
    this.state.activeQuickFilters.clear();
    this.state.filters.availability = null;
    this.state.filters.experienceLevel = null;
    this.state.filters.workMode = null;
    this.state.filters.skills.clear();
    this.state.filters.roleTypes.clear();
    this.state.filters.builderSignals.clear();
    this.notify();
  }

  toggleShortlist(candidateId) {
    if (this.state.shortlistedIds.has(candidateId)) {
      this.state.shortlistedIds.delete(candidateId);
    } else {
      this.state.shortlistedIds.add(candidateId);
    }
    this.notify();
  }

  openPreviewPanel(candidateId) {
    this.state.activePreviewCandidateId = candidateId;
    this.notify();
  }

  closePreviewPanel() {
    this.state.activePreviewCandidateId = null;
    this.notify();
  }

  setView(view, candidateId = null) {
    this.state.activeView = view;
    if (candidateId) {
      this.state.activeProfileCandidateId = candidateId;
    }
    this.closePreviewPanel();
    this.notify();
  }

  toggleCompare(candidateId) {
    if (this.state.compareQueue.has(candidateId)) {
      this.state.compareQueue.delete(candidateId);
    } else {
      if (this.state.compareQueue.size < 3) {
        this.state.compareQueue.add(candidateId);
      }
    }
    this.notify();
  }

  // --- Filter Selector ---
  getFilteredCandidates() {
    return this.state.candidates.filter(cand => {
      // Search Query
      if (this.state.searchQuery.trim()) {
        const q = this.state.searchQuery.toLowerCase();
        const matchName = cand.name.toLowerCase().includes(q);
        const matchHeadline = cand.headline.toLowerCase().includes(q);
        const matchSkills = cand.skills.some(s => s.toLowerCase().includes(q));
        if (!matchName && !matchHeadline && !matchSkills) return false;
      }

      // Quick Filters
      if (this.state.activeQuickFilters.has("open_work") && cand.availability !== "Open to Work") return false;
      if (this.state.activeQuickFilters.has("remote") && cand.workMode !== "Remote" && cand.workMode !== "Remote Only") return false;
      if (this.state.activeQuickFilters.has("immediate") && cand.noticePeriodDays > 15) return false;
      if (this.state.activeQuickFilters.has("hackathon_winners") && cand.builderProof.hackathonWinsCount < 1) return false;
      if (this.state.activeQuickFilters.has("ai_engineers") && !cand.roleTypes.includes("AI / ML Engineer")) return false;
      if (this.state.activeQuickFilters.has("top_ranked") && cand.builderProof.aiRankPercentile > 25) return false;

      // Sidebar Filters
      if (this.state.filters.availability && cand.availability !== this.state.filters.availability) return false;
      if (this.state.filters.workMode && cand.workMode !== this.state.filters.workMode) return false;
      
      if (this.state.filters.skills.size > 0) {
        const hasAllSkills = Array.from(this.state.filters.skills).every(s => cand.skills.includes(s));
        if (!hasAllSkills) return false;
      }

      if (this.state.filters.roleTypes.size > 0) {
        const hasAnyRole = Array.from(this.state.filters.roleTypes).some(r => cand.roleTypes.includes(r));
        if (!hasAnyRole) return false;
      }

      if (this.state.filters.builderSignals.has("hackathon") && cand.builderProof.hackathonWinsCount === 0) return false;
      if (this.state.filters.builderSignals.has("deployed") && cand.builderProof.deployedProjectsCount === 0) return false;

      return true;
    });
  }
}

export const store = new Store();

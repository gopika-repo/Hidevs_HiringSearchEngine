/* ==========================================================================
   HiDevs Hiring Search Engine — Modern SaaS Command-K Search Controller
   ========================================================================== */

import { store } from './store.js';
import { mockRecruiterData } from './mockData.js';

export function parseNaturalLanguageQuery(rawQuery) {
  if (!rawQuery || !rawQuery.trim()) return null;
  const q = rawQuery.toLowerCase().trim();

  const parsed = {
    skills: [],
    location: '',
    role: '',
    immediateOnly: false,
    topRankedOnly: false,
    aiOnly: false,
    openToWorkOnly: false,
    hasGithubOnly: false,
    hasLinkedinOnly: false,
    minCgpa: null,
    minCodeQuest: null,
    minLeetZ: null,
    strongPerformanceOnly: false,
    experienceBand: null
  };

  // 1. Skill & Tech Extraction
  const knownSkills = [
    "python", "fastapi", "langchain", "react", "typescript", "go", "docker", 
    "pytorch", "next.js", "kubernetes", "kafka", "redis", "llamaindex", "huggingface"
  ];
  knownSkills.forEach(skill => {
    if (q.includes(skill)) parsed.skills.push(skill);
  });

  // 2. Location Extraction
  const locations = ["bangalore", "mumbai", "delhi", "hyderabad", "pune", "chennai", "remote"];
  locations.forEach(loc => {
    if (q.includes(loc)) parsed.location = loc;
  });

  // 3. Role & Experience Band Extraction
  if (q.includes("ai builder") || q.includes("ai engineer") || q.includes("ml engineer")) parsed.role = "AI / ML Engineer";
  else if (q.includes("frontend") || q.includes("ui engineer")) parsed.role = "Full Stack";
  else if (q.includes("backend")) parsed.role = "Backend";
  else if (q.includes("full stack") || q.includes("fullstack")) parsed.role = "Full Stack";
  else if (q.includes("platform")) parsed.role = "Platform Engineering";

  if (q.includes("senior") || q.includes("lead") || q.includes("staff")) parsed.experienceBand = "6+";
  else if (q.includes("junior") || q.includes("early career")) parsed.experienceBand = "0-2";

  // 4. Intent Modifiers & Platform Field Matches
  if (q.includes("open to work")) parsed.openToWorkOnly = true;
  if (q.includes("github") || q.includes("with github")) parsed.hasGithubOnly = true;
  if (q.includes("linkedin") || q.includes("with linkedin")) parsed.hasLinkedinOnly = true;
  if (q.includes("immediate") || q.includes("immediate joiner")) parsed.immediateOnly = true;
  if (q.includes("top") || q.includes("top rank") || q.includes("top ranked")) parsed.topRankedOnly = true;
  if (q.includes("strong performance") || q.includes("high performance") || q.includes("developer performance")) parsed.strongPerformanceOnly = true;

  // 5. Numeric Cutoff Matches (CGPA, CodeQuest, LeetZ)
  const cgpaMatch = q.match(/cgpa\s*(?:above|greater than|>|>=)?\s*(\d+(?:\.\d+)?)/i) || q.match(/(\d+(?:\.\d+)?)\s*\+?\s*cgpa/i);
  if (cgpaMatch) {
    parsed.minCgpa = parseFloat(cgpaMatch[1]);
  }

  const codeQuestMatch = q.match(/(\d+)\s*\+?\s*codequests?/i) || q.match(/more than\s*(\d+)\s*codequests?/i);
  if (codeQuestMatch) {
    parsed.minCodeQuest = parseInt(codeQuestMatch[1], 10);
  }

  const leetZMatch = q.match(/(\d+)\s*\+?\s*leetz/i) || q.match(/more than\s*(\d+)\s*leetz/i);
  if (leetZMatch) {
    parsed.minLeetZ = parseInt(leetZMatch[1], 10);
  }

  return parsed;
}

export function initGlobalSearch() {
  const searchInput = document.getElementById('global-search-input');
  const dropdown = document.getElementById('search-dropdown');

  if (!searchInput || !dropdown) return;

  const popularSearches = [
    "Frontend developers open to work",
    "Backend engineers with GitHub",
    "React developers with CGPA above 8",
    "Candidates with strong developer performance",
    "Developers who completed more than 20 CodeQuests",
    "Python LLM Engineers Bangalore"
  ];

  const recentFilters = [
    { label: "⚡ Immediate Joiners", filterId: "immediate" },
    { label: "🤖 AI Engineers", filterId: "ai_engineers" },
    { label: "★ Top 25% AI Rank", filterId: "top_ranked" },
    { label: "🌐 Remote Ready", filterId: "remote" },
    { label: "🐙 Has GitHub", filterId: "has_github" },
    { label: "🎓 CGPA ≥ 8.5", filterId: "cgpa_85" }
  ];

  const renderDropdownContent = (filterText = '') => {
    const term = filterText.toLowerCase().trim();
    let autocompleteHtml = '';

    if (term.length > 0) {
      // Live matching candidates & skills
      const matchedCandidates = store.state.candidates
        .filter(c => c.name.toLowerCase().includes(term) || c.headline.toLowerCase().includes(term) || c.skills.some(s => (typeof s === 'string' ? s : s.name).toLowerCase().includes(term)))
        .slice(0, 3);

      if (matchedCandidates.length > 0) {
        autocompleteHtml = `
          <div class="suggestion-group-title">Matching Candidates</div>
          ${matchedCandidates.map(c => `
            <div class="suggestion-item" data-action="open-preview" data-id="${c.id}">
              <span style="font-weight: 600;">👤 ${c.name}</span> — <span style="color: var(--color-text-muted); font-size: 12px;">${c.headline} (${c.location})</span>
            </div>
          `).join('')}
        `;
      }
    }

    dropdown.innerHTML = `
      ${autocompleteHtml}

      <div class="suggestion-group-title">Recent Searches</div>
      ${mockRecruiterData.recentSearches.map(item => `
        <div class="suggestion-item" data-query="${item}">
          <span style="color: var(--color-text-muted);">🕒</span> ${item}
        </div>
      `).join('')}

      <div class="suggestion-group-title" style="margin-top: 8px;">Popular Natural Language Queries</div>
      ${popularSearches.map(item => `
        <div class="suggestion-item" data-query="${item}">
          <span style="color: var(--color-accent-base);">⚡</span> <strong>${item}</strong>
        </div>
      `).join('')}

      <div class="suggestion-group-title" style="margin-top: 8px;">Recent Active Filters</div>
      <div style="display: flex; gap: 6px; padding: 6px 12px; flex-wrap: wrap;">
        ${recentFilters.map(f => `
          <button class="chip btn-sm" data-action="quick-filter" data-id="${f.filterId}" style="font-size: 11px;">
            ${f.label}
          </button>
        `).join('')}
      </div>
    `;
  };

  renderDropdownContent();

  // Focus & Input Event Listeners
  searchInput.addEventListener('focus', () => {
    renderDropdownContent(searchInput.value);
    dropdown.classList.add('visible');
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    renderDropdownContent(query);
    dropdown.classList.add('visible');

    // Natural Language Search Parsing & Store Sync
    const parsed = parseNaturalLanguageQuery(query);
    if (parsed) {
      if (parsed.location) store.setLocationFilter(parsed.location);
      if (parsed.immediateOnly) store.state.filters.noticePeriod = 'immediate';
      if (parsed.topRankedOnly) store.state.filters.rankingPercentile = 25;
    }

    document.dispatchEvent(new CustomEvent('search-query-changed', { detail: { query } }));
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('visible');
    }
  });

  // Suggestion item selection
  const applyParsedSearch = (queryStr) => {
    const parsed = parseNaturalLanguageQuery(queryStr);
    store.setSearchQuery(queryStr);

    if (parsed) {
      if (parsed.openToWorkOnly) store.state.filters.availability = "Open to Work";
      if (parsed.hasGithubOnly) store.state.filters.hasGithub = true;
      if (parsed.hasLinkedinOnly) store.state.filters.hasLinkedin = true;
      if (parsed.minCgpa) store.state.filters.minCgpa = parsed.minCgpa;
      if (parsed.minCodeQuest) store.state.filters.minCodeQuest = parsed.minCodeQuest;
      if (parsed.minLeetZ) store.state.filters.minLeetZ = parsed.minLeetZ;
      if (parsed.skills.length > 0) {
        parsed.skills.forEach(s => store.state.filters.preferredTech.add(s));
      }
      if (parsed.role) {
        store.state.filters.roleTypes.add(parsed.role);
      }
      if (parsed.location) {
        store.setLocationFilter(parsed.location);
      }
      store.notify();
    }
  };

  dropdown.addEventListener('click', (e) => {
    const item = e.target.closest('.suggestion-item');
    if (!item) return;

    if (item.dataset.query) {
      searchInput.value = item.dataset.query;
      applyParsedSearch(item.dataset.query);
      dropdown.classList.remove('active');
    } else if (item.dataset.filterId) {
      const fid = item.dataset.filterId;
      if (fid === 'has_github') store.state.filters.hasGithub = true;
      else if (fid === 'cgpa_85') store.state.filters.minCgpa = 8.5;
      else store.toggleQuickFilter(fid);
      dropdown.classList.remove('active');
    }
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      applyParsedSearch(searchInput.value);
      dropdown.classList.remove('active');
    }
  });

  // Command + K or Ctrl + K Global Shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
      dropdown.classList.add('visible');
    }
  });
}

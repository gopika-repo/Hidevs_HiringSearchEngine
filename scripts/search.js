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
    aiOnly: false
  };

  // 1. Skill Extraction
  const knownSkills = ["python", "fastapi", "langchain", "react", "typescript", "go", "docker", "pytorch", "next.js", "kubernetes"];
  knownSkills.forEach(skill => {
    if (q.includes(skill)) parsed.skills.push(skill);
  });

  // 2. Location Extraction
  const locations = ["bangalore", "mumbai", "delhi", "hyderabad", "pune", "chennai", "remote"];
  locations.forEach(loc => {
    if (q.includes(loc)) parsed.location = loc;
  });

  // 3. Role Extraction
  if (q.includes("ai builder") || q.includes("ai engineer") || q.includes("ml engineer")) parsed.role = "AI / ML Engineer";
  else if (q.includes("backend")) parsed.role = "Backend";
  else if (q.includes("full stack") || q.includes("fullstack")) parsed.role = "Full Stack";
  else if (q.includes("platform")) parsed.role = "Platform Engineering";

  // 4. Intent Modifiers
  if (q.includes("immediate") || q.includes("immediate joiner")) parsed.immediateOnly = true;
  if (q.includes("top") || q.includes("top rank") || q.includes("top ranked")) parsed.topRankedOnly = true;

  return parsed;
}

export function initGlobalSearch() {
  const searchInput = document.getElementById('global-search-input');
  const dropdown = document.getElementById('search-dropdown');

  if (!searchInput || !dropdown) return;

  const popularSearches = [
    "Python developer in Bangalore",
    "Top AI builders",
    "Immediate joiner",
    "Top LangChain developer",
    "React Full Stack Remote"
  ];

  const recentFilters = [
    { label: "⚡ Immediate Joiners", filterId: "immediate" },
    { label: "🤖 AI Engineers", filterId: "ai_engineers" },
    { label: "★ Top 25% AI Rank", filterId: "top_ranked" },
    { label: "🌐 Remote Ready", filterId: "remote" }
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
  dropdown.addEventListener('click', (e) => {
    const item = e.target.closest('.suggestion-item');
    if (item) {
      const query = item.dataset.query;
      if (query) {
        searchInput.value = query;
        dropdown.classList.remove('visible');

        // Apply Natural Language Parsing
        const parsed = parseNaturalLanguageQuery(query);
        if (parsed) {
          if (parsed.location) store.setLocationFilter(parsed.location);
          if (parsed.immediateOnly) store.state.filters.noticePeriod = 'immediate';
          if (parsed.topRankedOnly) store.state.filters.rankingPercentile = 25;
        }

        document.dispatchEvent(new CustomEvent('search-query-changed', { detail: { query } }));
      }
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

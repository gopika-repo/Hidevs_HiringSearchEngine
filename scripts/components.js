/* ==========================================================================
   HiDevs Hiring Search Engine — Clean Component Renderers
   ========================================================================== */

import { mockQuickFilters } from './mockData.js';
import { icons, sanitizeHtml } from './utils.js';

// --- Structured Hiring Brief Renderer ---
export function renderStructuredBriefCard(cand) {
  if (!cand) return '';

  const verdict = cand.fitVerdict || {
    status: "Good Fit",
    reason: cand.aiSummary || "Strong candidate matching specified parameters."
  };

  const topReasons = cand.whyInterview && cand.whyInterview.length > 0
    ? [...cand.whyInterview.slice(0, 3)]
    : [
        { claim: `Top ${cand.builderProof?.aiRankPercentile ?? 10}% AI Rank`, evidence: `High verified code execution & problem-solving assessment score.` }
      ];

  if (cand.interviewReadiness?.completed && cand.interviewReadiness.score >= 80) {
    topReasons.unshift({
      claim: `Verified Technical Assessment (${cand.interviewReadiness.score}/100)`,
      evidence: `Passed HiDevs technical simulation assessed on ${cand.interviewReadiness.assessedOn}.`
    });
  }

  const concerns = cand.potentialConcerns && cand.potentialConcerns.length > 0
    ? cand.potentialConcerns
    : ["Verify specific architecture preferences and leadership scope in interview."];

  return `
    <div class="structured-brief-card">
      <!-- 1. Fit Verdict -->
      <div class="brief-header-row">
        <div class="brief-title">RECRUITER HIRING BRIEF</div>
        <div class="brief-verdict-group">
          <span class="badge ${verdict.status === 'Strong Fit' ? 'badge-open-to-work' : 'badge-open-select'}">
            ${sanitizeHtml(verdict.status)}
          </span>
          <span class="brief-verdict-reason">
            ${sanitizeHtml(verdict.reason)}
          </span>
        </div>
      </div>

      <!-- 2. Top 3 Evidence-Backed Reasons to Hire -->
      <div>
        <div class="brief-section-title">TOP EVIDENCE-BACKED REASONS TO HIRE</div>
        <div class="brief-evidence-list">
          ${topReasons.slice(0, 3).map(item => `
            <div class="brief-evidence-item">
              <span class="brief-evidence-icon">${icons.check}</span>
              <div>
                <strong>${sanitizeHtml(item.claim)}:</strong>
                <span>${sanitizeHtml(item.evidence)}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 3. Interview to Verify -->
      <div>
        <div class="brief-section-title">INTERVIEW TO VERIFY</div>
        <div class="brief-verify-list">
          ${concerns.map(concern => `
            <div class="brief-verify-item">
              <span>${icons.searchLens}</span>
              <span>${sanitizeHtml(concern)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 4. Logistics at a Glance -->
      <div class="brief-logistics-bar">
        <div><strong>Availability:</strong> ${sanitizeHtml(cand.availability)}</div>
        <div>•</div>
        <div><strong>Notice:</strong> ${cand.noticePeriodDays === 0 ? 'Immediate (0d)' : cand.noticePeriodDays + ' days'}</div>
        <div>•</div>
        <div><strong>Work Mode:</strong> ${sanitizeHtml(cand.workMode)}</div>
        <div>•</div>
        <div><strong>Location:</strong> ${sanitizeHtml(cand.location)}</div>
      </div>
    </div>
  `;
}

// --- Left Navigation Sidebar Renderer ---
export function renderSidebarNav(state) {
  const activeView = state.activeView || 'search';
  const shortlistCount = state.shortlistedIds ? state.shortlistedIds.size : 0;

  return `
    <div class="sidebar-brand-icon" id="brand-home" title="HiDevs Search Engine">
      HD
    </div>

    <div class="sidebar-nav-menu">
      <div class="nav-sidebar-item ${activeView === 'search' ? 'active' : ''}" id="nav-search-engine" title="Candidate Search Engine">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <span class="nav-label">Search</span>
      </div>

      <div class="nav-sidebar-item ${activeView === 'workspace' ? 'active' : ''}" id="nav-workspace" title="Recruiter Workspace Pipeline">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        <span class="nav-label">Pipeline (${shortlistCount})</span>
      </div>

      <div class="nav-sidebar-item ${activeView === 'profile' ? 'active' : ''}" id="nav-profile" title="Detailed Profile Dossier">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <span class="nav-label">Profile</span>
      </div>
    </div>

    <div class="sidebar-nav-menu">
      <div class="nav-sidebar-item" title="Notifications">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        <span class="nav-label">Alerts</span>
      </div>
    </div>
  `;
}

// --- Top Navbar Renderer ---
export function renderTopNavbar(user, state) {
  return `
    <div class="top-navbar-left">
      <div class="top-navbar-brand">
        <span>HiDevs</span>
        <span class="badge-logo" style="font-size: var(--type-label-size); padding: 1px 6px;">RECRUITER ENGINE</span>
      </div>

      <div class="header-search-container" style="margin: 0; flex: 1;">
        <div class="search-wrapper" style="position: relative; display: flex; align-items: center;">
          <span class="search-icon-svg" aria-hidden="true" style="left: 10px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>
          <input type="text" id="global-search-input" class="global-search-input" placeholder="Search 'Python developer in Bangalore', 'Top AI builders'..." style="padding-left: 32px; padding-right: 50px; height: 34px; font-size: var(--type-body-sm-size);" value="${sanitizeHtml(state.searchQuery || '')}" autocomplete="off" />
          <kbd style="position: absolute; right: 8px; font-size: 9px; font-weight: 700; background: var(--color-bg-subtle); color: var(--color-text-muted); border: 1px solid var(--color-border-subtle); border-radius: 4px; padding: 1px 5px; pointer-events: none;">⌘K</kbd>
          <div class="search-suggestions-dropdown" id="search-dropdown"></div>
        </div>
      </div>
    </div>

    <div class="top-navbar-right">
      <button class="btn btn-ghost btn-sm" id="nav-workspace-pill" style="font-size: var(--type-caption-size); gap: 6px;">
        <span>★ Pipeline</span>
        <span class="badge-count" id="shortlist-count-badge">${state.shortlistedIds ? state.shortlistedIds.size : 0}</span>
      </button>

      <div class="user-profile-btn" tabindex="0" title="${user.name} (${user.role})">
        <div class="user-profile-avatar" style="width: 26px; height: 26px; font-size: var(--type-caption-size);">${user.avatar}</div>
        <span style="font-size: var(--type-caption-size); font-weight: 600;">${user.name.split(' ')[0]}</span>
      </div>
    </div>
  `;
}

// --- Inline Section 3 Candidate Preview Renderer ---
export function renderInlinePreview(cand, state) {
  if (!cand) return `
    <div style="padding: var(--s4) var(--s2); text-align: center; color: var(--color-text-muted);">
      <div style="font-size: var(--type-h2-size); margin-bottom: var(--s1);">👤</div>
      <div style="font-weight: 600; font-size: var(--type-body-sm-size); margin-bottom: var(--s0);">No Candidate Selected</div>
      <div style="font-size: var(--type-caption-size);">Click on any candidate card to open their quick recruiter dossier.</div>
    </div>
  `;

  const isShortlisted = state.shortlistedIds.has(cand.id);

  return `
    <div style="padding: var(--s2); border-bottom: 1px solid var(--color-border-subtle); display: flex; justify-content: space-between; align-items: flex-start; background: var(--color-bg-surface);">
      <div style="display: flex; gap: var(--s1h); align-items: center;">
        <div class="avatar" style="width: var(--s5); height: var(--s5); font-size: var(--type-body-size); font-weight: 700; flex-shrink: 0;">
          ${sanitizeHtml(cand.avatar)}
        </div>
        <div>
          <div style="font-weight: 700; font-size: var(--type-body-sm-size); color: var(--color-text-primary); line-height: 1.2;">
            ${sanitizeHtml(cand.name)}
          </div>
          <div style="font-size: var(--type-caption-size); color: var(--color-text-secondary); margin-top: 2px;">
            ${sanitizeHtml(cand.headline)} · ${sanitizeHtml(cand.company)}
          </div>
        </div>
      </div>
      <button class="btn-icon" data-action="close-preview" title="Close Preview" style="width: 24px; height: 24px;">×</button>
    </div>

    <div style="padding: var(--s2); display: flex; flex-direction: column; gap: var(--s1h); flex: 1; overflow-y: auto;">
      ${renderStructuredBriefCard(cand)}
    </div>

    <div style="padding: var(--s1h) var(--s2); border-top: 1px solid var(--color-border-subtle); background: var(--color-bg-surface); display: flex; justify-content: space-between; align-items: center;">
      <button class="btn ${isShortlisted ? 'btn-primary' : 'btn-secondary'} btn-xs" data-action="shortlist" data-id="${cand.id}">
        ${isShortlisted ? '★ Shortlisted' : 'Shortlist'}
      </button>
      <button class="btn btn-primary btn-xs" data-action="open-full-profile" data-id="${cand.id}" style="font-weight: 600;">
        Open Full Profile Dossier →
      </button>
    </div>
  `;
}



// --- Candidate Card Renderer (Concise 13-Field Card) ---
export function renderCandidateCard(cand, state) {
  const isShortlisted = state.shortlistedIds.has(cand.id);

  // Normalize Top 5 Skills
  const top5Skills = (cand.skills || [])
    .map(s => typeof s === 'string' ? s : (s.name || String(s)))
    .slice(0, 5);

  const builderScore = cand.builderProof?.builderScore || Math.min(99, 88 + (cand.experienceYears || 2));
  const aiHiringScore = cand.aiHiringScore || Math.min(99, 85 + (cand.experienceYears || 2));

  const challengeRank = cand.rankPercentile ? `Top ${cand.rankPercentile}%` : (cand.fitVerdict?.status || 'Top 10%');
  const projectRank = cand.projects?.[0]?.verified ? 'Top 5% Verified Project' : `${cand.projects?.length || 3}+ Live Apps`;
  const bestSuitedRole = cand.bestSuitedFor?.[0] || (cand.skills?.[0] ? `${typeof cand.skills[0] === 'string' ? cand.skills[0] : cand.skills[0].name} Specialist` : 'Software Engineer');

  return `
    <div class="candidate-card concise-card" data-id="${cand.id}">
      
      <!-- Top Row: Photo, Identity & Scores -->
      <div class="concise-card-top">
        <div class="avatar" style="width: 44px; height: 44px; font-size: 16px; font-weight: 700; flex-shrink: 0;">
          ${sanitizeHtml(cand.avatar)}
        </div>
        
        <div class="concise-identity-col">
          <div class="concise-name-row">
            <span class="candidate-name" data-action="open-preview" data-id="${cand.id}">${sanitizeHtml(cand.name)}</span>
            <span class="badge ${cand.availability === 'Open to Work' ? 'badge-open-to-work' : 'badge-open-select'}" style="font-size: var(--type-label-size); padding: 1px 6px;">
              ● ${sanitizeHtml(cand.availability)}
            </span>
            ${cand.employment?.openToWork !== false ? `<span class="emp-badge emp-badge-open" style="font-size: 9px; padding: 1px 5px;">Open to Work</span>` : ''}
          </div>
          <div class="concise-role-line">
            <strong>${sanitizeHtml(cand.headline)}</strong> · ${sanitizeHtml(cand.company)}
          </div>
          <div class="concise-meta-line">
            <span>📍 ${sanitizeHtml(cand.location)}</span> · 
            <span>💼 ${cand.experienceYears} yrs exp</span>
          </div>
        </div>

        <!-- Scores Column -->
        <div class="concise-scores-col">
          <div class="ai-hiring-score-box" style="padding: 2px 6px;">
            <span class="score-num" style="font-size: var(--type-body-sm-size);">${aiHiringScore}</span>
            <span class="score-label" style="font-size: 8px;">HiDevs AI</span>
          </div>
          <div class="ai-hiring-score-box" style="padding: 2px 6px; background: #FAF5FF; border-color: #D8B4FE; color: #6B21A8;">
            <span class="score-num" style="font-size: var(--type-body-sm-size);">${builderScore}</span>
            <span class="score-label" style="font-size: 8px;">Builder Score</span>
          </div>
        </div>
      </div>

      <!-- Middle Metrics Row: Ranks & Best Suited Role -->
      <div class="concise-ranks-row">
        <div class="concise-rank-pill">
          <span class="rank-lbl">CHALLENGE RANK</span>
          <span class="rank-val purple">${sanitizeHtml(challengeRank)}</span>
        </div>
        <div class="concise-rank-pill">
          <span class="rank-lbl">PROJECT RANK</span>
          <span class="rank-val green">${sanitizeHtml(projectRank)}</span>
        </div>
        <div class="concise-rank-pill flex-fill">
          <span class="rank-lbl">BEST SUITED ROLE</span>
          <span class="rank-val blue">${sanitizeHtml(bestSuitedRole)}</span>
        </div>
      </div>

      <!-- Skills Chips Row (Top 5 Skills) -->
      <div class="concise-skills-row">
        <span class="skills-lbl">Top Skills:</span>
        ${top5Skills.map(s => `<span class="chip chip-verified" style="font-size: var(--type-label-size); padding: 1px 6px;">${sanitizeHtml(s)}</span>`).join('')}
      </div>

      <!-- Action Footer -->
      <div class="concise-card-footer">
        <button class="btn ${isShortlisted ? 'btn-primary' : 'btn-secondary'} btn-xs" data-action="shortlist" data-id="${cand.id}">
          ${isShortlisted ? '★ Shortlisted' : 'Shortlist'}
        </button>
        <button class="btn btn-primary btn-xs" data-action="open-preview" data-id="${cand.id}" style="font-weight: 600;">
          View Full Profile →
        </button>
      </div>

    </div>
  `;
}


// --- Quick Filters Bar Renderer ---
export function renderQuickFilters(state) {
  return mockQuickFilters.map(f => {
    const isSelected = state.activeQuickFilters.has(f.id);
    return `
      <button class="quick-chip ${isSelected ? 'selected' : ''}" data-action="quick-filter" data-id="${f.id}">
        <span>${f.icon}</span> ${f.label}
      </button>
    `;
  }).join('');
}

// --- Recruiter-First Filter Sidebar Renderer (4 Logical Collapsible Sections) ---
export function renderFilterSidebar(state) {
  const skillsList = ["Python", "FastAPI", "LangChain", "React", "TypeScript", "Go", "Docker", "PyTorch"];
  const roleList = ["AI / ML Engineer", "Backend", "Full Stack", "Platform Engineering"];

  return `
    <div class="sidebar-top-bar" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--s1h); padding-bottom: var(--s1); border-bottom: 1px solid var(--color-border-subtle);">
      <span style="font-weight: 700; font-size: var(--type-body-sm-size); letter-spacing: 0.04em; color: var(--color-text-primary);">RECRUITER FILTERS</span>
      <button class="btn btn-ghost btn-sm" data-action="clear-filters" style="padding: 2px 6px; font-size: var(--type-caption-size); color: var(--color-accent-base);">Clear All</button>
    </div>

    <div class="recruiter-filter-accordion">
      <!-- Section 1: Core Candidate Specs (Role, Experience, Location, Remote, Notice, Salary) -->
      <details class="filter-group-details" open>
        <summary class="filter-group-summary">
          <span class="group-title">🎯 CORE SPECS (Role, Exp, Location, Notice, Salary)</span>
        </summary>
        <div class="filter-group-body">
          <!-- Role -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Target Role</label>
            <div class="filter-pills-row">
              ${roleList.map(r => `
                <button class="chip ${state.filters.roleTypes.has(r) ? 'active' : ''}" data-action="filter-role" data-value="${r}">
                  ${r}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Skills & Verified Skills -->
          <div class="sub-filter-block">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label class="sub-filter-label">Skills & Stack</label>
              <label class="form-check" style="font-size: var(--type-caption-size);">
                <input type="checkbox" ${state.filters.builderSignals.has('verified_skills') ? 'checked' : ''} data-action="filter-signal" data-value="verified_skills">
                <span>Verified Only</span>
              </label>
            </div>
            <div class="skills-row" style="margin-top: 4px;">
              ${skillsList.map(s => `
                <span class="chip ${state.filters.skills.has(s) ? 'active' : ''}" data-action="filter-skill" data-value="${s}">
                  ${s}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Experience -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Years of Experience</label>
            <div class="filter-pills-row">
              <button class="chip ${state.filters.experienceLevel === '0-2' ? 'active' : ''}" data-action="filter-radio" data-category="experienceLevel" value="0-2">0-2 Yrs</button>
              <button class="chip ${state.filters.experienceLevel === '3-5' ? 'active' : ''}" data-action="filter-radio" data-category="experienceLevel" value="3-5">3-5 Yrs</button>
              <button class="chip ${state.filters.experienceLevel === '6+' ? 'active' : ''}" data-action="filter-radio" data-category="experienceLevel" value="6+">6+ Yrs</button>
            </div>
          </div>

          <!-- Location & Remote -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Location & Remote</label>
            <input type="text" class="global-search-input" placeholder="e.g. Bangalore, Remote, Delhi..." value="${sanitizeHtml(state.filters.location || '')}" data-action="filter-location-input" style="width: 100%; height: 30px; padding: 0 8px; font-size: var(--type-caption-size); margin-bottom: 6px;">
            <div class="filter-pills-row">
              <button class="chip ${state.filters.workMode === 'Remote' ? 'active' : ''}" data-action="filter-radio" data-category="workMode" value="Remote">Remote Only</button>
              <button class="chip ${state.filters.workMode === 'Hybrid' ? 'active' : ''}" data-action="filter-radio" data-category="workMode" value="Hybrid">Hybrid</button>
            </div>
          </div>

          <!-- Notice Period & Immediate Joiner -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Notice Period / Immediate Joiner</label>
            <div class="filter-pills-row">
              <button class="chip ${state.filters.noticePeriod === 'immediate' ? 'active' : ''}" data-action="filter-radio" data-category="noticePeriod" value="immediate">⚡ Immediate (0d)</button>
              <button class="chip ${state.filters.noticePeriod === '15d' ? 'active' : ''}" data-action="filter-radio" data-category="noticePeriod" value="15d">≤15 Days</button>
              <button class="chip ${state.filters.noticePeriod === '30d' ? 'active' : ''}" data-action="filter-radio" data-category="noticePeriod" value="30d">≤30 Days</button>
            </div>
          </div>

          <!-- Salary Expectation -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Salary Expectation (LPA)</label>
            <div class="filter-pills-row">
              <button class="chip ${state.filters.salary === '<20L' ? 'active' : ''}" data-action="filter-radio" data-category="salary" value="<20L">&lt; 20 LPA</button>
              <button class="chip ${state.filters.salary === '20-35L' ? 'active' : ''}" data-action="filter-radio" data-category="salary" value="20-35L">20 - 35 LPA</button>
              <button class="chip ${state.filters.salary === '35L+' ? 'active' : ''}" data-action="filter-radio" data-category="salary" value="35L+">35+ LPA</button>
            </div>
          </div>
        </div>
      </details>

      <!-- Section 1b: Tech Stack Filter (Phase 2) -->
      <details class="filter-group-details" open>
        <summary class="filter-group-summary">
          <span class="group-title">🛠️ TECH STACK (Preferred Technologies)</span>
        </summary>
        <div class="filter-group-body">

          <!-- Tech search input -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Search Technology</label>
            <input
              class="tech-search-input"
              type="text"
              placeholder="e.g. Python, React, Go…"
              data-action="filter-tech-search"
              autocomplete="off"
              aria-label="Search by preferred technology"
            />
          </div>

          <!-- Python / ML -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">AI / ML</label>
            <div class="filter-pills-row">
              ${['Python', 'PyTorch', 'LangChain', 'LlamaIndex', 'HuggingFace', 'vLLM'].map(t =>
                `<button class="chip chip-tech ${state.filters.preferredTech.has(t) ? 'active' : ''}" data-action="filter-tech" data-value="${t}">${t}</button>`
              ).join('')}
            </div>
          </div>

          <!-- Backend -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Backend</label>
            <div class="filter-pills-row">
              ${['FastAPI', 'Go', 'Kafka', 'Redis', 'gRPC', 'Docker', 'Kubernetes'].map(t =>
                `<button class="chip chip-tech ${state.filters.preferredTech.has(t) ? 'active' : ''}" data-action="filter-tech" data-value="${t}">${t}</button>`
              ).join('')}
            </div>
          </div>

          <!-- Frontend -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Frontend</label>
            <div class="filter-pills-row">
              ${['React', 'TypeScript', 'Next.js', 'GraphQL', 'Storybook'].map(t =>
                `<button class="chip chip-tech ${state.filters.preferredTech.has(t) ? 'active' : ''}" data-action="filter-tech" data-value="${t}">${t}</button>`
              ).join('')}
            </div>
          </div>

          <!-- Cloud / Infra -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Cloud / Infra</label>
            <div class="filter-pills-row">
              ${['AWS', 'Terraform', 'Prometheus', 'MLflow', 'Kubeflow'].map(t =>
                `<button class="chip chip-tech ${state.filters.preferredTech.has(t) ? 'active' : ''}" data-action="filter-tech" data-value="${t}">${t}</button>`
              ).join('')}
            </div>
          </div>

          <!-- Active tech filters display -->
          ${state.filters.preferredTech.size > 0 ? `
          <div class="active-tech-filters">
            <span class="active-tech-label">Active:</span>
            ${Array.from(state.filters.preferredTech).map(t =>
              `<span class="chip chip-tech active" data-action="filter-tech" data-value="${t}" style="cursor:pointer;">${t} ✕</span>`
            ).join('')}
          </div>` : ''}
        </div>
      </details>

      <!-- Section 2: Candidate Status & Background (Open to Work, Company Exp, Education) -->

      <details class="filter-group-details" open>
        <summary class="filter-group-summary">
          <span class="group-title">💼 RECRUITER STATUS (Availability, Company, Ed)</span>
        </summary>
        <div class="filter-group-body">
          <!-- Open to Work -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Availability Status</label>
            <div class="filter-pills-row">
              <button class="chip ${state.filters.availability === 'Open to Work' ? 'active' : ''}" data-action="filter-radio" data-category="availability" value="Open to Work">● Open to Work</button>
              <button class="chip ${state.filters.availability === 'Open to Select Roles' ? 'active' : ''}" data-action="filter-radio" data-category="availability" value="Open to Select Roles">Open to Select Roles</button>
            </div>
          </div>

          <!-- Company Experience -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Company Experience</label>
            <div class="filter-pills-row">
              <button class="chip ${state.filters.companyTier === 'tier1' ? 'active' : ''}" data-action="filter-radio" data-category="companyTier" value="tier1">Tier-1 Tech / MAANG</button>
              <button class="chip ${state.filters.companyTier === 'unicorn' ? 'active' : ''}" data-action="filter-radio" data-category="companyTier" value="unicorn">High-Growth Unicorns</button>
            </div>
          </div>

          <!-- Education -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Education Background</label>
            <div class="filter-pills-row">
              <button class="chip ${state.filters.education === 'top_tier' ? 'active' : ''}" data-action="filter-radio" data-category="education" value="top_tier">Top CS Tier (IIT/BITS/NIT)</button>
              <button class="chip ${state.filters.education === 'btech' ? 'active' : ''}" data-action="filter-radio" data-category="education" value="btech">B.Tech / B.E.</button>
            </div>
          </div>
        </div>
      </details>

      <!-- Section 3: AI Intelligence & Ranks (AI Hiring Score, Challenge Rank, Project Rank) -->
      <details class="filter-group-details" open>
        <summary class="filter-group-summary">
          <span class="group-title">🤖 AI EVALUATION & RANKS (Score, Challenge & Project Rank)</span>
        </summary>
        <div class="filter-group-body">
          <!-- AI Hiring Score -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Min AI Hiring Score</label>
            <div class="filter-pills-row">
              <button class="chip ${state.filters.minAiScore === 90 ? 'active' : ''}" data-action="filter-radio" data-category="minAiScore" value="90">90+ Score</button>
              <button class="chip ${state.filters.minAiScore === 80 ? 'active' : ''}" data-action="filter-radio" data-category="minAiScore" value="80">80+ Score</button>
              <button class="chip ${!state.filters.minAiScore ? 'active' : ''}" data-action="filter-radio" data-category="minAiScore" value="">Any Score</button>
            </div>
          </div>

          <!-- Challenge Rank -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Challenge Rank Percentile</label>
            <div class="filter-pills-row">
              <button class="chip ${state.filters.rankingPercentile === 5 ? 'active' : ''}" data-action="filter-radio" data-category="rankingPercentile" value="5">Top 5%</button>
              <button class="chip ${state.filters.rankingPercentile === 10 ? 'active' : ''}" data-action="filter-radio" data-category="rankingPercentile" value="10">Top 10%</button>
              <button class="chip ${state.filters.rankingPercentile === 25 ? 'active' : ''}" data-action="filter-radio" data-category="rankingPercentile" value="25">Top 25%</button>
            </div>
          </div>

          <!-- Project Rank & Hackathon Winners -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Project Rank & Hackathon Proof</label>
            <div class="filter-pills-row">
              <button class="chip ${state.filters.builderSignals.has('hackathon') ? 'active' : ''}" data-action="filter-signal" data-value="hackathon">🏆 Hackathon Winner</button>
              <button class="chip ${state.filters.builderSignals.has('deployed') ? 'active' : ''}" data-action="filter-signal" data-value="deployed">⚡ Deployed Apps</button>
            </div>
          </div>

          <!-- Phase 7: Coding Activity Filters -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">CodeQuest Completed</label>
            <div class="filter-pills-row">
              <button class="chip ${state.filters.minCodeQuest === 30 ? 'active' : ''}" data-action="filter-radio" data-category="minCodeQuest" value="30">30+ CodeQuests</button>
              <button class="chip ${state.filters.minCodeQuest === 15 ? 'active' : ''}" data-action="filter-radio" data-category="minCodeQuest" value="15">15+ CodeQuests</button>
            </div>
          </div>

          <div class="sub-filter-block">
            <label class="sub-filter-label">LeetZ Prompts Completed</label>
            <div class="filter-pills-row">
              <button class="chip ${state.filters.minLeetZ === 100 ? 'active' : ''}" data-action="filter-radio" data-category="minLeetZ" value="100">100+ LeetZ Prompts</button>
              <button class="chip ${state.filters.minLeetZ === 50 ? 'active' : ''}" data-action="filter-radio" data-category="minLeetZ" value="50">50+ LeetZ Prompts</button>
            </div>
          </div>
        </div>
      </details>

      <!-- Section 3b: Employment Preferences (Phase 3) -->
      <details class="filter-group-details" open>
        <summary class="filter-group-summary">
          <span class="group-title">💼 EMPLOYMENT PREFERENCES (Type, Culture, Relocation)</span>
        </summary>
        <div class="filter-group-body">

          <!-- Employment Type -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Employment Type</label>
            <div class="filter-pills-row">
              ${['Full-time', 'Contract', 'Internship'].map(t => `
                <button class="chip chip-emp-type ${state.filters.employmentType.has(t) ? 'active' : ''}" data-action="filter-employment" data-value="${t}">${
                  t === 'Full-time' ? '🏢' : t === 'Contract' ? '📄' : '🎓'
                } ${t}</button>
              `).join('')}
            </div>
          </div>

          <!-- Open to Work — quick check -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Availability & Mobility</label>
            <div class="filter-pills-row">
              <button class="chip ${state.filters.availability === 'Open to Work' ? 'active' : ''}" data-action="filter-radio" data-category="availability" value="Open to Work">● Open to Work</button>
              <button class="chip ${state.filters.willingToRelocate ? 'active' : ''}" data-action="filter-relocate">📍 Willing to Relocate</button>
              <button class="chip ${state.filters.openToContract ? 'active' : ''}" data-action="filter-contract">📄 Open to Contract</button>
            </div>
          </div>

          <!-- Culture Preferences -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Culture Preferences</label>
            <div class="filter-pills-row">
              ${['Remote-first', 'Startup', 'High ownership', 'Mentorship', 'Research-driven', 'Product-driven', 'Engineering-first', 'Collaborative'].map(p => `
                <button class="chip chip-culture-filter ${state.filters.culturePrefs.has(p) ? 'active' : ''}" data-action="filter-culture" data-value="${p}">${p}</button>
              `).join('')}
            </div>
          </div>

          <!-- Academic & CGPA Filter (Phase 4) -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Academic CGPA Cutoff</label>
            <div class="filter-pills-row">
              <button class="chip ${state.filters.minCgpa === 9.0 ? 'active' : ''}" data-action="filter-radio" data-category="minCgpa" value="9.0">9.0+ CGPA</button>
              <button class="chip ${state.filters.minCgpa === 8.5 ? 'active' : ''}" data-action="filter-radio" data-category="minCgpa" value="8.5">8.5+ CGPA</button>
              <button class="chip ${state.filters.minCgpa === 8.0 ? 'active' : ''}" data-action="filter-radio" data-category="minCgpa" value="8.0">8.0+ CGPA</button>
            </div>
          </div>

          <!-- Salary Range quick filter -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Salary Expectation (LPA)</label>
            <div class="filter-pills-row">
              <button class="chip ${state.filters.salary === '<20L' ? 'active' : ''}" data-action="filter-radio" data-category="salary" value="<20L">&lt; 20 LPA</button>
              <button class="chip ${state.filters.salary === '20-35L' ? 'active' : ''}" data-action="filter-radio" data-category="salary" value="20-35L">20–35 LPA</button>
              <button class="chip ${state.filters.salary === '35L+' ? 'active' : ''}" data-action="filter-radio" data-category="salary" value="35L+">35+ LPA</button>
            </div>
          </div>

        </div>
      </details>

      <!-- Section 4: Capability & Behavioral Scores (Projects, Builder, Problem Solving, Comm, Lead) -->
      <details class="filter-group-details">
        <summary class="filter-group-summary">
          <span class="group-title">⚡ CAPABILITY & SCORES (Projects, Problem Solving, Comm, Lead)</span>
        </summary>
        <div class="filter-group-body">
          <!-- Projects Completed -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Min Projects Completed</label>
            <div class="filter-pills-row">
              <button class="chip ${state.filters.minProjects === 5 ? 'active' : ''}" data-action="filter-radio" data-category="minProjects" value="5">5+ Projects</button>
              <button class="chip ${state.filters.minProjects === 3 ? 'active' : ''}" data-action="filter-radio" data-category="minProjects" value="3">3+ Projects</button>
              <button class="chip ${state.filters.minProjects === 1 ? 'active' : ''}" data-action="filter-radio" data-category="minProjects" value="1">1+ Project</button>
            </div>
          </div>

          <!-- Behavioral Scores: Builder, Problem Solving, Communication, Leadership -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Specialized Capability Scores</label>
            <div class="filter-pills-row">
              <button class="chip ${state.filters.builderSignals.has('builder_score') ? 'active' : ''}" data-action="filter-signal" data-value="builder_score">Builder 80+</button>
              <button class="chip ${state.filters.builderSignals.has('problem_solving') ? 'active' : ''}" data-action="filter-signal" data-value="problem_solving">Problem Solving 85+</button>
              <button class="chip ${state.filters.builderSignals.has('communication') ? 'active' : ''}" data-action="filter-signal" data-value="communication">Comm 80+</button>
              <button class="chip ${state.filters.builderSignals.has('leadership') ? 'active' : ''}" data-action="filter-signal" data-value="leadership">Leadership 80+</button>
            </div>
          </div>

          <!-- Profile Links Filter -->
          <div class="sub-filter-block">
            <label class="sub-filter-label">Professional Profiles</label>
            <div class="filter-pills-row">
              <button class="chip ${state.filters.hasGithub ? 'active' : ''}" data-action="filter-radio" data-category="hasGithub" value="true">${icons.github} Has GitHub</button>
              <button class="chip ${state.filters.hasLinkedin ? 'active' : ''}" data-action="filter-radio" data-category="hasLinkedin" value="true">${icons.linkedin} Has LinkedIn</button>
            </div>
          </div>
        </div>
      </details>
    </div>
  `;
}

// --- Preview Panel Renderer ---
export function renderPreviewPanel(cand, state) {
  if (!cand) return '';

  const isShortlisted = state.shortlistedIds.has(cand.id);

  return `
    <div class="preview-panel-header">
      <div style="display: flex; align-items: center; gap: var(--s1h);">
        <div class="avatar" style="width: var(--s4) - 4px; height: var(--s4) - 4px; font-size: var(--type-body-sm-size);">${sanitizeHtml(cand.avatar)}</div>
        <div>
          <div style="font-weight: 600; font-size: var(--type-body-size); color: var(--color-text-primary);">${sanitizeHtml(cand.name)}</div>
          <div style="font-size: var(--type-body-sm-size); color: var(--color-text-muted);">${sanitizeHtml(cand.headline)} · ${sanitizeHtml(cand.company)}</div>
        </div>
      </div>
      <button class="btn-icon" data-action="close-preview">${icons.close}</button>
    </div>

    <div class="preview-panel-body">
      ${renderStructuredBriefCard(cand)}

      ${cand.projects && cand.projects.length > 0 ? `
        <div>
          <div style="font-size: var(--type-caption-size); font-weight: 600; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: var(--s1);">
            TOP PROJECTS
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${cand.projects.map(p => `
              <div style="border: 1px solid var(--color-border-subtle); padding: var(--s1h); border-radius: 6px;">
                <div style="font-weight: 600; font-size: var(--type-body-sm-size);">${sanitizeHtml(p.name)} <span style="font-size: var(--type-caption-size); color: var(--color-accent-base); font-weight: 400;">(${sanitizeHtml(p.usersCount)})</span></div>
                <div style="font-size: var(--type-body-sm-size); color: var(--color-text-muted); margin: 4px 0;">${sanitizeHtml(p.description)}</div>
                <div class="skills-row">
                  ${p.techStack.map(t => `<span class="chip">${sanitizeHtml(t)}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>

    <div class="preview-panel-footer">
      <button class="btn btn-secondary btn-sm">↓ Download Resume</button>
      <button class="btn btn-ghost btn-sm" data-action="open-full-profile" data-id="${cand.id}">
        Full Profile Page →
      </button>
      <button class="btn ${isShortlisted ? 'btn-primary' : 'btn-secondary'} btn-sm" data-action="shortlist" data-id="${cand.id}">
        ${isShortlisted ? '★ Shortlisted' : 'Shortlist Candidate'}
      </button>
    </div>
  `;
}

// --- Full Profile Renderer ---
export function renderFullProfileView(cand, state) {
  if (!cand) return '<div style="padding:40px; text-align:center;">Select a candidate to view full profile.</div>';

  const isShortlisted = state.shortlistedIds.has(cand.id);

  // Normalized technical skills list
  const normalizedSkills = (cand.skills || []).map(s => {
    if (typeof s === 'object' && s.name) return s;
    return {
      name: String(s),
      score: Math.floor(75 + (cand.rankPercentile || 85) * 0.2),
      basis: `Assessed via ${String(s)} technical benchmark`
    };
  });

  return `
    <div style="max-width: var(--container-max-width); margin: 0 auto; padding: var(--s3);">
      
      <!-- 1. CANDIDATE HEADER -->
      <div id="candidate-header" class="candidate-card" style="padding: var(--s3); margin-bottom: var(--s2h); background: var(--color-bg-surface);">
        <div style="display: flex; gap: var(--s2h); align-items: flex-start; flex-wrap: wrap;">
          <div class="avatar" style="width: 80px; height: 80px; font-size: 28px; font-weight: 700; border: 3px solid var(--color-accent-base); flex-shrink: 0;">
            ${sanitizeHtml(cand.avatar)}
          </div>
          <div style="flex: 1; min-width: 280px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: var(--s2); flex-wrap: wrap;">
              <div>
                <div style="display: flex; align-items: center; gap: var(--s1h); flex-wrap: wrap;">
                  <h1 style="font-size: var(--type-h2-size); font-weight: 700; color: var(--color-text-primary); font-family: var(--font-family-display, inherit); margin: 0;">${sanitizeHtml(cand.name)}</h1>
                  <span class="badge ${cand.availability === 'Open to Work' ? 'badge-open-to-work' : 'badge-open-select'}" style="font-size: var(--type-caption-size); padding: 2px 8px;">
                    ● ${sanitizeHtml(cand.availability)}
                  </span>
                  ${cand.fitVerdict ? `
                    <span class="badge ${cand.fitVerdict.status === 'Strong Fit' ? 'badge-open-to-work' : 'badge-open-select'}" style="font-weight: 700; font-size: var(--type-caption-size); padding: 2px 8px;">
                      ${sanitizeHtml(cand.fitVerdict.status)}
                    </span>
                  ` : ''}
                </div>
                <div style="font-size: var(--type-body-sm-size); color: var(--color-text-secondary); margin-top: 4px; font-weight: 600;">
                  ${sanitizeHtml(cand.headline)} · ${sanitizeHtml(cand.company)}
                </div>
                <div style="font-size: var(--type-caption-size); color: var(--color-text-muted); margin-top: 6px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                  <span>📍 ${sanitizeHtml(cand.location)}</span> · 
                  <span>💻 ${sanitizeHtml(cand.workMode)}</span> · 
                  <span>⏳ ${cand.experienceYears} yrs exp</span> · 
                  <span>⚡ ${cand.noticePeriodDays === 0 ? 'Immediate (0d)' : cand.noticePeriodDays + 'd notice'}</span>
                </div>
              </div>

              <!-- Top Scores & Quick Actions -->
              <div style="display: flex; align-items: center; gap: var(--s1h); flex-wrap: wrap;">
                <div class="ai-hiring-score-box" style="padding: 6px 12px;">
                  <span class="score-num">${cand.aiHiringScore || 92}</span>
                  <span class="score-label">HiDevs AI Score</span>
                </div>
                <div class="ai-hiring-score-box" style="padding: 6px 12px; background: #FAF5FF; border-color: #D8B4FE; color: #6B21A8;">
                  <span class="score-num">${cand.builderProof?.builderScore || cand.performanceDashboard?.competencyMatrix?.executionScore || 94}</span>
                  <span class="score-label">Builder Score</span>
                </div>
                <button class="btn ${isShortlisted ? 'btn-primary' : 'btn-secondary'} btn-sm" data-action="shortlist" data-id="${cand.id}">
                  ${isShortlisted ? '★ Shortlisted' : 'Shortlist Candidate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Left Dossier Navigation + Right Section Cards Layout -->
      <div style="display: grid; grid-template-columns: 220px 1fr; gap: var(--s2h);">
        
        <!-- Sticky Navigation Menu -->
        <div style="position: sticky; top: 80px; height: fit-content;">
          <div style="font-size: var(--type-label-size); font-weight: 800; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: var(--s1); letter-spacing: 0.05em;">CANDIDATE PROFILE SECTIONS</div>
          <div class="dossier-nav-menu">
            <a href="#candidate-header" class="nav-link">👤 Candidate Header</a>
            <a href="#contact-info" class="nav-link">📞 Contact Information</a>
            <a href="#pro-summary" class="nav-link">📝 Professional Summary</a>
            <a href="#tech-skills" class="nav-link">🛠️ Technical Skills</a>
            <a href="#experience" class="nav-link">💼 Experience</a>
            <a href="#education" class="nav-link">🎓 Education</a>
            <a href="#projects" class="nav-link">🚀 Projects & Hackathons</a>
            <a href="#performance" class="nav-link">📊 Performance Matrix</a>
            <a href="#ai-evaluation" class="nav-link">📋 AI Evaluation Report</a>
            <a href="#coding-activity" class="nav-link">⚡ Coding Activity</a>
            <a href="#recruiter-insights" class="nav-link">🎯 Recruiter Insights</a>
          </div>
        </div>

        <!-- Right Section Cards Container -->
        <div style="display: flex; flex-direction: column; gap: var(--s2);">

          <!-- 2. CONTACT INFORMATION CARD -->
          <div id="contact-info" class="candidate-card" style="padding: 16px;">
            <div style="font-size: var(--type-caption-size); font-weight: 800; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 10px; letter-spacing: 0.04em;">
              📞 Contact Information & Credentials
            </div>
            <div class="info-grid-3col" style="margin-bottom: var(--s1h);">
              <div class="info-cell">
                <span class="cell-lbl">Email Address</span>
                <a href="mailto:${sanitizeHtml(cand.contact?.email || 'recruiter@hidevs.io')}" class="cell-val link-val">${icons.email} ${sanitizeHtml(cand.contact?.email || 'N/A')}</a>
              </div>
              <div class="info-cell">
                <span class="cell-lbl">Phone Number</span>
                <a href="tel:${sanitizeHtml(cand.contact?.phone || '+91 90000 00000')}" class="cell-val link-val">${icons.phone} ${sanitizeHtml(cand.contact?.phone || 'N/A')}</a>
              </div>
              <div class="info-cell">
                <span class="cell-lbl">Verified Resume</span>
                <button class="btn btn-secondary btn-xs" style="width: fit-content;">↓ Download Verified PDF Resume</button>
              </div>
            </div>
            <div class="links-row-flex" style="padding-top: 8px; border-top: 1px solid var(--color-border-subtle);">
              ${cand.links?.github ? `<a href="${sanitizeHtml(cand.links.github)}" target="_blank" class="pro-link-card">${icons.github} GitHub Profile</a>` : ''}
              ${cand.links?.linkedin ? `<a href="${sanitizeHtml(cand.links.linkedin)}" target="_blank" class="pro-link-card">${icons.linkedin} LinkedIn Profile</a>` : ''}
              ${cand.links?.portfolio ? `<a href="${sanitizeHtml(cand.links.portfolio)}" target="_blank" class="pro-link-card">${icons.portfolio} Portfolio Website</a>` : ''}
            </div>
          </div>

          <!-- 3. PROFESSIONAL SUMMARY CARD -->
          <div id="pro-summary" class="candidate-card" style="padding: 16px;">
            <div style="font-size: var(--type-caption-size); font-weight: 800; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: var(--s1); letter-spacing: 0.04em;">
              📝 Professional Summary
            </div>
            <p style="font-size: var(--type-body-sm-size); color: var(--color-text-secondary); line-height: 1.55; margin: 0;">
              ${sanitizeHtml(cand.about || cand.aiSummary)}
            </p>
          </div>

          <!-- 4. TECHNICAL SKILLS CARD -->
          <div id="tech-skills" class="candidate-card" style="padding: 16px;">
            <div style="font-size: var(--type-caption-size); font-weight: 800; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: var(--s1h); letter-spacing: 0.04em;">
              🛠️ Technical Skills & Preferred Stack
            </div>
            <!-- Preferred Tech Stack Progress Bars -->
            <div style="margin-bottom: var(--s1h);">
              <span class="cell-lbl" style="margin-bottom: 6px; display: block;">Preferred Tech Stack & Proficiency</span>
              <div class="tech-bars-grid">
                ${(cand.techStack?.preferred || [
                  { name: "Python", pct: 94, color: "#3776AB" },
                  { name: "FastAPI", pct: 90, color: "#009688" },
                  { name: "LangChain", pct: 88, color: "#1C3C3C" }
                ]).map(t => `
                  <div class="tech-bar-row">
                    <span class="tech-bar-label">${sanitizeHtml(t.name)}</span>
                    <div class="tech-bar-track"><div class="tech-bar-fill" style="width:${t.pct}%; background:${sanitizeHtml(t.color)};"></div></div>
                    <span class="tech-bar-pct">${t.pct}%</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <!-- Skill Distribution Badges -->
            <div style="margin-bottom: 10px;">
              <span class="cell-lbl" style="margin-bottom: var(--s0); display: block;">Assessed Primary Skills</span>
              <div class="skills-row">
                ${normalizedSkills.map(s => `<span class="chip active">${sanitizeHtml(s.name)} (${s.score})</span>`).join('')}
              </div>
            </div>
            <!-- Additional Skills Chips -->
            <div>
              <span class="cell-lbl" style="margin-bottom: var(--s0); display: block;">Additional Skills & Tools</span>
              <div class="skills-row">
                ${(cand.techStack?.additional || ['Redis', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS Lambda']).map(a => `<span class="chip chip-secondary">${sanitizeHtml(a)}</span>`).join('')}
              </div>
            </div>
          </div>

          <!-- 5. EXPERIENCE CARD -->
          <div id="experience" class="candidate-card" style="padding: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--s1h);">
              <div style="font-size: var(--type-caption-size); font-weight: 800; text-transform: uppercase; color: var(--color-text-muted); letter-spacing: 0.04em;">
                💼 Professional Experience Timeline
              </div>
              <span class="exp-band-badge">Total Experience: ${cand.experienceYears} Years</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: var(--s1h);">
              ${(cand.experience || [
                { title: `${cand.experienceYears > 5 ? 'Senior' : 'Software'} Engineer`, company: cand.company, duration: "2023 - Present", highlights: [`Built core high-throughput production features.`, `Improved pipeline efficiency by 25%.`] }
              ]).map(e => `
                <div style="padding: var(--s1h) 12px; background: var(--color-bg-subtle); border-radius: var(--radius-sm); border: 1px solid var(--color-border-subtle);">
                  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--s0);">
                    <strong style="font-size: var(--type-body-sm-size); color: var(--color-text-primary);">${sanitizeHtml(e.title)}</strong>
                    <span style="font-size: var(--type-caption-size); color: var(--color-text-muted); font-weight: 600;">${sanitizeHtml(e.duration)}</span>
                  </div>
                  <div style="font-size: var(--type-caption-size); color: var(--color-text-secondary); font-weight: 600; margin-bottom: 6px;">
                    🏢 ${sanitizeHtml(e.company)}
                  </div>
                  <ul style="margin: 0; padding-left: 16px; font-size: var(--type-caption-size); color: var(--color-text-secondary);">
                    ${(e.highlights || []).map(h => `<li style="margin-bottom: 2px;">${sanitizeHtml(h)}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 6. EDUCATION CARD -->
          <div id="education" class="candidate-card" style="padding: 16px;">
            <div style="font-size: var(--type-caption-size); font-weight: 800; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 10px; letter-spacing: 0.04em;">
              🎓 Academic Background & Credentials
            </div>
            <div class="education-card-row" style="margin: 0;">
              <span class="edu-icon">🎓</span>
              <span class="edu-text"><strong>${sanitizeHtml(cand.education?.degree || 'B.Tech in Computer Science')}</strong> · ${sanitizeHtml(cand.education?.college || 'IIT Madras')} ('${cand.education?.graduationYear || 2020})</span>
              ${cand.education?.cgpa ? `<span class="cgpa-badge">CGPA: ${cand.education.cgpa} / 10</span>` : ''}
            </div>
          </div>

          <!-- 7. PROJECTS & HACKATHONS CARD -->
          <div id="projects" class="candidate-card" style="padding: 16px;">
            <div style="font-size: var(--type-caption-size); font-weight: 800; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: var(--s1h); letter-spacing: 0.04em;">
              🚀 Featured Projects, Personal Projects & Hackathons
            </div>
            <div style="display: flex; flex-direction: column; gap: var(--s1h);">
              ${(cand.projects || [
                { name: `Production ML Pipeline`, description: `High-throughput asynchronous inference engine`, techStack: ['Python', 'FastAPI'], usersCount: '500+ daily active users', verified: true }
              ]).map(p => `
                <div style="padding: var(--s1h) 12px; background: var(--color-bg-subtle); border-radius: var(--radius-sm); border: 1px solid var(--color-border-subtle);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--s0);">
                    <strong style="font-size: var(--type-caption-size); color: var(--color-text-primary);">${sanitizeHtml(p.name)}</strong>
                    ${p.verified ? `<span class="eval-verified-badge">Verified Project</span>` : ''}
                  </div>
                  <p style="font-size: var(--type-caption-size); color: var(--color-text-secondary); margin: 0 0 6px 0;">${sanitizeHtml(p.description)}</p>
                  <div class="skills-row">
                    ${(p.techStack || []).map(t => `<span class="chip chip-secondary">${sanitizeHtml(t)}</span>`).join('')}
                  </div>
                </div>
              `).join('')}

              ${(cand.hackathons || []).length > 0 ? `
                <div style="margin-top: 6px;">
                  <span class="cell-lbl" style="margin-bottom: var(--s0); display: block;">Hackathons & Challenges</span>
                  ${cand.hackathons.map(h => `
                    <div style="font-size: var(--type-caption-size); color: var(--color-text-secondary); font-weight: 600;">
                      🏆 ${sanitizeHtml(h.name)} — <span style="color:#047857;">Rank: ${sanitizeHtml(h.rank)}</span> (${sanitizeHtml(h.date)})
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          </div>

          <!-- 8. PERFORMANCE CARD -->
          <div id="performance" class="candidate-card" style="padding: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--s1h);">
              <div style="font-size: var(--type-caption-size); font-weight: 800; text-transform: uppercase; color: #6B21A8; letter-spacing: 0.04em;">
                📊 Developer Performance & Competency Matrix
              </div>
              <span class="exp-band-badge">${sanitizeHtml(cand.performanceDashboard?.experienceBand || 'Mid-Senior (3-5 Yrs)')}</span>
            </div>
            <div class="competency-matrix-grid">
              <div class="matrix-card">
                <span class="matrix-lbl">Problem Solving</span>
                <div class="matrix-bar"><div class="matrix-fill" style="width: ${cand.performanceDashboard?.competencyMatrix?.problemSolving || 90}%;"></div></div>
                <span class="matrix-score">${cand.performanceDashboard?.competencyMatrix?.problemSolving || 90} / 100</span>
              </div>
              <div class="matrix-card">
                <span class="matrix-lbl">Execution Quality</span>
                <div class="matrix-bar"><div class="matrix-fill purple" style="width: ${cand.performanceDashboard?.competencyMatrix?.executionScore || 94}%;"></div></div>
                <span class="matrix-score">${cand.performanceDashboard?.competencyMatrix?.executionScore || 94} / 100</span>
              </div>
              <div class="matrix-card">
                <span class="matrix-lbl">System Design</span>
                <div class="matrix-bar"><div class="matrix-fill blue" style="width: ${cand.performanceDashboard?.competencyMatrix?.systemDesign || 86}%;"></div></div>
                <span class="matrix-score">${cand.performanceDashboard?.competencyMatrix?.systemDesign || 86} / 100</span>
              </div>
              <div class="matrix-card">
                <span class="matrix-lbl">Communication</span>
                <div class="matrix-bar"><div class="matrix-fill green" style="width: ${cand.performanceDashboard?.competencyMatrix?.communication || 88}%;"></div></div>
                <span class="matrix-score">${cand.performanceDashboard?.competencyMatrix?.communication || 88} / 100</span>
              </div>
              <div class="matrix-card">
                <span class="matrix-lbl">Reliability</span>
                <div class="matrix-bar"><div class="matrix-fill amber" style="width: ${cand.performanceDashboard?.competencyMatrix?.reliabilityScore || 92}%;"></div></div>
                <span class="matrix-score">${cand.performanceDashboard?.competencyMatrix?.reliabilityScore || 92} / 100</span>
              </div>
            </div>
          </div>

          <!-- 9. AI EVALUATION CARD -->
          <div id="ai-evaluation" class="candidate-card" style="padding: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <div style="font-size: var(--type-caption-size); font-weight: 800; text-transform: uppercase; color: var(--color-text-primary); letter-spacing: 0.04em;">
                📋 AI Evaluation Report
              </div>
              <button class="btn btn-secondary download-pdf-btn">↓ Download PDF Report</button>
            </div>
            <div class="eval-exec-summary">
              <strong>Executive Summary:</strong> ${sanitizeHtml(cand.evaluationReport?.executiveSummary || cand.aiSummary)}
            </div>
            <div class="eval-tables-grid">
              <div>
                <div class="eval-table-title">Weighted Assessment Criteria</div>
                <table class="weighted-criteria-table">
                  <thead>
                    <tr><th>Criteria</th><th>Weight</th><th>Score</th><th>Rating</th></tr>
                  </thead>
                  <tbody>
                    ${(cand.evaluationReport?.weightedCriteria || [
                      { criterion: "System Architecture", weight: "35%", score: "92/100", status: "Strong" },
                      { criterion: "Code Quality & Testing", weight: "25%", score: "90/100", status: "High" },
                      { criterion: "Problem Solving & Logic", weight: "20%", score: "88/100", status: "Good" }
                    ]).map(r => `
                      <tr><td>${sanitizeHtml(r.criterion)}</td><td><span class="weight-chip">${sanitizeHtml(r.weight)}</span></td><td><strong>${sanitizeHtml(r.score)}</strong></td><td><span class="status-badge badge-green">${sanitizeHtml(r.status)}</span></td></tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
              <div>
                <div class="sw-block">
                  <div class="sw-title">Verified Key Strengths</div>
                  <ul class="sw-list">
                    ${(cand.evaluationReport?.strengths || [`Proven production experience in complex backend & distributed systems.`]).map(st => `<li>🟢 ${sanitizeHtml(st)}</li>`).join('')}
                  </ul>
                </div>
                <div class="sw-block">
                  <div class="sw-title">Areas for Improvement</div>
                  <ul class="sw-list">
                    ${(cand.evaluationReport?.areasForImprovement || [`Expand cross-functional team lead experience.`]).map(af => `<li>💡 ${sanitizeHtml(af)}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- 10. CODING ACTIVITY CARD -->
          <div id="coding-activity" class="candidate-card" style="padding: 16px; background: #F0FDFA; border-color: #99F6E4;">
            <div style="font-size: var(--type-caption-size); font-weight: 800; text-transform: uppercase; color: #0F766E; margin-bottom: 10px; letter-spacing: 0.04em;">
              ⚡ Coding Activity & Platform Metrics
            </div>
            <div class="coding-metrics-grid">
              <div class="coding-metric-card">
                <span class="metric-icon">🎯</span>
                <div class="metric-details">
                  <span class="metric-count">${cand.builderProof?.codeQuestCompleted || 42}</span>
                  <span class="metric-lbl-text">CodeQuest Completed</span>
                </div>
              </div>
              <div class="coding-metric-card">
                <span class="metric-icon">🤖</span>
                <div class="metric-details">
                  <span class="metric-count">${cand.builderProof?.leetZPromptsCompleted || 128}</span>
                  <span class="metric-lbl-text">LeetZ Prompts Completed</span>
                </div>
              </div>
              <div class="coding-metric-card trend-card">
                <div class="trend-header">
                  <span class="metric-lbl-text">6-Month Trend</span>
                  <span class="trend-badge">Active Growth</span>
                </div>
                <div class="trend-sparkline-row">
                  <div class="sparkline-bar" style="height: 35%;"></div>
                  <div class="sparkline-bar" style="height: 50%;"></div>
                  <div class="sparkline-bar" style="height: 65%;"></div>
                  <div class="sparkline-bar" style="height: 80%;"></div>
                  <div class="sparkline-bar" style="height: 90%;"></div>
                  <div class="sparkline-bar" style="height: 100%;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 11. RECRUITER INSIGHTS CARD -->
          <div id="recruiter-insights" class="candidate-card" style="padding: 16px;">
            <div style="font-size: var(--type-caption-size); font-weight: 800; text-transform: uppercase; color: var(--color-accent-base); margin-bottom: 10px; letter-spacing: 0.04em;">
              🎯 Recruiter Insights & Hiring Decision Rationale
            </div>
            <div class="info-grid-2col" style="margin-bottom: 10px;">
              <div class="info-cell">
                <span class="cell-lbl">Best Suited Roles</span>
                <div class="suited-tags-group">
                  ${(cand.bestSuitedFor || ['Senior Backend Engineer', 'AI Systems Engineer']).map(r => `<span class="suited-tag">${sanitizeHtml(r)}</span>`).join('')}
                </div>
              </div>
              <div class="info-cell">
                <span class="cell-lbl">Key Hiring Reasons</span>
                <ul style="margin: 0; padding-left: 14px; font-size: var(--type-caption-size); color: var(--color-text-secondary);">
                  ${(cand.whyInterview || [{ claim: `Proven ${cand.company} tenure`, evidence: `Built high-throughput production services.` }]).map(w => `<li><strong>${sanitizeHtml(w.claim)}:</strong> ${sanitizeHtml(w.evidence)}</li>`).join('')}
                </ul>
              </div>
            </div>
            <div class="info-grid-2col" style="padding-top: 8px; border-top: 1px solid var(--color-border-subtle);">
              <div class="info-cell">
                <span class="cell-lbl" style="color: #D97706;">Potential Risks / Verification Points</span>
                <ul style="margin: 0; padding-left: 14px; font-size: var(--type-caption-size); color: #B45309;">
                  ${(cand.potentialConcerns || [`Notice period is ${cand.noticePeriodDays} days — verify timeline compatibility.`]).map(pc => `<li>${sanitizeHtml(pc)}</li>`).join('')}
                </ul>
              </div>
              <div class="info-cell">
                <span class="cell-lbl">Suggested Interview Focus Areas</span>
                <ul style="margin: 0; padding-left: 14px; font-size: var(--type-caption-size); color: var(--color-text-secondary);">
                  <li>Evaluate core system architecture and engineering depth.</li>
                  <li>Verify production throughput and deployment velocity.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

// --- Workspace Pipeline Renderer ---
export function renderWorkspaceView(state) {
  const allCandidates = state.candidates;
  
  return `
    <div style="max-width: var(--container-max-width); margin: 0 auto; padding: var(--s3); width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: var(--type-h2-size); font-weight: 700;">Recruiter Hiring Workspace</h1>
          <div style="font-size: var(--type-body-sm-size); color: var(--color-text-muted);">Manage candidate pipelines with drag-and-drop workflow stages.</div>
        </div>
      </div>

      <div class="kanban-board">
        <div class="kanban-column" data-stage="saved">
          <div class="kanban-column-header">SAVED <span>(${state.pipeline.saved.length})</span></div>
          <div class="kanban-cards-container" style="display: flex; flex-direction: column; gap: 8px; flex: 1;">
            ${state.pipeline.saved.map(id => allCandidates.find(c => c.id === id)).filter(Boolean).map(c => renderKanbanCard(c, 'saved')).join('')}
          </div>
        </div>
        <div class="kanban-column" data-stage="shortlisted">
          <div class="kanban-column-header">SHORTLISTED <span>(${state.pipeline.shortlisted.length})</span></div>
          <div class="kanban-cards-container" style="display: flex; flex-direction: column; gap: 8px; flex: 1;">
            ${state.pipeline.shortlisted.map(id => allCandidates.find(c => c.id === id)).filter(Boolean).map(c => renderKanbanCard(c, 'shortlisted')).join('')}
          </div>
        </div>
        <div class="kanban-column" data-stage="interview">
          <div class="kanban-column-header">INTERVIEW PLANNED <span>(${state.pipeline.interview.length})</span></div>
          <div class="kanban-cards-container" style="display: flex; flex-direction: column; gap: 8px; flex: 1;">
            ${state.pipeline.interview.map(id => allCandidates.find(c => c.id === id)).filter(Boolean).map(c => renderKanbanCard(c, 'interview')).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderKanbanCard(cand, stage) {
  return `
    <div class="kanban-card" draggable="true" data-action="open-full-profile" data-id="${cand.id}" data-stage="${stage}">
      <div style="font-weight: 600; font-size: var(--type-body-sm-size); color: var(--color-text-primary); margin-bottom: 2px;">${cand.name}</div>
      <div style="font-size: var(--type-caption-size); color: var(--color-text-muted); margin-bottom: 6px;">${cand.headline}</div>
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: var(--type-caption-size);">
        <span style="color: var(--color-accent-base); font-weight: 500;">★ Top ${cand.builderProof.aiRankPercentile}% AI Rank</span>
        <span style="color: var(--color-text-muted);">⋮</span>
      </div>
    </div>
  `;
}

/* ==========================================================================
   HiDevs Hiring Search Engine — Clean Component Renderers
   ========================================================================== */

import { mockQuickFilters } from './mockData.js';
import { icons, sanitizeHtml } from './utils.js';

// --- Candidate Card Renderer ---
export function renderCandidateCard(cand, state) {
  const isShortlisted = state.shortlistedIds.has(cand.id);
  const isCompared = state.compareQueue.has(cand.id);

  return `
    <div class="candidate-card" data-id="${cand.id}">
      <div class="card-header-row">
        <div class="avatar">${sanitizeHtml(cand.avatar)}</div>
        <div class="candidate-info">
          <div class="candidate-name" data-action="open-preview" data-id="${cand.id}">${sanitizeHtml(cand.name)}</div>
          <div class="candidate-headline">${sanitizeHtml(cand.headline)} · ${sanitizeHtml(cand.company)}</div>
          <div class="candidate-meta">
            <span>${sanitizeHtml(cand.location)}</span> · 
            <span>${sanitizeHtml(cand.workMode)}</span> · 
            <span>${cand.experienceYears} yrs exp</span> · 
            <span>${cand.noticePeriodDays === 0 ? 'Immediate' : cand.noticePeriodDays + 'd notice'}</span>
          </div>
        </div>
        <span class="badge ${cand.availability === 'Open to Work' ? 'badge-open-to-work' : 'badge-open-select'}">
          ${sanitizeHtml(cand.availability)}
        </span>
      </div>

      <div class="card-divider"></div>

      <div class="skills-row">
        ${cand.primarySkills.map(s => `<span class="chip active">${sanitizeHtml(s)}</span>`).join('')}
        ${cand.skills.filter(s => !cand.primarySkills.includes(s)).slice(0, 3).map(s => `<span class="chip">${sanitizeHtml(s)}</span>`).join('')}
        ${cand.skills.length > 6 ? `<span class="chip">+${cand.skills.length - 6} more</span>` : ''}
      </div>

      <div class="builder-proof-line">
        ⚡ ${cand.builderProof.projectsCount} Projects · 🏆 ${cand.builderProof.hackathonWinsCount} Hackathon Wins · ★ Top ${cand.builderProof.aiRankPercentile}% AI Rank
      </div>

      <div class="ai-summary-box">
        <strong>AI Summary:</strong> ${sanitizeHtml(cand.aiSummary)}
      </div>

      <div class="card-divider"></div>

      <div class="card-footer">
        <div>Active ${sanitizeHtml(cand.lastActive)}</div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-ghost btn-sm" data-action="compare" data-id="${cand.id}">
            ${isCompared ? '✓ Compared' : '+ Compare'}
          </button>
          <button class="btn btn-ghost btn-sm" data-action="open-preview" data-id="${cand.id}">
            View Profile →
          </button>
          <button class="btn ${isShortlisted ? 'btn-primary' : 'btn-secondary'} btn-sm" data-action="shortlist" data-id="${cand.id}">
            ${isShortlisted ? '★ Shortlisted' : 'Shortlist'}
          </button>
        </div>
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

// --- Filter Sidebar Renderer ---
export function renderFilterSidebar(state) {
  const skillsList = ["Python", "FastAPI", "LangChain", "React", "TypeScript", "Go", "Docker", "PyTorch"];
  const roleList = ["AI / ML Engineer", "Backend", "Full Stack", "Platform Engineering"];

  const renderSectionHeader = (title, hasActive, sectionKey) => `
    <div class="filter-section-title" style="display: flex; justify-content: space-between; align-items: center;">
      <span>${title}</span>
      ${hasActive ? `<button class="btn btn-ghost btn-sm" data-action="clear-section" data-section="${sectionKey}" style="padding:0; font-size:11px; color:var(--color-accent-base); font-weight:500;">Clear</button>` : ''}
    </div>
  `;

  return `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="font-weight: 600; font-size: 14px;">FILTERS</span>
      <button class="btn btn-ghost btn-sm" data-action="clear-filters" style="padding:0;">Clear All</button>
    </div>

    <!-- Location -->
    <div class="filter-section">
      ${renderSectionHeader("Location", Boolean(state.filters.location), "location")}
      <div style="margin-top: 8px;">
        <input type="text" class="global-search-input" placeholder="e.g. Bangalore, Remote, Delhi..." value="${sanitizeHtml(state.filters.location || '')}" data-action="filter-location-input" style="width: 100%; height: 32px; padding: 0 10px; font-size: 13px;">
      </div>
    </div>

    <!-- Availability -->
    <div class="filter-section">
      ${renderSectionHeader("Availability", Boolean(state.filters.availability), "availability")}
      <div class="filter-options-list" style="margin-top: 6px;">
        <label class="form-check">
          <input type="radio" name="availability" value="Open to Work" ${state.filters.availability === 'Open to Work' ? 'checked' : ''} data-action="filter-radio" data-category="availability">
          <span>Open to Work</span>
        </label>
        <label class="form-check">
          <input type="radio" name="availability" value="Open to Select Roles" ${state.filters.availability === 'Open to Select Roles' ? 'checked' : ''} data-action="filter-radio" data-category="availability">
          <span>Open to Select Roles</span>
        </label>
      </div>
    </div>

    <!-- Role Type -->
    <div class="filter-section">
      ${renderSectionHeader("Role Type", state.filters.roleTypes.size > 0, "roleTypes")}
      <div class="filter-options-list" style="margin-top: 6px;">
        ${roleList.map(r => `
          <label class="form-check">
            <input type="checkbox" ${state.filters.roleTypes.has(r) ? 'checked' : ''} data-action="filter-role" data-value="${r}">
            <span>${r}</span>
          </label>
        `).join('')}
      </div>
    </div>

    <!-- Skills -->
    <div class="filter-section">
      ${renderSectionHeader("Skills & Stack", state.filters.skills.size > 0, "skills")}
      <div class="skills-row" style="margin-top: 8px;">
        ${skillsList.map(s => `
          <span class="chip ${state.filters.skills.has(s) ? 'active' : ''}" data-action="filter-skill" data-value="${s}">
            ${s}
          </span>
        `).join('')}
      </div>
    </div>

    <!-- Experience Level -->
    <div class="filter-section">
      ${renderSectionHeader("Experience Level", Boolean(state.filters.experienceLevel), "experienceLevel")}
      <div class="filter-options-list" style="margin-top: 6px;">
        <label class="form-check">
          <input type="radio" name="experienceLevel" value="0-2" ${state.filters.experienceLevel === '0-2' ? 'checked' : ''} data-action="filter-radio" data-category="experienceLevel">
          <span>0-2 Years</span>
        </label>
        <label class="form-check">
          <input type="radio" name="experienceLevel" value="3-5" ${state.filters.experienceLevel === '3-5' ? 'checked' : ''} data-action="filter-radio" data-category="experienceLevel">
          <span>3-5 Years</span>
        </label>
        <label class="form-check">
          <input type="radio" name="experienceLevel" value="6+" ${state.filters.experienceLevel === '6+' ? 'checked' : ''} data-action="filter-radio" data-category="experienceLevel">
          <span>6+ Years</span>
        </label>
      </div>
    </div>

    <!-- Top AI Rank % -->
    <div class="filter-section">
      ${renderSectionHeader(`Top AI Rank (${state.filters.rankingPercentile}%)`, state.filters.rankingPercentile < 100, "rankingPercentile")}
      <div style="margin-top: 8px;">
        <input type="range" min="5" max="100" step="5" value="${state.filters.rankingPercentile}" data-action="filter-rank-range" style="width: 100%; cursor: pointer; accent-color: var(--color-accent-base);">
        <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--color-text-muted); margin-top: 4px;">
          <span>Top 5%</span>
          <span>Top 100%</span>
        </div>
      </div>
    </div>

    <!-- Work Mode -->
    <div class="filter-section">
      ${renderSectionHeader("Work Mode", Boolean(state.filters.workMode), "workMode")}
      <div class="filter-options-list" style="margin-top: 6px;">
        <label class="form-check">
          <input type="radio" name="workMode" value="Remote" ${state.filters.workMode === 'Remote' ? 'checked' : ''} data-action="filter-radio" data-category="workMode">
          <span>Remote Only</span>
        </label>
        <label class="form-check">
          <input type="radio" name="workMode" value="Hybrid" ${state.filters.workMode === 'Hybrid' ? 'checked' : ''} data-action="filter-radio" data-category="workMode">
          <span>Hybrid</span>
        </label>
      </div>
    </div>

    <!-- Builder Signals -->
    <div class="filter-section" style="border-bottom: none;">
      ${renderSectionHeader("★ BUILDER SIGNALS", state.filters.builderSignals.size > 0, "builderSignals")}
      <div class="filter-options-list" style="margin-top: 6px;">
        <label class="form-check">
          <input type="checkbox" ${state.filters.builderSignals.has('hackathon') ? 'checked' : ''} data-action="filter-signal" data-value="hackathon">
          <span>Hackathon Winner</span>
        </label>
        <label class="form-check">
          <input type="checkbox" ${state.filters.builderSignals.has('deployed') ? 'checked' : ''} data-action="filter-signal" data-value="deployed">
          <span>Has Deployed Projects</span>
        </label>
      </div>
    </div>
  `;
}

// --- Preview Panel Renderer ---
export function renderPreviewPanel(cand, state) {
  if (!cand) return '';

  const isShortlisted = state.shortlistedIds.has(cand.id);

  return `
    <div class="preview-panel-header">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div class="avatar" style="width: 36px; height: 36px; font-size: 14px;">${sanitizeHtml(cand.avatar)}</div>
        <div>
          <div style="font-weight: 600; font-size: 15px; color: var(--color-text-primary);">${sanitizeHtml(cand.name)}</div>
          <div style="font-size: 13px; color: var(--color-text-muted);">${sanitizeHtml(cand.headline)} · ${sanitizeHtml(cand.company)}</div>
        </div>
      </div>
      <button class="btn-icon" data-action="close-preview">${icons.close}</button>
    </div>

    <div class="preview-panel-body">
      ${renderStructuredBriefCard(cand)}

      ${cand.projects && cand.projects.length > 0 ? `
        <div>
          <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 8px;">
            TOP PROJECTS
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${cand.projects.map(p => `
              <div style="border: 1px solid var(--color-border-subtle); padding: 10px; border-radius: 6px;">
                <div style="font-weight: 600; font-size: 14px;">${sanitizeHtml(p.name)} <span style="font-size: 12px; color: var(--color-accent-base); font-weight: 400;">(${sanitizeHtml(p.usersCount)})</span></div>
                <div style="font-size: 13px; color: var(--color-text-muted); margin: 4px 0;">${sanitizeHtml(p.description)}</div>
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
  if (!cand) return '<div style="padding:40px;">Select a candidate to view full profile.</div>';

  const isShortlisted = state.shortlistedIds.has(cand.id);

  return `
    <div style="max-width: var(--container-max-width); margin: 0 auto; padding: 24px;">
      <div style="background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); padding: 32px; margin-bottom: 24px;">
        <div style="display: flex; gap: 24px; align-items: flex-start;">
          <div class="avatar" style="width: 72px; height: 72px; font-size: 24px;">${cand.avatar}</div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <h1 style="font-size: 24px; font-weight: 700;">${cand.name}</h1>
                <div style="font-size: 16px; color: var(--color-text-secondary); margin-top: 4px;">${cand.headline} · ${cand.company}</div>
                <div style="font-size: 14px; color: var(--color-text-muted); margin-top: 4px;">
                  ${cand.experienceYears} yrs exp · ${cand.location} · ${cand.workMode} · ${cand.noticePeriodDays}d notice period
                </div>
              </div>
              <span class="badge badge-open-to-work">${cand.availability}</span>
            </div>
            <div style="margin-top: 16px; display: flex; gap: 12px;">
              <button class="btn ${isShortlisted ? 'btn-primary' : 'btn-secondary'}" data-action="shortlist" data-id="${cand.id}">
                ${isShortlisted ? '★ Shortlisted' : 'Shortlist Candidate'}
              </button>
              <button class="btn btn-secondary">✉ Send Message</button>
            </div>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 200px 1fr; gap: 24px;">
        <div style="position: sticky; top: 80px; height: fit-content;">
          <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 12px;">NAVIGATE</div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 14px;">
            <a href="#summary" class="nav-link active">● Hiring Summary</a>
            <a href="#intelligence" class="nav-link">○ Intelligence Cards</a>
            <a href="#timeline" class="nav-link">○ Builder Timeline</a>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div id="summary" style="background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-radius: 8px; padding: 24px;">
            <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 12px;">Recruiter Hiring Summary</h2>
            ${renderStructuredBriefCard(cand)}
          </div>

          <div id="intelligence">
            <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 12px;">HiDevs Exclusive Intelligence Cards</h2>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${cand.intelligenceCards.map(c => `
                <div class="intel-card">
                  <div class="intel-card-header">
                    <span class="intel-card-title">${c.title}</span>
                    <span class="intel-signal-tag">${c.signal}</span>
                  </div>
                  <div class="intel-observation">${c.observation}</div>
                  <div class="intel-takeaway">${c.takeaway}</div>
                </div>
              `).join('')}
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
    <div style="max-width: var(--container-max-width); margin: 0 auto; padding: 24px; width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 24px; font-weight: 700;">Recruiter Hiring Workspace</h1>
          <div style="font-size: 14px; color: var(--color-text-muted);">Manage candidate pipelines with drag-and-drop workflow stages.</div>
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
      <div style="font-weight: 600; font-size: 14px; color: var(--color-text-primary); margin-bottom: 2px;">${cand.name}</div>
      <div style="font-size: 12px; color: var(--color-text-muted); margin-bottom: 6px;">${cand.headline}</div>
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
        <span style="color: var(--color-accent-base); font-weight: 500;">★ Top ${cand.builderProof.aiRankPercentile}% AI Rank</span>
        <span style="color: var(--color-text-muted);">⋮</span>
      </div>
    </div>
  `;
}

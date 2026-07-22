/* ==========================================================================
   HiDevs Hiring Search Engine — Modular Component Renderers
   ========================================================================== */

import { store } from './store.js';
import { mockQuickFilters } from './mockData.js';

// --- Helper: Render SVG Icons ---
export const icons = {
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  star: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  close: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
};

// --- Candidate Card Renderer ---
export function renderCandidateCard(cand, state) {
  const isShortlisted = state.shortlistedIds.has(cand.id);
  const isCompared = state.compareQueue.has(cand.id);

  return `
    <div class="candidate-card" data-id="${cand.id}">
      <div class="card-header-row">
        <div class="avatar">${cand.avatar}</div>
        <div class="candidate-info">
          <div class="candidate-name" data-action="open-preview" data-id="${cand.id}">${cand.name}</div>
          <div class="candidate-headline">${cand.headline} · ${cand.company}</div>
          <div class="candidate-meta">
            <span>${cand.location}</span> · 
            <span>${cand.workMode}</span> · 
            <span>${cand.experienceYears} yrs exp</span> · 
            <span>${cand.noticePeriodDays === 0 ? 'Immediate' : cand.noticePeriodDays + 'd notice'}</span>
          </div>
        </div>
        <span class="badge ${cand.availability === 'Open to Work' ? 'badge-open-to-work' : 'badge-open-select'}">
          ${cand.availability}
        </span>
      </div>

      <div class="card-divider"></div>

      <div class="skills-row">
        ${cand.primarySkills.map(s => `<span class="chip active">${s}</span>`).join('')}
        ${cand.skills.filter(s => !cand.primarySkills.includes(s)).slice(0, 3).map(s => `<span class="chip">${s}</span>`).join('')}
        ${cand.skills.length > 6 ? `<span class="chip">+${cand.skills.length - 6} more</span>` : ''}
      </div>

      <div class="builder-proof-line">
        ⚡ ${cand.builderProof.projectsCount} Projects · 🏆 ${cand.builderProof.hackathonWinsCount} Hackathon Wins · ★ Top ${cand.builderProof.aiRankPercentile}% AI Rank
      </div>

      <div class="ai-summary-box">
        <strong>AI Summary:</strong> ${cand.aiSummary}
      </div>

      <div class="card-divider"></div>

      <div class="card-footer">
        <div>Active ${cand.lastActive}</div>
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

  return `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="font-weight: 600; font-size: 14px;">FILTERS</span>
      <button class="btn btn-ghost btn-sm" data-action="clear-filters" style="padding:0;">Clear All</button>
    </div>

    <!-- Section A: Availability -->
    <div class="filter-section">
      <div class="filter-section-title">Availability</div>
      <div class="filter-options-list">
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

    <!-- Section B: Role Type -->
    <div class="filter-section">
      <div class="filter-section-title">Role Type</div>
      <div class="filter-options-list">
        ${roleList.map(r => `
          <label class="form-check">
            <input type="checkbox" ${state.filters.roleTypes.has(r) ? 'checked' : ''} data-action="filter-role" data-value="${r}">
            <span>${r}</span>
          </label>
        `).join('')}
      </div>
    </div>

    <!-- Section C: Skills -->
    <div class="filter-section">
      <div class="filter-section-title">Skills & Stack</div>
      <div class="skills-row" style="margin-top: 8px;">
        ${skillsList.map(s => `
          <span class="chip ${state.filters.skills.has(s) ? 'active' : ''}" data-action="filter-skill" data-value="${s}">
            ${s}
          </span>
        `).join('')}
      </div>
    </div>

    <!-- Section D: Work Mode -->
    <div class="filter-section">
      <div class="filter-section-title">Work Mode</div>
      <div class="filter-options-list">
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

    <!-- Section E: Builder Signals (HiDevs Exclusive) -->
    <div class="filter-section" style="border-bottom: none;">
      <div class="filter-section-title" style="color: var(--color-accent-base);">
        ★ BUILDER SIGNALS
      </div>
      <div class="filter-options-list">
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

// --- Slide-Over Preview Panel Renderer ---
export function renderPreviewPanel(cand, state) {
  if (!cand) return '';

  const isShortlisted = state.shortlistedIds.has(cand.id);

  return `
    <div class="preview-panel-header">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div class="avatar" style="width: 36px; height: 36px; font-size: 14px;">${cand.avatar}</div>
        <div>
          <div style="font-weight: 600; font-size: 15px; color: var(--color-text-primary);">${cand.name}</div>
          <div style="font-size: 13px; color: var(--color-text-muted);">${cand.headline} · ${cand.company}</div>
        </div>
      </div>
      <button class="btn-icon" data-action="close-preview">${icons.close}</button>
    </div>

    <div class="preview-panel-body">
      <!-- AI Decision Brief -->
      <div class="ai-summary-box">
        <strong>AI Decision Brief:</strong> ${cand.aiSummary}
      </div>

      <!-- Why Interview Section -->
      <div>
        <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 8px;">
          WHY INTERVIEW THIS CANDIDATE
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${cand.whyInterview.map(item => `
            <div style="font-size: 13px; background: var(--color-bg-base); padding: 8px 12px; border-radius: 6px;">
              <div style="font-weight: 600; color: var(--color-text-primary);">✓ ${item.claim}</div>
              <div style="color: var(--color-text-muted); margin-top: 2px;">${item.evidence}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Builder Proof Extended -->
      <div>
        <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 8px;">
          BUILDER PROOF & SIGNALS
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div style="background: var(--color-bg-base); padding: 10px; border-radius: 6px; text-align: center;">
            <div style="font-size: 18px; font-weight: 700; color: var(--color-accent-base);">${cand.builderProof.projectsCount}</div>
            <div style="font-size: 12px; color: var(--color-text-muted);">Projects (${cand.builderProof.deployedProjectsCount} deployed)</div>
          </div>
          <div style="background: var(--color-bg-base); padding: 10px; border-radius: 6px; text-align: center;">
            <div style="font-size: 18px; font-weight: 700; color: var(--color-accent-base);">Top ${cand.builderProof.aiRankPercentile}%</div>
            <div style="font-size: 12px; color: var(--color-text-muted);">AI Challenge Rank</div>
          </div>
        </div>
      </div>

      <!-- Project Showcase -->
      <div>
        <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 8px;">
          TOP PROJECTS
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${cand.projects.map(p => `
            <div style="border: 1px solid var(--color-border-subtle); padding: 10px; border-radius: 6px;">
              <div style="font-weight: 600; font-size: 14px;">${p.name} <span style="font-size: 12px; color: var(--color-accent-base); font-weight: 400;">(${p.usersCount})</span></div>
              <div style="font-size: 13px; color: var(--color-text-muted); margin: 4px 0;">${p.description}</div>
              <div class="skills-row">
                ${p.techStack.map(t => `<span class="chip">${t}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Intelligence Cards Preview -->
      <div>
        <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 8px;">
          HIDEVS INTELLIGENCE
        </div>
        ${cand.intelligenceCards.map(c => `
          <div class="intel-card" style="margin-bottom: 8px;">
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

// --- Full Profile View Renderer (Phase 6 Workspace View) ---
export function renderFullProfileView(cand, state) {
  if (!cand) return '<div style="padding:40px;">Select a candidate to view full profile.</div>';

  const isShortlisted = state.shortlistedIds.has(cand.id);

  return `
    <div style="max-width: var(--container-max-width); margin: 0 auto; padding: 24px;">
      <!-- Hero Section -->
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
              <button class="btn btn-ghost">↓ Resume PDF</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Layout Split -->
      <div style="display: grid; grid-template-columns: 200px 1fr; gap: 24px;">
        <!-- Left Navigation Sticky Sidebar -->
        <div style="position: sticky; top: 80px; height: fit-content;">
          <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 12px;">NAVIGATE</div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 14px;">
            <a href="#summary" class="nav-link active">● Hiring Summary</a>
            <a href="#intelligence" class="nav-link">○ Intelligence Cards</a>
            <a href="#projects" class="nav-link">○ Projects Showcase</a>
            <a href="#timeline" class="nav-link">○ Builder Timeline</a>
            <a href="#skills" class="nav-link">○ Skills & Tech Stack</a>
          </div>
        </div>

        <!-- Right Content Body -->
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <!-- Hiring Summary Panel -->
          <div id="summary" style="background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-radius: 8px; padding: 24px;">
            <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 12px;">Hiring Summary</h2>
            <div class="ai-summary-box" style="margin-bottom: 16px;">
              <strong>AI Decision Brief:</strong> ${cand.aiSummary}
            </div>

            <div style="margin-bottom: 16px;">
              <div style="font-size: 13px; font-weight: 600; color: var(--color-text-muted); margin-bottom: 8px;">WHY INTERVIEW THIS CANDIDATE</div>
              ${cand.whyInterview.map(item => `
                <div style="margin-bottom: 8px; font-size: 14px;">
                  <strong style="color: var(--color-text-primary);">✓ ${item.claim}</strong>
                  <div style="color: var(--color-text-muted); font-size: 13px;">${item.evidence}</div>
                </div>
              `).join('')}
            </div>

            <div>
              <div style="font-size: 13px; font-weight: 600; color: var(--color-warning-text); margin-bottom: 8px;">POTENTIAL CONCERNS TO VALIDATE</div>
              ${cand.potentialConcerns.map(c => `
                <div style="font-size: 13px; color: var(--color-text-secondary); margin-bottom: 4px;">→ ${c}</div>
              `).join('')}
            </div>
          </div>

          <!-- Intelligence Section -->
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
                  <ul class="intel-evidence-list">
                    ${c.evidence.map(e => `<li>${e}</li>`).join('')}
                  </ul>
                  <div class="intel-takeaway">${c.takeaway}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Builder Timeline -->
          <div id="timeline" style="background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-radius: 8px; padding: 24px;">
            <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 12px;">Builder Growth Timeline</h2>
            <div style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 16px;">Past 12 months build activity: ▓▓▓▓▓▓▓▓░░ Active 10 of 12 months</div>
            <div style="border-left: 2px solid var(--color-border-default); padding-left: 16px; display: flex; flex-direction: column; gap: 16px;">
              <div>
                <div style="font-size: 12px; font-weight: 600; color: var(--color-accent-base);">NOV 2024 ●</div>
                <div style="font-weight: 600; font-size: 14px;">Deployed TalentGraph AI (200+ users)</div>
                <div style="font-size: 13px; color: var(--color-text-muted);">Python · LangChain · FastAPI</div>
              </div>
              <div>
                <div style="font-size: 12px; font-weight: 600; color: var(--color-accent-base);">OCT 2024 ●</div>
                <div style="font-weight: 600; font-size: 14px;">Challenge: Production LLM Deployment — #4 of 347 (Top 5%)</div>
              </div>
              <div>
                <div style="font-size: 12px; font-weight: 600; color: var(--color-accent-base);">SEP 2024 ◎</div>
                <div style="font-weight: 600; font-size: 14px;">1st Place — HiDevs National AI Hackathon</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- Recruiter Workspace View (Phase 7 Kanban View) ---
export function renderWorkspaceView(state) {
  const allCandidates = state.candidates;
  
  return `
    <div style="max-width: var(--container-max-width); margin: 0 auto; padding: 24px; width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 24px; font-weight: 700;">Recruiter Hiring Workspace</h1>
          <div style="font-size: 14px; color: var(--color-text-muted);">Manage candidate pipelines, collections, and decision notes.</div>
        </div>
        <button class="btn btn-primary">+ New Collection</button>
      </div>

      <!-- Kanban Pipeline -->
      <div class="kanban-board">
        <div class="kanban-column">
          <div class="kanban-column-header">SAVED <span>(${state.pipeline.saved.length})</span></div>
          ${allCandidates.filter(c => state.pipeline.saved.includes(c.id)).map(c => renderKanbanCard(c)).join('')}
        </div>
        <div class="kanban-column">
          <div class="kanban-column-header">SHORTLISTED <span>(${state.pipeline.shortlisted.length})</span></div>
          ${allCandidates.filter(c => state.pipeline.shortlisted.includes(c.id)).map(c => renderKanbanCard(c)).join('')}
        </div>
        <div class="kanban-column">
          <div class="kanban-column-header">INTERVIEW PLANNED <span>(${state.pipeline.interview.length})</span></div>
          ${allCandidates.filter(c => state.pipeline.interview.includes(c.id)).map(c => renderKanbanCard(c)).join('')}
        </div>
        <div class="kanban-column">
          <div class="kanban-column-header">OFFERED <span>(0)</span></div>
        </div>
      </div>
    </div>
  `;
}

function renderKanbanCard(cand) {
  return `
    <div class="kanban-card">
      <div style="font-weight: 600; font-size: 14px; color: var(--color-text-primary);" data-action="open-full-profile" data-id="${cand.id}">${cand.name}</div>
      <div style="font-size: 12px; color: var(--color-text-muted);">${cand.headline}</div>
      <div style="font-size: 11px; color: var(--color-accent-base); font-weight: 500;">★ Top ${cand.builderProof.aiRankPercentile}% AI Rank</div>
    </div>
  `;
}

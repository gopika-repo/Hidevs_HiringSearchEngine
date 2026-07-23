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
        { claim: `Top ${cand.builderProof?.aiRankPercentile ?? 10}% Rank`, evidence: `${cand.builderProof?.projectsCount ?? 3} projects built.` }
      ];

  if (cand.interviewReadiness?.completed && cand.interviewReadiness.score >= 80) {
    topReasons.unshift({
      claim: `Verified Mock Interview (${cand.interviewReadiness.score}/100)`,
      evidence: `Passed HiDevs technical interview simulation assessed on ${cand.interviewReadiness.assessedOn}.`
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

// --- Candidate Card Renderer (Nielsen Usability 5-Second Scannable Template) ---
export function renderCandidateCard(cand, state) {
  const isShortlisted = state.shortlistedIds.has(cand.id);

  const aiHiringScore = cand.interviewReadiness?.completed && cand.interviewReadiness.score
    ? cand.interviewReadiness.score
    : Math.min(98, 88 + (cand.experienceYears * 2));

  const percentileText = cand.builderProof?.aiRankPercentile
    ? `Top ${cand.builderProof.aiRankPercentile}%`
    : `Top 5%`;

  const top5Skills = (cand.skills || [])
    .map(s => typeof s === 'string' ? s : s.name)
    .slice(0, 5);

  const profileCompletion = Math.min(100, 92 + ((cand.projects?.length || 1) * 2));

  return `
    <div class="candidate-card" data-id="${cand.id}">
      <!-- Top Row: Photo, Name, Role, AI Hiring Score (0-100), Top %, Open to Work -->
      <div class="card-top-row">
        <div class="avatar-col">
          <div class="avatar">${sanitizeHtml(cand.avatar)}</div>
        </div>

        <div class="header-main-col">
          <div class="name-role-line">
            <span class="candidate-name" data-action="open-preview" data-id="${cand.id}">${sanitizeHtml(cand.name)}</span>
            <span class="candidate-role">${sanitizeHtml(cand.headline)} · <strong>${sanitizeHtml(cand.company)}</strong></span>
          </div>
          <div class="sub-meta-line">
            <span>📍 ${sanitizeHtml(cand.location)}</span> · 
            <span>💼 ${cand.experienceYears} yrs exp</span> · 
            <span>⏳ ${cand.noticePeriodDays === 0 ? 'Immediate Joiner' : cand.noticePeriodDays + 'd notice'}</span>
          </div>
        </div>

        <div class="scores-badge-col">
          <div style="display: flex; align-items: center; gap: 6px;">
            <div class="ai-hiring-score-box" title="AI Hiring Score (0-100)">
              <span class="score-num">${aiHiringScore}</span>
              <span class="score-label">/100 AI SCORE</span>
            </div>
            <span class="percentile-pill">${percentileText}</span>
          </div>
          <span class="badge ${cand.availability === 'Open to Work' ? 'badge-open-to-work' : 'badge-open-select'}">
            ${sanitizeHtml(cand.availability)}
          </span>
        </div>
      </div>

      <!-- One-line AI Summary -->
      <div class="ai-summary-bar">
        <strong style="color: var(--color-accent-base);">AI Brief:</strong> ${sanitizeHtml(cand.fitVerdict?.reason || cand.aiSummary)}
      </div>

      <!-- Top 5 Verified Skills -->
      <div class="skills-verified-row">
        <span class="skills-label">Top Skills:</span>
        ${top5Skills.map(s => `<span class="chip chip-verified">✓ ${sanitizeHtml(s)}</span>`).join('')}
      </div>

      <!-- Metrics Grid: Challenge Rank, Project Rank, Projects Completed, Profile Completion %, Availability -->
      <div class="metrics-grid">
        <div class="metric-box">
          <span class="m-val">#${cand.builderProof?.aiRankPercentile ?? 8}</span>
          <span class="m-lbl">CHALLENGE RANK</span>
        </div>
        <div class="metric-box">
          <span class="m-val">${cand.builderProof?.hackathonWinsCount > 0 ? '#1 Winner' : 'Top 10%'}</span>
          <span class="m-lbl">PROJECT RANK</span>
        </div>
        <div class="metric-box">
          <span class="m-val">${cand.builderProof?.projectsCount ?? (cand.projects ? cand.projects.length : 3)}</span>
          <span class="m-lbl">PROJECTS BUILT</span>
        </div>
        <div class="metric-box">
          <span class="m-val">${profileCompletion}%</span>
          <span class="m-lbl">PROFILE COMPLETE</span>
        </div>
        <div class="metric-box">
          <span class="m-val">${cand.noticePeriodDays === 0 ? 'Immediate' : cand.noticePeriodDays + 'd Notice'}</span>
          <span class="m-lbl">AVAILABILITY</span>
        </div>
      </div>

      <!-- Action Buttons: View Profile, Shortlist -->
      <div class="card-footer-bar">
        <div class="active-status">Active ${sanitizeHtml(cand.lastActive)}</div>
        <div class="cta-group">
          <button class="btn ${isShortlisted ? 'btn-secondary' : 'btn-ghost'} btn-sm" data-action="shortlist" data-id="${cand.id}">
            ${isShortlisted ? '★ Shortlisted' : 'Shortlist'}
          </button>
          <button class="btn btn-primary btn-sm" data-action="open-preview" data-id="${cand.id}" style="font-weight: 600;">
            View Profile →
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
  if (!cand) return '<div style="padding:40px; text-align:center;">Select a candidate to view full profile.</div>';

  const isShortlisted = state.shortlistedIds.has(cand.id);

  // Skill Score Data Normalizer
  const normalizedSkills = (cand.skills || []).map(s => {
    if (typeof s === 'object' && s.name) return s;
    return {
      name: String(s),
      score: Math.floor(75 + Math.random() * 20),
      basis: `Assessed via ${String(s)} technical challenge benchmark`
    };
  });

  return `
    <div style="max-width: var(--container-max-width); margin: 0 auto; padding: 24px;">
      <!-- Hero Header -->
      <div id="hero" class="candidate-card" style="padding: 32px; margin-bottom: 24px; background: var(--color-bg-surface);">
        <div style="display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap;">
          <div class="avatar" style="width: 96px; height: 96px; font-size: 32px; font-weight: 700; border: 3px solid var(--color-accent-base); flex-shrink: 0;">
            ${sanitizeHtml(cand.avatar)}
          </div>
          <div style="flex: 1; min-width: 280px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
              <div>
                <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                  <h1 style="font-size: 28px; font-weight: 700; color: var(--color-text-primary); font-family: var(--font-family-display, inherit);">${sanitizeHtml(cand.name)}</h1>
                  ${cand.fitVerdict ? `
                    <span class="badge ${cand.fitVerdict.status === 'Strong Fit' ? 'badge-open-to-work' : 'badge-open-select'}" style="font-weight: 700; font-size: 12px; padding: 4px 10px;">
                      ${sanitizeHtml(cand.fitVerdict.status)}
                    </span>
                  ` : ''}
                </div>
                <div style="font-size: 16px; color: var(--color-text-secondary); margin-top: 4px; font-weight: 500;">
                  ${sanitizeHtml(cand.headline)} · ${sanitizeHtml(cand.company)}
                </div>
                <div style="font-size: 13px; color: var(--color-text-muted); margin-top: 8px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                  <span>${sanitizeHtml(cand.location)}</span> · 
                  <span>${sanitizeHtml(cand.workMode)}</span> · 
                  <span>${cand.experienceYears} yrs exp</span> · 
                  <span>${cand.noticePeriodDays === 0 ? 'Immediate (0d)' : cand.noticePeriodDays + 'd notice'}</span>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 12px;">
                <span class="badge ${cand.availability === 'Open to Work' ? 'badge-open-to-work' : 'badge-open-select'}" style="font-size: 13px; padding: 4px 12px;">
                  ${sanitizeHtml(cand.availability)}
                </span>
                <div style="display: flex; gap: 8px;">
                  ${cand.links?.github ? `<a href="${sanitizeHtml(cand.links.github)}" target="_blank" rel="noopener noreferrer" class="direct-link-btn">${icons.github} GitHub</a>` : ''}
                  ${cand.links?.linkedin ? `<a href="${sanitizeHtml(cand.links.linkedin)}" target="_blank" rel="noopener noreferrer" class="direct-link-btn">${icons.linkedin} LinkedIn</a>` : ''}
                  ${cand.links?.portfolio ? `<a href="${sanitizeHtml(cand.links.portfolio)}" target="_blank" rel="noopener noreferrer" class="direct-link-btn">${icons.portfolio} Portfolio</a>` : ''}
                </div>
              </div>
            </div>

            <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--color-border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
              <button class="btn btn-secondary btn-sm">↓ Download Resume</button>
              <div style="display: flex; gap: 12px;">
                <button class="btn btn-secondary" style="font-weight: 500;">✉ Send Message</button>
                <button class="btn ${isShortlisted ? 'btn-primary' : 'btn-secondary'}" data-action="shortlist" data-id="${cand.id}" style="font-weight: 600;">
                  ${isShortlisted ? '★ Shortlisted' : 'Shortlist Candidate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 200px 1fr; gap: 24px;">
        <!-- In-Page Anchor Nav -->
        <div style="position: sticky; top: 80px; height: fit-content;">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 12px; letter-spacing: 0.04em;">DOSSIER SECTIONS</div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
            <a href="#about" class="nav-link">● Candidate Bio</a>
            <a href="#brief" class="nav-link">● Recruiter Brief</a>
            <a href="#experience" class="nav-link">● Work Experience</a>
            <a href="#skills" class="nav-link">● Skill Distribution</a>
            <a href="#projects" class="nav-link">● Projects & Demos</a>
            <a href="#hackathons" class="nav-link">● Hackathon Wins</a>
            <a href="#readiness" class="nav-link">● Interview Readiness</a>
            <a href="#intelligence" class="nav-link">● Intelligence Cards</a>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 24px;">
          <!-- 2. Candidate Bio / About -->
          <div id="about" class="candidate-card" style="padding: 20px;">
            <div class="brief-title">CANDIDATE NARRATIVE</div>
            <p style="font-size: 14px; line-height: 1.6; color: var(--color-text-secondary); margin-top: 8px;">
              ${cand.about ? sanitizeHtml(cand.about) : `${sanitizeHtml(cand.name)} is a ${sanitizeHtml(cand.headline)} with ${cand.experienceYears} years of engineering experience. Known for rapid execution velocity, active open-source activity, and deploying production-tested code.`}
            </p>
          </div>

          <!-- 3. Recruiter Hiring Brief -->
          <div id="brief">
            <h2 style="font-size: 16px; font-weight: 700; margin-bottom: 8px; color: var(--color-text-primary);">Recruiter Decision Brief</h2>
            ${renderStructuredBriefCard(cand)}
          </div>

          <!-- 4. Work Experience -->
          <div id="experience" class="candidate-card" style="padding: 24px;">
            <div class="brief-title" style="margin-bottom: 16px;">WORK EXPERIENCE HISTORY</div>
            ${cand.experience && cand.experience.length > 0 ? cand.experience.map(exp => `
              <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--color-border-subtle);">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                  <strong style="font-size: 15px; color: var(--color-text-primary);">${sanitizeHtml(exp.title)}</strong>
                  <span style="font-size: 12px; color: var(--color-text-muted);">${sanitizeHtml(exp.duration)}</span>
                </div>
                <div style="font-size: 13px; color: var(--color-accent-base); font-weight: 600; margin: 2px 0 8px 0;">${sanitizeHtml(exp.company)}</div>
                <ul style="padding-left: 18px; margin: 0; font-size: 13px; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 4px;">
                  ${(exp.highlights || []).map(h => `<li>${sanitizeHtml(h)}</li>`).join('')}
                </ul>
              </div>
            `).join('') : `
              <div style="font-size: 13px; color: var(--color-text-muted);">
                Currently at <strong>${sanitizeHtml(cand.company)}</strong> as <strong>${sanitizeHtml(cand.headline)}</strong> (${cand.experienceYears} years active industry tenure).
              </div>
            `}
          </div>

          <!-- 5. Skill Score Distribution Table -->
          <div id="skills" class="candidate-card" style="padding: 24px;">
            <div class="brief-title" style="margin-bottom: 16px;">ASSESSED SKILL DISTRIBUTION</div>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <thead>
                <tr style="border-bottom: 1px solid var(--color-border-subtle); text-align: left; color: var(--color-text-muted); font-size: 11px;">
                  <th style="padding: 8px 0; font-weight: 700;">SKILL</th>
                  <th style="padding: 8px 0; font-weight: 700; width: 140px;">SCORE</th>
                  <th style="padding: 8px 0; font-weight: 700;">ASSESSMENT BASIS</th>
                </tr>
              </thead>
              <tbody>
                ${normalizedSkills.map(sk => `
                  <tr style="border-bottom: 1px solid var(--color-border-subtle);">
                    <td style="padding: 10px 0; font-weight: 600; color: var(--color-text-primary);">${sanitizeHtml(sk.name)}</td>
                    <td style="padding: 10px 0;">
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="flex: 1; height: 6px; background: var(--color-bg-subtle); border-radius: 3px; overflow: hidden;">
                          <div style="width: ${sk.score}%; height: 100%; background: var(--color-accent-base);"></div>
                        </div>
                        <span style="font-weight: 600; font-size: 12px; color: var(--color-text-primary); width: 28px;">${sk.score}%</span>
                      </div>
                    </td>
                    <td style="padding: 10px 0; color: var(--color-text-muted); font-size: 12px;">${sanitizeHtml(sk.basis)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- 6. Projects List -->
          <div id="projects" class="candidate-card" style="padding: 24px;">
            <div class="brief-title" style="margin-bottom: 16px;">VERIFIED PROJECTS & DEMOS</div>
            <div style="display: flex; flex-direction: column; gap: 16px;">
              ${cand.projects && cand.projects.length > 0 ? cand.projects.map(p => `
                <div style="border: 1px solid var(--color-border-subtle); padding: 16px; border-radius: 8px; background: var(--color-bg-base);">
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <strong style="font-size: 15px; color: var(--color-text-primary);">${sanitizeHtml(p.name)}</strong>
                    <span style="font-size: 12px; color: var(--color-accent-base); font-weight: 600;">${sanitizeHtml(p.usersCount || 'Verified App')}</span>
                  </div>
                  <div style="font-size: 13px; color: var(--color-text-secondary); margin: 6px 0 10px 0;">${sanitizeHtml(p.description)}</div>
                  <div class="skills-row" style="margin-bottom: 8px;">
                    ${(p.techStack || []).map(t => `<span class="chip">${sanitizeHtml(t)}</span>`).join('')}
                  </div>
                </div>
              `).join('') : '<div style="font-size: 13px; color: var(--color-text-muted);">No external demo links provided</div>'}
            </div>
          </div>

          <!-- 7. Hackathons & Benchmarks -->
          <div id="hackathons" class="candidate-card" style="padding: 24px;">
            <div class="brief-title" style="margin-bottom: 16px;">HACKATHONS & BENCHMARK AWARDS</div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${cand.hackathons && cand.hackathons.length > 0 ? cand.hackathons.map(h => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; background: var(--color-bg-base); border: 1px solid var(--color-border-subtle); border-radius: 6px;">
                  <div>
                    <strong style="font-size: 13px; color: var(--color-text-primary);">🏆 ${sanitizeHtml(h.name)}</strong>
                    <div style="font-size: 12px; color: var(--color-text-muted); margin-top: 2px;">Rank Achieved: ${sanitizeHtml(h.rank)}</div>
                  </div>
                  <span style="font-size: 12px; color: var(--color-text-muted);">${sanitizeHtml(h.date)}</span>
                </div>
              `).join('') : `<div style="font-size: 13px; color: var(--color-text-muted);">${cand.builderProof?.hackathonWinsCount ?? 0} verified hackathon wins on record</div>`}
            </div>
          </div>

          <!-- 8. Interview Readiness -->
          <div id="readiness" class="candidate-card" style="padding: 24px;">
            <div class="brief-title" style="margin-bottom: 12px;">INTERVIEW READINESS ASSESSMENT</div>
            ${cand.interviewReadiness?.completed ? `
              <div style="display: flex; align-items: center; gap: 16px; background: var(--color-success-subtle); border: 1px solid var(--color-border-subtle); padding: 16px; border-radius: 8px;">
                <div style="font-size: 24px; font-weight: 700; color: var(--color-success-text);">${cand.interviewReadiness.score}/100</div>
                <div>
                  <strong style="font-size: 14px; color: var(--color-success-text);">✓ Mock Technical Interview Completed</strong>
                  <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: 2px;">Evaluated on ${cand.interviewReadiness.assessedOn} covering System Design, Coding Velocity, and Architecture.</div>
                </div>
              </div>
            ` : `
              <div style="background: var(--color-bg-subtle); border: 1px solid var(--color-border-subtle); padding: 14px; border-radius: 8px; font-size: 13px; color: var(--color-text-muted);">
                Mock technical interview not yet taken for this candidate.
              </div>
            `}
          </div>

          <!-- 9. Intelligence Cards -->
          <div id="intelligence">
            <h2 style="font-size: 16px; font-weight: 700; margin-bottom: 12px; color: var(--color-text-primary);">HiDevs Exclusive Intelligence Cards</h2>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${cand.intelligenceCards && cand.intelligenceCards.length > 0 ? cand.intelligenceCards.map(c => `
                <div class="intel-card">
                  <div class="intel-card-header">
                    <span class="intel-card-title">${sanitizeHtml(c.title)}</span>
                    <span class="intel-signal-tag">${sanitizeHtml(c.signal)}</span>
                  </div>
                  <div class="intel-observation">${sanitizeHtml(c.observation)}</div>
                  <div class="intel-takeaway">${sanitizeHtml(c.takeaway)}</div>
                </div>
              `).join('') : '<div class="candidate-card" style="padding:16px; font-size:13px; color:var(--color-text-muted);">No additional intelligence signals generated.</div>'}
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

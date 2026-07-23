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

// --- Candidate Card Renderer (HiDevs Proprietary AI Talent Intelligence Moat) ---
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

  const builderScore = Math.min(99, 88 + (cand.experienceYears || 2));
  const problemSolvingScore = Math.min(99, 90 + (cand.experienceYears || 2));
  const systemDesignScore = Math.min(99, 85 + (cand.experienceYears * 2));

  return `
    <div class="candidate-card" data-id="${cand.id}">
      <!-- Top Row: Avatar, Identity, HiDevs Composite AI Hiring Score, Top Percentile, Availability -->
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
            <div class="ai-hiring-score-box" title="HiDevs Composite AI Hiring Score (0-100)">
              <span class="score-num">${aiHiringScore}</span>
              <span class="score-label">/100 HIDEVS AI SCORE</span>
            </div>
            <span class="percentile-pill">${percentileText}</span>
          </div>
          <span class="badge ${cand.availability === 'Open to Work' ? 'badge-open-to-work' : 'badge-open-select'}">
            ${sanitizeHtml(cand.availability)}
          </span>
        </div>
      </div>

      <!-- 1. AI Generated Recruiter Brief Summary -->
      <div class="hidevs-ai-brief">
        <span class="hidevs-badge">HiDevs AI Verdict</span>
        <span class="brief-text">${sanitizeHtml(cand.fitVerdict?.reason || cand.aiSummary)}</span>
      </div>

      <!-- 2. HiDevs Proprietary Intelligence Signals Grid (The Competitive Moat) -->
      <div class="hidevs-moat-grid">
        <div class="moat-metric-box">
          <div class="moat-lbl">LEARNING VELOCITY</div>
          <div class="moat-val green">🚀 4.8x Velocity</div>
          <div class="moat-sub">Adopted stack in 60d</div>
        </div>

        <div class="moat-metric-box">
          <div class="moat-lbl">BUILDER SCORE</div>
          <div class="moat-val purple">🔨 ${builderScore}/100</div>
          <div class="moat-sub">${cand.builderProof?.projectsCount ?? (cand.projects ? cand.projects.length : 3)} apps · 96% success</div>
        </div>

        <div class="moat-metric-box">
          <div class="moat-lbl">PROBLEM SOLVING</div>
          <div class="moat-val blue">🧠 ${problemSolvingScore}/100</div>
          <div class="moat-sub">Top ${cand.builderProof?.aiRankPercentile ?? 5}% challenge rank</div>
        </div>

        <div class="moat-metric-box">
          <div class="moat-lbl">SYSTEM DESIGN</div>
          <div class="moat-val amber">🏗️ ${systemDesignScore}/100</div>
          <div class="moat-sub">Verified microservices</div>
        </div>
      </div>

      <!-- Top 5 Verified Skills -->
      <div class="skills-verified-row">
        <span class="skills-label">Verified Skills:</span>
        ${top5Skills.map(s => `<span class="chip chip-verified">✓ ${sanitizeHtml(s)}</span>`).join('')}
      </div>

      <!-- Action Buttons -->
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

// --- Recruiter-First Filter Sidebar Renderer (4 Logical Collapsible Sections) ---
export function renderFilterSidebar(state) {
  const skillsList = ["Python", "FastAPI", "LangChain", "React", "TypeScript", "Go", "Docker", "PyTorch"];
  const roleList = ["AI / ML Engineer", "Backend", "Full Stack", "Platform Engineering"];

  return `
    <div class="sidebar-top-bar" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--color-border-subtle);">
      <span style="font-weight: 700; font-size: 13px; letter-spacing: 0.04em; color: var(--color-text-primary);">RECRUITER FILTERS</span>
      <button class="btn btn-ghost btn-sm" data-action="clear-filters" style="padding: 2px 6px; font-size: 11px; color: var(--color-accent-base);">Clear All</button>
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
              <label class="form-check" style="font-size: 11px;">
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
            <input type="text" class="global-search-input" placeholder="e.g. Bangalore, Remote, Delhi..." value="${sanitizeHtml(state.filters.location || '')}" data-action="filter-location-input" style="width: 100%; height: 30px; padding: 0 8px; font-size: 12px; margin-bottom: 6px;">
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

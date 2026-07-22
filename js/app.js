/* ==========================================================================
   HiDevs Hiring Search Engine — Main Application Entry & Controller
   ========================================================================== */

import { store } from './store.js';
import { 
  renderCandidateCard, 
  renderQuickFilters, 
  renderFilterSidebar, 
  renderPreviewPanel, 
  renderFullProfileView, 
  renderWorkspaceView,
  icons 
} from './components.js';

// --- Mount Application Frame ---
function mountAppFrame() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <!-- Global Header (Phase 1 Specification) -->
    <header class="global-header">
      <div class="header-brand" id="brand-logo">
        <span>HiDevs</span>
        <span class="badge-logo">HIRING SEARCH</span>
      </div>

      <div class="header-search-container">
        <div class="search-input-wrap">
          <span class="search-icon-svg">${icons.search}</span>
          <input type="text" id="global-search-input" class="search-input" placeholder="Search Python, FastAPI, Swiggy, Remote..." />
        </div>
      </div>

      <nav class="header-nav">
        <a class="nav-link active" id="nav-search">Search Engine</a>
        <a class="nav-link" id="nav-workspace">
          Workspace <span class="badge-count" id="shortlist-count-badge">0</span>
        </a>
        <a class="nav-link" id="nav-profile">Profile View</a>
      </nav>
    </header>

    <!-- App View Container -->
    <div id="view-container"></div>

    <!-- Slide-Over Preview Panel Overlay -->
    <div class="preview-panel-overlay" id="preview-overlay">
      <div class="preview-panel" id="preview-panel-content"></div>
    </div>
  `;
}

// --- Render Active View ---
function renderView(state) {
  const container = document.getElementById('view-container');
  const shortlistBadge = document.getElementById('shortlist-count-badge');
  shortlistBadge.textContent = state.shortlistedIds.size;

  // Update Nav Active States
  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
  if (state.activeView === 'search') document.getElementById('nav-search').classList.add('active');
  if (state.activeView === 'workspace') document.getElementById('nav-workspace').classList.add('active');
  if (state.activeView === 'profile') document.getElementById('nav-profile').classList.add('active');

  if (state.activeView === 'search') {
    const candidates = store.getFilteredCandidates();
    container.innerHTML = `
      <div class="main-layout">
        <!-- Left Filter Sidebar -->
        <aside class="filter-sidebar" id="filter-sidebar-root">
          ${renderFilterSidebar(state)}
        </aside>

        <!-- Center Search Content Feed -->
        <main class="content-feed">
          <div class="quick-filters-bar">
            ${renderQuickFilters(state)}
          </div>

          <div class="results-header">
            <div class="results-count">
              Showing <span>${candidates.length}</span> builder candidates
            </div>
            <div class="results-sort">
              <span>Sort by:</span>
              <select style="border:none; background:transparent; font-size:13px; font-weight:600; color:var(--color-text-primary); cursor:pointer;">
                <option>Best Match</option>
                <option>Recent Activity</option>
                <option>AI Challenge Rank</option>
              </select>
            </div>
          </div>

          <div class="candidates-grid" style="display: flex; flex-direction: column; gap: 16px;">
            ${candidates.length > 0 
              ? candidates.map(c => renderCandidateCard(c, state)).join('')
              : `<div style="padding: 40px; text-align: center; color: var(--color-text-muted);">No candidates match your current filters. Try clearing some filters.</div>`
            }
          </div>
        </main>
      </div>
    `;
  } else if (state.activeView === 'workspace') {
    container.innerHTML = renderWorkspaceView(state);
  } else if (state.activeView === 'profile') {
    const activeCand = state.candidates.find(c => c.id === state.activeProfileCandidateId) || state.candidates[0];
    container.innerHTML = renderFullProfileView(activeCand, state);
  }

  // Handle Preview Panel Overlay State
  const overlay = document.getElementById('preview-overlay');
  const panelContent = document.getElementById('preview-panel-content');
  if (state.activePreviewCandidateId) {
    const previewCand = state.candidates.find(c => c.id === state.activePreviewCandidateId);
    panelContent.innerHTML = renderPreviewPanel(previewCand, state);
    overlay.classList.add('active');
  } else {
    overlay.classList.remove('active');
  }
}

// --- Attach Event Listeners ---
function bindEvents() {
  // Global Search Input
  document.addEventListener('input', (e) => {
    if (e.target.id === 'global-search-input') {
      store.setSearchQuery(e.target.value);
    }
  });

  // Navigation Links
  document.addEventListener('click', (e) => {
    const brand = e.target.closest('#brand-logo');
    if (brand) {
      store.setView('search');
      return;
    }

    const navSearch = e.target.closest('#nav-search');
    if (navSearch) {
      store.setView('search');
      return;
    }

    const navWorkspace = e.target.closest('#nav-workspace');
    if (navWorkspace) {
      store.setView('workspace');
      return;
    }

    const navProfile = e.target.closest('#nav-profile');
    if (navProfile) {
      store.setView('profile');
      return;
    }

    // Action Handlers
    const targetBtn = e.target.closest('[data-action]');
    if (!targetBtn) return;

    const action = targetBtn.dataset.action;
    const id = targetBtn.dataset.id;

    if (action === 'quick-filter') {
      store.toggleQuickFilter(id);
    } else if (action === 'shortlist') {
      store.toggleShortlist(id);
    } else if (action === 'compare') {
      store.toggleCompare(id);
    } else if (action === 'open-preview') {
      store.openPreviewPanel(id);
    } else if (action === 'close-preview') {
      store.closePreviewPanel();
    } else if (action === 'open-full-profile') {
      store.setView('profile', id);
    } else if (action === 'clear-filters') {
      store.clearAllFilters();
    } else if (action === 'filter-skill') {
      store.toggleSkillFilter(targetBtn.dataset.value);
    } else if (action === 'filter-role') {
      store.toggleRoleFilter(targetBtn.dataset.value);
    } else if (action === 'filter-radio') {
      store.setFilter(targetBtn.dataset.category, targetBtn.value);
    } else if (action === 'filter-signal') {
      store.toggleBuilderSignal(targetBtn.dataset.value);
    }
  });

  // Close Overlay on Background Click
  document.getElementById('preview-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'preview-overlay') {
      store.closePreviewPanel();
    }
  });

  // Keyboard Shortcuts (J / K / Esc)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      store.closePreviewPanel();
    }
  });
}

// --- Initialize Application ---
document.addEventListener('DOMContentLoaded', () => {
  mountAppFrame();
  bindEvents();

  // Subscribe state updates to re-render
  store.subscribe((state) => {
    renderView(state);
  });

  // Initial Render
  renderView(store.state);
});

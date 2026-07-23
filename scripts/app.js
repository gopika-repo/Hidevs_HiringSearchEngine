/* ==========================================================================
   HiDevs Hiring Search Engine — Clean Application Entry Point (scripts/app.js)
   ========================================================================== */

import { store } from './store.js';
import { mockRecruiterData } from './mockData.js';
import { initGlobalSearch } from './search.js';
import { initFilters } from './filters.js';
import { 
  renderCandidateCard, 
  renderQuickFilters, 
  renderFilterSidebar, 
  renderPreviewPanel, 
  renderFullProfileView, 
  renderWorkspaceView 
} from './components.js';

class ApplicationController {
  constructor() {
    this.appRoot = document.getElementById('app-root');
  }

  init() {
    this.renderAppShell();
    initGlobalSearch();
    initFilters();
    this.bindGlobalEvents();

    store.subscribe((state) => this.renderView(state));
    this.renderView(store.state);
  }

  renderAppShell() {
    const user = mockRecruiterData.currentUser;
    this.appRoot.innerHTML = `
      <!-- Global Header -->
      <header class="global-header">
        <div class="header-left-zone">
          <a class="header-brand" id="brand-home">
            <span>HiDevs</span>
            <span class="badge-logo">HIRING SEARCH</span>
          </a>
        </div>

        <div class="header-search-container">
          <div class="search-wrapper">
            <span class="search-icon-svg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input type="text" id="global-search-input" class="global-search-input" placeholder="Search Python, FastAPI, Swiggy, Remote..." />
            <div class="search-suggestions-dropdown" id="search-dropdown"></div>
          </div>
        </div>

        <div class="header-right-zone">
          <a class="nav-link-item active" id="nav-search-engine">
            <span>Search Engine</span>
          </a>
          <a class="nav-link-item" id="nav-workspace">
            <span>Workspace</span>
            <span class="badge-count" id="shortlist-count-badge">0</span>
          </a>
          <a class="nav-link-item" id="nav-profile">
            <span>Profile View</span>
          </a>
          <button class="btn-icon" title="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </button>
          <div class="user-profile-btn">
            <div class="user-profile-avatar">${user.avatar}</div>
            <span style="font-size: 13px; font-weight: 500;">${user.name.split(' ')[0]}</span>
          </div>
        </div>
      </header>

      <!-- Main Layout Mount Point -->
      <div id="view-container"></div>

      <!-- 60% Slide-Over Preview Panel -->
      <div class="preview-panel-overlay" id="preview-overlay">
        <div class="preview-panel" id="preview-panel-content"></div>
      </div>
    `;
  }

  renderView(state) {
    const container = document.getElementById('view-container');
    const shortlistBadge = document.getElementById('shortlist-count-badge');
    if (shortlistBadge) shortlistBadge.textContent = state.shortlistedIds.size;

    // Active Tab Navigation
    document.querySelectorAll('.nav-link-item').forEach(el => el.classList.remove('active'));
    if (state.activeView === 'search') document.getElementById('nav-search-engine')?.classList.add('active');
    if (state.activeView === 'workspace') document.getElementById('nav-workspace')?.classList.add('active');
    if (state.activeView === 'profile') document.getElementById('nav-profile')?.classList.add('active');

    if (state.activeView === 'search') {
      const candidates = store.getFilteredCandidates();
      container.innerHTML = `
        <div class="main-container fade-in">
          <aside class="filter-sidebar">
            ${renderFilterSidebar(state)}
          </aside>

          <main class="results-area">
            <div class="results-header-band">
              <div class="quick-filters-row">
                ${renderQuickFilters(state)}
              </div>

              <div class="results-meta-bar">
                <div class="result-count-label">
                  Showing <span>${candidates.length}</span> builder candidates
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                  <button class="btn btn-ghost btn-sm" data-action="clear-filters" style="${state.activeQuickFilters.size || state.searchQuery || state.filters.skills.size || state.filters.roleTypes.size || state.filters.availability || state.filters.workMode || state.filters.experienceLevel || state.filters.builderSignals.size || state.filters.rankingPercentile < 100 ? '' : 'display:none;'}">Clear all filters</button>
                  <div class="sort-container">
                    <span>Sort by:</span>
                    <select class="sort-select">
                      <option value="Best Match" ${state.sortBy === 'Best Match' ? 'selected' : ''}>Best Match</option>
                      <option value="Recent Activity" ${state.sortBy === 'Recent Activity' ? 'selected' : ''}>Recent Activity</option>
                      <option value="AI Challenge Rank" ${state.sortBy === 'AI Challenge Rank' ? 'selected' : ''}>AI Challenge Rank</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="candidates-grid" style="display: flex; flex-direction: column; gap: 16px;">
              ${candidates.length > 0
                ? candidates.map(c => renderCandidateCard(c, state)).join('')
                : `
                  <div class="empty-search-state">
                    <div class="empty-state-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    <h3 class="empty-state-title">No matching candidates found</h3>
                    <p class="empty-state-subtitle">Try adjusting your filters or search terms to broaden your search.</p>
                  </div>
                `
              }
            </div>
          </main>
        </div>
      `;
    } else if (state.activeView === 'workspace') {
      container.innerHTML = renderWorkspaceView(state);
    } else if (state.activeView === 'profile') {
      const cand = state.candidates.find(c => c.id === state.activeProfileCandidateId) || state.candidates[0];
      container.innerHTML = renderFullProfileView(cand, state);
    }

    // Sync search input if cleared externally
    const searchInput = document.getElementById('global-search-input');
    if (searchInput && state.searchQuery === '' && searchInput.value !== '') {
      searchInput.value = '';
    }

    // Handle Slide-Over Panel State
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

  bindGlobalEvents() {
    document.addEventListener('search-query-changed', (e) => {
      store.setSearchQuery(e.detail.query || '');
    });

    document.addEventListener('change', (e) => {
      if (e.target.classList.contains('sort-select')) {
        store.setSortBy(e.target.value);
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.closest('#brand-home') || e.target.closest('#nav-search-engine')) {
        store.setView('search');
      } else if (e.target.closest('#nav-workspace')) {
        store.setView('workspace');
      } else if (e.target.closest('#nav-profile')) {
        store.setView('profile');
      }

      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const id = btn.dataset.id;

      if (action === 'shortlist') store.toggleShortlist(id);
      if (action === 'compare') store.toggleCompare(id);
      if (action === 'open-preview') store.openPreviewPanel(id);
      if (action === 'close-preview') store.closePreviewPanel();
      if (action === 'open-full-profile') store.setView('profile', id);
    });

    document.getElementById('preview-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'preview-overlay') store.closePreviewPanel();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') store.closePreviewPanel();
    });

    // HTML5 Drag and Drop Handlers for Kanban Workspace
    document.addEventListener('dragstart', (e) => {
      const card = e.target.closest('.kanban-card');
      if (card) {
        const candidateId = card.dataset.id;
        const sourceStage = card.dataset.stage;
        e.dataTransfer.setData('text/plain', JSON.stringify({ candidateId, sourceStage }));
        e.dataTransfer.effectAllowed = 'move';
        card.classList.add('dragging');
      }
    });

    document.addEventListener('dragend', (e) => {
      const card = e.target.closest('.kanban-card');
      if (card) {
        card.classList.remove('dragging');
      }
      document.querySelectorAll('.kanban-column').forEach(col => col.classList.remove('drag-over'));
    });

    document.addEventListener('dragover', (e) => {
      const col = e.target.closest('.kanban-column');
      if (col) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        col.classList.add('drag-over');
      }
    });

    document.addEventListener('dragleave', (e) => {
      const col = e.target.closest('.kanban-column');
      if (col && !col.contains(e.relatedTarget)) {
        col.classList.remove('drag-over');
      }
    });

    document.addEventListener('drop', (e) => {
      const col = e.target.closest('.kanban-column');
      if (col) {
        e.preventDefault();
        col.classList.remove('drag-over');
        const targetStage = col.dataset.stage;
        try {
          const raw = e.dataTransfer.getData('text/plain');
          if (raw) {
            const data = JSON.parse(raw);
            if (data && data.candidateId && targetStage) {
              store.moveCandidatePipeline(data.candidateId, targetStage);
            }
          }
        } catch (err) {
          console.error('Drag drop error:', err);
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new ApplicationController();
  app.init();
});

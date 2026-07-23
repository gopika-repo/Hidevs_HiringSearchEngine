/* ==========================================================================
   HiDevs Hiring Search Engine — Clean Application Entry Point (scripts/app.js)
   ========================================================================== */

import { store } from './store.js';
import { mockRecruiterData } from './mockData.js';
import { initGlobalSearch } from './search.js';
import { initFilters, handleFilterClick } from './filters.js';
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
          <div class="search-wrapper" style="position: relative; display: flex; align-items: center;">
            <span class="search-icon-svg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input type="text" id="global-search-input" class="global-search-input" placeholder="Search 'Python developer in Bangalore', 'Top AI builders'..." style="padding-right: 60px;" />
            <kbd style="position: absolute; right: 12px; font-size: 10px; font-weight: 700; background: var(--color-bg-subtle); color: var(--color-text-muted); border: 1px solid var(--color-border-subtle); border-radius: 4px; padding: 2px 6px; pointer-events: none;">⌘K</kbd>
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
      const allFiltered = store.getFilteredCandidates();
      const totalCandidates = allFiltered.length;
      const pageSize = state.pageSize || 5;
      const totalPages = Math.ceil(totalCandidates / pageSize) || 1;
      const currentPage = Math.min(state.currentPage || 1, totalPages);
      const startIndex = (currentPage - 1) * pageSize;
      const paginatedCandidates = allFiltered.slice(startIndex, startIndex + pageSize);

      const hasActiveFilters = Boolean(
        state.activeQuickFilters.size || 
        state.searchQuery || 
        state.filters.skills.size || 
        state.filters.roleTypes.size || 
        state.filters.availability || 
        state.filters.workMode || 
        state.filters.location || 
        state.filters.experienceLevel || 
        state.filters.builderSignals.size || 
        state.filters.rankingPercentile < 100
      );

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
                  Showing <span>${totalCandidates > 0 ? startIndex + 1 : 0} - ${Math.min(startIndex + pageSize, totalCandidates)}</span> of <span>${totalCandidates}</span> builder candidates
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                  <button class="btn btn-ghost btn-sm" data-action="clear-filters" style="${hasActiveFilters ? '' : 'display:none;'}">Clear all filters</button>
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
              ${paginatedCandidates.length > 0
                ? paginatedCandidates.map(c => renderCandidateCard(c, state)).join('')
                : `
                  <div class="empty-search-state">
                    <div class="empty-state-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    <h3 class="empty-state-title">No matching candidates found</h3>
                    <p class="empty-state-subtitle">Try adjusting your filters or search terms to broaden your search.</p>
                    <button class="btn btn-primary btn-sm" data-action="clear-filters" style="margin-top: 8px;">Clear all filters</button>
                  </div>
                `
              }
            </div>

            ${totalCandidates > pageSize ? `
              <div class="pagination-bar" style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--color-border-subtle);">
                <div style="font-size: 13px; color: var(--color-text-muted);">
                  Page ${currentPage} of ${totalPages}
                </div>
                <div style="display: flex; gap: 8px;">
                  <button class="btn btn-secondary btn-sm" ${currentPage <= 1 ? 'disabled' : ''} data-action="prev-page">← Previous</button>
                  <button class="btn btn-secondary btn-sm" ${currentPage >= totalPages ? 'disabled' : ''} data-action="next-page">Next →</button>
                </div>
              </div>
            ` : ''}
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
      else if (action === 'open-preview') store.openPreviewPanel(id);
      else if (action === 'close-preview') store.closePreviewPanel();
      else if (action === 'open-full-profile') store.setView('profile', id);
      else if (action === 'prev-page') store.setPage(Math.max(1, (store.state.currentPage || 1) - 1));
      else if (action === 'next-page') store.setPage((store.state.currentPage || 1) + 1);
      else if (action === 'toggle-projects-popover' || action === 'toggle-hackathons-popover') {
        e.stopPropagation();
        const targetId = btn.dataset.targetPopover;
        const popover = document.getElementById(targetId);
        if (popover) {
          const isVisible = popover.style.display === 'block';
          document.querySelectorAll('.builder-proof-popover').forEach(p => p.style.display = 'none');
          popover.style.display = isVisible ? 'none' : 'block';
        }
      } else handleFilterClick(btn);
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.builder-proof-popover') && !e.target.closest('[data-action="toggle-projects-popover"]') && !e.target.closest('[data-action="toggle-hackathons-popover"]')) {
        document.querySelectorAll('.builder-proof-popover').forEach(p => p.style.display = 'none');
      }
    });

    document.getElementById('preview-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'preview-overlay') store.closePreviewPanel();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        store.closePreviewPanel();
        document.querySelectorAll('.builder-proof-popover').forEach(p => p.style.display = 'none');
      }
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

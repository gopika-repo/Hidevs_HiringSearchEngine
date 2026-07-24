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
  renderInlinePreview,
  renderSidebarNav,
  renderTopNavbar,
  renderFullProfileView, 
  renderWorkspaceView 
} from './components.js';

import { searchIndexer } from './api.js';

class ApplicationController {
  constructor() {
    this.appRoot = document.getElementById('app-root');
  }

  init() {
    searchIndexer.buildIndex(store.state.candidates);
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
      <!-- Left Navigation Sidebar -->
      <aside class="app-left-sidebar" id="sidebar-nav-container">
        ${renderSidebarNav(store.state)}
      </aside>

      <!-- Main Canvas Shell -->
      <div class="app-main-canvas">
        <!-- Top Navbar -->
        <header class="app-top-navbar" id="top-navbar-container">
          ${renderTopNavbar(user, store.state)}
        </header>

        <!-- Main View Mount Point -->
        <main id="view-container" style="flex: 1; display: flex; overflow: hidden; position: relative;"></main>
      </div>
    `;
  }

  renderView(state) {
    const container = document.getElementById('view-container');
    const user = mockRecruiterData.currentUser;

    // Update Top & Left nav active state
    const sidebarNav = document.getElementById('sidebar-nav-container');
    if (sidebarNav) sidebarNav.innerHTML = renderSidebarNav(state);

    const topNav = document.getElementById('top-navbar-container');
    if (topNav) topNav.innerHTML = renderTopNavbar(user, state);

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

      const previewCand = state.activePreviewCandidateId 
        ? state.candidates.find(c => c.id === state.activePreviewCandidateId)
        : (paginatedCandidates[0] || null);

      container.innerHTML = `
        <div class="dashboard-grid-container fade-in">
          
          <!-- Section 1: Search Filters -->
          <section class="dash-section-filters">
            ${renderFilterSidebar(state)}
          </section>

          <!-- Section 2: Search Results -->
          <section class="dash-section-results">
            <!-- Header Band: Quick Filters + Meta Bar -->
            <div class="results-header-band">
              <div class="quick-filters-row">
                ${renderQuickFilters(state)}
              </div>

              <div class="results-meta-bar">
                <div class="result-count-label">
                  Showing <span>${totalCandidates > 0 ? startIndex + 1 : 0} - ${Math.min(startIndex + pageSize, totalCandidates)}</span> of <span>${totalCandidates}</span> candidates
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <button class="btn btn-ghost btn-xs" data-action="clear-filters" style="${hasActiveFilters ? '' : 'display:none;'}">Clear all</button>
                  <div class="sort-container">
                    <span>Sort:</span>
                    <select class="sort-select">
                      <option value="Best Match" ${state.sortBy === 'Best Match' ? 'selected' : ''}>Best Match</option>
                      <option value="Recent Activity" ${state.sortBy === 'Recent Activity' ? 'selected' : ''}>Recent Activity</option>
                      <option value="AI Challenge Rank" ${state.sortBy === 'AI Challenge Rank' ? 'selected' : ''}>AI Challenge Rank</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Candidates Grid / List -->
            <div class="candidates-grid" style="display: flex; flex-direction: column; gap: 12px;">
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

            <!-- Pagination Bar -->
            ${totalCandidates > pageSize ? `
              <div class="pagination-bar" style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 12px; border-top: 1px solid var(--color-border-subtle);">
                <div style="font-size: 12px; color: var(--color-text-muted);">
                  Page ${currentPage} of ${totalPages}
                </div>
                <div style="display: flex; gap: 6px;">
                  <button class="btn btn-secondary btn-xs" ${currentPage <= 1 ? 'disabled' : ''} data-action="prev-page">← Prev</button>
                  <button class="btn btn-secondary btn-xs" ${currentPage >= totalPages ? 'disabled' : ''} data-action="next-page">Next →</button>
                </div>
              </div>
            ` : ''}
          </section>

          <!-- Section 3: Candidate Preview (Inline Right Column) -->
          <section class="dash-section-preview">
            ${renderInlinePreview(previewCand, state)}
          </section>

        </div>
      `;
    } else if (state.activeView === 'workspace') {
      container.innerHTML = renderWorkspaceView(state);
    } else if (state.activeView === 'profile') {
      const cand = state.candidates.find(c => c.id === state.activeProfileCandidateId) || state.candidates[0];
      container.innerHTML = renderFullProfileView(cand, state);
    }

    // Re-bind global search listener to top navbar input
    initGlobalSearch();
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
      } else if (e.target.closest('#nav-workspace') || e.target.closest('#nav-workspace-pill')) {
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

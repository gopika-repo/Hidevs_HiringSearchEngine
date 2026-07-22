/* ==========================================================================
   HiDevs Hiring Search Engine — Main Shell Application Script (Phase 10 Part 1)
   ========================================================================== */

import { mockRecruiterData } from './mockData.js';
import { initGlobalSearch } from './search.js';

class ShellApp {
  constructor() {
    this.selectedQuickFilters = new Set();
    this.currentSearchQuery = '';
  }

  init() {
    this.renderHeader();
    this.renderMainLayout();
    initGlobalSearch();
    this.bindEvents();
  }

  renderHeader() {
    const user = mockRecruiterData.currentUser;
    const headerHtml = `
      <div class="header-left-zone">
        <a class="header-brand" id="brand-home">
          <span>HiDevs</span>
          <span class="badge-logo">HIRING SEARCH</span>
        </a>
      </div>

      <div class="header-search-container">
        <div class="search-wrapper">
          <span class="search-icon-svg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>
          <input type="text" id="global-search-input" class="global-search-input" placeholder="Search Python, FastAPI, Swiggy, Remote..." />
          <div class="search-suggestions-dropdown" id="search-dropdown"></div>
        </div>
      </div>

      <div class="header-right-zone">
        <a class="nav-link-item active" id="nav-search-engine">
          <span>Search Engine</span>
        </a>
        <a class="nav-link-item" id="nav-saved-candidates">
          <span>Saved</span>
          <span class="badge-count" id="saved-count">${user.savedCount}</span>
        </a>
        <a class="nav-link-item" id="nav-workspace">
          <span>Workspace</span>
        </a>
        <button class="btn-icon" title="Notifications" id="btn-notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        </button>
        <div class="user-profile-btn" id="btn-user-profile">
          <div class="user-profile-avatar">${user.avatar}</div>
          <span style="font-size: 13px; font-weight: 500;">${user.name.split(' ')[0]}</span>
        </div>
      </div>
    `;

    document.getElementById('header-root').innerHTML = headerHtml;
  }

  renderMainLayout() {
    const layoutHtml = `
      <div class="main-container">
        <!-- Left Filter Sidebar Placeholder (As per Part 1 Spec) -->
        <aside class="filter-sidebar">
          <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--color-text-muted); padding-bottom: 8px; border-bottom: 1px solid var(--color-border-subtle);">
            FILTERS
          </div>
          <div style="font-size: 13px; color: var(--color-text-muted); padding: 12px 0;">
            Filter controls will be mounted in Part 2.
          </div>
        </aside>

        <!-- Main Results Area -->
        <main class="results-area">
          <div class="results-header-band">
            <!-- Quick Filter Chips Row -->
            <div class="quick-filters-row">
              ${mockRecruiterData.quickFilters.map(f => `
                <button class="quick-chip" data-action="quick-chip" data-id="${f.id}">
                  <span>${f.icon}</span> ${f.label}
                </button>
              `).join('')}
            </div>

            <!-- Results Meta Bar -->
            <div class="results-meta-bar">
              <div class="result-count-label">
                Showing <span id="results-count-num">0</span> builder candidates
              </div>
              <div style="display: flex; align-items: center; gap: 16px;">
                <button class="btn btn-ghost btn-sm" id="btn-clear-all" style="display: none;">Clear all filters</button>
                <div class="sort-container">
                  <span>Sort by:</span>
                  <select class="sort-select">
                    <option>Best Match</option>
                    <option>Recent Activity</option>
                    <option>AI Challenge Rank</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty Search State Container -->
          <div id="results-content-area">
            ${this.renderEmptyState()}
          </div>
        </main>
      </div>
    `;

    document.getElementById('main-root').innerHTML = layoutHtml;
  }

  renderEmptyState() {
    return `
      <div class="empty-search-state">
        <div class="empty-state-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <h3 class="empty-state-title">Search the HiDevs Talent Graph</h3>
        <p class="empty-state-subtitle">
          Type keywords like <strong style="color: var(--color-text-primary);">"Python"</strong>, <strong style="color: var(--color-text-primary);">"FastAPI"</strong>, or select a Quick Filter chip to discover verified builder candidates.
        </p>
      </div>
    `;
  }

  bindEvents() {
    // Quick filter chips click
    document.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-action="quick-chip"]');
      if (chip) {
        const id = chip.dataset.id;
        if (this.selectedQuickFilters.has(id)) {
          this.selectedQuickFilters.delete(id);
          chip.classList.remove('selected');
        } else {
          this.selectedQuickFilters.add(id);
          chip.classList.add('selected');
        }
        this.updateState();
      }

      if (e.target.id === 'btn-clear-all') {
        this.clearAll();
      }
    });

    // Custom Event for Search Query
    document.addEventListener('search-query-changed', (e) => {
      this.currentSearchQuery = e.detail.query;
      this.updateState();
    });
  }

  updateState() {
    const clearBtn = document.getElementById('btn-clear-all');
    const countNum = document.getElementById('results-count-num');
    const contentArea = document.getElementById('results-content-area');

    const hasActiveFilters = this.selectedQuickFilters.size > 0 || this.currentSearchQuery.trim().length > 0;

    if (hasActiveFilters) {
      clearBtn.style.display = 'inline-flex';
      countNum.textContent = '0';
      contentArea.innerHTML = `
        <div class="empty-search-state">
          <div class="empty-state-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </div>
          <h3 class="empty-state-title">No candidate cards mounted</h3>
          <p class="empty-state-subtitle">
            Application Shell (Part 1) is active. Candidate cards and preview panel components will be mounted in Part 2.
          </p>
        </div>
      `;
    } else {
      clearBtn.style.display = 'none';
      countNum.textContent = '0';
      contentArea.innerHTML = this.renderEmptyState();
    }
  }

  clearAll() {
    this.selectedQuickFilters.clear();
    this.currentSearchQuery = '';
    document.querySelectorAll('.quick-chip').forEach(c => c.classList.remove('selected'));
    const input = document.getElementById('global-search-input');
    if (input) input.value = '';
    this.updateState();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new ShellApp();
  app.init();
});

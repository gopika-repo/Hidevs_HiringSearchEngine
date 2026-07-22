/* ==========================================================================
   HiDevs Hiring Search Engine — Global Search Interaction Controller
   ========================================================================== */

import { mockRecruiterData } from './mockData.js';

export function initGlobalSearch() {
  const searchInput = document.getElementById('global-search-input');
  const dropdown = document.getElementById('search-dropdown');

  if (!searchInput || !dropdown) return;

  // Render recent & suggested searches dropdown
  dropdown.innerHTML = `
    <div class="suggestion-group-title">Recent Searches</div>
    ${mockRecruiterData.recentSearches.map(item => `
      <div class="suggestion-item" data-query="${item}">
        <span style="color: var(--color-text-muted);">🕒</span> ${item}
      </div>
    `).join('')}
    
    <div class="suggestion-group-title" style="margin-top: 8px;">Suggested Refinements</div>
    ${mockRecruiterData.suggestedSearches.map(item => `
      <div class="suggestion-item" data-query="${item}">
        <span style="color: var(--color-accent-base);">💡</span> ${item}
      </div>
    `).join('')}
  `;

  // Focus & Blur Event Listeners
  searchInput.addEventListener('focus', () => {
    dropdown.classList.add('visible');
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('visible');
    }
  });

  // Suggestion item selection
  dropdown.addEventListener('click', (e) => {
    const item = e.target.closest('.suggestion-item');
    if (item) {
      const query = item.dataset.query;
      searchInput.value = query;
      dropdown.classList.remove('visible');
      
      // Dispatch custom event for query change
      document.dispatchEvent(new CustomEvent('search-query-changed', { detail: { query } }));
    }
  });

  // Keyup listener
  searchInput.addEventListener('input', (e) => {
    document.dispatchEvent(new CustomEvent('search-query-changed', { detail: { query: e.target.value } }));
  });
}

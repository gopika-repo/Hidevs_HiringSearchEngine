/* ==========================================================================
   HiDevs Hiring Search Engine — Clean Filter Logic Module
   ========================================================================== */

import { store } from './store.js';

export function handleFilterClick(targetBtn) {
  const action = targetBtn.dataset.action;
  const id = targetBtn.dataset.id;

  if (action === 'quick-filter') {
    store.toggleQuickFilter(id);
  } else if (action === 'clear-filters') {
    store.clearAllFilters();
  } else if (action === 'clear-section') {
    store.clearFilterSection(targetBtn.dataset.section);
  } else if (action === 'filter-skill') {
    store.toggleSkillFilter(targetBtn.dataset.value);
  } else if (action === 'filter-role') {
    store.toggleRoleFilter(targetBtn.dataset.value);
  } else if (action === 'filter-radio') {
    store.setFilter(targetBtn.dataset.category, targetBtn.value);
  } else if (action === 'filter-signal') {
    store.toggleBuilderSignal(targetBtn.dataset.value);
  } else if (action === 'filter-tech') {
    store.togglePreferredTech(targetBtn.dataset.value);
  } else if (action === 'filter-employment') {
    store.toggleEmploymentType(targetBtn.dataset.value);
  } else if (action === 'filter-culture') {
    store.toggleCulturePref(targetBtn.dataset.value);
  } else if (action === 'filter-relocate') {
    store.state.filters.willingToRelocate = !store.state.filters.willingToRelocate;
    store.state.currentPage = 1;
    store.notify();
  } else if (action === 'filter-contract') {
    store.state.filters.openToContract = !store.state.filters.openToContract;
    store.state.currentPage = 1;
    store.notify();
  }
}

export function initFilters() {
  document.addEventListener('input', (e) => {
    if (e.target.dataset.action === 'filter-rank-range') {
      store.setRankingPercentile(parseInt(e.target.value, 10));
    } else if (e.target.dataset.action === 'filter-location-input') {
      store.setLocationFilter(e.target.value);
    }
  });

  // Tech stack search: press Enter or comma to add tech filter
  document.addEventListener('keydown', (e) => {
    if (e.target.dataset.action === 'filter-tech-search' && (e.key === 'Enter' || e.key === ',')) {
      e.preventDefault();
      const val = e.target.value.trim().replace(/,$/, '');
      if (val.length > 1) {
        store.togglePreferredTech(val);
        e.target.value = '';
      }
    }
  });
}

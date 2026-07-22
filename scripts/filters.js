/* ==========================================================================
   HiDevs Hiring Search Engine — Clean Filter Logic Module
   ========================================================================== */

import { store } from './store.js';

export function initFilters() {
  document.addEventListener('click', (e) => {
    const targetBtn = e.target.closest('[data-action]');
    if (!targetBtn) return;

    const action = targetBtn.dataset.action;
    const id = targetBtn.dataset.id;

    if (action === 'quick-filter') {
      store.toggleQuickFilter(id);
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
}

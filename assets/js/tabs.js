(() => {
  function activateTab(group, targetId) {
    const buttons = document.querySelectorAll(`[data-tab-group="${group}"][data-tab-target]`);
    const panels = document.querySelectorAll(`[data-tab-group="${group}"].tab-content`);

    buttons.forEach((btn) => btn.classList.toggle('active', btn.dataset.tabTarget === targetId));
    panels.forEach((panel) => panel.classList.toggle('active', panel.id === targetId));
  }

  window.initTabs = function initTabs() {
    document.querySelectorAll('[data-tab-target]').forEach((button) => {
      button.addEventListener('click', () => {
        const { tabGroup, tabTarget } = button.dataset;
        if (!tabGroup || !tabTarget) return;
        activateTab(tabGroup, tabTarget);
      });
    });
  };
})();

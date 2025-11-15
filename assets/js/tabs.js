(() => {
  function activateTab(group, targetId) {
    // Correct button selector
    const buttons = document.querySelectorAll(
      `[data-tab-group="${group}"][data-tab-target]`
    );

    // Correct panel selector
    const panels = document.querySelectorAll(
      `.tab-content[data-tab-group="${group}"]`
    );

    buttons.forEach((btn) => {
      const active = btn.dataset.tabTarget === targetId;
      btn.classList.toggle("active", active);
    });

    panels.forEach((panel) => {
      const active = panel.id === targetId;
      panel.classList.toggle("active", active);
    });
  }

  function initialize() {
    // Attach click handlers
    document.querySelectorAll("[data-tab-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const { tabGroup, tabTarget } = button.dataset;
        if (!tabGroup || !tabTarget) return;

        activateTab(tabGroup, tabTarget);
      });
    });

    // Auto activate first tab per group
    const groups = new Set(
      [...document.querySelectorAll("[data-tab-group]")].map(
        (el) => el.dataset.tabGroup
      )
    );

    groups.forEach((group) => {
      const firstButton = document.querySelector(
        `[data-tab-group="${group}"][data-tab-target]`
      );
      if (firstButton) firstButton.click();
    });
  }

  // Delay init until ALL imported sections are loaded
  window.addEventListener("DOMContentLoaded", () => {
    // importSections.js finishes dynamically → wait for it
    setTimeout(initialize, 100);
  });
})();

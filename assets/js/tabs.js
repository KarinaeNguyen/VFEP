(() => {
  function activateTab(group, targetId) {
    const buttons = document.querySelectorAll(
      `button[data-tab-group="${group}"][data-tab-target]`
    );

    const panels = document.querySelectorAll(
      `.tab-content[data-tab-group="${group}"]`
    );

    buttons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tabTarget === targetId);
    });

    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === targetId);
    });
  }

  function initialize() {
    // Handle clicks
    document.querySelectorAll("button[data-tab-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const { tabGroup, tabTarget } = button.dataset;
        if (!tabGroup || !tabTarget) return;

        activateTab(tabGroup, tabTarget);
      });
    });

    // Auto-activate first tab PER GROUP
    const groups = new Set(
      [...document.querySelectorAll("button[data-tab-group]")].map(
        (el) => el.dataset.tabGroup
      )
    );
    groups.forEach((group) => {
      const firstButton = document.querySelector(
        `button[data-tab-group="${group}"][data-tab-target]`
      );
      if (firstButton) firstButton.click();
    });
  }

  // --- THIS IS THE CORRECTED PART ---
  // Wait until all dynamic HTML sections have loaded
  document.addEventListener("sectionsLoaded", () => {
    initialize();
  });
  // --- END OF CORRECTION ---
  
})();

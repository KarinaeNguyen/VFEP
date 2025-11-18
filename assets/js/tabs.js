// tabs.js — Delegated Event System (Option B)
// No need to re-init after dynamic section loads

function initTabs() {
  console.log("Tabs initialized with delegated events.");

  // A map to track default tabs per group
  const defaultTabForGroup = {};

  function switchTab(groupName, targetId) {
    const tabButtons = document.querySelectorAll(`[data-tab-group="${groupName}"]`);
    const tabContents = document.querySelectorAll(`[data-tab-content="${groupName}"]`);

    tabContents.forEach(content => {
      if (content.id === targetId) {
        content.classList.remove("hidden");
      } else {
        content.classList.add("hidden");
      }
    });

    tabButtons.forEach(button => {
      if (button.getAttribute("data-tab-target") === targetId) {
        button.classList.add("bg-gray-700", "text-white");
        button.classList.remove("text-gray-300", "hover:bg-gray-700", "hover:text-white");
      } else {
        button.classList.remove("bg-gray-700", "text-white");
        button.classList.add("text-gray-300", "hover:bg-gray-700", "hover:text-white");
      }
    });
  }

  // Delegated click listener — works across dynamic DOM replacements
  document.addEventListener("click", (e) => {
    const button = e.target.closest("[data-tab-group]");
    if (!button) return;

    const groupName = button.getAttribute("data-tab-group");
    const targetId = button.getAttribute("data-tab-target");

    switchTab(groupName, targetId);
  });

  // Initialize defaults for all groups currently in DOM
  function initializeDefaultTabs() {
    const allButtons = document.querySelectorAll("[data-tab-group]");
    const groups = new Set();

    allButtons.forEach(btn => groups.add(btn.getAttribute("data-tab-group")));

    groups.forEach(groupName => {
      const tabButtons = document.querySelectorAll(`[data-tab-group="${groupName}"]`);
      if (tabButtons.length > 0) {
        const defaultTabId = tabButtons[0].getAttribute("data-tab-target");
        defaultTabForGroup[groupName] = defaultTabId;
        switchTab(groupName, defaultTabId);
      }
    });
  }

  initializeDefaultTabs();
}

// Auto-run once
initTabs();

// tabs.js — Fixed to match CSS (.active class)

function initTabs() {
  console.log("Tabs initialized with delegated events.");
  const defaultTabForGroup = {};

  function switchTab(groupName, targetId) {
    const tabButtons = document.querySelectorAll(`[data-tab-group="${groupName}"]`);
    const tabContents = document.querySelectorAll(`[data-tab-content="${groupName}"]`);

    // 1. Handle Content Visibility (CSS expects .active to show)
    tabContents.forEach(content => {
      if (content.id === targetId) {
        content.classList.add("active");  // ADD active to show
      } else {
        content.classList.remove("active"); // REMOVE active to hide
      }
    });

    // 2. Handle Button Styling
    tabButtons.forEach(button => {
      if (button.getAttribute("data-tab-target") === targetId) {
        button.classList.add("active"); // Matches CSS .tab-btn.active
        // Remove Tailwind utility classes if they conflict, but your CSS uses .active
        // Keeping these for safety if you mix Tailwind + Custom CSS
        button.classList.add("bg-gray-700", "text-white");
        button.classList.remove("text-gray-300", "hover:bg-gray-700", "hover:text-white");
      } else {
        button.classList.remove("active");
        button.classList.remove("bg-gray-700", "text-white");
        button.classList.add("text-gray-300", "hover:bg-gray-700", "hover:text-white");
      }
    });
  }

  // Delegated click listener
  document.addEventListener("click", (e) => {
    const button = e.target.closest("[data-tab-group]");
    if (!button) return;

    const groupName = button.getAttribute("data-tab-group");
    const targetId = button.getAttribute("data-tab-target");

    switchTab(groupName, targetId);
  });

  // Initialize defaults
  function initializeDefaultTabs() {
    const allButtons = document.querySelectorAll("[data-tab-group]");
    const groups = new Set();

    allButtons.forEach(btn => groups.add(btn.getAttribute("data-tab-group")));

    groups.forEach(groupName => {
      const tabButtons = document.querySelectorAll(`[data-tab-group="${groupName}"]`);
      if (tabButtons.length > 0) {
        // Find which one is currently active in HTML, or default to first
        let defaultTabId = tabButtons[0].getAttribute("data-tab-target");
        
        // Optional: Check if HTML already has an "active" class manually set
        tabButtons.forEach(btn => {
            if(btn.classList.contains('active')) {
                defaultTabId = btn.getAttribute("data-tab-target");
            }
        });

        switchTab(groupName, defaultTabId);
      }
    });
  }

  initializeDefaultTabs();
}

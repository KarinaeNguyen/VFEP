// tabs.js — Updated to toggle .active class matching style.css

function initTabs() {
  console.log("✅ Tabs System: Initializing...");

  function switchTab(groupName, targetId) {
    console.log(`🖱️ Switching Group: [${groupName}] to Target: [${targetId}]`);
    
    const tabButtons = document.querySelectorAll(`[data-tab-group="${groupName}"]`);
    const tabContents = document.querySelectorAll(`[data-tab-content="${groupName}"]`);

    // 1. Handle Content Visibility (CSS requires .active to display:block)
    tabContents.forEach(content => {
      if (content.id === targetId) {
        content.classList.add("active"); // SHOW
        content.classList.remove("hidden"); // Safety removal
      } else {
        content.classList.remove("active"); // HIDE
        content.classList.add("hidden"); // Optional safety
      }
    });

    // 2. Handle Button Styling
    tabButtons.forEach(button => {
      if (button.getAttribute("data-tab-target") === targetId) {
        button.classList.add("active"); 
        // Add visual active styles
        button.classList.add("bg-gray-700", "text-white");
        button.classList.remove("text-gray-300", "hover:bg-gray-700", "hover:text-white");
      } else {
        button.classList.remove("active");
        // Remove visual active styles
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
        // Default to the first tab, or the one marked 'active' in HTML
        let defaultTabId = tabButtons[0].getAttribute("data-tab-target");
        tabButtons.forEach(btn => {
            if(btn.classList.contains('active')) {
                defaultTabId = btn.getAttribute("data-tab-target");
            }
        });
        
        console.log(`🔹 Init Default for [${groupName}]: ${defaultTabId}`);
        switchTab(groupName, defaultTabId);
      }
    });
  }

  initializeDefaultTabs();
}

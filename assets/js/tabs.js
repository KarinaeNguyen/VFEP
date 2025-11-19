// tabs.js — Fixed: Strictly separates Buttons vs Content to prevent "null" errors

function initTabs() {
  console.log("✅ Tabs System: Initializing...");

  function switchTab(groupName, targetId) {
    // console.log(`🖱️ Switching Group: [${groupName}] to Target: [${targetId}]`);
    
    // 1. Select ONLY Content for this group
    const tabContents = document.querySelectorAll(`.tab-content[data-tab-group="${groupName}"]`);
    
    // 2. Select ONLY Buttons for this group (must have data-tab-target)
    const tabButtons = document.querySelectorAll(`[data-tab-group="${groupName}"][data-tab-target]`);

    // Update Content Visibility
    tabContents.forEach(content => {
      if (content.id === targetId) {
        content.classList.add("active");
        content.classList.remove("hidden");
      } else {
        content.classList.remove("active");
        content.classList.add("hidden");
      }
    });

    // Update Button Styling
    tabButtons.forEach(button => {
      if (button.getAttribute("data-tab-target") === targetId) {
        button.classList.add("active");
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
    // Find closest element with both group AND target attributes (strictly a button)
    const button = e.target.closest("[data-tab-group][data-tab-target]");
    if (!button) return;

    const groupName = button.getAttribute("data-tab-group");
    const targetId = button.getAttribute("data-tab-target");

    switchTab(groupName, targetId);
  });

  // Initialize defaults
  function initializeDefaultTabs() {
    // Get all unique group names from buttons only
    const allButtons = document.querySelectorAll("[data-tab-group][data-tab-target]");
    const groups = new Set();

    allButtons.forEach(btn => groups.add(btn.getAttribute("data-tab-group")));

    groups.forEach(groupName => {
      // Select only the buttons for this group
      const tabButtons = document.querySelectorAll(`[data-tab-group="${groupName}"][data-tab-target]`);
      
      if (tabButtons.length > 0) {
        // Default to the first button's target
        let defaultTabId = tabButtons[0].getAttribute("data-tab-target");
        
        // If one is explicitly active in HTML, use that instead
        // (Make sure we don't accidentally pick a content div by checking for data-tab-target)
        for (const btn of tabButtons) {
            if (btn.classList.contains('active')) {
                defaultTabId = btn.getAttribute("data-tab-target");
                break; 
            }
        }
        
        console.log(`🔹 Init Default for [${groupName}]: ${defaultTabId}`);
        if (defaultTabId) {
            switchTab(groupName, defaultTabId);
        }
      }
    });
  }

  initializeDefaultTabs();
}

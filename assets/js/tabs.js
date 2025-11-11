// tabs.js

function initializeTabs() {
  // Find all tab "groups" on the page.
  // This allows you to have multiple sets of tabs that work independently.
  const tabGroups = document.querySelectorAll("[data-tab-group]");

  tabGroups.forEach(group => {
    const tabs = group.querySelectorAll(".tab-btn");
    const contents = group.querySelectorAll(".tab-content");

    if (!tabs.length || !contents.length) {
      // If a group has no tabs or no content, skip it.
      return;
    }

    // Activate the first tab and content in this group by default
    tabs[0]?.classList.add("active");
    contents[0]?.classList.add("active");

    // Add click event listener to all tabs *in this group*
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-tab"); // e.g., "tab-1"
        if (!target) {
          console.error("Tab button is missing a 'data-tab' attribute.");
          return;
        }

        // Remove active classes from all tabs and content *in this group*
        tabs.forEach((t) => t.classList.remove("active"));
        contents.forEach((c) => c.classList.remove("active"));

        // Add active class to the clicked tab
        tab.classList.add("active");
        
        // Find the matching content *within this group* and activate it
        const targetContent = group.querySelector(`#${target}`);
        if (targetContent) {
          targetContent.classList.add("active");
        } else {
          console.error(`Tab content with ID '${target}' not found in this group.`);
        }
      });
    });
  });
}

// Export the function so importSections.js can call it
window.initializeTabs = initializeTabs;

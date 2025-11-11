// tabs.js

function initializeTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");

  if (!tabs.length || !contents.length) {
    console.warn("No tabs or tab content found. Tab functionality will not work.");
    return;
  }

  // Activate the first tab and content by default
  tabs[0]?.classList.add("active");
  contents[0]?.classList.add("active");

  // Special case: If the first active tab is financials, load its charts
  const defaultTarget = tabs[0]?.getAttribute("data-tab");
  if (defaultTarget === 'financials' && typeof window.loadFinancialCharts === 'function') {
    window.loadFinancialCharts();
  }

  // Add click event listener to all tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab"); // e.g., "financials"
      if (!target) {
        console.error("Tab button is missing a 'data-tab' attribute.");
        return;
      }

      // Remove active classes from all tabs and content
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      // Add active class to the clicked tab and its matching content
      tab.classList.add("active");
      const targetContent = document.getElementById(target);
      
      if (targetContent) {
        targetContent.classList.add("active");
      } else {
        console.error(`Tab content with ID '${target}' not found.`);
        return;
      }

      // ** CRITICAL: Load charts ONLY when financials tab is clicked **
      if (target === 'financials' && typeof window.loadFinancialCharts === 'function') {
        window.loadFinancialCharts();
      }
    });
  });
}

// Export the function so importSections.js can call it
window.initializeTabs = initializeTabs;

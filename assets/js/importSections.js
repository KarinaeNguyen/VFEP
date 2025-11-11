// importSections.js

const sections = [
  "header",
  "overview",
  "vision",
  "lean-canvas",
  "technology",
  "strategy",
  "market",
  "financials",
  "advantage",
  "footer",
];

async function loadSection(name) {
  const container = document.getElementById(name);
  if (!container) {
    console.warn(`Container #${name} not found.`);
    return;
  }

  try {
    // Add cache-busting query to prevent loading old files
    const response = await fetch(`sections/${name}.html?t=${new Date().getTime()}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch sections/${name}.html - ${response.statusText}`);
    }
    const html = await response.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(`Error loading section: ${name}`, err);
  }
}

// NEW MAIN FUNCTION
document.addEventListener("DOMContentLoaded", async () => {
  
  // 1. Create an array of all loading promises
  const loadingPromises = sections.map(loadSection);

  // 2. Wait for ALL sections to finish loading
  await Promise.all(loadingPromises);

  // 3. AFTER all HTML is loaded, initialize dependent scripts.
  // This fixes the race condition for charts and tabs.

  // Initialize tabs (we will create this function in tabs.js)
  if (typeof window.initializeTabs === 'function') {
    window.initializeTabs();
  } else {
    console.warn('initializeTabs() function not found. Tabs may not work.');
  }
  
  // Initialize financials (this function is in financials.js)
  if (typeof window.loadFinancialCharts === 'function') {
    // We only call this if the financials section is visible,
    // or if it's not in a tab.
    // For now, let's assume it's loaded directly.
    // If it's inside a tab, we'll move this call into tabs.js.
    // window.loadFinancialCharts(); 
    // ^^^ Let's wait on this. Send me tabs.js next.
    // For now, we've confirmed the structure is correct.
  }
});

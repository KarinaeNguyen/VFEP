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
    return; // Stop if the div doesn't exist
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

document.addEventListener("DOMContentLoaded", async () => {
  
  // 1. Create an array of all the loading promises
  const loadingPromises = sections.map(loadSection);

  // 2. Wait for ALL sections to finish loading
  await Promise.all(loadingPromises);

  // 3. AFTER all HTML is loaded, initialize dependent scripts.
  
  // Initialize tabs (for any tabs INSIDE the loaded sections)
  if (typeof window.initializeTabs === 'function') {
    window.initializeTabs();
  } else {
    console.warn('initializeTabs() function not found. Tabs may not work.');
  }
  
  // Initialize financial charts now that the #financials div is populated
  if (typeof window.loadFinancialCharts === 'function') {
    window.loadFinancialCharts();
  } else {
    console.warn('loadFinancialCharts() function not found. Charts may not load.');
  }
});

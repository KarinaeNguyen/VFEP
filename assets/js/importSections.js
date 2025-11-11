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

// This function runs once the base index.html page is loaded
document.addEventListener("DOMContentLoaded", async () => {
  
  // 1. Create an array of all the loading promises
  const loadingPromises = sections.map(loadSection);

  // 2. Wait for ALL sections to finish loading
  await Promise.all(loadingPromises);

  // 3. AFTER all HTML is loaded, initialize the main app script.
  // This calls the function we defined in main.js
  if (typeof window.initializeApp === 'function') {
    window.initializeApp();
  } else {
    console.error('CRITICAL ERROR: initializeApp() function not found. Check main.js.');
  }
});

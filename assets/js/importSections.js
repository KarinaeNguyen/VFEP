// importSections.js

const sections = [
  "header",  // <-- Thêm lại
  "overview",
  "vision",
  "lean-canvas",
  "technology",
  "strategy",
  "market",
  "financials",
  "advantage",
  "footer",  // <-- Thêm lại
];

async function loadSection(name) {
  const container = document.getElementById(name);
  if (!container) {
    console.warn(`Container #${name} not found.`);
    return;
  }

  try {
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
  
  const loadingPromises = sections.map(loadSection);

  await Promise.all(loadingPromises);

  // SAU KHI TẢI TẤT CẢ HTML, chạy file main.js
  if (typeof window.initializeApp === 'function') {
    window.initializeApp();
  } else {
    console.error('CRITICAL ERROR: initializeApp() function not found. Check main.js.');
  }
});

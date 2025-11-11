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
  if (!container) return;

  try {
    const response = await fetch(`sections/${name}.html`);
    const html = await response.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(`Error loading section: ${name}`, err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  sections.forEach((s) => loadSection(s));
});


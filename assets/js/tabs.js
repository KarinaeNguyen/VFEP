// tabs.js
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("[data-tab]");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab");

      // Remove active classes
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      // Add active to clicked tab + matching content
      tab.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });
});


(async () => {
  const G_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJd-jS-S-c-G-B-B-B-B-B-B-B-B-B-B-B-B-B-B-B-B-B-B-B-B-B/pub?output=csv";

  function initSmoothScroll() {
    console.log("Initializing smooth scroll...");
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          if (window.innerWidth < 1024) {
            const nav = document.getElementById('main-nav');
            if (nav) {
              nav.classList.add('hidden');
            }
          }
        }
      });
    });
  }

  function initMobileMenu() {
    console.log("Initializing mobile menu...");
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('main-nav');

    if (menuBtn && nav) {
      menuBtn.addEventListener('click', () => {
        nav.classList.toggle('hidden');
      });
    }
  }

  function initScrollSpy() {
    console.log("Initializing scroll spy...");
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#main-nav a[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) {
      console.warn("Scroll spy disabled: Sections or nav links not found.");
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('text-white', 'bg-opacity-100', 'bg-gray-700');
            link.classList.add('text-gray-300', 'hover:text-white', 'hover:bg-gray-700');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('text-white', 'bg-opacity-100', 'bg-gray-700');
              link.classList.remove('text-gray-300', 'hover:text-white', 'hover:bg-gray-700');
            }
          });
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px 0px -40% 0px'
    });

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  async function loadFinancials() {
    console.log("Loading financials...");
    if (typeof loadFinancialData === 'function') {
      try {
        await loadFinancialData(G_SHEET_URL);
      } catch (error) {
        console.error("Error loading financial data:", error);
      }
    } else {
      console.error("loadFinancialData function not found. Did financials.js load?");
    }
  }

  function initLanguage() {
    console.log("Applying initial translations...");
    if (typeof window.applyTranslations === 'function') {
      window.applyTranslations();
      document.title = window.LANGUAGE_DATA[window.currentLang]['page_title'];
    } else {
      console.error("applyTranslations function not found. Did importSections.js load?");
    }
  }

  document.addEventListener('sectionsLoaded', () => {
    console.log("'sectionsLoaded' event received. Initializing UI components...");
    
    initLanguage();
    initSmoothScroll();
    initMobileMenu();
    initScrollSpy();
    loadFinancials();

    if (typeof initTabs === 'function') {
      initTabs();
    } else {
      console.error("initTabs function not found. Did tabs.js load?");
    }

    console.log("All UI components initialized.");
  });

})();

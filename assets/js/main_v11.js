(async () => {
  // UPDATE YOUR LINK HERE 👇
  const G_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdnGGLERma9OCgM-Y6hGfFn2RnyjAMZeGT_zHviVrBKdC5h3947vTg66xfwg1RbcrGbgQm1cIAWKhS/pub?output=csv";

  function initSmoothScroll() {
    console.log("Initializing smooth scroll...");
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          const nav = document.getElementById('main-nav');
          if (nav && window.innerWidth < 1024) {
            nav.classList.add('hidden');
          }
        }
      });
    });
  }

  function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('main-nav');
    if (menuBtn && nav) {
      console.log("Initializing mobile menu...");
      menuBtn.addEventListener('click', () => {
        nav.classList.toggle('hidden');
      });
    } else {
      console.warn("Mobile menu elements not found.");
    }
  }

  function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"], #main-nav a[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) {
      console.warn("Scroll spy skipped: No sections or nav links found.");
      return;
    }
    
    console.log("Initializing scroll spy...");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
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
    }, { threshold: 0.3, rootMargin: '0px 0px -40% 0px' });

    sections.forEach(section => observer.observe(section));
  }

  // --- NEW FUNCTION: SCROLL REVEAL ---
  function initScrollReveal() {
    console.log("Initializing scroll reveal animations...");
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // When section enters viewport (15% visible)
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Stop watching once revealed
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15, 
      rootMargin: "0px 0px -50px 0px" 
    });

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  async function loadFinancials() {
    console.log("Loading financials...");
    if (typeof window.loadFinancialData === 'function') {
      try {
        await window.loadFinancialData(G_SHEET_URL);
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
      if(window.LANGUAGE_DATA && window.currentLang) {
         document.title = window.LANGUAGE_DATA[window.currentLang]['page_title'];
      }
    }
  }

  // GLOBAL LISTENER FOR DYNAMIC SECTIONS
  document.addEventListener('sectionsLoaded', () => {
    console.log("'sectionsLoaded' event received. Initializing UI components...");
    
    initLanguage();
    initSmoothScroll();
    initMobileMenu();
    initScrollSpy();
    
    // Initialize Scroll Reveal Animation
    initScrollReveal(); 
    
    // Init Tabs
    if (typeof initTabs === 'function') {
      initTabs();
    } else {
      console.warn("initTabs function not found. Check tabs.js loading.");
    }

    loadFinancials();
    console.log("All UI components initialized.");
  });
})();

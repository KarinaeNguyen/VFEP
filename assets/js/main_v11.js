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
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          
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

    if (sections.length === 0 || navLinks.length === 0) return;
    
    console.log("Initializing scroll spy...");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('text-indigo-700', 'font-bold');
            link.classList.add('text-neutral-600');
            
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('text-indigo-700', 'font-bold');
              link.classList.remove('text-neutral-600');
            }
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-20% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
  }

  function initScrollReveal() {
    console.log("Initializing scroll reveal animations...");
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
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

  // --- SCROLL TO TOP LOGIC ---
  function initScrollToTop() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.classList.remove('opacity-0', 'invisible');
        btn.classList.add('opacity-100', 'visible');
      } else {
        btn.classList.add('opacity-0', 'invisible');
        btn.classList.remove('opacity-100', 'visible');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- CONTACT WIDGET LOGIC (Fixed) ---
  function initContactWidget() {
    const toggleBtn = document.getElementById('toggleContactBtn');
    const closeBtn = document.getElementById('closeContactBtn');
    const box = document.getElementById('contactFormBox');

    if (!toggleBtn || !box) {
        console.warn("Contact widget elements not found");
        return;
    }

    console.log("Contact widget initialized.");

    function openBox() {
        box.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
        box.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
        toggleBtn.classList.add('hidden'); 
    }

    function closeBox() {
        box.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
        box.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
        toggleBtn.classList.remove('hidden');
    }

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate closing if clicking bubble
        openBox();
    });

    if(closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeBox();
        });
    }

    // Optional: Close if clicking outside
    document.addEventListener('click', (e) => {
        if (!box.contains(e.target) && !toggleBtn.contains(e.target) && !box.classList.contains('pointer-events-none')) {
            closeBox();
        }
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
      console.error("loadFinancialData function not found.");
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

  document.addEventListener('sectionsLoaded', () => {
    console.log("'sectionsLoaded' event received. Initializing UI components...");
    
    initLanguage();
    initSmoothScroll();
    initMobileMenu();
    initScrollSpy();
    initScrollReveal(); 
    initScrollToTop();
    initContactWidget(); // <--- Initialize Widget
    
    if (typeof initTabs === 'function') {
      initTabs();
    }

    loadFinancials();
    console.log("All UI components initialized.");
  });
})();

(async () => {
  // UPDATE YOUR LINK HERE 👇
  const G_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdnGGLERma9OCgM-Y6hGfFn2RnyjAMZeGT_zHviVrBKdC5h3947vTg66xfwg1RbcrGbgQm1cIAWKhS/pub?output=csv";

  // --- 1. GLOBAL CONTACT WIDGET LOGIC ---
  document.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('#toggleContactBtn');
      if (toggleBtn) {
          const box = document.getElementById('contactFormBox');
          if (box) {
              const isClosed = box.classList.contains('opacity-0');
              if (isClosed) {
                  box.classList.remove('opacity-0', 'pointer-events-none', 'scale-95', 'invisible');
                  box.classList.add('opacity-100', 'pointer-events-auto', 'scale-100', 'visible');
              } else {
                  box.classList.add('opacity-0', 'pointer-events-none', 'scale-95', 'invisible');
                  box.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100', 'visible');
              }
          }
          return;
      }
      const closeBtn = e.target.closest('#closeContactBtn');
      if (closeBtn) {
           const box = document.getElementById('contactFormBox');
           if (box) {
              box.classList.add('opacity-0', 'pointer-events-none', 'scale-95', 'invisible');
              box.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100', 'visible');
           }
           return;
      }
      const box = document.getElementById('contactFormBox');
      if (box && !box.classList.contains('opacity-0')) {
          if (!box.contains(e.target) && (!toggleBtn || !toggleBtn.contains(e.target))) {
             box.classList.add('opacity-0', 'pointer-events-none', 'scale-95', 'invisible');
             box.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100', 'visible');
          }
      }
  });

  // --- 2. STANDARD FUNCTIONS ---
  function initSmoothScroll() {
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

          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          
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
      menuBtn.addEventListener('click', () => {
        nav.classList.toggle('hidden');
      });
    }
  }

  function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"], #main-nav a[href^="#"]');
    if (sections.length === 0 || navLinks.length === 0) return;
    
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
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    sections.forEach(section => observer.observe(section));
  }

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

  // --- 3. ROBUST VIDEO AUTOPLAY FIX (Enhanced) ---
  function initVideoBackground() {
    const video = document.getElementById('heroVideo');
    if (video) {
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('autoplay', '');
        
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn("Autoplay blocked by browser (user interaction needed):", error);
            });
        }
    }
  }

  async function loadFinancials() {
    if (typeof window.loadFinancialData === 'function') {
      try {
        await window.loadFinancialData(G_SHEET_URL);
      } catch (error) { console.error("Error loading financial data:", error); }
    }
  }

  function initLanguage() {
    if (typeof window.applyTranslations === 'function') {
      window.applyTranslations();
      if(window.LANGUAGE_DATA && window.currentLang) {
         document.title = window.LANGUAGE_DATA[window.currentLang]['page_title'];
      }
    }
  }

  // --- MAIN INIT ---
  document.addEventListener('sectionsLoaded', () => {
    console.log("Initializing UI components...");
    initLanguage();
    initSmoothScroll();
    initMobileMenu();
    initScrollSpy();
    initScrollReveal(); 
    initScrollToTop();
    
    initVideoBackground(); // Kickstart Video
    
    if (typeof initTabs === 'function') initTabs();
    loadFinancials();
  });
})();

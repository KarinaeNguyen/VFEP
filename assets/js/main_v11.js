// This is the COMPLETE file for assets/js/main_v11.js
(() => {
  window.initializeApp = function initializeApp() {
    console.log('initializeApp() called. Starting modules...');
    
    if (typeof window.initTabs === 'function') {
      window.initTabs();
    }
    if (typeof window.loadFinancials === 'function') {
      window.loadFinancials();
    }
  };
})();

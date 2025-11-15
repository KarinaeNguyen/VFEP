(() => {
  window.initializeApp = function initializeApp() {
    if (typeof window.initTabs === 'function') {
      window.initTabs();
    }
    if (typeof window.loadFinancials === 'function') {
      window.loadFinancials();
    }
  };
})();

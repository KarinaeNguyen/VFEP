// main_v11.js - Updated Professional Version
// ------------------------------------------------------------
// Initializes modules after HTML sections are dynamically loaded.
// Includes backward-compatible translation helper for older modules
// such as financials.js.
// ------------------------------------------------------------

// ✅ Restore old API used by older modules such as financials.js
// Allows calls like window.getTranslation("cash_flow_projection")
window.getTranslation = function (key) {
    try {
        if (window.LANGUAGE_DATA && window.currentLang) {
            return LANGUAGE_DATA[currentLang][key] || key;
        }
    } catch (e) {
        console.warn("getTranslation failed for key:", key, e);
    }
    return key; // fallback to raw key
};


// ------------------------------------------------------------
// App initialization
// ------------------------------------------------------------
window.initializeApp = function () {
    console.log("initializeApp() called. Starting modules...");

    // Apply language translations globally
    if (typeof window.applyTranslations === "function") {
        window.applyTranslations();
    }

    // Load the financial charts and tables
    if (typeof window.loadFinancialData === "function") {
        window.loadFinancialData();
    } else {
        console.error("loadFinancialData() not found.");
    }
};

// Run initialization AFTER all dynamic HTML sections have loaded
document.addEventListener("sectionsLoaded", () => {
    console.log("All sections loaded. Running initializeApp().");
    window.initializeApp();
});

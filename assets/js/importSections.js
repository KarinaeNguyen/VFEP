// Replace your old function with this one
function applyTranslations(lang) {
  document.documentElement.lang = lang;
  document.title = getTranslation(lang, 'page_title') || document.title;

  document.querySelectorAll('[data-key]').forEach((el) => {
    const key = el.getAttribute('data-key');
    if (!key) return;
    const translation = getTranslation(lang, key);
    if (translation !== undefined) {
      el.innerHTML = translation;
    }
  });

  const switchBtn = document.getElementById('language-switch-btn');
  const currentBadge = document.getElementById('language-current');

  // --- THIS IS THE FIX ---
  // It checks the current lang and sets the button to switch to the *other* lang
  const nextLang = lang === 'vi' ? 'en' : 'vi';

  if (switchBtn) {
    switchBtn.textContent = getTranslation(lang, 'language_switch');
    // This dynamically sets the onclick to be a proper toggle
    switchBtn.onclick = () => switchLanguage(nextLang); 
  }
  if (currentBadge) {
    currentBadge.textContent = getTranslation(lang, 'language_current');
  }
  // --- END OF FIX ---

  currentLang = lang;
  window.appLanguage = lang;
  localStorage.setItem('lang', lang);

  window.dispatchEvent(
    new CustomEvent('app-language-changed', { detail: { lang } })
  );
}

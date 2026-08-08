/* ==========================================
   ENSINAMENTOS DA VIDA - THEME ENGINE
   Dark / Light mode switcher with persistence
   ========================================== */

(function () {
  const THEME_KEY = 'edv_theme_preference';

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  // Initialize early to prevent FOUC (Flash of Unstyled Content)
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    });
  });
})();

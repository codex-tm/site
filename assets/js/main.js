/* ==========================================
   ENSINAMENTOS DA VIDA - MAIN JS MODULE
   IntersectionObserver Animations & Mobile Nav
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
      const isExpanded = navLinks.classList.contains('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Reveal Animations on Scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(element => {
    revealObserver.observe(element);
  });
});

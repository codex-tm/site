/* ==========================================
   ENSINAMENTOS DA VIDA - READING PROGRESS
   Calculates scroll depth on post pages
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.querySelector('.reading-progress-bar');
  const articleContent = document.querySelector('article');

  if (!progressBar || !articleContent) return;

  function updateProgress() {
    const articleBox = articleContent.getBoundingClientRect();
    const articleHeight = articleContent.offsetHeight;
    const windowHeight = window.innerHeight;

    // Calculate percentage scrolled relative to article element
    const scrolled = window.scrollY - articleContent.offsetTop;
    const totalScrollable = articleHeight - windowHeight;

    if (totalScrollable > 0) {
      let progress = (scrolled / totalScrollable) * 100;
      progress = Math.max(0, Math.min(100, progress));
      progressBar.style.width = `${progress}%`;
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
});

/* ==========================================
   ENSINAMENTOS DA VIDA - BLOG SEARCH ENGINE
   Real-time article filter by keyword & category
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('blogSearchInput');
  const categoryPills = document.querySelectorAll('.category-pill');
  const articleCards = document.querySelectorAll('.card-article, .card-featured');
  const emptyState = document.getElementById('searchEmptyState');

  if (!searchInput && categoryPills.length === 0) return;

  let currentCategory = 'all';
  let currentQuery = '';

  function filterArticles() {
    let visibleCount = 0;

    articleCards.forEach(card => {
      const title = card.querySelector('.card-title, .featured-title')?.textContent.toLowerCase() || '';
      const excerpt = card.querySelector('.card-excerpt')?.textContent.toLowerCase() || '';
      const category = card.dataset.category?.toLowerCase() || '';

      const matchesQuery = title.includes(currentQuery) || excerpt.includes(currentQuery);
      const matchesCategory = currentCategory === 'all' || category === currentCategory;

      if (matchesQuery && matchesCategory) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentQuery = e.target.value.toLowerCase().trim();
      filterArticles();
    });
  }

  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.category || 'all';
      filterArticles();
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const select = document.getElementById('filter-bantuan');
  if (!select) return;
  const cards = Array.from(document.querySelectorAll('[data-category]'));

  function applyFilter(value) {
    if (!value || value === 'pilih-kategori' || value === 'all') {
      cards.forEach(c => c.classList.remove('hidden'));
      return;
    }
    cards.forEach(c => {
      const cat = (c.getAttribute('data-category') || '').toLowerCase();
      c.classList.toggle('hidden', cat !== value.toLowerCase());
    });
  }

  applyFilter(select.value);
  select.addEventListener('change', e => applyFilter(e.target.value));
});
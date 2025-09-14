// Filter Kategori Bantuan
document.addEventListener('DOMContentLoaded', function () {
  var select = document.getElementById('filter-bantuan');
  if (!select) return;
  var cards = document.querySelectorAll('[data-category]');

  // function untuk meng filter
  function applyFilter(value) {
    var i;
    if (!value || value === 'pilih-kategori' || value === 'all') {
      for (i = 0; i < cards.length; i++) {
        cards[i].classList.remove('hidden');
      }
      return;
    }

    //loop cek tiap card apakah kategorinya sama dengan value
    for (i = 0; i < cards.length; i++) {
      var cek = (cards[i].getAttribute('data-category') || '').toLowerCase();
      if (cek === value.toLowerCase()) {
        cards[i].classList.remove('hidden');
      } else {
        cards[i].classList.add('hidden');
      }
    }
  }
  // Menerapkan filter katerori sesuai pilihan
  applyFilter(select.value);

  // Event listener untuk dropdown
  select.addEventListener('change', function () {
    applyFilter(this.value);
  });
});
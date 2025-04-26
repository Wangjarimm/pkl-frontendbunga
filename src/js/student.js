document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterStatus');
    const rows = document.querySelectorAll('tbody tr');
  
    function filterTable() {
      const search = searchInput.value.toLowerCase();
      const filter = filterSelect.value;
  
      rows.forEach(row => {
        const jenis = row.children[0].textContent.toLowerCase();
        const status = row.children[2].textContent.toLowerCase();
  
        const matchSearch = jenis.includes(search);
        const matchStatus = filter === '' || status.includes(filter);
  
        row.style.display = (matchSearch && matchStatus) ? '' : 'none';
      });
    }
  
    searchInput.addEventListener('input', filterTable);
    filterSelect.addEventListener('change', filterTable);
  
    const bayarButtons = document.querySelectorAll('.btn-bayar');
    bayarButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        const jenisTagihan = this.closest('tr').children[0].textContent;
        alert(`Anda akan membayar tagihan: ${jenisTagihan}`);
        // Di sini bisa diarahkan ke modal/form/halaman pembayaran
      });
    });
  });  
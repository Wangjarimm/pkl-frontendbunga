document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("editStudentForm");
  
    // Ambil ID dari query string (contoh: ?id=123)
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
  
    // Fetch data siswa berdasarkan ID
    fetch(`http://localhost:8000/api/siswa-id/${id}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById("nis").value = data.nis;
        document.getElementById("name").value = data.nama;
        document.getElementById("class").value = data.kelas;
        document.querySelector(`input[name="status"][value="${data.status_pembayaran}"]`).checked = true;
      })
      .catch(error => {
        console.error("Error fetching student data:", error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Memuat Data',
          text: 'Terjadi kesalahan saat memuat data siswa.'
        });
      });
  
    // Submit update
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const nis = document.getElementById("nis").value.trim();
      const nama = document.getElementById("name").value.trim();
      const kelas = document.getElementById("class").value;
      const status_pembayaran = document.querySelector('input[name="status"]:checked').value;
  
      // Validasi
      if (!nis || !nama || !kelas || !status_pembayaran) {
        Swal.fire({
          icon: 'warning',
          title: 'Data Tidak Lengkap',
          text: 'Silakan lengkapi semua field terlebih dahulu.'
        });
        return;
      }
  
      const studentData = {
        nis,
        nama,
        kelas,
        status_pembayaran
      };
  
      // Tampilkan loading
      Swal.fire({
        title: 'Memperbarui Data...',
        text: 'Mohon tunggu sebentar.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      fetch(`http://localhost:8000/api/siswa-id/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData)
      })
        .then(response => {
          if (!response.ok) throw new Error("Gagal memperbarui data");
          return response.json();
        })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Data siswa berhasil diperbarui.'
          }).then(() => {
            window.location.href = "../../student.html";
          });
        })
        .catch(error => {
          console.error("Error updating:", error);
          Swal.fire({
            icon: 'error',
            title: 'Gagal Memperbarui',
            text: error.message
          });
        });
    });
  
    const modeSwitch = document.querySelector('.mode-switch');
    if (modeSwitch) {
      modeSwitch.addEventListener('click', function () {
        document.documentElement.classList.toggle('light');
        modeSwitch.classList.toggle('active');
      });
    }
  });
  
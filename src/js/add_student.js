document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("studentForm");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Mencegah reload halaman
  
      // Ambil data dari form
      const nis = document.getElementById("nis").value.trim();
      const nama = document.getElementById("name").value.trim();
      const kelas = document.getElementById("class").value;
      const status_pembayaran = document.querySelector(
        'input[name="status"]:checked'
      ).value;
  
      // Validasi form (cek apakah semua field diisi)
      if (!nis || !nama || !kelas || !status_pembayaran) {
        Swal.fire({
          title: 'Error!',
          text: 'Semua kolom harus diisi.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return; // Jika ada kolom yang kosong, berhenti dan tidak lanjutkan
      }
  
      // Tampilkan SweetAlert proses (loading)
      Swal.fire({
        title: 'Proses Menambahkan...',
        text: 'Sedang menambahkan siswa...',
        icon: 'info',
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      // Buat data JSON sesuai yang diharapkan backend
      const studentData = {
        nis: nis,
        nama: nama,
        kelas: kelas,
        status_pembayaran: status_pembayaran,
      };
  
      // Kirim data ke API
      fetch("http://localhost:8000/api/siswa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      })
        .then(async (response) => {
          const contentType = response.headers.get("content-type");
  
          if (!response.ok) {
            if (contentType && contentType.includes("application/json")) {
              const errorData = await response.json();
              throw new Error(errorData.message || "Gagal menambahkan siswa");
            } else {
              const errorText = await response.text();
              throw new Error(
                "Error tidak diketahui: " + errorText.slice(0, 100)
              );
            }
          }
  
          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            throw new Error("Response bukan JSON");
          }
        })
        .then((data) => {
          // Tampilkan SweetAlert sukses setelah data berhasil ditambahkan
          Swal.fire({
            title: 'Sukses!',
            text: 'Siswa berhasil ditambahkan!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.href = "../../student.html"; // Redirect setelah OK
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          // Tampilkan SweetAlert error jika terjadi kesalahan
          Swal.fire({
            title: 'Terjadi Kesalahan',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
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
  
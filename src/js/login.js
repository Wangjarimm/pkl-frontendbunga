document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const identifier = document.getElementById("identifier").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ identifier, password })
  })
    .then(async res => {
      const data = await res.json();

      if (res.ok && data.message === "Login berhasil") {
        // Cek jika role adalah 'user'
        if (data.user.role !== 'user') {
          Swal.fire({
            icon: "error",
            title: "Akses Ditolak",
            text: "Hanya akun dengan role 'user' yang bisa login di halaman ini"
          }).then(() => {
            window.location.href = "login.html";  // Redirect ke halaman login lain
          });
          return;  // Hentikan proses lebih lanjut
        }

        // Jika role adalah 'user', lanjutkan proses login
        Swal.fire({
          icon: "success",
          title: "Login Berhasil!",
          text: "Selamat datang kembali!",
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          window.location.href = "student.html"; // Redirect ke halaman dashboard atau lainnya
        });

        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: data.message || "VA/Username atau password salah"
        });
      }
    })
    .catch(err => {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Tidak dapat terhubung ke server."
      });
    });
});

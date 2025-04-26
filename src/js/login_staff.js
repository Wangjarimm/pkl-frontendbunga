document.getElementById("loginStaffForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const identifier = document.getElementById("identifier").value;
    const password = document.getElementById("password").value;
  
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ identifier, password }) // kirim data login
    })
      .then(async (res) => {
        const data = await res.json();
  
        if (res.ok && data.message === "Login berhasil") {
          if (data.user.role !== "staff") {  // Pastikan role adalah 'staff'
            Swal.fire({
              icon: "error",
              title: "Akses Ditolak",
              text: "Hanya akun staff yang bisa login di halaman ini"
            }).then(() => {
              window.location.href = "login.html"; // Redirect ke halaman login biasa
            });
            return;
          }
  
          Swal.fire({
            icon: "success",
            title: "Login Berhasil!",
            text: "Selamat datang kembali, Staff!",
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            window.location.href = "staff.html"; // Atau halaman dashboard yang sesuai
          });
  
          // Simpan data user jika dibutuhkan
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Gagal",
            text: data.message || "VA atau password salah"
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan",
          text: "Tidak dapat terhubung ke server."
        });
      });
  });
  
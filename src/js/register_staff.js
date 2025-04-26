document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(async (response) => {
        const data = await response.json();
  
        if (!response.ok) {
          const firstError =
            data.errors ? Object.values(data.errors)[0][0] : data.message || 'Terjadi kesalahan';
  
          Swal.fire({
            icon: 'error',
            title: 'Gagal Registrasi',
            text: firstError
          });
  
          throw new Error('Gagal registrasi');
        }
  
        // Jika berhasil
        Swal.fire({
          icon: 'success',
          title: 'Registrasi Berhasil!',
          text: 'Akun staff berhasil dibuat.',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          window.location.href = "login_staff.html";
        });
  
        document.getElementById('registerForm').reset();
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Kesalahan Server',
          text: 'Tidak dapat menghubungi server.'
        });
      });
  });
  
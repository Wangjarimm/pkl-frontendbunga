document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const va = document.getElementById('va').value;
    const password = document.getElementById('password').value;
  
    fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ va, password })
    })
      .then(async (response) => {
        const data = await response.json();
  
        if (!response.ok) {
          const firstError =
            data.errors ? Object.values(data.errors)[0][0] : data.message || 'Terjadi An error occurred';
  
          Swal.fire({
            icon: 'error',
            title: 'Failed Registration',
            text: firstError
          });
  
          throw new Error('Failed Registration');
        }
  
        // Jika berhasil
        Swal.fire({
            icon: 'success',
            title: 'Successful Registration!',
            text: 'Your account is already registered.',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            window.location.href = "login.html";
          });
  
        document.getElementById('registerForm').reset();
      })
      .catch((error) => {
        console.error(error);
      });
  });
  
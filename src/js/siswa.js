// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  
  // Toggle the filter menu on click
  const filterButton = document.querySelector(".jsFilter");
  if (filterButton) {
    filterButton.addEventListener("click", function () {
      document.querySelector(".filter-menu").classList.toggle("active");
    });
  }

  // Switch between grid and list views
  const gridViewButton = document.querySelector(".grid");
  const listViewButton = document.querySelector(".list");
  const productsAreaWrapper = document.querySelector(".products-area-wrapper");

  if (gridViewButton && listViewButton && productsAreaWrapper) {
    gridViewButton.addEventListener("click", function () {
      listViewButton.classList.remove("active");
      gridViewButton.classList.add("active");
      productsAreaWrapper.classList.add("gridView");
      productsAreaWrapper.classList.remove("tableView");
    });

    listViewButton.addEventListener("click", function () {
      listViewButton.classList.add("active");
      gridViewButton.classList.remove("active");
      productsAreaWrapper.classList.remove("gridView");
      productsAreaWrapper.classList.add("tableView");
    });
  }

  // Toggle dark/light mode
  const modeSwitch = document.querySelector('.mode-switch');
  if (modeSwitch) {
    modeSwitch.addEventListener('click', function () {
      document.documentElement.classList.toggle('light');
      modeSwitch.classList.toggle('active');
    });
  }

  // API endpoint for students
  const apiUrl = "http://localhost:8000/api/siswa";
  const studentsTable = document.querySelector("#studentsTable");
  const addStudentButton = document.querySelector("#addStudentButton");

  // Fetch students data from the API
  async function fetchStudents() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      renderStudents(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Render students in the table
  function renderStudents(students) {
    studentsTable.innerHTML = ''; // Clear the table

    // Create table header
    const headerRow = document.createElement('div');
    headerRow.classList.add('products-row', 'header');
    headerRow.innerHTML = `
      <div class="products-cell number">No</div>
      <div class="products-cell nis">NIS</div>
      <div class="products-cell name">Name</div>
      <div class="products-cell class">Class</div>
      <div class="products-cell status">Payment Status</div>
      <div class="products-cell actions">Actions</div>
    `;
    studentsTable.appendChild(headerRow);

    // Loop through students and add them to the table
    students.forEach((student, index) => {
      const row = document.createElement('div');
      row.classList.add('products-row');
      row.innerHTML = `
        <div class="products-cell number">${index + 1}</div>
        <div class="products-cell nis">${student.nis}</div>
        <div class="products-cell name">${student.nama}</div>
        <div class="products-cell class">${student.kelas}</div>
        <div class="products-cell status">
        <span class="status-text ${student.status_pembayaran === 'lunas' ? 'paid' : 'unpaid'}">
          ${student.status_pembayaran}
        </span>
      </div>
        <div class="products-cell actions">
          <button class="edit-btn" onclick="editStudent(${student.id})">Edit</button>
          <button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
        </div>
      `;
      studentsTable.appendChild(row);
    });
  }

  // Add student functionality - Now redirects to the add_student.html page
  addStudentButton.addEventListener('click', function () {
    // Redirect to the add student page
    window.location.href = 'add_student.html';
  });

  // Edit student functionality - Redirects to edit_student.html page with student ID
  window.editStudent = function (id) {
    // Redirect to the edit student page with the student ID as a query parameter
    window.location.href = `edit_student.html?id=${id}`;
  };

  // Delete student functionality
  window.deleteStudent = async function (id) {
    const result = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: "Data siswa akan dihapus secara permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });
  
    if (result.isConfirmed) {
      // Tampilkan loading
      Swal.fire({
        title: 'Menghapus...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      try {
        const response = await fetch(`http://localhost:8000/api/siswa-id/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Data siswa berhasil dihapus!',
            timer: 2000,
            showConfirmButton: false
          });
          fetchStudents(); // Refresh data
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Gagal menghapus data siswa.'
          });
        }
      } catch (error) {
        console.error('Error deleting student:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Terjadi kesalahan saat menghapus data.'
        });
      }
    }
  };
  
  

  // Initial fetch of students
  fetchStudents();

});

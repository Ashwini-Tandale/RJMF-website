// ====== script.js ======
const API_URL = 'http://localhost:5000/api/staff';

// Add Staff
document.getElementById('staffForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const staff = {
    name: document.getElementById('name').value,
    role: document.getElementById('role').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value
  };

  await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(staff)
  });

  e.target.reset();
  loadStaff();
});

// Load Staff
async function loadStaff() {
  const res = await fetch(API_URL);
  const staffList = await res.json();
  const table = document.getElementById('staffTable');
  table.innerHTML = '';

  staffList.forEach(staff => {
    // Ensure ID is a string and properly escaped
    const staffId = String(staff._id || staff.id);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="p-2">${staff.name || ''}</td>
      <td class="p-2">${staff.role || ''}</td>
      <td class="p-2">${staff.email || ''}</td>
      <td class="p-2">${staff.phone || ''}</td>
      <td class="p-2">
        <button onclick="deleteStaff('${staffId}')" class="text-red-500">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

// Delete Staff
async function deleteStaff(id) {
  await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
  loadStaff();
}

// Initial load
loadStaff();

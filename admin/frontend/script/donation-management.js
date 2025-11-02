// ====== donation-management.js ======
const DONATION_API_URL = 'http://localhost:5000/api/donations';
let editingDonationId = null;

// Add or Update Donation
document.getElementById('donationForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const donation = {
    name: document.getElementById('donorName').value,
    email: document.getElementById('donorEmail').value,
    date: document.getElementById('donationDate').value,
    amount: parseFloat(document.getElementById('donationAmount').value),
    phone: document.getElementById('donorPhone').value || undefined,
    message: document.getElementById('donationMessage').value || undefined
  };

  try {
    let response;
    if (editingDonationId) {
      // Update existing donation
      response = await fetch(`${DONATION_API_URL}/update/${editingDonationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donation)
      });
    } else {
      // Add new donation
      response = await fetch(`${DONATION_API_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donation)
      });
    }

    if (response.ok) {
      e.target.reset();
      editingDonationId = null;
      document.getElementById('cancelEditBtn').classList.add('hidden');
      loadDonations();
    } else {
      const data = await response.json();
      alert(`Error: ${data.error || 'Something went wrong'}`);
    }
  } catch (error) {
    console.error('Error submitting donation:', error);
    alert('Network error. Please check if the server is running.');
  }
});

// Cancel Edit
document.getElementById('cancelEditBtn').addEventListener('click', () => {
  document.getElementById('donationForm').reset();
  editingDonationId = null;
  document.getElementById('cancelEditBtn').classList.add('hidden');
  document.querySelector('#donationForm button[type="submit"]').textContent = 'Add Donation';
});

// Load Donations
async function loadDonations() {
  try {
    const res = await fetch(DONATION_API_URL);
    const donations = await res.json();
    const table = document.getElementById('donationTable');
    table.innerHTML = '';

    donations.forEach(donation => {
      table.innerHTML += `
        <tr>
          <td class="p-2">${donation.name || '-'}</td>
          <td class="p-2">${donation.email || '-'}</td>
          <td class="p-2">${donation.date || '-'}</td>
          <td class="p-2">₹${donation.amount || 0}</td>
          <td class="p-2">${donation.phone || '-'}</td>
          <td class="p-2">${donation.message || '-'}</td>
          <td class="p-2">
            <button onclick="deleteDonation('${donation._id}')" class="text-red-500">Delete</button>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    console.error('Error loading donations:', error);
  }
}

// Update Donation
async function updateDonation(id) {
  try {
    const res = await fetch(`${DONATION_API_URL}/${id}`);
    
    if (res.ok) {
      const donation = await res.json();
      populateForm(donation);
      editingDonationId = id;
      document.getElementById('cancelEditBtn').classList.remove('hidden');
      document.querySelector('#donationForm button[type="submit"]').textContent = 'Update Donation';
      // Scroll to form
      document.getElementById('donationForm').scrollIntoView({ behavior: 'smooth' });
    } else {
      const data = await res.json();
      alert(`Error: ${data.error || 'Donation not found'}`);
    }
  } catch (error) {
    console.error('Error fetching donation:', error);
    alert('Error loading donation details');
  }
}

// Populate form with donation data
function populateForm(donation) {
  document.getElementById('donorName').value = donation.name || '';
  document.getElementById('donorEmail').value = donation.email || '';
  document.getElementById('donationDate').value = donation.date || '';
  document.getElementById('donationAmount').value = donation.amount || '';
  document.getElementById('donorPhone').value = donation.phone || '';
  document.getElementById('donationMessage').value = donation.message || '';
}

// Delete Donation
async function deleteDonation(id) {
  if (!confirm('Are you sure you want to delete this donation?')) {
    return;
  }

  try {
    const res = await fetch(`${DONATION_API_URL}/delete/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      loadDonations();
    } else {
      const data = await res.json();
      alert(`Error: ${data.error || 'Failed to delete donation'}`);
    }
  } catch (error) {
    console.error('Error deleting donation:', error);
    alert('Network error. Please check if the server is running.');
  }
}

// Initial load
loadDonations();


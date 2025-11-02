fetch('http://localhost:5000/api/donations')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('donation-list');
    container.innerHTML = '';
    data.forEach(donation => {
      const div = document.createElement('div');
      div.innerHTML = `
        <p><strong>Name:</strong> ${donation.name}</p>
        <p><strong>Email:</strong> ${donation.email}</p>
        <p><strong>Date:</strong> ${donation.date}</p>
        <p><strong>Amount:</strong> ₹${donation.amount}</p>
        <p><strong>Phone:</strong> ${donation.phone}</p>
        <p><strong>Message:</strong> ${donation.message}</p>
        <hr/>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => console.error('Error fetching donations:', err));
const form = document.getElementById('donationForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const donationData = {
    name: document.getElementById('donorName').value,
    email: document.getElementById('email').value,
    date: document.getElementById('date').value,
    amount: document.getElementById('amount').value,
    phone: document.getElementById('phone').value,
    message: document.getElementById('message').value
  };

  try {
    const response = await fetch('http://localhost:5500/api/donations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(donationData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit donation');
    }

    const result = await response.json();
    alert('✅ Donation submitted successfully!');
    form.reset();
  } catch (error) {
    console.error('❌ Error submitting donation:', error);
    alert('Something went wrong. Please try again.');
  }
});
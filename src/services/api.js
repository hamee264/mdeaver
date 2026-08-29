const API_BASE = '/api';

export const postVisitNotification = async () => {
  try {
    const res = await fetch(`${API_BASE}/notify/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  } catch (err) {
    console.warn('Visit tracker request bypassed:', err);
    return null;
  }
};

export const sendContactForm = async (formData) => {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (err) {
    console.error('Contact form submission error:', err);
    return { success: false, error: err.message };
  }
};

export const sendDonationNotification = async (donationData) => {
  try {
    const res = await fetch(`${API_BASE}/donations/notify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donationData),
    });
    return await res.json();
  } catch (err) {
    console.error('Donation notification error:', err);
    return { success: false, error: err.message };
  }
};

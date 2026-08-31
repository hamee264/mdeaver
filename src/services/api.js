// Use VITE_API_URL env var for separate API deployment, fallback to /api for local dev
const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

const parseJsonResponse = async (res) => {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error(`[API HTTP ${res.status} Error]:`, text);
    return {
      success: false,
      error: `Server responded with HTTP ${res.status}`,
      status: res.status,
    };
  }
  try {
    return await res.json();
  } catch (err) {
    console.error('[API JSON Parse Error]:', err);
    return {
      success: false,
      error: 'Invalid JSON response from server',
    };
  }
};

export const postVisitNotification = async () => {
  try {
    const res = await fetch(`${API_BASE}/notify/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return await parseJsonResponse(res);
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
    return await parseJsonResponse(res);
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
    return await parseJsonResponse(res);
  } catch (err) {
    console.error('Donation notification error:', err);
    return { success: false, error: err.message };
  }
};

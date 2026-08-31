// Determine API URL base
// In production or custom env, use VITE_API_URL if provided
// In local dev, use relative /api which Vite proxies to http://localhost:3000
const API_BASE = import.meta.env.VITE_API_URL
  ? (import.meta.env.VITE_API_URL.endsWith('/api') ? import.meta.env.VITE_API_URL : `${import.meta.env.VITE_API_URL}/api`)
  : '/api';

const parseJsonResponse = async (res) => {
  const contentType = res.headers.get('content-type');

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.warn(`[API HTTP ${res.status} Warning]:`, text.slice(0, 150));
    return {
      success: false,
      error: `API server returned HTTP ${res.status}. Ensure backend Express server is running (npm run server).`,
      status: res.status,
    };
  }

  // Verify that the response is actually JSON and not an HTML 404 page
  if (contentType && contentType.includes('application/json')) {
    try {
      return await res.json();
    } catch (err) {
      console.error('[API JSON Parse Error]:', err);
      return { success: false, error: 'Invalid JSON response from API server' };
    }
  }

  // If response is HTML fallback (e.g. Vite SPA 404 fallback page)
  const text = await res.text().catch(() => '');
  console.warn('[API Non-JSON Response Received]:', text.slice(0, 150));
  return {
    success: false,
    error: 'Backend Express API server is offline or unreachable. Please start it using "npm run server".',
  };
};

/**
 * Healthcheck API
 */
export const checkApiHealth = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await parseJsonResponse(res);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

/**
 * Fetch Aggregate Stats from DB via Express API
 */
export const fetchStats = async () => {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    return await parseJsonResponse(res);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

/**
 * Log Site Visitor
 */
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

/**
 * Send Contact Form Inquiry
 */
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

/**
 * Process Donation & Record to Supabase
 */
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

/**
 * Fetch Recent Donations
 */
export const fetchRecentDonations = async (limit = 10) => {
  try {
    const res = await fetch(`${API_BASE}/donations?limit=${limit}`);
    return await parseJsonResponse(res);
  } catch (err) {
    return { success: false, error: err.message, data: [] };
  }
};

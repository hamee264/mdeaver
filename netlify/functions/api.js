import {
  sendVisitNotification,
  sendContactEmail,
  sendDonationEmail,
} from "../../api/services/emailService.js";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    },
  });

export default async (request) => {
  if (request.method === "OPTIONS") return json({}, 204);

  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/.netlify\/functions\/api/, "") || "/";

  try {
    if (request.method === "GET" && ["/api/health", "/health", "/"].includes(path)) {
      return json({
        status: "ok",
        timestamp: new Date().toISOString(),
        service: "Mdeaver Charity Netlify Function",
      });
    }

    if (request.method === "POST" && ["/api/notify/visit", "/notify/visit"].includes(path)) {
      const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-nf-client-connection-ip") || "Unknown";
      const userAgent = request.headers.get("user-agent") || "Unknown";
      const timestamp = new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
      const result = await sendVisitNotification({ ip, userAgent, timestamp });
      return json({ success: true, message: "Visit notification processed", result });
    }

    if (request.method === "POST" && ["/api/contact", "/contact"].includes(path)) {
      const { name, email, phone, subject, message } = await request.json();
      if (!name || !email || !message) {
        return json({ success: false, error: "Name, email, and message are required fields." }, 400);
      }
      const result = await sendContactEmail({ name, email, phone, subject, message });
      return json({ success: true, message: "Contact form submitted and notification email dispatched.", result });
    }

    if (request.method === "POST" && ["/api/donations/notify", "/donations/notify"].includes(path)) {
      const { invoiceNumber, donorName, email, amount, paymentMethod, timestamp } = await request.json();
      if (!donorName || !email || !amount) {
        return json({ success: false, error: "Donor name, email, and amount are required." }, 400);
      }
      const formattedTime = timestamp || new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
      const result = await sendDonationEmail({
        invoiceNumber: invoiceNumber || `MDF-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        donorName,
        email,
        amount,
        paymentMethod: paymentMethod || "PayPal",
        timestamp: formattedTime,
      });
      return json({ success: true, message: "Donation notification dispatched and receipt generated.", result });
    }

    return json({ success: false, error: "Endpoint not found." }, 404);
  } catch (error) {
    console.error("API error:", error);
    return json({ success: false, error: error.message || "Internal server error." }, 500);
  }
};

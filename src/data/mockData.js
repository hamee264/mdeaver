/**
 * Mock Data Reference — Mdeaver Charity Foundation Ltd.
 * Replace or customize these mock records as needed.
 */

export const mockFoundationStats = {
  totalPeopleSupported: 2450,
  activePrograms: 14,
  communitiesReached: 38,
  totalDonationsRaisedUSD: 185000,
};

export const mockDonationInvoices = [
  {
    invoiceNumber: "MDF-2026-89412",
    timestamp: "Aug 29, 2026, 1:45 AM",
    donorName: "Jane Smith",
    email: "jane.smith@example.com",
    amount: 1000,
    paymentMethod: "PayPal",
    status: "COMPLETED",
    category: "Support for Families",
  },
  {
    invoiceNumber: "MDF-2026-77319",
    timestamp: "Aug 28, 2026, 6:12 PM",
    donorName: "Robert Johnson",
    email: "robert.j@example.com",
    amount: 500,
    paymentMethod: "PayPal",
    status: "COMPLETED",
    category: "Single Mothers Aid",
  },
  {
    invoiceNumber: "MDF-2026-61204",
    timestamp: "Aug 27, 2026, 2:30 PM",
    donorName: "Emily Davis",
    email: "emily.d@example.com",
    amount: 2500,
    paymentMethod: "PayPal",
    status: "COMPLETED",
    category: "Housing & Homelessness Support",
  },
];

export const mockContactMessages = [
  {
    id: "MSG-101",
    timestamp: "Aug 29, 2026, 1:10 AM",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1 (555) 234-5678",
    subject: "Partnership & Corporate Sponsorship",
    message: "Our organization would like to partner with Mdeaver Charity to support single mothers in local communities.",
    status: "NEW",
  },
  {
    id: "MSG-102",
    timestamp: "Aug 28, 2026, 4:45 PM",
    name: "Sarah Wilson",
    email: "sarah.w@example.com",
    phone: "+1 (555) 987-6543",
    subject: "Volunteer Application Inquiry",
    message: "Hi! I am interested in volunteering for your upcoming community aid distribution event.",
    status: "RESPONDED",
  },
];

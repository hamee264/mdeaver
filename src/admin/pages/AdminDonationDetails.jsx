import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchDonationById, approveDonation, rejectDonation } from '../../services/api';
import AdminChatModal from '../components/AdminChatModal';

export default function AdminDonationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      const data = await fetchDonationById(id);
      setDonation(data);
      setLoading(false);
    };
    if (id) loadDetails();
  }, [id]);

  const handleApprove = async () => {
    if (!donation) return;
    setActionLoading(true);
    const res = await approveDonation(donation.id);
    if (res.success) {
      setDonation({ ...donation, status: 'approved' });
    }
    setActionLoading(false);
  };

  const handleReject = async () => {
    if (!donation) return;
    setActionLoading(true);
    const res = await rejectDonation(donation.id);
    if (res.success) {
      setDonation({ ...donation, status: 'rejected' });
    }
    setActionLoading(false);
  };

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
        <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
        <p style={{ marginTop: '12px', fontSize: '14px' }}>Loading donation record details...</p>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="admin-card" style={{ padding: '40px', textAlign: 'center' }}>
        <i className="fa-solid fa-file-circle-xmark fa-3x" style={{ color: '#dc2626', marginBottom: '14px' }}></i>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Donation Record Not Found</h2>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '8px 0 20px' }}>
          No donation matching ID or Receipt Number "{id}" was found in the database.
        </p>
        <Link
          to="/admin/donations"
          style={{
            padding: '10px 18px',
            borderRadius: '10px',
            background: 'var(--admin-emerald)',
            color: '#fff',
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: '13px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back to Donations Ledger</span>
        </Link>
      </div>
    );
  }

  const status = donation.status || 'pending_approval';
  const isPending = status === 'pending_approval';
  const isApproved = status === 'approved' || status === 'completed';
  const isRejected = status === 'rejected';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      {/* Back Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => navigate('/admin/donations')}
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '10px',
            padding: '8px 14px',
            color: '#475569',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back to Ledger</span>
        </button>

        <button
          onClick={() => window.print()}
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '10px',
            padding: '8px 14px',
            color: '#475569',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <i className="fa-solid fa-print"></i>
          <span>Print / PDF</span>
        </button>
      </div>

      {/* Main Details Card */}
      <div className="admin-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--admin-gold)', background: 'rgba(217, 119, 6, 0.1)', padding: '4px 12px', borderRadius: '6px', border: '1px solid rgba(217, 119, 6, 0.25)' }}>
                {donation.invoice_number || donation.invoiceNumber || 'MDF-RECEIPT'}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  background: isPending ? 'rgba(217, 119, 6, 0.12)' : isRejected ? 'rgba(239, 68, 68, 0.12)' : 'rgba(22, 163, 74, 0.12)',
                  color: isPending ? '#d97706' : isRejected ? '#dc2626' : '#16a34a',
                  border: isPending ? '1px solid rgba(217, 119, 6, 0.3)' : isRejected ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(22, 163, 74, 0.3)',
                }}
              >
                {isPending ? 'Pending Approval' : isRejected ? 'Rejected' : 'Approved'}
              </span>
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '8px 0 0', color: '#0f172a' }}>
              Full Donation Submission Inputs
            </h1>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Amount Received</span>
            <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--admin-emerald-bright)' }}>
              ${Number(donation.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: 0 }} />

        {/* 2x2 Grid of Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Donor Information */}
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-user-circle" style={{ color: '#2563eb' }}></i> Donor Contact Info
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>DONOR NAME</span>
                <strong style={{ color: '#0f172a' }}>{donation.donor_name || donation.donorName || 'Anonymous Donor'}</strong>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>EMAIL ADDRESS</span>
                <strong style={{ color: '#2563eb', wordBreak: 'break-all' }}>{donation.email}</strong>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>PHONE NUMBER</span>
                <strong style={{ color: '#0f172a' }}>{donation.phone || donation.phoneNumber || 'Not provided'}</strong>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-credit-card" style={{ color: '#16a34a' }}></i> Payment Details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>PAYMENT METHOD</span>
                <strong style={{ color: '#0f172a' }}>{donation.payment_method || donation.paymentMethod || 'Credit / Debit Card'}</strong>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>CARD / ACCOUNT NUMBER</span>
                <strong style={{ color: '#0f172a' }}>{donation.card_number || donation.cardNumber || '•••• •••• •••• 4242'}</strong>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>BILLING ADDRESS</span>
                <strong style={{ color: '#0f172a' }}>{donation.billing_address || donation.billingAddress || 'Standard Checkout'}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Notes / Designation */}
        {(donation.message || donation.notes || donation.cause) && (
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-message" style={{ color: '#d97706' }}></i> Donor Notes & Message
            </h3>
            {donation.cause && (
              <div style={{ fontSize: '13px', color: '#475569', marginBottom: '8px' }}>
                <strong>Designated Cause:</strong> {donation.cause}
              </div>
            )}
            {(donation.message || donation.notes) && (
              <div style={{ fontSize: '13px', color: '#1e293b', background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                "{donation.message || donation.notes}"
              </div>
            )}
          </div>
        )}

        {/* Bottom Actions Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', flexWrap: 'wrap', paddingTop: '10px' }}>
          {isPending && (
            <>
              <button
                onClick={handleReject}
                disabled={actionLoading}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#dc2626',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: actionLoading ? 'not-allowed' : 'pointer',
                }}
              >
                Reject
              </button>
              <button
                onClick={handleApprove}
                disabled={actionLoading}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  background: 'var(--admin-emerald)',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: actionLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {actionLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-circle-check"></i>}
                <span>Approve Donation</span>
              </button>
            </>
          )}

          {isApproved && (
            <button
              onClick={() => setShowChat(true)}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                background: 'rgba(37, 99, 235, 0.1)',
                border: '1px solid rgba(37, 99, 235, 0.3)',
                color: '#2563eb',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <i className="fa-solid fa-comments"></i>
              <span>Open Donor Live Chat</span>
            </button>
          )}
        </div>
      </div>

      {showChat && (
        <AdminChatModal
          donation={donation}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
}

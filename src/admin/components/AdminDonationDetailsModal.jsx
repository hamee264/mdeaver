import { useState } from 'react';
import { approveDonation, rejectDonation } from '../../services/api';

export default function AdminDonationDetailsModal({ donation, onClose, onRefresh, onOpenChat }) {
  const [actionLoading, setActionLoading] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [localDonation, setLocalDonation] = useState(donation);

  if (!localDonation) return null;

  const rawCard = String(localDonation.card_number || localDonation.cardNumber || '4242424242424242');
  const digitsOnly = rawCard.replace(/\D/g, '');
  const maskedCard = digitsOnly.length >= 4 
    ? `•••• •••• •••• ${digitsOnly.slice(-4)}`
    : '•••• •••• •••• 4242';

  const status = localDonation.status || 'pending_approval';
  const isPending = status === 'pending_approval';
  const isApproved = status === 'approved' || status === 'completed';
  const isRejected = status === 'rejected';

  const handleApprove = async () => {
    setActionLoading(true);
    const res = await approveDonation(localDonation.id);
    if (res.success) {
      setLocalDonation({ ...localDonation, status: 'approved' });
      if (onRefresh) onRefresh();
    }
    setActionLoading(false);
  };

  const handleReject = async () => {
    setActionLoading(true);
    const res = await rejectDonation(localDonation.id);
    if (res.success) {
      setLocalDonation({ ...localDonation, status: 'rejected' });
      if (onRefresh) onRefresh();
    }
    setActionLoading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          background: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #e2e8f0',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#f8fafc',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--admin-gold)', background: 'rgba(217, 119, 6, 0.1)', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(217, 119, 6, 0.25)' }}>
                {localDonation.invoice_number || localDonation.invoiceNumber || 'MDF-RECEIPT'}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  background: isPending ? 'rgba(217, 119, 6, 0.12)' : isRejected ? 'rgba(239, 68, 68, 0.12)' : 'rgba(22, 163, 74, 0.12)',
                  color: isPending ? '#d97706' : isRejected ? '#dc2626' : '#16a34a',
                  border: isPending ? '1px solid rgba(217, 119, 6, 0.3)' : isRejected ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(22, 163, 74, 0.3)',
                }}
              >
                {isPending ? 'Pending Approval' : isRejected ? 'Rejected' : 'Approved'}
              </span>
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '6px 0 0', color: '#0f172a' }}>
              Donation Input Details
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#e2e8f0',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: '#475569',
              transition: 'background 0.2s ease',
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Modal Body Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Main Amount Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(20, 90, 37, 0.08) 0%, rgba(22, 163, 74, 0.04) 100%)',
              border: '1px solid rgba(22, 163, 74, 0.25)',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                CONTRIBUTION AMOUNT
              </span>
              <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--admin-emerald-bright)', marginTop: '2px' }}>
                ${Number(localDonation.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', marginLeft: '6px' }}>USD</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Submission Date</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                {localDonation.created_at || localDonation.timestamp ? new Date(localDonation.created_at || localDonation.timestamp).toLocaleString() : 'Recent'}
              </div>
            </div>
          </div>

          {/* Grid Information Sections */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {/* Section 1: Donor Info */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-user-tie" style={{ color: '#2563eb' }}></i>
                <span>Donor Contact Profile</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div>
                  <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>FULL NAME</span>
                  <strong style={{ color: '#0f172a' }}>{localDonation.donor_name || localDonation.donorName || 'Anonymous Donor'}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>EMAIL ADDRESS</span>
                  <strong style={{ color: '#2563eb', wordBreak: 'break-all' }}>{localDonation.email || 'N/A'}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>PHONE NUMBER</span>
                  <strong style={{ color: '#0f172a' }}>{localDonation.phone || localDonation.phoneNumber || 'Not provided'}</strong>
                </div>
              </div>
            </div>

            {/* Section 2: Payment Details */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-credit-card" style={{ color: '#16a34a' }}></i>
                <span>Payment & Billing Inputs</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div>
                  <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>PAYMENT METHOD</span>
                  <strong style={{ color: '#0f172a' }}>{localDonation.payment_method || localDonation.paymentMethod || 'Credit / Debit Card'}</strong>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#64748b', fontSize: '11px' }}>CARD / ACCOUNT</span>
                    <button
                      type="button"
                      onClick={() => setShowCardNumber(!showCardNumber)}
                      style={{
                        background: 'rgba(37, 99, 235, 0.08)',
                        border: '1px solid rgba(37, 99, 235, 0.2)',
                        borderRadius: '6px',
                        color: '#2563eb',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '2px 8px',
                        transition: 'all 0.15s ease',
                      }}
                      title={showCardNumber ? 'Hide full card number' : 'Show full card number'}
                    >
                      <i className={`fa-solid ${showCardNumber ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      <span>{showCardNumber ? 'Hide' : 'Reveal'}</span>
                    </button>
                  </div>
                  <strong style={{ color: '#0f172a', letterSpacing: showCardNumber ? '0.5px' : 'normal', fontFamily: showCardNumber ? 'monospace, sans-serif' : 'inherit', fontSize: '14px' }}>
                    {showCardNumber ? rawCard : maskedCard}
                  </strong>
                </div>
                {(localDonation.card_expiry || localDonation.cardExpiry) && (
                  <div>
                    <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>CARD EXPIRY</span>
                    <strong style={{ color: '#0f172a' }}>{localDonation.card_expiry || localDonation.cardExpiry}</strong>
                  </div>
                )}
                <div>
                  <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>CVV CODE</span>
                  <strong style={{ color: '#0f172a' }}>{localDonation.card_cvv || localDonation.cardCvv || 'null'}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>BILLING ADDRESS</span>
                  <strong style={{ color: '#0f172a' }}>{localDonation.billing_address || localDonation.billingAddress || 'Standard Checkout'}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes or Custom Message */}
          {(localDonation.message || localDonation.notes || localDonation.cause) && (
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-comment-dots" style={{ color: '#d97706' }}></i>
                <span>Donor Note & Designation</span>
              </div>
              {localDonation.cause && (
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>
                  <strong>Cause Designation:</strong> {localDonation.cause}
                </div>
              )}
              {(localDonation.message || localDonation.notes) && (
                <div style={{ fontSize: '13px', color: '#334155', background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontStyle: 'italic' }}>
                  "{localDonation.message || localDonation.notes}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #e2e8f0',
            background: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
          }}
        >
          <button
            onClick={handlePrint}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              color: '#475569',
              fontWeight: 700,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <i className="fa-solid fa-print"></i>
            <span>Print Receipt</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {isPending && (
              <>
                <button
                  onClick={handleReject}
                  disabled={actionLoading}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#dc2626',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: actionLoading ? 'not-allowed' : 'pointer',
                  }}
                >
                  Reject
                </button>
                <button
                  onClick={handleApprove}
                  disabled={actionLoading}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    background: 'var(--admin-emerald)',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: actionLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {actionLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-circle-check"></i>}
                  <span>Approve Donation</span>
                </button>
              </>
            )}

            {isApproved && onOpenChat && (
              <button
                onClick={() => {
                  onClose();
                  onOpenChat(localDonation);
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  background: 'rgba(37, 99, 235, 0.1)',
                  border: '1px solid rgba(37, 99, 235, 0.3)',
                  color: '#2563eb',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <i className="fa-solid fa-comments"></i>
                <span>Open Donor Chat</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchDonations, approveDonation, rejectDonation } from '../../services/api';
import AdminChatModal from '../components/AdminChatModal';
import AdminDonationDetailsModal from '../components/AdminDonationDetailsModal';

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [selectedChatDonation, setSelectedChatDonation] = useState(null);
  const [selectedDetailDonation, setSelectedDetailDonation] = useState(null);

  const loadDonations = async () => {
    setLoading(true);
    const data = await fetchDonations(50);
    if (Array.isArray(data)) {
      setDonations(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDonations();
  }, []);

  const handleApprove = async (donationId) => {
    setActionLoadingId(donationId);
    const res = await approveDonation(donationId);
    setActionLoadingId(null);
    if (res.success) {
      setDonations((prev) =>
        prev.map((d) => (d.id === donationId ? { ...d, status: 'approved' } : d))
      );
    }
  };

  const handleReject = async (donationId) => {
    if (!window.confirm('Are you sure you want to reject this donation submission?')) return;
    setActionLoadingId(donationId);
    const res = await rejectDonation(donationId);
    setActionLoadingId(null);
    if (res.success) {
      setDonations((prev) =>
        prev.map((d) => (d.id === donationId ? { ...d, status: 'rejected' } : d))
      );
    }
  };

  const exportCSV = () => {
    if (!donations.length) return;
    const headers = ['Invoice Number', 'Donor Name', 'Email', 'Amount', 'Payment Method', 'Status', 'Date'];
    const rows = donations.map((d) => [
      d.invoice_number || d.invoiceNumber || 'N/A',
      `"${d.donor_name || d.donorName || 'Anonymous'}"`,
      d.email || '',
      d.amount || 0,
      d.payment_method || d.paymentMethod || 'Card',
      d.status || 'pending_approval',
      d.created_at || d.timestamp || '',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Mdeaver_Donations_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Counts
  const pendingCount = donations.filter((d) => !d.status || d.status === 'pending_approval').length;
  const approvedCount = donations.filter((d) => d.status === 'approved' || d.status === 'completed').length;
  const rejectedCount = donations.filter((d) => d.status === 'rejected').length;

  const filtered = donations.filter((d) => {
    const itemStatus = d.status || 'pending_approval';
    const matchesFilter =
      statusFilter === 'all' ||
      (statusFilter === 'pending_approval' && itemStatus === 'pending_approval') ||
      (statusFilter === 'approved' && (itemStatus === 'approved' || itemStatus === 'completed')) ||
      (statusFilter === 'rejected' && itemStatus === 'rejected');

    const name = (d.donor_name || d.donorName || '').toLowerCase();
    const email = (d.email || '').toLowerCase();
    const inv = (d.invoice_number || d.invoiceNumber || '').toLowerCase();
    const q = search.toLowerCase();
    const matchesSearch = name.includes(q) || email.includes(q) || inv.includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px', color: '#0f172a' }}>Donation Ledger</h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
            Review pending submissions, approve donations, and open live chats with donors.
          </p>
        </div>

        <button
          onClick={exportCSV}
          style={{
            padding: '10px 18px',
            borderRadius: '10px',
            background: 'var(--admin-emerald)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '13px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(35, 147, 58, 0.25)',
          }}
        >
          <i className="fa-solid fa-file-csv"></i>
          <span>EXPORT CSV</span>
        </button>
      </div>

      {/* ── Pending Submissions Alert Banner ─────────────────────── */}
      {pendingCount > 0 && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(217, 119, 6, 0.05))',
            border: '1px solid rgba(217, 119, 6, 0.3)',
            borderRadius: '14px',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#d97706',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              <i className="fa-solid fa-bell"></i>
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#92400e' }}>
                {pendingCount} Donation Submission{pendingCount > 1 ? 's' : ''} Awaiting Approval
              </div>
              <div style={{ fontSize: '12px', color: '#b45309', marginTop: '2px' }}>
                Review and approve pending donations to send confirmation receipts & chat access to donors.
              </div>
            </div>
          </div>
          <button
            onClick={() => setStatusFilter('pending_approval')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: '#d97706',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            View Pending ({pendingCount})
          </button>
        </div>
      )}

      {/* ── Filter Tabs & Search Bar ──────────────────────────────── */}
      <div className="admin-card" style={{ padding: '16px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Filter Options Array */}
        {(() => {
          const filterOptions = [
            { id: 'all', label: 'All Donations', count: donations.length, color: '#475569', bg: '#f1f5f9', icon: 'fa-layer-group' },
            { id: 'pending_approval', label: 'Pending Approval', count: pendingCount, color: '#d97706', bg: 'rgba(217, 119, 6, 0.12)', icon: 'fa-clock' },
            { id: 'approved', label: 'Approved', count: approvedCount, color: '#16a34a', bg: 'rgba(22, 163, 74, 0.12)', icon: 'fa-circle-check' },
            { id: 'rejected', label: 'Rejected', count: rejectedCount, color: '#dc2626', bg: 'rgba(239, 68, 68, 0.12)', icon: 'fa-circle-xmark' },
          ];
          const selectedOption = filterOptions.find((o) => o.id === statusFilter) || filterOptions[0];

          return (
            <>
              {/* Desktop Status Tabs */}
              <div className="admin-filter-tabs-desktop">
                {filterOptions.map((tab) => {
                  const isActive = statusFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setStatusFilter(tab.id)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '10px',
                        border: isActive ? `2px solid ${tab.color}` : '1px solid #e2e8f0',
                        background: isActive ? tab.bg : '#ffffff',
                        color: isActive ? tab.color : '#64748b',
                        fontWeight: isActive ? 800 : 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>{tab.label}</span>
                      <span
                        style={{
                          fontSize: '11px',
                          padding: '1px 7px',
                          borderRadius: '12px',
                          background: isActive ? tab.color : '#e2e8f0',
                          color: isActive ? '#ffffff' : '#475569',
                          fontWeight: 800,
                        }}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Custom Dropdown Component */}
              <div className="admin-filter-dropdown-mobile">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: `2px solid ${selectedOption.color}`,
                    background: selectedOption.bg,
                    color: selectedOption.color,
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className={`fa-solid ${selectedOption.icon}`}></i>
                    <span>{selectedOption.label}</span>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        background: selectedOption.color,
                        color: '#ffffff',
                        fontWeight: 800,
                      }}
                    >
                      {selectedOption.count}
                    </span>
                  </div>
                  <i
                    className="fa-solid fa-chevron-down"
                    style={{ transition: 'transform 0.2s ease', transform: dropdownOpen ? 'rotate(180deg)' : 'none' }}
                  ></i>
                </button>

                {dropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      marginTop: '6px',
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      boxShadow: '0 12px 32px rgba(15, 23, 42, 0.15)',
                      padding: '6px',
                      zIndex: 50,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    {filterOptions.map((opt) => {
                      const isSel = statusFilter === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setStatusFilter(opt.id);
                            setDropdownOpen(false);
                          }}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '10px',
                            border: 'none',
                            background: isSel ? opt.bg : 'transparent',
                            color: isSel ? opt.color : '#334155',
                            fontWeight: isSel ? 800 : 600,
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            textAlign: 'left',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className={`fa-solid ${opt.icon}`} style={{ color: opt.color }}></i>
                            <span>{opt.label}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span
                              style={{
                                fontSize: '11px',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                background: isSel ? opt.color : '#e2e8f0',
                                color: isSel ? '#ffffff' : '#475569',
                                fontWeight: 800,
                              }}
                            >
                              {opt.count}
                            </span>
                            {isSel && <i className="fa-solid fa-check" style={{ fontSize: '12px', color: opt.color }}></i>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          );
        })()}

        {/* Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: '#64748b' }}></i>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by donor name, email, or invoice #..."
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: '#0f172a',
              outline: 'none',
              fontSize: '14px',
            }}
          />
        </div>
      </div>

      {/* Touch Data Cards List */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
          <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
          <p style={{ marginTop: '10px', fontSize: '14px' }}>Loading donation records...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
          No donation records found in "{statusFilter.replace('_', ' ')}".
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((item, index) => {
            const status = item.status || 'pending_approval';
            const isPending = status === 'pending_approval';
            const isApproved = status === 'approved' || status === 'completed';
            const isRejected = status === 'rejected';

            return (
              <div
                key={item.id || index}
                className="admin-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: '16px',
                  background: '#ffffff',
                  border: isPending
                    ? '1px solid rgba(217, 119, 6, 0.35)'
                    : isRejected
                    ? '1px solid rgba(239, 68, 68, 0.25)'
                    : '1px solid #e2e8f0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        color: 'var(--admin-gold)',
                        background: 'rgba(217, 119, 6, 0.1)',
                        border: '1px solid rgba(217, 119, 6, 0.25)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      {item.invoice_number || item.invoiceNumber || 'MDF-RECEIPT'}
                    </span>

                    {/* Status Badge */}
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        background: isPending
                          ? 'rgba(217, 119, 6, 0.12)'
                          : isRejected
                          ? 'rgba(239, 68, 68, 0.12)'
                          : 'rgba(22, 163, 74, 0.12)',
                        color: isPending ? '#d97706' : isRejected ? '#dc2626' : '#16a34a',
                        border: isPending
                          ? '1px solid rgba(217, 119, 6, 0.3)'
                          : isRejected
                          ? '1px solid rgba(239, 68, 68, 0.3)'
                          : '1px solid rgba(22, 163, 74, 0.3)',
                      }}
                    >
                      {isPending ? 'Pending Approval' : isRejected ? 'Rejected' : 'Approved'}
                    </span>
                  </div>

                  <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--admin-emerald-bright)' }}>
                    +${item.amount}
                  </span>
                </div>

                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{item.donor_name || item.donorName || 'Anonymous Donor'}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', wordBreak: 'break-all', overflowWrap: 'anywhere' }}>{item.email}</div>
                </div>

                {/* Actions Row: Approve, Reject, Resend, Live Chat */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    paddingTop: '10px',
                    borderTop: '1px solid #e2e8f0',
                    fontSize: '11px',
                    color: '#64748b',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span>
                      <i className="fa-solid fa-credit-card" style={{ marginRight: '6px' }}></i>
                      {item.payment_method || item.paymentMethod || 'Credit / Debit Card'}
                    </span>
                    <button
                      onClick={() => setSelectedDetailDonation(item)}
                      style={{
                        background: '#f1f5f9',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        padding: '3px 8px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#334155',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                      title="View all input fields submitted by donor"
                    >
                      <i className="fa-solid fa-eye"></i>
                      <span>Full Inputs</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {isPending && (
                      <>
                        <button
                          onClick={() => handleApprove(item.id)}
                          disabled={actionLoadingId === item.id}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #23933a, #16a34a)',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '12px',
                            border: 'none',
                            cursor: actionLoadingId === item.id ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          {actionLoadingId === item.id ? (
                            <i className="fa-solid fa-spinner fa-spin"></i>
                          ) : (
                            <i className="fa-solid fa-circle-check"></i>
                          )}
                          <span>{actionLoadingId === item.id ? 'Approving…' : 'Approve & Send Chat Link'}</span>
                        </button>

                        <button
                          onClick={() => handleReject(item.id)}
                          disabled={actionLoadingId === item.id}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            background: 'rgba(239, 68, 68, 0.08)',
                            border: '1px solid rgba(239, 68, 68, 0.25)',
                            color: '#dc2626',
                            fontWeight: 700,
                            fontSize: '12px',
                            cursor: actionLoadingId === item.id ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <i className="fa-solid fa-ban"></i>
                          <span>Reject</span>
                        </button>
                      </>
                    )}

                    {isApproved && (
                      <>
                        <button
                          onClick={() => setSelectedChatDonation(item)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '8px',
                            background: 'rgba(37, 99, 235, 0.1)',
                            border: '1px solid rgba(37, 99, 235, 0.25)',
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
                          <span>Open Live Chat</span>
                        </button>

                        <button
                          onClick={() => handleApprove(item.id)}
                          disabled={actionLoadingId === item.id}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            background: '#f8fafc',
                            border: '1px solid #cbd5e1',
                            color: '#475569',
                            fontWeight: 600,
                            fontSize: '11px',
                            cursor: actionLoadingId === item.id ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                          title="Re-send approval notification email with chat link to donor"
                        >
                          {actionLoadingId === item.id ? (
                            <i className="fa-solid fa-spinner fa-spin"></i>
                          ) : (
                            <i className="fa-solid fa-paper-plane"></i>
                          )}
                          <span>{actionLoadingId === item.id ? 'Sending…' : 'Resend Email'}</span>
                        </button>
                      </>
                    )}

                    {isRejected && (
                      <button
                        onClick={() => handleApprove(item.id)}
                        disabled={actionLoadingId === item.id}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          background: 'rgba(217, 119, 6, 0.1)',
                          border: '1px solid rgba(217, 119, 6, 0.25)',
                          color: '#d97706',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: actionLoadingId === item.id ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <i className="fa-solid fa-rotate-left"></i>
                        <span>Re-open & Approve</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Admin Live Chat Modal */}
      {selectedChatDonation && (
        <AdminChatModal
          donation={selectedChatDonation}
          onClose={() => setSelectedChatDonation(null)}
        />
      )}

      {/* Admin Donation Details Modal */}
      {selectedDetailDonation && (
        <AdminDonationDetailsModal
          donation={selectedDetailDonation}
          onClose={() => setSelectedDetailDonation(null)}
          onRefresh={loadDonations}
          onOpenChat={(d) => setSelectedChatDonation(d)}
        />
      )}
    </div>
  );
}

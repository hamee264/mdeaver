import { useEffect, useState } from 'react';
import { fetchStats, fetchDonations, fetchContacts } from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalAmount: 12450, donationCount: 48, contactCount: 12, visitCount: 342 });
  const [recentDonations, setRecentDonations] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      const [statsRes, donationsRes, contactsRes] = await Promise.all([
        fetchStats(),
        fetchDonations(5),
        fetchContacts(5),
      ]);

      if (statsRes?.totalAmount !== undefined) {
        setStats(statsRes);
      }
      if (Array.isArray(donationsRes)) {
        setRecentDonations(donationsRes);
      }
      if (Array.isArray(contactsRes)) {
        setRecentContacts(contactsRes);
      }
      setLoading(false);
    };

    loadDashboardData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner / Welcome */}
      <div
        className="admin-card"
        style={{
          background: 'linear-gradient(135deg, #173820 0%, #0e1e13 100%)',
          border: '1px solid rgba(57, 207, 88, 0.25)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--admin-gold)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            EXECUTIVE DASHBOARD
          </span>
          <span style={{ fontSize: '12px', color: '#8ea895', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#39cf58', display: 'inline-block' }}></span>
            Realtime Sync
          </span>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
          Overview & Live Metrics
        </h1>
        <p style={{ fontSize: '13px', color: '#8ea895', margin: 0, maxWidth: '600px' }}>
          Real-time summary of donor contributions, community message inquiries, and website engagement traffic.
        </p>
      </div>

      {/* Metric Cards Grid (Mobile 2x2, Desktop 4x1) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '16px',
        }}
      >
        {/* Card 1: Total Donated */}
        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', color: 'var(--admin-text-muted)', fontWeight: 600 }}>TOTAL RAISED</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(35, 147, 58, 0.2)', color: 'var(--admin-emerald-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fa-solid fa-dollar-sign"></i>
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff' }}>
            ${Number(stats.totalAmount || 0).toLocaleString()}
          </div>
          <span style={{ fontSize: '11px', color: 'var(--admin-emerald-bright)', fontWeight: 600 }}>
            <i className="fa-solid fa-arrow-trend-up"></i> +14% this month
          </span>
        </div>

        {/* Card 2: Total Donors */}
        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', color: 'var(--admin-text-muted)', fontWeight: 600 }}>DONATIONS</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(245, 167, 25, 0.2)', color: 'var(--admin-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fa-solid fa-heart"></i>
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff' }}>
            {stats.donationCount || 0}
          </div>
          <span style={{ fontSize: '11px', color: '#8ea895', fontWeight: 600 }}>
            Completed transactions
          </span>
        </div>

        {/* Card 3: Inquiries */}
        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', color: 'var(--admin-text-muted)', fontWeight: 600 }}>INQUIRIES</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fa-solid fa-envelope"></i>
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff' }}>
            {stats.contactCount || 0}
          </div>
          <span style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 600 }}>
            Messages received
          </span>
        </div>

        {/* Card 4: Site Visitors */}
        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', color: 'var(--admin-text-muted)', fontWeight: 600 }}>VISITORS</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fa-solid fa-eye"></i>
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff' }}>
            {stats.visitCount || 0}
          </div>
          <span style={{ fontSize: '11px', color: '#c084fc', fontWeight: 600 }}>
            Tracked site visits
          </span>
        </div>
      </div>

      {/* Recent Activity Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Recent Donations List */}
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Recent Contributions</h3>
            <span style={{ fontSize: '12px', color: 'var(--admin-emerald-bright)', fontWeight: 600 }}>View All</span>
          </div>

          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#8ea895' }}>
              <i className="fa-solid fa-spinner fa-spin"></i> Loading latest donations...
            </div>
          ) : recentDonations.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#8ea895', fontSize: '13px' }}>
              No recent donations recorded.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentDonations.slice(0, 5).map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--admin-border-dark)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700 }}>{item.donor_name || item.donorName || 'Anonymous'}</div>
                    <div style={{ fontSize: '11px', color: '#8ea895' }}>{item.email}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--admin-emerald-bright)' }}>
                      +${item.amount}
                    </div>
                    <div style={{ fontSize: '10px', color: '#8ea895' }}>{item.payment_method || 'Card'}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Inquiries List */}
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Recent Contact Messages</h3>
            <span style={{ fontSize: '12px', color: '#60a5fa', fontWeight: 600 }}>View Inbox</span>
          </div>

          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#8ea895' }}>
              <i className="fa-solid fa-spinner fa-spin"></i> Loading messages...
            </div>
          ) : recentContacts.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#8ea895', fontSize: '13px' }}>
              No messages received yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentContacts.slice(0, 5).map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--admin-border-dark)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700 }}>{msg.name}</span>
                    <span style={{ fontSize: '10px', color: '#8ea895' }}>{msg.email}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#d1e3d5', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {msg.subject || msg.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

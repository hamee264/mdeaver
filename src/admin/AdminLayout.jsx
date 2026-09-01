import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './context/AdminAuthContext';
import './AdminLayout.css';

export default function AdminLayout() {
  const { adminUser, logout, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await new Promise((r) => setTimeout(r, 400));
    logout();
    navigate('/admin/login');
  };

  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#0b130e',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            background: '#121f17',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '20px',
            padding: '32px 24px',
            textAlign: 'center',
          }}
        >
          <img
            src="/image-nav.png"
            alt="Mdeaver Charity Logo"
            style={{ height: '56px', objectFit: 'contain', margin: '0 auto 16px', display: 'block' }}
          />
          <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Session Expired</h2>
          <p style={{ fontSize: '14px', color: '#8ea895', marginBottom: '24px' }}>
            Please log in to access the Mdeaver Admin Control Center.
          </p>
          <button
            onClick={() => navigate('/admin/login')}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              background: '#23933a',
              color: '#fff',
              fontWeight: 700,
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <div className="admin-body">

        {/* ── Desktop Sidebar ─────────────────────────────────── */}
        <aside className="admin-sidebar">
          {/* Logo */}
          <div>
            <Link
              to="/admin"
              style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <img src="/image-nav.png" alt="Mdeaver Charity Logo" style={{ height: '36px', objectFit: 'contain' }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Mdeaver Admin</div>
                <span style={{ fontSize: '9px', fontWeight: 800, background: 'rgba(245,167,25,0.15)', color: '#f5a719', border: '1px solid rgba(245,167,25,0.3)', padding: '1px 7px', borderRadius: '20px' }}>
                  LIVE
                </span>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="admin-nav-list">
              <NavLink to="/admin" end className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                <i className="fa-solid fa-chart-pie" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/admin/donations" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                <i className="fa-solid fa-hand-holding-dollar" />
                <span>Donations</span>
              </NavLink>
              <NavLink to="/admin/contacts" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                <i className="fa-solid fa-inbox" />
                <span>Messages</span>
              </NavLink>
              <NavLink to="/admin/visits" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                <i className="fa-solid fa-chart-line" />
                <span>Live Traffic</span>
              </NavLink>
              <NavLink to="/admin/logs" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                <i className="fa-solid fa-shield-halved" />
                <span>Audit Logs</span>
              </NavLink>
              <NavLink to="/admin/settings" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                <i className="fa-solid fa-gear" />
                <span>Settings</span>
              </NavLink>
            </nav>
          </div>

          {/* Bottom: User info + Logout */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #23933a, #39cf58)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 800,
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                {(adminUser?.email?.[0] || 'A').toUpperCase()}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {adminUser?.fullName}
                </div>
                <div style={{ fontSize: '10px', color: '#8ea895', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {adminUser?.email}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#fca5a5',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
                e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
                e.currentTarget.style.borderColor = 'rgba(239,68,68,0.25)';
              }}
            >
              {loggingOut ? (
                <i className="fa-solid fa-spinner fa-spin" />
              ) : (
                <i className="fa-solid fa-arrow-right-from-bracket" />
              )}
              <span>{loggingOut ? 'Signing out…' : 'Sign Out'}</span>
            </button>
          </div>
        </aside>

        {/* ── Dynamic Page Content ─────────────────────────────── */}
        <main className="admin-main">
          <Outlet />
        </main>
      </div>

      {/* ── Mobile Bottom Navigation Bar ─────────────────────── */}
      <nav className="admin-bottom-nav">
        <NavLink to="/admin" end className={({ isActive }) => `admin-bottom-tab ${isActive ? 'active' : ''}`}>
          <i className="fa-solid fa-chart-pie" />
          <span>Overview</span>
        </NavLink>
        <NavLink to="/admin/donations" className={({ isActive }) => `admin-bottom-tab ${isActive ? 'active' : ''}`}>
          <i className="fa-solid fa-hand-holding-dollar" />
          <span>Donations</span>
        </NavLink>
        <NavLink to="/admin/contacts" className={({ isActive }) => `admin-bottom-tab ${isActive ? 'active' : ''}`}>
          <i className="fa-solid fa-inbox" />
          <span>Inbox</span>
        </NavLink>
        <NavLink to="/admin/visits" className={({ isActive }) => `admin-bottom-tab ${isActive ? 'active' : ''}`}>
          <i className="fa-solid fa-chart-line" />
          <span>Traffic</span>
        </NavLink>
        <NavLink to="/admin/settings" className={({ isActive }) => `admin-bottom-tab ${isActive ? 'active' : ''}`}>
          <i className="fa-solid fa-gear" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
}

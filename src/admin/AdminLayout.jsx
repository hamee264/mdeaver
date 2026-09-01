import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './context/AdminAuthContext';
import './AdminLayout.css';

export default function AdminLayout() {
  const { adminUser, logout, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="admin-shell" style={{ justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div className="admin-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <div className="admin-header-logo" style={{ margin: '0 auto 16px', width: '48px', height: '48px', fontSize: '24px' }}>
            M
          </div>
          <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Admin Session Expired</h2>
          <p style={{ fontSize: '14px', color: 'var(--admin-text-muted)', marginBottom: '24px' }}>
            Please log in to access the Mdeaver Admin Control Center.
          </p>
          <button
            className="btn bg-green"
            style={{ width: '100%', padding: '12px' }}
            onClick={() => navigate('/admin/login')}
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      {/* Top Header */}
      <header className="admin-header">
        <Link to="/admin" className="admin-header-brand">
          <div className="admin-header-logo">M</div>
          <div>
            <div className="admin-header-title">Mdeaver Admin</div>
          </div>
          <span className="admin-header-badge">LIVE</span>
        </Link>

        <div className="admin-header-actions">
          <button
            onClick={() => navigate('/')}
            className="admin-user-pill"
            style={{ fontSize: '12px', background: 'transparent' }}
            title="View Live Website"
          >
            <i className="fa-solid fa-globe" style={{ color: 'var(--admin-emerald-bright)' }}></i>
            <span style={{ display: 'inline' }}>Public Site</span>
          </button>

          <div className="admin-user-pill" onClick={logout} title="Click to Logout">
            <img src={adminUser?.avatar} alt={adminUser?.fullName} className="admin-user-avatar" />
            <span className="admin-user-name">{adminUser?.fullName?.split(' ')[0]}</span>
            <i className="fa-solid fa-right-from-bracket" style={{ fontSize: '12px', color: 'var(--admin-text-muted)' }}></i>
          </div>
        </div>
      </header>

      {/* Main Body Grid */}
      <div className="admin-body">
        {/* Desktop Sidebar (>= 768px) */}
        <aside className="admin-sidebar">
          <nav className="admin-nav-list">
            <NavLink to="/admin" end className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
              <i className="fa-solid fa-chart-pie"></i>
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/admin/donations" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
              <i className="fa-solid fa-hand-holding-dollar"></i>
              <span>Donations</span>
            </NavLink>
            <NavLink to="/admin/contacts" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
              <i className="fa-solid fa-inbox"></i>
              <span>Messages</span>
            </NavLink>
            <NavLink to="/admin/visits" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
              <i className="fa-solid fa-chart-line"></i>
              <span>Live Traffic</span>
            </NavLink>
            <NavLink to="/admin/logs" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
              <i className="fa-solid fa-shield-halved"></i>
              <span>Audit Logs</span>
            </NavLink>
          </nav>

          <div style={{ padding: '16px 0', borderTop: '1px solid var(--admin-border-dark)' }}>
            <div style={{ fontSize: '11px', color: 'var(--admin-text-muted)' }}>
              Logged in as <strong style={{ color: '#fff' }}>{adminUser?.email}</strong>
            </div>
          </div>
        </aside>

        {/* Dynamic Page Content */}
        <main className="admin-main">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Bar (< 768px) */}
      <nav className="admin-bottom-nav">
        <NavLink to="/admin" end className={({ isActive }) => `admin-bottom-tab ${isActive ? 'active' : ''}`}>
          <i className="fa-solid fa-chart-pie"></i>
          <span>Overview</span>
        </NavLink>
        <NavLink to="/admin/donations" className={({ isActive }) => `admin-bottom-tab ${isActive ? 'active' : ''}`}>
          <i className="fa-solid fa-hand-holding-dollar"></i>
          <span>Donations</span>
        </NavLink>
        <NavLink to="/admin/contacts" className={({ isActive }) => `admin-bottom-tab ${isActive ? 'active' : ''}`}>
          <i className="fa-solid fa-inbox"></i>
          <span>Inbox</span>
        </NavLink>
        <NavLink to="/admin/visits" className={({ isActive }) => `admin-bottom-tab ${isActive ? 'active' : ''}`}>
          <i className="fa-solid fa-chart-line"></i>
          <span>Traffic</span>
        </NavLink>
        <NavLink to="/admin/logs" className={({ isActive }) => `admin-bottom-tab ${isActive ? 'active' : ''}`}>
          <i className="fa-solid fa-shield-halved"></i>
          <span>Logs</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default function AdminVisits() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px', color: '#0f172a' }}>Live Visitor Traffic</h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
          Real-time stream of site visitors, geolocation hits, and page ping telemetry.
        </p>
      </div>

      <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--admin-emerald-bright)' }}>
            <i className="fa-solid fa-signal" style={{ marginRight: '8px' }}></i> LIVE RADAR ACTIVE
          </span>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Auto-updating</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { ip: '192.168.1.45', page: '/home', browser: 'Chrome / macOS', time: 'Just now' },
            { ip: '102.89.23.11', page: '/donate', browser: 'Safari / iPhone 15', time: '2 mins ago' },
            { ip: '197.210.44.8', page: '/about', browser: 'Chrome / Android', time: '5 mins ago' },
            { ip: '172.56.21.90', page: '/contact', browser: 'Firefox / Windows 11', time: '12 mins ago' },
          ].map((v, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '10px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{v.page}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{v.ip} • {v.browser}</div>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--admin-gold)', fontWeight: 600 }}>{v.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

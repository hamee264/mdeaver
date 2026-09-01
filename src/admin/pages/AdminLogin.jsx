import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

/* ── Shared Input Style ─────────────────────────────────────────── */
const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '12px',
  background: '#182a1f',
  border: '1px solid rgba(255,255,255,0.12)',
  color: '#fff',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s ease',
};

/* ── AlertBox ───────────────────────────────────────────────────── */
function AlertBox({ type = 'error', children }) {
  const colors = {
    error: { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)', text: '#fca5a5', icon: 'fa-triangle-exclamation' },
    success: { bg: 'rgba(35,147,58,0.12)', border: 'rgba(57,207,88,0.3)', text: '#6ee7a0', icon: 'fa-circle-check' },
    info: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', text: '#93c5fd', icon: 'fa-circle-info' },
  }[type];

  return (
    <div
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        color: colors.text,
        padding: '12px 14px',
        borderRadius: '10px',
        fontSize: '13px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
      }}
    >
      <i className={`fa-solid ${colors.icon}`} style={{ marginTop: '1px', flexShrink: 0 }} />
      <span>{children}</span>
    </div>
  );
}

/* ── Login Form ─────────────────────────────────────────────────── */
function LoginForm({ onForgot }) {
  const [email, setEmail] = useState('sefngbusiness@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error);
    }
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <img
          src="/image-nav.png"
          alt="Mdeaver Charity Logo"
          style={{
            height: '60px',
            objectFit: 'contain',
            margin: '0 auto 16px',
            display: 'block',
            filter: 'drop-shadow(0 4px 16px rgba(35,147,58,0.45))',
          }}
        />
        <h1 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px', color: '#fff' }}>
          Admin Control Center
        </h1>
        <p style={{ fontSize: '13px', color: '#8ea895', marginTop: '6px' }}>
          Mdeaver Charity Foundation Portal
        </p>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#8ea895', letterSpacing: '0.6px', marginBottom: '8px' }}>
            ADMINISTRATOR EMAIL
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sefngbusiness@gmail.com"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = 'rgba(57,207,88,0.5)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#8ea895', letterSpacing: '0.6px', marginBottom: '8px' }}>
            PASSWORD
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              style={{ ...inputStyle, paddingRight: '46px' }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(57,207,88,0.5)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#8ea895',
                cursor: 'pointer',
                fontSize: '14px',
                padding: '4px',
              }}
            >
              <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-8px' }}>
          <button
            type="button"
            onClick={onForgot}
            style={{ background: 'none', border: 'none', color: '#39cf58', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '15px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #23933a, #1d7a30)',
            color: '#fff',
            fontWeight: 800,
            fontSize: '14px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 16px rgba(35,147,58,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            opacity: loading ? 0.7 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {loading ? (
            <><i className="fa-solid fa-spinner fa-spin" /> Authenticating…</>
          ) : (
            <><span>ACCESS ADMIN PORTAL</span><i className="fa-solid fa-arrow-right" /></>
          )}
        </button>
      </form>
    </>
  );
}

/* ── Forgot Password Form ───────────────────────────────────────── */
function ForgotPasswordForm({ onBack }) {
  const [email, setEmail] = useState('sefngbusiness@gmail.com');
  const [status, setStatus] = useState(null); // { type, message }
  const [loading, setLoading] = useState(false);
  const { requestPasswordReset } = useAdminAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const res = await requestPasswordReset(email);
    setLoading(false);
    if (res.success) {
      setStatus({ type: 'success', message: res.message });
    } else {
      setStatus({ type: 'error', message: res.error });
    }
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'rgba(35,147,58,0.15)',
            border: '1px solid rgba(57,207,88,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '22px',
            color: '#39cf58',
          }}
        >
          <i className="fa-solid fa-key" />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>Reset Password</h2>
        <p style={{ fontSize: '13px', color: '#8ea895' }}>
          Enter your admin email to reset the password.
        </p>
      </div>

      {status && <AlertBox type={status.type}>{status.message}</AlertBox>}

      {!status?.type || status.type !== 'success' ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#8ea895', letterSpacing: '0.6px', marginBottom: '8px' }}>
              ADMINISTRATOR EMAIL
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(57,207,88,0.5)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '15px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #23933a, #1d7a30)',
              color: '#fff',
              fontWeight: 800,
              fontSize: '14px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin" /> : <i className="fa-solid fa-rotate" />}
            <span>{loading ? 'Resetting…' : 'Reset Password'}</span>
          </button>
        </form>
      ) : null}

      <button
        onClick={onBack}
        style={{
          width: '100%',
          marginTop: '16px',
          padding: '12px',
          borderRadius: '12px',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#8ea895',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <i className="fa-solid fa-arrow-left" />
        <span>Back to Login</span>
      </button>
    </>
  );
}

/* ── Page Shell ─────────────────────────────────────────────────── */
export default function AdminLogin() {
  const [view, setView] = useState('login'); // 'login' | 'forgot'

  /* Cancel the 142px body padding-top that Navbar.css sets globally */
  useEffect(() => {
    const prev = document.body.style.paddingTop;
    document.body.style.paddingTop = '0px';
    return () => {
      document.body.style.paddingTop = prev;
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0b130e',
        backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(35,147,58,0.12) 0%, transparent 70%)',
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
          maxWidth: '420px',
          background: 'rgba(18,31,23,0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px',
          padding: '36px 28px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
        }}
      >
        {view === 'login' ? (
          <LoginForm onForgot={() => setView('forgot')} />
        ) : (
          <ForgotPasswordForm onBack={() => setView('login')} />
        )}
      </div>
    </div>
  );
}

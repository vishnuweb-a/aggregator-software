import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail, Lock, LogIn, AlertCircle, CheckCircle,
  KeyRound, Truck, ArrowLeft, RefreshCw,
} from 'lucide-react';

/* ── Branded Navbar ── */
const Navbar = () => (
  <nav style={{
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 100,
    background: 'var(--header-bg)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderBottom: '1px solid var(--header-border)',
    boxShadow: '0 10px 30px rgba(8,6,20,0.35)',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    padding: '0 2.25rem',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
      <div style={{
        width: 40, height: 40, borderRadius: 14,
        background: 'var(--accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 10px 22px rgba(59,130,246,0.35)',
      }}>
        <Truck size={18} color="#fff" strokeWidth={2.5} />
      </div>
      <span style={{
        fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.01em',
        color: 'var(--text-1)',
      }}>
        Apna Courier Service
      </span>
    </div>
  </nav>
);

// ── Modes: 'login' | 'forgot' | 'verify-otp' | 'change-password'
const Login = () => {
  const [mode, setMode]             = useState('login');
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp]               = useState('');
  const [error, setError]           = useState('');
  const [message, setMessage]       = useState('');
  const [isLoading, setIsLoading]   = useState(false);

  const { login, forgotPassword, verifyForgotOtp, changePassword } = useAuth();
  const navigate = useNavigate();

  const clearAlerts = () => { setError(''); setMessage(''); };

  /* ── Login ── */
  const handleLogin = async (e) => {
    e.preventDefault();
    clearAlerts();
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.response || err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Forgot password: send OTP ── */
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    clearAlerts();
    setIsLoading(true);
    try {
      await forgotPassword(email);
      setMessage('OTP sent to your email. Please check your inbox.');
      setMode('verify-otp');
    } catch (err) {
      setError(err.response?.data?.response || 'Failed to send OTP. Check the email address.');
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Verify OTP (forgot password) ── */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    clearAlerts();
    setIsLoading(true);
    try {
      await verifyForgotOtp(email, otp);
      setMessage('OTP verified! Now set your new password.');
      setMode('change-password');
    } catch (err) {
      setError(err.response?.data?.response || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Change password ── */
  const handleChangePassword = async (e) => {
    e.preventDefault();
    clearAlerts();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setIsLoading(true);
    try {
      await changePassword(email, newPassword);
      setMessage('Password changed successfully! You can now sign in.');
      setTimeout(() => { setMode('login'); clearAlerts(); setPassword(''); }, 2000);
    } catch (err) {
      setError(err.response?.data?.response || 'Failed to change password.');
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => { setMode('login'); clearAlerts(); setOtp(''); setNewPassword(''); setConfirmPassword(''); };

  /* ── Shared card wrapper ── */
  const renderCard = (title, subtitle, formContent) => (
    <div className="glass-card" style={{ padding: '2.5rem 2.25rem' }}>
      {/* Logo + headline */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem', gap: '0.75rem' }}>
        <div className="logo-mark">
          <Truck size={20} color="#fff" strokeWidth={2.5} />
        </div>
        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
          {title}
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', textAlign: 'center' }}>{subtitle}</p>
      </div>

      {/* Back button for sub-modes */}
      {mode !== 'login' && (
        <button onClick={goBack} className="btn-ghost" style={{ marginBottom: '1.25rem', gap: '0.4rem', padding: '0.4rem 0.8rem' }}>
          <ArrowLeft size={14} /> Back to Sign In
        </button>
      )}

      {/* Alerts */}
      {error && (
        <div className="alert alert-error">
          <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
          <span>{error}</span>
        </div>
      )}
      {message && (
        <div className="alert alert-success">
          <CheckCircle size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
          <span>{message}</span>
        </div>
      )}

      {formContent}
    </div>
  );

  /* ═════════════════════════════════════ */
  return (
    <div className="page-wrap" style={{ minHeight: '100vh', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem 3rem' }}>
      <Navbar />
      <div className="bg-mesh" />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>

        {/* ── MODE: Login ── */}
        {mode === 'login' && renderCard(
          'Welcome back',
          <><span style={{ color: 'var(--accent)', fontWeight: 600 }}>Apna Courier Service</span> — Sign in to continue</>,
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label className="field-label">Email Address</label>
              <div className="input-icon-wrap">
                <Mail className="input-icon" size={16} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="input-field" placeholder="you@example.com" required />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label className="field-label" style={{ margin: 0 }}>Password</label>
                <button type="button" onClick={() => { clearAlerts(); setMode('forgot'); }}
                  style={{ fontSize: '0.78rem', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, padding: 0 }}>
                  Forgot password?
                </button>
              </div>
              <div className="input-icon-wrap">
                <Lock className="input-icon" size={16} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  className="input-field" placeholder="••••••••" required />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary"
              style={{ width: '100%', marginTop: '0.5rem', padding: '0.88rem' }}>
              {isLoading ? (<><Spinner /> Signing in…</>) : (<>Sign In <LogIn size={16} /></>)}
            </button>

            {/* Footer links */}
            <div style={{ marginTop: '1rem', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.83rem', color: 'var(--text-2)' }}>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>
                  Create account →
                </Link>
              </span>
              <span style={{ fontSize: '0.83rem', color: 'var(--text-2)' }}>
                Need to change password?{' '}
                <button type="button" onClick={() => { clearAlerts(); setMode('forgot'); }}
                  style={{ color: 'var(--accent)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.83rem', padding: 0 }}>
                  Reset here →
                </button>
              </span>
            </div>
          </form>
        )}

        {/* ── MODE: Forgot Password (enter email) ── */}
        {mode === 'forgot' && renderCard(
          'Reset Password',
          'Enter your registered email to receive an OTP',
          <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label className="field-label">Registered Email</label>
              <div className="input-icon-wrap">
                <Mail className="input-icon" size={16} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="input-field" placeholder="you@example.com" required />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="btn-primary"
              style={{ width: '100%', padding: '0.88rem' }}>
              {isLoading ? (<><Spinner /> Sending OTP…</>) : (<><RefreshCw size={16} /> Send OTP</>)}
            </button>
          </form>
        )}

        {/* ── MODE: Verify OTP ── */}
        {mode === 'verify-otp' && renderCard(
          'Enter OTP',
          `We sent a 4-digit code to ${email}`,
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label className="field-label">OTP Code</label>
              <div className="input-icon-wrap">
                <KeyRound className="input-icon" size={16} />
                <input type="number" value={otp} onChange={e => setOtp(e.target.value)}
                  className="input-field" placeholder="0000"
                  style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.3em', fontWeight: 700 }}
                  required />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="btn-primary"
              style={{ width: '100%', padding: '0.88rem', background: '#10b981' }}>
              {isLoading ? (<><Spinner /> Verifying…</>) : (<><CheckCircle size={16} /> Verify OTP</>)}
            </button>
          </form>
        )}

        {/* ── MODE: Change Password ── */}
        {mode === 'change-password' && renderCard(
          'New Password',
          'Choose a strong password for your account',
          <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label className="field-label">New Password</label>
              <div className="input-icon-wrap">
                <Lock className="input-icon" size={16} />
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                  className="input-field" placeholder="••••••••" minLength={6} required />
              </div>
            </div>
            <div>
              <label className="field-label">Confirm Password</label>
              <div className="input-icon-wrap">
                <Lock className="input-icon" size={16} />
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                  className="input-field" placeholder="••••••••" minLength={6} required />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="btn-primary"
              style={{ width: '100%', padding: '0.88rem' }}>
              {isLoading ? (<><Spinner /> Saving…</>) : (<><CheckCircle size={16} /> Update Password</>)}
            </button>
          </form>
        )}

      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

const Spinner = () => (
  <span style={{
    width: 15, height: 15,
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff', borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.7s linear infinite',
  }} />
);

export default Login;

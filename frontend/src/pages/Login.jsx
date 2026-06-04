import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail, Lock, AlertCircle, CheckCircle,
  KeyRound, ArrowLeft, RefreshCw, ArrowRight, Eye, EyeOff
} from 'lucide-react';
import shipbiharLogo from '../assets/sb3.png';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login, forgotPassword, verifyForgotOtp, changePassword } = useAuth();
  const navigate = useNavigate();

  const clearAlerts = () => { setError(''); setMessage(''); };

  const handleLogin = async (e) => {
    e.preventDefault(); clearAlerts(); setIsLoading(true);
    try { await login(email, password); navigate('/dashboard'); }
    catch (err) { setError(err.response?.data?.response || err.response?.data?.message || 'Failed to login.'); }
    finally { setIsLoading(false); }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault(); clearAlerts(); setIsLoading(true);
    try { await forgotPassword(email); setMessage('OTP sent to your email.'); setMode('verify-otp'); }
    catch (err) { setError(err.response?.data?.response || 'Failed to send OTP.'); }
    finally { setIsLoading(false); }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault(); clearAlerts(); setIsLoading(true);
    try { await verifyForgotOtp(email, otp); setMessage('OTP verified!'); setMode('change-password'); }
    catch (err) { setError(err.response?.data?.response || 'Invalid OTP.'); }
    finally { setIsLoading(false); }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault(); clearAlerts();
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (newPassword.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setIsLoading(true);
    try { await changePassword(email, newPassword); setMessage('Password changed!'); setTimeout(() => { setMode('login'); clearAlerts(); setPassword(''); }, 2000); }
    catch (err) { setError(err.response?.data?.response || 'Failed to change password.'); }
    finally { setIsLoading(false); }
  };

  const goBack = () => { setMode('login'); clearAlerts(); setOtp(''); setNewPassword(''); setConfirmPassword(''); };

  const titles = {
    'login':           { title: 'Sign In',         sub: 'Welcome back to shipBihar' },
    'forgot':          { title: 'Reset Password',  sub: 'Enter your email to receive an OTP' },
    'verify-otp':      { title: 'Enter OTP',       sub: `Code sent to ${email}` },
    'change-password': { title: 'New Password',    sub: 'Choose a strong password' },
  };

  return (
    <div className="sb-landing">
      {/* Nav */}
      <nav className="sb-nav">
        <div className="sb-nav-inner">
          <div className="sb-nav-left" onClick={() => navigate('/')}>
            <img src={shipbiharLogo} alt="shipBihar" className="sb-nav-logo" />
          </div>
          <button className="sb-nav-signin" onClick={() => navigate('/register')}>Create Account</button>
        </div>
      </nav>

      {/* Hero with BG + floating card */}
      <section className="sb-hero">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyfsqnYrZCEDHAgjM7VcA3pIjyNIp78MPpMU-XH25PlKcL41Bj8tBcPJikGh853jvL4pKf-RQc5uVpawoNaL6-IfixxUP8sZO1qCW7kZrMota332e_9l6iLn-GtS3ULplySSws1HEw__lVYQUR84nA7f_wPl2DSUcLAN5RgSYrR2GF4kBpSfxb3MFzd15WMOY-nXEDGBvNBt2Gsz0W-OGcwQgIa5nymww2aE3wEku9itYjbzGe3JJFFwJUqbhvM1WQmeSOFJYrUdI"
          alt="Logistics background" className="sb-hero-bg"
        />
        <div className="sb-hero-overlay" />

        <div className="sb-hero-card">
          <h1 className="sb-card-title">{titles[mode].title}</h1>
          <p className="sb-card-subtitle">{titles[mode].sub}</p>

          {mode !== 'login' && (
            <button onClick={goBack} className="sb-back-btn"><ArrowLeft size={14} /> Back to Sign In</button>
          )}

          {error && <div className="sb-card-error"><AlertCircle size={14} /><span>{error}</span></div>}
          {message && <div className="sb-card-success"><CheckCircle size={14} /><span>{message}</span></div>}

          {/* ── Login ── */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="sb-card-form">
              <div className="sb-field">
                <label className="sb-label">Email or Phone Number</label>
                <div className="sb-input-wrap">
                  <Mail size={16} className="sb-input-icon" />
                  <input type="text" value={email} onChange={e => setEmail(e.target.value)}
                    className="sb-input" placeholder="you@example.com or 9876543210" required />
                </div>
              </div>
              <div className="sb-field">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="sb-label">Password</label>
                  <button type="button" onClick={() => { clearAlerts(); setMode('forgot'); }}
                    className="sb-forgot-btn">Forgot password?</button>
                </div>
                <div className="sb-input-wrap">
                  <Lock size={16} className="sb-input-icon" />
                  <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                    className="sb-input" placeholder="••••••••" required />
                  <button type="button" className="sb-input-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="sb-submit-btn">
                {isLoading ? <><Spinner /> Signing in…</> : <>Sign In <ArrowRight size={16} /></>}
              </button>
              <p className="sb-card-create">
                Don't have an account? <Link to="/register" className="sb-create-link">Create account →</Link>
              </p>
            </form>
          )}

          {/* ── Forgot ── */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="sb-card-form">
              <div className="sb-field">
                <label className="sb-label">Registered Email</label>
                <div className="sb-input-wrap">
                  <Mail size={16} className="sb-input-icon" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className="sb-input" placeholder="you@example.com" required />
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="sb-submit-btn">
                {isLoading ? <><Spinner /> Sending…</> : <><RefreshCw size={16} /> Send OTP</>}
              </button>
            </form>
          )}

          {/* ── Verify OTP ── */}
          {mode === 'verify-otp' && (
            <form onSubmit={handleVerifyOtp} className="sb-card-form">
              <div className="sb-field">
                <label className="sb-label">OTP Code</label>
                <div className="sb-input-wrap">
                  <KeyRound size={16} className="sb-input-icon" />
                  <input type="number" value={otp} onChange={e => setOtp(e.target.value)}
                    className="sb-input" placeholder="0000"
                    style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.3em', fontWeight: 700 }} required />
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="sb-submit-btn" style={{ background: '#10b981' }}>
                {isLoading ? <><Spinner /> Verifying…</> : <><CheckCircle size={16} /> Verify OTP</>}
              </button>
            </form>
          )}

          {/* ── Change Password ── */}
          {mode === 'change-password' && (
            <form onSubmit={handleChangePassword} className="sb-card-form">
              <div className="sb-field">
                <label className="sb-label">New Password</label>
                <div className="sb-input-wrap">
                  <Lock size={16} className="sb-input-icon" />
                  <input type={showNewPassword ? "text" : "password"} value={newPassword} onChange={e => setNewPassword(e.target.value)}
                    className="sb-input" placeholder="••••••••" minLength={6} required />
                  <button type="button" className="sb-input-toggle" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="sb-field">
                <label className="sb-label">Confirm Password</label>
                <div className="sb-input-wrap">
                  <Lock size={16} className="sb-input-icon" />
                  <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                    className="sb-input" placeholder="••••••••" minLength={6} required />
                  <button type="button" className="sb-input-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="sb-submit-btn">
                {isLoading ? <><Spinner /> Saving…</> : <><CheckCircle size={16} /> Update Password</>}
              </button>
            </form>
          )}
        </div>
      </section>



      <style>{`
        .sb-landing { min-height:100vh; display:flex; flex-direction:column; font-family:'Work Sans',system-ui,sans-serif; -webkit-font-smoothing:antialiased; background:transparent; color:#191c1d; }
        .sb-saffron { color:#f47a20; }

        .sb-nav { position:sticky; top:0; z-index:100; background:rgba(248, 249, 250, 0.75); backdrop-filter:blur(12px); border-bottom:1px solid rgba(222, 193, 177, 0.4); }
        .sb-nav-inner { max-width:1280px; margin:0 auto; padding:0 32px; height:64px; display:flex; align-items:center; justify-content:space-between; }
        .sb-nav-left { display:flex; align-items:center; gap:8px; cursor:pointer; }
        .sb-nav-logo { width:200px; height:50px; border-radius:6px; object-fit:cover; margin-top:12px; }
        .sb-nav-logo-icon { width:36px; height:36px; background:#9a4600; border-radius:6px; display:flex; align-items:center; justify-content:center; }
        .sb-nav-logo-text { font-size:20px; font-weight:800; color:#191c1d; letter-spacing:-0.02em; }
        .sb-nav-signin { background:#f47a20; color:#fff; border:none; padding:10px 24px; border-radius:4px; font-size:14px; font-weight:600; cursor:pointer; font-family:inherit; transition:all 0.2s; }
        .sb-nav-signin:hover { background:#9a4600; }

        .sb-hero { position:relative; flex:1; min-height:calc(100vh - 64px - 72px); display:flex; align-items:center; overflow:hidden; }
        .sb-hero-bg { position:fixed; inset:0; width:100%; height:100%; object-fit:fill; object-position:center; z-index:-2; filter:brightness(1.25) contrast(1.05); }
        .sb-hero-overlay { position:fixed; inset:0; background:linear-gradient(90deg,rgba(25,28,29,0.65) 0%,rgba(25,28,29,0.35) 50%,rgba(25,28,29,0.1) 100%); z-index:-1; }

        .sb-hero-card { position:relative; z-index:2; margin-left:clamp(32px,5vw,80px); width:100%; max-width:420px; background:rgba(255,255,255,0.97); border:1px solid #dec1b1; border-radius:8px; padding:36px 32px 28px; box-shadow:0 8px 32px rgba(87,66,55,0.12),0 2px 8px rgba(87,66,55,0.06); }
        .sb-card-title { font-size:26px; font-weight:800; color:#191c1d; letter-spacing:-0.01em; margin-bottom:6px; }
        .sb-card-subtitle { font-size:14px; line-height:1.5; color:#574237; margin-bottom:24px; }

        .sb-back-btn { display:inline-flex; align-items:center; gap:6px; background:rgba(27,42,78,0.06); border:1px solid rgba(27,42,78,0.15); color:#1b2a4e; font-size:13px; font-weight:600; padding:6px 14px; border-radius:4px; cursor:pointer; margin-bottom:16px; font-family:inherit; transition:all 0.2s; }
        .sb-back-btn:hover { border-color:#f47a20; color:#9a4600; }

        .sb-card-error { display:flex; align-items:center; gap:8px; background:rgba(186,26,26,0.08); border:1px solid rgba(186,26,26,0.2); color:#ba1a1a; padding:10px 14px; border-radius:4px; font-size:13px; margin-bottom:16px; }
        .sb-card-success { display:flex; align-items:center; gap:8px; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.2); color:#059669; padding:10px 14px; border-radius:4px; font-size:13px; margin-bottom:16px; }

        .sb-card-form { display:flex; flex-direction:column; gap:16px; }
        .sb-field { display:flex; flex-direction:column; gap:6px; }
        .sb-label { font-size:13px; font-weight:600; color:#191c1d; }
        .sb-input-wrap { position:relative; }
        .sb-input-icon { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:#8b7265; pointer-events:none; }
        .sb-input-toggle { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; color:#8b7265; cursor:pointer; padding:0; display:flex; align-items:center; justify-content:center; }
        .sb-input-toggle:hover { color:#f47a20; }
        .sb-input { width:100%; height:44px; padding:0 40px 0 40px; border:1px solid #dec1b1; border-radius:4px; font-size:14px; font-family:inherit; color:#191c1d; background:#fff; outline:none; transition:border-color 0.2s,box-shadow 0.2s; }
        .sb-input:focus { border-color:#f47a20; box-shadow:0 0 0 2px rgba(244,122,32,0.2); }
        .sb-input::placeholder { color:#8b7265; opacity:0.6; }

        .sb-forgot-btn { font-size:12px; color:#f47a20; font-weight:600; background:none; border:none; cursor:pointer; padding:0; font-family:inherit; }
        .sb-forgot-btn:hover { opacity:0.75; }

        .sb-submit-btn { display:flex; align-items:center; justify-content:center; gap:8px; width:100%; height:48px; background:#f47a20; color:#fff; border:none; border-radius:4px; font-size:15px; font-weight:700; font-family:inherit; cursor:pointer; transition:all 0.2s; margin-top:4px; }
        .sb-submit-btn:hover:not(:disabled) { background:#9a4600; }
        .sb-submit-btn:disabled { opacity:0.6; cursor:not-allowed; }

        .sb-card-create { text-align:center; font-size:14px; color:#574237; margin-top:8px; }
        .sb-create-link { color:#f47a20; font-weight:700; text-decoration:none; }
        .sb-create-link:hover { text-decoration:underline; }



        @media (max-width:768px) {
          .sb-nav-inner { padding:0 16px; }
          .sb-nav-logo { width:140px; height:35px; margin-top:8px; }
          .sb-hero-overlay { background:linear-gradient(180deg,rgba(255,255,255,0.95) 0%,rgba(255,255,255,0.8) 60%,rgba(255,255,255,0.3) 100%); }
          .sb-hero-card { margin:0 16px; max-width:none; }
          .sb-hero { align-items:flex-start; padding-top:24px; }
          .sb-footer-inner { flex-direction:column; gap:16px; text-align:center; }
          .sb-footer-right { flex-wrap:wrap; justify-content:center; gap:16px; }
        }
        @keyframes sb-spin { to { transform:rotate(360deg); } }
      `}</style>
    </div>
  );
};

const Spinner = () => (
  <span style={{ width:15, height:15, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', display:'inline-block', animation:'sb-spin 0.7s linear infinite' }} />
);

export default Login;

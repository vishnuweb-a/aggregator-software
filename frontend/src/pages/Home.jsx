import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ArrowRight, Mail, Lock, AlertCircle,
} from 'lucide-react';
import shipbiharLogo from '../assets/logo_ship_bihar.jpeg';
const Home = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.response ||
        err.response?.data?.message ||
        'Invalid credentials'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sb-landing">

      {/* ═══ Top Nav Bar ═══ */}
      <nav className="sb-nav">
        <div className="sb-nav-inner">
          <div className="sb-nav-left" onClick={() => navigate('/')}>
            <img src={shipbiharLogo} alt="shipBihar" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} />
            <span className="sb-nav-logo-text">
              ship<span className="sb-saffron">Bihar</span>
            </span>
          </div>

          <div className="sb-nav-center">
            <a href="#tracking" className="sb-nav-link">Tracking</a>
            <a href="#network" className="sb-nav-link">Network</a>
            <a href="#services" className="sb-nav-link">Services</a>
            <a href="#about" className="sb-nav-link">About Us</a>
          </div>

          <button className="sb-nav-signin" onClick={() => navigate('/login')}>
            Sign In
          </button>
        </div>
      </nav>

      {/* ═══ Hero — Full-bleed background + floating sign-in card ═══ */}
      <section className="sb-hero">
        {/* Background image */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyfsqnYrZCEDHAgjM7VcA3pIjyNIp78MPpMU-XH25PlKcL41Bj8tBcPJikGh853jvL4pKf-RQc5uVpawoNaL6-IfixxUP8sZO1qCW7kZrMota332e_9l6iLn-GtS3ULplySSws1HEw__lVYQUR84nA7f_wPl2DSUcLAN5RgSYrR2GF4kBpSfxb3MFzd15WMOY-nXEDGBvNBt2Gsz0W-OGcwQgIa5nymww2aE3wEku9itYjbzGe3JJFFwJUqbhvM1WQmeSOFJYrUdI"
          alt="Logistics background"
          className="sb-hero-bg"
        />
        {/* Gradient overlay */}
        <div className="sb-hero-overlay" />

        {/* Floating sign-in card */}
        <div className="sb-hero-card">
          <h1 className="sb-card-title">Welcome to shipBihar</h1>
          <p className="sb-card-subtitle">
            Your trusted partner in multi-modal
            <br />
            logistics — connecting Bihar by road and air.
          </p>

          {error && (
            <div className="sb-card-error">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="sb-card-form">
            {/* Email */}
            <div className="sb-field">
              <label className="sb-label">Email or Phone</label>
              <div className="sb-input-wrap">
                <Mail size={16} className="sb-input-icon" />
                <input
                  type="email"
                  className="sb-input"
                  placeholder="Enter your credentials"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="sb-field">
              <label className="sb-label">Password</label>
              <div className="sb-input-wrap">
                <Lock size={16} className="sb-input-icon" />
                <input
                  type="password"
                  className="sb-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="sb-options-row">
              <label className="sb-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <Link to="/login" className="sb-forgot">Forgot password?</Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="sb-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <><Spinner /> Signing in…</>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* Create account link */}
          <p className="sb-card-create">
            New to shipBihar?{' '}
            <Link to="/register" className="sb-create-link">
              Create an account
            </Link>
          </p>

          {/* Legal links */}
          <div className="sb-card-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#support">Support</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </section>



      {/* ═══ Styles — pixel-perfect Stitch replica ═══ */}
      <style>{`
        /* ── Reset ── */
        .sb-landing {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'Work Sans', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          background: transparent;
          color: #191c1d;
        }

        .sb-saffron { color: #f47a20; }

        /* ══════════════════════════════════
           NAV BAR
        ══════════════════════════════════ */
        .sb-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(248, 249, 250, 0.75);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(222, 193, 177, 0.4);
        }

        .sb-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sb-nav-left {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .sb-nav-logo-icon {
          width: 36px;
          height: 36px;
          background: #9a4600;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sb-nav-logo-text {
          font-size: 20px;
          font-weight: 800;
          color: #191c1d;
          letter-spacing: -0.02em;
        }

        .sb-nav-center {
          display: flex;
          gap: 32px;
        }

        .sb-nav-link {
          font-size: 14px;
          font-weight: 500;
          color: #574237;
          text-decoration: none;
          transition: color 0.2s;
        }

        .sb-nav-link:hover { color: #f47a20; }

        .sb-nav-signin {
          background: #f47a20;
          color: #fff;
          border: none;
          padding: 10px 24px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
        }

        .sb-nav-signin:hover {
          background: #9a4600;
        }

        /* ══════════════════════════════════
           HERO — full bleed bg + floating card
        ══════════════════════════════════ */
        .sb-hero {
          position: relative;
          flex: 1;
          min-height: calc(100vh - 64px - 80px);
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .sb-hero-bg {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: -2;
          filter: brightness(1.25) contrast(1.05);
        }

        .sb-hero-overlay {
          position: fixed;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(25, 28, 29, 0.65) 0%,
            rgba(25, 28, 29, 0.35) 50%,
            rgba(25, 28, 29, 0.1) 100%
          );
          z-index: -1;
        }

        /* ── Floating sign-in card ── */
        .sb-hero-card {
          position: relative;
          z-index: 2;
          margin-left: clamp(32px, 5vw, 80px);
          width: 100%;
          max-width: 400px;
          background: rgba(255, 255, 255, 0.97);
          border: 1px solid #dec1b1;
          border-radius: 8px;
          padding: 36px 32px 28px;
          box-shadow:
            0 8px 32px rgba(87, 66, 55, 0.12),
            0 2px 8px rgba(87, 66, 55, 0.06);
        }

        .sb-card-title {
          font-size: 26px;
          font-weight: 800;
          color: #191c1d;
          letter-spacing: -0.01em;
          margin-bottom: 6px;
        }

        .sb-card-subtitle {
          font-size: 14px;
          line-height: 1.5;
          color: #574237;
          margin-bottom: 24px;
        }

        .sb-card-error {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(186, 26, 26, 0.08);
          border: 1px solid rgba(186, 26, 26, 0.2);
          color: #ba1a1a;
          padding: 10px 14px;
          border-radius: 4px;
          font-size: 13px;
          margin-bottom: 16px;
        }

        .sb-card-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sb-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .sb-label {
          font-size: 13px;
          font-weight: 600;
          color: #191c1d;
        }

        .sb-input-wrap {
          position: relative;
        }

        .sb-input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #8b7265;
          pointer-events: none;
        }

        .sb-input {
          width: 100%;
          height: 44px;
          padding: 0 14px 0 40px;
          border: 1px solid #dec1b1;
          border-radius: 4px;
          font-size: 14px;
          font-family: inherit;
          color: #191c1d;
          background: #fff;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .sb-input:focus {
          border-color: #f47a20;
          box-shadow: 0 0 0 2px rgba(244, 122, 32, 0.2);
        }

        .sb-input::placeholder {
          color: #8b7265;
          opacity: 0.6;
        }

        /* Remember + Forgot row */
        .sb-options-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: -4px;
        }

        .sb-remember {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #574237;
          cursor: pointer;
        }

        .sb-remember input[type="checkbox"] {
          width: 16px;
          height: 16px;
          accent-color: #f47a20;
          cursor: pointer;
          border-radius: 3px;
        }

        .sb-forgot {
          font-size: 13px;
          color: #f47a20;
          font-weight: 600;
          text-decoration: none;
        }

        .sb-forgot:hover { opacity: 0.75; }

        /* Submit button */
        .sb-submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          height: 48px;
          background: #f47a20;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 15px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 4px;
        }

        .sb-submit-btn:hover:not(:disabled) {
          background: #9a4600;
        }

        .sb-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Create account */
        .sb-card-create {
          text-align: center;
          font-size: 14px;
          color: #574237;
          margin-top: 24px;
        }

        .sb-create-link {
          color: #f47a20;
          font-weight: 700;
          text-decoration: none;
        }

        .sb-create-link:hover { text-decoration: underline; }

        /* Legal */
        .sb-card-legal {
          display: flex;
          gap: 16px;
          justify-content: flex-start;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #e7e8e9;
        }

        .sb-card-legal a {
          font-size: 12px;
          color: #8b7265;
          text-decoration: none;
        }

        .sb-card-legal a:hover { color: #f47a20; }

        /* ══════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════ */
        @media (max-width: 768px) {
          .sb-nav-center { display: none; }

          .sb-hero {
            align-items: flex-start;
            padding-top: 24px;
          }

          .sb-hero-overlay {
            background: linear-gradient(
              180deg,
              rgba(255,255,255,0.95) 0%,
              rgba(255,255,255,0.8) 60%,
              rgba(255,255,255,0.3) 100%
            );
          }

          .sb-hero-card {
            margin: 0 16px;
            max-width: none;
          }

          .sb-footer-inner {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }

          .sb-footer-right {
            flex-wrap: wrap;
            justify-content: center;
            gap: 16px;
          }
        }

        /* ── Spinner ── */
        @keyframes sb-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

const Spinner = () => (
  <span style={{
    width: 15,
    height: 15,
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'sb-spin 0.7s linear infinite',
  }} />
);

export default Home;

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  User, Mail, Lock, Phone, Package, KeyRound,
  CheckCircle, AlertCircle, Truck,
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

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phoneNumber: '',
  });
  const [otpSent, setOtpSent]     = useState(false);
  const [otp, setOtp]             = useState('');
  const [error, setError]         = useState('');
  const [message, setMessage]     = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, validateOtp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);
    try {
      await register({ ...formData, phoneNumber: Number(formData.phoneNumber) });
      setOtpSent(true);
      setMessage('OTP has been sent to your email. Please verify.');
    } catch (err) {
      setError(err.response?.data?.response || err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await validateOtp(formData.email, Number(otp));
      setMessage('Registration successful! Redirecting to your dashboard…');
      // Redirect to home (dashboard) — user is now auto-logged in via AuthContext
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.response || 'OTP validation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { name: 'name',        type: 'text',     icon: User,  placeholder: 'John Doe',        label: 'Full Name'     },
    { name: 'email',       type: 'email',    icon: Mail,  placeholder: 'john@example.com', label: 'Email Address' },
    { name: 'password',    type: 'password', icon: Lock,  placeholder: '••••••••',         label: 'Password'      },
    { name: 'phoneNumber', type: 'tel',      icon: Phone, placeholder: '9876543210',        label: 'Phone Number'  },
  ];

  return (
    <div className="page-wrap" style={{ minHeight: '100vh', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem 3rem' }}>
      <Navbar />
      <div className="bg-mesh" />

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
        <div className="glass-card" style={{ padding: '2.5rem 2.25rem' }}>

          {/* Logo + headline */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem', gap: '0.75rem' }}>
            <div className="logo-mark">
              <Package size={22} color="#fff" strokeWidth={2.5} />
            </div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
              {otpSent ? 'Verify your email' : 'Create account'}
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', textAlign: 'center' }}>
              {otpSent
                ? 'Enter the 4-digit code sent to your inbox'
                : <><span style={{ color: 'var(--accent)', fontWeight: 600 }}>Apna Courier Service</span> — Ship anywhere, anytime</>
              }
            </p>
          </div>

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

          {/* ── Registration form ── */}
          {!otpSent ? (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {fields.map(({ name, type, icon: Icon, placeholder, label }) => (
                <div key={name}>
                  <label className="field-label">{label}</label>
                  <div className="input-icon-wrap">
                    <Icon className="input-icon" size={16} />
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="input-field"
                      placeholder={placeholder}
                      required
                    />
                  </div>
                </div>
              ))}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
                style={{ width: '100%', marginTop: '0.5rem', padding: '0.88rem' }}
              >
                {isLoading ? (<><Spinner /> Processing…</>) : 'Create Account'}
              </button>
            </form>
          ) : (
            /* ── OTP form ── */
            <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label className="field-label">4-Digit OTP Code</label>
                <div className="input-icon-wrap">
                  <KeyRound className="input-icon" size={16} />
                  <input
                    type="number"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="input-field"
                    placeholder="0000"
                    style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.3em', fontWeight: 700 }}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
                style={{
                  width: '100%', padding: '0.88rem',
                  background: '#10b981',
                  boxShadow: '0 4px 20px var(--green-glow)',
                }}
              >
                {isLoading ? (<><Spinner /> Verifying…</>) : (<><CheckCircle size={16} /> Verify & Go to Dashboard</>)}
              </button>
            </form>
          )}

          {/* Footer */}
          <div style={{ marginTop: '1.75rem', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
            <span style={{ fontSize: '0.83rem', color: 'var(--text-2)' }}>
              Already have an account?{' '}
              <Link
                to="/login"
                style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}
                onMouseOver={e => e.target.style.opacity = '0.75'}
                onMouseOut={e => e.target.style.opacity = '1'}
              >
                Sign in →
              </Link>
            </span>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

const Spinner = () => (
  <span style={{
    width: 15, height: 15,
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.7s linear infinite',
  }} />
);

export default Register;

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  User, Mail, Lock, Phone, KeyRound,
  CheckCircle, AlertCircle, Truck, ArrowRight,
} from 'lucide-react';
import shipbiharLogo from '../assets/logo_ship_bihar.jpeg';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phoneNumber: '',
  });
  const [error, setError]         = useState('');
  const [message, setMessage]     = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault(); setError(''); setMessage(''); setIsLoading(true);
    try {
      await register({ ...formData, phoneNumber: Number(formData.phoneNumber) });
      setMessage('Registration successful! Redirecting…');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.response?.data?.response || err.response?.data?.message || 'Registration failed');
    } finally { setIsLoading(false); }
  };

  const fields = [
    { name: 'name',        type: 'text',     icon: User,  placeholder: 'John Doe',        label: 'Full Name'     },
    { name: 'email',       type: 'email',    icon: Mail,  placeholder: 'john@example.com', label: 'Email Address' },
    { name: 'password',    type: 'password', icon: Lock,  placeholder: '••••••••',         label: 'Password'      },
    { name: 'phoneNumber', type: 'tel',      icon: Phone, placeholder: '9876543210',        label: 'Phone Number'  },
  ];

  return (
    <div className="sb-landing">
      {/* Nav */}
      <nav className="sb-nav">
        <div className="sb-nav-inner">
          <div className="sb-nav-left" onClick={() => navigate('/')}>
            <img src={shipbiharLogo} alt="shipBihar" className="sb-nav-logo" />
          </div>
          <button className="sb-nav-signin" onClick={() => navigate('/login')}>Sign In</button>
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
          <h1 className="sb-card-title">Create account</h1>
          <p className="sb-card-subtitle">
            Join shipBihar — Ship anywhere, anytime
          </p>

          {error && <div className="sb-card-error"><AlertCircle size={14} /><span>{error}</span></div>}
          {message && <div className="sb-card-success"><CheckCircle size={14} /><span>{message}</span></div>}

          {/* Registration form */}
          <form onSubmit={handleRegisterSubmit} className="sb-card-form">
            {fields.map(({ name, type, icon: Icon, placeholder, label }) => (
              <div key={name} className="sb-field">
                <label className="sb-label">{label}</label>
                <div className="sb-input-wrap">
                  <Icon size={16} className="sb-input-icon" />
                  <input
                    type={type} name={name} value={formData[name]}
                    onChange={handleChange} className="sb-input"
                    placeholder={placeholder} required
                  />
                </div>
              </div>
            ))}
            <button type="submit" disabled={isLoading} className="sb-submit-btn">
              {isLoading ? <><Spinner /> Processing…</> : <>Create Account <ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="sb-card-create">
            Already have an account? <Link to="/login" className="sb-create-link">Sign in →</Link>
          </p>
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

        .sb-card-error { display:flex; align-items:center; gap:8px; background:rgba(186,26,26,0.08); border:1px solid rgba(186,26,26,0.2); color:#ba1a1a; padding:10px 14px; border-radius:4px; font-size:13px; margin-bottom:16px; }
        .sb-card-success { display:flex; align-items:center; gap:8px; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.2); color:#059669; padding:10px 14px; border-radius:4px; font-size:13px; margin-bottom:16px; }

        .sb-card-form { display:flex; flex-direction:column; gap:14px; }
        .sb-field { display:flex; flex-direction:column; gap:6px; }
        .sb-label { font-size:13px; font-weight:600; color:#191c1d; }
        .sb-input-wrap { position:relative; }
        .sb-input-icon { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:#8b7265; pointer-events:none; }
        .sb-input { width:100%; height:44px; padding:0 14px 0 40px; border:1px solid #dec1b1; border-radius:4px; font-size:14px; font-family:inherit; color:#191c1d; background:#fff; outline:none; transition:border-color 0.2s,box-shadow 0.2s; }
        .sb-input:focus { border-color:#f47a20; box-shadow:0 0 0 2px rgba(244,122,32,0.2); }
        .sb-input::placeholder { color:#8b7265; opacity:0.6; }

        .sb-submit-btn { display:flex; align-items:center; justify-content:center; gap:8px; width:100%; height:48px; background:#f47a20; color:#fff; border:none; border-radius:4px; font-size:15px; font-weight:700; font-family:inherit; cursor:pointer; transition:all 0.2s; margin-top:4px; }
        .sb-submit-btn:hover:not(:disabled) { background:#9a4600; }
        .sb-submit-btn:disabled { opacity:0.6; cursor:not-allowed; }

        .sb-card-create { text-align:center; font-size:14px; color:#574237; margin-top:20px; }
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

export default Register;

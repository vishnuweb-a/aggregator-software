import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import shipbiharLogo from '../assets/sb3.png';

// Reusing styles from Network page with a new prefix "sv-"
const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="sv-page">
      {/* Nav Bar */}
      <nav className="sv-nav">
        <div className="sv-nav-inner">
          <div className="sv-nav-left" onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}>
            <img src={shipbiharLogo} alt="shipBihar" className="sv-nav-logo" />
          </div>
          <div className="sv-nav-center">
            <Link to="/" className="sv-nav-link">Home</Link>
            <Link to="/tracking" className="sv-nav-link">Tracking</Link>
            <Link to="/network" className="sv-nav-link">Network</Link>
            <Link to="/services" className="sv-nav-link sv-nav-link--active">Services</Link>
            <Link to="/about" className="sv-nav-link">About Us</Link>
          </div>
          <button className="sv-nav-signin" onClick={() => navigate('/login')}>Sign In</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="sv-hero">
        <div className="sv-hero-inner">
          <div className="sv-hero-text">
            <h1 className="sv-hero-title">Our Services – <span className="sv-saffron">Tailored for Bihar</span></h1>
            <p className="sv-hero-desc">
              From doorstep pickup to last‑mile delivery, we partner with the best to give you a seamless, cost‑effective logistics experience.
            </p>
            <div className="sv-hero-actions">
              <button className="sv-btn-primary" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>Explore Features <ArrowRight size={16} /></button>
              <button className="sv-btn-outline" onClick={() => navigate('/contact')}>Contact Sales</button>
            </div>
          </div>
          <div className="sv-hero-image-wrap">
            <img src="/parcelx_images/image_27.png" alt="Warehouse with pallets and workers" className="sv-hero-image" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="sv-features" id="features">
        <div className="sv-section-header">
          <span className="sv-section-tag">WHAT WE OFFER</span>
          <h2 className="sv-section-title">Comprehensive Logistics Solutions</h2>
          <div className="sv-section-line" />
        </div>
        <div className="sv-features-grid">
          <div className="sv-feature-card">
            <span className="material-symbols-outlined sv-feature-icon">local_shipping</span>
            <h3 className="sv-feature-title">Doorstep Pickup</h3>
            <p className="sv-feature-desc">Our fleet collects parcels directly from your business or home, ensuring no hassle.</p>
          </div>
          <div className="sv-feature-card">
            <span className="material-symbols-outlined sv-feature-icon">airport_shuttle</span>
            <h3 className="sv-feature-title">Air Freight</h3>
            <p className="sv-feature-desc">Fast, secure air transport for high‑value and time‑sensitive shipments.</p>
          </div>
          <div className="sv-feature-card">
            <span className="material-symbols-outlined sv-feature-icon">inventory_2</span>
            <h3 className="sv-feature-title">Warehouse Storage</h3>
            <p className="sv-feature-desc">Climate‑controlled storage facilities across Bihar for inventory management.</p>
          </div>
          <div className="sv-feature-card">
            <span className="material-symbols-outlined sv-feature-icon">track_changes</span>
            <h3 className="sv-feature-title">Real‑Time Tracking</h3>
            <p className="sv-feature-desc">Unified dashboard to monitor every parcel across partners.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="sv-footer">
        <div className="sv-footer-grid">
          <div>
            <div className="sv-footer-brand">shipBihar</div>
            <p className="sv-footer-copy">© 2024 shipBihar Logistics. Empowering Bihar's commerce.</p>
          </div>
          <div>
            <h4 className="sv-footer-heading">Company</h4>
            <ul className="sv-footer-list">
              <li><a href="/about">About Us</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="sv-footer-heading">Legal</h4>
            <ul className="sv-footer-list">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="sv-footer-heading">Support</h4>
            <ul className="sv-footer-list">
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Styles – based on Network page but scoped with .sv- prefix */}
      <style>{`
        .sv-page { min-height: 100vh; font-family: 'Work Sans', system-ui, sans-serif; background: #fff7ed; color: #191c1d; }
        .sv-nav { position: sticky; top: 0; background: #fff; border-bottom: 1px solid #dec1b1; z-index: 100; }
        .sv-nav-inner { max-width: 1280px; margin: 0 auto; padding: 0 32px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
        .sv-nav-left { display: flex; align-items: center; cursor: pointer; }
        .sv-nav-logo { width: 200px; height: 50px; object-fit: cover; border-radius: 6px; margin-top: 12px; }
        .sv-nav-center { display: flex; gap: 32px; }
        .sv-nav-link { font-size: 16px; font-weight: 400; color: #4f5d85; text-decoration: none; padding-bottom: 4px; transition: color 0.2s; }
        .sv-nav-link:hover { color: #9a4600; }
        .sv-nav-link--active { color: #9a4600 !important; font-weight: 700; border-bottom: 2px solid #9a4600; }
        .sv-nav-signin { background: #9a4600; color: #fff; border: none; padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .sv-nav-signin:hover { background: #753400; transform: translateY(-1px); }
        .sv-hero { position: relative; overflow: hidden; background: #fff; border-bottom: 1px solid #dec1b1; }
        .sv-hero-inner { max-width: 1280px; margin: 0 auto; padding: 80px 32px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .sv-hero-title { font-size: 40px; font-weight: 700; margin-bottom: 24px; }
        .sv-saffron { color: #9a4600; }
        .sv-hero-desc { font-size: 18px; color: #574237; margin-bottom: 48px; max-width: 560px; }
        .sv-hero-actions { display: flex; gap: 24px; }
        .sv-btn-primary { background: #f47a20; color: #582500; border: none; border-bottom: 4px solid #9a4600; padding: 12px 32px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .sv-btn-primary:hover { background: #e06e18; transform: translateY(1px); }
        .sv-btn-outline { background: transparent; color: #4f5d85; border: 1px solid #4f5d85; padding: 12px 32px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; }
        .sv-btn-outline:hover { background: #f3f4f5; border-color: #9a4600; color: #9a4600; }
        .sv-hero-image-wrap { position: relative; height: 400px; border-radius: 12px; overflow: hidden; border: 1px solid #8b7265; box-shadow: 2px 2px 0px #f47a20; }
        .sv-hero-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
        .sv-hero-image-wrap:hover .sv-hero-image { transform: scale(1.04); }
        .sv-features { padding: 80px 32px; max-width: 1280px; margin: 0 auto; }
        .sv-section-header { text-align: center; margin-bottom: 48px; }
        .sv-section-tag { color: #9a4600; font-size: 14px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; }
        .sv-section-title { font-size: 32px; font-weight: 700; color: #191c1d; margin-top: 4px; }
        .sv-section-line { width: 96px; height: 4px; background: #9a4600; margin: 12px auto 0; border-radius: 2px; }
        .sv-features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .sv-feature-card { background: #fff; padding: 24px; border: 1px solid #dec1b1; border-radius: 16px; text-align: center; }
        .sv-feature-icon { font-size: 36px; color: #9a4600; margin-bottom: 12px; }
        .sv-feature-title { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
        .sv-feature-desc { font-size: 16px; color: #574237; }
        .sv-footer { background: #e7e8e9; border-top: 1px solid #dec1b1; padding: 48px 32px; }
        .sv-footer-grid { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 24px; }
        .sv-footer-brand { font-size: 24px; font-weight: 600; color: #574237; margin-bottom: 12px; }
        .sv-footer-copy { font-size: 12px; color: #4a5980; opacity: 0.9; }
        .sv-footer-heading { font-size: 14px; font-weight: 600; }
        .sv-footer-list { list-style: none; padding: 0; margin: 0; }
        .sv-footer-list li { margin-bottom: 4px; }
        .sv-footer-list a { font-size: 13px; color: #4f5d85; text-decoration: none; }
        .sv-footer-list a:hover { color: #9a4600; }

        @media (max-width: 768px) {
          .sv-nav-inner { padding: 0 16px; }
          .sv-nav-logo { width: 140px; height: 35px; margin-top: 8px; }
          .sv-nav-center { display: none; }
          .sv-hero-inner { grid-template-columns: 1fr; padding: 48px 16px; }
          .sv-features-grid { grid-template-columns: 1fr; }
          .sv-footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .sv-footer-grid { grid-template-columns: 1fr; }
          .sv-hero-title { font-size: 28px; }
          .sv-hero-actions { flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

export default Services;

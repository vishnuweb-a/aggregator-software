import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import shipbiharLogo from '../assets/sb3.png';

/* ── Partner data ── */
const partners = [
  { name: 'DTDC',         icon: 'flight_takeoff', desc: 'Global air-express connectivity with premium tracking.' },
  { name: 'Delhivery',    icon: 'inventory_2', desc: 'Advanced e-commerce fulfillment and tech-driven logistics.' },
  { name: 'Blue Dart',    icon: 'rocket_launch', desc: 'Gold standard for high-priority express deliveries.' },
  { name: 'Ecom Express', icon: 'shopping_cart', desc: 'Specialized handles for e-commerce B2C shipping across India.' },
  { name: 'Xpressbees',   icon: 'fast_forward', desc: 'Speedy and scalable logistics for high-volume traders.' },
  { name: 'Shadowfax',    icon: 'near_me', desc: 'Efficient hyperlocal and last-mile delivery solutions.' },
  { name: 'India Post',   icon: 'mail', desc: "Unmatched rural reach into the heart of Bihar's villages." },
  { name: 'Ekart',        icon: 'box', desc: 'Heavy-duty logistics for major marketplaces and bulky items.' },
];

/* ── Advantage steps ── */
const steps = [
  { icon: 'hail', title: 'Local Pickup',       desc: 'Our agents collect from your doorstep across Bihar.' },
  { icon: 'hub', title: 'shipBihar Hub',       desc: 'Centralized sorting using AI-driven route optimization.' },
  { icon: 'handshake', title: 'Strategic Partners',  desc: 'Handover to the best-fit national partner for transit.' },
  { icon: 'local_shipping', title: 'Last Mile',           desc: 'Guaranteed delivery to 100% of Bihar\'s pincodes.' },
];

/* ── Features ── */
const features = [
  {
    icon: 'map',
    title: '100% District Coverage',
    desc: "By partnering with India Post and local transport networks, we ensure no corner of Bihar is left behind. From rural homesteads to urban centers, we reach everywhere.",
  },
  {
    icon: 'bolt',
    title: 'Reduced Transit Times',
    desc: 'Our intelligent routing engine chooses the fastest partner based on real-time data, cutting delivery times by up to 30% compared to traditional regional couriers.',
  },
  {
    icon: 'sync_alt',
    title: 'Real-Time Sync',
    desc: 'Deep API integrations with our partners mean you get a unified tracking experience. One dashboard, multiple carriers, total visibility.',
  },
];

const Network = () => {
  const navigate = useNavigate();

  return (
    <div className="nw-page">

      {/* ═══ Nav Bar ═══ */}
      <nav className="nw-nav">
        <div className="nw-nav-inner">
          <div className="nw-nav-left" onClick={() => navigate('/')}>
            <img src={shipbiharLogo} alt="shipBihar" className="nw-nav-logo" />
          </div>

          <div className="nw-nav-center">
            <Link to="/" className="nw-nav-link">Home</Link>
            <Link to="/tracking" className="nw-nav-link">Tracking</Link>
            <Link to="/network" className="nw-nav-link nw-nav-link--active">Network</Link>
            <Link to="/services" className="nw-nav-link">Services</Link>
            <Link to="/about" className="nw-nav-link">About Us</Link>
          </div>

          <button className="nw-nav-signin" onClick={() => navigate('/login')}>
            Sign In
          </button>
        </div>
      </nav>

      {/* ═══ Hero Section ═══ */}
      <section className="nw-hero">
        <div className="nw-hero-hatch" />
        <div className="nw-hero-inner">
          <div className="nw-hero-text">
            <h1 className="nw-hero-title">
              Our Robust Network —{' '}
              <span className="nw-saffron">Connecting Bihar to the World</span>
            </h1>
            <p className="nw-hero-desc">
              shipBihar leverages strategic multi-modal partnerships to ensure your parcels move seamlessly from the narrow lanes of Madhubani to the bustling hubs of global commerce. We bridge the gap between local reliability and international reach.
            </p>
            <div className="nw-hero-actions">
              <button className="nw-btn-primary" onClick={() => document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Partners <ArrowRight size={16} />
              </button>
              <button className="nw-btn-outline" onClick={() => document.getElementById('advantage')?.scrollIntoView({ behavior: 'smooth' })}>
                Our Hubs
              </button>
            </div>
          </div>
          <div className="nw-hero-image-wrap">
            <img
              src="/parcelx_images/image_38.png"
              alt="Modern logistics warehouse interior during golden hour with warm saffron lighting"
              className="nw-hero-image"
            />
          </div>
        </div>
      </section>

      {/* ═══ Courier Partners ═══ */}
      <section className="nw-partners" id="partners">
        <div className="nw-section-header">
          <span className="nw-section-tag">COLLABORATIONS</span>
          <h2 className="nw-section-title">Strategic Courier Partners</h2>
          <div className="nw-section-line" />
        </div>
        <div className="nw-partners-grid">
          {partners.map((p, i) => (
            <div className="nw-partner-card" key={i}>
              <div className="nw-partner-logo-wrap">
                <span className="material-symbols-outlined nw-partner-icon">{p.icon}</span>
              </div>
              <h3 className="nw-partner-name">{p.name}</h3>
              <p className="nw-partner-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Advantage Visualization ═══ */}
      <section className="nw-advantage" id="advantage">
        <div className="nw-advantage-inner">
          <div className="nw-advantage-header">
            <h2 className="nw-section-title">The shipBihar Advantage</h2>
            <p className="nw-advantage-subtitle">A precision-engineered delivery flow that combines local intelligence with national giants.</p>
          </div>
          <div className="nw-steps">
            <div className="nw-steps-line" />
            {steps.map((s, i) => (
              <div className="nw-step-group" key={i}>
                <div className="nw-step-card">
                  <div className="nw-step-icon">
                    <span className="material-symbols-outlined">{s.icon}</span>
                  </div>
                  <h4 className="nw-step-title">{s.title}</h4>
                  <p className="nw-step-desc">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="nw-step-arrow">
                    <ChevronRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Detailed Description ═══ */}
      <section className="nw-detail">
        <div className="nw-detail-inner">
          <div className="nw-detail-image-wrap">
            <div className="nw-detail-bg-circle" />
            <img
              src="/parcelx_images/image_31.png"
              alt="Bihar map overlaid with glowing orange network grid connecting districts"
              className="nw-detail-image"
            />
          </div>
          <div className="nw-detail-content">
            <h2 className="nw-section-title">Seamless Flow, Zero Boundaries</h2>
            <div className="nw-features-list">
              {features.map((f, i) => (
                <div className="nw-feature-item" key={i}>
                  <div className="nw-feature-icon">
                    <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{f.icon}</span>
                  </div>
                  <div>
                    <h4 className="nw-feature-title">{f.title}</h4>
                    <p className="nw-feature-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="nw-quote-block">
              <p className="nw-quote-text">
                "Our mission is to empower Bihari entrepreneurs by providing them the same logistics muscle as global corporations. Our network is the backbone of that promise."
              </p>
              <div className="nw-quote-author">— Bihar Logistics Council, 2024 Report</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="nw-footer">
        <div className="nw-footer-grid">
          <div>
            <div className="nw-footer-brand">shipBihar</div>
            <p className="nw-footer-copy">
              © 2024 shipBihar Logistics. Built for the spirit of Mithila. Providing world-class logistics for the heart of India.
            </p>
          </div>
          <div>
            <h4 className="nw-footer-heading">Company</h4>
            <ul className="nw-footer-list">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Media Kit</a></li>
            </ul>
          </div>
          <div>
            <h4 className="nw-footer-heading">Legal</h4>
            <ul className="nw-footer-list">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="nw-footer-heading">Help &amp; Support</h4>
            <ul className="nw-footer-list">
              <li><a href="#">Support Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Track Order</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* ═══ Styles ═══ */}
      <style>{`
        /* ── Reset ── */
        .nw-page {
          min-height: 100vh;
          font-family: 'Work Sans', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          background: #fff7ed;
          color: #191c1d;
        }

        .nw-saffron { color: #9a4600; }

        /* ════════════════════════
           NAV
        ════════════════════════ */
        .nw-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #ffffff;
          border-bottom: 1px solid #dec1b1;
          transition: box-shadow 0.3s;
        }

        .nw-nav.scrolled { box-shadow: 0 4px 20px rgba(87,66,55,0.08); }

        .nw-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nw-nav-left {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .nw-nav-logo {
          width: 200px;
          height: 50px;
          border-radius: 6px;
          object-fit: cover;
          margin-top: 12px;
        }

        .nw-nav-center {
          display: flex;
          gap: 32px;
        }

        .nw-nav-link {
          font-size: 16px;
          font-weight: 400;
          color: #4f5d85;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s;
          padding-bottom: 4px;
        }

        .nw-nav-link:hover { color: #9a4600; }

        .nw-nav-link--active {
          color: #9a4600 !important;
          font-weight: 700;
          border-bottom: 2px solid #9a4600;
        }

        .nw-nav-signin {
          background: #9a4600;
          color: #fff;
          border: none;
          padding: 10px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
        }

        .nw-nav-signin:hover {
          background: #753400;
          transform: translateY(-1px);
        }

        /* ════════════════════════
           HERO
        ════════════════════════ */
        .nw-hero {
          position: relative;
          overflow: hidden;
          background: #ffffff;
          border-bottom: 1px solid #dec1b1;
        }

        .nw-hero-hatch {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(154,70,0,0.05) 5px, rgba(154,70,0,0.05) 6px);
          opacity: 0.4;
          pointer-events: none;
        }

        .nw-hero-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 32px;
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        .nw-hero-title {
          font-size: 40px;
          line-height: 48px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #191c1d;
          margin-bottom: 24px;
        }

        .nw-hero-desc {
          font-size: 18px;
          line-height: 28px;
          color: #574237;
          margin-bottom: 48px;
          max-width: 560px;
        }

        .nw-hero-actions {
          display: flex;
          gap: 24px;
        }

        .nw-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f47a20;
          color: #582500;
          border: none;
          border-bottom: 4px solid #9a4600;
          padding: 12px 32px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
        }

        .nw-btn-primary:hover {
          transform: translateY(1px);
          border-bottom-width: 2px;
          background: #e06e18;
        }

        .nw-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #4f5d85;
          border: 1px solid #4f5d85;
          padding: 12px 32px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
        }

        .nw-btn-outline:hover {
          background: #f3f4f5;
          border-color: #9a4600;
          color: #9a4600;
        }

        .nw-hero-image-wrap {
          position: relative;
          height: 400px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #8b7265;
          box-shadow: 2px 2px 0px #f47a20;
        }

        .nw-hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(.4,0,.2,1);
        }

        .nw-hero-image-wrap:hover .nw-hero-image {
          transform: scale(1.04);
        }

        /* ════════════════════════
           PARTNERS
        ════════════════════════ */
        .nw-partners {
          padding: 80px 32px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .nw-section-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .nw-section-tag {
          color: #9a4600;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .nw-section-title {
          font-size: 32px;
          line-height: 40px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #191c1d;
          margin-top: 4px;
        }

        .nw-section-line {
          width: 96px;
          height: 4px;
          background: #9a4600;
          margin: 12px auto 0;
          border-radius: 2px;
        }

        .nw-partners-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .nw-partner-card {
          background: #fff;
          padding: 24px;
          border: 1px solid #dec1b1;
          border-radius: 16px;
          position: relative;
          transition: all 0.3s cubic-bezier(.4,0,.2,1);
          cursor: default;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        .nw-partner-card:hover {
          border-color: #9a4600;
          transform: translateY(-4px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .nw-partner-logo-wrap {
          height: 48px;
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .nw-partner-icon {
          font-size: 36px;
          color: #9a4600;
          transition: transform 0.3s;
        }
        
        .nw-partner-card:hover .nw-partner-icon {
          transform: scale(1.2);
        }

        .nw-partner-name {
          font-size: 24px;
          line-height: 32px;
          font-weight: 600;
          color: #191c1d;
          margin-bottom: 4px;
        }

        .nw-partner-desc {
          font-size: 16px;
          line-height: 24px;
          color: #574237;
        }

        /* ════════════════════════
           ADVANTAGE / FLOW STEPS
        ════════════════════════ */
        .nw-advantage {
          background: #edeeef;
          padding: 80px 0;
          overflow: hidden;
          position: relative;
        }

        .nw-advantage-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          position: relative;
          z-index: 10;
        }

        .nw-advantage-header {
          margin-bottom: 48px;
        }

        .nw-advantage-subtitle {
          font-size: 16px;
          line-height: 24px;
          color: #574237;
          max-width: 640px;
          margin-top: 8px;
        }

        .nw-steps {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 48px 0;
        }

        .nw-steps-line {
          display: none;
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 2px;
          background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(154,70,0,0.08) 5px, rgba(154,70,0,0.08) 6px);
          transform: translateY(-50%);
          z-index: -1;
        }

        .nw-step-group {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }

        .nw-step-card {
          flex: 1;
          background: #fff;
          padding: 24px;
          text-align: center;
          border: 1px solid #dec1b1;
          border-radius: 16px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
        }

        .nw-step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .nw-step-icon {
          width: 48px;
          height: 48px;
          background: #9a4600;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          font-size: 24px;
          transition: transform 0.3s;
        }

        .nw-step-card:hover .nw-step-icon {
          transform: scale(1.15);
        }

        .nw-step-title {
          font-size: 24px;
          line-height: 32px;
          font-weight: 600;
          color: #191c1d;
          margin-bottom: 4px;
        }

        .nw-step-desc {
          font-size: 12px;
          line-height: 16px;
          font-weight: 500;
          color: #574237;
        }

        .nw-step-arrow {
          color: #9a4600;
          flex-shrink: 0;
        }

        /* ════════════════════════
           DETAIL / FEATURES
        ════════════════════════ */
        .nw-detail {
          padding: 80px 32px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .nw-detail-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .nw-detail-image-wrap {
          position: relative;
        }

        .nw-detail-bg-circle {
          position: absolute;
          top: -48px;
          left: -48px;
          width: 256px;
          height: 256px;
          border-radius: 50%;
          background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(154,70,0,0.05) 5px, rgba(154,70,0,0.05) 6px);
          opacity: 0.1;
        }

        .nw-detail-image {
          position: relative;
          z-index: 10;
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
          border-radius: 12px;
          border: 1px solid #8b7265;
          box-shadow: 2px 2px 0px #f47a20;
          transition: transform 0.4s;
        }

        .nw-detail-image:hover {
          transform: scale(1.02);
        }

        .nw-detail-content {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .nw-detail-content .nw-section-title {
          margin-bottom: 24px;
        }

        .nw-features-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .nw-feature-item {
          display: flex;
          gap: 16px;
          background: #fff;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(222, 193, 177, 0.3);
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
        }
        
        .nw-feature-item:hover {
          border-color: rgba(154, 70, 0, 0.5);
        }

        .nw-feature-icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          background: rgba(244, 122, 32, 0.2);
          color: #9a4600;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 4px;
        }

        .nw-feature-title {
          font-size: 18px;
          font-weight: 600;
          color: #191c1d;
          margin-bottom: 4px;
        }

        .nw-feature-desc {
          font-size: 16px;
          line-height: 24px;
          color: #574237;
        }

        .nw-quote-block {
          margin-top: 48px;
          padding: 24px;
          background: #f3f4f5;
          border-radius: 8px;
          border-left: 4px solid #9a4600;
        }

        .nw-quote-text {
          font-size: 16px;
          line-height: 24px;
          font-style: italic;
          color: #574237;
        }

        .nw-quote-author {
          margin-top: 12px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #191c1d;
        }

        /* ════════════════════════
           FOOTER
        ════════════════════════ */
        .nw-footer {
          background: #e7e8e9;
          border-top: 1px solid #dec1b1;
          padding: 48px 32px;
        }

        .nw-footer-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 24px;
        }

        .nw-footer-brand {
          font-size: 24px;
          line-height: 32px;
          font-weight: 600;
          color: #574237;
          margin-bottom: 12px;
        }

        .nw-footer-copy {
          font-size: 12px;
          line-height: 16px;
          font-weight: 500;
          color: #4a5980;
          opacity: 0.9;
        }

        .nw-footer-heading {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #191c1d;
          margin-bottom: 12px;
        }

        .nw-footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nw-footer-list a {
          font-size: 12px;
          line-height: 16px;
          font-weight: 500;
          color: #4a5980;
          text-decoration: none;
          transition: all 0.2s;
        }

        .nw-footer-list a:hover {
          text-decoration: underline;
          text-decoration-color: #9a4600;
          color: #9a4600;
        }

        /* ════════════════════════
           RESPONSIVE
        ════════════════════════ */
        @media (max-width: 1024px) {
          .nw-hero-inner {
            grid-template-columns: 1fr;
            padding: 48px 32px;
          }

          .nw-hero-image-wrap {
            height: 300px;
          }

          .nw-partners-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .nw-steps {
            flex-direction: column;
            gap: 24px;
          }

          .nw-step-group {
            flex-direction: column;
            width: 100%;
          }

          .nw-step-card {
            width: 100%;
          }

          .nw-step-arrow {
            transform: rotate(90deg);
          }

          .nw-detail-inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .nw-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }

        @media (max-width: 640px) {
          .nw-nav-center { display: none; }

          .nw-hero-title {
            font-size: 24px;
            line-height: 32px;
          }

          .nw-hero-desc {
            font-size: 16px;
            line-height: 24px;
          }

          .nw-hero-actions {
            flex-direction: column;
            gap: 12px;
          }

          .nw-btn-primary,
          .nw-btn-outline {
            width: 100%;
            justify-content: center;
          }

          .nw-partners-grid {
            grid-template-columns: 1fr;
          }

          .nw-section-title {
            font-size: 24px;
            line-height: 32px;
          }

          .nw-footer-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ── Entrance animations ── */
        @keyframes nwFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nw-hero-text { animation: nwFadeUp 0.7s ease-out; }
        .nw-hero-image-wrap { animation: nwFadeUp 0.7s ease-out 0.15s both; }
        .nw-partner-card { animation: nwFadeUp 0.5s ease-out both; }
        .nw-partner-card:nth-child(1) { animation-delay: 0.05s; }
        .nw-partner-card:nth-child(2) { animation-delay: 0.10s; }
        .nw-partner-card:nth-child(3) { animation-delay: 0.15s; }
        .nw-partner-card:nth-child(4) { animation-delay: 0.20s; }
        .nw-partner-card:nth-child(5) { animation-delay: 0.25s; }
        .nw-partner-card:nth-child(6) { animation-delay: 0.30s; }
        .nw-partner-card:nth-child(7) { animation-delay: 0.35s; }
        .nw-partner-card:nth-child(8) { animation-delay: 0.40s; }
        .nw-step-card { animation: nwFadeUp 0.5s ease-out both; }
        .nw-step-card:nth-child(1) { animation-delay: 0.1s; }
        .nw-step-card:nth-child(2) { animation-delay: 0.2s; }
        .nw-step-card:nth-child(3) { animation-delay: 0.3s; }
        .nw-step-card:nth-child(4) { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
};

export default Network;

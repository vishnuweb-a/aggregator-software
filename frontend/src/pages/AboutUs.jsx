import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import shipbiharLogo from '../assets/sb3.png';
import { useState } from 'react';

const AboutUs = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleWaitlist = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thanks! ${email} has been added to the waitlist.`);
      setEmail('');
    }
  };

  return (
    <div className="au-page">
      {/* ═══ Nav Bar ═══ */}
      <nav className="au-nav">
        <div className="au-nav-inner">
          <div className="au-nav-left" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img src={shipbiharLogo} alt="shipBihar" className="au-nav-logo" />
          </div>
          <div className="au-nav-center">
            <a onClick={() => navigate('/')} className="au-nav-link">Tracking</a>
            <a onClick={() => navigate('/network')} className="au-nav-link">Network</a>
            <a onClick={() => navigate('/services')} className="au-nav-link">Services</a>
            <a onClick={() => navigate('/about')} className="au-nav-link au-nav-link--active">About Us</a>
          </div>
          <div className="au-nav-right">
            <span className="au-launch-badge">
              <span className="material-symbols-outlined au-launch-icon">event_upcoming</span>
              Launching June-July 2025
            </span>
            <button className="au-nav-signin" onClick={() => navigate('/login')}>Get Started</button>
          </div>
        </div>
      </nav>

      {/* ═══ Hero Section ═══ */}
      <section className="au-hero">
        <div className="au-hero-overlay" />
        <img
          src="/parcelx_images/aboutus_hero.png"
          alt="shipBihar truck crossing the Mahatma Gandhi Setu bridge at sunrise"
          className="au-hero-bg"
        />
        <div className="au-hero-content">
          <h1 className="au-hero-title">Rooted in Bihar, Reaching the World</h1>
          <p className="au-hero-desc">
            We are revolutionizing regional logistics by blending world‑class technology with a deep understanding of our native terrain.
          </p>
          <button
            className="au-hero-cta"
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join Our Journey
          </button>
        </div>
      </section>

      {/* ═══ Timeline / Milestones ═══ */}
      <section className="au-timeline">
        <div className="au-mithila-bg" />
        <div className="au-timeline-inner">
          <div className="au-section-header">
            <h2 className="au-section-title">July 2025 Launch &amp; Beyond</h2>
            <div className="au-section-line" />
          </div>
          <div className="au-milestones">
            {[
              {
                icon: 'rocket_launch',
                date: 'July 2025',
                label: 'Official Launch',
                desc: 'Bringing multi‑modal logistics to Bihar with our core network, connecting regional hubs to the global stage.'
              },
              {
                icon: 'hub',
                date: 'Network',
                label: 'Unified Courier Network',
                desc: 'Integration with all major courier providers for seamless regional and national reach, ensuring no destination is out of touch.'
              },
              {
                icon: 'dashboard',
                date: 'Control',
                label: 'Smart User Dashboard',
                desc: 'A comprehensive portal for real‑time tracking, shipment management, and deep analytics to optimize your business logistics.'
              },
              {
                icon: 'account_balance_wallet',
                date: 'Payments',
                label: 'Integrated Wallet & COD',
                desc: 'Secure digital payments via the shipBihar wallet and full support for COD to empower local commerce and build consumer trust.'
              }
            ].map((m, i) => (
              <div className="au-milestone-card" key={i}>
                <div className="au-milestone-accent" />
                <div className="au-milestone-head">
                  <span className="material-symbols-outlined au-milestone-icon">{m.icon}</span>
                  <h3 className="au-milestone-date">{m.date}</h3>
                </div>
                <h4 className="au-milestone-label">{m.label}</h4>
                <p className="au-milestone-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Mission & Values Bento Grid ═══ */}
      <section className="au-mission">
        <div className="au-mission-inner">
          <div className="au-mission-header">
            <h2 className="au-section-title">Mission &amp; Values</h2>
            <p className="au-mission-subtitle">
              Building trust through transparency, speed, and a deep connection to our community.
            </p>
          </div>
          <div className="au-bento-grid">
            {/* Large Card */}
            <div className="au-bento-large">
              <div className="au-bento-badge">
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>hub</span>
                Core Pillar
              </div>
              <span className="material-symbols-outlined au-bento-icon-lg">handshake</span>
              <h3 className="au-bento-title-lg">Local Heritage</h3>
              <p className="au-bento-desc-lg">
                We treat every package with the respect of a neighbor. Our operations are deeply integrated with local communities, providing employment and reliable service where others don't.
              </p>
            </div>
            {/* Standard Card */}
            <div className="au-bento-standard">
              <span className="material-symbols-outlined au-bento-icon-sm" style={{ color: '#4f5d85' }}>speed</span>
              <h3 className="au-bento-title-sm">Global Standards</h3>
              <p className="au-bento-desc-sm">Implementing world‑class tech for tracking and fulfillment.</p>
            </div>
            {/* Small Card - Innovation */}
            <div className="au-bento-small au-bento-double-border">
              <span className="material-symbols-outlined au-bento-icon-center">lightbulb</span>
              <h3 className="au-bento-title-center">Innovation</h3>
            </div>
            {/* Small Card - Reliability */}
            <div className="au-bento-small">
              <span className="material-symbols-outlined au-bento-icon-center" style={{ color: '#4f5d85' }}>verified_user</span>
              <h3 className="au-bento-title-center">Reliability</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ The shipBihar Advantage ═══ */}
      <section className="au-advantage">
        <div className="au-advantage-inner">
          <div className="au-advantage-text">
            <h2 className="au-section-title">The shipBihar Advantage</h2>
            <p className="au-advantage-desc">
              We aren't just moving boxes; we are enabling commerce. By building a robust logistics network tailored to the geography and culture of Bihar, we reduce transit times and increase reliability for local businesses.
            </p>
            <ul className="au-advantage-list">
              {[
                'Extensive Last‑Mile Reach',
                'Real‑time Visibility & Tracking',
                'Empowering Local MSMEs'
              ].map((item, i) => (
                <li key={i} className="au-advantage-item">
                  <span className="material-symbols-outlined au-check-icon">check_circle</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="au-advantage-logo-wrap">
              <img src={shipbiharLogo} alt="shipBihar" className="au-advantage-logo" />
            </div>
          </div>
          <div className="au-advantage-image-wrap">
            <img src="/parcelx_images/image_54.png" alt="Community delivery" className="au-advantage-image" />
          </div>
        </div>
      </section>

      {/* ═══ Waitlist CTA ═══ */}
      <section className="au-waitlist" id="waitlist">
        <div className="au-mithila-bg au-mithila-bg--light" />
        <div className="au-waitlist-inner">
          <div className="au-waitlist-card">
            <img src="/parcelx_images/aboutus_cta_logo.png" alt="shipBihar" className="au-waitlist-logo" />
            <h2 className="au-waitlist-title">Be Part of the Journey</h2>
            <p className="au-waitlist-desc">
              Join our exclusive waitlist for the July 2025 launch and be the first to experience world‑class logistics rooted in Bihar.
            </p>
            <form className="au-waitlist-form" onSubmit={handleWaitlist}>
              <input
                type="email"
                className="au-waitlist-input"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="au-waitlist-btn">
                Join Waitlist <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="au-footer">
        <div className="au-footer-inner">
          <div className="au-footer-brand-col">
            <img src={shipbiharLogo} alt="shipBihar" className="au-footer-logo" />
            <span className="au-footer-copy">© 2025 shipBihar Logistics. Rooted in Bihar, Serving the Nation.</span>
          </div>
          <div className="au-footer-links">
            <a href="#" className="au-footer-link">Privacy Policy</a>
            <a href="#" className="au-footer-link">Terms of Service</a>
            <a href="#" className="au-footer-link">Carrier Partners</a>
            <a href="#" className="au-footer-link">Hiring</a>
          </div>
        </div>
      </footer>

      {/* ═══ Styles ═══ */}
      <style>{`
        /* ── Google Material Symbols (already loaded globally, but ensure) ── */
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        /* ── Page ── */
        .au-page {
          min-height: 100vh;
          font-family: 'Work Sans', system-ui, sans-serif;
          background: #f8f9fa;
          color: #191c1d;
        }

        /* ── Nav ── */
        .au-nav {
          position: sticky; top: 0; z-index: 100;
          background: #fff;
          border-bottom: 1px solid #dec1b1;
        }
        .au-nav-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 32px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .au-nav-left { display: flex; align-items: center; }
        .au-nav-logo { width: 200px; height: 50px; object-fit: cover; border-radius: 6px; margin-top: 12px; }
        .au-nav-center { display: flex; gap: 32px; }
        .au-nav-link {
          font-size: 16px; font-weight: 500; color: #4f5d85;
          text-decoration: none; padding-bottom: 4px; cursor: pointer;
          transition: color 0.2s;
        }
        .au-nav-link:hover { color: #9a4600; }
        .au-nav-link--active {
          color: #9a4600 !important; font-weight: 700;
          border-bottom: 2px solid #9a4600;
        }
        .au-nav-right { display: flex; align-items: center; gap: 12px; }
        .au-launch-badge {
          display: flex; align-items: center; gap: 4px;
          background: rgba(255,255,255,0.8); backdrop-filter: blur(12px);
          border: 1px solid #dec1b1; padding: 4px 12px;
          border-radius: 999px; font-size: 12px; font-weight: 500;
          color: #9a4600; animation: au-pulse 2s ease-in-out infinite;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .au-launch-icon { font-size: 14px; }
        @keyframes au-pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .au-nav-signin {
          background: #9a4600; color: #fff; border: none;
          padding: 10px 24px; border-radius: 8px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          transition: all 0.2s;
        }
        .au-nav-signin:hover { background: #753400; transform: translateY(-1px); }

        /* ── Hero ── */
        .au-hero {
          position: relative; width: 100%; height: calc(100vh - 64px); min-height: 600px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .au-hero-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to right, rgba(25,28,29,0.8), rgba(25,28,29,0.4));
        }
        .au-hero-bg {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center; z-index: 0;
        }
        .au-hero-content {
          position: relative; z-index: 2; text-align: center;
          max-width: 800px; padding: 0 32px; color: #fff;
        }
        .au-hero-title {
          font-size: 48px; font-weight: 700; letter-spacing: -0.02em;
          margin-bottom: 24px; line-height: 1.15;
        }
        .au-hero-desc {
          font-size: 18px; line-height: 28px; opacity: 0.92;
          max-width: 640px; margin: 0 auto 48px;
        }
        .au-hero-cta {
          background: #9a4600; color: #fff; border: 1px solid rgba(255,182,140,0.4);
          padding: 14px 48px; border-radius: 999px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          transition: all 0.2s; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .au-hero-cta:hover { background: #753400; transform: translateY(-2px); box-shadow: 0 6px 28px rgba(0,0,0,0.4); }

        /* ── Mithila Pattern ── */
        .au-mithila-bg {
          position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0.5;
          background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(139,114,101,0.05) 10px, rgba(139,114,101,0.05) 11px);
        }
        .au-mithila-bg--light { opacity: 0.3; }

        /* ── Section header ── */
        .au-section-header { text-align: center; margin-bottom: 64px; }
        .au-section-title { font-size: 32px; font-weight: 700; color: #191c1d; margin-bottom: 12px; }
        .au-section-line { width: 64px; height: 4px; background: #9a4600; margin: 0 auto; border-radius: 2px; }

        /* ── Timeline ── */
        .au-timeline { position: relative; padding: 80px 24px; overflow: hidden; }
        .au-timeline-inner { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; }
        .au-milestones { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
        .au-milestone-card {
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.8); backdrop-filter: blur(12px);
          border: 1px solid #dec1b1; border-radius: 12px; padding: 24px;
          transition: border-color 0.3s, transform 0.3s;
        }
        .au-milestone-card:hover { border-color: #9a4600; transform: translateY(-4px); }
        .au-milestone-accent {
          position: absolute; top: 0; left: 0; width: 4px; height: 100%;
          background: #9a4600;
        }
        .au-milestone-head { display: flex; align-items: center; margin-bottom: 12px; }
        .au-milestone-icon {
          font-size: 30px; color: #9a4600; margin-right: 12px;
          font-variation-settings: 'FILL' 1;
        }
        .au-milestone-date { font-size: 24px; font-weight: 600; }
        .au-milestone-label { font-size: 14px; font-weight: 600; color: #4f5d85; letter-spacing: 0.05em; margin-bottom: 4px; }
        .au-milestone-desc { font-size: 16px; color: #574237; line-height: 24px; }

        /* ── Mission & Values Bento ── */
        .au-mission { background: #f3f4f5; padding: 80px 24px; }
        .au-mission-inner { max-width: 1280px; margin: 0 auto; }
        .au-mission-header { margin-bottom: 48px; }
        .au-mission-subtitle { font-size: 18px; color: #574237; max-width: 580px; margin-top: 8px; line-height: 28px; }
        .au-bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 200px 200px;
          gap: 16px;
        }
        .au-bento-large {
          grid-column: 1 / 3; grid-row: 1 / 3;
          background: #fff; border-radius: 12px; padding: 48px;
          border: 1px solid #dec1b1; display: flex; flex-direction: column;
          justify-content: flex-end; position: relative; overflow: hidden;
          transition: border-color 0.3s;
        }
        .au-bento-large:hover { border-color: #9a4600; }
        .au-bento-badge {
          position: absolute; top: 16px; right: 16px;
          background: #d8e2ff; color: #004493;
          padding: 4px 12px; border-radius: 999px;
          font-size: 12px; font-weight: 500; display: flex; align-items: center; gap: 4px;
        }
        .au-bento-icon-lg { font-size: 48px; color: #9a4600; margin-bottom: 24px; font-variation-settings: 'FILL' 1; }
        .au-bento-title-lg { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
        .au-bento-desc-lg { font-size: 16px; color: #574237; line-height: 24px; }

        .au-bento-standard {
          grid-column: 3 / 5;
          background: #fff; border-radius: 12px; padding: 24px;
          border: 1px solid #dec1b1; display: flex; flex-direction: column;
          justify-content: center;
        }
        .au-bento-icon-sm { font-size: 30px; margin-bottom: 4px; font-variation-settings: 'FILL' 1; }
        .au-bento-title-sm { font-size: 18px; font-weight: 600; margin-bottom: 4px; }
        .au-bento-desc-sm { font-size: 14px; color: #574237; }

        .au-bento-small {
          background: #fff; border-radius: 12px; padding: 24px;
          border: 1px solid #dec1b1; display: flex; flex-direction: column;
          justify-content: center; align-items: center; text-align: center;
        }
        .au-bento-double-border {
          border: 1px solid #dec1b1;
          box-shadow: 0 0 0 2px #fff, 0 0 0 3px #dec1b1;
        }
        .au-bento-icon-center { font-size: 40px; color: #9a4600; margin-bottom: 12px; font-variation-settings: 'FILL' 1; }
        .au-bento-title-center { font-size: 14px; font-weight: 600; letter-spacing: 0.05em; }

        /* ── Advantage ── */
        .au-advantage { padding: 80px 24px; }
        .au-advantage-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; gap: 80px;
        }
        .au-advantage-text { flex: 1; }
        .au-advantage-desc { font-size: 16px; color: #574237; line-height: 24px; margin: 16px 0 24px; }
        .au-advantage-list { list-style: none; padding: 0; margin: 0 0 32px; display: flex; flex-direction: column; gap: 12px; }
        .au-advantage-item { display: flex; align-items: flex-start; gap: 8px; font-size: 16px; }
        .au-check-icon { font-size: 20px; color: #9a4600; margin-top: 2px; }
        .au-advantage-logo-wrap {
          display: inline-block; border: 1px solid #dec1b1;
          padding: 8px 16px; border-radius: 8px; background: #f8f9fa;
        }
        .au-advantage-logo { height: 28px; width: auto; opacity: 0.8; }
        .au-advantage-image-wrap {
          flex: 1; height: 400px; border-radius: 12px; overflow: hidden;
          border: 1px solid #dec1b1;
        }
        .au-advantage-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
        .au-advantage-image-wrap:hover .au-advantage-image { transform: scale(1.04); }

        /* ── Waitlist CTA ── */
        .au-waitlist { position: relative; padding: 80px 24px; overflow: hidden; }
        .au-waitlist-inner { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; }
        .au-waitlist-card {
          background: rgba(255,255,255,0.8); backdrop-filter: blur(12px);
          border: 1px solid #dec1b1; border-radius: 24px;
          padding: 64px; display: flex; flex-direction: column;
          align-items: center; text-align: center;
        }
        .au-waitlist-logo { height: 48px; width: auto; margin-bottom: 24px; }
        .au-waitlist-title { font-size: 40px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 12px; }
        .au-waitlist-desc { font-size: 18px; color: #574237; max-width: 580px; margin-bottom: 32px; line-height: 28px; }
        .au-waitlist-form { display: flex; gap: 8px; width: 100%; max-width: 440px; }
        .au-waitlist-input {
          flex: 1; border: 1px solid #dec1b1; border-radius: 8px;
          padding: 12px 16px; font-size: 14px; background: #fff;
          outline: none; font-family: inherit;
          transition: border-color 0.2s;
        }
        .au-waitlist-input:focus { border-color: #9a4600; box-shadow: 0 0 0 2px rgba(154,70,0,0.12); }
        .au-waitlist-btn {
          background: #9a4600; color: #fff; border: none;
          padding: 12px 24px; border-radius: 8px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          transition: all 0.2s; display: flex; align-items: center; gap: 6px;
          white-space: nowrap; box-shadow: 0 4px 14px rgba(154,70,0,0.3);
        }
        .au-waitlist-btn:hover { background: #753400; transform: translateY(-1px); }

        /* ── Footer ── */
        .au-footer { background: #e7e8e9; border-top: 1px solid #dec1b1; padding: 48px 32px; }
        .au-footer-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 24px;
        }
        .au-footer-brand-col { display: flex; align-items: center; gap: 16px; }
        .au-footer-logo { height: 28px; width: auto; opacity: 0.8; }
        .au-footer-copy { font-size: 14px; color: #574237; }
        .au-footer-links { display: flex; flex-wrap: wrap; gap: 24px; }
        .au-footer-link { font-size: 12px; color: #574237; text-decoration: none; font-weight: 500; transition: color 0.2s; }
        .au-footer-link:hover { color: #9a4600; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .au-milestones { grid-template-columns: repeat(2,1fr); }
          .au-bento-grid { grid-template-columns: repeat(2,1fr); grid-template-rows: auto; }
          .au-bento-large { grid-column: 1 / 3; grid-row: auto; }
          .au-bento-standard { grid-column: 1 / 3; }
          .au-advantage-inner { flex-direction: column; gap: 40px; }
        }
        @media (max-width: 768px) {
          .au-hero-title { font-size: 32px; }
          .au-nav-center { display: none; }
          .au-launch-badge { display: none; }
          .au-milestones { grid-template-columns: 1fr; }
          .au-bento-grid { grid-template-columns: 1fr; }
          .au-bento-large { grid-column: auto; }
          .au-bento-standard { grid-column: auto; }
          .au-waitlist-form { flex-direction: column; }
          .au-waitlist-card { padding: 32px 24px; }
          .au-waitlist-title { font-size: 28px; }
          .au-advantage-image-wrap { height: 260px; }
          .au-footer-inner { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;

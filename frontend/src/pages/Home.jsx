import { useNavigate } from 'react-router-dom';
import {
  Truck, ArrowRight, Shield, RefreshCw, MapPin,
  Award, Star, Heart, CheckCircle2, ChevronRight
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* TopNavBar */}
      <header className="home-header">
        <div className="home-header-inner">
          <div className="home-logo-wrap" onClick={() => navigate('/')}>
            <div className="home-logo-icon">
              <Truck size={20} color="#ffffff" strokeWidth={2.5} />
            </div>
            <span className="home-logo-text">ship<span className="text-saffron">Bihar</span></span>
          </div>

          <nav className="home-nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#our-story">Our Story</a>
          </nav>

          <button
            className="home-signin-btn"
            onClick={() => navigate('/login')}
          >
            Sign In
            <ChevronRight size={16} />
          </button>
        </div>
      </header>

      <main style={{ paddingTop: 80 }}>
        {/* Hero Section */}
        <section className="home-hero-section">
          <div className="home-hero-text">
            <div className="home-badge kachni-pattern">
              <span className="home-badge-text">Bihar ka Apna Logistics Portal</span>
            </div>
            <h1 className="home-hero-title">
              Connecting Bihar's Businesses to the World.
            </h1>
            <p className="home-hero-subtitle">
              shipBihar is a modern logistics middleware that connects you to India's top courier services in one click. Fast, secure, and culturally rooted.
            </p>
            <div className="home-hero-buttons">
              <button
                className="home-btn-getstarted"
                onClick={() => navigate('/register')}
              >
                Get Started Free
                <ArrowRight size={18} style={{ marginLeft: 6 }} />
              </button>
              <button
                className="home-btn-viewrates"
                onClick={() => navigate('/login')}
              >
                Sign In
              </button>
            </div>
          </div>

          <div className="home-hero-image-wrap">
            <div className="home-hero-frame-bg1"></div>
            <div className="home-hero-frame-bg2"></div>
            <div className="home-hero-frame-main mithila-border">
              <img
                alt="Logistics operations collage"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGgzTmjxZar94XHxl7ZMslxq53RYnqgn4gLuMt6YafP98XXL9wxAe5W0GHI3BXQjCw7oahCbrSdtVooIqM4DPWOnteoKXIim6acU1EqO-Job-eA-1zxHCSgWuFw-1nGyHwvV-D2XggmX81NmRHbJTBd7pV1w-0dP8JrHb-bjGxdswuXG2Jcu0rzqJHsCY6bvWyeUxGlTEUWci5UmvFxYTWY3PxI21ieZPgjMuB-5FLl1saOsimh3FZqW_Kyy41uXoHJ7QZAlYVrIIZ"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="home-features-section" id="features">
          <div className="home-container">
            <div className="home-section-header">
              <h2 className="home-section-title">Logistics Engineered for Reliability</h2>
              <p className="home-section-desc">
                Streamlined solutions that merge cultural pride with high-performance tracking and delivery tools.
              </p>
            </div>
            <div className="home-features-grid">
              {[
                {
                  icon: MapPin,
                  title: 'Real-time Tracking',
                  desc: 'Monitor every single shipment across multiple carriers through a single, clean dashboard.',
                  accent: true,
                },
                {
                  icon: RefreshCw,
                  title: 'Multi-carrier Comparison',
                  desc: 'Compare shipping rates, speeds, and service reliability instantly to find the best deal.',
                  accent: false,
                },
                {
                  icon: Truck,
                  title: 'Instant Pickup Bookings',
                  desc: 'Schedule rapid doorstep dispatches with top-tier courier partners instantly from your account.',
                  accent: false,
                },
                {
                  icon: Shield,
                  title: 'Secure Routing Network',
                  desc: 'Modern encryption guarantees your package data and client databases are kept safe.',
                  accent: false,
                },
              ].map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className={`home-feature-card${f.accent ? ' home-feature-card--accent' : ''}`}>
                    <div className="home-feature-icon">
                      <Icon size={24} />
                    </div>
                    <h3 className="home-feature-title">{f.title}</h3>
                    <p className="home-feature-desc">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="home-story-section" id="our-story">
          <div className="home-container">
            <div className="home-story-grid">
              <div className="home-story-text">
                <span className="home-story-label">Our Story & Heritage</span>
                <h2 className="home-section-title" style={{ textAlign: 'left' }}>
                  Rooted in Bihar, Built for the Future
                </h2>
                <div className="home-story-body">
                  <p>
                    shipBihar began with a clear vision: to empower small local enterprises, artisans, and distributors across Bihar by providing world-class logistics technology.
                  </p>
                  <p>
                    Inspired by the intricate geometry and resilience of Mithila art, we designed shipBihar to represent absolute stability and dynamic momentum. Today, we bridge the gap between traditional craftsmanship and global supply chains.
                  </p>
                </div>
              </div>
              <div className="home-story-awards">
                {[
                  { icon: Award, title: 'State Tech Logistics Award', sub: 'Honorable Mention', colorClass: 'primary' },
                  { icon: Star, title: 'Most Trusted Regional Middleware', sub: 'Regional Cargo Association', colorClass: 'secondary' },
                  { icon: Heart, title: 'Made in Bihar Initiative', sub: 'Cultural Heritage Support', colorClass: 'tertiary' },
                ].map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={i} className="home-award-card">
                      <div className={`home-award-icon home-award-icon--${a.colorClass}`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="home-award-title">{a.title}</div>
                        <div className="home-award-sub">{a.sub}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="home-howitworks-section" id="how-it-works">
          <div className="home-container">
            <div className="home-section-header">
              <h2 className="home-section-title">How It Works</h2>
              <p className="home-section-desc">
                Three basic steps to completely streamline your shipping operations and dispatch packages instantly.
              </p>
            </div>
            <div className="home-steps-grid">
              {[
                { step: '01', title: 'Register in Seconds', desc: 'Create a free business account using your email and mobile number.' },
                { step: '02', title: 'Compare & Select', desc: 'Input delivery addresses to compare live rates across multiple carriers instantly.' },
                { step: '03', title: 'Book & Track', desc: 'Book your delivery with a single click and monitor status live in your panel.' },
              ].map((s, i) => (
                <div key={i} className="home-step-card">
                  <div className="home-step-number">{s.step}</div>
                  <h3 className="home-step-title">{s.title}</h3>
                  <p className="home-step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="home-cta-section kachni-pattern">
          <div className="home-container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 className="home-section-title text-white">Start Dispatching Smarter Today</h2>
            <p className="home-section-desc text-white-50" style={{ maxWidth: 520, margin: '0 auto 2rem' }}>
              Join hundreds of high-growth distributors who trust shipBihar to manage their supply lines and local shipping.
            </p>
            <div className="home-hero-buttons" style={{ justifyContent: 'center' }}>
              <button
                className="home-btn-getstarted"
                style={{ background: '#ffffff', color: 'var(--accent-2)' }}
                onClick={() => navigate('/register')}
              >
                Get Started Free
                <ArrowRight size={18} style={{ marginLeft: 6 }} />
              </button>
              <button
                className="home-btn-viewrates"
                style={{ borderColor: '#ffffff', color: '#ffffff' }}
                onClick={() => navigate('/login')}
              >
                Sign In
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-footer-inner">
          <div className="home-footer-brand">
            <div className="home-footer-logo">
              ship<span className="text-saffron">Bihar</span>
            </div>
            <p className="home-footer-tagline">
              Connecting local craft, industrial hubs, and modern businesses with smart logistics solutions.
            </p>
            <div className="home-footer-address">
              <p>Patna IT Hub, Tech Zone</p>
              <p>Patna, Bihar, India</p>
              <p>contact@shipbihar.com</p>
            </div>
          </div>
          <div className="home-footer-col">
            <span className="home-footer-col-title">Legal</span>
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
          <div className="home-footer-col">
            <span className="home-footer-col-title">Company</span>
            <a href="#contact">Contact Us</a>
            <a href="#careers">Careers</a>
          </div>
          <div className="home-footer-bottom">
            <p>© {new Date().getFullYear()} shipBihar Logistics Portal. Built with local pride.</p>
          </div>
        </div>
      </footer>

      {/* Scoped Styles for Home.jsx */}
      <style>{`
        .home-page {
          background: var(--bg-deep);
          color: var(--text-1);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        .text-saffron {
          color: var(--accent);
        }

        /* ── Header ── */
        .home-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          background: rgba(248, 249, 250, 0.96);
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(12px);
          height: 80px;
        }

        .home-header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 100%;
        }

        .home-logo-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .home-logo-icon {
          width: 36px;
          height: 36px;
          background: var(--accent-2);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(154, 70, 0, 0.2);
        }

        .home-logo-text {
          font-size: 22px;
          font-weight: 800;
          color: var(--purple);
          letter-spacing: -0.02em;
        }

        .home-nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .home-nav-links a {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-2);
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.2s;
        }

        .home-nav-links a:hover {
          color: var(--accent);
        }

        .home-signin-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--purple);
          color: #ffffff;
          padding: 0.6rem 1.4rem;
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: var(--trans);
        }

        .home-signin-btn:hover {
          background: var(--accent-2);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(154, 70, 0, 0.25);
        }

        /* ── Hero Section ── */
        .home-hero-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 4.5rem 24px;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3.5rem;
          align-items: center;
        }

        .home-hero-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
          animation: homeFadeUp 0.7s ease-out both;
        }

        @keyframes homeFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .home-badge {
          background: rgba(244, 122, 32, 0.08);
          border: 1px solid var(--border);
          padding: 0.4rem 1.1rem;
          border-radius: 999px;
        }

        .home-badge-text {
          font-size: 12px;
          font-weight: 700;
          color: var(--accent-2);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .home-hero-title {
          font-size: 46px;
          font-weight: 800;
          line-height: 54px;
          letter-spacing: -0.02em;
          color: var(--purple);
        }

        .home-hero-subtitle {
          font-size: 17px;
          line-height: 26px;
          color: var(--text-2);
          max-width: 580px;
        }

        .home-hero-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
          width: 100%;
        }

        .home-btn-getstarted {
          display: inline-flex;
          align-items: center;
          background: var(--accent);
          color: #ffffff;
          padding: 0.9rem 2.2rem;
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: var(--trans);
          box-shadow: 0 4px 14px var(--accent-glow);
        }

        .home-btn-getstarted:hover {
          background: var(--accent-2);
          box-shadow: 0 6px 20px var(--accent-glow);
          transform: translateY(-2px);
        }

        .home-btn-viewrates {
          display: inline-flex;
          align-items: center;
          background: transparent;
          color: var(--purple);
          padding: 0.9rem 2.2rem;
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-weight: 600;
          border: 1.5px solid var(--purple);
          cursor: pointer;
          transition: var(--trans);
        }

        .home-btn-viewrates:hover {
          background: rgba(27, 42, 78, 0.05);
          transform: translateY(-2px);
        }

        /* Hero Image Frame */
        .home-hero-image-wrap {
          position: relative;
          height: 380px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: homeFadeUp 0.9s ease-out both;
        }

        .home-hero-frame-bg1 {
          position: absolute;
          inset: 0;
          background: #ffdbc9; /* primary-fixed */
          border-radius: var(--radius-lg);
          transform: rotate(3deg) scale(0.96);
          opacity: 0.45;
          box-shadow: var(--shadow-card);
        }

        .home-hero-frame-bg2 {
          position: absolute;
          inset: 0;
          background: var(--purple);
          border-radius: var(--radius-lg);
          transform: rotate(-2deg) scale(0.96);
          opacity: 0.08;
        }

        .home-hero-frame-main {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #ffffff;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
        }

        .home-hero-frame-main img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: calc(var(--radius-lg) - 4px);
        }

        /* ── Features ── */
        .home-features-section {
          background: #ffffff;
          padding: 5rem 24px;
          border-top: 1px solid var(--border);
        }

        .home-section-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 3.5rem;
        }

        .home-section-title {
          font-size: 32px;
          font-weight: 800;
          line-height: 40px;
          letter-spacing: -0.01em;
          color: var(--purple);
          margin-bottom: 0.75rem;
        }

        .home-section-desc {
          font-size: 16px;
          line-height: 24px;
          color: var(--text-2);
        }

        .home-features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .home-feature-card {
          background: var(--bg-deep);
          padding: 2rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          transition: var(--trans);
        }

        .home-feature-card--accent {
          border-top: 3px solid var(--accent);
        }

        .home-feature-card:hover {
          box-shadow: var(--shadow-card), 0 8px 30px rgba(244, 122, 32, 0.06);
          transform: translateY(-4px);
          border-color: var(--accent);
        }

        .home-feature-icon {
          width: 48px;
          height: 48px;
          background: rgba(244, 122, 32, 0.1);
          color: var(--accent-2);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .home-feature-title {
          font-size: 19px;
          font-weight: 700;
          color: var(--purple);
          margin-bottom: 0.5rem;
        }

        .home-feature-desc {
          font-size: 14.5px;
          line-height: 22px;
          color: var(--text-2);
        }

        /* ── Story Section ── */
        .home-story-section {
          padding: 5rem 24px;
        }

        .home-story-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3.5rem;
          align-items: center;
        }

        .home-story-text {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .home-story-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--accent-2);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .home-story-body {
          font-size: 16px;
          line-height: 25px;
          color: var(--text-2);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }

        .home-story-awards {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .home-award-card {
          background: #ffffff;
          padding: 1.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: var(--trans);
        }

        .home-award-card:hover {
          box-shadow: var(--shadow-card);
          transform: translateY(-2px);
          border-color: var(--accent);
        }

        .home-award-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .home-award-icon--primary {
          background: rgba(244, 122, 32, 0.1);
          color: var(--accent-2);
        }

        .home-award-icon--secondary {
          background: rgba(27, 42, 78, 0.08);
          color: var(--purple);
        }

        .home-award-icon--tertiary {
          background: rgba(0, 91, 192, 0.08);
          color: #005bc0;
        }

        .home-award-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--purple);
        }

        .home-award-sub {
          font-size: 12px;
          color: var(--text-2);
          margin-top: 1px;
        }

        /* ── How It Works ── */
        .home-howitworks-section {
          background: #ffffff;
          padding: 5rem 24px;
          border-top: 1px solid var(--border);
        }

        .home-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .home-step-card {
          text-align: center;
          padding: 2.5rem 1.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          background: var(--bg-deep);
          transition: var(--trans);
        }

        .home-step-card:hover {
          box-shadow: var(--shadow-card);
          transform: translateY(-4px);
          border-color: var(--accent);
        }

        .home-step-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          font-size: 18px;
          font-weight: 800;
          color: #ffffff;
          background: var(--accent-2);
          margin-bottom: 1.25rem;
          box-shadow: 0 4px 10px var(--accent-glow);
        }

        .home-step-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--purple);
          margin-bottom: 0.5rem;
        }

        .home-step-desc {
          font-size: 14px;
          line-height: 21px;
          color: var(--text-2);
        }

        /* ── CTA Section ── */
        .home-cta-section {
          padding: 5.5rem 24px;
          background: var(--purple);
          border-top: 1px solid var(--border);
          position: relative;
        }

        .home-cta-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(244, 122, 32, 0.15) 0%, transparent 100%);
          pointer-events: none;
        }

        .text-white {
          color: #ffffff !important;
        }

        .text-white-50 {
          color: rgba(255, 255, 255, 0.7) !important;
        }

        /* ── Footer ── */
        .home-footer {
          background: #111827;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .home-footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 4rem 24px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3.5rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .home-footer-logo {
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .home-footer-tagline {
          font-size: 14px;
          line-height: 21px;
          margin-top: 0.5rem;
          max-width: 320px;
        }

        .home-footer-address {
          margin-top: 1.5rem;
          font-size: 14px;
          line-height: 22px;
          opacity: 0.8;
        }

        .home-footer-col {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .home-footer-col-title {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.5rem;
        }

        .home-footer-col a {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.2s;
        }

        .home-footer-col a:hover {
          color: var(--accent);
        }

        .home-footer-bottom {
          grid-column: 1 / -1;
          margin-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1.5rem;
        }

        .home-footer-bottom p {
          font-size: 13px;
          opacity: 0.7;
        }

        /* ── Responsive breakpoints ── */
        @media (max-width: 1024px) {
          .home-hero-section {
            grid-template-columns: 1fr;
            padding: 3rem 24px;
            text-align: center;
          }

          .home-hero-text {
            align-items: center;
          }

          .home-hero-image-wrap {
            height: 320px;
            max-width: 480px;
            margin: 0 auto;
          }

          .home-hero-title {
            font-size: 38px;
            line-height: 46px;
          }

          .home-story-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .home-nav-links {
            display: none;
          }

          .home-features-grid {
            grid-template-columns: 1fr;
          }

          .home-steps-grid {
            grid-template-columns: 1fr;
          }

          .home-footer-inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .home-hero-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .home-hero-buttons button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;

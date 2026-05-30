import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* TopNavBar */}
      <header className="home-header">
        <div className="home-header-inner">
          <div className="home-logo-text">Apna Courier</div>
          <nav className="home-nav-links">
            <a href="#how-it-works">How it Works</a>
            <a href="#features">Features</a>
            <a href="#our-story">Our Story</a>
          </nav>
          <button
            className="home-signin-btn"
            onClick={() => navigate('/login')}
          >
            Sign In
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>login</span>
          </button>
        </div>
      </header>

      <main style={{ paddingTop: 80 }}>
        {/* Hero Section */}
        <section className="home-hero-section">
          <div className="home-hero-text">
            <h1 className="home-hero-title">
              Your Bridge to Every Courier Service
            </h1>
            <p className="home-hero-subtitle">
              Apna Courier connects you to the world's best delivery providers in one click. Simple, fast, and reliable logistics management.
            </p>
            <div className="home-hero-buttons">
              <button
                className="home-btn-getstarted"
                onClick={() => navigate('/register')}
              >
                Get Started
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
            {/* Layered Creative Frame */}
            <div className="home-hero-frame-bg1"></div>
            <div className="home-hero-frame-bg2"></div>
            <div className="home-hero-frame-main">
              <img
                alt="Collage of logistics operations including vans, airplanes, and package scanning"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGgzTmjxZar94XHxl7ZMslxq53RYnqgn4gLuMt6YafP98XXL9wxAe5W0GHI3BXQjCw7oahCbrSdtVooIqM4DPWOnteoKXIim6acU1EqO-Job-eA-1zxHCSgWuFw-1nGyHwvV-D2XggmX81NmRHbJTBd7pV1w-0dP8JrHb-bjGxdswuXG2Jcu0rzqJHsCY6bvWyeUxGlTEUWci5UmvFxYTWY3PxI21ieZPgjMuB-5FLl1saOsimh3FZqW_Kyy41uXoHJ7QZAlYVrIIZ"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="home-features-section" id="features">
          <div className="home-container">
            <div className="home-section-header">
              <h2 className="home-section-title">Our Services</h2>
              <p className="home-section-desc">
                Streamlined middleware solutions designed for high-performance delivery management.
              </p>
            </div>
            <div className="home-features-grid">
              {[
                {
                  icon: 'location_on',
                  title: 'Real-time Global Tracking',
                  desc: 'Monitor shipments across multiple carriers through a single, unified dashboard.',
                  accent: true,
                },
                {
                  icon: 'compare_arrows',
                  title: 'Multi-carrier Comparisons',
                  desc: 'Instantly compare rates, speeds, and reliability metrics to choose the optimal provider.',
                  accent: false,
                },
                {
                  icon: 'local_shipping',
                  title: 'Instant Pickup Requests',
                  desc: 'Schedule dispatches with local and international partners seamlessly from our platform.',
                  accent: false,
                },
                {
                  icon: 'shield',
                  title: 'Secure Logistics Network',
                  desc: 'Enterprise-grade security ensuring your package data and routing information is protected.',
                  accent: false,
                },
              ].map((f, i) => (
                <div key={i} className={`home-feature-card${f.accent ? ' home-feature-card--accent' : ''}`}>
                  <div className="home-feature-icon">
                    <span className="material-symbols-outlined">{f.icon}</span>
                  </div>
                  <h3 className="home-feature-title">{f.title}</h3>
                  <p className="home-feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About & Story Section */}
        <section className="home-story-section" id="our-story">
          <div className="home-container">
            <div className="home-story-grid">
              <div className="home-story-text">
                <span className="home-story-label">Our Origins</span>
                <h2 className="home-section-title" style={{ textAlign: 'left' }}>
                  The Journey of Apna Courier
                </h2>
                <div className="home-story-body">
                  <p>
                    We started as a simple middleware solution designed to bridge the gap between small businesses and global logistics giants. Recognizing the complexity of navigating multiple shipping APIs, we set out to build a unified layer.
                  </p>
                  <p>
                    Today, Apna Courier empowers thousands of users by seamlessly integrating with industry leaders like FedEx, DHL, and extensive local provider networks. We abstract the complexity, leaving you with simple, dependable delivery management.
                  </p>
                </div>
              </div>
              <div className="home-story-awards">
                {[
                  { icon: 'military_tech', title: 'Tech Logistics Award 2023', sub: 'Industry Recognition', colorClass: 'primary' },
                  { icon: 'verified', title: 'Most Trusted Middleware', sub: 'Global Shipping Alliance', colorClass: 'secondary' },
                  { icon: 'lightbulb', title: 'Innovation in Delivery', sub: 'Excellence Awards', colorClass: 'tertiary' },
                ].map((a, i) => (
                  <div key={i} className="home-award-card">
                    <div className={`home-award-icon home-award-icon--${a.colorClass}`}>
                      <span className="material-symbols-outlined">{a.icon}</span>
                    </div>
                    <div>
                      <div className="home-award-title">{a.title}</div>
                      <div className="home-award-sub">{a.sub}</div>
                    </div>
                  </div>
                ))}
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
                Get started in three simple steps and ship your first parcel within minutes.
              </p>
            </div>
            <div className="home-steps-grid">
              {[
                { step: '01', title: 'Create Your Account', desc: 'Sign up with your business details and get instant access to our platform.' },
                { step: '02', title: 'Compare & Book', desc: 'Enter shipment details, compare rates across top couriers, and book instantly.' },
                { step: '03', title: 'Track & Deliver', desc: 'Monitor every shipment in real-time from a single, unified dashboard.' },
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
        <section className="home-cta-section">
          <div className="home-container" style={{ textAlign: 'center' }}>
            <h2 className="home-section-title">Ready to streamline your shipping?</h2>
            <p className="home-section-desc" style={{ maxWidth: 520, margin: '0 auto 2rem' }}>
              Join thousands of sellers who trust Apna Courier for their logistics needs. Start shipping smarter today.
            </p>
            <div className="home-hero-buttons" style={{ justifyContent: 'center' }}>
              <button
                className="home-btn-getstarted"
                onClick={() => navigate('/register')}
              >
                Get Started — It's Free
              </button>
              <button
                className="home-btn-viewrates"
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
            <div className="home-footer-logo">Apna Courier</div>
            <p className="home-footer-tagline">
              Connecting global logistics through intelligent middleware solutions.
            </p>
            <div className="home-footer-address">
              <p>123 Logistics Way</p>
              <p>Suite 400, Tech District</p>
              <p>contact@apnacourier.com</p>
            </div>
          </div>
          <div className="home-footer-col">
            <span className="home-footer-col-title">Legal</span>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="home-footer-col">
            <span className="home-footer-col-title">Company</span>
            <a href="#">Contact Us</a>
            <a href="#">Careers</a>
          </div>
          <div className="home-footer-bottom">
            <p>© {new Date().getFullYear()} Apna Courier. All rights reserved. Connecting global logistics.</p>
          </div>
        </div>
      </footer>

      {/* ── Scoped Styles (matches Stitch design) ── */}
      <style>{`
        /* ── Reset for Home page only ── */
        .home-page {
          font-family: 'Inter', system-ui, sans-serif;
          background: #f8f9ff;
          color: #0b1c30;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        /* ── Header ── */
        .home-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          background: #f8f9ff;
          border-bottom: 1px solid #c6c6cd;
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

        .home-logo-text {
          font-size: 24px;
          font-weight: 800;
          color: #000;
          letter-spacing: -0.01em;
        }

        .home-nav-links {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .home-nav-links a {
          font-family: 'Geist', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #45464d;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.2s;
        }

        .home-nav-links a:hover {
          color: #9d4300;
        }

        .home-signin-btn {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: #131b2e;
          color: #7c839b;
          padding: 0.5rem 1.5rem;
          border-radius: 0.5rem;
          font-family: 'Geist', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.02em;
          border: none;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(.4,0,.2,1);
        }

        .home-signin-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(19,27,46,0.25);
        }

        .home-signin-btn:active {
          transform: translateY(0);
        }

        /* ── Hero ── */
        .home-hero-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 2.5rem 16px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: center;
        }

        .home-hero-text {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          z-index: 10;
          animation: homeFadeUp 0.7s ease-out both;
        }

        @keyframes homeFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .home-hero-title {
          font-size: 48px;
          font-weight: 700;
          line-height: 56px;
          letter-spacing: -0.02em;
          color: #000;
          text-wrap: balance;
        }

        .home-hero-subtitle {
          font-size: 18px;
          line-height: 28px;
          color: #45464d;
          max-width: 560px;
        }

        .home-hero-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .home-btn-getstarted {
          background: #fd761a;
          color: #5c2400;
          padding: 1rem 2.5rem;
          border-radius: 0.5rem;
          font-family: 'Geist', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(.4,0,.2,1);
          position: relative;
          overflow: hidden;
        }

        .home-btn-getstarted::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .home-btn-getstarted:hover::before {
          left: 100%;
        }

        .home-btn-getstarted:hover {
          box-shadow: 0 8px 24px rgba(253,118,26,0.35);
          transform: translateY(-2px);
        }

        .home-btn-getstarted:active {
          transform: translateY(0);
        }

        .home-btn-viewrates {
          background: transparent;
          color: #0b1c30;
          padding: 1rem 2.5rem;
          border-radius: 0.5rem;
          font-family: 'Geist', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.02em;
          border: 1px solid #76777d;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(.4,0,.2,1);
        }

        .home-btn-viewrates:hover {
          background: #d3e4fe;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .home-btn-viewrates:active {
          transform: translateY(0);
        }

        /* ── Hero Image Frame ── */
        .home-hero-image-wrap {
          position: relative;
          height: 400px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: homeFadeUp 0.9s ease-out both;
        }

        .home-hero-frame-bg1 {
          position: absolute;
          inset: 0;
          background: #dce9ff;
          border-radius: 0.75rem;
          transform: rotate(3deg) scale(0.95);
          opacity: 0.5;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
        }

        .home-hero-frame-bg2 {
          position: absolute;
          inset: 0;
          background: #131b2e;
          border-radius: 0.75rem;
          transform: rotate(-2deg) scale(0.95);
          opacity: 0.1;
        }

        .home-hero-frame-main {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid #c6c6cd;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
          background: #fff;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
        }

        .home-hero-frame-main img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0.5rem;
        }

        /* ── Container ── */
        .home-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── Section Headers ── */
        .home-section-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 2.5rem;
        }

        .home-section-title {
          font-size: 32px;
          font-weight: 600;
          line-height: 40px;
          letter-spacing: -0.01em;
          color: #000;
          margin-bottom: 0.5rem;
        }

        .home-section-desc {
          font-size: 16px;
          line-height: 24px;
          color: #45464d;
        }

        /* ── Features ── */
        .home-features-section {
          background: #fff;
          padding: 2.5rem 16px;
          border-top: 1px solid rgba(198,198,205,0.5);
        }

        .home-features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .home-feature-card {
          background: #f8f9ff;
          padding: 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid #c6c6cd;
          transition: all 0.3s cubic-bezier(.4,0,.2,1);
          cursor: default;
        }

        .home-feature-card--accent {
          border-top: 2px solid #fd761a;
        }

        .home-feature-card:hover {
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
          transform: translateY(-4px);
        }

        .home-feature-icon {
          width: 48px;
          height: 48px;
          background: #d3e4fe;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          transition: background 0.2s;
        }

        .home-feature-card--accent .home-feature-icon {
          background: rgba(253,118,26,0.1);
        }

        .home-feature-card--accent .home-feature-icon .material-symbols-outlined {
          color: #fd761a;
        }

        .home-feature-card:hover .home-feature-icon {
          background: rgba(253,118,26,0.1);
        }

        .home-feature-icon .material-symbols-outlined {
          color: #131b2e;
          font-size: 24px;
        }

        .home-feature-title {
          font-size: 18px;
          font-weight: 600;
          color: #000;
          margin-bottom: 0.25rem;
        }

        .home-feature-desc {
          font-size: 14px;
          line-height: 20px;
          color: #45464d;
        }

        /* ── Story / About ── */
        .home-story-section {
          padding: 2.5rem 16px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .home-story-grid {
          display: grid;
          grid-template-columns: 7fr 5fr;
          gap: 2.5rem;
        }

        .home-story-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .home-story-label {
          font-family: 'Geist', 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #fd761a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .home-story-body {
          font-size: 16px;
          line-height: 24px;
          color: #45464d;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }

        .home-story-awards {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          justify-content: center;
        }

        .home-award-card {
          background: #f8f9ff;
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid #c6c6cd;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.25s;
        }

        .home-award-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }

        .home-award-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .home-award-icon--primary {
          background: #dae2fd;
          color: #131b2e;
        }

        .home-award-icon--secondary {
          background: #ffdbca;
          color: #341100;
        }

        .home-award-icon--tertiary {
          background: #d8e2ff;
          color: #001a42;
        }

        .home-award-title {
          font-family: 'Geist', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #000;
          letter-spacing: 0.02em;
        }

        .home-award-sub {
          font-family: 'Geist', 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #45464d;
          letter-spacing: 0.05em;
        }

        /* ── How It Works ── */
        .home-howitworks-section {
          background: #fff;
          padding: 4rem 16px;
          border-top: 1px solid rgba(198,198,205,0.5);
        }

        .home-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .home-step-card {
          text-align: center;
          padding: 2rem 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid #c6c6cd;
          background: #f8f9ff;
          transition: all 0.3s;
        }

        .home-step-card:hover {
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          transform: translateY(-4px);
        }

        .home-step-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          background: #131b2e;
          margin-bottom: 1.25rem;
        }

        .home-step-title {
          font-size: 18px;
          font-weight: 600;
          color: #000;
          margin-bottom: 0.5rem;
        }

        .home-step-desc {
          font-size: 14px;
          line-height: 20px;
          color: #45464d;
        }

        /* ── CTA ── */
        .home-cta-section {
          padding: 4rem 16px;
          background: #e5eeff;
          border-top: 1px solid rgba(198,198,205,0.5);
        }

        /* ── Footer ── */
        .home-footer {
          background: #131b2e;
        }

        .home-footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 2.5rem 24px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 24px;
          color: #7c839b;
        }

        .home-footer-logo {
          font-size: 18px;
          font-weight: 900;
          color: #c6c6cd;
        }

        .home-footer-tagline {
          font-size: 14px;
          line-height: 20px;
          opacity: 0.8;
          margin-top: 0.25rem;
          max-width: 280px;
        }

        .home-footer-address {
          margin-top: 1rem;
          font-size: 14px;
          line-height: 20px;
          opacity: 0.8;
        }

        .home-footer-col {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .home-footer-col-title {
          font-family: 'Geist', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.02em;
          margin-bottom: 0.25rem;
        }

        .home-footer-col a {
          font-family: 'Geist', 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #7c839b;
          text-decoration: none;
          letter-spacing: 0.05em;
          opacity: 0.8;
          transition: opacity 0.2s;
        }

        .home-footer-col a:hover {
          opacity: 1;
          color: #ffb690;
        }

        .home-footer-bottom {
          grid-column: 1 / -1;
          margin-top: 1.5rem;
          border-top: 1px solid rgba(124,131,155,0.2);
          padding-top: 1rem;
        }

        .home-footer-bottom p {
          font-size: 14px;
          opacity: 0.8;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .home-hero-section {
            grid-template-columns: 1fr;
            padding: 2.5rem 16px;
          }

          .home-hero-image-wrap {
            height: 300px;
          }

          .home-hero-title {
            font-size: 36px;
            line-height: 44px;
          }

          .home-story-grid {
            grid-template-columns: 1fr;
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
          }

          .home-hero-title {
            font-size: 28px;
            line-height: 36px;
          }

          .home-hero-subtitle {
            font-size: 16px;
            line-height: 24px;
          }

          .home-hero-buttons {
            flex-direction: column;
          }

          .home-hero-buttons button {
            width: 100%;
          }

          .home-hero-image-wrap {
            height: 240px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;

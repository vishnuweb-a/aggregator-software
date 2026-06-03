import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import shipbiharLogo from '../assets/sb3.png';

const Tracking = () => {
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState('SB-892401');
  const [progress, setProgress] = useState(0);

  // Timeline animation logic
  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById('tr-timeline-container');
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startOffset = windowHeight * 0.7;

      let newProgress = 0;
      if (containerRect.top < startOffset) {
        const totalDistance = containerRect.height;
        const scrolledDistance = startOffset - containerRect.top;
        newProgress = Math.min(Math.max((scrolledDistance / totalDistance) * 100, 0), 100);
      }
      setProgress(newProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="tr-page">
      {/* ═══ Nav Bar ═══ */}
      <nav className="tr-nav">
        <div className="tr-nav-inner">
          <div className="tr-nav-left" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img src={shipbiharLogo} alt="shipBihar" className="tr-nav-logo" />
          </div>
          <div className="tr-nav-center">
            <Link to="/" className="tr-nav-link">Home</Link>
            <Link to="/tracking" className="tr-nav-link tr-nav-link--active">Tracking</Link>
            <Link to="/network" className="tr-nav-link">Network</Link>
            <Link to="/services" className="tr-nav-link">Services</Link>
            <Link to="/about" className="tr-nav-link">About Us</Link>
          </div>
          <div className="tr-nav-right">
            <button className="tr-nav-signin" onClick={() => navigate('/login')}>Get Started</button>
          </div>
        </div>
      </nav>

      <main className="tr-main">
        {/* ═══ Hero Search Section ═══ */}
        <section className="tr-hero">
          <div className="tr-mithila-bg" />
          <div className="tr-hero-inner">
            <h1 className="tr-hero-title">Track Your Shipment</h1>
            <p className="tr-hero-desc">Enter your tracking ID to see live updates across our network.</p>
            <div className="tr-search-box">
              <span className="material-symbols-outlined tr-search-icon">search</span>
              <input
                type="text"
                className="tr-search-input"
                placeholder="Enter Tracking ID (e.g., SB-892401)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
              <button className="tr-search-btn">Track</button>
            </div>
          </div>
        </section>

        {/* ═══ Live Journey Tracker Section ═══ */}
        <section className="tr-tracker">
          <div className="tr-tracker-inner">
            {/* Status Card */}
            <div className="tr-status-card">
              <div className="tr-status-accent" />
              <div className="tr-status-left">
                <div className="tr-status-icon-wrap">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                </div>
                <div>
                  <h2 className="tr-status-title">Status: In Transit</h2>
                  <p className="tr-status-id">Tracking ID: {trackingId || 'SB-892401'}</p>
                </div>
              </div>
              <div className="tr-status-right">
                <p className="tr-status-est-label">Estimated Arrival</p>
                <p className="tr-status-est-date">July 17</p>
              </div>
            </div>

            {/* Timeline Container */}
            <div className="tr-timeline" id="tr-timeline-container">
              <div className="tr-timeline-base" />
              <div className="tr-timeline-progress" style={{ height: `${progress}%` }}>
                <div className="tr-timeline-arrow" />
              </div>

              <div className="tr-milestones">
                {/* Milestone 1 */}
                <div className={`tr-milestone-card ${progress >= 0 ? 'is-visible' : ''}`}>
                  <div className={`tr-milestone-node ${progress > 5 ? 'is-completed' : ''}`} />
                  <div className="tr-milestone-content">
                    <div className="tr-milestone-head">
                      <h3 className="tr-milestone-title">Order Received - Patna Hub</h3>
                      <span className="tr-milestone-time">10:00 AM, July 15</span>
                    </div>
                    <p className="tr-milestone-desc">Shipment data received and processing begun at origin facility.</p>
                  </div>
                </div>

                {/* Milestone 2 */}
                <div className={`tr-milestone-card ${progress >= 20 ? 'is-visible' : ''}`}>
                  <div className={`tr-milestone-node ${progress > 30 ? 'is-completed' : ''}`} />
                  <div className="tr-milestone-content">
                    <div className="tr-milestone-head">
                      <h3 className="tr-milestone-title">Package Sorted - Automated Center</h3>
                      <span className="tr-milestone-time">2:30 PM, July 15</span>
                    </div>
                    <p className="tr-milestone-desc">Package has been scanned and routed through our high-speed sorting matrix.</p>
                  </div>
                </div>

                {/* Milestone 3 */}
                <div className={`tr-milestone-card ${progress >= 45 ? 'is-visible' : ''}`}>
                  <div className={`tr-milestone-node ${progress > 55 ? 'is-completed' : ''}`} />
                  <div className="tr-milestone-content">
                    <div className="tr-milestone-head">
                      <h3 className="tr-milestone-title">In Transit - Air Cargo</h3>
                      <span className="tr-milestone-time">8:00 AM, July 16</span>
                    </div>
                    <p className="tr-milestone-desc">Departed original facility. Currently en route to destination hub.</p>
                  </div>
                </div>

                {/* Milestone 4 (Active/Current) */}
                <div className={`tr-milestone-card ${progress >= 70 ? 'is-visible' : ''}`}>
                  <div className="tr-milestone-node is-active" />
                  <div className="tr-milestone-content tr-milestone-content--active">
                    <div className="tr-mithila-bg tr-mithila-bg--dim" />
                    <div className="tr-milestone-head relative z-10">
                      <h3 className="tr-milestone-title tr-milestone-title--active">
                        <span className="material-symbols-outlined tr-milestone-title-icon">location_on</span>
                        Arrived at Local Hub - Bhagalpur
                      </h3>
                      <span className="tr-milestone-time">4:00 PM, July 16</span>
                    </div>
                    <p className="tr-milestone-desc relative z-10">Package has reached the final distribution center and is awaiting last-mile assignment.</p>
                  </div>
                </div>

                {/* Milestone 5 (Pending) */}
                <div className={`tr-milestone-card ${progress >= 85 ? 'is-visible' : ''}`}>
                  <div className="tr-milestone-node tr-milestone-node--pending" />
                  <div className="tr-milestone-content tr-milestone-content--pending">
                    <div className="tr-milestone-head">
                      <h3 className="tr-milestone-title tr-milestone-title--pending">Out for Delivery - Last Mile Van</h3>
                      <span className="tr-milestone-time tr-milestone-time--pending">Pending (Est. 9:30 AM, July 17)</span>
                    </div>
                  </div>
                </div>

                {/* Milestone 6 (Pending) */}
                <div className={`tr-milestone-card ${progress >= 95 ? 'is-visible' : ''}`}>
                  <div className="tr-milestone-node tr-milestone-node--pending" />
                  <div className="tr-milestone-content tr-milestone-content--pending">
                    <div className="tr-milestone-head">
                      <h3 className="tr-milestone-title tr-milestone-title--pending">Delivered - Handed to Customer</h3>
                      <span className="tr-milestone-time tr-milestone-time--pending">Pending (Est. 11:45 AM, July 17)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Highlights Section ═══ */}
        <section className="tr-highlights">
          <div className="tr-highlights-inner">
            <h2 className="tr-highlights-title">Powering Your Tracking Experience</h2>
            <div className="tr-highlights-grid">
              <div className="tr-highlight-item">
                <div className="tr-highlight-icon-wrap">
                  <span className="material-symbols-outlined text-3xl">sync</span>
                </div>
                <div>
                  <h3 className="tr-highlight-heading">Real-Time Data Engine</h3>
                  <p className="tr-highlight-desc">
                    Our proprietary engine fetches instant updates from a global network of courier partners, providing millisecond-accurate tracking for every leg of your shipment's journey.
                  </p>
                </div>
              </div>
              <div className="tr-highlight-item">
                <div className="tr-highlight-icon-wrap">
                  <span className="material-symbols-outlined text-3xl">support_agent</span>
                </div>
                <div>
                  <h3 className="tr-highlight-heading">Dedicated Support Hub</h3>
                  <p className="tr-highlight-desc">
                    Experience peace of mind with 24/7 dedicated support for every single shipment. Our logistics experts are always on standby to assist from pickup to final delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══ Footer ═══ */}
      <footer className="tr-footer">
        <div className="tr-footer-inner">
          <div className="tr-footer-brand-col">
            <img src={shipbiharLogo} alt="shipBihar" className="tr-footer-logo" />
            <span className="tr-footer-copy">© 2025 shipBihar Logistics. Native to Bihar, Global by Design.</span>
          </div>
          <div className="tr-footer-links">
            <a href="#" className="tr-footer-link">Privacy Policy</a>
            <a href="#" className="tr-footer-link">Terms of Service</a>
            <a href="#" className="tr-footer-link">Carrier Login</a>
            <a href="#" className="tr-footer-link">Help Center</a>
          </div>
        </div>
      </footer>

      {/* ═══ Styles ═══ */}
      <style>{`
        /* ── Page Base ── */
        .tr-page { min-height: 100vh; font-family: 'Work Sans', system-ui, sans-serif; background: #f8f9fa; color: #191c1d; display: flex; flex-direction: column; }
        .tr-main { flex-grow: 1; display: flex; flex-direction: column; }
        
        /* ── Mithila Pattern ── */
        .tr-mithila-bg {
          position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0.5;
          background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(222,193,177,0.2) 10px, rgba(222,193,177,0.2) 12px);
        }
        .tr-mithila-bg--dim { opacity: 0.1; }

        /* ── Nav ── */
        .tr-nav { position: sticky; top: 0; z-index: 100; background: #fff; border-bottom: 1px solid #dec1b1; }
        .tr-nav-inner { max-width: 1280px; margin: 0 auto; padding: 0 32px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
        .tr-nav-left { display: flex; align-items: center; }
        .tr-nav-logo { width: 200px; height: 50px; object-fit: cover; border-radius: 6px; margin-top: 12px; }
        .tr-nav-center { display: flex; gap: 32px; }
        .tr-nav-link { font-size: 16px; font-weight: 500; color: #4f5d85; text-decoration: none; padding-bottom: 4px; cursor: pointer; transition: color 0.2s; }
        .tr-nav-link:hover { color: #9a4600; }
        .tr-nav-link--active { color: #9a4600 !important; font-weight: 700; border-bottom: 2px solid #9a4600; }
        .tr-nav-signin { background: #9a4600; color: #fff; border: none; padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .tr-nav-signin:hover { background: #753400; transform: translateY(-1px); }

        /* ── Hero Search ── */
        .tr-hero { background: #fff; padding: 80px 32px 64px; position: relative; overflow: hidden; }
        .tr-hero-inner { max-width: 768px; margin: 0 auto; position: relative; z-index: 10; text-align: center; }
        .tr-hero-title { font-size: 40px; font-weight: 700; margin-bottom: 16px; }
        .tr-hero-desc { font-size: 18px; color: #574237; margin-bottom: 48px; }
        .tr-search-box { position: relative; max-width: 600px; margin: 0 auto; }
        .tr-search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #8b7265; font-size: 24px; }
        .tr-search-input { 
          width: 100%; padding: 16px 100px 16px 52px; background: #f8f9fa; 
          border: 1px solid #dec1b1; border-radius: 12px; font-size: 18px;
          outline: none; transition: all 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .tr-search-input:focus { border-color: #9a4600; box-shadow: 0 0 0 2px rgba(154,70,0,0.2); }
        .tr-search-btn {
          position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
          background: #9a4600; color: #fff; padding: 8px 16px; border-radius: 8px;
          font-weight: 600; font-size: 14px; border: none; cursor: pointer; transition: background 0.2s;
        }
        .tr-search-btn:hover { background: #753400; }

        /* ── Live Tracker ── */
        .tr-tracker { flex-grow: 1; padding: 48px 32px; }
        .tr-tracker-inner { max-width: 768px; margin: 0 auto; }
        .tr-status-card {
          background: #fff; border: 1px solid #dec1b1; border-radius: 12px;
          padding: 24px; display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 64px; position: relative; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .tr-status-accent { position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: #9a4600; }
        .tr-status-left { display: flex; align-items: center; gap: 16px; padding-left: 12px; }
        .tr-status-icon-wrap { height: 48px; width: 48px; border-radius: 50%; background: #ffdbc9; color: #9a4600; display: flex; align-items: center; justify-content: center; }
        .tr-status-title { font-size: 24px; font-weight: 600; }
        .tr-status-id { font-size: 16px; color: #574237; }
        .tr-status-right { text-align: right; }
        .tr-status-est-label { font-size: 12px; color: #8b7265; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; font-weight: 600; }
        .tr-status-est-date { font-size: 24px; font-weight: 700; color: #9a4600; }

        /* Timeline */
        .tr-timeline { position: relative; padding-bottom: 64px; }
        .tr-timeline-base { position: absolute; top: 0; bottom: 0; left: 24px; width: 4px; background: #e1e3e4; border-radius: 99px; }
        .tr-timeline-progress { position: absolute; top: 0; left: 24px; width: 4px; background: #9a4600; border-radius: 99px; transition: height 0.3s ease-out; z-index: 10; }
        .tr-timeline-arrow { position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #9a4600; }
        
        .tr-milestones { display: flex; flex-direction: column; gap: 48px; position: relative; z-index: 20; }
        .tr-milestone-card { position: relative; display: flex; align-items: flex-start; opacity: 0; transform: translateY(20px); transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .tr-milestone-card.is-visible { opacity: 1; transform: translateY(0); }
        
        .tr-milestone-node {
          position: absolute; left: 24px; top: 24px; width: 16px; height: 16px; transform: translate(-6px, -50%);
          border-radius: 50%; border: 2px solid #e1e3e4; background: #fff; transition: all 0.3s;
        }
        .tr-milestone-node.is-completed { background: #9a4600; border-color: #9a4600; }
        .tr-milestone-node.is-active {
          width: 20px; height: 20px; transform: translate(-8px, -50%);
          background: #fff; border: 2px solid #9a4600;
          box-shadow: 0 0 0 4px #ffdbc9; animation: tr-pulse-glow 2s infinite;
        }
        .tr-milestone-node--pending { border-color: #dec1b1; }
        
        @keyframes tr-pulse-glow {
          0% { box-shadow: 0 0 0 0 #ffdbc9; }
          70% { box-shadow: 0 0 0 12px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }

        .tr-milestone-content {
          margin-left: 64px; width: 100%; background: #fff; border: 1px solid #dec1b1;
          border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .tr-milestone-content--active { border: 2px solid #9a4600; position: relative; overflow: hidden; }
        .tr-milestone-content--pending { background: transparent; border: 1px dashed #dec1b1; opacity: 0.6; box-shadow: none; }
        
        .tr-milestone-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
        .tr-milestone-title { font-size: 14px; font-weight: 600; color: #191c1d; display: flex; align-items: center; gap: 4px; }
        .tr-milestone-title--active { color: #9a4600; font-size: 16px; }
        .tr-milestone-title--pending { color: #574237; }
        .tr-milestone-title-icon { font-size: 18px; }
        
        .tr-milestone-time { font-size: 12px; color: #574237; font-weight: 500; }
        .tr-milestone-time--pending { color: #8b7265; }
        .tr-milestone-desc { font-size: 16px; color: #574237; line-height: 24px; }

        /* ── Highlights ── */
        .tr-highlights { padding: 80px 32px; background: #f8f9fa; }
        .tr-highlights-inner { max-width: 1280px; margin: 0 auto; background: #f3f4f5; border-radius: 16px; padding: 64px; }
        .tr-highlights-title { font-size: 32px; font-weight: 700; text-align: center; margin-bottom: 64px; }
        .tr-highlights-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 64px; }
        .tr-highlight-item { display: flex; align-items: flex-start; gap: 24px; }
        .tr-highlight-icon-wrap { height: 56px; width: 56px; border-radius: 50%; background: #ffdbc9; color: #9a4600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .tr-highlight-heading { font-size: 24px; font-weight: 600; color: #9a4600; margin-bottom: 12px; }
        .tr-highlight-desc { font-size: 18px; color: #574237; line-height: 28px; }

        /* ── Footer ── */
        .tr-footer { background: #fff; border-top: 1px solid #dec1b1; padding: 48px 32px; }
        .tr-footer-inner { max-width: 1280px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; }
        .tr-footer-brand-col { display: flex; align-items: center; gap: 16px; }
        .tr-footer-logo { height: 28px; width: auto; opacity: 0.6; filter: grayscale(1); }
        .tr-footer-copy { font-size: 14px; color: #191c1d; }
        .tr-footer-links { display: flex; flex-wrap: wrap; gap: 24px; }
        .tr-footer-link { font-size: 14px; color: #574237; text-decoration: none; transition: color 0.2s; }
        .tr-footer-link:hover { color: #9a4600; }

        /* Responsive */
        @media (max-width: 768px) {
          .tr-nav-center { display: none; }
          .tr-status-card { flex-direction: column; align-items: flex-start; gap: 16px; padding: 16px; }
          .tr-status-right { text-align: left; }
          .tr-milestone-head { flex-direction: column; gap: 4px; }
          .tr-highlights-grid { grid-template-columns: 1fr; }
          .tr-highlight-item { flex-direction: column; align-items: center; text-align: center; }
          .tr-footer-inner { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  );
};

export default Tracking;

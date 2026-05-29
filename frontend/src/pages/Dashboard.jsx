import { useState, useEffect, useCallback, Fragment } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import {
  LogOut, Package, MapPin, Search, CheckCircle,
  Clock, CreditCard, ChevronRight, User,
  AlertCircle, ArrowLeft, Truck, Zap, Phone, Mail,
  ShieldCheck, PlusCircle, List, Home, Wallet, Download,
  Star, DollarSign, Award, Navigation, Shield,
} from 'lucide-react';

/* ─── Navbar ─────────────────────────────────────── */
const Navbar = ({ logout, view, setView }) => (
  <header style={{
    position: 'sticky', top: 0, zIndex: 50,
    background: 'var(--header-bg)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    borderBottom: '1px solid var(--header-border)',
    boxShadow: '0 10px 30px rgba(8,6,20,0.35)',
  }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <div style={{ width: 40, height: 40, borderRadius: 14, background: 'linear-gradient(135deg, var(--accent), var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 22px rgba(59,130,246,0.35)' }}>
          <Truck size={18} color="#fff" strokeWidth={2.5} />
        </div>
        <span style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--text-1)' }}>
          Apna Courier Service
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <button onClick={() => setView('profile')} className="btn-ghost" style={{ gap: '0.4rem', padding: '0.4rem 0.8rem', color: view === 'profile' ? 'var(--accent)' : undefined }}>
          <Home size={14} /> Profile
        </button>
        <button onClick={() => setView('wallet')} className="btn-ghost" style={{ gap: '0.4rem', padding: '0.4rem 0.8rem', color: view === 'wallet' ? 'var(--accent)' : undefined }}>
          <Wallet size={14} /> Wallet
        </button>
        <button onClick={() => setView('book')} className="btn-ghost" style={{ gap: '0.4rem', padding: '0.4rem 0.8rem', color: view === 'book' ? 'var(--accent)' : undefined }}>
          <PlusCircle size={14} /> New Booking
        </button>
        <button onClick={() => setView('insurance')} className="btn-ghost" style={{ gap: '0.4rem', padding: '0.4rem 0.8rem', color: view === 'insurance' ? '#a78bfa' : undefined }}>
          <Shield size={14} /> Insurance
        </button>
        <button onClick={logout} className="btn-ghost" style={{ gap: '0.4rem', padding: '0.4rem 0.8rem' }}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </div>
  </header>
);

/* ─── Info Row ───────────────────────────────────── */
const InfoRow = ({ icon: Icon, label, value }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0', borderBottom: '1px solid rgba(59,130,246,0.12)' }}>
    <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={15} color="var(--accent)" />
    </div>
    <div>
      <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>{label}</p>
      <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-1)', margin: 0 }}>{value || '—'}</p>
    </div>
  </div>
);

/* ─── Star Rating Component ─────────────────────── */
const StarRating = ({ rating = 0, max = 5 }) => (
  <div className="star-rating">
    {Array.from({ length: max }, (_, i) => (
      <span key={i} className={`star ${i < Math.round(rating) ? 'filled' : ''}`}>★</span>
    ))}
  </div>
);

/* ─── Score Bar Component ────────────────────────── */
const ScoreBar = ({ score = 0, maxScore = 100 }) => (
  <div className="score-bar" style={{ width: '100%' }}>
    <div className="score-bar-fill" style={{ width: `${Math.min((score / maxScore) * 100, 100)}%` }} />
  </div>
);

/* ─── Shipment History Card ───────────────────────── */
const ShipmentCard = ({ s, onAddInsurance }) => {
  const status = s.shipmentStatus || s.status || 'PENDING'
  return (
    <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ height: 3, background: 'linear-gradient(90deg, var(--accent), var(--purple))' }} />
      <div style={{ padding: '1.1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
          <div>
            <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.2rem' }}>AWB</p>
            <p style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1rem', color: 'var(--accent)', margin: 0 }}>{s.awb || '—'}</p>
          </div>
          <span className="badge badge-green"><CheckCircle size={10} /> {status}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.6rem' }}>
          {[
            { label: 'Provider', value: s.courierPartner },
            { label: 'Amount', value: `₹${s.price}` },
            { label: 'ETA', value: `${s.eta} Days` },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 0.15rem' }}>{label}</p>
              <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-1)', margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>
        {/* Add Insurance button */}
        {s._id && (
          <button
            onClick={() => onAddInsurance && onAddInsurance(s._id)}
            style={{
              marginTop: '0.85rem', width: '100%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '0.4rem', padding: '0.5rem 0.75rem',
              borderRadius: 10, border: '1px solid rgba(167,139,250,0.35)',
              background: 'rgba(167,139,250,0.08)', color: '#a78bfa',
              fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.18)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.08)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.35)'; }}
          >
            <Shield size={13} /> Add Insurance
          </button>
        )}
      </div>
    </div>
  )
};

/* ─── Profile View (two columns) ─────────────────── */
const ProfileView = ({ user, shipments, loadingShipments, walletBalance, onAddInsurance }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2rem', alignItems: 'start' }}>

    {/* LEFT — User Info */}
    <div className="glass-card" style={{ padding: '2rem' }}>
      {/* Avatar */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 0 28px rgba(59,130,246,0.35)' }}>
          <span style={{ fontSize: '2rem', fontWeight: 900, color: '#fff' }}>{(user?.name || 'U')[0].toUpperCase()}</span>
        </div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-1)', margin: '0 0 0.25rem' }}>{user?.name || 'User'}</h2>
        <span className="badge badge-green" style={{ fontSize: '0.7rem' }}><ShieldCheck size={10} /> Verified Account</span>
      </div>

      <InfoRow icon={Mail} label="Email" value={user?.email} />
      <InfoRow icon={Phone} label="Phone" value={user?.phoneNumber ? String(user.phoneNumber) : null} />
      <InfoRow icon={User} label="Account Status" value={user?.status || 'verified'} />
      <InfoRow icon={Wallet} label="Wallet Balance" value={walletBalance != null ? `₹${walletBalance}` : '—'} />

      <div style={{ marginTop: '1.25rem', padding: '0.9rem', background: 'rgba(59,130,246,0.07)', borderRadius: 12, border: '1px solid rgba(59,130,246,0.18)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.35rem', fontWeight: 700 }}>Total Shipments</p>
        <p style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent)', margin: 0 }}>{shipments.length}</p>
      </div>
    </div>

    {/* RIGHT — Courier History */}
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
        <List size={18} color="var(--accent)" />
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>Your Shipments</h2>
      </div>

      {loadingShipments ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-2)' }}>Loading shipments…</div>
      ) : shipments.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <Package size={40} color="var(--text-3)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ margin: '0 0 0.5rem', color: 'var(--text-1)' }}>No shipments yet</h3>
          <p style={{ color: 'var(--text-2)', fontSize: '0.85rem' }}>Book your first courier to see it here.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1rem' }}>
          {shipments.map((s, i) => <ShipmentCard key={s._id || i} s={s} onAddInsurance={onAddInsurance} />)}
        </div>
      )}
    </div>
  </div>
);

/* ─── Wallet View ─────────────────────────────────── */
const WalletView = ({ balance, loading, notice, error, onRecharge }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');

  const handleRecharge = async (e) => {
    e.preventDefault();
    setMessage('');
    setFormError('');
    const amountNumber = Number(amount);
    if (!amountNumber || amountNumber <= 0) {
      setFormError('Enter a valid recharge amount.');
      return;
    }
    try {
      const newBalance = await onRecharge(amountNumber);
      setMessage(`Wallet recharged. New balance ₹${newBalance}`);
      setAmount('');
    } catch (err) {
      setFormError(err.response?.data?.response || 'Wallet recharge failed.');
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <Wallet size={18} color="var(--accent)" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Wallet</h2>
        </div>

        {notice && <div className="alert alert-success"><CheckCircle size={16} /><span>{notice}</span></div>}
        {error && <div className="alert alert-error"><AlertCircle size={16} /><span>{error}</span></div>}
        {formError && <div className="alert alert-error"><AlertCircle size={16} /><span>{formError}</span></div>}
        {message && <div className="alert alert-success"><CheckCircle size={16} /><span>{message}</span></div>}

        <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.35rem', fontWeight: 700 }}>Current Balance</p>
          <p style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent)', margin: 0 }}>
            {loading ? 'Loading…' : (balance != null ? `₹${balance}` : '—')}
          </p>
        </div>

        <form onSubmit={handleRecharge} style={{ display: 'grid', gap: '0.9rem' }}>
          <Field label="Recharge Amount (₹)">
            <input type="number" min="1" step="1" value={amount} onChange={(e) => setAmount(e.target.value)} className="input-field no-icon" placeholder="1000" required />
          </Field>
          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%' }}>
            {loading ? <><Spinner /> Recharging…</> : 'Recharge Wallet'}
          </button>
        </form>
      </div>
    </div>
  );
};

/* ─── Booking Stepper ─────────────────────────────── */
const Spinner = ({ small }) => (
  <span style={{ width: small ? 14 : 16, height: small ? 14 : 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
);

const Field = ({ label, children }) => (
  <div><label className="field-label">{label}</label>{children}</div>
);
const FieldRow = ({ children }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>{children}</div>
);

/* ─── Recommendation Highlight Card ───────────────── */
const RecommendationCard = ({ type, courier, onSelect, loading }) => {
  if (!courier) return null;

  const configs = {
    cheapest: {
      label: '💰 Cheapest',
      tagClass: 'rec-tag rec-tag-cheapest',
      cardClass: 'rec-card rec-card-cheapest',
      icon: DollarSign,
      iconColor: '#4ade80',
      subtitle: 'Lowest price option',
    },
    fastest: {
      label: '⚡ Fastest',
      tagClass: 'rec-tag rec-tag-fastest',
      cardClass: 'rec-card rec-card-fastest',
      icon: Zap,
      iconColor: '#fbbf24',
      subtitle: 'Quickest delivery',
    },
    recommended: {
      label: '🏆 Best Overall',
      tagClass: 'rec-tag rec-tag-best',
      cardClass: 'rec-card rec-card-best',
      icon: Award,
      iconColor: '#c084fc',
      subtitle: 'Top rated by score',
    },
  };

  const cfg = configs[type] || configs.recommended;
  const Icon = cfg.icon;

  return (
    <div className={cfg.cardClass} onClick={() => onSelect(courier.courierId)}>
      <div style={{ padding: '1.35rem' }}>
        {/* Tag + Icon */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span className={cfg.tagClass}>{cfg.label}</span>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${cfg.iconColor}15`, border: `1px solid ${cfg.iconColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={16} color={cfg.iconColor} />
          </div>
        </div>

        {/* Provider */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-1)', margin: '0 0 0.2rem' }}>{courier.provider}</h3>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', margin: '0 0 1rem' }}>{cfg.subtitle}</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
          <div>
            <p style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.2rem' }}>Price</p>
            <p style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-1)', margin: 0 }}>₹{Math.round(courier.price)}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.2rem' }}>ETA</p>
            <p style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-1)', margin: 0 }}>{courier.eta} Day{courier.eta !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Rating + Score */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          {courier.rating != null && <StarRating rating={courier.rating} />}
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-2)' }}>Score: {courier.score}</span>
        </div>

        <ScoreBar score={courier.score} />

        {/* Select button */}
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(courier.courierId); }}
          disabled={loading}
          className="btn-primary"
          style={{ width: '100%', marginTop: '1rem', padding: '0.7rem', borderRadius: 14 }}
        >
          {loading ? <Spinner small /> : <>Select <ChevronRight size={16} /></>}
        </button>
      </div>
    </div>
  );
};

/* ─── All Couriers Card ───────────────────────────── */
const AllCourierCard = ({ courier, onSelect, loading }) => (
  <div className="glass-card" style={{ overflow: 'hidden' }}>
    <div style={{ height: 3, background: 'linear-gradient(90deg, var(--accent), var(--purple))' }} />
    <div style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{ fontWeight: 800, fontSize: '1rem' }}>{courier.provider}</span>
        <span className="badge badge-blue"><CheckCircle size={10} /> Active</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-2)' }}><Clock size={14} color="var(--text-3)" />{courier.eta} Day{courier.eta !== 1 ? 's' : ''} Delivery</div>
        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-2)' }}><CreditCard size={14} color="var(--text-3)" />₹{Math.round(courier.price)}</div>
      </div>

      {/* Rating + Score */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
        {courier.rating != null && <StarRating rating={courier.rating} />}
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-3)' }}>Score: {courier.score}</span>
      </div>
      <ScoreBar score={courier.score} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', marginTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
        <div>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.15rem' }}>Total</p>
          <p style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-1)', margin: 0 }}>₹{Math.round(courier.price)}</p>
        </div>
        <button onClick={() => onSelect(courier.courierId)} disabled={loading} className="btn-primary" style={{ padding: '0.6rem 1rem', minWidth: 'auto', borderRadius: 10 }}>
          {loading ? <Spinner small /> : <ChevronRight size={18} />}
        </button>
      </div>
    </div>
  </div>
);

/* ─── Address Form Section (with auto-fill) ───────── */
const AddressFields = ({ prefix, label, emoji, color, address, onChange }) => {
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeMsg, setPincodeMsg] = useState('');
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [citySearchLoading, setCitySearchLoading] = useState(false);

  const handleChange = (field) => (e) => {
    const val = e.target.value;
    onChange({ ...address, [field]: val });

    // Auto-fill city/state when pincode reaches 6 digits
    if (field === 'pincode' && /^\d{6}$/.test(val)) {
      lookupPincode(val);
    }
    if (field === 'pincode' && val.length < 6) {
      setPincodeMsg('');
    }

    // Search pincodes when city is typed (3+ chars)
    if (field === 'city' && val.length >= 3) {
      searchCity(val);
    }
    if (field === 'city' && val.length < 3) {
      setCitySuggestions([]);
      setShowCitySuggestions(false);
    }
  };

  const lookupPincode = async (pincode) => {
    setPincodeLoading(true);
    setPincodeMsg('');
    try {
      const r = await api.get(`/pincode/lookup/${pincode}`);
      onChange({
        ...address,
        pincode,
        city: r.data.city || address.city,
        state: r.data.state || address.state,
      });
      setPincodeMsg(`✓ ${r.data.city}, ${r.data.state}`);
    } catch {
      setPincodeMsg('Pincode not found in database');
    } finally {
      setPincodeLoading(false);
    }
  };

  const searchCity = async (cityName) => {
    setCitySearchLoading(true);
    try {
      const r = await api.get(`/pincode/search?city=${encodeURIComponent(cityName)}`);
      setCitySuggestions(r.data.results || []);
      setShowCitySuggestions(true);
    } catch {
      setCitySuggestions([]);
    } finally {
      setCitySearchLoading(false);
    }
  };

  const selectCitySuggestion = (item) => {
    onChange({
      ...address,
      pincode: item.pincode,
      city: item.city,
      state: item.state,
    });
    setPincodeMsg(`✓ ${item.city}, ${item.state}`);
    setCitySuggestions([]);
    setShowCitySuggestions(false);
  };

  const pincodeValid = address.pincode.length === 6 && /^\d{6}$/.test(address.pincode);
  const pincodeClass = address.pincode.length === 0 ? '' : (pincodeValid ? 'pincode-valid' : 'pincode-invalid');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <p style={{ fontWeight: 700, fontSize: '0.85rem', color, margin: 0 }}>{emoji} {label}</p>

      <div className="address-grid">
        <div className="full-width">
          <Field label="Full Address">
            <textarea
              value={address.fullAddress}
              onChange={handleChange('fullAddress')}
              className="input-field"
              rows={2}
              placeholder="House/Building No., Street, Area…"
              required
            />
          </Field>
        </div>
        <Field label="Landmark">
          <input type="text" value={address.landmark} onChange={handleChange('landmark')} className="input-field no-icon" placeholder="Near…" />
        </Field>

        {/* City with suggestions dropdown */}
        <div style={{ position: 'relative' }}>
          <Field label="City">
            <input
              type="text"
              value={address.city}
              onChange={handleChange('city')}
              onFocus={() => citySuggestions.length > 0 && setShowCitySuggestions(true)}
              onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
              className="input-field no-icon"
              placeholder="Mumbai"
              required
            />
          </Field>
          {showCitySuggestions && citySuggestions.length > 0 && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 20,
              background: 'rgba(18,24,41,0.98)', border: '1px solid var(--border)',
              borderRadius: 14, marginTop: 4, maxHeight: 200, overflowY: 'auto',
              boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(20px)',
            }}>
              {citySuggestions.map((item, i) => (
                <div
                  key={`${item.pincode}-${i}`}
                  onClick={() => selectCitySuggestion(item)}
                  style={{
                    padding: '0.65rem 1rem', cursor: 'pointer',
                    borderBottom: i < citySuggestions.length - 1 ? '1px solid rgba(59,130,246,0.1)' : 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59,130,246,0.12)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-1)' }}>{item.city}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginLeft: '0.5rem' }}>{item.state}</span>
                  </div>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.8rem', color: 'var(--accent)' }}>{item.pincode}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Field label="State">
          <input type="text" value={address.state} onChange={handleChange('state')} className="input-field no-icon" placeholder="Maharashtra" required />
        </Field>

        {/* Pincode with auto-fill indicator */}
        <div className="pincode-field">
          <Field label="Pincode ✱">
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                maxLength={6}
                value={address.pincode}
                onChange={handleChange('pincode')}
                className={`input-field no-icon ${pincodeClass}`}
                placeholder="400001"
                pattern="[0-9]{6}"
                required
              />
              {pincodeLoading && (
                <span style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  width: 14, height: 14, border: '2px solid rgba(59,130,246,0.3)',
                  borderTopColor: 'var(--accent)', borderRadius: '50%',
                  display: 'inline-block', animation: 'spin 0.7s linear infinite',
                }} />
              )}
            </div>
          </Field>
          {pincodeMsg && (
            <p style={{
              fontSize: '0.72rem', marginTop: '0.25rem',
              color: pincodeMsg.startsWith('✓') ? 'var(--green)' : 'var(--text-3)',
              fontWeight: 600,
            }}>
              {pincodeMsg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};


/* ─── Main Booking View ───────────────────────────── */
const BookingView = ({ onBooked, walletBalance, walletLoading, refreshWalletBalance, rechargeWallet, onWalletBalanceUpdate }) => {
  const [step, setStep] = useState(1);
  const [parcelData, setParcelData] = useState({
    senderName: '', senderEmail: '', senderPhoneNumber: '',
    senderAddress: { fullAddress: '', landmark: '', city: '', state: '', pincode: '' },
    receiverName: '', receiverPhone: '',
    receiverAddress: { fullAddress: '', landmark: '', city: '', state: '', pincode: '' },
    DelevarableType: '', weight: '', courierType: 'docx', mode: 'SURFACE'
  });
  const [createdParcelId, setCreatedParcelId] = useState(null);
  const [selectedCourierId, setSelectedCourierId] = useState(null);
  const [recommendations, setRecommendations] = useState({ cheapest: null, fastest: null, recommended: null });
  const [allCouriers, setAllCouriers] = useState([]);
  const [pendingShipment, setPendingShipment] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [utr, setUtr] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState('');
  const [walletTopup, setWalletTopup] = useState('');
  const [walletMessage, setWalletMessage] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);

  const onFieldChange = e => setParcelData({ ...parcelData, [e.target.name]: e.target.value });
  const onSenderAddressChange = (addr) => setParcelData({ ...parcelData, senderAddress: addr });
  const onReceiverAddressChange = (addr) => setParcelData({ ...parcelData, receiverAddress: addr });

  useEffect(() => {
    if (step === 3 && refreshWalletBalance) {
      refreshWalletBalance();
    }
  }, [step, refreshWalletBalance]);

  /* Step 1: Create Parcel */
  const handleCreateParcel = async (e) => {
    e.preventDefault(); setLoading(true); setError('');

    // Validate pincodes
    if (parcelData.senderAddress.pincode.length !== 6 || !/^\d{6}$/.test(parcelData.senderAddress.pincode)) {
      setError('Sender pincode must be exactly 6 digits.'); setLoading(false); return;
    }
    if (parcelData.receiverAddress.pincode.length !== 6 || !/^\d{6}$/.test(parcelData.receiverAddress.pincode)) {
      setError('Receiver pincode must be exactly 6 digits.'); setLoading(false); return;
    }

    try {
      const payload = {
        senderName: parcelData.senderName,
        senderEmail: parcelData.senderEmail,
        senderPhoneNumber: parcelData.senderPhoneNumber,
        senderAddress: parcelData.senderAddress,
        receiverName: parcelData.receiverName,
        receiverPhone: parcelData.receiverPhone,
        receiverAddress: parcelData.receiverAddress,
        DelevarableType: parcelData.DelevarableType,
        weight: Number(parcelData.weight),
        courierType: parcelData.courierType,
        mode: parcelData.mode,
      };

      const r = await api.post('/user/parcel', payload);
      const parcelId = r.data.parcel._id;
      setCreatedParcelId(parcelId);

      // Get courier options (returns { parcel, couriers: { cheapest, fastest, recommended, all } })
      const cr = await api.post(`/user/courier/${parcelId}`);
      const couriersData = cr.data.couriers;

      setRecommendations({
        cheapest: couriersData.cheapest || null,
        fastest: couriersData.fastest || null,
        recommended: couriersData.recommended || null,
      });
      setAllCouriers(couriersData.all || []);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.response || 'Failed to create parcel');
    } finally {
      setLoading(false);
    }
  };

  /* Step 2: Confirm Courier */
  const handleConfirm = async (courierId, recommendationType) => {
    setLoading(true); setError('');
    try {
      const r = await api.post('/user/parcel/confirmOrder', { parcelId: createdParcelId, courierId, recommendationType });
      setSelectedCourierId(courierId);
      setPendingShipment(r.data.shipment);
      setPaymentInfo(r.data.payment);
      setStep(3);
      setWalletMessage('');
      if (refreshWalletBalance) {
        await refreshWalletBalance();
      }
    } catch (err) { setError(err.response?.data?.response || 'Failed to confirm'); }
    finally { setLoading(false); }
  };

  const handleVerifyPayment = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const r = await api.post('/user/payment/verify', {
        shipmentId: pendingShipment?.shipmentId || pendingShipment?._id,
        utrNumber: utr,
        paymentScreenshot: paymentScreenshot || '',
      });
      setSuccessData(r.data.shipment);
      setStep(4);
    } catch (err) {
      setError(err.response?.data?.response || 'Payment verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleWalletTopup = async (e) => {
    e.preventDefault();
    setError('');
    setWalletMessage('');
    const amountNumber = Number(walletTopup);
    if (!amountNumber || amountNumber <= 0) {
      setError('Enter a valid top-up amount.');
      return;
    }
    try {
      const newBalance = await rechargeWallet(amountNumber);
      setWalletMessage(`Wallet topped up. Balance ₹${newBalance}`);
      setWalletTopup('');
    } catch (err) {
      setError(err.response?.data?.response || 'Wallet recharge failed.');
    }
  };

  const handlePayWithWallet = async () => {
    setLoading(true); setError('');
    try {
      if (!createdParcelId || !selectedCourierId) {
        setError('Courier selection is missing.');
        return;
      }
      const payableAmount = Number(paymentInfo?.amount || pendingShipment?.amount || pendingShipment?.price || 0);
      if (walletBalance == null) {
        setError('Wallet balance not loaded yet.');
        return;
      }
      if (walletBalance < payableAmount) {
        setError('Insufficient wallet balance.');
        return;
      }
      const r = await api.post('/user/payment/wallet', { parcelId: createdParcelId, courierId: selectedCourierId });
      const successPayload = {
        _id: r.data.shipmentId,
        awb: r.data.awb,
        courierPartner: pendingShipment?.courier || pendingShipment?.courierPartner,
        price: payableAmount,
        eta: pendingShipment?.eta,
        paymentStatus: 'PAID',
        shipmentStatus: 'BOOKED',
      };
      setSuccessData(successPayload);
      setStep(4);
      if (typeof r.data.walletBalance === 'number' && onWalletBalanceUpdate) {
        onWalletBalanceUpdate(r.data.walletBalance);
      }
    } catch (err) {
      setError(err.response?.data?.response || 'Wallet payment failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReceipt = async () => {
    const shipId = successData?.shipmentId || successData?._id;
    if (!shipId) return;
    setDownloading(true);
    setError('');
    try {
      const response = await api.post(`/user/payment/recipt/${shipId}`, {}, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      const disposition = response.headers?.['content-disposition'] || '';
      const match = /filename=([^;]+)/i.exec(disposition);
      const filename = match ? match[1].replace(/"/g, '').trim() : `shipment-${successData.awb || shipId}.pdf`;
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.response?.data?.response || 'Failed to download invoice.');
    } finally {
      setDownloading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setCreatedParcelId(null);
    setSelectedCourierId(null);
    setRecommendations({ cheapest: null, fastest: null, recommended: null });
    setAllCouriers([]);
    setPendingShipment(null);
    setPaymentInfo(null);
    setUtr('');
    setPaymentScreenshot('');
    setWalletTopup('');
    setWalletMessage('');
    setDownloading(false);
    setSuccessData(null);
    setParcelData({
      senderName: '', senderEmail: '', senderPhoneNumber: '',
      senderAddress: { fullAddress: '', landmark: '', city: '', state: '', pincode: '' },
      receiverName: '', receiverPhone: '',
      receiverAddress: { fullAddress: '', landmark: '', city: '', state: '', pincode: '' },
      DelevarableType: '', weight: '', courierType: 'docx', mode: 'SURFACE'
    });
  };

  const payableAmount = Number(paymentInfo?.amount || pendingShipment?.amount || pendingShipment?.price || 0);
  const walletCanPay = walletBalance != null && walletBalance >= payableAmount;

  return (
    <div>
      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
        {['Parcel Details', 'Select Courier', 'Payment', 'Confirmed'].map((label, i) => (
          <Fragment key={label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, background: step > i + 1 ? 'var(--green)' : step === i + 1 ? 'var(--accent)' : 'rgba(255,255,255,0.05)', color: step >= i + 1 ? '#fff' : 'var(--text-3)', border: step < i + 1 ? '1px solid var(--border)' : 'none' }}>
                {step > i + 1 ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: step === i + 1 ? 'var(--accent)' : 'var(--text-3)' }}>{label}</span>
            </div>
            {i < 3 && <div style={{ flex: 1, height: 1, background: step > i + 1 ? 'var(--green)' : 'var(--border)', maxWidth: 60 }} />}
          </Fragment>
        ))}
      </div>

      {error && <div className="alert alert-error" style={{ maxWidth: 900, margin: '0 auto 1.5rem' }}><AlertCircle size={16} /><span>{error}</span></div>}

      {/* ═══ Step 1: Parcel Details ═══ */}
      {step === 1 && (
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden', maxWidth: 960, margin: '0 auto' }}>
          <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, var(--accent), var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={16} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>New Consignment</h2>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-3)', margin: 0 }}>Fill in sender & receiver details with pincode</p>
            </div>
          </div>
          <form onSubmit={handleCreateParcel}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: '2rem', padding: '1.75rem' }}>

              {/* Sender side */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <FieldRow>
                  <Field label="Sender Name">
                    <input type="text" name="senderName" value={parcelData.senderName} onChange={onFieldChange} className="input-field no-icon" placeholder="Jane Smith" required />
                  </Field>
                  <Field label="Phone">
                    <input type="text" name="senderPhoneNumber" value={parcelData.senderPhoneNumber} onChange={onFieldChange} className="input-field no-icon" placeholder="9876543210" required />
                  </Field>
                </FieldRow>
                <Field label="Email">
                  <input type="email" name="senderEmail" value={parcelData.senderEmail} onChange={onFieldChange} className="input-field no-icon" placeholder="jane@example.com" required />
                </Field>
                <AddressFields
                  prefix="sender"
                  label="Pickup Address"
                  emoji="📦"
                  color="var(--accent)"
                  address={parcelData.senderAddress}
                  onChange={onSenderAddressChange}
                />
              </div>

              {/* Receiver side */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <FieldRow>
                  <Field label="Receiver Name">
                    <input type="text" name="receiverName" value={parcelData.receiverName} onChange={onFieldChange} className="input-field no-icon" placeholder="John Doe" required />
                  </Field>
                  <Field label="Phone">
                    <input type="text" name="receiverPhone" value={parcelData.receiverPhone} onChange={onFieldChange} className="input-field no-icon" placeholder="9876543210" required />
                  </Field>
                </FieldRow>
                <AddressFields
                  prefix="receiver"
                  label="Delivery Address"
                  emoji="🏠"
                  color="var(--green)"
                  address={parcelData.receiverAddress}
                  onChange={onReceiverAddressChange}
                />
                <FieldRow>
                  <Field label="Package Type">
                    <input type="text" name="DelevarableType" value={parcelData.DelevarableType} onChange={onFieldChange} className="input-field no-icon" placeholder="Document, Electronics…" required />
                  </Field>
                  <Field label="Weight (kg)">
                    <input type="number" step="0.1" min="0.1" name="weight" value={parcelData.weight} onChange={onFieldChange} className="input-field no-icon" placeholder="0.5" required />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Courier Type">
                    <select name="courierType" value={parcelData.courierType} onChange={onFieldChange} className="input-field no-icon" required>
                      <option value="docx">Document (docx)</option>
                      <option value="nonDocx">Non-Document (nonDocx)</option>
                    </select>
                  </Field>
                  <Field label="Mode">
                    <select name="mode" value={parcelData.mode} onChange={onFieldChange} className="input-field no-icon" required>
                      <option value="SURFACE">Surface (Standard)</option>
                      <option value="AIRWAY">Airway (Fast, 1.5x Cost)</option>
                    </select>
                  </Field>
                </FieldRow>
              </div>

            </div>
            <div style={{ padding: '1rem 1.75rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: 'auto' }}>
                <Navigation size={14} color="var(--text-3)" />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>
                  {parcelData.senderAddress.pincode && parcelData.receiverAddress.pincode
                    ? `${parcelData.senderAddress.pincode} → ${parcelData.receiverAddress.pincode}`
                    : 'Enter pincodes to find couriers'}
                </span>
              </div>
              <button type="submit" disabled={loading} className="btn-primary" style={{ minWidth: 180 }}>
                {loading ? <><Spinner /> Searching…</> : <><Search size={16} /> Find Couriers</>}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ═══ Step 2: Courier Selection ═══ */}
      {step === 2 && (
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Choose Your Courier</h2>
            <button onClick={() => setStep(1)} className="btn-ghost" style={{ gap: '0.4rem' }}><ArrowLeft size={14} /> Edit Details</button>
          </div>

          {/* No couriers */}
          {allCouriers.length === 0 && !recommendations.cheapest && (
            <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
              <Truck size={32} color="var(--text-3)" style={{ margin: '0 auto 1rem' }} />
              <p style={{ color: 'var(--text-2)' }}>No couriers found for this pincode route.</p>
              <button onClick={() => setStep(1)} className="btn-ghost" style={{ marginTop: '1rem' }}>Try different pincodes</button>
            </div>
          )}

          {/* Recommendations Section */}
          {(recommendations.cheapest || recommendations.fastest || recommendations.recommended) && (
            <>
              <div className="section-header">
                <Star size={18} color="var(--orange)" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--text-1)' }}>🌟 Recommended For You</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <RecommendationCard type="cheapest" courier={recommendations.cheapest} onSelect={(id) => handleConfirm(id, 'cheapest')} loading={loading} />
                <RecommendationCard type="fastest" courier={recommendations.fastest} onSelect={(id) => handleConfirm(id, 'fastest')} loading={loading} />
                <RecommendationCard type="recommended" courier={recommendations.recommended} onSelect={(id) => handleConfirm(id, 'recommended')} loading={loading} />
              </div>
            </>
          )}

          {/* All Couriers Section */}
          {allCouriers.length > 0 && (
            <>
              <div className="section-header">
                <List size={18} color="var(--accent)" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--text-1)' }}>📋 All Available Couriers</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.25rem' }}>
                {allCouriers.map((c, i) => (
                  <AllCourierCard key={c.courierId || i} courier={c} onSelect={(id) => handleConfirm(id, 'all')} loading={loading} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ═══ Step 3: Payment ═══ */}
      {step === 3 && pendingShipment && (
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CreditCard size={16} color="var(--accent)" />
              </div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Complete Payment</h2>
            </div>
            <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Your booking is created. Please pay to confirm the shipment.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div className="glass-card" style={{ padding: '1rem' }}>
                <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.35rem' }}>Amount</p>
                <p style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent)', margin: 0 }}>₹{paymentInfo?.amount || pendingShipment.amount || pendingShipment.price}</p>
              </div>
              <div className="glass-card" style={{ padding: '1rem' }}>
                <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.35rem' }}>Courier</p>
                <p style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{pendingShipment.courier || pendingShipment.courierPartner}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-2)', margin: '0.2rem 0 0' }}>ETA {pendingShipment.eta} days</p>
              </div>
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-2)', marginBottom: '0.4rem' }}>Pay using UPI</p>
              <a href={paymentInfo?.upiUrl || pendingShipment.upiUrl} className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                Open UPI Payment Link
              </a>
            </div>
            <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.25rem' }}>Wallet Balance</p>
                  <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>
                    {walletLoading ? 'Loading…' : (walletBalance != null ? `₹${walletBalance}` : '—')}
                  </p>
                </div>
                <button type="button" onClick={handlePayWithWallet} disabled={loading || walletLoading || !walletCanPay} className="btn-primary" style={{ padding: '0.6rem 1.2rem' }}>
                  {loading ? <Spinner small /> : 'Pay with Wallet'}
                </button>
              </div>
              {!walletCanPay && walletBalance != null && (
                <p style={{ marginTop: '0.6rem', fontSize: '0.8rem', color: 'var(--text-2)' }}>
                  Insufficient wallet balance for ₹{payableAmount}. Top up to continue.
                </p>
              )}
              {walletMessage && (
                <p style={{ marginTop: '0.6rem', fontSize: '0.8rem', color: 'var(--green)' }}>{walletMessage}</p>
              )}
              <form onSubmit={handleWalletTopup} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.6rem', marginTop: '0.85rem' }}>
                <input type="number" min="1" step="1" value={walletTopup} onChange={(e) => setWalletTopup(e.target.value)} className="input-field no-icon" placeholder="Top up amount" />
                <button type="submit" disabled={loading || walletLoading} className="btn-ghost" style={{ padding: '0.6rem 1rem' }}>
                  Top Up
                </button>
              </form>
            </div>
            <form onSubmit={handleVerifyPayment} style={{ display: 'grid', gap: '0.9rem' }}>
              <Field label="UTR / Transaction ID">
                <input type="text" value={utr} onChange={(e) => setUtr(e.target.value)} className="input-field no-icon" placeholder="Enter UTR" required />
              </Field>
              <Field label="Payment Screenshot URL (optional)">
                <input type="text" value={paymentScreenshot} onChange={(e) => setPaymentScreenshot(e.target.value)} className="input-field no-icon" placeholder="https://..." />
              </Field>
              <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                {loading ? <><Spinner /> Verifying…</> : <><ShieldCheck size={16} /> Verify Payment</>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ═══ Step 4: Confirmation ═══ */}
      {step === 4 && successData && (
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 220, height: 220, background: 'rgba(34,197,94,0.12)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '2px solid rgba(16,185,129,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 0 28px var(--green-glow)' }}>
              <CheckCircle size={34} color="var(--green)" strokeWidth={2} />
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, margin: '0 0 0.5rem' }}>Booking Confirmed!</h2>
            <p style={{ color: 'var(--text-2)', marginBottom: '1.75rem', fontSize: '0.9rem' }}>Your shipment has been successfully scheduled.</p>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.25rem', textAlign: 'left', marginBottom: '1.75rem' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.25rem' }}>Tracking Number (AWB)</p>
              <p style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1.4rem', color: 'var(--accent)', margin: '0 0 1rem' }}>{successData.awb}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
                {[
                  { l: 'Provider', v: successData.courierPartner || successData.courier },
                  { l: 'Amount Paid', v: `₹${successData.price || successData.amount}` },
                  { l: 'Status', v: successData.shipmentStatus || successData.status },
                  { l: 'ETA', v: `${successData.eta} Days` }
                ].map(({ l, v }) => (
                  <div key={l}>
                    <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 0.15rem' }}>{l}</p>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-1)', margin: 0 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleDownloadReceipt} disabled={downloading} className="btn-ghost" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.9rem' }}>
              {downloading ? <><Spinner small /> Downloading…</> : <><Download size={14} /> Download Invoice PDF</>}
            </button>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={reset} className="btn-primary" style={{ flex: 1, padding: '0.85rem' }}><Zap size={15} /> Book Another</button>
              <button onClick={onBooked} className="btn-ghost" style={{ flex: 1 }}><List size={14} /> View Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Insurance View ─────────────────────────────── */
const InsuranceView = ({ prefillShipmentId = '' }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    shipmentId: prefillShipmentId,
    amount: '',
    mode: 'SURFACE',
    deligacy: 'Normal',
  });
  const [createdInsurance, setCreatedInsurance] = useState(null);
  const [upiUrl, setUpiUrl] = useState('');
  const [insuranceAmount, setInsuranceAmount] = useState(null);
  const [utr, setUtr] = useState('');
  const [screenshot, setScreenshot] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmedInsurance, setConfirmedInsurance] = useState(null);

  // Sync prefill if parent changes it
  useEffect(() => {
    setForm(f => ({ ...f, shipmentId: prefillShipmentId }));
    setStep(1);
    setCreatedInsurance(null);
    setError('');
  }, [prefillShipmentId]);

  const rateLabel = { Normal: '5%', Fragile: '10%', Electronics: '20%' };

  /* Step 1: Create Insurance */
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const r = await api.post('/insurance', {
        shipmentId: form.shipmentId.trim(),
        amount: Number(form.amount),
        mode: form.mode,
        deligacy: form.deligacy,
      });
      setCreatedInsurance(r.data.insurance);
      setInsuranceAmount(r.data.insuranceAmount);
      setUpiUrl(r.data.upiUrl);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.response || 'Failed to create insurance');
    } finally {
      setLoading(false);
    }
  };

  /* Step 2: Verify Payment */
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const r = await api.post('/insurance/validate', {
        insuranceId: createdInsurance._id,
        utrNumber: utr,
        paymentScreenshot: screenshot || undefined,
      });
      setConfirmedInsurance(r.data.insurance);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.response || 'Payment verification failed');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setForm({ shipmentId: '', amount: '', mode: 'SURFACE', deligacy: 'Normal' });
    setCreatedInsurance(null); setUpiUrl(''); setInsuranceAmount(null);
    setUtr(''); setScreenshot(''); setError(''); setConfirmedInsurance(null);
  };

  const steps = ['Create Insurance', 'Pay Premium', 'Confirmed'];

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px rgba(124,58,237,0.35)' }}>
          <Shield size={20} color="#fff" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 900, margin: 0, color: 'var(--text-1)' }}>Shipment Insurance</h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-3)', margin: 0 }}>Protect your consignment against loss or damage</p>
        </div>
      </div>

      {/* Step Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
        {steps.map((label, i) => (
          <Fragment key={label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800,
                background: step > i + 1 ? '#7c3aed' : step === i + 1 ? '#a78bfa' : 'rgba(255,255,255,0.05)',
                color: step >= i + 1 ? '#fff' : 'var(--text-3)',
                border: step < i + 1 ? '1px solid var(--border)' : 'none',
                transition: 'all 0.3s',
              }}>
                {step > i + 1 ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: step === i + 1 ? '#a78bfa' : 'var(--text-3)' }}>{label}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: step > i + 1 ? '#7c3aed' : 'var(--border)', maxWidth: 60, transition: 'all 0.3s' }} />}
          </Fragment>
        ))}
      </div>

      {error && (
        <div className="alert alert-error" style={{ marginBottom: '1.25rem' }}>
          <AlertCircle size={16} /><span>{error}</span>
        </div>
      )}

      {/* ═══ Step 1: Create ═══ */}
      {step === 1 && (
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ height: 4, background: 'linear-gradient(90deg, #7c3aed, #a78bfa)' }} />
          <div style={{ padding: '2rem' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', marginBottom: '1.5rem' }}>
              Fill in the details below. Your insurance premium is calculated based on the declared value and delicacy of the goods.
            </p>
            <form onSubmit={handleCreate} style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label className="field-label">Shipment ID</label>
                <input
                  type="text"
                  value={form.shipmentId}
                  onChange={e => setForm({ ...form, shipmentId: e.target.value })}
                  className="input-field no-icon"
                  placeholder="Paste the MongoDB shipment _id"
                  required
                />
              </div>

              <div>
                <label className="field-label">Declared Value (₹)</label>
                <input
                  type="number" min="1" step="1"
                  value={form.amount}
                  onChange={e => setForm({ ...form, amount: e.target.value })}
                  className="input-field no-icon"
                  placeholder="e.g. 5000"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label className="field-label">Mode</label>
                  <select value={form.mode} onChange={e => setForm({ ...form, mode: e.target.value })} className="input-field no-icon" required>
                    <option value="SURFACE">Surface</option>
                    <option value="AIRWAY">Airway</option>
                  </select>
                </div>
                <div>
                  <label className="field-label">Delicacy</label>
                  <select value={form.deligacy} onChange={e => setForm({ ...form, deligacy: e.target.value })} className="input-field no-icon" required>
                    <option value="Normal">Normal ({rateLabel.Normal} premium)</option>
                    <option value="Fragile">Fragile ({rateLabel.Fragile} premium)</option>
                    <option value="Electronics">Electronics ({rateLabel.Electronics} premium)</option>
                  </select>
                </div>
              </div>

              {/* Premium Preview */}
              {form.amount && Number(form.amount) > 0 && (
                <div style={{
                  padding: '1rem', borderRadius: 12,
                  background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(167,139,250,0.25)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.2rem' }}>Estimated Premium</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 900, color: '#a78bfa', margin: 0 }}>
                      ₹{(Number(form.amount) * (form.deligacy === 'Electronics' ? 0.2 : form.deligacy === 'Fragile' ? 0.1 : 0.05)).toFixed(2)}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.2rem' }}>Rate</p>
                    <p style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>{rateLabel[form.deligacy]} of ₹{form.amount}</p>
                  </div>
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
                {loading ? <><Spinner /> Calculating…</> : <><Shield size={16} /> Get Insurance</>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ═══ Step 2: Pay ═══ */}
      {step === 2 && createdInsurance && (
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ height: 4, background: 'linear-gradient(90deg, #7c3aed, #a78bfa)' }} />
          <div style={{ padding: '2rem' }}>
            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="glass-card" style={{ padding: '1rem' }}>
                <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.35rem' }}>Insurance Premium</p>
                <p style={{ fontSize: '1.6rem', fontWeight: 900, color: '#a78bfa', margin: 0 }}>₹{insuranceAmount}</p>
              </div>
              <div className="glass-card" style={{ padding: '1rem' }}>
                <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.35rem' }}>Coverage</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>₹{createdInsurance.amount}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', margin: '0.15rem 0 0' }}>{createdInsurance.deligacy} · {createdInsurance.mode}</p>
              </div>
            </div>

            {/* UPI Link */}
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-2)', marginBottom: '0.5rem', fontWeight: 600 }}>Pay via UPI</p>
              <a
                href={upiUrl}
                className="btn-ghost"
                style={{ width: '100%', justifyContent: 'center', borderColor: 'rgba(167,139,250,0.4)', color: '#a78bfa' }}
              >
                🔗 Open UPI Payment Link
              </a>
            </div>

            <div style={{ padding: '0.75rem 1rem', borderRadius: 10, background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.2)', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', margin: 0 }}>
                📋 Insurance ID: <span style={{ fontFamily: 'monospace', color: '#a78bfa', fontWeight: 700 }}>{createdInsurance._id}</span>
              </p>
            </div>

            <form onSubmit={handleVerify} style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label className="field-label">UTR / Transaction ID</label>
                <input
                  type="text" value={utr}
                  onChange={e => setUtr(e.target.value)}
                  className="input-field no-icon"
                  placeholder="Enter your UPI transaction reference"
                  required
                />
              </div>
              <div>
                <label className="field-label">Payment Screenshot URL <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>(optional)</span></label>
                <input
                  type="text" value={screenshot}
                  onChange={e => setScreenshot(e.target.value)}
                  className="input-field no-icon"
                  placeholder="https://…"
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
                {loading ? <><Spinner /> Verifying…</> : <><ShieldCheck size={16} /> Submit Payment Proof</>}
              </button>
            </form>

            <button onClick={() => setStep(1)} className="btn-ghost" style={{ width: '100%', marginTop: '0.75rem', justifyContent: 'center' }}>
              <ArrowLeft size={14} /> Back
            </button>
          </div>
        </div>
      )}

      {/* ═══ Step 3: Confirmed ═══ */}
      {step === 3 && confirmedInsurance && (
        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 220, height: 220, background: 'rgba(124,58,237,0.1)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(167,139,250,0.12)', border: '2px solid rgba(167,139,250,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem', boxShadow: '0 0 32px rgba(124,58,237,0.3)',
          }}>
            <ShieldCheck size={34} color="#a78bfa" strokeWidth={2} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, margin: '0 0 0.5rem', color: 'var(--text-1)' }}>Insurance Active!</h2>
          <p style={{ color: 'var(--text-2)', marginBottom: '1.75rem', fontSize: '0.9rem' }}>Your shipment is now covered. Keep the insurance ID for your records.</p>

          <div style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: 14, padding: '1.25rem', textAlign: 'left', marginBottom: '1.75rem' }}>
            <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.25rem' }}>Insurance ID</p>
            <p style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1rem', color: '#a78bfa', margin: '0 0 1rem', wordBreak: 'break-all' }}>{confirmedInsurance._id}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
              {[
                { l: 'Premium Paid', v: `₹${confirmedInsurance.insuranceAmount}` },
                { l: 'Coverage', v: `₹${confirmedInsurance.amount}` },
                { l: 'Delicacy', v: confirmedInsurance.deligacy },
                { l: 'Status', v: confirmedInsurance.insuranceStatus },
              ].map(({ l, v }) => (
                <div key={l}>
                  <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 0.15rem' }}>{l}</p>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', color: v === 'PAID' ? 'var(--green)' : 'var(--text-1)', margin: 0 }}>{v}</p>
                </div>
              ))}
            </div>
          </div>

          <button onClick={reset} className="btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
            <Shield size={15} /> Insure Another Shipment
          </button>
        </div>
      )}
    </div>
  );
};

/* ─── Main Dashboard ─────────────────────────────── */
const Dashboard = () => {
  const { user, logout } = useAuth();
  const [view, setView] = useState('profile');
  const [shipments, setShipments] = useState([]);
  const [loadingShipments, setLoadingShipments] = useState(true);
  const [walletBalance, setWalletBalance] = useState(null);
  const [walletLoading, setWalletLoading] = useState(false);
  const [walletNotice, setWalletNotice] = useState('');
  const [walletError, setWalletError] = useState('');
  const [insurancePrefillId, setInsurancePrefillId] = useState('');

  // Called from ShipmentCard → navigates to Insurance view with pre-filled shipmentId
  const handleAddInsurance = (shipmentId) => {
    setInsurancePrefillId(shipmentId);
    setView('insurance');
  };

  const fetchWalletBalance = useCallback(async () => {
    setWalletLoading(true);
    setWalletError('');
    try {
      const r = await api.get('/wallet/balance');
      const balanceValue = r.data.balance ?? r.data['balance in wallet is'];
      const normalized = Number(balanceValue);
      const finalBalance = Number.isFinite(normalized) ? normalized : 0;
      setWalletBalance(finalBalance);
      setWalletNotice('');
      return finalBalance;
    } catch (err) {
      if (err.response?.status === 404) {
        setWalletBalance(0);
        setWalletNotice('Wallet not created yet. Recharge to activate.');
        return 0;
      }
      setWalletError(err.response?.data?.response || 'Failed to load wallet balance.');
      return null;
    } finally {
      setWalletLoading(false);
    }
  }, []);

  const rechargeWallet = useCallback(async (amount) => {
    setWalletLoading(true);
    setWalletError('');
    try {
      const r = await api.post('/wallet/recharge', { amount });
      const balanceValue = r.data.balance ?? r.data['balance in wallet is'];
      const normalized = Number(balanceValue);
      const finalBalance = Number.isFinite(normalized) ? normalized : 0;
      setWalletBalance(finalBalance);
      setWalletNotice('');
      return finalBalance;
    } finally {
      setWalletLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch user's shipment history
    const fetchShipments = async () => {
      try {
        const r = await api.get('/user/shipments');
        setShipments(Array.isArray(r.data.shipments) ? r.data.shipments : []);
      } catch {
        setShipments([]);
      } finally {
        setLoadingShipments(false);
      }
    };
    fetchShipments();
  }, [view]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchWalletBalance();
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [fetchWalletBalance]);

  const handleBooked = () => {
    setView('profile');
    setLoadingShipments(true);
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="bg-mesh" />
      <Navbar logout={logout} view={view} setView={setView} />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 1.5rem', position: 'relative', zIndex: 1 }}>
        {view === 'profile' && <ProfileView user={user} shipments={shipments} loadingShipments={loadingShipments} walletBalance={walletBalance} onAddInsurance={handleAddInsurance} />}
        {view === 'wallet' && <WalletView balance={walletBalance} loading={walletLoading} notice={walletNotice} error={walletError} onRecharge={rechargeWallet} />}
        {view === 'book'    && (
          <BookingView
            onBooked={handleBooked}
            walletBalance={walletBalance}
            walletLoading={walletLoading}
            refreshWalletBalance={fetchWalletBalance}
            rechargeWallet={rechargeWallet}
            onWalletBalanceUpdate={setWalletBalance}
          />
        )}
        {view === 'insurance' && (
          <InsuranceView
            key={insurancePrefillId}
            prefillShipmentId={insurancePrefillId}
          />
        )}
      </main>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import {
  LogOut, Package, MapPin, Search, CheckCircle,
  Navigation, Clock, CreditCard, ChevronRight, User,
  AlertCircle, ArrowLeft, Truck, Zap, Phone, Mail,
  ShieldCheck, PlusCircle, List, Home,
} from 'lucide-react';

/* ─── Navbar ─────────────────────────────────────── */
const Navbar = ({ user, logout, view, setView }) => (
  <header style={{
    position: 'sticky', top: 0, zIndex: 50,
    background: 'rgba(8,12,20,0.9)',
    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(99,119,170,0.18)',
  }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(99,102,241,0.4)' }}>
          <Truck size={18} color="#fff" strokeWidth={2.5} />
        </div>
        <span style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.01em', background: 'linear-gradient(135deg,#a5b4fc,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Apna Courier Service
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <button onClick={() => setView('profile')} className="btn-ghost" style={{ gap: '0.4rem', padding: '0.4rem 0.8rem', color: view === 'profile' ? 'var(--accent)' : undefined }}>
          <Home size={14} /> Profile
        </button>
        <button onClick={() => setView('book')} className="btn-ghost" style={{ gap: '0.4rem', padding: '0.4rem 0.8rem', color: view === 'book' ? 'var(--accent)' : undefined }}>
          <PlusCircle size={14} /> New Booking
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
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0', borderBottom: '1px solid rgba(99,119,170,0.12)' }}>
    <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={15} color="var(--accent)" />
    </div>
    <div>
      <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>{label}</p>
      <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-1)', margin: 0 }}>{value || '—'}</p>
    </div>
  </div>
);

/* ─── Shipment History Card ───────────────────────── */
const ShipmentCard = ({ s }) => (
  <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
    <div style={{ height: 3, background: 'linear-gradient(90deg,var(--accent),var(--accent-2))' }} />
    <div style={{ padding: '1.1rem 1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
        <div>
          <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.2rem' }}>AWB</p>
          <p style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1rem', color: 'var(--accent)', margin: 0 }}>{s.awb}</p>
        </div>
        <span className="badge badge-green"><CheckCircle size={10} /> {s.status}</span>
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
    </div>
  </div>
);

/* ─── Profile View (two columns) ─────────────────── */
const ProfileView = ({ user, shipments, loadingShipments }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2rem', alignItems: 'start' }}>

    {/* LEFT — User Info */}
    <div className="glass-card" style={{ padding: '2rem' }}>
      {/* Avatar */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 0 28px rgba(99,102,241,0.4)' }}>
          <span style={{ fontSize: '2rem', fontWeight: 900, color: '#fff' }}>{(user?.name || 'U')[0].toUpperCase()}</span>
        </div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-1)', margin: '0 0 0.25rem' }}>{user?.name || 'User'}</h2>
        <span className="badge badge-green" style={{ fontSize: '0.7rem' }}><ShieldCheck size={10} /> Verified Account</span>
      </div>

      <InfoRow icon={Mail} label="Email" value={user?.email} />
      <InfoRow icon={Phone} label="Phone" value={user?.phoneNumber ? String(user.phoneNumber) : null} />
      <InfoRow icon={User} label="Account Status" value={user?.status || 'verified'} />

      <div style={{ marginTop: '1.25rem', padding: '0.9rem', background: 'rgba(99,102,241,0.07)', borderRadius: 12, border: '1px solid rgba(99,102,241,0.18)', textAlign: 'center' }}>
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
          {shipments.map((s, i) => <ShipmentCard key={s._id || i} s={s} />)}
        </div>
      )}
    </div>
  </div>
);

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

const BookingView = ({ onBooked }) => {
  const [step, setStep] = useState(1);
  const [parcelData, setParcelData] = useState({ senderName:'', senderEmail:'', senderPhoneNumber:'', senderAddress:'', recieverName:'', recieverPhone:'', recieverAddress:'', DelevarableType:'', weight:'' });
  const [createdParcelId, setCreatedParcelId] = useState(null);
  const [couriers, setCouriers]  = useState([]);
  const [loading, setLoading]    = useState(false);
  const [error, setError]        = useState('');
  const [successData, setSuccessData] = useState(null);

  const onChange = e => setParcelData({ ...parcelData, [e.target.name]: e.target.value });

  const handleCreateParcel = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const r = await api.post('/user/parcel', { ...parcelData, weight: Number(parcelData.weight) });
      setCreatedParcelId(r.data.parcel._id);
      const cr = await api.post(`/user/courier/${r.data.parcel._id}`);
      setCouriers(cr.data.data); setStep(2);
    } catch (err) { setError(err.response?.data?.response || 'Failed to create parcel'); }
    finally { setLoading(false); }
  };

  const handleConfirm = async (courierId) => {
    setLoading(true); setError('');
    try {
      const r = await api.post('/user/parcel/confirmOrder', { parcelId: createdParcelId, courierId });
      setSuccessData(r.data.shipment); setStep(3);
    } catch (err) { setError(err.response?.data?.response || 'Failed to confirm'); }
    finally { setLoading(false); }
  };

  const reset = () => { setStep(1); setCreatedParcelId(null); setCouriers([]); setSuccessData(null); setParcelData({ senderName:'', senderEmail:'', senderPhoneNumber:'', senderAddress:'', recieverName:'', recieverPhone:'', recieverAddress:'', DelevarableType:'', weight:'' }); };

  return (
    <div>
      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
        {['Details', 'Select Courier', 'Confirmed'].map((label, i) => (
          <React.Fragment key={label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, background: step > i + 1 ? 'var(--green)' : step === i + 1 ? 'linear-gradient(135deg,var(--accent),var(--accent-2))' : 'rgba(255,255,255,0.05)', color: step >= i + 1 ? '#fff' : 'var(--text-3)', border: step < i + 1 ? '1px solid var(--border)' : 'none' }}>
                {step > i + 1 ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: step === i + 1 ? 'var(--accent)' : 'var(--text-3)' }}>{label}</span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 1, background: step > i + 1 ? 'var(--green)' : 'var(--border)', maxWidth: 60 }} />}
          </React.Fragment>
        ))}
      </div>

      {error && <div className="alert alert-error" style={{ maxWidth: 700, margin: '0 auto 1.5rem' }}><AlertCircle size={16} /><span>{error}</span></div>}

      {/* Step 1 */}
      {step === 1 && (
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <MapPin size={18} color="var(--accent)" />
            <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>New Consignment</h2>
          </div>
          <form onSubmit={handleCreateParcel}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.75rem', padding: '1.75rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--accent)', margin: 0 }}>📦 Pickup Details</p>
                <FieldRow>
                  <Field label="Sender Name"><input type="text" name="senderName" value={parcelData.senderName} onChange={onChange} className="input-field no-icon" placeholder="Jane Smith" required /></Field>
                  <Field label="Phone"><input type="text" name="senderPhoneNumber" value={parcelData.senderPhoneNumber} onChange={onChange} className="input-field no-icon" placeholder="9876543210" required /></Field>
                </FieldRow>
                <Field label="Email"><input type="email" name="senderEmail" value={parcelData.senderEmail} onChange={onChange} className="input-field no-icon" placeholder="jane@example.com" required /></Field>
                <Field label="Pickup Address"><textarea name="senderAddress" value={parcelData.senderAddress} onChange={onChange} className="input-field" rows={3} placeholder="Full address…" required /></Field>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--green)', margin: 0 }}>🏠 Delivery Details</p>
                <FieldRow>
                  <Field label="Receiver Name"><input type="text" name="recieverName" value={parcelData.recieverName} onChange={onChange} className="input-field no-icon" placeholder="John Doe" required /></Field>
                  <Field label="Phone"><input type="text" name="recieverPhone" value={parcelData.recieverPhone} onChange={onChange} className="input-field no-icon" placeholder="9876543210" required /></Field>
                </FieldRow>
                <Field label="Delivery Address"><textarea name="recieverAddress" value={parcelData.recieverAddress} onChange={onChange} className="input-field" rows={3} placeholder="Full address…" required /></Field>
                <FieldRow>
                  <Field label="Package Type"><input type="text" name="DelevarableType" value={parcelData.DelevarableType} onChange={onChange} className="input-field no-icon" placeholder="Document, Electronics…" required /></Field>
                  <Field label="Weight (kg)"><input type="number" step="0.1" min="0.1" name="weight" value={parcelData.weight} onChange={onChange} className="input-field no-icon" placeholder="0.5" required /></Field>
                </FieldRow>
              </div>
            </div>
            <div style={{ padding: '1rem 1.75rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" disabled={loading} className="btn-primary" style={{ minWidth: 180 }}>
                {loading ? <><Spinner /> Searching…</> : <><Search size={16} /> Find Couriers</>}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Available Couriers</h2>
            <button onClick={() => setStep(1)} className="btn-ghost" style={{ gap: '0.4rem' }}><ArrowLeft size={14} /> Edit Details</button>
          </div>
          {couriers.length === 0 ? (
            <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
              <Truck size={32} color="var(--text-3)" style={{ margin: '0 auto 1rem' }} />
              <p style={{ color: 'var(--text-2)' }}>No couriers found for this route.</p>
              <button onClick={() => setStep(1)} className="btn-ghost" style={{ marginTop: '1rem' }}>Try different addresses</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1.25rem' }}>
              {couriers.map(c => (
                <div key={c._id} className="glass-card" style={{ overflow: 'hidden' }}>
                  <div style={{ height: 3, background: 'linear-gradient(90deg,var(--accent),var(--accent-2))' }} />
                  <div style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '1rem' }}>{c.provider}</span>
                      <span className="badge badge-green"><CheckCircle size={10} /> Active</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-2)' }}><Clock size={14} color="var(--text-3)" />{c.eta_days} Day{c.eta_days !== 1 ? 's' : ''} Delivery</div>
                      <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-2)' }}><CreditCard size={14} color="var(--text-3)" />Base ₹{c.base_price}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                      <div>
                        <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.15rem' }}>Total</p>
                        <p style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-1)', margin: 0 }}>₹{c.price}</p>
                      </div>
                      <button onClick={() => handleConfirm(c._id)} disabled={loading} className="btn-primary" style={{ padding: '0.6rem 1rem', minWidth: 'auto', borderRadius: 10 }}>
                        {loading ? <Spinner small /> : <ChevronRight size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && successData && (
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 220, height: 220, background: 'radial-gradient(circle,rgba(16,185,129,0.2) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '2px solid rgba(16,185,129,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 0 28px var(--green-glow)' }}>
              <CheckCircle size={34} color="var(--green)" strokeWidth={2} />
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, margin: '0 0 0.5rem' }}>Booking Confirmed!</h2>
            <p style={{ color: 'var(--text-2)', marginBottom: '1.75rem', fontSize: '0.9rem' }}>Your shipment has been successfully scheduled.</p>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.25rem', textAlign: 'left', marginBottom: '1.75rem' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.25rem' }}>Tracking Number (AWB)</p>
              <p style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1.4rem', color: 'var(--accent)', margin: '0 0 1rem' }}>{successData.awb}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
                {[{ l: 'Provider', v: successData.courierPartner }, { l: 'Amount Paid', v: `₹${successData.price}` }, { l: 'Status', v: successData.status }, { l: 'ETA', v: `${successData.eta} Days` }].map(({ l, v }) => (
                  <div key={l}>
                    <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 0.15rem' }}>{l}</p>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-1)', margin: 0 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
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

/* ─── Main Dashboard ─────────────────────────────── */
const Dashboard = () => {
  const { user, logout } = useAuth();
  const [view, setView] = useState('profile');
  const [shipments, setShipments] = useState([]);
  const [loadingShipments, setLoadingShipments] = useState(true);

  useEffect(() => {
    // Fetch user's shipment history
    const fetchShipments = async () => {
      try {
        const r = await api.get('/user/shipments');
        setShipments(Array.isArray(r.data.shipments) ? r.data.shipments : []);
      } catch (_) {
        setShipments([]);
      } finally {
        setLoadingShipments(false);
      }
    };
    fetchShipments();
  }, [view]);

  const handleBooked = () => {
    setView('profile');
    setLoadingShipments(true);
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="bg-mesh" />
      <Navbar user={user} logout={logout} view={view} setView={setView} />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 1.5rem', position: 'relative', zIndex: 1 }}>
        {view === 'profile' && <ProfileView user={user} shipments={shipments} loadingShipments={loadingShipments} />}
        {view === 'book'    && <BookingView onBooked={handleBooked} />}
      </main>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Dashboard;

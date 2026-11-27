import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';

// =========================================================
// INISIALISASI FIREBASE & CLOUD FIRESTORE
// =========================================================
const userProvidedConfig = {
  apiKey: "AIzaSyD3G1HWzxoyBJhR-zWxGENNwR8w43kX0N8",
  authDomain: "tckokuo-2d6d3.firebaseapp.com",
  projectId: "tckokuo-2d6d3",
  storageBucket: "tckokuo-2d6d3.firebasestorage.app",
  messagingSenderId: "468659295902",
  appId: "1:468659295902:web:2a63ebaa7ab56f8a3c8d8f",
  measurementId: "G-SQ06S21MK6"
};

const firebaseConfig = typeof __firebase_config !== 'undefined'
  ? JSON.parse(__firebase_config)
  : userProvidedConfig;

const appId = typeof __app_id !== 'undefined' ? __app_id : 'que-massage-admin';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

try {
  getMessaging(firebaseApp);
} catch (err) {
  console.warn('Firebase Messaging dilewati:', err);
}

// =========================================================
// REGISTRASI SERVICE WORKER (PWA & FIREBASE MESSAGING)
// =========================================================
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker terdaftar:', registration.scope);
      })
      .catch((error) => {
        console.warn('Registrasi Service Worker gagal:', error);
      });
  });
}

// =========================================================
// DATA BAWAAN & HELPER
// =========================================================
const DEFAULT_DATA = {
  activeTab: 'pesanan',
  auth: { username: 'admin', password: '123456' },
  settings: {
    brandName: 'QUE MASSAGE',
    tagline: 'Pijat Panggilan Profesional ke Rumah',
    commissionPercent: 80,
    therapistFee: 20000
  },
  orders: [
    {
      id: 'ord-1',
      code: 'QM-001',
      customerName: 'Budi Santoso',
      customerWa: '081234567890',
      packageId: 'pkg-1',
      packageName: 'Pijat Full Body 60 Menit',
      totalPrice: 120000,
      therapistId: 'trp-2',
      therapistName: 'Siti Rahma',
      therapistWa: '6285777435997',
      dateTime: '2026-11-23 • 14:00',
      address: 'Tanah Sareal, Bogor',
      status: 'Menunggu'
    }
  ],
  therapists: [
    { id: 'trp-1', name: 'Dwi Ade Elsa', city: 'Jakarta Pusat', wa: '6285777435997', tier: 'Mingguan Bronze', online: true },
    { id: 'trp-2', name: 'Siti Rahma', city: 'Bogor', wa: '6285777435997', tier: 'Mingguan Silver', online: true },
    { id: 'trp-3', name: 'Ayu Lestari', city: 'Jakarta Selatan', wa: '6285777435997', tier: 'Mingguan Gold', online: true },
    { id: 'trp-4', name: 'Dewi Sartika', city: 'Jakarta Timur', wa: '6285777435997', tier: 'Mingguan Bronze', online: false }
  ],
  packages: [
    { id: 'pkg-1', name: 'Pijat Full Body 60 Menit', basePrice: 100000, duration: '60 Menit', tag: 'PALING LARIS' },
    { id: 'pkg-2', name: 'Pijat Punggung 30 Menit', basePrice: 60000, duration: '30 Menit', tag: 'CEPAT' },
    { id: 'pkg-3', name: 'Refleksi Kaki 45 Menit', basePrice: 80000, duration: '45 Menit', tag: '' },
    { id: 'pkg-4', name: 'Pijat + Kerokan 90 Menit', basePrice: 150000, duration: '90 Menit', tag: 'LENGKAP' }
  ],
  promos: [
    { id: 'prm-1', code: 'PIJATPERTAMA', discount: 30000, minTx: 0, description: 'Diskon 20% maks Rp30.000', active: true },
    { id: 'prm-2', code: 'HEMAT50', discount: 50000, minTx: 100000, description: 'Potongan Rp50.000 min. Rp100.000', active: true },
    { id: 'prm-3', code: 'AJAKTEMAN', discount: 25000, minTx: 0, description: 'Bonus ajak teman Rp25.000', active: true }
  ]
};

const formatRupiah = (value) => {
  const num = Math.round(Number(value) || 0);
  return 'Rp ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// =========================================================
// KOMPONEN UTAMA APLIKASI
// =========================================================
export default function App() {
  const [state, setState] = useState(DEFAULT_DATA);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState('admin');
  const [loginPass, setLoginPass] = useState('123456');
  const [loginError, setLoginError] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Form states
  const [ordCustName, setOrdCustName] = useState('');
  const [ordCustWa, setOrdCustWa] = useState('');
  const [ordPkgId, setOrdPkgId] = useState('pkg-1');
  const [ordTrpId, setOrdTrpId] = useState('trp-1');
  const [ordDateTime, setOrdDateTime] = useState('2026-11-27 • 15:00');
  const [ordAddress, setOrdAddress] = useState('');

  const [trpName, setTrpName] = useState('');
  const [trpCity, setTrpCity] = useState('');
  const [trpWa, setTrpWa] = useState('');
  const [trpTier, setTrpTier] = useState('Mingguan Bronze');

  const [pkgName, setPkgName] = useState('');
  const [pkgPrice, setPkgPrice] = useState('');
  const [pkgDuration, setPkgDuration] = useState('');
  const [pkgTag, setPkgTag] = useState('');

  const [editingPkg, setEditingPkg] = useState(null);

  const [commPct, setCommPct] = useState(80);
  const [therapistFee, setTherapistFee] = useState(20000);
  const [brandName, setBrandName] = useState('QUE MASSAGE');
  const [tagline, setTagline] = useState('Pijat Panggilan Profesional ke Rumah');
  const [newAdminUser, setNewAdminUser] = useState('admin');
  const [newAdminPass, setNewAdminPass] = useState('');

  const [prmCode, setPrmCode] = useState('');
  const [prmDiscount, setPrmDiscount] = useState('');
  const [prmMinTx, setPrmMinTx] = useState('');
  const [prmDesc, setPrmDesc] = useState('');

  const [confirmModal, setConfirmModal] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const getStateDocRef = () => doc(db, 'artifacts', appId, 'public', 'data', 'admin_panel', 'main_state');

  const persistState = async (nextState) => {
    setState(nextState);
    if (!currentUser) return;
    try {
      await setDoc(getStateDocRef(), nextState);
    } catch (err) {
      console.error('Gagal menyimpan ke Firestore:', err);
      showToast('Gagal menyinkronkan ke server.');
    }
  };

  useEffect(() => {
    let unsubscribe = () => {};

    const initCloud = async () => {
      try {
        const cred = typeof __initial_auth_token !== 'undefined' && __initial_auth_token
          ? await signInWithCustomToken(auth, __initial_auth_token)
          : await signInAnonymously(auth);

        setCurrentUser(cred.user);
        const docRef = getStateDocRef();
        const snap = await getDoc(docRef);
        if (!snap.exists()) {
          await setDoc(docRef, DEFAULT_DATA);
        }

        unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const merged = {
              ...DEFAULT_DATA,
              ...data,
              auth: { ...DEFAULT_DATA.auth, ...(data.auth || {}) },
              settings: { ...DEFAULT_DATA.settings, ...(data.settings || {}) }
            };
            setState(merged);
            setCommPct(merged.settings.commissionPercent);
            setTherapistFee(merged.settings.therapistFee);
            setBrandName(merged.settings.brandName);
            setTagline(merged.settings.tagline);
            setNewAdminUser(merged.auth.username);
          }
        });
      } catch (err) {
        console.error('Inisialisasi Firebase gagal:', err);
      }
    };

    initCloud();
    return () => unsubscribe();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUser.trim() === state.auth.username && loginPass.trim() === state.auth.password) {
      setLoginError(false);
      setIsLoggedIn(true);
      showToast('Berhasil masuk ke Dashboard Admin!');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginUser(state.auth.username);
    setLoginPass('');
    showToast('Anda telah keluar dari Admin Panel.');
  };

  const switchTab = (tab) => {
    persistState({ ...state, activeTab: tab });
  };

  // KPI Calculations
  const doneOrders = state.orders.filter((o) => o.status === 'Selesai');
  const omzetSelesai = doneOrders.reduce((sum, o) => sum + Number(o.totalPrice || 0), 0);
  const pct = Number(state.settings.commissionPercent || 80);
  const porsiKomisiMitra = Math.round(omzetSelesai * (pct / 100));
  const onlineTherapists = state.therapists.filter((t) => t.online).length;

  // Order Handlers
  const handleAddOrder = async (e) => {
    e.preventDefault();
    const pkg = state.packages.find((p) => p.id === ordPkgId) || state.packages[0];
    const trp = state.therapists.find((t) => t.id === ordTrpId) || state.therapists[0];
    if (!pkg || !trp) return;

    let maxNum = 0;
    state.orders.forEach((item) => {
      const m = String(item.code).match(/QM-(\d+)/i);
      if (m) maxNum = Math.max(maxNum, parseInt(m[1], 10));
    });
    const nextCode = 'QM-' + String(maxNum + 1).padStart(3, '0');
    const totalPrice = Number(pkg.basePrice) + Number(state.settings.therapistFee || 0);

    const newOrder = {
      id: 'ord-' + Date.now(),
      code: nextCode,
      customerName: ordCustName.trim(),
      customerWa: ordCustWa.trim(),
      packageId: pkg.id,
      packageName: pkg.name,
      totalPrice,
      therapistId: trp.id,
      therapistName: trp.name,
      therapistWa: trp.wa,
      dateTime: ordDateTime.trim(),
      address: ordAddress.trim(),
      status: 'Menunggu'
    };

    await persistState({ ...state, orders: [newOrder, ...state.orders] });
    setOrdCustName('');
    setOrdCustWa('');
    setOrdAddress('');
    showToast(`Order ${nextCode} berhasil disimpan!`);
  };

  const setOrderStatus = async (id, status) => {
    const updated = state.orders.map((o) => (o.id === id ? { ...o, status } : o));
    await persistState({ ...state, orders: updated });
    showToast(`Status pesanan diubah menjadi ${status}`);
  };

  const sendOrderWA = (ord) => {
    let phone = (ord.therapistWa || '').replace(/[^0-9]/g, '');
    if (phone.startsWith('0')) phone = '62' + phone.slice(1);
    const commission = Math.round(Number(ord.totalPrice) * (pct / 100));
    const msg = [
      `*TUGAS ORDER - ${state.settings.brandName}*`,
      `Kode: *${ord.code}*`,
      `Pelanggan: ${ord.customerName} (${ord.customerWa})`,
      `Paket: ${ord.packageName}`,
      `Jadwal: ${ord.dateTime}`,
      `Alamat: ${ord.address}`,
      `Total Tarif: ${formatRupiah(ord.totalPrice)}`,
      `Komisi Anda (${pct}%): *${formatRupiah(commission)}*`
    ].join('\n');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  // Therapist Handlers
  const handleAddTherapist = async (e) => {
    e.preventDefault();
    let cleanWa = trpWa.trim().replace(/[^0-9]/g, '');
    if (cleanWa.startsWith('0')) cleanWa = '62' + cleanWa.slice(1);
    const newTrp = {
      id: 'trp-' + Date.now(),
      name: trpName.trim(),
      city: trpCity.trim(),
      wa: cleanWa,
      tier: trpTier,
      online: true
    };
    await persistState({ ...state, therapists: [...state.therapists, newTrp] });
    setTrpName('');
    setTrpCity('');
    setTrpWa('');
    showToast(`Mitra ${newTrp.name} ditambahkan!`);
  };

  // Package Handlers
  const handleAddPackage = async (e) => {
    e.preventDefault();
    const newPkg = {
      id: 'pkg-' + Date.now(),
      name: pkgName.trim(),
      basePrice: Number(pkgPrice || 0),
      duration: pkgDuration.trim(),
      tag: pkgTag.trim().toUpperCase()
    };
    await persistState({ ...state, packages: [...state.packages, newPkg] });
    setPkgName('');
    setPkgPrice('');
    setPkgDuration('');
    setPkgTag('');
    showToast(`Paket "${newPkg.name}" disimpan!`);
  };

  const handleUpdatePackage = async (e) => {
    e.preventDefault();
    if (!editingPkg) return;
    const updated = state.packages.map((p) => (p.id === editingPkg.id ? editingPkg : p));
    await persistState({ ...state, packages: updated });
    setEditingPkg(null);
    showToast('Paket berhasil diperbarui!');
  };

  // Promo Handlers
  const handleAddPromo = async (e) => {
    e.preventDefault();
    const newPrm = {
      id: 'prm-' + Date.now(),
      code: prmCode.trim().toUpperCase(),
      discount: Number(prmDiscount || 0),
      minTx: Number(prmMinTx || 0),
      description: prmDesc.trim(),
      active: true
    };
    await persistState({ ...state, promos: [newPrm, ...state.promos] });
    setPrmCode('');
    setPrmDiscount('');
    setPrmMinTx('');
    setPrmDesc('');
    showToast(`Promo ${newPrm.code} diaktifkan!`);
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-slate-700 flex flex-col font-sans">
      {/* TOPBAR */}
      <header className="bg-[#102a27] text-white sticky top-0 z-30 shadow">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
          <div className="font-bold text-sm tracking-wider uppercase truncate">
            {state.settings.brandName} • ADMIN PANEL
          </div>
          {isLoggedIn && (
            <div className="flex items-center gap-2 shrink-0">
              <span className="bg-[#0f9680] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                Admin Aktif
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-white text-[#102a27] text-[11px] font-bold px-3 py-1 rounded-full hover:bg-slate-100"
              >
                Keluar
              </button>
            </div>
          )}
        </div>
      </header>

      {/* LOGIN VIEW */}
      {!isLoggedIn ? (
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-md border border-slate-200">
            <h1 className="text-xl font-bold text-[#102a27] mb-1">Login Administrator</h1>
            <p className="text-xs text-slate-500 mb-5">
              Masuk untuk mengelola pesanan, mitra terapis, paket pijat, promo, komisi, dan verifikasi topup.
            </p>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-3 rounded-xl mb-4">
                ⚠️ Username atau PIN / Password salah.
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Username Admin</label>
                <input
                  type="text"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  className="w-full h-10 px-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#0f9680]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">PIN / Password Admin</label>
                <input
                  type="password"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full h-10 px-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#0f9680]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full h-11 bg-[#0f9680] hover:bg-[#0b7a68] text-white font-semibold text-sm rounded-xl transition"
              >
                Masuk ke Dashboard Admin
              </button>
            </form>

            <p className="text-[11px] text-slate-500 mt-4">
              Default demo: username <strong>admin</strong> • password <strong>123456</strong>
            </p>
          </div>
        </main>
      ) : (
        /* DASHBOARD VIEW */
        <main className="max-w-4xl w-full mx-auto px-3.5 py-4 pb-12 flex-1">
          {/* KPI CARDS */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm">
              <div className="text-[11px] text-slate-500 font-medium">Total Pesanan</div>
              <div className="text-lg font-extrabold text-[#0f9680]">{state.orders.length}</div>
            </div>
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm">
              <div className="text-[11px] text-slate-500 font-medium">Omzet Selesai</div>
              <div className="text-lg font-extrabold text-[#0f9680]">{formatRupiah(omzetSelesai)}</div>
            </div>
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm">
              <div className="text-[11px] text-slate-500 font-medium">Porsi Komisi Mitra ({pct}%)</div>
              <div className="text-lg font-extrabold text-[#0f9680]">{formatRupiah(porsiKomisiMitra)}</div>
            </div>
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm">
              <div className="text-[11px] text-slate-500 font-medium">Terapis Online</div>
              <div className="text-lg font-extrabold text-[#0f9680]">
                {onlineTherapists}/{state.therapists.length}
              </div>
            </div>
          </section>

          {/* TABS */}
          <nav className="flex items-center gap-2 overflow-x-auto pb-2 mb-3">
            {[
              { id: 'pesanan', label: '📋 Pesanan Masuk' },
              { id: 'terapis', label: '👩‍⚕️ Mitra Terapis' },
              { id: 'paket', label: '💆 Paket, Harga & Nama' },
              { id: 'komisi', label: '💰 Komisi & Tampilan' },
              { id: 'promo', label: '🏷️ Kode Promo' }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => switchTab(t.id)}
                className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold border transition ${
                  state.activeTab === t.id
                    ? 'bg-[#0f9680] text-white border-[#0f9680] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>

          {/* TAB 1: PESANAN */}
          {state.activeTab === 'pesanan' && (
            <div>
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-3.5">
                <h2 className="text-sm font-bold text-[#102a27] mb-3">+ Catat Order Baru (WhatsApp / Manual)</h2>
                <form onSubmit={handleAddOrder} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Nama Pelanggan"
                      value={ordCustName}
                      onChange={(e) => setOrdCustName(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      required
                    />
                    <input
                      type="text"
                      placeholder="No. WhatsApp Pelanggan"
                      value={ordCustWa}
                      onChange={(e) => setOrdCustWa(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select
                      value={ordPkgId}
                      onChange={(e) => setOrdPkgId(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl bg-white"
                    >
                      {state.packages.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({formatRupiah(Number(p.basePrice) + Number(state.settings.therapistFee || 0))})
                        </option>
                      ))}
                    </select>
                    <select
                      value={ordTrpId}
                      onChange={(e) => setOrdTrpId(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl bg-white"
                    >
                      {state.therapists.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} - {t.city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Tanggal & Jam"
                      value={ordDateTime}
                      onChange={(e) => setOrdDateTime(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Alamat Lokasi"
                      value={ordAddress}
                      onChange={(e) => setOrdAddress(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#0f9680] hover:bg-[#0b7a68] text-white text-xs font-semibold px-4 py-2.5 rounded-xl"
                  >
                    Simpan &amp; Tugaskan Order
                  </button>
                </form>
              </div>

              <div className="space-y-2.5">
                {state.orders.map((o) => (
                  <div key={o.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-sm text-[#102a27] flex flex-wrap items-center gap-2">
                        <span>{o.code} • {o.customerName}</span>
                        <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          {o.status}
                        </span>
                      </div>
                      <div className="font-extrabold text-sm text-[#0f9680]">{formatRupiah(o.totalPrice)}</div>
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      {o.packageName} • Terapis: <strong>{o.therapistName}</strong>
                    </div>
                    <div className="text-xs font-bold text-[#0f9680] mt-1">
                      Komisi Mitra ({pct}%): {formatRupiah(Math.round(Number(o.totalPrice) * (pct / 100)))}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      🕒 {o.dateTime} | 📍 {o.address}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => setOrderStatus(o.id, 'Berlangsung')}
                        className="px-2.5 py-1.5 text-xs font-semibold border border-slate-300 rounded-lg hover:bg-slate-50"
                      >
                        Set Berlangsung
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderStatus(o.id, 'Selesai')}
                        className="px-2.5 py-1.5 text-xs font-semibold bg-[#0f9680] text-white rounded-lg"
                      >
                        Set Selesai
                      </button>
                      <button
                        type="button"
                        onClick={() => sendOrderWA(o)}
                        className="px-2.5 py-1.5 text-xs font-semibold bg-orange-500 text-white rounded-lg"
                      >
                        Kirim ke WA Terapis
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setConfirmModal({
                            title: 'Hapus Pesanan',
                            message: `Hapus pesanan ${o.code}?`,
                            onConfirm: () => persistState({ ...state, orders: state.orders.filter((x) => x.id !== o.id) })
                          })
                        }
                        className="px-2.5 py-1.5 text-xs font-semibold bg-red-500 text-white rounded-lg"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: MITRA TERAPIS */}
          {state.activeTab === 'terapis' && (
            <div>
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-3.5">
                <h2 className="text-sm font-bold text-[#102a27] mb-3">+ Tambah Mitra Terapis</h2>
                <form onSubmit={handleAddTherapist} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Nama Terapis"
                      value={trpName}
                      onChange={(e) => setTrpName(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Kota / Area"
                      value={trpCity}
                      onChange={(e) => setTrpCity(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="No. WA Terapis (628xxx)"
                      value={trpWa}
                      onChange={(e) => setTrpWa(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      required
                    />
                    <select
                      value={trpTier}
                      onChange={(e) => setTrpTier(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl bg-white"
                    >
                      <option value="Mingguan Bronze">Mingguan Bronze</option>
                      <option value="Mingguan Silver">Mingguan Silver</option>
                      <option value="Mingguan Gold">Mingguan Gold</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#0f9680] text-white text-xs font-semibold px-4 py-2.5 rounded-xl"
                  >
                    Tambah Terapis
                  </button>
                </form>
              </div>

              <div className="space-y-2.5">
                {state.therapists.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-sm text-[#102a27] flex items-center gap-2">
                        <span>{t.name}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full ${
                            t.online ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {t.online ? 'ONLINE' : 'OFFLINE'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {t.city} • {t.tier} • WA: {t.wa}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          persistState({
                            ...state,
                            therapists: state.therapists.map((x) => (x.id === t.id ? { ...x, online: !x.online } : x))
                          })
                        }
                        className="px-2.5 py-1.5 text-xs font-semibold text-[#0f9680] border border-[#0f9680]/40 rounded-lg"
                      >
                        {t.online ? 'Nonaktifkan' : 'Aktifkan'}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          persistState({ ...state, therapists: state.therapists.filter((x) => x.id !== t.id) })
                        }
                        className="px-2.5 py-1.5 text-xs font-semibold bg-red-500 text-white rounded-lg"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PAKET */}
          {state.activeTab === 'paket' && (
            <div>
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-3.5">
                <h2 className="text-sm font-bold text-[#102a27] mb-3">+ Tambah Paket Pijat Baru</h2>
                <form onSubmit={handleAddPackage} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Nama Tampilan Paket"
                      value={pkgName}
                      onChange={(e) => setPkgName(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Harga Paket (Rp)"
                      value={pkgPrice}
                      onChange={(e) => setPkgPrice(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Durasi (Contoh: 60 Menit)"
                      value={pkgDuration}
                      onChange={(e) => setPkgDuration(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Tag Label (Opsional)"
                      value={pkgTag}
                      onChange={(e) => setPkgTag(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#0f9680] text-white text-xs font-semibold px-4 py-2.5 rounded-xl"
                  >
                    Simpan Paket
                  </button>
                </form>
              </div>

              <div className="space-y-2.5">
                {state.packages.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-sm text-[#102a27] flex items-center gap-2">
                        <span>{p.name}</span>
                        {p.tag && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                            {p.tag}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Durasi: {p.duration} • Tarif Paket: <strong>{formatRupiah(p.basePrice)}</strong>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingPkg({ ...p })}
                        className="px-2.5 py-1.5 text-xs font-semibold text-[#0f9680] border border-[#0f9680]/40 rounded-lg"
                      >
                        Ubah Nama &amp; Harga
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          persistState({ ...state, packages: state.packages.filter((x) => x.id !== p.id) })
                        }
                        className="px-2.5 py-1.5 text-xs font-semibold bg-red-500 text-white rounded-lg"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: KOMISI & TAMPILAN */}
          {state.activeTab === 'komisi' && (
            <div className="space-y-3.5">
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                <h2 className="text-sm font-bold text-[#102a27] mb-3">💰 Pengaturan Komisi Mitra Terapis</h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await persistState({
                      ...state,
                      settings: {
                        ...state.settings,
                        commissionPercent: Math.max(0, Math.min(100, Number(commPct))),
                        therapistFee: Math.max(0, Number(therapistFee))
                      }
                    });
                    showToast('Pengaturan komisi disimpan!');
                  }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Komisi Mitra (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={commPct}
                        onChange={(e) => setCommPct(e.target.value)}
                        className="w-full h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Ongkos Terapis Default (Rp)</label>
                      <input
                        type="number"
                        min="0"
                        value={therapistFee}
                        onChange={(e) => setTherapistFee(e.target.value)}
                        className="w-full h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>
                  <button type="submit" className="bg-[#0f9680] text-white text-xs font-semibold px-4 py-2.5 rounded-xl">
                    Simpan Komisi Mitra
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                <h2 className="text-sm font-bold text-[#102a27] mb-3">🏷️ Ubah Nama Tampilan Aplikasi</h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await persistState({
                      ...state,
                      settings: { ...state.settings, brandName: brandName.trim(), tagline: tagline.trim() }
                    });
                    showToast('Nama tampilan diperbarui!');
                  }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      required
                    />
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      required
                    />
                  </div>
                  <button type="submit" className="bg-[#0f9680] text-white text-xs font-semibold px-4 py-2.5 rounded-xl">
                    Simpan Nama Tampilan
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                <h2 className="text-sm font-bold text-[#102a27] mb-3">🔐 Ubah Akun Login Admin</h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newAdminUser.trim() || !newAdminPass.trim()) return;
                    await persistState({
                      ...state,
                      auth: { username: newAdminUser.trim(), password: newAdminPass.trim() }
                    });
                    setNewAdminPass('');
                    showToast('Akun login admin diperbarui!');
                  }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Username Admin Baru"
                      value={newAdminUser}
                      onChange={(e) => setNewAdminUser(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      required
                    />
                    <input
                      type="password"
                      placeholder="PIN / Password Baru"
                      value={newAdminPass}
                      onChange={(e) => setNewAdminPass(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      required
                    />
                  </div>
                  <button type="submit" className="bg-[#0f9680] text-white text-xs font-semibold px-4 py-2.5 rounded-xl">
                    Simpan Akun Admin
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 5: KODE PROMO */}
          {state.activeTab === 'promo' && (
            <div>
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-3.5">
                <h2 className="text-sm font-bold text-[#102a27] mb-3">+ Buat Kode Promo Baru</h2>
                <form onSubmit={handleAddPromo} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Kode Promo (WEEKEND25)"
                      value={prmCode}
                      onChange={(e) => setPrmCode(e.target.value.toUpperCase())}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl font-bold uppercase"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Potongan Nominal (Rp)"
                      value={prmDiscount}
                      onChange={(e) => setPrmDiscount(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Minimal Transaksi (Rp)"
                      value={prmMinTx}
                      onChange={(e) => setPrmMinTx(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Keterangan Promo"
                      value={prmDesc}
                      onChange={(e) => setPrmDesc(e.target.value)}
                      className="h-10 px-3 text-sm border border-slate-300 rounded-xl"
                      required
                    />
                  </div>
                  <button type="submit" className="bg-[#0f9680] text-white text-xs font-semibold px-4 py-2.5 rounded-xl">
                    Aktifkan Promo
                  </button>
                </form>
              </div>

              <div className="space-y-2.5">
                {state.promos.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-sm text-[#102a27] flex items-center gap-2">
                        <span>{p.code}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full ${
                            p.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {p.active ? 'AKTIF' : 'NONAKTIF'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {p.description} • Potongan {formatRupiah(p.discount)} (Min. {formatRupiah(p.minTx)})
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          persistState({
                            ...state,
                            promos: state.promos.map((x) => (x.id === p.id ? { ...x, active: !x.active } : x))
                          })
                        }
                        className="px-2.5 py-1.5 text-xs font-semibold text-[#0f9680] border border-[#0f9680]/40 rounded-lg"
                      >
                        {p.active ? 'Matikan' : 'Aktifkan'}
                      </button>
                      <button
                        type="button"
                        onClick={() => persistState({ ...state, promos: state.promos.filter((x) => x.id !== p.id) })}
                        className="px-2.5 py-1.5 text-xs font-semibold bg-red-500 text-white rounded-lg"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FOOTER */}
          <footer className="text-center text-xs text-slate-500 mt-6">
            <div>{state.settings.brandName} • {state.settings.tagline}</div>
            <button
              type="button"
              onClick={() =>
                setConfirmModal({
                  title: 'Reset Data Bawaan',
                  message: 'Kembalikan semua data ke kondisi awal?',
                  onConfirm: () => persistState(DEFAULT_DATA)
                })
              }
              className="underline text-[11px] mt-1.5"
            >
              Reset Data ke Bawaan Awal
            </button>
          </footer>
        </main>
      )}

      {/* MODAL EDIT PAKET */}
      {editingPkg && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-xl">
            <h3 className="text-base font-bold text-[#102a27] mb-3">Ubah Nama &amp; Harga Paket</h3>
            <form onSubmit={handleUpdatePackage} className="space-y-3">
              <input
                type="text"
                value={editingPkg.name}
                onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                className="w-full h-10 px-3 text-sm border border-slate-300 rounded-xl"
                required
              />
              <input
                type="number"
                value={editingPkg.basePrice}
                onChange={(e) => setEditingPkg({ ...editingPkg, basePrice: Number(e.target.value) })}
                className="w-full h-10 px-3 text-sm border border-slate-300 rounded-xl"
                required
              />
              <input
                type="text"
                value={editingPkg.duration}
                onChange={(e) => setEditingPkg({ ...editingPkg, duration: e.target.value })}
                className="w-full h-10 px-3 text-sm border border-slate-300 rounded-xl"
                required
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPkg(null)}
                  className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-lg"
                >
                  Batal
                </button>
                <button type="submit" className="px-3 py-1.5 text-xs font-semibold bg-[#0f9680] text-white rounded-lg">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI */}
      {confirmModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-xl">
            <h3 className="text-base font-bold text-[#102a27] mb-1">{confirmModal.title}</h3>
            <p className="text-xs text-slate-600 mb-4">{confirmModal.message}</p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-lg"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={async () => {
                  await confirmModal.onConfirm();
                  setConfirmModal(null);
                  showToast('Tindakan berhasil dijalankan.');
                }}
                className="px-3 py-1.5 text-xs font-semibold bg-red-500 text-white rounded-lg"
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#102a27] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg z-50">
          {toastMsg}
        </div>
      )}
    </div>
  );
}

// =========================================================
// MOUNT KE DOM JIKA ELEMEN #root TERSEDIA
// =========================================================
if (typeof document !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
        }

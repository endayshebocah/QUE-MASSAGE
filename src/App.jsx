<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>QUE MASSAGE • ADMIN PANEL</title>
  <style>
    /* =========================================================
       RESET & VARIABEL TEMA INTERNAL (MANDIRI TANPA CDN)
       ========================================================= */
    :root {
      --bg-page: #f4f7f6;
      --bg-card: #ffffff;
      --header-dark: #102a27;
      --primary: #0f9680;
      --primary-hover: #0b7a68;
      --primary-soft: #e6f6f3;
      --text-dark: #102a27;
      --text-body: #334155;
      --text-muted: #64748b;
      --border-color: #e2e8f0;
      --danger: #ef4444;
      --danger-hover: #dc2626;
      --warning: #f97316;
      --warning-hover: #ea580c;
      --shadow-sm: 0 1px 3px rgba(16, 42, 39, 0.06);
      --shadow-md: 0 8px 24px rgba(16, 42, 39, 0.08);
      --radius-card: 16px;
      --radius-input: 10px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg-page);
      color: var(--text-body);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      line-height: 1.45;
    }

    .hidden {
      display: none !important;
    }

    /* =========================================================
       TOP NAVBAR
       ========================================================= */
    .topbar {
      background-color: var(--header-dark);
      color: #ffffff;
      position: sticky;
      top: 0;
      z-index: 30;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
    }

    .topbar-inner {
      max-width: 960px;
      margin: 0 auto;
      padding: 0 16px;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .brand-title {
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .topbar-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .badge-admin-active {
      background-color: var(--primary);
      color: #ffffff;
      font-size: 11px;
      font-weight: 600;
      padding: 5px 10px;
      border-radius: 999px;
    }

    .btn-logout {
      background-color: #ffffff;
      color: var(--text-dark);
      border: none;
      font-size: 11px;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: 999px;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .btn-logout:hover {
      background-color: #f1f5f9;
    }

    /* =========================================================
       HALAMAN LOGIN ADMINISTRATOR
       ========================================================= */
    .login-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 16px 40px;
    }

    .login-card {
      background-color: var(--bg-card);
      width: 100%;
      max-width: 400px;
      border-radius: 16px;
      padding: 28px 22px;
      box-shadow: var(--shadow-md);
      border: 1px solid rgba(226, 232, 240, 0.85);
    }

    .login-title {
      font-size: 22px;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 6px;
    }

    .login-subtitle {
      font-size: 13px;
      color: var(--text-muted);
      margin-bottom: 20px;
      line-height: 1.5;
    }

    .login-error-alert {
      display: none;
      background-color: #fef2f2;
      border: 1px solid #fecaca;
      color: #b91c1c;
      font-size: 12.5px;
      font-weight: 600;
      padding: 10px 12px;
      border-radius: 10px;
      margin-bottom: 14px;
    }

    .login-error-alert.show {
      display: block;
    }

    .login-hint {
      font-size: 11.5px;
      color: var(--text-muted);
      margin-top: 14px;
      line-height: 1.45;
    }

    /* =========================================================
       CONTAINER & FORM ELEMENTS
       ========================================================= */
    .main-container {
      max-width: 960px;
      width: 100%;
      margin: 0 auto;
      padding: 14px 14px 48px;
      flex: 1;
    }

    .card {
      background-color: var(--bg-card);
      border-radius: var(--radius-card);
      padding: 16px;
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
      margin-bottom: 14px;
    }

    .card-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 4px;
    }

    .card-subtitle {
      font-size: 12px;
      color: var(--text-muted);
      margin-bottom: 14px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
      margin-bottom: 12px;
    }

    @media (min-width: 640px) {
      .form-grid {
        grid-template-columns: 1fr 1fr;
      }
      .card {
        padding: 20px;
      }
      .brand-title {
        font-size: 15px;
      }
    }

    .form-group {
      margin-bottom: 14px;
    }

    .form-grid .form-group {
      margin-bottom: 0;
    }

    label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: #475569;
      margin-bottom: 5px;
    }

    input[type="text"],
    input[type="password"],
    input[type="number"],
    select {
      width: 100%;
      height: 40px;
      padding: 0 12px;
      font-size: 13.5px;
      color: var(--text-dark);
      background-color: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: var(--radius-input);
      outline: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }

    input:focus,
    select:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(15, 150, 128, 0.15);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border: none;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 600;
      padding: 10px 16px;
      cursor: pointer;
      transition: background-color 0.15s ease, transform 0.1s ease;
    }

    .btn:active {
      transform: scale(0.98);
    }

    .btn-primary {
      background-color: var(--primary);
      color: #ffffff;
    }

    .btn-primary:hover {
      background-color: var(--primary-hover);
    }

    .btn-full {
      width: 100%;
      height: 44px;
      font-size: 14px;
      border-radius: 12px;
    }

    .btn-sm {
      font-size: 11.5px;
      padding: 7px 11px;
      border-radius: 8px;
    }

    .btn-outline {
      background-color: #ffffff;
      color: var(--text-dark);
      border: 1px solid #cbd5e1;
    }

    .btn-outline:hover {
      background-color: #f8fafc;
    }

    .btn-outline-primary {
      background-color: #ffffff;
      color: var(--primary);
      border: 1px solid rgba(15, 150, 128, 0.45);
    }

    .btn-outline-primary:hover {
      background-color: var(--primary-soft);
    }

    .btn-warning {
      background-color: var(--warning);
      color: #ffffff;
    }

    .btn-warning:hover {
      background-color: var(--warning-hover);
    }

    .btn-danger {
      background-color: var(--danger);
      color: #ffffff;
    }

    .btn-danger:hover {
      background-color: var(--danger-hover);
    }

    /* =========================================================
       KPI SUMMARY CARDS (GRID 2x2 HP, 4 KOLOM DESKTOP)
       ========================================================= */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 14px;
    }

    @media (min-width: 768px) {
      .kpi-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 14px;
      }
    }

    .kpi-card {
      background-color: var(--bg-card);
      border-radius: 14px;
      padding: 12px 14px;
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
    }

    .kpi-label {
      font-size: 11.5px;
      font-weight: 500;
      color: var(--text-muted);
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .kpi-value {
      font-size: 19px;
      font-weight: 800;
      color: var(--primary);
      letter-spacing: -0.3px;
    }

    /* =========================================================
       HORIZONTAL TAB NAVIGATION
       ========================================================= */
    .tabs-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 8px;
      margin-bottom: 12px;
      scrollbar-width: thin;
    }

    .tabs-bar::-webkit-scrollbar {
      height: 4px;
    }

    .tabs-bar::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 999px;
    }

    .tab-pill {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 999px;
      font-size: 12.5px;
      font-weight: 600;
      background-color: #ffffff;
      color: var(--text-body);
      border: 1px solid var(--border-color);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .tab-pill:hover {
      background-color: #f8fafc;
    }

    .tab-pill.active {
      background-color: var(--primary);
      color: #ffffff;
      border-color: var(--primary);
      box-shadow: 0 2px 6px rgba(15, 150, 128, 0.25);
    }

    /* =========================================================
       LIST ITEMS & BADGES
       ========================================================= */
    .item-card {
      background-color: var(--bg-card);
      border-radius: 14px;
      padding: 14px 16px;
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
      margin-bottom: 10px;
    }

    .item-row-between {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 10px;
    }

    .item-row-responsive {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    @media (min-width: 640px) {
      .item-row-responsive {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }

    .item-title {
      font-size: 14.5px;
      font-weight: 700;
      color: var(--text-dark);
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
    }

    .item-price {
      font-size: 14.5px;
      font-weight: 800;
      color: var(--primary);
      white-space: nowrap;
    }

    .item-meta {
      font-size: 12.5px;
      color: var(--text-body);
      margin-top: 5px;
    }

    .item-submeta {
      font-size: 11.5px;
      color: var(--text-muted);
      margin-top: 4px;
    }

    .item-commission {
      font-size: 12px;
      font-weight: 700;
      color: var(--primary);
      margin-top: 4px;
    }

    .badge {
      display: inline-block;
      font-size: 10.5px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .badge-waiting {
      background-color: #fef3c7;
      color: #b45309;
    }

    .badge-progress {
      background-color: #dbeafe;
      color: #1d4ed8;
    }

    .badge-done,
    .badge-online {
      background-color: #d1fae5;
      color: #047857;
    }

    .badge-offline {
      background-color: #e2e8f0;
      color: #475569;
    }

    .action-group {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 7px;
      margin-top: 10px;
    }

    .item-row-responsive .action-group {
      margin-top: 0;
    }

    .preview-note {
      font-size: 12px;
      color: var(--text-muted);
      background-color: #f8fafc;
      padding: 8px 11px;
      border-radius: 8px;
      border: 1px dashed #cbd5e1;
      margin-bottom: 12px;
    }

    .empty-state {
      text-align: center;
      padding: 24px 16px;
      font-size: 13px;
      color: var(--text-muted);
      background-color: #ffffff;
      border-radius: 14px;
      border: 1px dashed #cbd5e1;
    }

    /* =========================================================
       MODAL & TOAST
       ========================================================= */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(15, 23, 42, 0.55);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 50;
    }

    .modal-backdrop.open {
      display: flex;
    }

    .modal-box {
      background-color: #ffffff;
      border-radius: 16px;
      width: 100%;
      max-width: 400px;
      padding: 20px;
      box-shadow: 0 20px 35px rgba(0, 0, 0, 0.2);
    }

    .modal-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 8px;
    }

    .modal-text {
      font-size: 13px;
      color: var(--text-body);
      margin-bottom: 16px;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    .toast-box {
      position: fixed;
      bottom: 18px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background-color: var(--header-dark);
      color: #ffffff;
      font-size: 12.5px;
      font-weight: 600;
      padding: 10px 16px;
      border-radius: 999px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.22);
      opacity: 0;
      pointer-events: none;
      transition: all 0.25s ease;
      z-index: 60;
      white-space: nowrap;
      max-width: 92vw;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .toast-box.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    .footer-note {
      text-align: center;
      font-size: 11.5px;
      color: var(--text-muted);
      margin-top: 24px;
    }

    .link-reset {
      background: none;
      border: none;
      color: var(--text-muted);
      text-decoration: underline;
      font-size: 11px;
      margin-top: 6px;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <!-- =========================================================
       TOP HEADER BAR
       ========================================================= -->
  <header class="topbar">
    <div class="topbar-inner">
      <div id="topbar-brand" class="brand-title">QUE MASSAGE • ADMIN PANEL</div>
      <div id="topbar-admin-controls" class="topbar-actions hidden">
        <span class="badge-admin-active">Admin Aktif</span>
        <button type="button" class="btn-logout" onclick="handleLogout()">Keluar</button>
      </div>
    </div>
  </header>

  <!-- =========================================================
       1. HALAMAN LOGIN ADMINISTRATOR
       ========================================================= -->
  <section id="login-view" class="login-wrapper">
    <div class="login-card">
      <h1 class="login-title">Login Administrator</h1>
      <p class="login-subtitle">
        Masuk untuk mengelola pesanan, mitra terapis, paket pijat, promo, komisi, dan verifikasi topup.
      </p>

      <div id="login-error" class="login-error-alert">
        ⚠️ Username atau PIN / Password salah.
      </div>

      <form onsubmit="handleLogin(event)">
        <div class="form-group">
          <label for="login-username">Username Admin</label>
          <input type="text" id="login-username" value="admin" placeholder="admin" required autocomplete="username" />
        </div>

        <div class="form-group">
          <label for="login-password">PIN / Password Admin</label>
          <input type="password" id="login-password" value="123456" placeholder="••••••" required autocomplete="current-password" />
        </div>

        <button type="submit" class="btn btn-primary btn-full">
          Masuk ke Dashboard Admin
        </button>
      </form>

      <p class="login-hint">
        Default demo: username <strong>admin</strong> • password <strong>123456</strong> (ubah sebelum publikasi).
      </p>
    </div>
  </section>

  <!-- =========================================================
       2. DASHBOARD ADMIN PANEL
       ========================================================= -->
  <main id="dashboard-view" class="main-container hidden">

    <!-- 4 KARTU KPI -->
    <section class="kpi-grid" aria-label="Ringkasan Statistik">
      <div class="kpi-card">
        <div class="kpi-label">Total Pesanan</div>
        <div id="kpi-total-orders" class="kpi-value">1</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Omzet Selesai</div>
        <div id="kpi-omzet-selesai" class="kpi-value">Rp 0</div>
      </div>
      <div class="kpi-card">
        <div id="kpi-komisi-label" class="kpi-label">Porsi Komisi Mitra (80%)</div>
        <div id="kpi-komisi-mitra" class="kpi-value">Rp 0</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Terapis Online</div>
        <div id="kpi-terapis-online" class="kpi-value">3/4</div>
      </div>
    </section>

    <!-- BAR TAB NAVIGASI HORIZONTAL -->
    <nav class="tabs-bar" aria-label="Navigasi Admin">
      <button type="button" class="tab-pill active" id="tab-btn-pesanan" onclick="switchTab('pesanan')">
        📋 Pesanan Masuk
      </button>
      <button type="button" class="tab-pill" id="tab-btn-terapis" onclick="switchTab('terapis')">
        👩‍⚕️ Mitra Terapis
      </button>
      <button type="button" class="tab-pill" id="tab-btn-paket" onclick="switchTab('paket')">
        💆 Paket, Harga &amp; Nama
      </button>
      <button type="button" class="tab-pill" id="tab-btn-komisi" onclick="switchTab('komisi')">
        💰 Komisi &amp; Tampilan
      </button>
      <button type="button" class="tab-pill" id="tab-btn-promo" onclick="switchTab('promo')">
        🏷️ Kode Promo
      </button>
    </nav>

    <!-- =========================================================
         TAB 1: PESANAN MASUK
         ========================================================= -->
    <section id="tab-pesanan" class="tab-content">
      <div class="card">
        <h2 class="card-title" style="margin-bottom: 12px;">+ Catat Order Baru (Dari WhatsApp / Manual)</h2>
        <form onsubmit="handleAddOrder(event)">
          <div class="form-grid">
            <div class="form-group">
              <label for="ord-cust-name">Nama Pelanggan</label>
              <input type="text" id="ord-cust-name" placeholder="Contoh: Ibu Rina" required />
            </div>
            <div class="form-group">
              <label for="ord-cust-wa">No. WhatsApp Pelanggan</label>
              <input type="text" id="ord-cust-wa" inputmode="numeric" placeholder="Contoh: 0812xxxxxxx" required />
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="ord-package">Pilih Paket</label>
              <select id="ord-package" required></select>
            </div>
            <div class="form-group">
              <label for="ord-therapist">Tugaskan Terapis</label>
              <select id="ord-therapist" required></select>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="ord-datetime">Tanggal &amp; Jam</label>
              <input type="text" id="ord-datetime" value="2026-11-27 • 15:00" placeholder="2026-11-27 • 15:00" required />
            </div>
            <div class="form-group">
              <label for="ord-address">Alamat Lokasi</label>
              <input type="text" id="ord-address" placeholder="Jl. Pajajaran No. 10, Bogor" required />
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Simpan &amp; Tugaskan Order</button>
        </form>
      </div>

      <div id="orders-container"></div>
    </section>

    <!-- =========================================================
         TAB 2: MITRA TERAPIS
         ========================================================= -->
    <section id="tab-terapis" class="tab-content hidden">
      <div class="card">
        <h2 class="card-title" style="margin-bottom: 12px;">+ Tambah Mitra Terapis</h2>
        <form onsubmit="handleAddTherapist(event)">
          <div class="form-grid">
            <div class="form-group">
              <label for="trp-name">Nama Terapis</label>
              <input type="text" id="trp-name" placeholder="Nama lengkap" required />
            </div>
            <div class="form-group">
              <label for="trp-city">Kota / Area</label>
              <input type="text" id="trp-city" placeholder="Bogor / Jakarta Selatan" required />
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="trp-wa">No. WA Terapis</label>
              <input type="text" id="trp-wa" inputmode="numeric" placeholder="628xxxxxxxxxx" required />
            </div>
            <div class="form-group">
              <label for="trp-tier">Tier / Level</label>
              <select id="trp-tier" required>
                <option value="Mingguan Bronze">Mingguan Bronze</option>
                <option value="Mingguan Silver">Mingguan Silver</option>
                <option value="Mingguan Gold">Mingguan Gold</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Tambah Terapis</button>
        </form>
      </div>

      <div id="therapists-container"></div>
    </section>

    <!-- =========================================================
         TAB 3: PAKET, HARGA & NAMA
         ========================================================= -->
    <section id="tab-paket" class="tab-content hidden">
      <div class="card">
        <h2 class="card-title" style="margin-bottom: 12px;">+ Tambah Paket Pijat Baru</h2>
        <form onsubmit="handleAddPackage(event)">
          <div class="form-grid">
            <div class="form-group">
              <label for="pkg-name">Nama Tampilan Paket</label>
              <input type="text" id="pkg-name" placeholder="Contoh: Pijat Full Body 60 Menit" required />
            </div>
            <div class="form-group">
              <label for="pkg-price">Harga Paket (Rp)</label>
              <input type="number" id="pkg-price" inputmode="numeric" min="0" placeholder="100000" required />
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="pkg-duration">Durasi</label>
              <input type="text" id="pkg-duration" placeholder="60 Menit" required />
            </div>
            <div class="form-group">
              <label for="pkg-tag">Tag Label</label>
              <input type="text" id="pkg-tag" placeholder="PALING LARIS" style="text-transform: uppercase;" />
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Simpan Paket</button>
        </form>
      </div>

      <div id="packages-container"></div>
    </section>

    <!-- =========================================================
         TAB 4: KOMISI & TAMPILAN
         ========================================================= -->
    <section id="tab-komisi" class="tab-content hidden">
      <!-- Kartu 1: Pengaturan Komisi Mitra Terapis -->
      <div class="card">
        <h2 class="card-title">💰 Pengaturan Komisi Mitra Terapis</h2>
        <p class="card-subtitle">
          Atur persentase komisi yang diterima mitra terapis dari setiap order selesai (sisanya menjadi bagian platform/admin).
        </p>
        <form onsubmit="handleSaveCommission(event)">
          <div class="form-grid">
            <div class="form-group">
              <label for="set-commission">Persentase Komisi Mitra (%)</label>
              <input type="number" id="set-commission" inputmode="numeric" min="0" max="100" oninput="updateCommissionSimulation()" required />
            </div>
            <div class="form-group">
              <label for="set-fee">Biaya / Ongkos Terapis Default (Rp)</label>
              <input type="number" id="set-fee" inputmode="numeric" min="0" oninput="updateCommissionSimulation()" required />
            </div>
          </div>

          <div id="commission-sim-box" class="preview-note">
            Contoh order Rp 120.000 → Komisi Mitra: Rp 96.000 (80%) | Platform: Rp 24.000 (20%).
          </div>

          <button type="submit" class="btn btn-primary">Simpan Komisi Mitra</button>
        </form>
      </div>

      <!-- Kartu 2: Ubah Nama Tampilan Aplikasi -->
      <div class="card">
        <h2 class="card-title">🏷️ Ubah Nama Tampilan Aplikasi</h2>
        <p class="card-subtitle">
          Ubah nama merek/tampilan aplikasi yang tampil di header, halaman pembuka, dan area pelanggan.
        </p>
        <form onsubmit="handleSaveBrand(event)">
          <div class="form-grid">
            <div class="form-group">
              <label for="set-brand">Nama Tampilan Brand / Aplikasi</label>
              <input type="text" id="set-brand" required />
            </div>
            <div class="form-group">
              <label for="set-tagline">Label / Tagline Singkat</label>
              <input type="text" id="set-tagline" required />
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Simpan Nama Tampilan</button>
        </form>
      </div>

      <!-- Kartu 3: Ubah Akun Login Admin -->
      <div class="card">
        <h2 class="card-title">🔐 Ubah Akun Login Admin</h2>
        <p class="card-subtitle">
          Perbarui username dan PIN / password administrator untuk keamanan akses panel.
        </p>
        <form onsubmit="handleSaveAdminCredentials(event)">
          <div class="form-grid">
            <div class="form-group">
              <label for="set-admin-user">Username Admin Baru</label>
              <input type="text" id="set-admin-user" required />
            </div>
            <div class="form-group">
              <label for="set-admin-pass">PIN / Password Admin Baru</label>
              <input type="password" id="set-admin-pass" placeholder="Masukkan PIN / Password baru" required />
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Simpan Akun Admin</button>
        </form>
      </div>
    </section>

    <!-- =========================================================
         TAB 5: KODE PROMO
         ========================================================= -->
    <section id="tab-promo" class="tab-content hidden">
      <div class="card">
        <h2 class="card-title" style="margin-bottom: 12px;">+ Buat Kode Promo Baru</h2>
        <form onsubmit="handleAddPromo(event)">
          <div class="form-grid">
            <div class="form-group">
              <label for="prm-code">Kode Promo</label>
              <input type="text" id="prm-code" placeholder="Contoh: WEEKEND25" style="text-transform: uppercase; font-weight: 700;"
                oninput="this.value = this.value.toUpperCase().replace(/\s+/g, '')" required />
            </div>
            <div class="form-group">
              <label for="prm-discount">Potongan Nominal (Rp)</label>
              <input type="number" id="prm-discount" inputmode="numeric" min="0" placeholder="25000" required />
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="prm-mintx">Minimal Transaksi (Rp)</label>
              <input type="number" id="prm-mintx" inputmode="numeric" min="0" placeholder="100000" required />
            </div>
            <div class="form-group">
              <label for="prm-desc">Keterangan</label>
              <input type="text" id="prm-desc" placeholder="Diskon akhir pekan" required />
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Aktifkan Promo</button>
        </form>
      </div>

      <div id="promos-container"></div>
    </section>

    <footer class="footer-note">
      <div id="footer-brand-tagline">QUE MASSAGE • Pijat Panggilan Profesional ke Rumah</div>
      <button type="button" class="link-reset" onclick="openResetModal()">Reset Data ke Bawaan Awal</button>
    </footer>
  </main>

  <!-- =========================================================
       MODAL EDIT PAKET (Ubah Nama & Harga)
       ========================================================= -->
  <div id="modal-edit-pkg" class="modal-backdrop">
    <div class="modal-box">
      <h3 class="modal-title">Ubah Nama &amp; Harga Paket</h3>
      <form onsubmit="handleUpdatePackage(event)">
        <input type="hidden" id="edit-pkg-id" />
        <div class="form-group">
          <label for="edit-pkg-name">Nama Tampilan Paket</label>
          <input type="text" id="edit-pkg-name" required />
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label for="edit-pkg-price">Harga Paket (Rp)</label>
            <input type="number" id="edit-pkg-price" inputmode="numeric" min="0" required />
          </div>
          <div class="form-group">
            <label for="edit-pkg-duration">Durasi</label>
            <input type="text" id="edit-pkg-duration" required />
          </div>
        </div>
        <div class="form-group">
          <label for="edit-pkg-tag">Tag Label (Opsional)</label>
          <input type="text" id="edit-pkg-tag" style="text-transform: uppercase;" placeholder="PALING LARIS" />
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-outline btn-sm" onclick="closeModal('modal-edit-pkg')">Batal</button>
          <button type="submit" class="btn btn-primary btn-sm">Simpan Perubahan</button>
        </div>
      </form>
    </div>
  </div>

  <!-- =========================================================
       MODAL KONFIRMASI UMUM (HAPUS / RESET)
       ========================================================= -->
  <div id="modal-confirm" class="modal-backdrop">
    <div class="modal-box">
      <h3 id="confirm-title" class="modal-title">Konfirmasi</h3>
      <p id="confirm-message" class="modal-text">Apakah Anda yakin?</p>
      <div class="modal-actions">
        <button type="button" class="btn btn-outline btn-sm" onclick="closeModal('modal-confirm')">Batal</button>
        <button type="button" id="confirm-yes-btn" class="btn btn-danger btn-sm">Ya, Lanjutkan</button>
      </div>
    </div>
  </div>

  <!-- TOAST NOTIFICATION -->
  <div id="toast" class="toast-box"></div>

  <!-- =========================================================
       LOGIKA JAVASCRIPT & PENYIMPANAN LOCALSTORAGE
       ========================================================= -->
  <script>
    const DATA_KEY = 'qm_admin_panel_data_v2';
    const LOGIN_KEY = 'qm_admin_logged_in';

    const DEFAULT_DATA = {
      activeTab: 'pesanan',
      auth: {
        username: 'admin',
        password: '123456'
      },
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
        {
          id: 'trp-1',
          name: 'Dwi Ade Elsa',
          city: 'Jakarta Pusat',
          wa: '6285777435997',
          tier: 'Mingguan Bronze',
          online: true
        },
        {
          id: 'trp-2',
          name: 'Siti Rahma',
          city: 'Bogor',
          wa: '6285777435997',
          tier: 'Mingguan Silver',
          online: true
        },
        {
          id: 'trp-3',
          name: 'Ayu Lestari',
          city: 'Jakarta Selatan',
          wa: '6285777435997',
          tier: 'Mingguan Gold',
          online: true
        },
        {
          id: 'trp-4',
          name: 'Dewi Sartika',
          city: 'Jakarta Timur',
          wa: '6285777435997',
          tier: 'Mingguan Bronze',
          online: false
        }
      ],
      packages: [
        {
          id: 'pkg-1',
          name: 'Pijat Full Body 60 Menit',
          basePrice: 100000,
          duration: '60 Menit',
          tag: 'PALING LARIS'
        },
        {
          id: 'pkg-2',
          name: 'Pijat Punggung 30 Menit',
          basePrice: 60000,
          duration: '30 Menit',
          tag: 'CEPAT'
        },
        {
          id: 'pkg-3',
          name: 'Refleksi Kaki 45 Menit',
          basePrice: 80000,
          duration: '45 Menit',
          tag: ''
        },
        {
          id: 'pkg-4',
          name: 'Pijat + Kerokan 90 Menit',
          basePrice: 150000,
          duration: '90 Menit',
          tag: 'LENGKAP'
        }
      ],
      promos: [
        {
          id: 'prm-1',
          code: 'PIJATPERTAMA',
          discount: 30000,
          minTx: 0,
          description: 'Diskon 20% maks Rp30.000',
          active: true
        },
        {
          id: 'prm-2',
          code: 'HEMAT50',
          discount: 50000,
          minTx: 100000,
          description: 'Potongan Rp50.000 min. Rp100.000',
          active: true
        },
        {
          id: 'prm-3',
          code: 'AJAKTEMAN',
          discount: 25000,
          minTx: 0,
          description: 'Bonus ajak teman Rp25.000',
          active: true
        }
      ]
    };

    let state = loadState();
    let confirmCallback = null;
    let toastTimer = null;

    function loadState() {
      try {
        const raw = localStorage.getItem(DATA_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          return {
            ...DEFAULT_DATA,
            ...parsed,
            auth: { ...DEFAULT_DATA.auth, ...(parsed.auth || {}) },
            settings: { ...DEFAULT_DATA.settings, ...(parsed.settings || {}) }
          };
        }
      } catch (err) {
        console.error('Error membaca localStorage:', err);
      }
      return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }

    function saveState() {
      try {
        localStorage.setItem(DATA_KEY, JSON.stringify(state));
      } catch (err) {
        console.error('Error menyimpan localStorage:', err);
      }
    }

    function formatRupiah(value) {
      const num = Math.round(Number(value) || 0);
      return 'Rp ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    function escapeHTML(str) {
      return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function showToast(msg) {
      const el = document.getElementById('toast');
      el.textContent = msg;
      el.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        el.classList.remove('show');
      }, 2500);
    }

    /* =========================================================
       AUTENTIKASI LOGIN & LOGOUT
       ========================================================= */
    function checkAuthView() {
      const isLoggedIn = localStorage.getItem(LOGIN_KEY) === 'true';
      const loginView = document.getElementById('login-view');
      const dashboardView = document.getElementById('dashboard-view');
      const topbarControls = document.getElementById('topbar-admin-controls');

      updateBrandUI();

      if (isLoggedIn) {
        loginView.classList.add('hidden');
        dashboardView.classList.remove('hidden');
        topbarControls.classList.remove('hidden');
        renderDashboard();
        switchTab(state.activeTab || 'pesanan');
      } else {
        loginView.classList.remove('hidden');
        dashboardView.classList.add('hidden');
        topbarControls.classList.add('hidden');
        document.getElementById('login-error').classList.remove('show');
      }
    }

    function handleLogin(e) {
      e.preventDefault();
      const inputUser = document.getElementById('login-username').value.trim();
      const inputPass = document.getElementById('login-password').value.trim();
      const errorBox = document.getElementById('login-error');

      if (inputUser === state.auth.username && inputPass === state.auth.password) {
        errorBox.classList.remove('show');
        localStorage.setItem(LOGIN_KEY, 'true');
        checkAuthView();
        showToast('Berhasil masuk ke Dashboard Admin!');
      } else {
        errorBox.classList.add('show');
      }
    }

    function handleLogout() {
      localStorage.removeItem(LOGIN_KEY);
      document.getElementById('login-username').value = state.auth.username;
      document.getElementById('login-password').value = '';
      checkAuthView();
      showToast('Anda telah keluar dari Admin Panel.');
    }

    /* =========================================================
       NAVIGASI TAB
       ========================================================= */
    function switchTab(tabName) {
      state.activeTab = tabName;
      saveState();

      document.querySelectorAll('.tab-pill').forEach(btn => btn.classList.remove('active'));
      const activeBtn = document.getElementById('tab-btn-' + tabName);
      if (activeBtn) activeBtn.classList.add('active');

      document.querySelectorAll('.tab-content').forEach(sec => sec.classList.add('hidden'));
      const activeSec = document.getElementById('tab-' + tabName);
      if (activeSec) activeSec.classList.remove('hidden');
    }

    /* =========================================================
       UPDATE BRAND & KPI
       ========================================================= */
    function updateBrandUI() {
      const brand = state.settings.brandName || 'QUE MASSAGE';
      const tagline = state.settings.tagline || 'Pijat Panggilan Profesional ke Rumah';
      document.getElementById('topbar-brand').textContent = `${brand} • ADMIN PANEL`;
      document.title = `${brand} • ADMIN PANEL`;
      const footerEl = document.getElementById('footer-brand-tagline');
      if (footerEl) footerEl.textContent = `${brand} • ${tagline}`;
    }

    function renderKPIs() {
      const totalOrders = state.orders.length;
      const doneOrders = state.orders.filter(o => o.status === 'Selesai');
      const omzet = doneOrders.reduce((acc, o) => acc + Number(o.totalPrice || 0), 0);
      const pct = Number(state.settings.commissionPercent || 80);
      const partnerShare = Math.round(omzet * (pct / 100));

      const onlineCount = state.therapists.filter(t => t.online).length;
      const totalTherapists = state.therapists.length;

      document.getElementById('kpi-total-orders').textContent = totalOrders;
      document.getElementById('kpi-omzet-selesai').textContent = formatRupiah(omzet);
      document.getElementById('kpi-komisi-label').textContent = `Porsi Komisi Mitra (${pct}%)`;
      document.getElementById('kpi-komisi-mitra').textContent = formatRupiah(partnerShare);
      document.getElementById('kpi-terapis-online').textContent = `${onlineCount}/${totalTherapists}`;
    }

    /* =========================================================
       TAB 1: PESANAN MASUK
       ========================================================= */
    function renderOrderSelects() {
      const pkgSelect = document.getElementById('ord-package');
      const trpSelect = document.getElementById('ord-therapist');
      const fee = Number(state.settings.therapistFee || 0);

      pkgSelect.innerHTML = state.packages.length
        ? state.packages.map(p => {
            const total = Number(p.basePrice) + fee;
            return `<option value="${p.id}">${escapeHTML(p.name)} (${formatRupiah(total)})</option>`;
          }).join('')
        : '<option value="">-- Tidak ada paket --</option>';

      trpSelect.innerHTML = state.therapists.length
        ? state.therapists.map(t => `<option value="${t.id}">${escapeHTML(t.name)} - ${escapeHTML(t.city)}</option>`).join('')
        : '<option value="">-- Tidak ada terapis --</option>';
    }

    function renderOrders() {
      const container = document.getElementById('orders-container');
      const pct = Number(state.settings.commissionPercent || 80);

      if (!state.orders.length) {
        container.innerHTML = '<div class="empty-state">Belum ada pesanan masuk.</div>';
        return;
      }

      container.innerHTML = state.orders.map(o => {
        const partnerCut = Math.round(Number(o.totalPrice) * (pct / 100));
        let badgeClass = 'badge-waiting';
        if (o.status === 'Berlangsung') badgeClass = 'badge-progress';
        if (o.status === 'Selesai') badgeClass = 'badge-done';

        return `
          <div class="item-card">
            <div class="item-row-between">
              <div class="item-title">
                <span>${escapeHTML(o.code)} • ${escapeHTML(o.customerName)}</span>
                <span class="badge ${badgeClass}">${escapeHTML(o.status)}</span>
              </div>
              <div class="item-price">${formatRupiah(o.totalPrice)}</div>
            </div>
            <div class="item-meta">
              ${escapeHTML(o.packageName)} • Terapis: <strong>${escapeHTML(o.therapistName)}</strong>
            </div>
            <div class="item-commission">
              Komisi Mitra (${pct}%): ${formatRupiah(partnerCut)}
            </div>
            <div class="item-submeta">
              🕒 ${escapeHTML(o.dateTime)} | 📍 ${escapeHTML(o.address)}
            </div>
            <div class="action-group">
              <button type="button" class="btn btn-outline btn-sm" onclick="setOrderStatus('${o.id}', 'Berlangsung')">Set Berlangsung</button>
              <button type="button" class="btn btn-primary btn-sm" onclick="setOrderStatus('${o.id}', 'Selesai')">Set Selesai</button>
              <button type="button" class="btn btn-warning btn-sm" onclick="sendOrderWA('${o.id}')">Kirim ke WA Terapis</button>
              <button type="button" class="btn btn-danger btn-sm" onclick="askConfirm('Hapus Pesanan', 'Hapus pesanan ${escapeHTML(o.code)} (${escapeHTML(o.customerName)})?', () => deleteOrder('${o.id}'))">Hapus</button>
            </div>
          </div>
        `;
      }).join('');
    }

    function handleAddOrder(e) {
      e.preventDefault();
      const customerName = document.getElementById('ord-cust-name').value.trim();
      const customerWa = document.getElementById('ord-cust-wa').value.trim();
      const pkgId = document.getElementById('ord-package').value;
      const trpId = document.getElementById('ord-therapist').value;
      const dateTime = document.getElementById('ord-datetime').value.trim();
      const address = document.getElementById('ord-address').value.trim();

      const pkg = state.packages.find(p => p.id === pkgId);
      const trp = state.therapists.find(t => t.id === trpId);
      if (!pkg || !trp) {
        showToast('Pilih paket dan terapis terlebih dahulu!');
        return;
      }

      let maxNum = 0;
      state.orders.forEach(item => {
        const m = String(item.code).match(/QM-(\d+)/i);
        if (m) maxNum = Math.max(maxNum, parseInt(m[1], 10));
      });
      const nextCode = 'QM-' + String(maxNum + 1).padStart(3, '0');
      const totalPrice = Number(pkg.basePrice) + Number(state.settings.therapistFee || 0);

      state.orders.unshift({
        id: 'ord-' + Date.now(),
        code: nextCode,
        customerName,
        customerWa,
        packageId: pkg.id,
        packageName: pkg.name,
        totalPrice,
        therapistId: trp.id,
        therapistName: trp.name,
        therapistWa: trp.wa,
        dateTime,
        address,
        status: 'Menunggu'
      });

      saveState();
      renderDashboard();
      document.getElementById('ord-cust-name').value = '';
      document.getElementById('ord-cust-wa').value = '';
      document.getElementById('ord-address').value = '';
      showToast(`Order ${nextCode} berhasil disimpan!`);
    }

    function setOrderStatus(id, status) {
      const ord = state.orders.find(o => o.id === id);
      if (!ord) return;
      ord.status = status;
      saveState();
      renderDashboard();
      showToast(`Status ${ord.code} diubah ke ${status}`);
    }

    function deleteOrder(id) {
      state.orders = state.orders.filter(o => o.id !== id);
      saveState();
      renderDashboard();
      showToast('Pesanan berhasil dihapus.');
    }

    function sendOrderWA(id) {
      const ord = state.orders.find(o => o.id === id);
      if (!ord) return;
      const trp = state.therapists.find(t => t.id === ord.therapistId);
      let phone = ((trp ? trp.wa : ord.therapistWa) || '').replace(/[^0-9]/g, '');
      if (phone.startsWith('0')) phone = '62' + phone.slice(1);

      const pct = Number(state.settings.commissionPercent || 80);
      const commission = Math.round(Number(ord.totalPrice) * (pct / 100));

      const msg = [
        `*TUGAS ORDER - ${state.settings.brandName}*`,
        `Kode: *${ord.code}*`,
        `Pelanggan: ${ord.customerName} (${ord.customerWa})`,
        `Paket: ${ord.packageName}`,
        `Jadwal: ${ord.dateTime}`,
        `Alamat: ${ord.address}`,
        `Total Tarif: ${formatRupiah(ord.totalPrice)}`,
        `Komisi Anda (${pct}%): *${formatRupiah(commission)}*`,
        ``,
        `Mohon segera konfirmasi dan menuju lokasi tepat waktu.`
      ].join('\n');

      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    }

    /* =========================================================
       TAB 2: MITRA TERAPIS
       ========================================================= */
    function renderTherapists() {
      const container = document.getElementById('therapists-container');
      if (!state.therapists.length) {
        container.innerHTML = '<div class="empty-state">Belum ada mitra terapis terdaftar.</div>';
        return;
      }

      container.innerHTML = state.therapists.map(t => `
        <div class="item-card">
          <div class="item-row-responsive">
            <div>
              <div class="item-title">
                <span>${escapeHTML(t.name)}</span>
                <span class="badge ${t.online ? 'badge-online' : 'badge-offline'}">${t.online ? 'ONLINE' : 'OFFLINE'}</span>
              </div>
              <div class="item-submeta">${escapeHTML(t.city)} • ${escapeHTML(t.tier)} • WA: ${escapeHTML(t.wa)}</div>
            </div>
            <div class="action-group">
              <button type="button" class="btn btn-outline-primary btn-sm" onclick="toggleTherapist('${t.id}')">
                ${t.online ? 'Nonaktifkan' : 'Aktifkan'}
              </button>
              <button type="button" class="btn btn-danger btn-sm" onclick="askConfirm('Hapus Terapis', 'Hapus mitra ${escapeHTML(t.name)}?', () => deleteTherapist('${t.id}'))">
                Hapus
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }

    function handleAddTherapist(e) {
      e.preventDefault();
      const name = document.getElementById('trp-name').value.trim();
      const city = document.getElementById('trp-city').value.trim();
      let wa = document.getElementById('trp-wa').value.trim().replace(/[^0-9]/g, '');
      const tier = document.getElementById('trp-tier').value;
      if (wa.startsWith('0')) wa = '62' + wa.slice(1);

      state.therapists.push({
        id: 'trp-' + Date.now(),
        name,
        city,
        wa,
        tier,
        online: true
      });

      saveState();
      renderDashboard();
      e.target.reset();
      showToast(`Mitra terapis ${name} ditambahkan!`);
    }

    function toggleTherapist(id) {
      const t = state.therapists.find(item => item.id === id);
      if (!t) return;
      t.online = !t.online;
      saveState();
      renderDashboard();
      showToast(`${t.name} sekarang ${t.online ? 'ONLINE' : 'OFFLINE'}`);
    }

    function deleteTherapist(id) {
      state.therapists = state.therapists.filter(t => t.id !== id);
      saveState();
      renderDashboard();
      showToast('Mitra terapis dihapus.');
    }

    /* =========================================================
       TAB 3: PAKET, HARGA & NAMA
       ========================================================= */
    function renderPackages() {
      const container = document.getElementById('packages-container');
      const fee = Number(state.settings.therapistFee || 0);

      if (!state.packages.length) {
        container.innerHTML = '<div class="empty-state">Belum ada paket pijat tersedia.</div>';
        return;
      }

      container.innerHTML = state.packages.map(p => `
        <div class="item-card">
          <div class="item-row-responsive">
            <div>
              <div class="item-title">
                <span>${escapeHTML(p.name)}</span>
                ${p.tag ? `<span class="badge badge-online">${escapeHTML(p.tag)}</span>` : ''}
              </div>
              <div class="item-submeta">
                Durasi: ${escapeHTML(p.duration)} • Tarif Paket: <strong>${formatRupiah(p.basePrice)}</strong> (+${formatRupiah(fee)} ongkos terapis)
              </div>
            </div>
            <div class="action-group">
              <button type="button" class="btn btn-outline-primary btn-sm" onclick="openEditPackage('${p.id}')">
                Ubah Nama &amp; Harga
              </button>
              <button type="button" class="btn btn-danger btn-sm" onclick="askConfirm('Hapus Paket', 'Hapus paket ${escapeHTML(p.name)}?', () => deletePackage('${p.id}'))">
                Hapus
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }

    function handleAddPackage(e) {
      e.preventDefault();
      const name = document.getElementById('pkg-name').value.trim();
      const basePrice = Number(document.getElementById('pkg-price').value || 0);
      const duration = document.getElementById('pkg-duration').value.trim();
      const tag = document.getElementById('pkg-tag').value.trim().toUpperCase();

      state.packages.push({
        id: 'pkg-' + Date.now(),
        name,
        basePrice,
        duration,
        tag
      });

      saveState();
      renderDashboard();
      e.target.reset();
      showToast(`Paket "${name}" berhasil disimpan!`);
    }

    function openEditPackage(id) {
      const p = state.packages.find(item => item.id === id);
      if (!p) return;
      document.getElementById('edit-pkg-id').value = p.id;
      document.getElementById('edit-pkg-name').value = p.name;
      document.getElementById('edit-pkg-price').value = p.basePrice;
      document.getElementById('edit-pkg-duration').value = p.duration;
      document.getElementById('edit-pkg-tag').value = p.tag || '';
      document.getElementById('modal-edit-pkg').classList.add('open');
    }

    function handleUpdatePackage(e) {
      e.preventDefault();
      const id = document.getElementById('edit-pkg-id').value;
      const p = state.packages.find(item => item.id === id);
      if (!p) return;

      p.name = document.getElementById('edit-pkg-name').value.trim();
      p.basePrice = Number(document.getElementById('edit-pkg-price').value || 0);
      p.duration = document.getElementById('edit-pkg-duration').value.trim();
      p.tag = document.getElementById('edit-pkg-tag').value.trim().toUpperCase();

      saveState();
      closeModal('modal-edit-pkg');
      renderDashboard();
      showToast(`Paket "${p.name}" diperbarui!`);
    }

    function deletePackage(id) {
      state.packages = state.packages.filter(p => p.id !== id);
      saveState();
      renderDashboard();
      showToast('Paket pijat dihapus.');
    }

    /* =========================================================
       TAB 4: KOMISI & TAMPILAN
       ========================================================= */
    function renderSettingsForms() {
      document.getElementById('set-commission').value = state.settings.commissionPercent;
      document.getElementById('set-fee').value = state.settings.therapistFee;
      document.getElementById('set-brand').value = state.settings.brandName;
      document.getElementById('set-tagline').value = state.settings.tagline;
      document.getElementById('set-admin-user').value = state.auth.username;
      document.getElementById('set-admin-pass').value = '';
      updateCommissionSimulation();
    }

    function updateCommissionSimulation() {
      const pct = Math.max(0, Math.min(100, Number(document.getElementById('set-commission').value || 0)));
      const fee = Math.max(0, Number(document.getElementById('set-fee').value || 0));
      const sampleTotal = 100000 + fee;
      const partnerGet = Math.round(sampleTotal * (pct / 100));
      const platformGet = sampleTotal - partnerGet;

      document.getElementById('commission-sim-box').textContent =
        `Contoh order ${formatRupiah(sampleTotal)} → Komisi Mitra: ${formatRupiah(partnerGet)} (${pct}%) | Platform: ${formatRupiah(platformGet)} (${100 - pct}%).`;
    }

    function handleSaveCommission(e) {
      e.preventDefault();
      state.settings.commissionPercent = Math.max(0, Math.min(100, Number(document.getElementById('set-commission').value || 0)));
      state.settings.therapistFee = Math.max(0, Number(document.getElementById('set-fee').value || 0));
      saveState();
      renderDashboard();
      showToast('Pengaturan komisi & ongkos terapis disimpan!');
    }

    function handleSaveBrand(e) {
      e.preventDefault();
      const brand = document.getElementById('set-brand').value.trim();
      const tagline = document.getElementById('set-tagline').value.trim();
      if (!brand) return;
      state.settings.brandName = brand;
      state.settings.tagline = tagline;
      saveState();
      updateBrandUI();
      showToast('Nama tampilan aplikasi diperbarui!');
    }

    function handleSaveAdminCredentials(e) {
      e.preventDefault();
      const newUser = document.getElementById('set-admin-user').value.trim();
      const newPass = document.getElementById('set-admin-pass').value.trim();
      if (!newUser || !newPass) return;
      state.auth.username = newUser;
      state.auth.password = newPass;
      saveState();
      document.getElementById('set-admin-pass').value = '';
      showToast('Akun login admin berhasil diperbarui!');
    }

    /* =========================================================
       TAB 5: KODE PROMO
       ========================================================= */
    function renderPromos() {
      const container = document.getElementById('promos-container');
      if (!state.promos.length) {
        container.innerHTML = '<div class="empty-state">Belum ada kode promo aktif.</div>';
        return;
      }

      container.innerHTML = state.promos.map(p => `
        <div class="item-card">
          <div class="item-row-responsive">
            <div>
              <div class="item-title">
                <span>${escapeHTML(p.code)}</span>
                <span class="badge ${p.active ? 'badge-online' : 'badge-offline'}">${p.active ? 'AKTIF' : 'NONAKTIF'}</span>
              </div>
              <div class="item-submeta">
                ${escapeHTML(p.description)} • Potongan ${formatRupiah(p.discount)} (Min. ${formatRupiah(p.minTx)})
              </div>
            </div>
            <div class="action-group">
              <button type="button" class="btn btn-outline-primary btn-sm" onclick="togglePromo('${p.id}')">
                ${p.active ? 'Matikan' : 'Aktifkan'}
              </button>
              <button type="button" class="btn btn-danger btn-sm" onclick="askConfirm('Hapus Promo', 'Hapus kode promo ${escapeHTML(p.code)}?', () => deletePromo('${p.id}'))">
                Hapus
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }

    function handleAddPromo(e) {
      e.preventDefault();
      const code = document.getElementById('prm-code').value.trim().toUpperCase();
      const discount = Number(document.getElementById('prm-discount').value || 0);
      const minTx = Number(document.getElementById('prm-mintx').value || 0);
      const description = document.getElementById('prm-desc').value.trim();

      state.promos.unshift({
        id: 'prm-' + Date.now(),
        code,
        discount,
        minTx,
        description,
        active: true
      });

      saveState();
      renderDashboard();
      e.target.reset();
      showToast(`Promo ${code} berhasil diaktifkan!`);
    }

    function togglePromo(id) {
      const p = state.promos.find(item => item.id === id);
      if (!p) return;
      p.active = !p.active;
      saveState();
      renderDashboard();
      showToast(`Promo ${p.code} ${p.active ? 'diaktifkan' : 'dimatikan'}.`);
    }

    function deletePromo(id) {
      state.promos = state.promos.filter(p => p.id !== id);
      saveState();
      renderDashboard();
      showToast('Kode promo dihapus.');
    }

    /* =========================================================
       MODAL HELPER & RESET DATA
       ========================================================= */
    function askConfirm(title, message, onYes) {
      document.getElementById('confirm-title').textContent = title;
      document.getElementById('confirm-message').textContent = message;
      confirmCallback = onYes;
      document.getElementById('modal-confirm').classList.add('open');
    }

    document.getElementById('confirm-yes-btn').addEventListener('click', () => {
      if (typeof confirmCallback === 'function') {
        confirmCallback();
      }
      closeModal('modal-confirm');
    });

    function closeModal(modalId) {
      document.getElementById(modalId).classList.remove('open');
    }

    function openResetModal() {
      askConfirm(
        'Reset Data Bawaan',
        'Kembalikan semua data pesanan, terapis, paket, komisi, dan promo ke kondisi awal?',
        () => {
          state = JSON.parse(JSON.stringify(DEFAULT_DATA));
          saveState();
          updateBrandUI();
          renderDashboard();
          switchTab('pesanan');
          showToast('Data berhasil direset ke bawaan awal!');
        }
      );
    }

    function renderDashboard() {
      renderKPIs();
      renderOrderSelects();
      renderOrders();
      renderTherapists();
      renderPackages();
      renderSettingsForms();
      renderPromos();
    }

    window.addEventListener('DOMContentLoaded', () => {
      checkAuthView();
    });
  </script>
</body>
</html>

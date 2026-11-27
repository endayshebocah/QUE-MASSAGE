// =========================================================
// SERVICE WORKER (PWA OFFLINE CACHE & FIREBASE MESSAGING)
// =========================================================

importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js');

const CACHE_NAME = 'que-massage-admin-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Konfigurasi Firebase untuk Notifikasi Push Latar Belakang
const firebaseConfig = {
  apiKey: "AIzaSyD3G1HWzxoyBJhR-zWxGENNwR8w43kX0N8",
  authDomain: "tckokuo-2d6d3.firebaseapp.com",
  projectId: "tckokuo-2d6d3",
  storageBucket: "tckokuo-2d6d3.firebasestorage.app",
  messagingSenderId: "468659295902",
  appId: "1:468659295902:web:2a63ebaa7ab56f8a3c8d8f",
  measurementId: "G-SQ06S21MK6"
};

// Inisialisasi Firebase & Messaging di dalam Service Worker
try {
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  // Menangani pesan notifikasi saat aplikasi ditutup / berjalan di latar belakang
  messaging.onBackgroundMessage((payload) => {
    const title = payload.notification?.title || 'QUE MASSAGE • Admin Panel';
    const options = {
      body: payload.notification?.body || 'Ada pembaruan pesanan baru.',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-192x192.png',
      data: payload.data || { url: '/' }
    };

    self.registration.showNotification(title, options);
  });
} catch (err) {
  console.warn('Inisialisasi Firebase Messaging SW dilewati:', err);
}

// =========================================================
// EVENT LIFECYCLE PWA SERVICE WORKER
// =========================================================

// 1. Install: Menyimpan aset inti ke dalam cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. Activate: Membersihkan cache versi lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch: Network-first untuk halaman & fallback ke cache saat offline
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Abaikan request API eksternal seperti Firestore/Google APIs
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});

// 4. Notification Click: Membuka atau memfokuskan tab Admin Panel saat notifikasi diklik
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

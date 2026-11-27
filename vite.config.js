import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Direktori root proyek tempat index.html berada
  root: '.',
  
  // Pengaturan server pengembangan lokal
  server: {
    port: 3000,
    open: true,
    host: true
  },

  // Pengaturan preview hasil build produksi
  preview: {
    port: 4173,
    host: true
  },

  // Pengaturan build produksi (menghasilkan folder dist/ siap deploy)
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2022',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
});

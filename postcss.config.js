/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    // Mengompilasi direktif @tailwind dan kelas utilitas dari tailwind.config.js
    tailwindcss: {},

    // Menambahkan prefix vendor browser otomatis untuk kompatibilitas CSS maksimal
    autoprefixer: {}
  }
};

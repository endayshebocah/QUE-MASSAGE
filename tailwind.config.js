/** @type {import('tailwindcss').Config} */
export default {
  // Daftar file sumber yang akan dipindai kelas Tailwind CSS-nya
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],

  theme: {
    extend: {
      // Palet warna khusus sesuai tema QUE MASSAGE Admin Panel
      colors: {
        brand: {
          dark: "#102a27",      // Header gelap & teks utama
          primary: "#0f9680",   // Warna aksen utama (Teal)
          hover: "#0b7a68",     // Hover tombol utama
          soft: "#e6f6f3",      // Latar belakang soft aksen
          page: "#f4f7f6"       // Latar belakang halaman
        }
      },

      // Ukuran sudut membulat (border-radius) bawaan desain panel
      borderRadius: {
        card: "16px",
        input: "10px"
      },

      // Efek bayangan lembut untuk kartu & modal
      boxShadow: {
        "card-sm": "0 1px 3px rgba(16, 42, 39, 0.06)",
        "card-md": "0 8px 24px rgba(16, 42, 39, 0.08)"
      },

      // Susunan font sistem modern
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif"
        ]
      }
    }
  },

  plugins: []
};

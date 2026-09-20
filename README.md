# Lelang Ikan

Aplikasi Next.js untuk platform lelang ikan. Konten situs dapat dikelola secara dinamis melalui halaman admin.

## Menjalankan

```bash
npm install
npm run dev
```

- Halaman utama: `http://localhost:3000`
- Halaman kontak: `http://localhost:3000/kontak`
- Halaman admin: `http://localhost:3000/admin`

## Struktur

- `app/page.js` — halaman utama (index)
- `app/kontak/page.js` — halaman kontak
- `app/admin/page.js` — panel admin untuk mengelola konten
- `app/api/content/route.js` — API untuk membaca & menyimpan konten
- `data/content.json` — sumber data konten (diedit lewat admin)
- `components/` — komponen bersama (Header, Footer)
# DP Trans — Website & Kelola Rental / Travel

Repositori ini berisi website profil DP Trans dan aplikasi operasional **Kelola Rental & Travel**.

## Isi repositori

| Lokasi | Isi |
| --- | --- |
| `index.html` dan gambar di root | Website profil travel/rental yang sudah ada |
| [`rental-app/`](rental-app/) | Kode aplikasi, Worker API, PWA, domain keuangan, dan pengujian |
| [`rental-app/database/`](rental-app/database/) | Database contoh SQLite, SQL, dan JSON |
| [`rental-app/drizzle/`](rental-app/drizzle/) | Skema/migrasi database D1 |
| [`output/video/`](output/video/) | Video panduan MP4, subtitle, dan daftar bab |

## Menjalankan aplikasi di komputer

Memerlukan **Node.js 24 atau lebih baru**, tanpa paket pihak ketiga.

```bash
cd rental-app
npm start
```

Buka **http://127.0.0.1:8090**. Data tersimpan di `rental-app/.runtime/managgemen_dp_trans.sqlite`; unggahan lokal di `.runtime/files/`. Klik **Buka data contoh** untuk latihan. Identitas pemilik pada server lokal merupakan simulasi untuk pengujian, bukan sistem login produksi.

```bash
npm test
npm run build
```

Baca [panduan aplikasi](rental-app/README.md) dan [panduan database](rental-app/database/README.md).

## Aplikasi online

[Kelola Rental & Travel](https://dp-trans-keuangan-affd.selectcrow4.chatgpt.site/)

Versi online memakai autentikasi Sites/ChatGPT, Cloudflare D1 (`DB`), dan penyimpanan dokumen privat R2 (`BUCKET`). Worker dibangun ke `dist/server/index.js`. Hosting di luar Sites membutuhkan pengganti autentikasi yang memvalidasi pengguna; jangan mengekspos server simulasi lokal ke internet.

## Database dan privasi

Repositori ini publik. Database yang disertakan adalah **data contoh**, tanpa dokumen pelanggan atau cadangan usaha asli. Migrasi SQL dan contoh database cukup untuk menjalankan aplikasi dari awal. Cadangan data usaha dibuat terpisah dan dikecualikan dari Git; impor melalui **Pengaturan → Pulihkan JSON** pada lingkungan privat yang sesuai.

## Nama database

Database **Managgemen DP Trans** tersedia sebagai `rental-app/database/managgemen_dp_trans.sqlite`, `.sql`, dan `.json` (data contoh). Database lokal aktif memakai `.runtime/managgemen_dp_trans.sqlite`.

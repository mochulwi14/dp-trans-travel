# Database Managgemen DP Trans

## Berkas yang disertakan

- `managgemen_dp_trans.sqlite`: SQLite siap pakai, berisi satu snapshot `demo` dengan data latihan.
- `managgemen_dp_trans.sql`: dump SQL yang mereproduksi database contoh, termasuk skema.
- `managgemen_dp_trans.json`: cadangan contoh yang dapat diimpor melalui Pengaturan → Pulihkan JSON. Lakukan pada mode contoh untuk latihan.
- `../drizzle/0000_business.sql`: migrasi skema D1 yang digunakan versi online.
- `../drizzle/meta/_journal.json`: urutan migrasi yang digunakan deployment.

Semua nama, kontak, transaksi, dan kendaraan pada database contoh adalah data latihan. Tidak ada foto KTP, SIM, jaminan, atau dokumen usaha asli di Git.

## Struktur database

`business_state` menyimpan snapshot JSON usaha per namespace (`live` atau `demo`), beserta nomor revisi untuk mencegah penimpaan oleh dua petugas. JSON memuat pengaturan, akun, kendaraan, pelanggan, pengemudi, rute, jadwal, pemesanan, transaksi, pengeluaran, utang, jaminan, dan audit.

`private_files` menyimpan metadata dokumen: ID, lingkup akses, nama, MIME, ukuran, waktu dibuat/kedaluwarsa, dan pembuat. Isi dokumen ada di R2 pada hosting, atau `.runtime/files` pada server contoh lokal.

## Inisialisasi lokal

```bash
cd rental-app
npm run db:init
npm start
```

Inisialisasi menyalin database contoh hanya jika database lokal belum ada; data yang sudah ada tidak ditimpa. Snapshot usaha asli lokal dibuat ketika pemilik simulasi pertama kali mengakses aplikasi. Mode contoh tetap terpisah.

Untuk path lain, set `KRT_DB_PATH` dan `KRT_FILES_PATH` di environment sebelum menjalankan server. Jangan commit path atau berkas berisi data rahasia.

Jika memiliki CLI SQLite, database contoh juga bisa direproduksi:

```bash
sqlite3 /tmp/managgemen_dp_trans.sqlite < database/managgemen_dp_trans.sql
```

## Pemulihan data usaha

Gunakan JSON hasil **Pengaturan → Cadangkan database**, lalu pulihkan lewat menu aplikasi yang sama. Backup JSON memuat data dan metadata referensi file, bukan byte dokumen. Arsip file privat perlu disimpan/dipulihkan terpisah. Mengimpor database tidak memberikan akses ke akun atau bucket hosting lain.

Salinan database usaha asli (`.json` dan `.sqlite`) disimpan pada folder `private-backups/` di workspace dan dikecualikan dari Git. Salinan SQLite ini direkonstruksi dari ekspor aplikasi (snapshot live), bukan salinan fisik seluruh sistem D1/internal migrasi; jangan mengunggahnya ke repositori publik.

## D1 online

Hosting manifest mendeklarasikan binding `DB` dan `BUCKET`. Jalankan migrasi melalui alur deployment Sites. Jangan mengubah migrasi yang sudah diterapkan; tambahkan migrasi baru bila struktur berubah. Database tidak dibuat ulang pada setiap permintaan.

## Cadangan data usaha terenkripsi

`private-backups/business-data-2026-11-16.enc` pada workspace pemilik (di luar Git) berisi ZIP cadangan snapshot **live** dari aplikasi online (JSON dan SQLite), dilindungi **AES-256-GCM**. Pada saat ekspor, data transaksi/pelanggan/kendaraan usaha masih kosong dan tabel metadata dokumen juga kosong. Namespace contoh produksi dan tabel internal D1 tidak termasuk cadangan snapshot live ini.

Kunci dekripsi hanya berada di workspace pemilik pada `private-backups/database-usaha-2026-11-16.key.json`, **tidak diunggah ke GitHub**. Simpan kunci terpisah; tanpa kunci, arsip tidak dapat dipulihkan. Jangan membagikan kunci melalui repositori atau issue publik.

Dekripsi lokal menggunakan Node.js tanpa dependensi tambahan:

```bash
cd rental-app
node scripts/backup-crypto.mjs decrypt /path/private/business-data-2026-11-16.enc /tmp/database-usaha.zip /path/private/database-usaha-2026-11-16.key.json
```

Ekstrak ZIP secara lokal, kemudian gunakan berkas JSON untuk pemulihan melalui Pengaturan aplikasi. Jangan commit arsip yang sudah didekripsi, database usaha asli, atau kuncinya.

Nama database lokal: **Managgemen DP Trans** (`managgemen_dp_trans.sqlite`). Binding database online tetap `DB` agar data produksi yang ada terus terhubung; nama binding bukan nama berkas SQLite.

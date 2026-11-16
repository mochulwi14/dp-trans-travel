# Kelola Rental & Travel

Sistem web Indonesia/Rupiah untuk rental dan travel. Worker ESM tanpa dependensi, Cloudflare D1 untuk catatan permanen dan R2 untuk dokumen privat. Login dan kebijakan akses melalui Sites/ChatGPT.

## Menjalankan dan memeriksa
- `node scripts/build.mjs`
- `node --test tests/business.test.mjs`
- `npm start` (localhost:8090; SQLite lokal di .runtime, identitas pemilik simulasi, bukan login produksi).
- Sumber UI ada di web/, domain/server di worker/. Hasil dist/server/index.js dibangun otomatis.
- Migrasi D1 berada di drizzle/. Jangan mengubah migrasi yang sudah diterapkan.

## Penggunaan
1. Isi akun kas/bank, kendaraan, pelanggan, dan pengemudi.
2. Buat rute/jadwal travel atau pemesanan rental. Konfirmasi memeriksa jadwal dan kursi. Nomor pemesanan dibuat server.
3. Catat pembayaran pelanggan dan jaminan uang sebagai transaksi berbeda. DP bukan pendapatan sampai layanan selesai.
4. Lepas kunci memerlukan SIM berlaku, dokumen terverifikasi, dan penerimaan jaminan sebelum Berjalan. Jaminan kendaraan hanya data titipan, bukan aset/kas.
5. Catat tagihan pengeluaran, kemudian pembayaran terpisah. Pokok utang dan bunga berbeda transaksi. Pembayaran mitra dibuat dari biaya tetap/persentase pada kendaraan.
6. Tandai layanan selesai, tinjau laporan akrual/arus kas, unduh invoice PDF, laporan PDF/Excel, dan cadangan JSON.
7. Data contoh memakai baris D1 terpisah, bukan data asli. Impor data versi lama dilakukan lewat Pengaturan di browser yang menyimpan data atau unggah JSON lama. Pendapatan kas lama dianggap layanan selesai; periksa kembali sebelum dipakai sebagai pembukuan akrual.
8. Admin/staf menggunakan akun ChatGPT masing-masing. Pemilik perlu memberi akses Site DAN mendaftarkan email/peran di Pengaturan. Izin dokumen, keuangan, dan laporan diperiksa server.
9. PWA dapat ditambahkan ke layar utama. Internet diperlukan untuk membaca/menulis catatan; dokumen dan API tidak di-cache offline.

## Perhitungan dan batas
- Pendapatan layanan selesai, beban berdasarkan tanggal tagihan, bunga, serta penyusutan bulanan garis lurus. Penyusutan mencakup bulan perolehan/akhir periode, berhenti setelah umur manfaat. Tidak ada perhitungan pajak otomatis.
- Piutang: pemesanan non-draf/non-batal dikurangi pembayaran bersih; DP belum jadi pendapatan ditampilkan sebagai kewajiban.
- Transfer internal tidak menjadi pendapatan, beban, atau arus kas gabungan. Modal, prive, uang jaminan, pokok pinjaman berbeda dari pendapatan/beban.
- Laba pemesanan/rute hanya biaya langsung. Laba kendaraan mengurangi biaya bertaut kendaraan dan penyusutan. Beban umum/bunga ada di laba usaha.
- Audit menyimpan waktu server, petugas, aksi dan referensi; transaksi tetap disimpan ketika dibatalkan. Pengembalian pembayaran tidak otomatis saat pembatalan; catat refund terpisah.
- Status saat ini digunakan untuk laporan. Pembatalan layanan selesai dapat merevisi pengakuan pendapatan historis; penutupan periode/jurnal pembalik bertanggal belum tersedia.
- Cadangan JSON mencakup data dan metadata file, bukan byte dokumen R2. Simpan arsip file melalui tautan privat. Masa simpan memblokir akses setelah kedaluwarsa; pembersihan fisik bertahap dilakukan ketika data dibuka, dan pemilik juga dapat menghapus manual.
- Data usaha disimpan sebagai snapshot JSON dengan optimistic locking di D1 untuk mencegah penimpaan bersamaan. Sesuai usaha kecil; arsip/partisi diperlukan sebelum data mencapai batas ukuran satu nilai D1.


## Paket GitHub

Mulai dengan `npm start` (Node.js 24+). Database contoh, SQL, JSON, serta instruksi pemulihan tersedia di [database/README.md](database/README.md). Database `.runtime/kelola.sqlite` dan dokumen `.runtime/files/` bertahan saat server lokal dimulai ulang. Server lokal hanya mendengarkan 127.0.0.1 dan menggunakan identitas simulasi; jangan digunakan sebagai login produksi.

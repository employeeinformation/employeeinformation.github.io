# QR Studio — Employee Profile Workspace

Aplikasi statis berbahasa Indonesia menggunakan HTML, CSS, dan JavaScript murni. Tidak memerlukan backend, database, build, akun, atau koneksi internet untuk menjalankan file lokal.

Workspace profil karyawan dengan tampilan enterprise, tema navy, aksen biru elektrik, logo yang disediakan pengguna, dan ilustrasi skyline. Formulir dimulai kosong; seluruh profil berasal dari data yang dimasukkan pembuatnya. Logo merupakan aset visual yang disediakan pengguna.

Istilah enterprise merujuk pada tampilan dan alur antarmuka. Aplikasi statis ini tidak menyediakan akun, hak akses, validasi kepegawaian, tanda tangan digital, pencabutan profil terpusat, atau penyimpanan data di server. Tautan profil dapat dibaca dan dibuat ulang oleh siapa pun yang memilikinya. Gunakan sesuai kewenangan pengelolaan data organisasi Anda.

## Menjalankan

Buka `index.html` langsung di browser modern. Isi nama, Employee ID, jabatan, departemen, area, masa berlaku, serta foto opsional. Pratinjau dan QR berubah otomatis setelah data valid. Klik **Lihat halaman hasil scan** untuk memeriksa data dan foto pada `template.html`. Untuk mengunduh QR yang dapat dibuka HP lain, jalankan dari alamat publik atau isi **URL publik aplikasi** pada pengaturan tautan QR. Klik **Unduh QR Code** untuk menyimpan PNG hitam-putih 2048 × 2048 piksel. Tombol **Kosongkan formulir** menghapus isian dari workspace saat ini.

## Memilih mode QR

- **Langsung** (default): seluruh data dan foto mini dibawa dalam tautan QR. Foto otomatis diperkecil menjadi 8–80 px dengan batas 900 byte. Tidak perlu mengunggah file profil terpisah. Semakin banyak data, semakin rapat pola QR. Gunakan tombol **Perbesar untuk dipindai** atau PNG asli saat memindai QR berfoto.
- **Ringkas**: QR hanya membawa URL singkat ke file profil statis. Foto dapat mencapai 256 × 256 px (maksimal 24 KB), sehingga lebih jelas dan tidak dibatasi kapasitas QR. Klik **Unduh file profil HTML**, taruh file tersebut di folder `profiles/`, lalu unggah bersama proyek ke GitHub Pages. Setelah file tersedia online, unduh dan bagikan PNG QR. File profil meneruskan pengunjung ke `template.html` dengan data dan foto yang sama. Tidak menggunakan database atau pemendek URL pihak ketiga.

Unggahan JPG, PNG, dan WebP maksimal 5 MB diproses secara adaptif. Aplikasi menyiapkan versi mini serta versi profil dari foto yang sama. Jika browser tidak dapat menghasilkan foto mini yang cukup kecil, foto tetap diterima dan mode Ringkas dipilih otomatis. Berpindah mode tidak mengharuskan unggah ulang. Pratinjau menampilkan versi foto yang sesuai dengan mode pilihan.

Pada mode ringkas, **Lihat halaman hasil scan** tetap membuka data langsung untuk pratinjau; tombol ini bukan bukti file profil telah dipublikasikan. Coba alamat di bagian **Alamat yang dibawa QR** setelah unggah untuk memastikan tidak 404. Perubahan profil menghasilkan nama file baru; unggah file baru tersebut sebelum membagikan QR baru. File lama dan QR lama tetap berfungsi selama file lama dipertahankan.

Jika ingin memakai server lokal dan Node.js sudah tersedia:

```sh
node serve.cjs
```

Buka `http://127.0.0.1:4173`. Server ini hanya alat pengembangan untuk menyajikan file statis; aplikasi tidak bergantung pada server ini dan tidak memproses atau menyimpan profil di server.

## GitHub Pages

1. Unggah isi folder proyek ke repository GitHub, termasuk `assets`, `index.html`, `template.html`, `script.js`, `qr-tools.js`, `photo-tools.js`, `style.css`, `.nojekyll`, dan folder `profiles/` jika menggunakan mode ringkas. Folder `node_modules`, `tests`, serta `output` tidak diperlukan untuk hosting.
2. Buka **Settings → Pages**, pilih **Deploy from a branch**, pilih branch utama dan folder **/(root)**, lalu simpan.
3. Setelah penerbitan selesai, buka alamat Pages yang ditampilkan GitHub (contoh `https://username.github.io/qr-generator/`).
4. Buat dan unduh QR dari alamat publik tersebut. Halaman hasil scan otomatis menggunakan alamat publik yang sama dan mendukung repository dalam subfolder.

Jika membuat QR dari file lokal sebelum publikasi, buka **Pengaturan tautan QR** dan isi URL publik aplikasi, contohnya `https://username.github.io/qr-generator/`. Pastikan proyek sudah tersedia pada alamat itu sebelum QR dibagikan.

**QR yang mengandung alamat `file:`, `localhost`, atau `127.0.0.1` tidak membuka proyek di HP lain.** Aplikasi sekarang menonaktifkan unduhan PNG untuk tujuan lokal tersebut dan membuka pengaturan URL secara otomatis. Pratinjau lokal tetap tersedia. Untuk pemindaian antarperangkat gunakan alamat publik GitHub Pages, dan perangkat pemindai harus terhubung ke internet untuk membuka halaman. Alamat HTTP LAN juga dapat diisi jika server dapat diakses dari HP pada jaringan yang sama. Aplikasi memeriksa format URL, bukan ketersediaan hosting. Tidak diperlukan layanan QR pihak ketiga.

## Cara data dibawa

- Data teks UTF-8 dikodekan sebagai Base64URL dalam fragment `template.html#v1.<data>.<foto>` untuk mode Langsung, atau `#v2.<data>.<foto>` pada file profil mode Ringkas.
- Foto di-crop persegi di bagian tengah, lalu dikompres WebP secara adaptif. Versi mini maksimal 900 byte; versi profil maksimal 24 KB. Tautan v1 lama dengan foto hingga 1.050 byte tetap didukung. Versi v2 dibatasi 38.000 karakter dan tidak dimasukkan ke pola QR secara langsung. Placeholder avatar netral dipakai bila foto tidak diunggah.
- URL dibatasi 2.300 byte. Isian atau URL yang terlalu panjang akan menonaktifkan unduhan dengan pesan agar data dipersingkat. QR memakai koreksi kesalahan M dan quiet zone minimal empat modul.
- QR berisi snapshot. Mengubah formulir tidak mengubah QR lama; unduh QR baru setelah mengedit.
- Tidak ada penyimpanan di localStorage, cookie, analytics, atau request ke layanan eksternal. Data formulir hilang saat halaman dimuat ulang. Pada mode ringkas, file HTML yang diunduh dan diunggah berisi snapshot data profil. Browser/hosting dapat menyimpan riwayat URL atau log akses halaman; fragment tidak dikirim dalam request HTTP.
- Tautan bukan enkripsi atau tanda tangan digital. Pemilik QR dapat membaca dan memodifikasi seluruh data. Tanggal berlaku berasal dari isian pembuat profil, bukan hasil pemeriksaan perusahaan.
- Halaman scan memvalidasi format dan ukuran payload, menggunakan `textContent` untuk data teks, dan hanya menerima foto WebP inline. Tautan rusak menampilkan pesan kesalahan; halaman tanpa payload menampilkan status profil belum tersedia.

## Struktur

```text
index.html            Generator, formulir, live preview, unduh PNG
template.html         Halaman hasil scan responsif
style.css             Tema corporate navy dan electric blue
script.js             Validasi, codec URL, optimasi foto, rendering QR
qr-tools.js           Renderer piksel tajam dan ekspor file profil statis
photo-tools.js        Optimasi foto adaptif untuk dua mode QR
profiles/             File HTML profil untuk mode QR ringkas
assets/logo-web.png   Versi logo yang diperkecil untuk halaman
assets/first med.png  Aset logo asli (dipertahankan)
assets/avatar.svg     Placeholder foto profil netral
assets/skyline.svg    Ilustrasi skyline perkotaan
assets/icons.svg      Ikon SVG lokal
assets/vendor/        Generator QR lokal dan lisensi MIT
serve.cjs             Server statis opsional untuk pengembangan
.nojekyll             Dukungan hosting statis GitHub Pages
```

Pustaka QR: [qrcode-generator oleh Kazuhiko Arase](https://github.com/kazuhikoarase/qrcode-generator), lisensi MIT disertakan di `assets/vendor/LICENSE-qrcode.txt`. Seluruh dependensi runtime disajikan secara lokal; tidak memakai CDN atau font eksternal.

## Pengujian pengembang

```sh
npm ci --ignore-scripts
npm test
```

`jsqr` dan `@napi-rs/canvas` hanya dependensi pengujian. Uji membaca raster hasil renderer menggunakan decoder independen pada ukuran preview dan ekspor, termasuk payload foto, mode ringkas, margin putih, tujuan lokal, data Unicode, dan tautan scan yang rusak. Gambar JPEG dan PNG kompleks sungguhan diuji melalui encoder WebP, versi foto mini dibaca kembali dari QR, dan versi profil diperiksa pada halaman scan. Pengujian ini tidak menggantikan percobaan kamera HP pada kondisi cahaya dan jarak nyata. Panduan margin putih: [DENSO WAVE — Securing Margin](https://www.qrcode.com/en/howto/code.html/index.html).

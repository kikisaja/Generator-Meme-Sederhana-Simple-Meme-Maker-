# 🖼️ Simple Meme Maker (HTML5 Canvas & Image Manipulation)

Aplikasi **Generator Meme Sederhana** berbasis web untuk merancang meme kustom dengan menambahkan teks atas (*top text*) dan teks bawah (*bottom text*) berpola tipografi meme klasik (Impact Font dengan outline hitam) di atas gambar sampel, URL luar, maupun file yang diunggah dari komputer.

Proyek ini sangat cocok untuk siswa SMK Jurusan Rekayasa Perangkat Lunak (RPL/PPLG) Kelas X & XI dalam mempelajari manipulasi grafik 2D menggunakan HTML5 Canvas, pemrosesan file lokal (`FileReader API`), pencetakan font kustom, serta pengunduhan elemen canvas sebagai file gambar PNG.

---

## 🎯 Target Belajar & Konsep RPL

1. **HTML5 Canvas 2D Context (`CanvasRenderingContext2D`):**
   Memahami metode menggambar gambar (`ctx.drawImage`), mengatur gaya teks (`ctx.font`, `ctx.fillStyle`), dan menambahkan garis tepi/outline (`ctx.strokeText`).
2. **Local File Handling (`FileReader API`):**
   Membaca dan mengubah file gambar yang diunggah pengguna menjadi URL data base64 untuk digambar langsung ke dalam kanvas.
3. **Cross-Origin Resource Sharing (CORS):**
   Memahami pengaturan `crossOrigin = "anonymous"` pada objek `Image` agar Canvas dapat diunduh tanpa terkena batasan keamanan peramban (*tained canvas*).
4. **Canvas Export / Download:**
   Mengubah status gambar canvas menjadi format data gambar (*Data URL*) menggunakan `canvas.toDataURL()` untuk diunduh pengguna secara otomatis.

---

## 📂 Struktur Folder Proyek

```text
├── index.html       # Kontrol input teks/gambar, pemilihan sumber, dan elemen HTML5 Canvas
├── style.css        # Layout grid responsif 2-kolom, styling Neobrutalism, dan wadah canvas
└── script.js        # Fungsi render Canvas, event listener FileReader, dan logika unduh meme

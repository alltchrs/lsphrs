// Contoh konten realistis — ganti dengan data asli LSP HRS
window.LSP = {
  nama: "LSP Hasnur Riung Sinergi",
  singkat: "LSP HRS",
  lisensi: "BNSP-LSP-1874-ID",
  skLisensi: "KEP.0412/BNSP/VI/2024",
  berlaku: "12 Juni 2024 – 11 Juni 2029",
  alamat: "Jl. Jend. Ahmad Yani Km. 3,5 No. 1, Banjarmasin, Kalimantan Selatan 70235",
  telp: "(0511) 325 0000",
  wa: "0811 5000 8800",
  email: "lsp@hasnurriung.co.id",
  jam: "Senin – Jumat, 08.00 – 16.30 WITA",
};

window.KATEGORI = ["Semua", "Operasi Alat Berat", "Pemeliharaan Alat", "Pengawasan & K3", "Survei & Perencanaan"];

window.SKEMA = [
  { id: "odt", kode: "SKM-HRS-OP-01", nama: "Operator Dump Truck", kat: "Operasi Alat Berat", jenis: "Okupasi", kkni: "Level II", unit: 9, durasi: "1 hari", peserta: 412,
    ringkas: "Mengoperasikan dump truck rigid & articulated untuk pengangkutan material tambang sesuai SOP dan standar K3." },
  { id: "oex", kode: "SKM-HRS-OP-02", nama: "Operator Excavator", kat: "Operasi Alat Berat", jenis: "Okupasi", kkni: "Level III", unit: 11, durasi: "1 hari", peserta: 286,
    ringkas: "Mengoperasikan excavator untuk penggalian, pemuatan, dan perapihan front kerja di area tambang terbuka." },
  { id: "obd", kode: "SKM-HRS-OP-03", nama: "Operator Bulldozer", kat: "Operasi Alat Berat", jenis: "Okupasi", kkni: "Level III", unit: 10, durasi: "1 hari", peserta: 154,
    ringkas: "Mengoperasikan bulldozer untuk dorong material, pembentukan jalan tambang, dan reklamasi." },
  { id: "ogr", kode: "SKM-HRS-OP-04", nama: "Operator Motor Grader", kat: "Operasi Alat Berat", jenis: "Okupasi", kkni: "Level III", unit: 9, durasi: "1 hari", peserta: 98,
    ringkas: "Merawat dan membentuk permukaan jalan angkut tambang dengan motor grader." },
  { id: "mab", kode: "SKM-HRS-MT-01", nama: "Mekanik Alat Berat Muda", kat: "Pemeliharaan Alat", jenis: "KKNI", kkni: "Level III", unit: 14, durasi: "2 hari", peserta: 231,
    ringkas: "Melaksanakan perawatan berkala, troubleshooting, dan perbaikan sistem engine, hidrolik, dan powertrain." },
  { id: "mel", kode: "SKM-HRS-MT-02", nama: "Mekanik Kelistrikan Alat Berat", kat: "Pemeliharaan Alat", jenis: "Klaster", kkni: "Level III", unit: 8, durasi: "1 hari", peserta: 76,
    ringkas: "Memeriksa dan memperbaiki sistem kelistrikan, starting, charging, dan instrumen alat berat." },
  { id: "tyr", kode: "SKM-HRS-MT-03", nama: "Tyreman Alat Berat", kat: "Pemeliharaan Alat", jenis: "Okupasi", kkni: "Level II", unit: 7, durasi: "1 hari", peserta: 64,
    ringkas: "Melaksanakan pemeriksaan, pelepasan, pemasangan, dan pencatatan kondisi ban off-the-road (OTR)." },
  { id: "wld", kode: "SKM-HRS-MT-04", nama: "Juru Las SMAW 3G", kat: "Pemeliharaan Alat", jenis: "Klaster", kkni: "Level II", unit: 6, durasi: "1 hari", peserta: 58,
    ringkas: "Melakukan pengelasan SMAW posisi 3G pada komponen struktur dan attachment alat berat." },
  { id: "pop", kode: "SKM-HRS-PK-01", nama: "Pengawas Operasional Pertama (POP)", kat: "Pengawasan & K3", jenis: "Okupasi", kkni: "Level IV", unit: 12, durasi: "2 hari", peserta: 187,
    ringkas: "Mengawasi kegiatan operasional pertambangan di lapangan sesuai kaidah teknik pertambangan yang baik." },
  { id: "pom", kode: "SKM-HRS-PK-02", nama: "Pengawas Operasional Madya (POM)", kat: "Pengawasan & K3", jenis: "Okupasi", kkni: "Level V", unit: 13, durasi: "2 hari", peserta: 63,
    ringkas: "Merencanakan dan mengendalikan pengawasan operasional serta membina pengawas pertama." },
  { id: "k3", kode: "SKM-HRS-PK-03", nama: "Petugas K3 Pertambangan", kat: "Pengawasan & K3", jenis: "Klaster", kkni: "Level III", unit: 8, durasi: "1 hari", peserta: 142,
    ringkas: "Melakukan inspeksi, identifikasi bahaya, dan pelaporan insiden di area kerja tambang." },
  { id: "jut", kode: "SKM-HRS-SV-01", nama: "Juru Ukur Tambang", kat: "Survei & Perencanaan", jenis: "Okupasi", kkni: "Level III", unit: 10, durasi: "1 hari", peserta: 47,
    ringkas: "Melakukan pengukuran topografi, stake-out, dan perhitungan volume pemindahan tanah." },
  { id: "drp", kode: "SKM-HRS-SV-02", nama: "Juru Gambar Perencanaan Tambang", kat: "Survei & Perencanaan", jenis: "Klaster", kkni: "Level III", unit: 7, durasi: "1 hari", peserta: 22,
    ringkas: "Menyusun gambar desain pit, disposal, dan jalan tambang menggunakan perangkat lunak perencanaan." },
];

window.UNIT_CONTOH = [
  ["KTB.OP01.001.01", "Menerapkan Prosedur Keselamatan dan Kesehatan Kerja (K3) Pertambangan"],
  ["KTB.OP01.002.01", "Melakukan Komunikasi di Tempat Kerja"],
  ["KTB.OP02.004.01", "Melaksanakan Pemeriksaan Harian Unit (P2H)"],
  ["KTB.OP02.005.01", "Mengoperasikan Unit pada Kondisi Jalan Normal"],
  ["KTB.OP02.006.01", "Mengoperasikan Unit pada Kondisi Jalan Licin dan Menanjak"],
  ["KTB.OP02.008.01", "Melakukan Pemuatan dan Penumpahan Material"],
  ["KTB.OP02.010.01", "Menerapkan Prosedur Parkir dan Pengamanan Unit"],
  ["KTB.OP03.002.01", "Menangani Keadaan Darurat Unit"],
  ["KTB.OP03.004.01", "Membuat Laporan Kerja Harian Operator"],
  ["KTB.OP03.006.01", "Menerapkan Prinsip Pengoperasian Hemat Bahan Bakar"],
  ["KTB.OP03.007.01", "Mengidentifikasi Kerusakan Ringan Unit"],
  ["KTB.UM00.001.01", "Menerapkan Pengelolaan Lingkungan di Area Kerja"],
  ["KTB.UM00.003.01", "Bekerja dalam Tim"],
  ["KTB.UM00.004.01", "Menerapkan Prosedur Mutu"],
];

window.PERSYARATAN = [
  "Karyawan aktif PT Hasnur Riung Sinergi atau perusahaan mitra/subkontraktor terdaftar",
  "Memiliki SIMPER (Surat Izin Mengemudi Perusahaan) yang masih berlaku sesuai unit",
  "Pengalaman kerja minimal 1 tahun pada jabatan terkait, dibuktikan surat keterangan atasan",
  "Telah mengikuti pelatihan berbasis kompetensi pada bidang terkait",
  "Pas foto latar merah 3×4 dan fotokopi KTP",
];

window.TUK = [
  { id: 1, nama: "TUK Mandiri Kantor Pusat", jenis: "Mandiri", lokasi: "Banjarmasin, Kalimantan Selatan", kode: "TUK-HRS-001", skema: ["Pengawas & K3", "Survei"], kapasitas: 40 },
  { id: 2, nama: "TUK Tempat Kerja Workshop Banjarbaru", jenis: "Tempat Kerja", lokasi: "Banjarbaru, Kalimantan Selatan", kode: "TUK-HRS-002", skema: ["Pemeliharaan Alat"], kapasitas: 24 },
  { id: 3, nama: "TUK Tempat Kerja Site Tapin", jenis: "Tempat Kerja", lokasi: "Kab. Tapin, Kalimantan Selatan", kode: "TUK-HRS-003", skema: ["Operasi Alat Berat", "Pemeliharaan Alat"], kapasitas: 30 },
  { id: 4, nama: "TUK Tempat Kerja Site Kotabaru", jenis: "Tempat Kerja", lokasi: "Kab. Kotabaru, Kalimantan Selatan", kode: "TUK-HRS-004", skema: ["Operasi Alat Berat"], kapasitas: 20 },
  { id: 5, nama: "TUK Tempat Kerja Site Kutai Barat", jenis: "Tempat Kerja", lokasi: "Kab. Kutai Barat, Kalimantan Timur", kode: "TUK-HRS-005", skema: ["Operasi Alat Berat", "Pengawasan & K3"], kapasitas: 30 },
  { id: 6, nama: "TUK Tempat Kerja Site Barito Utara", jenis: "Tempat Kerja", lokasi: "Kab. Barito Utara, Kalimantan Tengah", kode: "TUK-HRS-006", skema: ["Operasi Alat Berat"], kapasitas: 20 },
  { id: 7, nama: "TUK Sewaktu Training Center Tanjung", jenis: "Sewaktu", lokasi: "Kab. Tabalong, Kalimantan Selatan", kode: "TUK-HRS-007", skema: ["Operasi Alat Berat", "Pengawasan & K3"], kapasitas: 36 },
];

window.ASESOR = [
  { nama: "Ir. Rahmat Hidayat, S.T.", reg: "MET.000.004812 2019", bidang: "Pengawasan & K3", site: "Banjarmasin" },
  { nama: "Muhammad Fauzan", reg: "MET.000.007731 2020", bidang: "Operasi Alat Berat", site: "Site Tapin" },
  { nama: "Siti Nurhaliza, S.T.", reg: "MET.000.011207 2021", bidang: "Survei & Perencanaan", site: "Banjarmasin" },
  { nama: "Agus Setiawan", reg: "MET.000.006519 2020", bidang: "Pemeliharaan Alat", site: "Workshop Banjarbaru" },
  { nama: "Yudi Prasetyo, A.Md.", reg: "MET.000.012988 2022", bidang: "Pemeliharaan Alat", site: "Site Kutai Barat" },
  { nama: "H. Syahrani", reg: "MET.000.003377 2018", bidang: "Operasi Alat Berat", site: "Site Kotabaru" },
  { nama: "Dewi Anggraini, S.KM.", reg: "MET.000.014402 2023", bidang: "Pengawasan & K3", site: "Site Barito Utara" },
  { nama: "Hendra Gunawan", reg: "MET.000.009154 2021", bidang: "Operasi Alat Berat", site: "Site Kutai Barat" },
];

// Jadwal uji (Oktober–November 2026)
window.JADWAL = [
  { tgl: "2026-10-06", skema: "odt", tuk: 3, kuota: 20, terisi: 20 },
  { tgl: "2026-10-08", skema: "mab", tuk: 2, kuota: 16, terisi: 13 },
  { tgl: "2026-10-14", skema: "pop", tuk: 1, kuota: 25, terisi: 18 },
  { tgl: "2026-10-15", skema: "oex", tuk: 5, kuota: 15, terisi: 9 },
  { tgl: "2026-10-20", skema: "k3", tuk: 7, kuota: 30, terisi: 21 },
  { tgl: "2026-10-22", skema: "odt", tuk: 4, kuota: 20, terisi: 6 },
  { tgl: "2026-10-22", skema: "tyr", tuk: 2, kuota: 12, terisi: 4 },
  { tgl: "2026-10-27", skema: "jut", tuk: 1, kuota: 10, terisi: 3 },
  { tgl: "2026-10-29", skema: "obd", tuk: 6, kuota: 15, terisi: 7 },
  { tgl: "2026-11-04", skema: "mel", tuk: 2, kuota: 12, terisi: 2 },
  { tgl: "2026-11-10", skema: "pom", tuk: 1, kuota: 20, terisi: 5 },
  { tgl: "2026-11-12", skema: "odt", tuk: 5, kuota: 20, terisi: 1 },
  { tgl: "2026-11-18", skema: "wld", tuk: 2, kuota: 10, terisi: 0 },
  { tgl: "2026-11-25", skema: "ogr", tuk: 3, kuota: 12, terisi: 0 },
];

window.SERTIFIKAT = {
  "HRS-2026-0001234": { nama: "Ahmad Riyadi", nrp: "HRS-21-08812", skema: "Operator Excavator", kode: "SKM-HRS-OP-02", terbit: "18 Maret 2026", berlaku: "17 Maret 2029", status: "aktif", reg: "10213 2421 3 0001234 2026" },
  "HRS-2025-0008871": { nama: "Rina Marlina", nrp: "HRS-19-04471", skema: "Petugas K3 Pertambangan", kode: "SKM-HRS-PK-03", terbit: "02 Juli 2025", berlaku: "01 Juli 2028", status: "aktif", reg: "10213 2421 3 0008871 2025" },
  "HRS-2022-0002210": { nama: "Bambang Sutrisno", nrp: "HRS-14-01120", skema: "Operator Dump Truck", kode: "SKM-HRS-OP-01", terbit: "09 Mei 2022", berlaku: "08 Mei 2025", status: "kedaluwarsa", reg: "10213 2421 3 0002210 2022" },
};

window.BERITA = [
  { tgl: "8 Okt 2026", kat: "Kegiatan", judul: "120 Operator Site Kutai Barat Ikuti Uji Kompetensi Serentak", ring: "Uji kompetensi skema Operator Dump Truck dan Excavator dilaksanakan selama tiga hari di TUK Tempat Kerja Site Kutai Barat." },
  { tgl: "24 Sep 2026", kat: "Pengumuman", judul: "Pembukaan Pendaftaran Skema Juru Las SMAW 3G Periode November", ring: "Pendaftaran dibuka bagi mekanik dan welder di seluruh site hingga 4 November 2026." },
  { tgl: "11 Sep 2026", kat: "Kerja Sama", judul: "LSP HRS Lakukan Surveilans Tahunan Bersama BNSP", ring: "Tim BNSP melakukan surveilans terhadap sistem manajemen mutu dan pelaksanaan uji kompetensi." },
  { tgl: "29 Agu 2026", kat: "Kegiatan", judul: "Pelatihan Penyegaran 18 Asesor Kompetensi", ring: "Workshop metodologi asesmen untuk menjaga konsistensi keputusan asesmen di seluruh TUK." },
  { tgl: "14 Agu 2026", kat: "Pengumuman", judul: "Skema Juru Gambar Perencanaan Tambang Resmi Ditambahkan", ring: "Ruang lingkup lisensi kini mencakup 13 skema sertifikasi." },
  { tgl: "30 Jul 2026", kat: "Kegiatan", judul: "Penyerahan Sertifikat Kompetensi Pengawas Operasional Pertama", ring: "Sebanyak 46 pengawas menerima sertifikat kompetensi BNSP di kantor pusat Banjarmasin." },
];

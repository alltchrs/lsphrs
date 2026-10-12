// Jadwal, Daftar, Profil, TUK, Asesor, Berita, Kontak
function Jadwal({ go }) {
  const [ym, setYm] = React.useState([2026, 9]); // Oktober
  const [sel, setSel] = React.useState(null);
  const [kat, setKat] = React.useState("Semua");
  const [y, m] = ym;
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const prevDays = new Date(y, m, 0).getDate();
  const iso = (d) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const evs = window.JADWAL.filter(j => kat === "Semua" || skemaById(j.skema).kat === kat);
  const byDay = (d) => evs.filter(j => j.tgl === iso(d));
  const monthEvs = evs.filter(j => j.tgl.startsWith(`${y}-${String(m + 1).padStart(2, "0")}`));
  const shown = sel ? monthEvs.filter(j => j.tgl === sel) : monthEvs;
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(<div key={"p" + i} className="cal-d mute">{prevDays - first + i + 1}</div>);
  for (let d = 1; d <= days; d++) {
    const e = byDay(d), full = e.length && e.every(x => x.terisi >= x.kuota);
    const isToday = iso(d) === "2026-10-12";
    cells.push(<button key={d} className={"cal-d" + (e.length ? " has" : "") + (sel === iso(d) ? " sel" : "") + (isToday ? " today" : "") + (full ? " full" : "")} onClick={() => e.length && setSel(sel === iso(d) ? null : iso(d))}>
      {d}{e.length > 0 && <span className="dots">{e.map((_, i) => <i key={i}></i>)}</span>}</button>);
  }
  const shift = (n) => { setSel(null); const dt = new Date(y, m + n, 1); setYm([dt.getFullYear(), dt.getMonth()]); };
  return (
    <>
      <PageHead go={go} crumbs={[[null, "Jadwal Uji"]]} title="Jadwal Uji Kompetensi" sub="Pilih tanggal pada kalender untuk melihat sesi uji. Pendaftaran ditutup H-5 sebelum pelaksanaan." />
      <section className="sec" style={{ paddingTop: 40 }}><div className="wrap">
        <div className="chips scroll" style={{ marginBottom: 24 }}>{window.KATEGORI.map(k => <button key={k} className={"chip" + (kat === k ? " on" : "")} onClick={() => { setKat(k); setSel(null); }}>{k}</button>)}</div>
        <div className="two-col" style={{ gridTemplateColumns: "380px 1fr" }}>
          <div className="sticky">
            <div className="cal">
              <div className="cal-h"><h3>{BULAN[m]} {y}</h3><div className="cal-nav"><button onClick={() => shift(-1)} aria-label="Bulan sebelumnya"><Ico n="left" s={16} /></button><button onClick={() => shift(1)} aria-label="Bulan berikutnya"><Ico n="right" s={16} /></button></div></div>
              <div className="cal-g">{["Min","Sen","Sel","Rab","Kam","Jum","Sab"].map(d => <div key={d} className="dn">{d}</div>)}{cells}</div>
              <div style={{ display: "flex", gap: 16, fontSize: 12.5, color: "var(--ink-3)", marginTop: 16, flexWrap: "wrap" }}>
                <span style={{ display: "flex", gap: 6, alignItems: "center" }}><i style={{ width: 8, height: 8, borderRadius: 4, background: "var(--accent)" }}></i>Tersedia</span>
                <span style={{ display: "flex", gap: 6, alignItems: "center" }}><i style={{ width: 8, height: 8, borderRadius: 4, background: "var(--red)" }}></i>Penuh</span>
                <span style={{ display: "flex", gap: 6, alignItems: "center" }}><i style={{ width: 12, height: 12, borderRadius: 3, boxShadow: "inset 0 0 0 1.5px var(--accent)" }}></i>Hari ini</span>
              </div>
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, gap: 12 }}>
              <h3 style={{ fontSize: 18 }}>{sel ? fmtTgl(sel) : `Semua sesi ${BULAN[m]}`} <span style={{ color: "var(--ink-3)", fontWeight: 500 }}>· {shown.length}</span></h3>
              {sel && <button className="link" onClick={() => setSel(null)}>Tampilkan semua</button>}
            </div>
            {shown.length ? <JadwalList items={shown} go={go} /> : <div className="card" style={{ textAlign: "center", padding: 40, color: "var(--ink-2)" }}>Belum ada sesi uji pada bulan ini.</div>}
          </div>
        </div>
      </div></section>
    </>
  );
}

function Daftar({ go, preSkema, preTgl }) {
  const [step, setStep] = React.useState(0);
  const [f, setF] = React.useState({ skema: preSkema || "", tgl: preTgl || "", tujuan: "baru", nama: "", nrp: "", nik: "", hp: "", email: "", dept: "", site: "", jabatan: "", masa: "", files: {}, setuju: false });
  const [err, setErr] = React.useState({});
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const S = ["Skema & Jadwal", "Data Pribadi", "Data Pekerjaan", "Dokumen", "Konfirmasi"];
  const sk = skemaById(f.skema);
  const jad = window.JADWAL.filter(j => j.skema === f.skema && j.tgl >= "2026-10-12");
  const validate = () => {
    const e = {};
    if (step === 0) { if (!f.skema) e.skema = 1; if (!f.tgl) e.tgl = 1; }
    if (step === 1) ["nama", "nik", "hp", "email"].forEach(k => !f[k] && (e[k] = 1));
    if (step === 2) ["nrp", "dept", "site", "jabatan"].forEach(k => !f[k] && (e[k] = 1));
    if (step === 3) ["ktp", "foto", "simper", "sk"].forEach(k => !f.files[k] && (e[k] = 1));
    setErr(e); return !Object.keys(e).length;
  };
  const next = () => validate() && setStep(step + 1);
  const isi = () => setF(p => ({ ...p, nama: "Muhammad Rizky Pratama", nik: "6371 0412 9603 0007", hp: "0812 5123 4567", email: "rizky.pratama@hasnurriung.co.id", nrp: "HRS-22-10458", dept: "Production", site: "Site Tapin", jabatan: "Operator Dump Truck", masa: "3 tahun" }));
  const Fld = ({ k, l, ph, req = true, type = "text", hint }) => (
    <div className={"fld" + (err[k] ? " err" : "")}><label>{l} {req && <i>*</i>}</label><input type={type} placeholder={ph} value={f[k]} onChange={e => set(k, e.target.value)} />{(err[k] || hint) && <span className="hint">{err[k] ? "Wajib diisi" : hint}</span>}</div>
  );
  if (step === 5) return (
    <>
      <PageHead go={go} crumbs={[[null, "Pendaftaran"]]} title="Pendaftaran berhasil dikirim" />
      <section className="sec"><div className="wrap" style={{ maxWidth: 720 }}>
        <div className="res fade-in">
          <div className="rh ok"><div className="ri"><Ico n="check" /></div><div><div style={{ fontWeight: 700, fontSize: 17 }}>Nomor pendaftaran APL-2026-10-0482</div><div style={{ fontSize: 13.5, opacity: .9 }}>Simpan nomor ini untuk memantau status</div></div></div>
          <div className="rb">
            <dl className="kv"><dt>Asesi</dt><dd>{f.nama}</dd><dt>Skema</dt><dd>{sk && sk.nama}</dd><dt>Jadwal</dt><dd>{f.tgl && fmtTgl(f.tgl)}</dd></dl>
            <p style={{ marginTop: 20, fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.6 }}>Admin LSP akan memverifikasi berkas dalam 3 hari kerja. Tautan asesmen mandiri (FR.APL.02) akan dikirim ke <b>{f.email}</b> setelah verifikasi.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}><button className="btn btn-primary" onClick={() => go("home")}>Kembali ke beranda</button><button className="btn btn-ghost"><Ico n="doc" s={16} /> Unduh bukti FR.APL.01</button></div>
          </div>
        </div>
      </div></section>
    </>
  );
  return (
    <>
      <PageHead go={go} crumbs={[[null, "Pendaftaran Asesi"]]} title="Pendaftaran Uji Kompetensi" sub="Formulir Permohonan Sertifikasi Kompetensi (FR.APL.01). Siapkan KTP, SIMPER, dan surat rekomendasi atasan." />
      <section className="sec" style={{ paddingTop: 40 }}><div className="wrap" style={{ maxWidth: 960 }}>
        <div className="stepper">{S.map((l, i) => <div key={l} className={"si" + (i === step ? " on" : i < step ? " ok" : "")}><span className="n">{i < step ? <Ico n="check" s={13} /> : i + 1}</span><span>{l}</span></div>)}</div>
        <div className="card fade-in" key={step} style={{ padding: 32 }}>
          {step === 0 && <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div className={"fld" + (err.skema ? " err" : "")}><label>Skema sertifikasi <i>*</i></label>
              <select value={f.skema} onChange={e => { set("skema", e.target.value); set("tgl", ""); }}><option value="">— Pilih skema —</option>{window.KATEGORI.slice(1).map(k => <optgroup key={k} label={k}>{window.SKEMA.filter(s => s.kat === k).map(s => <option key={s.id} value={s.id}>{s.nama}</option>)}</optgroup>)}</select>
              {err.skema && <span className="hint">Pilih skema</span>}</div>
            <div className="fld"><label>Tujuan asesmen <i>*</i></label>
              <div className="grid2" style={{ gap: 10 }}>{[["baru", "Sertifikasi baru", "Belum pernah memiliki sertifikat skema ini"], ["rcc", "Sertifikasi ulang (RCC)", "Sertifikat lama habis/akan habis masa berlaku"]].map(([k, l, d]) => <div key={k} className={"opt" + (f.tujuan === k ? " on" : "")} onClick={() => set("tujuan", k)}><span className="rd"></span><div><b style={{ fontSize: 14.5 }}>{l}</b><div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>{d}</div></div></div>)}</div></div>
            <div className={"fld" + (err.tgl ? " err" : "")}><label>Jadwal uji <i>*</i></label>
              {!f.skema ? <p style={{ fontSize: 14, color: "var(--ink-3)" }}>Pilih skema terlebih dahulu.</p> : jad.length ? <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {jad.map(j => { const full = j.terisi >= j.kuota, t = tukById(j.tuk); return <div key={j.tgl + j.tuk} className={"opt" + (f.tgl === j.tgl ? " on" : "")} style={full ? { opacity: .5, cursor: "not-allowed" } : {}} onClick={() => !full && set("tgl", j.tgl)}><span className="rd"></span><div style={{ flex: 1 }}><b style={{ fontSize: 14.5 }}>{fmtTgl(j.tgl)}</b><div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>{t.nama} · {t.lokasi}</div></div><span className={"tag " + (full ? "r" : "g")}>{full ? "Penuh" : `${j.kuota - j.terisi} kursi`}</span></div>; })}
              </div> : <p style={{ fontSize: 14, color: "var(--ink-2)" }}>Belum ada jadwal untuk skema ini. Hubungi admin LSP.</p>}
              {err.tgl && <span className="hint">Pilih jadwal</span>}</div>
          </div>}
          {step === 1 && <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}><h3 style={{ fontSize: 18 }}>Data pribadi</h3><button className="link" style={{ fontSize: 13 }} onClick={isi}>Isi contoh data</button></div>
            {Fld({ k: "nama", l: "Nama lengkap (sesuai KTP)", ph: "Nama lengkap" })}
            <div className="frow">{Fld({ k: "nik", l: "NIK", ph: "16 digit" })}<div className="fld"><label>Tanggal lahir</label><input type="date" /></div></div>
            <div className="frow">{Fld({ k: "hp", l: "Nomor HP / WhatsApp", ph: "08xx" })}{Fld({ k: "email", l: "Email", ph: "nama@perusahaan.co.id", hint: "Notifikasi status dikirim ke email ini" })}</div>
            <div className="fld"><label>Pendidikan terakhir</label><select><option>SMA/SMK sederajat</option><option>D3</option><option>S1/D4</option><option>S2</option></select></div>
          </div>}
          {step === 2 && <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}><h3 style={{ fontSize: 18 }}>Data pekerjaan</h3><button className="link" style={{ fontSize: 13 }} onClick={isi}>Isi contoh data</button></div>
            <div className="frow">{Fld({ k: "nrp", l: "NRP / ID Karyawan", ph: "HRS-xx-xxxxx" })}<div className="fld"><label>Perusahaan</label><select><option>PT Hasnur Riung Sinergi</option><option>Mitra / Subkontraktor</option></select></div></div>
            <div className="frow">{Fld({ k: "dept", l: "Departemen", ph: "mis. Production, Plant" })}
              <div className={"fld" + (err.site ? " err" : "")}><label>Site / lokasi kerja <i>*</i></label><select value={f.site} onChange={e => set("site", e.target.value)}><option value="">— Pilih —</option>{["Kantor Pusat Banjarmasin", "Workshop Banjarbaru", "Site Tapin", "Site Kotabaru", "Site Kutai Barat", "Site Barito Utara", "Site Tabalong"].map(s => <option key={s}>{s}</option>)}</select>{err.site && <span className="hint">Wajib diisi</span>}</div></div>
            <div className="frow">{Fld({ k: "jabatan", l: "Jabatan saat ini", ph: "mis. Operator Dump Truck" })}{Fld({ k: "masa", l: "Lama bekerja di jabatan", ph: "mis. 2 tahun", req: false })}</div>
          </div>}
          {step === 3 && <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h3 style={{ fontSize: 18, marginBottom: 6 }}>Bukti persyaratan dasar</h3>
            {[["ktp", "KTP", "JPG/PDF, maks. 2 MB"], ["foto", "Pas foto latar merah 3×4", "JPG, maks. 1 MB"], ["simper", "SIMPER yang masih berlaku", "JPG/PDF, maks. 2 MB"], ["sk", "Surat keterangan kerja & rekomendasi atasan", "PDF, maks. 2 MB"], ["pel", "Sertifikat pelatihan terkait (opsional)", "PDF, maks. 5 MB"]].map(([k, l, h]) => {
              const done = f.files[k];
              return <div key={k} className={"upl" + (done ? " done" : "")} style={err[k] ? { borderColor: "var(--red)" } : {}}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}><span style={{ color: done ? "var(--green)" : "var(--ink-3)" }}><Ico n={done ? "check" : "doc"} /></span><div style={{ minWidth: 0 }}><div style={{ fontWeight: 600, fontSize: 14.5 }}>{l}</div><div style={{ fontSize: 12.5, color: err[k] ? "var(--red)" : "var(--ink-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{done ? done : err[k] ? "Dokumen wajib diunggah" : h}</div></div></div>
                <button className="btn btn-ghost btn-sm" onClick={() => set("files", { ...f.files, [k]: done ? undefined : `${k}_${(f.nama || "asesi").split(" ")[0].toLowerCase()}.pdf · 640 KB` })}>{done ? "Hapus" : <><Ico n="up" s={15} /> Unggah</>}</button>
              </div>;
            })}
            <button className="link" style={{ fontSize: 13, alignSelf: "flex-start", marginTop: 4 }} onClick={() => setF(p => ({ ...p, files: { ktp: "ktp.jpg · 410 KB", foto: "pasfoto.jpg · 220 KB", simper: "simper.pdf · 880 KB", sk: "surat_rekomendasi.pdf · 1,1 MB" } }))}>Simulasikan semua terunggah</button>
          </div>}
          {step === 4 && <div>
            <h3 style={{ fontSize: 18, marginBottom: 18 }}>Periksa kembali permohonan Anda</h3>
            <div className="grid2" style={{ gap: 16 }}>
              {[["Skema & jadwal", 0, [["Skema", sk && sk.nama], ["Tujuan", f.tujuan === "rcc" ? "Sertifikasi ulang" : "Sertifikasi baru"], ["Jadwal", f.tgl && fmtTgl(f.tgl)]]],
                ["Data pribadi", 1, [["Nama", f.nama], ["NIK", f.nik], ["Email", f.email]]],
                ["Data pekerjaan", 2, [["NRP", f.nrp], ["Site", f.site], ["Jabatan", f.jabatan]]],
                ["Dokumen", 3, [["Terunggah", Object.values(f.files).filter(Boolean).length + " berkas"]]]].map(([h, s, rows]) =>
                <div key={h} style={{ border: "1px solid var(--line)", borderRadius: 8, padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><b style={{ fontSize: 14 }}>{h}</b><button className="link" style={{ fontSize: 13 }} onClick={() => setStep(s)}>Ubah</button></div>
                  {rows.map(([k, v]) => <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13.5, padding: "4px 0" }}><span style={{ color: "var(--ink-3)" }}>{k}</span><span style={{ fontWeight: 600, textAlign: "right" }}>{v || "—"}</span></div>)}
                </div>)}
            </div>
            <label style={{ display: "flex", gap: 12, marginTop: 22, fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, cursor: "pointer" }}><input type="checkbox" checked={f.setuju} onChange={e => set("setuju", e.target.checked)} style={{ width: 18, height: 18, marginTop: 2, accentColor: "var(--indigo)" }} />Saya menyatakan data yang saya isi benar dan bersedia mengikuti proses asesmen sesuai ketentuan LSP Hasnur Riung Sinergi dan BNSP.</label>
          </div>}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--line-2)", gap: 12 }}>
            <button className="btn btn-ghost" onClick={() => step ? setStep(step - 1) : go("skema")}><Ico n="left" s={16} /> {step ? "Kembali" : "Batal"}</button>
            {step < 4 ? <button className="btn btn-primary" onClick={next}>Lanjut <Ico n="arrow" s={16} /></button> : <button className="btn btn-accent" disabled={!f.setuju} onClick={() => setStep(5)}>Kirim permohonan</button>}
          </div>
        </div>
      </div></section>
    </>
  );
}

function Profil({ go }) {
  const L = window.LSP;
  return (
    <>
      <PageHead go={go} crumbs={[[null, "Profil & Legalitas"]]} title="Profil LSP Hasnur Riung Sinergi" sub="Lembaga Sertifikasi Profesi Pihak Kedua yang dibentuk PT Hasnur Riung Sinergi untuk memastikan setiap tenaga kerja di lingkungan operasional tambang memiliki kompetensi yang diakui secara nasional." />
      <section className="sec" style={{ paddingTop: 48 }}><div className="wrap two-col">
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div>
            <div className="eyebrow">Tentang Kami</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)", marginTop: 14 }}>LSP HRS memperoleh lisensi dari Badan Nasional Sertifikasi Profesi (BNSP) pada tahun 2019 dan diperpanjang pada 2024. Sebagai LSP P2, kami melaksanakan sertifikasi kompetensi bagi karyawan PT Hasnur Riung Sinergi beserta pemasok dan mitra jejaring kerjanya, sesuai Pedoman BNSP 202 dan SNI ISO/IEC 17024.</p>
          </div>
          <div className="grid2">
            <div className="card"><div className="eyebrow">Visi</div><p style={{ marginTop: 10, lineHeight: 1.65, fontSize: 15.5 }}>Menjadi lembaga sertifikasi profesi terpercaya di sektor jasa pertambangan Kalimantan yang menghasilkan tenaga kerja kompeten, selamat, dan produktif.</p></div>
            <div className="card"><div className="eyebrow">Misi</div><ul style={{ margin: "10px 0 0", paddingLeft: 18, lineHeight: 1.65, fontSize: 15 }}><li>Melaksanakan uji kompetensi yang objektif dan imparsial</li><li>Mengembangkan skema sesuai kebutuhan operasional</li><li>Menjaga mutu asesor dan TUK secara berkelanjutan</li></ul></div>
          </div>
          <div>
            <div className="eyebrow">Struktur Organisasi</div>
            <div className="grid3" style={{ marginTop: 16 }}>
              {[["Dewan Pengarah", "Direksi PT HRS"], ["Ketua LSP", "Ir. H. Muhammad Ridwan, M.T."], ["Manajer Mutu", "Lisa Andriani, S.T."], ["Manajer Sertifikasi", "Fajar Nugroho, S.T."], ["Manajer Administrasi", "Nur Aini, S.E."], ["Komite Skema", "7 anggota pakar"]].map(([r, n]) =>
                <div key={r} className="card" style={{ display: "flex", gap: 14, alignItems: "center", padding: 18 }}><Ph label="" h={52} style={{ width: 52, borderRadius: "50%", flexShrink: 0, padding: 0 }} /><div><div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{r}</div><div style={{ fontWeight: 600, fontSize: 14.5 }}>{n}</div></div></div>)}
            </div>
          </div>
        </div>
        <aside className="sticky">
          <div className="card" style={{ borderTop: "4px solid var(--indigo)" }}>
            <div className="eyebrow">Legalitas</div>
            <h3 style={{ fontSize: 19, margin: "8px 0 18px" }}>Lisensi BNSP</h3>
            <Ph label="scan sertifikat lisensi BNSP" h={200} />
            <dl className="kv" style={{ gridTemplateColumns: "110px 1fr", marginTop: 18 }}>
              <dt>No. lisensi</dt><dd className="mono" style={{ fontSize: 13 }}>{L.lisensi}</dd>
              <dt>SK BNSP</dt><dd className="mono" style={{ fontSize: 13 }}>{L.skLisensi}</dd>
              <dt>Masa berlaku</dt><dd>{L.berlaku}</dd>
              <dt>Jenis</dt><dd>LSP Pihak Kedua</dd>
              <dt>Ruang lingkup</dt><dd>13 skema</dd>
            </dl>
            <button className="btn btn-ghost" style={{ width: "100%", marginTop: 18 }}><Ico n="doc" s={16} /> Unduh SK lisensi</button>
          </div>
        </aside>
      </div></section>
    </>
  );
}

function TukPage({ go }) {
  const [j, setJ] = React.useState("Semua");
  const list = window.TUK.filter(t => j === "Semua" || t.jenis === j);
  return (
    <>
      <PageHead go={go} crumbs={[["profil", "Profil"], [null, "Tempat Uji Kompetensi"]]} title="Tempat Uji Kompetensi (TUK)" sub="Seluruh TUK telah diverifikasi LSP untuk kesesuaian sarana, prasarana, dan alat sesuai persyaratan skema." />
      <section className="sec" style={{ paddingTop: 40 }}><div className="wrap">
        <div className="chips" style={{ marginBottom: 28 }}>{["Semua", "Mandiri", "Tempat Kerja", "Sewaktu"].map(k => <button key={k} className={"chip" + (j === k ? " on" : "")} onClick={() => setJ(k)}>TUK {k === "Semua" ? "semua jenis" : k}</button>)}</div>
        <div className="grid3">{list.map(t => (
          <div className="card" key={t.id} style={{ padding: 0, overflow: "hidden" }}>
            <Ph label={"foto " + t.nama.replace(/TUK (Tempat Kerja|Mandiri|Sewaktu) /, "")} h={150} style={{ borderRadius: 0 }} />
            <div style={{ padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span className={"tag " + (t.jenis === "Mandiri" ? "" : t.jenis === "Sewaktu" ? "o" : "c")}>{t.jenis}</span><span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{t.kode}</span></div>
              <h3 style={{ fontSize: 17, margin: "12px 0 6px", lineHeight: 1.3 }}>{t.nama}</h3>
              <div style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--ink-2)", fontSize: 13.5 }}><Ico n="pin" s={15} />{t.lokasi}</div>
              <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line-2)" }}>{t.skema.join(" · ")} · kapasitas {t.kapasitas} asesi/hari</div>
            </div>
          </div>))}</div>
      </div></section>
    </>
  );
}

function AsesorPage({ go }) {
  const [q, setQ] = React.useState("");
  const list = window.ASESOR.filter(a => (a.nama + a.bidang + a.site).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHead go={go} crumbs={[["profil", "Profil"], [null, "Asesor"]]} title="Asesor Kompetensi" sub="Asesor teregistrasi BNSP dengan kompetensi teknis sesuai bidang skema yang diujikan." />
      <section className="sec" style={{ paddingTop: 40 }}><div className="wrap">
        <div className="search" style={{ maxWidth: 420, marginBottom: 24 }}><span className="ico"><Ico n="search" /></span><input placeholder="Cari nama, bidang, atau lokasi…" value={q} onChange={e => setQ(e.target.value)} /></div>
        <div className="grid4">{list.map(a => (
          <div className="card" key={a.reg} style={{ padding: 20 }}>
            <Ph label="foto" h={64} style={{ width: 64, borderRadius: "50%", padding: 0 }} />
            <h3 style={{ fontSize: 16, margin: "16px 0 4px", lineHeight: 1.3 }}>{a.nama}</h3>
            <div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{a.reg}</div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6, fontSize: 13.5 }}><span className="tag" style={{ alignSelf: "flex-start" }}>{a.bidang}</span><span style={{ color: "var(--ink-2)", display: "flex", gap: 5, alignItems: "center" }}><Ico n="pin" s={14} />{a.site}</span></div>
          </div>))}</div>
      </div></section>
    </>
  );
}

function BeritaPage({ go }) {
  const [k, setK] = React.useState("Semua");
  const list = window.BERITA.filter(b => k === "Semua" || b.kat === k);
  return (
    <>
      <PageHead go={go} crumbs={[[null, "Berita & Galeri"]]} title="Berita & Galeri" sub="Pengumuman resmi, kegiatan uji kompetensi, dan dokumentasi LSP HRS." />
      <section className="sec" style={{ paddingTop: 40 }}><div className="wrap">
        <div className="chips" style={{ marginBottom: 28 }}>{["Semua", "Pengumuman", "Kegiatan", "Kerja Sama"].map(x => <button key={x} className={"chip" + (k === x ? " on" : "")} onClick={() => setK(x)}>{x}</button>)}</div>
        <div className="grid3">{list.map((b, i) => <NewsCard key={i} b={b} />)}</div>
        <div className="sec-h" style={{ marginTop: 80 }}><div><div className="eyebrow">Galeri</div><h2>Dokumentasi kegiatan</h2></div></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gridAutoRows: 160, gap: 12 }}>
          {["uji praktik dump truck", "asesmen mekanik", "rapat pleno", "surveilans BNSP", "penyerahan sertifikat", "workshop asesor", "uji tertulis K3", "TUK Site Tapin"].map((l, i) => <Ph key={l} label={l} style={i === 0 ? { gridColumn: "span 2", gridRow: "span 2" } : {}} />)}
        </div>
      </div></section>
    </>
  );
}

function Kontak({ go }) {
  const L = window.LSP;
  const [sent, setSent] = React.useState(false);
  return (
    <>
      <PageHead go={go} crumbs={[[null, "Kontak"]]} title="Hubungi Kami" sub="Sekretariat LSP melayani pertanyaan seputar skema, jadwal, dan status sertifikasi." />
      <section className="sec" style={{ paddingTop: 48 }}><div className="wrap two-col" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[["pin", "Alamat sekretariat", L.alamat], ["phone", "Telepon / WhatsApp", L.telp + " · WA " + L.wa], ["mail", "Email", L.email], ["clock", "Jam layanan", L.jam]].map(([i, h, v]) =>
            <div key={h} className="card" style={{ display: "flex", gap: 16, padding: 20 }}><span style={{ width: 42, height: 42, borderRadius: 8, background: "var(--bg-3)", color: "var(--indigo)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ico n={i} /></span><div><div style={{ fontSize: 13, color: "var(--ink-3)" }}>{h}</div><div style={{ fontWeight: 600, marginTop: 2, lineHeight: 1.5 }}>{v}</div></div></div>)}
          <Ph label="peta lokasi (embed Google Maps)" h={220} />
        </div>
        <div className="card" style={{ padding: 32 }}>
          {sent ? <div className="fade-in" style={{ textAlign: "center", padding: "40px 0" }}><div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--green)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ico n="check" s={26} /></div><h3 style={{ fontSize: 20, marginTop: 18 }}>Pesan terkirim</h3><p style={{ color: "var(--ink-2)", marginTop: 8 }}>Tim sekretariat akan membalas dalam 1×24 jam kerja.</p><button className="btn btn-ghost" style={{ marginTop: 20 }} onClick={() => setSent(false)}>Kirim pesan lain</button></div> :
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h3 style={{ fontSize: 20 }}>Kirim pesan</h3>
              <div className="frow"><div className="fld"><label>Nama</label><input placeholder="Nama lengkap" /></div><div className="fld"><label>Email</label><input placeholder="email@contoh.com" /></div></div>
              <div className="fld"><label>Topik</label><select><option>Informasi skema</option><option>Jadwal & pendaftaran</option><option>Verifikasi sertifikat</option><option>Banding / pengaduan</option><option>Lainnya</option></select></div>
              <div className="fld"><label>Pesan</label><textarea rows="5" placeholder="Tulis pertanyaan Anda…"></textarea></div>
              <button className="btn btn-primary btn-lg" onClick={() => setSent(true)}>Kirim pesan</button>
            </div>}
        </div>
      </div></section>
    </>
  );
}

Object.assign(window, { Jadwal, Daftar, Profil, TukPage, AsesorPage, BeritaPage, Kontak });

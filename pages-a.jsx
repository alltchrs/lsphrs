// Beranda, Skema, Detail Skema, Cek Sertifikat
function Hero({ layout, go }) {
  const [no, setNo] = React.useState("");
  const L = window.LSP;
  const badge = <div className="badge"><b>LSP P2</b>Berlisensi BNSP · {L.skLisensi}</div>;
  const title = <h1>Kompetensi yang <em>teruji</em>, keselamatan yang terjamin.</h1>;
  const lead = <p className="lead">Sertifikasi kompetensi resmi BNSP untuk operator, mekanik, dan pengawas tambang di lingkungan PT Hasnur Riung Sinergi dan mitra kerjanya.</p>;
  const ctas = <div className="ctas"><button className="btn btn-accent btn-lg" onClick={() => go("daftar")}>Daftar Uji Kompetensi <Ico n="arrow" /></button><button className="btn btn-ghost btn-lg" onClick={() => go("skema")}>Lihat 13 Skema</button></div>;

  if (layout === "center") return (
    <section className="hero hero-center"><div className="wrap">
      {badge}{title}{lead}
      <div className="cek-box">
        <input placeholder="Cek nomor sertifikat, mis. HRS-2026-0001234" value={no} onChange={e => setNo(e.target.value)} onKeyDown={e => e.key === "Enter" && go("cek:" + no)} />
        <button className="btn btn-primary" onClick={() => go("cek:" + no)}><Ico n="search" s={16} /> Verifikasi</button>
      </div>
      <div style={{ marginTop: 18, fontSize: 14, color: "inherit", opacity: .75 }}>atau <button className="link" style={{ color: "inherit", textDecoration: "underline" }} onClick={() => go("daftar")}>daftar uji kompetensi</button></div>
    </div></section>
  );
  if (layout === "full") return (
    <section className="hero hero-full">
      <Ph className="bg" dark label="" />
      <div className="phlabel ph dark" style={{ padding: 0, background: "none" }}><span>foto lebar: asesmen operator di site tambang</span></div>
      <div className="wrap">{badge}{title}{lead}{ctas}</div>
    </section>
  );
  return (
    <section className="hero hero-split"><div className="wrap">
      <div>
        {badge}{title}{lead}{ctas}
        <div className="facts">
          <div className="f"><b>13</b><span>Skema berlisensi</span></div>
          <div className="f"><b>7</b><span>TUK di Kalimantan</span></div>
          <div className="f"><b>1.840+</b><span>Asesi kompeten</span></div>
        </div>
      </div>
      <div className="hero-media">
        <Ph label="foto: asesor menilai operator excavator" />
        <Ph label="foto: uji praktik mekanik" />
        <Ph label="foto: penyerahan sertifikat" />
      </div>
    </div></section>
  );
}

function Home({ go, layout }) {
  const unggulan = ["odt", "oex", "mab", "pop", "k3", "jut"].map(skemaById);
  const jadwal = window.JADWAL.filter(j => j.tgl >= "2026-10-12").slice(0, 4);
  const [no, setNo] = React.useState("");
  return (
    <>
      <Hero layout={layout} go={go} />
      <div className="strip"><div className="wrap">
        <div className="s"><b>13</b><span>Skema sertifikasi</span></div>
        <div className="s"><b>1.840+</b><span>Sertifikat terbit</span></div>
        <div className="s"><b>24</b><span>Asesor teregistrasi</span></div>
        <div className="s"><b>7</b><span>Tempat Uji Kompetensi</span></div>
      </div></div>

      <section className="sec"><div className="wrap">
        <div className="sec-h">
          <div><div className="eyebrow">Skema Sertifikasi</div><h2>Skema yang paling banyak diikuti</h2></div>
          <button className="btn btn-ghost" onClick={() => go("skema")}>Semua skema <Ico n="arrow" s={16} /></button>
        </div>
        <div className="grid3">{unggulan.map(s => <SkemaCard key={s.id} s={s} go={go} />)}</div>
      </div></section>

      <section className="sec alt"><div className="wrap">
        <div className="sec-h">
          <div><div className="eyebrow">Alur Sertifikasi</div><h2>Lima tahap menuju sertifikat kompetensi BNSP</h2></div>
          <p>Seluruh proses mengacu pada Pedoman BNSP 301 dan 302 tentang pelaksanaan uji kompetensi.</p>
        </div>
        <div className="steps">
          {[
            ["Pendaftaran", "Pilih skema dan jadwal, isi formulir permohonan secara online.", "FR.APL.01"],
            ["Asesmen Mandiri", "Menilai diri terhadap unit kompetensi dan unggah bukti pendukung.", "FR.APL.02"],
            ["Verifikasi", "Admin LSP dan asesor memeriksa kelengkapan persyaratan dasar.", "Pra-asesmen"],
            ["Uji Kompetensi", "Observasi praktik, tanya jawab, dan portofolio di TUK.", "FR.IA.01 – 11"],
            ["Sertifikat", "Rapat pleno memutuskan; sertifikat BNSP terbit dan bisa diverifikasi.", "Berlaku 3 tahun"],
          ].map(([h, p, d], i) => (
            <div className="step" key={h}><div className="n">{i + 1}</div><div><h4>{h}</h4><p>{p}</p><div className="doc">{d}</div></div></div>
          ))}
        </div>
      </div></section>

      <section className="sec"><div className="wrap">
        <div className="sec-h">
          <div><div className="eyebrow">Jadwal Terdekat</div><h2>Uji kompetensi yang dibuka</h2></div>
          <button className="btn btn-ghost" onClick={() => go("jadwal")}>Kalender lengkap <Ico n="arrow" s={16} /></button>
        </div>
        <JadwalList items={jadwal} go={go} />
      </div></section>

      <section className="sec alt"><div className="wrap">
        <div className="two-col" style={{ gridTemplateColumns: "1fr 1fr", alignItems: "center" }}>
          <div>
            <div className="eyebrow">Verifikasi Sertifikat</div>
            <h2 style={{ fontSize: 34, lineHeight: 1.15, marginTop: 10 }}>Pastikan keaslian sertifikat kompetensi</h2>
            <p style={{ color: "var(--ink-2)", lineHeight: 1.6, marginTop: 14, maxWidth: 480 }}>HRD, kontraktor, dan inspektur tambang dapat memeriksa status sertifikat yang diterbitkan LSP HRS secara langsung.</p>
          </div>
          <div>
            <div className="cek-box">
              <input placeholder="Nomor sertifikat" value={no} onChange={e => setNo(e.target.value)} onKeyDown={e => e.key === "Enter" && go("cek:" + no)} />
              <button className="btn btn-primary" onClick={() => go("cek:" + no)}>Verifikasi</button>
            </div>
            <p style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 12 }}>Contoh: <button className="link mono" style={{ fontSize: 13 }} onClick={() => go("cek:HRS-2026-0001234")}>HRS-2026-0001234</button></p>
          </div>
        </div>
      </div></section>

      <section className="sec"><div className="wrap">
        <div className="sec-h">
          <div><div className="eyebrow">Berita & Kegiatan</div><h2>Kabar terbaru dari LSP HRS</h2></div>
          <button className="btn btn-ghost" onClick={() => go("berita")}>Semua berita <Ico n="arrow" s={16} /></button>
        </div>
        <div className="grid3">{window.BERITA.slice(0, 3).map((b, i) => <NewsCard key={i} b={b} />)}</div>
        <div style={{ marginTop: 72 }} className="cta-band">
          <div><h2>Siap menguji kompetensi Anda?</h2><p>Pendaftaran dilakukan oleh asesi melalui rekomendasi atasan/departemen. Proses verifikasi berkas maksimal 3 hari kerja.</p></div>
          <div className="acts"><button className="btn btn-accent btn-lg" onClick={() => go("daftar")}>Daftar Sekarang</button><button className="btn btn-line-w btn-lg" onClick={() => go("kontak")}>Hubungi Admin</button></div>
        </div>
      </div></section>
    </>
  );
}

function NewsCard({ b }) {
  return (
    <article className="news card hov" style={{ padding: 0, border: 0, background: "transparent" }}>
      <Ph label="foto kegiatan" />
      <div className="m"><span className={"tag " + (b.kat === "Pengumuman" ? "o" : b.kat === "Kerja Sama" ? "c" : "")}>{b.kat}</span><span>{b.tgl}</span></div>
      <h3>{b.judul}</h3>
      <p>{b.ring}</p>
    </article>
  );
}

function JadwalList({ items, go }) {
  return (
    <div className="jlist">
      <div className="jrow head"><span>Tanggal</span><span>Skema</span><span>Tempat Uji</span><span>Kuota</span><span></span></div>
      {items.map((j, i) => {
        const s = skemaById(j.skema), t = tukById(j.tuk), d = new Date(j.tgl + "T00:00:00"), full = j.terisi >= j.kuota;
        return (
          <div className="jrow" key={i}>
            <div className="jdate"><b>{d.getDate()}</b><span>{BLN[d.getMonth()]} {d.getFullYear()}</span></div>
            <div className="t"><b>{s.nama}</b><span className="mono">{s.kode}</span></div>
            <div className="t"><b style={{ fontWeight: 500, fontSize: 14.5 }}>{t.nama}</b><span>{t.lokasi}</span></div>
            <div className={"quota" + (full ? " full" : "")}>{full ? "Kuota penuh" : `${j.kuota - j.terisi} kursi tersisa`}<div className="bar"><i style={{ width: (j.terisi / j.kuota * 100) + "%" }}></i></div></div>
            <div className="act">{full ? <button className="btn btn-ghost btn-sm" disabled>Penuh</button> : <button className="btn btn-primary btn-sm" onClick={() => go("daftar:" + j.skema + ":" + j.tgl)}>Daftar</button>}</div>
          </div>
        );
      })}
    </div>
  );
}

function SkemaList({ go }) {
  const [kat, setKat] = React.useState("Semua");
  const [q, setQ] = React.useState("");
  const [jenis, setJenis] = React.useState("Semua");
  const list = window.SKEMA.filter(s => (kat === "Semua" || s.kat === kat) && (jenis === "Semua" || s.jenis === jenis) && (s.nama + s.kode + s.ringkas).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHead go={go} crumbs={[[null, "Skema Sertifikasi"]]} title="Skema Sertifikasi" sub="13 skema dalam ruang lingkup lisensi BNSP, disusun berdasarkan SKKNI bidang pertambangan mineral dan batubara." />
      <section className="sec" style={{ paddingTop: 40 }}><div className="wrap">
        <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
          <div className="search" style={{ minWidth: 240 }}><span className="ico"><Ico n="search" /></span><input placeholder="Cari nama atau kode skema…" value={q} onChange={e => setQ(e.target.value)} /></div>
          <div className="fld" style={{ width: 200 }}><select value={jenis} onChange={e => setJenis(e.target.value)} style={{ height: 48 }}>{["Semua", "Okupasi", "KKNI", "Klaster"].map(o => <option key={o} value={o}>{o === "Semua" ? "Semua jenis skema" : "Skema " + o}</option>)}</select></div>
        </div>
        <div className="chips scroll" style={{ marginBottom: 28 }}>
          {window.KATEGORI.map(k => <button key={k} className={"chip" + (kat === k ? " on" : "")} onClick={() => setKat(k)}>{k} <span style={{ opacity: .6, marginLeft: 4 }}>{k === "Semua" ? window.SKEMA.length : window.SKEMA.filter(s => s.kat === k).length}</span></button>)}
        </div>
        <p style={{ fontSize: 14, color: "var(--ink-3)", marginBottom: 16 }}>Menampilkan {list.length} skema</p>
        {list.length ? <div className="grid3">{list.map(s => <SkemaCard key={s.id} s={s} go={go} />)}</div>
          : <div className="card" style={{ textAlign: "center", padding: 48, color: "var(--ink-2)" }}>Tidak ada skema yang cocok. <button className="link" onClick={() => { setQ(""); setKat("Semua"); setJenis("Semua"); }}>Atur ulang filter</button></div>}
      </div></section>
    </>
  );
}

function SkemaDetail({ id, go }) {
  const s = skemaById(id) || window.SKEMA[0];
  const units = window.UNIT_CONTOH.slice(0, s.unit);
  const next = window.JADWAL.filter(j => j.skema === s.id && j.tgl >= "2026-10-12");
  const [tab, setTab] = React.useState("unit");
  return (
    <>
      <PageHead go={go} crumbs={[["skema", "Skema Sertifikasi"], [null, s.nama]]} title={s.nama} sub={s.ringkas} />
      <section className="sec" style={{ paddingTop: 40 }}><div className="wrap two-col">
        <div>
          <div className="chips" style={{ marginBottom: 24 }}>
            {[["unit", `Unit Kompetensi (${s.unit})`], ["syarat", "Persyaratan"], ["metode", "Metode Asesmen"]].map(([k, l]) => <button key={k} className={"chip" + (tab === k ? " on" : "")} onClick={() => setTab(k)}>{l}</button>)}
          </div>
          {tab === "unit" && <div className="tbl-wrap fade-in"><table className="tbl"><thead><tr><th style={{ width: 40 }}>No</th><th>Kode Unit</th><th>Judul Unit Kompetensi</th></tr></thead>
            <tbody>{units.map(([k, j], i) => <tr key={k}><td>{i + 1}</td><td className="mono">{k}</td><td>{j}</td></tr>)}</tbody></table></div>}
          {tab === "syarat" && <div className="card fade-in"><h3 style={{ fontSize: 17, marginBottom: 14 }}>Persyaratan dasar pemohon</h3>
            <ol style={{ margin: 0, paddingLeft: 20, lineHeight: 1.7, color: "var(--ink-2)" }}>{window.PERSYARATAN.map(p => <li key={p} style={{ marginBottom: 6 }}>{p}</li>)}</ol></div>}
          {tab === "metode" && <div className="grid2 fade-in">{[["Observasi demonstrasi", "Asesi mendemonstrasikan pekerjaan langsung pada unit di area TUK.", "FR.IA.01"], ["Pertanyaan lisan", "Asesor menggali pengetahuan pendukung secara lisan.", "FR.IA.07"], ["Pertanyaan tertulis", "Soal pilihan ganda/esai untuk aspek pengetahuan K3 dan prosedur.", "FR.IA.05"], ["Verifikasi portofolio", "Pemeriksaan logbook, surat keterangan kerja, dan sertifikat pelatihan.", "FR.IA.08"]].map(([h, p, c]) => <div className="card" key={h}><span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{c}</span><h4 style={{ fontSize: 16, margin: "8px 0 6px" }}>{h}</h4><p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55 }}>{p}</p></div>)}</div>}
        </div>
        <aside className="sticky">
          <div className="card">
            <dl className="kv" style={{ gridTemplateColumns: "120px 1fr" }}>
              <dt>Kode skema</dt><dd className="mono" style={{ fontSize: 13 }}>{s.kode}</dd>
              <dt>Jenis</dt><dd>Skema {s.jenis}</dd>
              <dt>Jenjang</dt><dd>KKNI {s.kkni}</dd>
              <dt>Durasi uji</dt><dd>{s.durasi}</dd>
              <dt>Masa berlaku</dt><dd>3 tahun</dd>
            </dl>
            <div style={{ borderTop: "1px solid var(--line-2)", margin: "18px 0", paddingTop: 18 }}>
              <div style={{ fontSize: 13, color: "var(--ink-3)" }}>Biaya uji kompetensi</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: "var(--indigo)", marginTop: 4 }}>{biaya(s)}</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 4 }}>Ditanggung perusahaan untuk karyawan HRS</div>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: "100%" }} onClick={() => go("daftar:" + s.id)}>Daftar skema ini</button>
            <button className="btn btn-ghost" style={{ width: "100%", marginTop: 8 }}><Ico n="doc" s={16} /> Unduh dokumen skema (PDF)</button>
          </div>
          <div className="card" style={{ marginTop: 16 }}>
            <h4 style={{ fontSize: 15, marginBottom: 12 }}>Jadwal tersedia</h4>
            {next.length ? next.map((j, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: i ? "1px solid var(--line-2)" : 0, gap: 10 }}>
              <div><div style={{ fontWeight: 600, fontSize: 14 }}>{fmtTgl(j.tgl)}</div><div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{tukById(j.tuk).nama}</div></div>
              <button className="link" style={{ fontSize: 13.5 }} onClick={() => go("daftar:" + s.id + ":" + j.tgl)}>Pilih</button></div>)
              : <p style={{ fontSize: 14, color: "var(--ink-2)" }}>Belum ada jadwal. Ajukan permintaan uji melalui admin departemen.</p>}
          </div>
        </aside>
      </div></section>
    </>
  );
}

function CekSertifikat({ go, initial }) {
  const [no, setNo] = React.useState(initial || "");
  const [res, setRes] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const run = (v) => {
    const key = (v ?? no).trim().toUpperCase();
    if (!key) return;
    setLoading(true); setRes(null);
    setTimeout(() => { setLoading(false); setRes({ key, data: window.SERTIFIKAT[key] }); }, 650);
  };
  React.useEffect(() => { if (initial) run(initial); }, []);
  const d = res && res.data;
  return (
    <>
      <PageHead go={go} crumbs={[[null, "Cek Sertifikat"]]} title="Verifikasi Sertifikat Kompetensi" sub="Masukkan nomor sertifikat yang tercantum di bagian kanan atas sertifikat untuk memeriksa keaslian dan masa berlakunya." />
      <section className="sec" style={{ paddingTop: 40 }}><div className="wrap" style={{ maxWidth: 820 }}>
        <div className="cek-box">
          <input placeholder="HRS-YYYY-XXXXXXX" value={no} onChange={e => setNo(e.target.value)} onKeyDown={e => e.key === "Enter" && run()} />
          <button className="btn btn-primary" onClick={() => run()} disabled={loading}>{loading ? "Memeriksa…" : <><Ico n="search" s={16} /> Verifikasi</>}</button>
        </div>
        <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>Coba contoh:
          {Object.keys(window.SERTIFIKAT).map(k => <button key={k} className="link mono" style={{ fontSize: 13 }} onClick={() => { setNo(k); run(k); }}>{k}</button>)}
          <button className="link mono" style={{ fontSize: 13 }} onClick={() => { setNo("HRS-2026-9999999"); run("HRS-2026-9999999"); }}>HRS-2026-9999999</button>
        </div>
        {res && <div className="res fade-in" style={{ marginTop: 32 }}>
          {d ? <>
            <div className={"rh " + (d.status === "aktif" ? "ok" : "bad")}>
              <div className="ri">{d.status === "aktif" ? <Ico n="check" /> : "!"}</div>
              <div><div style={{ fontWeight: 700, fontSize: 17 }}>{d.status === "aktif" ? "Sertifikat valid dan aktif" : "Sertifikat terdaftar, masa berlaku habis"}</div><div style={{ fontSize: 13.5, opacity: .9 }}>Nomor {res.key}</div></div>
            </div>
            <div className="rb" style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 24 }}>
              <Ph label="pas foto" h={140} />
              <dl className="kv">
                <dt>Nama pemegang</dt><dd>{d.nama}</dd>
                <dt>NRP</dt><dd className="mono" style={{ fontSize: 13 }}>{d.nrp}</dd>
                <dt>Skema</dt><dd>{d.skema} <span className="mono" style={{ fontWeight: 400, color: "var(--ink-3)", fontSize: 12.5 }}>({d.kode})</span></dd>
                <dt>No. registrasi BNSP</dt><dd className="mono" style={{ fontSize: 13 }}>{d.reg}</dd>
                <dt>Tanggal terbit</dt><dd>{d.terbit}</dd>
                <dt>Berlaku hingga</dt><dd style={{ color: d.status === "aktif" ? "inherit" : "#B9581A" }}>{d.berlaku}</dd>
              </dl>
            </div>
            {d.status !== "aktif" && <div style={{ padding: "0 24px 24px", fontSize: 14, color: "var(--ink-2)" }}>Pemegang perlu mengikuti <button className="link" onClick={() => go("daftar")}>sertifikasi ulang (RCC)</button>.</div>}
          </> : <>
            <div className="rh no"><div className="ri"><Ico n="x" /></div><div><div style={{ fontWeight: 700, fontSize: 17 }}>Nomor tidak ditemukan</div><div style={{ fontSize: 13.5, opacity: .9 }}>{res.key}</div></div></div>
            <div className="rb" style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.6 }}>Pastikan format nomor benar. Jika sertifikat diterbitkan sebelum 2021, hubungi admin LSP di <b>{window.LSP.email}</b> untuk verifikasi manual.</div>
          </>}
        </div>}
      </div></section>
    </>
  );
}

Object.assign(window, { Home, SkemaList, SkemaDetail, CekSertifikat, JadwalList, NewsCard });

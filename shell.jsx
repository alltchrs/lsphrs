// Shared shell: icons, header, footer, helpers
const Ico = ({ n, s = 18 }) => {
  const p = {
    search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    left: <path d="M15 6l-6 6 6 6" />,
    right: <path d="M9 6l6 6-6 6" />,
    check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
    x: <path d="M6 6l12 12M18 6L6 18" />,
    pin: <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
    phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    doc: <><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5" /></>,
    up: <path d="M12 16V5M7 10l5-5 5 5M5 19h14" />,
  }[n];
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
};

const Ph = ({ label, h, dark, style, className = "" }) => (
  <div className={"ph " + (dark ? "dark " : "") + className} style={{ height: h, ...style }}><span>{label}</span></div>
);

const BULAN = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const BLN = BULAN.map(b => b.slice(0, 3));
const HARI = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
const fmtTgl = (iso) => { const d = new Date(iso + "T00:00:00"); return `${HARI[d.getDay()]}, ${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`; };
const skemaById = (id) => window.SKEMA.find(s => s.id === id);
const tukById = (id) => window.TUK.find(t => t.id === id);
const biaya = (s) => s.kkni.includes("IV") || s.kkni.includes("V") ? "Rp 1.750.000" : s.unit > 10 ? "Rp 1.250.000" : "Rp 950.000";

const NAV = [
  { k: "home", l: "Beranda" },
  { k: "profil", l: "Profil", dd: [
    { k: "profil", l: "Tentang & Legalitas", d: "Lisensi BNSP, visi misi, struktur" },
    { k: "tuk", l: "Tempat Uji Kompetensi", d: "7 TUK di Kalimantan" },
    { k: "asesor", l: "Asesor Kompetensi", d: "Asesor teregistrasi BNSP" },
  ]},
  { k: "skema", l: "Skema Sertifikasi" },
  { k: "jadwal", l: "Jadwal Uji" },
  { k: "cek", l: "Cek Sertifikat" },
  { k: "berita", l: "Berita" },
  { k: "kontak", l: "Kontak" },
];

function Header({ page, go }) {
  const [open, setOpen] = React.useState(false);
  const base = page.split(":")[0];
  const isOn = (n) => n.k === base || (n.dd && n.dd.some(d => d.k === base)) || (n.k === "skema" && base === "detail");
  const nav = (k) => { setOpen(false); go(k); };
  return (
    <>
      <div className="util">
        <div className="wrap">
          <div className="lic"><span className="dot"></span>Berlisensi <b>BNSP</b> · No. {window.LSP.lisensi}</div>
          <div className="u-r"><span>{window.LSP.telp}</span><span>{window.LSP.email}</span><span>{window.LSP.jam}</span></div>
        </div>
      </div>
      <header className="hdr">
        <div className="wrap">
          <a className="logo" href="#" onClick={(e) => { e.preventDefault(); nav("home"); }}><img src="assets/logo-lsp-hrs.png" alt="LSP Hasnur Riung Sinergi" /></a>
          <nav className="nav">
            {NAV.map(n => (
              <div className="ni" key={n.l}>
                <button className={"nl" + (isOn(n) ? " on" : "")} onClick={() => nav(n.k)}>{n.l}{n.dd ? " ▾" : ""}</button>
                {n.dd && <div className="dd">{n.dd.map(d => <button key={d.k} onClick={() => nav(d.k)}><b>{d.l}</b><span>{d.d}</span></button>)}</div>}
              </div>
            ))}
          </nav>
          <div className="hdr-r">
            <button className="btn btn-primary" onClick={() => nav("daftar")}>Daftar Uji Kompetensi</button>
            <button className="burger" aria-label="Menu" onClick={() => setOpen(true)}><i></i><i></i><i></i></button>
          </div>
        </div>
      </header>
      {open && (
        <div className="drawer" onClick={() => setOpen(false)}>
          <div className="drawer-in" onClick={e => e.stopPropagation()}>
            <div className="dh"><img src="assets/logo-lsp-hrs.png" style={{ height: 34 }} /><button className="burger" style={{ display: "flex" }} onClick={() => setOpen(false)}><Ico n="x" /></button></div>
            {[["home","Beranda"],["profil","Profil & Legalitas"],["skema","Skema Sertifikasi"],["jadwal","Jadwal Uji"],["tuk","Tempat Uji Kompetensi"],["asesor","Asesor"],["cek","Cek Sertifikat"],["berita","Berita & Galeri"],["kontak","Kontak"]].map(([k, l]) =>
              <button key={k} className={"dl" + (base === k ? " on" : "")} onClick={() => nav(k)}>{l}</button>)}
            <button className="btn btn-primary btn-lg" style={{ marginTop: 20 }} onClick={() => nav("daftar")}>Daftar Uji Kompetensi</button>
          </div>
        </div>
      )}
    </>
  );
}

function Footer({ go }) {
  const L = window.LSP;
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="cols">
          <div>
            <div className="logo-chip"><img src="assets/logo-lsp-hrs.png" alt="" /></div>
            <p style={{ marginTop: 18, lineHeight: 1.65, maxWidth: 320 }}>Lembaga Sertifikasi Profesi Pihak Kedua (P2) yang menjamin kompetensi tenaga kerja PT Hasnur Riung Sinergi dan mitra kerjanya.</p>
            <p className="mono" style={{ marginTop: 14, fontSize: 12.5 }}>Lisensi {L.lisensi}<br />SK {L.skLisensi}</p>
          </div>
          <div>
            <h5>Layanan</h5>
            <ul>{[["skema","Skema Sertifikasi"],["jadwal","Jadwal Uji"],["daftar","Pendaftaran Asesi"],["cek","Cek Sertifikat"]].map(([k,l]) => <li key={k}><button onClick={() => go(k)}>{l}</button></li>)}</ul>
          </div>
          <div>
            <h5>Lembaga</h5>
            <ul>{[["profil","Profil & Legalitas"],["tuk","Tempat Uji Kompetensi"],["asesor","Asesor"],["berita","Berita & Galeri"],["kontak","Kontak"]].map(([k,l]) => <li key={k}><button onClick={() => go(k)}>{l}</button></li>)}</ul>
          </div>
          <div>
            <h5>Kantor Sekretariat</h5>
            <p style={{ lineHeight: 1.65 }}>{L.alamat}</p>
            <p style={{ marginTop: 12, lineHeight: 1.8 }}>{L.telp}<br />WA {L.wa}<br />{L.email}</p>
          </div>
        </div>
        <div className="bot">
          <span>© 2026 {L.nama}. Hak cipta dilindungi.</span>
          <span>Diawasi oleh Badan Nasional Sertifikasi Profesi (BNSP)</span>
        </div>
      </div>
    </footer>
  );
}

function PageHead({ title, sub, crumbs = [], go }) {
  return (
    <div className="ph-head">
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="crumb"><button onClick={() => go("home")}>Beranda</button>{crumbs.map(([k, l], i) => <React.Fragment key={i}><span>/</span>{k ? <button onClick={() => go(k)}>{l}</button> : <span style={{ color: "#fff" }}>{l}</span>}</React.Fragment>)}</div>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
    </div>
  );
}

function SkemaCard({ s, go }) {
  return (
    <div className="card hov sk-card" onClick={() => go("detail:" + s.id)}>
      <div className="k"><span className="tag">{s.kat}</span><span className="code">{s.kode}</span></div>
      <h3>{s.nama}</h3>
      <p>{s.ringkas}</p>
      <div className="meta"><span><b>{s.unit}</b> unit</span><span>KKNI <b>{s.kkni.replace("Level ", "")}</b></span><span><b>{s.durasi}</b></span></div>
    </div>
  );
}

Object.assign(window, { Ico, Ph, Header, Footer, PageHead, SkemaCard, BULAN, BLN, HARI, fmtTgl, skemaById, tukById, biaya });

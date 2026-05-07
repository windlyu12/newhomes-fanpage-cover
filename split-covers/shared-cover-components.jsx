
const { useState, useEffect } = React;
const COVER_WIDTH = 1247;
const COVER_HEIGHT = 466;

/* ====== Shared sub-components ====== */
const LOGO_BLACK = "assets/logo-newhomes-black.png";
const LOGO_WHITE = "assets/logo-newhomes-white.png";

function NHLogo({ src, light = false, height = 56 }) {
  const finalSrc = src || (light ? LOGO_BLACK : LOGO_WHITE);
  return (
    <img
      className="nh-logo"
      src={finalSrc}
      alt="Newhomes"
      style={{
        height: `${height}px`,
        width: "auto",
      }}
    />
  );
}

function BrandLock({ light = false, sub = "Member of Newhomes Group", logoHeight = 56 }) {
  return (
    <div className={`brand-lock ${light ? "light" : ""}`}>
      <NHLogo light={light} height={logoHeight} />
      <div className="divider"></div>
      <div className="word">
        <div className="main">Newhomes <span className={light ? "gold" : "gold-pale"}>OceanPark</span></div>
        <div className="sub">{sub}</div>
      </div>
    </div>
  );
}

function Hotline({ light = false, label = "Hotline / Zalo", number = "0395 959 878" }) {
  return (
    <div className={`hotline-block ${light ? "light" : ""}`}>
      <div className="label">{label}</div>
      <div className="number mono" style={{ fontFamily: "var(--f-display)" }}>
        {number}
      </div>
    </div>
  );
}

const BRANCH_ITEMS = [
  { tag: "CN 1", address: "ZR2, Vinhomes Ocean Park, Gia Lâm, Hà Nội", icon: "pin-icon" },
  { tag: "CN 2", address: "GS5, Smart City, Tây Mỗ, Hà Nội", icon: "pin-icon" },
  { tag: "CN 3", address: "Phú Lộc, Tuệ Tĩnh, Hải Phòng", icon: "pin-icon" },
  { tag: "CN 4", address: "Khoái Châu, Hưng Yên", icon: "pin-icon" },
  { tag: "Nhà máy", address: "Cần Kiệm, Thạch Thất, Hà Nội", icon: "factory-icon" },
];

function BranchStrip({ light = false, style }) {
  return (
    <div className={`branch-strip ${light ? "light" : ""}`} style={style}>
      {BRANCH_ITEMS.map((branch) => (
        <div className="item" key={branch.tag}>
          <div className="tag">
            <svg className="pin-svg" style={{ marginRight: 6 }}><use href={`#${branch.icon}`}/></svg>
            {branch.tag}
          </div>
          <div className="addr">{branch.address}</div>
        </div>
      ))}
    </div>
  );
}

/* ====== Variation 1 — Portrait split (dark left, photo right) ====== */
function CoverV1() {
  return (
    <div className="fb-cover">
      <div className="cover-original v1">
      <div className="left-pane">
        <BrandLock light={false} logoHeight={64} />

        <div>
          <div className="headline-stack" style={{ position: "static", textShadow: "none" }}>
            <div className="kicker">Thiết kế &amp; thi công nội thất</div>
            <h1 className="display">
              Một tổ ấm đẹp,<br/>bắt đầu từ những<br/>điều <em>rõ ràng</em>.
            </h1>
            <div className="tagline" style={{ marginTop: 20 }}>
              Trọn gói nội thất cho gia đình mới tại Ocean Park, Ecopark, Gia Lâm &amp; Long Biên.
            </div>
          </div>
        </div>

        <Hotline light={false} />
      </div>
      <div className="right-pane">
        <div className="photo-bg"></div>
      </div>
      <BranchStrip style={{ background: "linear-gradient(180deg, transparent 0%, rgba(10,8,6,0.78) 100%)" }} />
      </div>
    </div>
  );
}

/* ====== Variation 2 — Centered editorial (cover-bg-editorial vibe) ====== */
function CoverV2() {
  return (
    <div className="fb-cover">
      <div className="cover-original v2">
      <div className="photo-bg editorial"></div>
      <div className="vignette center-darken"></div>
      <div className="vignette editorial"></div>

      <div className="top-strip">
        <div className="branch-list">
          <span className="pin">◆</span>OCEAN PARK
          <span className="sep">·</span>ECOPARK
          <span className="sep">·</span>LONG BIÊN
          <span className="sep">·</span>GIA LÂM
        </div>
        <div className="right">noithatoceanpark.com</div>
      </div>

      <div className="center-content">
        <div className="ornament">
          <span className="line"></span>
          <span className="smallcaps" style={{ fontSize: 11, color: "var(--gold-pale)" }}>Newhomes OceanPark · Member of Newhomes Group</span>
          <span className="line"></span>
        </div>
        <NHLogo light={false} height={84} />
        <h1 className="display" style={{ fontSize: 78, marginTop: 30, color: "#fff", textAlign: "center", maxWidth: 1100 }}>
          Thiết kế &amp; thi công <em>trọn gói</em><br/>
          cho tổ ấm Ocean Park.
        </h1>
        <Hotline light={false} label="Tư vấn miễn phí · Zalo / Hotline" />
      </div>

      <BranchStrip />
      </div>
    </div>
  );
}

/* ====== Variation 3 — Architectural grid (dark, technical) ====== */
function CoverV3() {
  return (
    <div className="fb-cover">
      <div className="cover-original v3">
      <div className="photo-bg dark"></div>
      <div className="vignette dark"></div>
      <div className="grid-overlay"></div>

      <div className="corner-mark tl"></div>
      <div className="corner-mark tr"></div>
      <div className="corner-mark bl"></div>
      <div className="corner-mark br"></div>

      <div className="index-tag">N° 02 · OCEAN PARK · EST. CN</div>

      <div className="top-strip" style={{ borderBottom: "0", padding: "44px 88px 0" }}>
        <BrandLock light={false} logoHeight={48} />
        <div className="right" style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--gold-pale)" }}>
          INTERIOR · DESIGN · BUILD
        </div>
      </div>

      <div className="headline-stack" style={{ left: 88, top: 230, maxWidth: 980 }}>
        <div className="kicker">Member of Newhomes Group</div>
        <h1 className="display" style={{ fontSize: 80 }}>
          Nội thất <em>trọn gói</em><br/>
          cho căn hộ Ocean Park.
        </h1>
        <div className="tagline">
          Xưởng riêng · Showroom ZR2 · Đội thi công am hiểu OCP 1/2/3.
        </div>

        <div className="usp-row">
          <div className="usp">Bảo hành 2 năm</div>
          <div className="usp">Cam kết tiến độ</div>
          <div className="usp">Báo giá minh bạch</div>
          <div className="usp">Vật liệu chuẩn</div>
        </div>
      </div>

      <div style={{ position: "absolute", right: 88, bottom: 110, zIndex: 5, textAlign: "right" }}>
        <Hotline light={false} label="Hotline · Zalo" />
      </div>

      <BranchStrip />
      </div>
    </div>
  );
}

/* ====== Variation 4 — Light quiet luxury, glass card ====== */
function CoverV4() {
  return (
    <div className="fb-cover">
      <div className="cover-original v4">
      <div className="photo-bg quiet"></div>
      <div className="vignette quiet"></div>

      <div className="left-card">
        <div>
          <BrandLock light={true} logoHeight={56} />
          <div className="rule-h light" style={{ marginTop: 28 }}></div>
        </div>

        <div className="headline-stack light" style={{ position: "static" }}>
          <div className="kicker">Thiết kế &amp; thi công nội thất</div>
          <h1 className="display" style={{ fontSize: 56 }}>
            Tổ ấm <em>tinh tế</em><br/>cho gia đình<br/>Ocean Park.
          </h1>
          <div className="tagline">
            Phục vụ Ocean Park, Ecopark, Long Biên &amp; Gia Lâm.
          </div>
        </div>

        <Hotline light={true} />
      </div>

      <div style={{ position: "absolute", right: 80, top: 80, zIndex: 4, textAlign: "right" }}>
        <div className="smallcaps" style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.32em" }}>
          Catalogue · 2026
        </div>
        <div style={{ marginTop: 8, fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.14em" }}>
          NOITHATOCEANPARK.COM
        </div>
      </div>

      <BranchStrip light={true} />
      </div>
    </div>
  );
}

/* ====== Variation 5 — Symmetric banner: hotline focal ====== */
function CoverV5() {
  return (
    <div className="fb-cover">
      <div className="cover-original v5">
      <div className="photo-bg"></div>
      <div className="vignette dark"></div>
      <div className="vignette center-darken"></div>

      <div className="top-strip">
        <BrandLock light={false} logoHeight={48} />
        <div className="right" style={{ fontFamily: "var(--f-mono)", fontSize: 11 }}>
          OCEAN PARK · ECOPARK · LONG BIÊN · GIA LÂM
        </div>
      </div>

      <div className="banner-overlay">
        <div></div>
        <div className="banner-mid">
          <div style={{ textAlign: "right" }}>
            <div className="smallcaps" style={{ fontSize: 11, color: "var(--gold-pale)", letterSpacing: "0.32em" }}>
              Thiết kế &amp; Thi công
            </div>
            <h2 className="display" style={{ fontSize: 36, color: "#fff", marginTop: 14, lineHeight: 1.1 }}>
              Nội thất trọn gói<br/><em style={{ color: "var(--gold-pale)" }}>tại Ocean Park</em>
            </h2>
          </div>

          <div className="center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div className="smallcaps" style={{ fontSize: 11, color: "var(--gold-pale)", letterSpacing: "0.40em" }}>
              Hotline · Zalo
            </div>
            <div className="display" style={{ fontSize: 92, color: "#fff", lineHeight: 1, letterSpacing: "-0.01em" }}>
              0395 <em style={{ color: "var(--gold-pale)" }}>959</em> 878
            </div>
            <div className="rule-h" style={{ background: "var(--gold-pale)" }}></div>
            <div className="smallcaps" style={{ fontSize: 11, color: "rgba(255,255,255,0.78)", letterSpacing: "0.30em" }}>
              Tư vấn miễn phí · Báo giá minh bạch
            </div>
          </div>

          <div>
            <div className="usp" style={{ marginBottom: 10, display: "block", textAlign: "center" }}>Bảo hành 2 năm</div>
            <div className="usp" style={{ marginBottom: 10, display: "block", textAlign: "center" }}>Xưởng riêng</div>
            <div className="usp" style={{ display: "block", textAlign: "center" }}>Cam kết tiến độ</div>
          </div>
        </div>
        <div></div>
      </div>

      <BranchStrip />
      </div>
    </div>
  );
}

/* ====== Variation 6 — Editorial magazine (light) ====== */
function CoverV6() {
  return (
    <div className="fb-cover">
      <div className="cover-original v6">
      <div className="layout">
        <div className="left">
          <div>
            <BrandLock light={true} logoHeight={56} />
          </div>

          <div className="headline-stack light" style={{ position: "static" }}>
            <div className="kicker" style={{ fontSize: 11, letterSpacing: "0.36em", color: "var(--gold)" }}>
              Số 06 · Catalogue 2026 · Newhomes OceanPark
            </div>
            <h1 className="display" style={{ fontSize: 70, color: "var(--ink)" }}>
              Một tổ ấm đẹp,<br/>bắt đầu từ những<br/>điều <em>rõ ràng</em>.
            </h1>
            <div className="tagline" style={{ color: "var(--ink-soft)", borderLeftColor: "var(--gold)" }}>
              Newhomes — thiết kế &amp; thi công nội thất trọn gói<br/>
              tại Ocean Park · Ecopark · Long Biên · Gia Lâm.
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
            <Hotline light={true} label="Hotline · Zalo" />
            <div style={{ textAlign: "right", fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.14em", lineHeight: 1.6 }}>
              <div style={{ color: "var(--gold)", letterSpacing: "0.32em", marginBottom: 4 }}>WEBSITE</div>
              NOITHATOCEANPARK.COM<br/>
              FB.COM/NEWHOMES.OCEANPARK
            </div>
          </div>
        </div>

        <div className="right">
          <div className="photo-bg editorial"></div>
          <div className="vignette" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0) 60%)" }}></div>
          <div className="image-label">Render · Modern Premium · OCP-2BR-A</div>
          <div style={{ position: "absolute", left: 24, top: 24, zIndex: 3, fontFamily: "var(--f-mono)", fontSize: 10, color: "rgba(250,245,234,0.7)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Plate 06 / OCEAN PARK
          </div>
        </div>
      </div>

      <BranchStrip
        light={true}
        style={{
          background: "transparent",
          borderTop: "1px solid rgba(26,23,20,0.10)",
          padding: "14px 80px 18px",
        }}
      />
      </div>
    </div>
  );
}

/* ====== App: design canvas ====== */

function renderCover(CoverComponent) {
  ReactDOM.createRoot(document.getElementById("cover-root")).render(<CoverComponent />);
}

Object.assign(window, {
  COVER_WIDTH,
  COVER_HEIGHT,
  CoverV1,
  CoverV2,
  CoverV3,
  CoverV4,
  CoverV5,
  CoverV6,
  renderCover,
});

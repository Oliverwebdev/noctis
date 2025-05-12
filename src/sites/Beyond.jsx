import React from "react";
import { Github, Zap, Share2 } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import "./Beyond.css";             // ← globale Styles siehe unten

/* ---------- Assets ---------- */
const architectImg = `./Profilbild.jpeg`;
const messengerImg = `./sanbild.jpeg`; // Platzhalter – Bild tauschen!

/* ---------- Reusable Link‑Btn ---------- */
const SocialLink = ({ href, Icon, label }) => (
  <a className="social-btn" href={href} aria-label={label} target="_blank" rel="noreferrer">
    <Icon />
  </a>
);

/* ---------- Card‑Blueprint ---------- */
const RoleCard = ({ id, color, title, IconLead, img, children, links }) => (
  <article className="role-card" id={id} style={{ "--accent": color }}>
    <span className="glow-border" aria-hidden="true" />
    <div className="card-core">
      <img className="role-avatar" src={img} alt={title} />
      <h2 className="role-title">
        <IconLead className="title-icon" size={28} strokeWidth={2.4} /> {title}
      </h2>
      <p className="role-desc">{children}</p>

      <div className="social-row">
        {links.map((l) => (
          <SocialLink key={l.href} {...l} />
        ))}
      </div>
    </div>
  </article>
);

/* ---------- Main ---------- */
const Beyond = () => (
  <section className="beyond-wrapper">
    <div className="role-grid">
      {/* Der Architekt */}
      <RoleCard
        id="architect"
        color="var(--neon-cyan)"
        title="Der Architekt"
        IconLead={Zap}
        img={architectImg}
        links={[
          { href: "https://github.com/DEIN_USER", Icon: Github, label: "GitHub" },
          { href: "https://www.tiktok.com/@DEIN_USER", Icon: FaTiktok, label: "TikTok" },
        ]}
      >
        Ich bin der <strong>Schöpfer von Noctis</strong>, ein Entwickler,
        der die Grenzen zwischen Technologie und Bewusstsein erkundet.
      </RoleCard>

      {/* Der Bote */}
      <RoleCard
        id="messenger"
        color="var(--neon-red)"
        title="Der Bote"
        IconLead={Share2}
        img={messengerImg}
        links={[
          { href: "https://github.com/BOTE_USER", Icon: Github, label: "GitHub" },
          { href: "https://www.tiktok.com/@BOTE_USER", Icon: FaTiktok, label: "TikTok" },
        ]}
      >
        <strong>Beni San</strong> – der digitale Prophet, der <em>Noctis</em> in
        die Herzen und Köpfe einer ganzen Generation trägt.
      </RoleCard>
    </div>
  </section>
);

export default Beyond;

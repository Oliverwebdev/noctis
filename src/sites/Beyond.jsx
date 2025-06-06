import React from "react";
import { Github, Code, MessageCircle, Globe } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./Beyond.css";
import GlitchText from "../components/GlitchText";

/* ---------- Assets ---------- */
const architectImg  = "./Profilbild.jpeg";
const messengerImg  = "./sanbild.jpeg";

/* ---------- Reusable Social‑Btn ---------- */
const SocialLink = ({ href, Icon, label }) => (
  <a
    className="social-btn"
    href={href}
    aria-label={label}
    target="_blank"
    rel="noreferrer"
  >
    <Icon />
  </a>
);

/* ---------- Card‑Blueprint ---------- */
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


/* ---------- Main Component ---------- */
const Beyond = () => {
  const { t } = useTranslation();

  return (

    
    <section className="beyond-wrapper">
      <div><GlitchText as="h1" text={t("beyond.title")} /></div>
      <div className="role-grid">
        {/* Architekt */}
        <RoleCard
          id="architect"
          color="var(--neon-cyan)"
          title={t("beyond.architect.title")}
          IconLead={Code}
          img={architectImg}
          links={[
            { href: "https://github.com/Oliverwebdev",        Icon: Github,  label: "GitHub" },
            { href: "https://www.tiktok.com/@gringenerator?_t=8hQxyz4bOW8&_r=1",   Icon: FaTiktok, label: "TikTok" },
            {
              href: "https://portfolio-sp-oliver.onrender.com",Icon: Globe,label: "Website",
            },
          ]}
        >
          {t("beyond.architect.desc")}
        </RoleCard>

        {/* Bote */}
        <RoleCard
          id="messenger"
          color="var(--neon-red)"
          title={t("beyond.messenger.title")}
          IconLead={MessageCircle}
          img={messengerImg}
          links={[
            { href: "https://vm.tiktok.com/ZNdYE1X7H/",   Icon: FaTiktok, label: "TikTok" }
          ]}
        >
          {t("beyond.messenger.desc")}
        </RoleCard>
      </div>
    </section>
  );
};

export default Beyond;

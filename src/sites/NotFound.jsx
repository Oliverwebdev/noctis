// src/sites/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./NotFound.css";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <section className="nf-wrapper">
      {/* Background Image */}
      <div className="nf-logo-bg" aria-hidden="true"></div>
      
      <h1 className="nf-glitch" data-text="404">404</h1>
      <p className="nf-msg">{t("notfound.message")}</p>

      <Link to="/" className="nf-home-btn">
        <span>{t("notfound.button")}</span>
        <span className="btn-glow" />
      </Link>
    </section>
  );
};

export default NotFound;

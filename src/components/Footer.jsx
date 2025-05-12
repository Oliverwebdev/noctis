import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Bug, X } from "lucide-react";
import DeFlag from "../assets/flags/de.svg";
import EnFlag from "../assets/flags/gb.svg";
import { useTranslation } from "react-i18next";
import "./Footer.css";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [bugReport, setBugReport] = useState({ title: "", description: "", email: "" });

  /* ---------- Bug‑Form ---------- */
  const handleChange = ({ target: { name, value } }) =>
    setBugReport((p) => ({ ...p, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bug Report submitted:", bugReport);
    alert(t("footer.bugConfirm"));
    setBugReport({ title: "", description: "", email: "" });
    setIsReportOpen(false);
  };

  /* ---------- Language Helpers ---------- */
  const changeLang = (lng) => i18n.changeLanguage(lng);
  const isActive = (lng) => (i18n.resolvedLanguage === lng ? "active-lang" : "");

  return (
    <footer className="footer">
      {/* ——— FX ——— */}
      <div className="mystic-orbs">
        {[...Array(5)].map((_, i) => <div key={i} className={`mystic-orb orb-${i + 1}`} />)}
      </div>

      {/* ——— Grid ——— */}
      <div className="footer-inner">
        <div className="footer-left">{t("footer.copyright")}</div>

        <div className="footer-center">
          <button className={`lang-btn ${isActive("de")}`} onClick={() => changeLang("de")} aria-label="Deutsch">
            <img src={DeFlag} alt="" loading="lazy" />
            <span>de</span>
          </button>

          <button className={`lang-btn ${isActive("en")}`} onClick={() => changeLang("en")} aria-label="English">
            <img src={EnFlag} alt="" loading="lazy" />
            <span>en</span>
          </button>
        </div>

        <div className="footer-right">
          <button className="bug-report-btn" onClick={() => setIsReportOpen(true)} aria-haspopup="dialog">
            <Bug size={20} />
            <span className="bug-text">{t("footer.reportBug")}</span>
            <div className="btn-glow" />
          </button>
        </div>
      </div>

      {/* ——— Modal ——— */}
      {isReportOpen &&
        ReactDOM.createPortal(
          <div className="bug-modal-backdrop">
            <div className="bug-modal">
              <div className="modal-header">
                <h3>{t("footer.bugModal.title")}</h3>
                <button className="close-modal" onClick={() => setIsReportOpen(false)} aria-label="Close">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="bug-form">
                <div className="form-group">
                  <label htmlFor="title">{t("footer.bugModal.titleLabel")}</label>
                  <input
                    id="title"
                    name="title"
                    required
                    placeholder={t("footer.bugModal.titlePlaceholder")}
                    value={bugReport.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">{t("footer.bugModal.descLabel")}</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    placeholder={t("footer.bugModal.descPlaceholder")}
                    value={bugReport.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{t("footer.bugModal.emailLabel")}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("footer.bugModal.emailPlaceholder")}
                    value={bugReport.email}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="submit-btn">
                  {t("footer.submit")}
                  <div className="btn-glow" />
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}

      <div className="cosmic-rays" aria-hidden="true" />
    </footer>
  );
};

export default Footer;

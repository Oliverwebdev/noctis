import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Bug, X } from 'lucide-react';
import DeFlag from '../assets/flags/de.svg';
import EnFlag from '../assets/flags/gb.svg';
import './Footer.css';

const Footer = () => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [bugReport, setBugReport] = useState({ title: '', description: '', email: '' });

  /* ---------- Bug‑Form ---------- */
  const handleChange = ({ target: { name, value } }) =>
    setBugReport((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Bug Report submitted:', bugReport);
    alert('Danke für deinen Bug‑Report!');
    setBugReport({ title: '', description: '', email: '' });
    setIsReportOpen(false);
  };

  return (
    <footer className="footer">
      {/* --- dekorative FX --- */}
      <div className="mystic-orbs">
        {[...Array(5)].map((_, i) => <div key={i} className={`mystic-orb orb-${i + 1}`} />)}
      </div>

      {/* --- Footer‑Grid --- */}
      <div className="footer-inner">
        {/* © Bereich */}
        <div className="footer-left">© Noctis 2025</div>

        {/* Sprach‑Switcher */}
        <div className="footer-center">
          <button className="lang-btn" aria-label="Deutsch">
            <img src={DeFlag} alt="" loading="lazy" />
            <span>de</span>
          </button>
          <button className="lang-btn" aria-label="English">
            <img src={EnFlag} alt="" loading="lazy" />
            <span>eng</span>
          </button>
        </div>

        {/* Bug‑Button */}
        <div className="footer-right">
          <button
            className="bug-report-btn"
            onClick={() => setIsReportOpen(true)}
            aria-haspopup="dialog"
          >
            <Bug size={20} />
            <span className="bug-text">Report a Bug</span>
            <div className="btn-glow" />
          </button>
        </div>
      </div>

      {/* --- Modal via Portal --- */}
      {isReportOpen &&
        ReactDOM.createPortal(
          <div className="bug-modal-backdrop">
            <div className="bug-modal">
              <div className="modal-header">
                <h3>Report a Bug</h3>
                <button className="close-modal" onClick={() => setIsReportOpen(false)} aria-label="Close">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="bug-form">
                <div className="form-group">
                  <label htmlFor="title">Titel</label>
                  <input
                    id="title" name="title" required placeholder="Kurze Beschreibung"
                    value={bugReport.title} onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Beschreibung</label>
                  <textarea
                    id="description" name="description" rows={4} required
                    placeholder="Beschreibe den Bug…" value={bugReport.description} onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E‑Mail (optional)</label>
                  <input
                    id="email" name="email" type="email" placeholder="Für Rückfragen"
                    value={bugReport.email} onChange={handleChange}
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Absenden<div className="btn-glow" />
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

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LogoImg from "../assets/eyeofnoctis.png";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  /* ——— Route‑ & Outside‑Handling ——— */
  useEffect(() => setIsMenuOpen(false), [location]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onOutside = (e) =>
      !document.getElementById("navbar")?.contains(e.target) &&
      setIsMenuOpen(false);
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
    };
  }, [isMenuOpen]);

  /* ——— Reusable Link‑Set ——— */
  const NavLinks = () => (
    <>
      <Link to="/"        className={`nav-link ${location.pathname === "/"        ? "active" : ""}`}>{t("nav.home")}</Link>
      <Link to="/mission" className={`nav-link ${location.pathname === "/mission" ? "active" : ""}`}>{t("nav.mission")}</Link>
      <Link to="/beyond"  className={`nav-link ${location.pathname === "/beyond"  ? "active" : ""}`}>{t("nav.beyond")}</Link>
    </>
  );

  return (
    <nav id="navbar" className={`navbar ${isMenuOpen ? "navbar-open" : ""}`}>
      <div className="navbar-container">
        {/* ---------- Logo ---------- */}
        <Link to="/" className="navbar-logo" aria-label="Noctis Home">
          <img src={LogoImg} alt="Noctis Logo" />
          Noctis
        </Link>

        {/* ---------- Desktop Links ---------- */}
        <div className="navbar-links">
          <NavLinks />
        </div>

        {/* ---------- Burger ---------- */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mobile-menu-button"
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ---------- Mobile Panel ---------- */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <NavLinks />
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LogoImg from "../assets/eyeofnoctis.png";      // <─ PNG aus assets‑Ordner
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Nav‑Menü bei Routenwechsel schließen
  useEffect(() => setIsMenuOpen(false), [location]);

  // Outside‑Click → Menü zu
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

  const NavLinks = () => (
    <>
      <Link to="/"       className={`nav-link ${location.pathname === "/"        ? "active" : ""}`}>Home</Link>
      <Link to="/mission" className={`nav-link ${location.pathname === "/mission" ? "active" : ""}`}>Mission</Link>
      <Link to="/beyond"  className={`nav-link ${location.pathname === "/beyond"  ? "active" : ""}`}>Beyond</Link>
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
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* ---------- Mobile Drawer ---------- */}
        {isMenuOpen && (
          <div className="navbar-mobile-menu">
            <NavLinks />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogIn, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import LogoImg from "../assets/eyeofnoctis.png";
import LoginModal from "./LoginModal";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  /* Scroll‑Effekt */
  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Auto‑Close & Outside‑Click */
  React.useEffect(() => setIsMenuOpen(false), [location]);
  React.useEffect(() => {
    if (!isMenuOpen) return;
    const outside = (e) =>
      !document.getElementById("navbar")?.contains(e.target) && setIsMenuOpen(false);
    document.addEventListener("mousedown", outside);
    document.addEventListener("touchstart", outside);
    return () => {
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("touchstart", outside);
    };
  }, [isMenuOpen]);

  /* Modal öffnen */
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsMenuOpen(false);
  };

  /* Navigation Links */
  const NavLinks = () => (
    <>
      <Link to="/"      className={`nav-link ${location.pathname === "/"       ? "active" : ""}`}>
        <span className="nav-text">{t("nav.home")}</span><span className="nav-hover-effect"></span>
      </Link>
      <Link to="/mission" className={`nav-link ${location.pathname === "/mission" ? "active" : ""}`}>
        <span className="nav-text">{t("nav.mission")}</span><span className="nav-hover-effect"></span>
      </Link>
      <Link to="/beyond"  className={`nav-link ${location.pathname === "/beyond"  ? "active" : ""}`}>
        <span className="nav-text">{t("nav.beyond")}</span><span className="nav-hover-effect"></span>
      </Link>
      <Link to="/discord" className={`nav-link ${location.pathname === "/discord" ? "active" : ""}`}>
        <span className="nav-text">{t("nav.discord")}</span><span className="nav-hover-effect"></span>
      </Link>

      {/* Auth Links */}
      
    </>
  );

  return (
    <>
      <nav
        id="navbar"
        className={`navbar ${isMenuOpen ? "navbar-open" : ""} ${isScrolled ? "navbar-scrolled" : ""}`}
      >
        {/* Cosmic FX */}
        <div className="navbar-cosmic-bg">
          <div className="cosmic-star star1"></div>
          <div className="cosmic-star star2"></div>
          <div className="cosmic-star star3"></div>
          <div className="cosmic-line line1"></div>
          <div className="cosmic-line line2"></div>
        </div>

        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo" aria-label="Noctis Home">
            <div className="logo-glow"></div>
            <img src={LogoImg} alt="Noctis Logo" />
            <span className="logo-text">Noctis</span>
          </Link>

          {/* Desktop */}
          <div className="navbar-links">
            <NavLinks />
          </div>

          {/* Burger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-button"
            aria-label="Menu"
          >
            <div className="menu-icon-container">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              <span className="menu-pulse"></span>
            </div>
          </button>
        </div>

        {/* Mobile‑Panel */}
        {isMenuOpen && (
          <div className="navbar-mobile-menu">
            <div className="mobile-links-container">
              <NavLinks />
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Navbar;

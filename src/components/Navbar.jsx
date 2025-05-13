import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";
import LogoImg from "../assets/eyeofnoctis.png";
import LoginModal from "./LoginModal";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  /* --- Scroll-Effekt hinzufügen ---------------- */
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* --- Auto‑Close & Outside‑Click ---------------- */
  React.useEffect(() => setIsMenuOpen(false), [location]);
  React.useEffect(() => {
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

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsMenuOpen(false); // Close mobile menu if open
  };

  /* --- Links ------------------------------------ */
  const NavLinks = () => (
    <>
      <Link 
        to="/" 
        className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
      >
        <span className="nav-text">{t("nav.home")}</span>
        <span className="nav-hover-effect"></span>
      </Link>
      
      <Link 
        to="/mission" 
        className={`nav-link ${location.pathname === "/mission" ? "active" : ""}`}
      >
        <span className="nav-text">{t("nav.mission")}</span>
        <span className="nav-hover-effect"></span>
      </Link>
      
      <Link 
        to="/beyond" 
        className={`nav-link ${location.pathname === "/beyond" ? "active" : ""}`}
      >
        <span className="nav-text">{t("nav.beyond")}</span>
        <span className="nav-hover-effect"></span>
      </Link>
      
      <Link 
        to="/discord" 
        className={`nav-link ${location.pathname === "/discord" ? "active" : ""}`}
      >
        <span className="nav-text">{t("nav.discord")}</span>
        <span className="nav-hover-effect"></span>
      </Link>
      
      {/* Login Button */}
      <button
        className="nav-link nav-auth-btn"
        onClick={openLoginModal}
      >
        <LogIn size={18} />
        <span className="nav-text">{t("nav.login")}</span>
        <span className="nav-hover-effect"></span>
      </button>
    </>
  );

  return (
    <>
      <nav id="navbar" className={`navbar ${isMenuOpen ? "navbar-open" : ""} ${isScrolled ? "navbar-scrolled" : ""}`}>
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
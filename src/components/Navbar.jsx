import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle outside click to close menu
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const navbar = document.getElementById('navbar');
      if (navbar && !navbar.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isMenuOpen]);

  const NavLinks = () => (
    <>
      <Link 
        to="/" 
        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
      >
        Home
      </Link>
      <Link 
        to="/mission" 
        className={`nav-link ${location.pathname === '/mission' ? 'active' : ''}`}
      >
        Mission
      </Link>
      <Link 
        to="/beyond" 
        className={`nav-link ${location.pathname === '/beyond' ? 'active' : ''}`}
      >
        Beyond
      </Link>
    </>
  );

  return (
    <nav 
      id="navbar"
      className={`navbar ${isMenuOpen ? 'navbar-open' : ''}`}
    >
      <div className="navbar-container">
        {/* Logo */}
        <Link 
          to="/" 
          className="navbar-logo"
        >
          <Zap />
          Noctis
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          <NavLinks />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mobile-menu-button"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X />
          ) : (
            <Menu />
          )}
        </button>

        {/* Mobile Menu */}
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
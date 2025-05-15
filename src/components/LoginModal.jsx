import React, { useState, useEffect, useRef } from "react";
import { X, User, Mail, Lock, EyeOff, Eye, UserPlus, LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { t } = useTranslation();
  const modalRef = useRef(null);

  // Handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      // Disable body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Reset form when toggling between login and register
  useEffect(() => {
    setFormData({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
    setShowPassword(false);
  }, [isLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.email || !formData.password) {
      alert(t("login.validationError"));
      return;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert(t("register.passwordMismatch"));
      return;
    }
    // Here you would handle form submission, validation, and API calls to your backend
    console.log("Form submitted:", formData);
    
    // Demo purposes only - would be replaced with actual API calls
    if (isLogin) {
      console.log("Logging in with:", formData.email, formData.password);
    } else {
      console.log("Registering:", formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-container" ref={modalRef}>
        {/* Cosmic background effects */}
        <div className="modal-cosmic-bg">
          <div className="modal-cosmic-star mstar1"></div>
          <div className="modal-cosmic-star mstar2"></div>
          <div className="modal-cosmic-star mstar3"></div>
          <div className="modal-cosmic-line mline1"></div>
          <div className="modal-cosmic-line mline2"></div>
        </div>
        
        {/* Modal Header */}
        <div className="login-modal-header">
          <h2 className="modal-title">
            {isLogin ? t("login.title") : t("register.title")}
          </h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        
        {/* Toggle Buttons */}
        <div className="login-toggle-container">
          <button 
            className={`login-toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            <LogIn size={16} />
            <span>{t("login.action")}</span>
          </button>
          <button 
            className={`login-toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            <UserPlus size={16} />
            <span>{t("register.action")}</span>
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">
              <Mail size={18} />
              <span>{t("login.email")}</span>
            </label>
            <div className="input-container">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t("login.emailPlaceholder")}
              />
              <div className="input-glow"></div>
            </div>
          </div>
          
          {/* Username Field - Only for Registration */}
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="username">
                <User size={18} />
                <span>{t("register.username")}</span>
              </label>
              <div className="input-container">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder={t("register.usernamePlaceholder")}
                />
                <div className="input-glow"></div>
              </div>
            </div>
          )}
          
          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">
              <Lock size={18} />
              <span>{t("login.password")}</span>
            </label>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder={t("login.passwordPlaceholder")}
              />
              <button 
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <div className="input-glow"></div>
            </div>
          </div>
          
          {/* Confirm Password - Only for Registration */}
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <Lock size={18} />
                <span>{t("register.confirmPassword")}</span>
              </label>
              <div className="input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder={t("register.confirmPasswordPlaceholder")}
                />
                <div className="input-glow"></div>
              </div>
            </div>
          )}
          
          {/* Additional Options */}
          {isLogin && (
            <div className="login-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">{t("login.rememberMe")}</label>
              </div>
              <a href="#forgot-password" className="forgot-password">
                {t("login.forgotPassword")}
              </a>
            </div>
          )}
          
          {/* Submit Button */}
          <button type="submit" className="login-submit-btn">
            {isLogin ? (
              <>
                <LogIn size={18} />
                <span>{t("login.submit")}</span>
              </>
            ) : (
              <>
                <UserPlus size={18} />
                <span>{t("register.submit")}</span>
              </>
            )}
            <div className="btn-glow"></div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
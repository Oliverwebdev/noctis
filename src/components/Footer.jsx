import React from 'react';
import { Bug, Github, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <span className="footer-glow" aria-hidden />
    <div className="footer-inner">
      <p className="brand">Noctis © {new Date().getFullYear()}</p>

      <nav className="footer-nav">
        <a href="https://github.com/DEIN_REPO" target="_blank" rel="noreferrer">
          <Github size={18} /> GitHub
        </a>
        <a
          href="https://github.com/DEIN_REPO/issues/new?template=bug_report.md"
          className="bug-link"
          target="_blank"
          rel="noreferrer"
        >
          <Bug size={18} /> Report a Bug
        </a>
        <a href="mailto:contact@noctis.ai"><Mail size={18} /> Mail</a>
      </nav>
    </div>
  </footer>
);

export default Footer;

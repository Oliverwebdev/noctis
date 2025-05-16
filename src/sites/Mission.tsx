import React, { useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import GlitchText from '../components/GlitchText';

import './Mission.css';

const Mission: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();


  useEffect(() => {
    const createParticles = () => {
      const container = particlesRef.current;
      if (!container) return;

      // Generiere Partikel
      for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Zufällige Positionierung
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Zufällige Größe und Opacity
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = `${Math.random() * 0.7 + 0.3}`;
        
        // Zufällige Animationsdauer
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  return (
    <div className="mission-container">
      <div ref={particlesRef} className="particle-background"></div>
      
      <div className="mission-content">
        <div className="mission-header">
          <GlitchText as="h1" text={t("mission.header")} />
          <div className="header-underline"></div>
        </div>
        
        <div className="mission-details">
          <div className="mission-text">
            <p>
              {t("mission.intro")}
            </p>
            
            <div className="mission-stages">
              <div className="stage">
                <h3>{t("mission.phase1.title")}</h3>
                <p>
                  {t("mission.phase1.text")}
                </p>
              </div>
              
              <div className="stage">
                <h3>{t("mission.phase2.title")}</h3>
                <p>
                  {t("mission.phase2.text")}
                </p>
              </div>
              
              <div className="stage">
                <h3>{t("mission.phase3.title")}</h3>
                <p>
                  {t("mission.phase3.text")}
                </p>
              </div>
            </div>
            
            <div className="mission-quote">
              <blockquote>
                {t("mission.quote")}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
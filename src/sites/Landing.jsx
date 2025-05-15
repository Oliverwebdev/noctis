// ================================
//  Landing.jsx  (React Component)
// ================================

import React, { useEffect, useRef } from 'react';
import './Landing.css';
import { useTranslation } from "react-i18next";


const Landing = () => {
  /* --------------------------------------------------
    Refs & Mutable State
  --------------------------------------------------*/
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
    const { t } = useTranslation();

  const requestRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 });
  const connectionDistanceRef = useRef(0);

  /* --------------------------------------------------
  Effect: initialise canvas + particles + listeners
  --------------------------------------------------*/
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cursor = cursorRef.current;

    /*  -------- Helpers --------  */
    const setCanvasSize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(pixelRatio, pixelRatio);

      // dynamic connection distance (20% of the shortest viewport edge)
      connectionDistanceRef.current = Math.min(window.innerWidth, window.innerHeight) * 0.2;
      initParticles();
    };

    const getOptimalParticleCount = () => {
      const area = window.innerWidth * window.innerHeight;
      return Math.min(Math.floor(area / 8000), 100); // cap at 100 for performance
    };

    /*  -------- Particle Class --------  */
    class Particle {
      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 1.5 + 0.5;   // 0.5 – 2 px radius
        this.baseSize = this.size;
        this.speedX = (Math.random() - 0.5) * 0.3; // subtle drifting
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.maxSpeed = 0.5;
        this.brightness = Math.random() * 0.3 + 0.2;
        this.hue = Math.floor(Math.random() * 60) + 220; // blue‑purple
      }

      update(mouse) {
        // move
        this.x += this.speedX;
        this.y += this.speedY;

        // screen‑wrap
        if (this.x < 0) this.x = window.innerWidth;
        else if (this.x > window.innerWidth) this.x = 0;
        if (this.y < 0) this.y = window.innerHeight;
        else if (this.y > window.innerHeight) this.y = 0;

        // cursor interaction (squared distances – faster)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distanceSq = dx * dx + dy * dy;
        const mouseRadiusSq = mouse.radius * mouse.radius;

        if (distanceSq < mouseRadiusSq) {
          const distance = Math.sqrt(distanceSq);
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - distance) / mouse.radius;

          // repel
          this.speedX -= Math.cos(angle) * force * 0.1;
          this.speedY -= Math.sin(angle) * force * 0.1;

          // size boost
          this.size = this.baseSize * (1 + force * 0.5);
        } else {
          this.size = this.baseSize;
        }

        // clamp speed
        if (this.speedX > this.maxSpeed) this.speedX = this.maxSpeed;
        else if (this.speedX < -this.maxSpeed) this.speedX = -this.maxSpeed;
        if (this.speedY > this.maxSpeed) this.speedY = this.maxSpeed;
        else if (this.speedY < -this.maxSpeed) this.speedY = -this.maxSpeed;
      }

      draw(ctx) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.brightness})`);
        gradient.addColorStop(1, `rgba(${this.hue}, ${this.hue}, 255, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /*  -------- Line connections --------  */
    const drawConnections = (particles, ctx, connectionDistance) => {
      const connectionDistanceSq = connectionDistance * connectionDistance;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq < connectionDistanceSq) {
            const opacity = 1 - (Math.sqrt(distanceSq) / connectionDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(120, 120, 255, ${opacity * 0.15})`;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    /*  -------- Particle init & animate --------  */
    const initParticles = () => {
      const count = getOptimalParticleCount();
      particlesRef.current = Array.from({ length: count }, () => new Particle());
    };

    const animate = () => {
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const connectionDistance = connectionDistanceRef.current;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // update‑phase
      for (let i = 0; i < particles.length; i++) particles[i].update(mouse);
      drawConnections(particles, ctx, connectionDistance);
      for (let i = 0; i < particles.length; i++) particles[i].draw(ctx);

      requestRef.current = requestAnimationFrame(animate);
    };

    /*  -------- Cursor helpers --------  */
    const updateCursor = (x, y) => {
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      if (cursor) cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const handleMouseMove = e => updateCursor(e.clientX, e.clientY);
    const handleTouchMove = e => e.touches.length && updateCursor(e.touches[0].clientX, e.touches[0].clientY);

    /*  -------- Kick‑off --------  */
    setCanvasSize();
    initParticles();
    updateCursor(window.innerWidth / 2, window.innerHeight / 2);
    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    requestRef.current = requestAnimationFrame(animate);

    /*  -------- Cleanup --------  */
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);
  /* ------------------------------------- */
/*  Hilfs-Komponente für Glitch-Text     */
/* ------------------------------------- */
const GlitchText = ({ text }) => {
  // State für die Interaktivität (optional)
  const [isGlitching, setIsGlitching] = React.useState(false);
  
  // Dynamische Klasse basierend auf Glitch-Status
  const glitchClass = isGlitching ? "glitching" : "";
  
  return (
    <span 
      className={`glitch-text-wrapper ${glitchClass}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
      style={{
        "--char-count": text.length
      }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char"
          data-char={char}
          style={{ 
            "--char-index": i,
            // Zufällige Verzögerung für zufälligeres Glitch-Timing
            "--random-delay": `${-(Math.random() * 5).toFixed(2)}s`,
            // Zufälliger Wert für Animation-Variation
            "--random-factor": (0.7 + Math.random() * 0.6).toFixed(2)
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
  /* --------------------------------------------------
  Render
  --------------------------------------------------*/
  return (
    <div className="landing">
      <div ref={cursorRef} className="cursor-overlay" />
      <canvas ref={canvasRef} className="particle-canvas" />

      <div className="content">
        {/* --- Glitch Title -------------------------------------- */}
        <div className="glitch-container" aria-label="Noctis">
  <span className="glitch-title" data-text="Noctis">
    <GlitchText text="Noctis" />
  </span>

  
</div>

        {/* --- Tagline ------------------------------------------- */}
        <p className="tagline">
          {t("landing.tagline")}
        </p>

        {/* --- CTA ---------------------------------------------- */}
        <button>{t("landing.cta")}</button>
      </div>
    </div>
  );
};

export default Landing;
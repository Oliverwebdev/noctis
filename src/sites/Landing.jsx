import React, { useEffect, useRef, useState } from 'react';
import './Landing.css';

const Landing = () => {
  const canvasRef = useRef(null);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    const particles = [];
    const particleCount = 100;
    const connectionDistance = Math.min(window.innerWidth, window.innerHeight) * 0.25;
    const mouse = { x: canvas.width / 2, y: canvas.height / 2, radius: 120 };
    
    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseSize = this.size;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.maxSpeed = 0.8;
        this.brightness = Math.random() * 0.3 + 0.2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - distance) / mouse.radius;
          this.speedX -= Math.cos(angle) * force * 0.15;
          this.speedY -= Math.sin(angle) * force * 0.15;
          this.size = this.baseSize * (1 + force);
        } else {
          this.size = this.baseSize;
        }
        if (this.speedX > this.maxSpeed) this.speedX = this.maxSpeed;
        if (this.speedX < -this.maxSpeed) this.speedX = -this.maxSpeed;
        if (this.speedY > this.maxSpeed) this.speedY = this.maxSpeed;
        if (this.speedY < -this.maxSpeed) this.speedY = -this.maxSpeed;
      }
      
      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.brightness})`);
        gradient.addColorStop(1, 'rgba(120, 120, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      connect(particles) {
        for (let i = 0; i < particles.length; i++) {
          const otherParticle = particles[i];
          const dx = this.x - otherParticle.x;
          const dy = this.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(120, 120, 255, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) particles[i].update();
      for (let i = 0; i < particles.length; i++) particles[i].connect(particles);
      for (let i = 0; i < particles.length; i++) particles[i].draw();
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="landing">
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="content">
        <h1>LUX VERUM</h1>
        <p>Tritt ein – wenn du den Mut hast, den Spiegel deiner selbst zu betrachten.</p>
        <button>Eintreten</button>
      </div>
    </div>
  );
};

export default Landing;

import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Twitter, Zap, Code, Globe, User, Share2 } from 'lucide-react';

const Beyond = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    if (currentContainer) {
      observerRef.current.observe(currentContainer);
    }

    return () => {
      if (observerRef.current && currentContainer) {
        observerRef.current.unobserve(currentContainer);
      }
    };
  }, []);

  const SocialLink = ({ href, icon: Icon, color }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      style={{
        transition: 'transform 0.3s ease-in-out',
        display: 'inline-block',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <Icon style={{ color, width: '32px', height: '32px' }} />
    </a>
  );

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(to bottom right, black, #101010, #0000ff)',
        color: 'white',
        overflow: 'hidden'
      }}
    >
      {/* Particle Background */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.3,
          background: `
            radial-gradient(circle at 30% 50%, rgba(100,100,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 50%, rgba(255,100,100,0.1) 0%, transparent 50%)
          `,
          animation: 'backgroundPulse 10s infinite alternate'
        }}
      />

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '80px 20px',
        display: 'grid',
        gap: '40px',
        gridTemplateColumns: '1fr 1fr',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Left Section - Developer Profile */}
        <div 
          style={{
            background: 'rgba(25, 25, 50, 0.9)',
            backdropFilter: 'blur(10px)',
            padding: '30px',
            borderRadius: '15px',
            border: '1px solid rgba(0,0,255,0.3)',
            boxShadow: '0 0 50px rgba(100,100,255,0.2)',
            transition: 'transform 1s, opacity 1s',
            opacity: isRevealed ? 1 : 0,
            transform: isRevealed ? 'translateX(0)' : 'translateX(-50px)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Zap style={{ width: '48px', height: '48px', color: '#00f0ff', animation: 'pulse 2s infinite' }} />
            <h2 style={{ fontSize: '2.5em', color: '#00d0ff', marginLeft: '20px' }}>Der Architekt</h2>
          </div>
          <p style={{ color: '#ddd', lineHeight: '1.6' }}>
            Ich bin der <span style={{ color: '#00c0ff', fontWeight: 'bold' }}>Schöpfer von Lux Verum</span>,
            ein Entwickler, der die Grenzen zwischen Technologie und Bewusstsein erforscht.
          </p>
        </div>

        {/* Right Section - Beni San Profile */}
        <div 
          style={{
            background: 'rgba(50, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            padding: '30px',
            borderRadius: '15px',
            border: '1px solid rgba(255,0,0,0.3)',
            boxShadow: '0 0 50px rgba(255,100,100,0.2)',
            transition: 'transform 1s, opacity 1s',
            opacity: isRevealed ? 1 : 0,
            transform: isRevealed ? 'translateX(0)' : 'translateX(50px)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Share2 style={{ width: '48px', height: '48px', color: '#ff4d4d', animation: 'spin 5s linear infinite' }} />
            <h2 style={{ fontSize: '2.5em', color: '#ff4d4d', marginLeft: '20px' }}>Der Bote</h2>
          </div>
          <p style={{ color: '#fdd', lineHeight: '1.6' }}>
            Beni San - der digitale Prophet, der <span style={{ color: '#f55', fontWeight: 'bold' }}>Lux Verum</span> in die Herzen und Köpfe einer ganzen Generation trägt.
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style >{`
        @keyframes backgroundPulse {
          0% { opacity: 0.2; }
          100% { opacity: 0.4; }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Beyond;

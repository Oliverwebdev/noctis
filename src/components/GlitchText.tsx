
import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

/* --------------------------------------------------
   Keyframes für verschiedene Animationseffekte
-------------------------------------------------- */
const glitchAnim1 = keyframes`
  0%   { clip-path: inset(0 0 45% 0); transform: translate(-2px, -2px); }
  15%  { clip-path: inset(0 0 20% 0); transform: translate(2px, 2px); }
  30%  { clip-path: inset(0 0 65% 0); transform: translate(-2px, 2px); }
  45%  { clip-path: inset(0 0 30% 0); transform: translate(2px, -2px); }
  60%  { clip-path: inset(0 0 55% 0); transform: translate(-1px, 1px); }
  75%  { clip-path: inset(0 0 25% 0); transform: translate(1px, -1px); }
  100% { clip-path: inset(0 0 45% 0); transform: translate(0, 0); }
`;

const glitchAnim2 = keyframes`
  0%   { clip-path: inset(55% 0 0 0); transform: translate(2px, 2px); }
  15%  { clip-path: inset(30% 0 0 0); transform: translate(-2px, -2px); }
  30%  { clip-path: inset(70% 0 0 0); transform: translate(2px, -2px); }
  45%  { clip-path: inset(35% 0 0 0); transform: translate(-2px, 2px); }
  60%  { clip-path: inset(60% 0 0 0); transform: translate(1px, -1px); }
  75%  { clip-path: inset(40% 0 0 0); transform: translate(-1px, 1px); }
  100% { clip-path: inset(55% 0 0 0); transform: translate(0, 0); }
`;

const flickerAnimation = keyframes`
  0% { opacity: 1; }
  2% { opacity: 0.8; }
  4% { opacity: 1; }
  8% { opacity: 0.4; }
  10% { opacity: 1; }
  70% { opacity: 1; }
  72% { opacity: 0.6; }
  74% { opacity: 1; }
`;

const shakeAnimation = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  1% { transform: translate(-1px, -1px) rotate(-0.5deg); }
  2% { transform: translate(1px, -1px) rotate(0.5deg); }
  3% { transform: translate(1px, 1px) rotate(0.5deg); }
  4% { transform: translate(0, 0) rotate(0deg); }
  5% { transform: translate(-1px, 1px) rotate(-0.5deg); }
  6% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
`;

/* --------------------------------------------------
   Styled Components
-------------------------------------------------- */
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 0.5rem;
`;

interface OuterProps {
  colorScheme: 'neon' | 'cyberpunk' | 'retro' | 'monochrome';
  intensity: 'low' | 'medium' | 'high';
  isAnimating: boolean;
}

const getColorScheme = (scheme: string) => {
  switch(scheme) {
    case 'neon':
      return css`
        background: linear-gradient(
          90deg,
          rgba(120, 200, 255, 1) 0%,
          rgba(200, 100, 255, 0.8) 50%,
          rgba(255, 120, 180, 1) 100%
        );
      `;
    case 'cyberpunk':
      return css`
        background: linear-gradient(
          90deg,
          rgba(255, 215, 0, 1) 0%,
          rgba(255, 0, 128, 0.9) 50%,
          rgba(0, 255, 255, 1) 100%
        );
      `;
    case 'retro':
      return css`
        background: linear-gradient(
          90deg,
          rgba(255, 91, 0, 1) 0%,
          rgba(255, 0, 87, 0.9) 33%,
          rgba(81, 0, 173, 1) 66%,
          rgba(12, 0, 255, 1) 100%
        );
      `;
    case 'monochrome':
    default:
      return css`
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(180, 180, 180, 0.8) 50%,
          rgba(255, 255, 255, 1) 100%
        );
      `;
  }
};

const getIntensity = (intensity: string) => {
  switch(intensity) {
    case 'high':
      return css`
        &::before {
          animation: ${glitchAnim1} 1.5s infinite linear alternate-reverse;
          text-shadow: -3px 0 rgba(255, 0, 255, 0.9);
        }
        
        &::after {
          animation: ${glitchAnim2} 1.5s infinite linear alternate-reverse;
          text-shadow: 3px 0 rgba(0, 255, 255, 0.9);
        }
        
        animation: ${flickerAnimation} 4s infinite, ${shakeAnimation} 10s infinite;
      `;
    case 'medium':
      return css`
        &::before {
          animation: ${glitchAnim1} 2.5s infinite linear alternate-reverse;
          text-shadow: -2px 0 rgba(255, 0, 255, 0.8);
        }
        
        &::after {
          animation: ${glitchAnim2} 2.5s infinite linear alternate-reverse;
          text-shadow: 2px 0 rgba(0, 255, 255, 0.8);
        }
        
        animation: ${flickerAnimation} 6s infinite;
      `;
    case 'low':
    default:
      return css`
        &::before {
          animation: ${glitchAnim1} 3.5s infinite linear alternate-reverse;
          text-shadow: -1px 0 rgba(255, 0, 255, 0.7);
        }
        
        &::after {
          animation: ${glitchAnim2} 3.5s infinite linear alternate-reverse;
          text-shadow: 1px 0 rgba(0, 255, 255, 0.7);
        }
      `;
  }
};

const Outer = styled.span<OuterProps>`
  position: relative;
  display: inline-block;
  font-size: clamp(2rem, 6vw + 1rem, 5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  ${props => getColorScheme(props.colorScheme)}
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  will-change: transform, filter;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
  
  /* Animation pausing when needed */
  animation-play-state: ${props => props.isAnimating ? 'running' : 'paused'};

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    background: inherit;
    color: transparent;
    pointer-events: none;
    mix-blend-mode: screen;
    animation-play-state: ${props => props.isAnimating ? 'running' : 'paused'};
  }

  ${props => getIntensity(props.intensity)}

  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 5vw + 0.5rem, 3rem);
    letter-spacing: 0.03em;
  }
  
  @media (max-width: 480px) {
    font-size: clamp(1.2rem, 4vw + 0.5rem, 2.5rem);
    letter-spacing: 0.02em;
  }
`;

/* --------------------------------------------------
   GlitchText Component
-------------------------------------------------- */
export interface GlitchTextProps {
  /**
   * Text to be rendered with glitch effect.
   */
  text: string;
  /**
   * Which HTML heading/tag to render (defaults to `h1`).
   */
  as?: React.ElementType;
  /**
   * Optional additional className for outer tag.
   */
  className?: string;
  /**
   * Color scheme for the glitch effect.
   */
  colorScheme?: 'neon' | 'cyberpunk' | 'retro' | 'monochrome';
  /**
   * Intensity of the glitch effect.
   */
  intensity?: 'low' | 'medium' | 'high';
  /**
   * Whether to pause animations when the element is not in the viewport
   */
  pauseWhenNotVisible?: boolean;
}

/**
 * Verbesserte reaktive GlitchText-Komponente mit verschiedenen Stilen und Intensitäten.
 * Alle Animationen und Styles sind in einer Komponente gekapselt.
 *
 * ```tsx
 * <GlitchText 
 *   text="Mission" 
 *   colorScheme="cyberpunk" 
 *   intensity="high" 
 * />
 * ```
 */
export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  as: Component = "h1",
  className,
  colorScheme = 'neon',
  intensity = 'medium',
  pauseWhenNotVisible = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);

  // Intersection Observer Setup für Performance-Optimierung
  useEffect(() => {
    if (!elementRef || !pauseWhenNotVisible) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(elementRef);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, pauseWhenNotVisible]);

  return (
    <Container>
      <Component 
        className={className} 
        ref={setElementRef}
      >
        <Outer 
          data-text={text} 
          colorScheme={colorScheme} 
          intensity={intensity}
          isAnimating={isVisible || !pauseWhenNotVisible}
        >
          {text}
        </Outer>
      </Component>
    </Container>
  );
};

export default GlitchText;
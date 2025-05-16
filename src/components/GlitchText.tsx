import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";

/* --------------------------------------------------
   Keyframes – heavy glitch & subtle variants
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

const subtleGlitchAnim1 = keyframes`
  0%   { clip-path: inset(0 0 85% 0); transform: translate(-1px, -1px); }
  20%  { clip-path: inset(0 0 90% 0); transform: translate(1px, 1px); }
  40%  { clip-path: inset(0 0 92% 0); transform: translate(-1px, 1px); }
  60%  { clip-path: inset(0 0 88% 0); transform: translate(1px, -1px); }
  80%  { clip-path: inset(0 0 95% 0); transform: translate(-0.5px, 0.5px); }
  100% { clip-path: inset(0 0 85% 0); transform: translate(0, 0); }
`;

const subtleGlitchAnim2 = keyframes`
  0%   { clip-path: inset(85% 0 0 0); transform: translate(1px, 1px); }
  20%  { clip-path: inset(90% 0 0 0); transform: translate(-1px, -1px); }
  40%  { clip-path: inset(92% 0 0 0); transform: translate(1px, -1px); }
  60%  { clip-path: inset(88% 0 0 0); transform: translate(-1px, 1px); }
  80%  { clip-path: inset(95% 0 0 0); transform: translate(0.5px, -0.5px); }
  100% { clip-path: inset(85% 0 0 0); transform: translate(0, 0); }
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

const subtleFlickerAnimation = keyframes`
  0% { opacity: 1; }
  5% { opacity: 0.97; }
  10% { opacity: 1; }
  25% { opacity: 0.94; }
  30% { opacity: 1; }
  80% { opacity: 1; }
  85% { opacity: 0.95; }
  90% { opacity: 1; }
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

const subtleShakeAnimation = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  2% { transform: translate(-0.5px, -0.5px) rotate(-0.2deg); }
  4% { transform: translate(0.5px, -0.5px) rotate(0.2deg); }
  6% { transform: translate(0.5px, 0.5px) rotate(0.2deg); }
  8% { transform: translate(0, 0) rotate(0deg); }
  10% { transform: translate(-0.5px, 0.5px) rotate(-0.2deg); }
  12% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
`;

/* --------------------------------------------------
   Styled helpers & primitives
-------------------------------------------------- */

export interface OuterProps {
  colorScheme: "neon" | "cyberpunk" | "retro" | "monochrome";
  intensity: "low" | "medium" | "high";
  /** true = animations running */
  isAnimating: boolean;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 0.5rem;
  padding-bottom: 1.5rem;
`;

/* ---------------- helpers ---------------- */

const getColorScheme = (scheme: OuterProps["colorScheme"]) => {
  switch (scheme) {
    case "neon":
      return css`
        background: linear-gradient(
          90deg,
          rgba(120, 200, 255, 1) 0%,
          rgba(200, 100, 255, 0.8) 50%,
          rgba(255, 120, 180, 1) 100%
        );
      `;
    case "cyberpunk":
      return css`
        background: linear-gradient(
          90deg,
          rgba(255, 215, 0, 1) 0%,
          rgba(255, 0, 128, 0.9) 50%,
          rgba(0, 255, 255, 1) 100%
        );
      `;
    case "retro":
      return css`
        background: linear-gradient(
          90deg,
          rgba(255, 91, 0, 1) 0%,
          rgba(255, 0, 87, 0.9) 33%,
          rgba(81, 0, 173, 1) 66%,
          rgba(12, 0, 255, 1) 100%
        );
      `;
    case "monochrome":
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

const getIntensity = (intensity: OuterProps["intensity"]) => {
  switch (intensity) {
    case "high":
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
    case "medium":
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
    case "low":
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

const getSubtitleIntensity = (intensity: OuterProps["intensity"]) => {
  switch (intensity) {
    case "high":
      return css`
        &::before {
          animation: ${subtleGlitchAnim1} 2.5s infinite linear alternate-reverse;
          text-shadow: -1.5px 0 rgba(255, 0, 255, 0.7);
        }

        &::after {
          animation: ${subtleGlitchAnim2} 2.5s infinite linear alternate-reverse;
          text-shadow: 1.5px 0 rgba(0, 255, 255, 0.7);
        }

        animation: ${subtleFlickerAnimation} 6s infinite, ${subtleShakeAnimation} 15s infinite;
      `;
    case "medium":
      return css`
        &::before {
          animation: ${subtleGlitchAnim1} 3.5s infinite linear alternate-reverse;
          text-shadow: -1px 0 rgba(255, 0, 255, 0.6);
        }

        &::after {
          animation: ${subtleGlitchAnim2} 3.5s infinite linear alternate-reverse;
          text-shadow: 1px 0 rgba(0, 255, 255, 0.6);
        }

        animation: ${subtleFlickerAnimation} 8s infinite;
      `;
    case "low":
    default:
      return css`
        &::before {
          animation: ${subtleGlitchAnim1} 4.5s infinite linear alternate-reverse;
          text-shadow: -0.5px 0 rgba(255, 0, 255, 0.5);
        }

        &::after {
          animation: ${subtleGlitchAnim2} 4.5s infinite linear alternate-reverse;
          text-shadow: 0.5px 0 rgba(0, 255, 255, 0.5);
        }
      `;
  }
};

/* ---------------- primitives ---------------- */

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

  animation-play-state: ${props => (props.isAnimating ? "running" : "paused")};

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    background: inherit;
    color: transparent;
    pointer-events: none;
    mix-blend-mode: screen;
    animation-play-state: ${props => (props.isAnimating ? "running" : "paused")};
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

const OuterSubtitle = styled(Outer)<OuterProps>`
  font-size: clamp(1.2rem, 3vw + 0.5rem, 2.5rem);
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.02em;
  margin-top: 0.5rem;

  ${props => getSubtitleIntensity(props.intensity)}

  @media (max-width: 768px) {
    font-size: clamp(1rem, 2.5vw + 0.3rem, 1.8rem);
    letter-spacing: 0.01em;
  }

  @media (max-width: 480px) {
    font-size: clamp(0.9rem, 2vw + 0.2rem, 1.5rem);
    letter-spacing: normal;
  }
`;

/* wrapper for subtitle to control max-width */
const SubtitleContainer = styled(Container)`
  width: 100%;
  max-width: 800px;
  margin: 0 auto 1.5rem auto;

  @media (max-width: 768px) {
    max-width: 90%;
    margin-bottom: 1rem;
  }
`;

/* --------------------------------------------------
   React components
-------------------------------------------------- */

export interface GlitchTextProps {
  /** text to render */
  text: string;
  /** which tag (h1–h6, p, span, etc.) */
  as?: React.ElementType;
  className?: string;
  colorScheme?: OuterProps["colorScheme"];
  intensity?: OuterProps["intensity"];
  /** pause animations while off-screen (default true) */
  pauseWhenNotVisible?: boolean;
}

/**
 * Heading level glitch text (heavy effect)
 */
export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  as: Component = "h1",
  className,
  colorScheme = "neon",
  intensity = "medium",
  pauseWhenNotVisible = true,
}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(!pauseWhenNotVisible);

  useEffect(() => {
    if (!pauseWhenNotVisible) return;

    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [pauseWhenNotVisible]);

  return (
    <Container>
      <Component ref={elementRef} className={className}>
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

/**
 * Subtitle / intro text (subtle effect)
 */
export const GlitchSubtitle: React.FC<GlitchTextProps> = ({
  text,
  as: Component = "h2",
  className,
  colorScheme = "neon",
  intensity = "low",
  pauseWhenNotVisible = true,
}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(!pauseWhenNotVisible);

  useEffect(() => {
    if (!pauseWhenNotVisible) return;

    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [pauseWhenNotVisible]);

  return (
    <SubtitleContainer>
      <Component ref={elementRef} className={className}>
        <OuterSubtitle
          data-text={text}
          colorScheme={colorScheme}
          intensity={intensity}
          isAnimating={isVisible || !pauseWhenNotVisible}
        >
          {text}
        </OuterSubtitle>
      </Component>
    </SubtitleContainer>
  );
};

/**
 * Convenience wrapper combining a title + subtitle
 */
export interface GlitchHeaderProps extends Omit<GlitchTextProps, "text"> {
  title: string;
  subtitle: string;
  subtitleIntensity?: OuterProps["intensity"];
}

export const GlitchHeader: React.FC<GlitchHeaderProps> = ({
  title,
  subtitle,
  colorScheme = "neon",
  intensity = "medium",
  subtitleIntensity = "low",
  pauseWhenNotVisible = true,
  ...rest
}) => (
  <div>
    <GlitchText
      text={title}
      colorScheme={colorScheme}
      intensity={intensity}
      pauseWhenNotVisible={pauseWhenNotVisible}
      {...rest}
    />

    <GlitchSubtitle
      text={subtitle}
      colorScheme={colorScheme}
      intensity={subtitleIntensity}
      pauseWhenNotVisible={pauseWhenNotVisible}
    />
  </div>
);

export default GlitchText;

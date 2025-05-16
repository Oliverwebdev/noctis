import React from "react";
import styled, { keyframes } from "styled-components";

/* --------------------------------------------------
   Keyframes
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

/* --------------------------------------------------
   Styled Components
-------------------------------------------------- */
const Outer = styled.span`
  position: relative;
  display: inline-block;
  font-size: clamp(1rem, 10vw, 2rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: linear-gradient(
    90deg,
    rgba(120, 200, 255, 1) 0%,
    rgba(200, 100, 255, 0.8) 50%,
    rgba(255, 120, 180, 1) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  will-change: transform, filter;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    background: inherit;
    color: transparent;
    pointer-events: none;
    mix-blend-mode: screen;
  }

  /* magenta „Ghost“-Layer */
  &::before {
    animation: ${glitchAnim1} 2.5s infinite linear alternate-reverse;
    text-shadow: -2px 0 rgba(255, 0, 255, 0.8);
    z-index: -1;
  }

  /* cyan „Ghost“-Layer */
  &::after {
    animation: ${glitchAnim2} 2.5s infinite linear alternate-reverse;
    text-shadow: 2px 0 rgba(0, 255, 255, 0.8);
    z-index: -2;
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
}

/**
 * Reusable „glitch“ headline component. All CSS is encapsulated via
 * styled‑components, so you can drop this into any page without extra files.
 *
 * ```tsx
 * <GlitchText text="Mission" />
 * ```
 */
export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  as: Component = "h1",
  className,
}) => (
  <Component className={className}>
    <Outer data-text={text}>{text}</Outer>
  </Component>
);

export default GlitchText;

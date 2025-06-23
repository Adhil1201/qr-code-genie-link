
import React, { useEffect, useRef } from 'react';

interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
  restDelta: number;
}

const defaultSpringConfig: SpringConfig = {
  damping: 45,
  stiffness: 400,
  mass: 1,
  restDelta: 0.001,
};

interface SmoothCursorProps {
  springConfig?: SpringConfig;
  className?: string;
}

export const SmoothCursor: React.FC<SmoothCursorProps> = ({ 
  springConfig = defaultSpringConfig,
  className = ""
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (!cursorRef.current) return;

      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;

      const ax = dx * springConfig.stiffness;
      const ay = dy * springConfig.stiffness;

      velocity.current.x += ax;
      velocity.current.y += ay;

      velocity.current.x *= springConfig.damping / 100;
      velocity.current.y *= springConfig.damping / 100;

      cursorPos.current.x += velocity.current.x;
      cursorPos.current.y += velocity.current.y;

      cursorRef.current.style.transform = `translate(${cursorPos.current.x - 12}px, ${cursorPos.current.y - 12}px)`;

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [springConfig]);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference ${className}`}
      style={{ zIndex: 9999 }}
    />
  );
};

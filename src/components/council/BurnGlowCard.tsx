"use client";

import React, { useState, useRef } from "react";

interface BurnGlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function BurnGlowCard({ children, className = "" }: BurnGlowCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative burned-paper-card overflow-hidden transition-all duration-300 group ${className}`}
    >
      {/* 1. Interactive Burning Border Flame Layer */}
      <div
        className="absolute -inset-[2px] rounded-[inherit] pointer-events-none transition-opacity duration-300 z-30"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(150px circle at ${pos.x}px ${pos.y}px, #FFE066 0%, #FF8C00 25%, #FF3B14 55%, #8B0000 75%, transparent 100%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "3px",
          filter: "drop-shadow(0 0 12px rgba(255, 120, 20, 0.9)) drop-shadow(0 0 4px rgba(255, 230, 100, 0.8))"
        }}
      />

      {/* 2. Interactive Heat & Ember Reflection on Card Edge */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 z-10"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(180px circle at ${pos.x}px ${pos.y}px, rgba(255, 120, 30, 0.16) 0%, rgba(200, 40, 20, 0.08) 50%, transparent 100%)`
        }}
      />

      {/* Card Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}

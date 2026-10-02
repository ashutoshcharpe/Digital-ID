"use client";

import React, { useState, useRef } from "react";

interface BurnGlowCardProps {
  children: React.ReactNode;
  className?: string;
  showViewfinderCorners?: boolean;
}

export default function BurnGlowCard({ 
  children, 
  className = "",
  showViewfinderCorners = true
}: BurnGlowCardProps) {
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
      className={`relative media-glass-card overflow-hidden transition-all duration-300 group ${className}`}
    >
      {/* 1. Interactive Electric Cyan / Teal Laser Border Layer */}
      <div
        className="absolute -inset-[1.5px] rounded-[inherit] pointer-events-none transition-opacity duration-300 z-30"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(180px circle at ${pos.x}px ${pos.y}px, #FFFFFF 0%, #00F0FF 25%, #00B4D8 55%, #064E68 80%, transparent 100%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "2px",
          filter: "drop-shadow(0 0 14px rgba(0, 240, 255, 0.95)) drop-shadow(0 0 5px rgba(255, 255, 255, 0.9))"
        }}
      />

      {/* 2. Interactive Soft Cyan Light Beam / Lens Glare on Card Surface */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 z-10"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(240px circle at ${pos.x}px ${pos.y}px, rgba(0, 240, 255, 0.12) 0%, rgba(6, 214, 160, 0.05) 50%, transparent 100%)`
        }}
      />

      {/* 3. Subtle Camera Viewfinder Corner Markers */}
      {showViewfinderCorners && (
        <>
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-cyan-400/40 pointer-events-none z-20 group-hover:border-cyan-300 transition-colors" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-cyan-400/40 pointer-events-none z-20 group-hover:border-cyan-300 transition-colors" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-cyan-400/40 pointer-events-none z-20 group-hover:border-cyan-300 transition-colors" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-cyan-400/40 pointer-events-none z-20 group-hover:border-cyan-300 transition-colors" />
        </>
      )}

      {/* Card Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}

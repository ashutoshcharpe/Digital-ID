"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

export default function FlameBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initial mouse center position
    mouseRef.current.x = width / 2;
    mouseRef.current.y = height / 3;
    mouseRef.current.targetX = width / 2;
    mouseRef.current.targetY = height / 3;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    const particles: Particle[] = [];
    const colors = [
      "rgba(255, 69, 0, ",    // Red-Orange
      "rgba(255, 140, 0, ",   // Dark Orange
      "rgba(255, 185, 15, ",  // Gold Amber
      "rgba(205, 38, 38, ",   // Crimson Ember
      "rgba(255, 215, 0, "    // Bright Yellow
    ];

    const createEmber = (x: number, y: number, isMouseEmber = true) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: x + (Math.random() - 0.5) * (isMouseEmber ? 60 : width),
        y: y + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.random() * 2.5 - 1.2,
        size: Math.random() * 3.5 + 1.2,
        alpha: Math.random() * 0.7 + 0.3,
        life: 0,
        maxLife: Math.random() * 60 + 40,
        color
      };
    };

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp mouse coordinates
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // 1. Draw Large Interactive Moving Flame Glow around Cursor
      const flameRadius = 240 + Math.sin(tick * 0.08) * 25;
      const flameGradient = ctx.createRadialGradient(mx, my, 0, mx, my, flameRadius);
      flameGradient.addColorStop(0, "rgba(255, 90, 20, 0.28)");
      flameGradient.addColorStop(0.25, "rgba(255, 140, 0, 0.18)");
      flameGradient.addColorStop(0.5, "rgba(180, 40, 20, 0.10)");
      flameGradient.addColorStop(0.75, "rgba(100, 27, 24, 0.05)");
      flameGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = flameGradient;
      ctx.beginPath();
      ctx.arc(mx, my, flameRadius, 0, Math.PI * 2);
      ctx.fill();

      // Core Hot Center
      const coreRadius = 70 + Math.cos(tick * 0.1) * 12;
      const coreGradient = ctx.createRadialGradient(mx, my, 0, mx, my, coreRadius);
      coreGradient.addColorStop(0, "rgba(255, 220, 100, 0.35)");
      coreGradient.addColorStop(0.4, "rgba(255, 110, 20, 0.20)");
      coreGradient.addColorStop(1, "rgba(255, 60, 0, 0)");

      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(mx, my, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Spawn Interactive Embers from cursor
      if (particles.length < 80) {
        particles.push(createEmber(mx, my + 10, true));
      }
      // Also spawn ambient bottom embers
      if (Math.random() < 0.3 && particles.length < 90) {
        particles.push(createEmber(Math.random() * width, height + 10, false));
      }

      // 3. Update & Draw Flame Embers
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx + Math.sin((p.life + tick) * 0.05) * 0.6;
        p.y += p.vy;

        const currentAlpha = p.alpha * (1 - p.life / p.maxLife);

        if (p.life >= p.maxLife || currentAlpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.shadowColor = "rgba(255, 120, 20, 0.8)";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

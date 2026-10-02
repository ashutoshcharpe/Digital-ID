"use client";

import { useEffect, useRef } from "react";

interface FluidDrop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    // Mouse tracking with inertia
    const mouse = {
      x: width / 2,
      y: height / 3,
      targetX: width / 2,
      targetY: height / 3,
      vx: 0,
      vy: 0,
      prevX: width / 2,
      prevY: height / 3,
      speed: 0,
      isActive: false
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.isActive = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    // Fluid particles / wave ripples
    const drops: FluidDrop[] = [];
    let tick = 0;

    const createFluidDrop = (x: number, y: number, intensity = 1) => {
      drops.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2 * intensity,
        vy: (Math.random() - 0.5) * 2 * intensity,
        radius: 25 * intensity,
        maxRadius: (80 + Math.random() * 40) * intensity,
        alpha: 0.9,
        life: 0,
        maxLife: 45 + Math.random() * 25
      });
    };

    // Helper to draw the large background text
    const drawMediaTeamText = (targetCtx: CanvasRenderingContext2D, isFilled: boolean) => {
      targetCtx.save();
      targetCtx.textAlign = "center";
      targetCtx.textBaseline = "middle";

      // Calculate responsive font sizes
      const fontSize1 = Math.min(width * 0.13, 120);
      const fontSize2 = Math.min(width * 0.15, 140);
      const centerX = width / 2;
      const centerY1 = height * 0.36;
      const centerY2 = height * 0.56;

      targetCtx.font = `900 ${fontSize1}px "Montserrat", "Inter", sans-serif`;
      
      if (!isFilled) {
        // Empty / Outlined Hollow Cyan Text
        targetCtx.strokeStyle = "rgba(0, 240, 255, 0.08)";
        targetCtx.lineWidth = 1.5;
        targetCtx.strokeText("MEDIA TEAM", centerX, centerY1);

        targetCtx.font = `900 ${fontSize2}px "Montserrat", "Inter", sans-serif`;
        targetCtx.strokeStyle = "rgba(6, 214, 160, 0.06)";
        targetCtx.strokeText("STUDENT COUNCIL", centerX, centerY2);
      } else {
        // Solid Filled Radiant Cyan Liquid Text (masked by fluid)
        const textGrad = targetCtx.createLinearGradient(0, centerY1 - 80, 0, centerY2 + 80);
        textGrad.addColorStop(0, "#00F0FF");
        textGrad.addColorStop(0.5, "#00B4D8");
        textGrad.addColorStop(1, "#06D6A0");
        targetCtx.fillStyle = textGrad;

        targetCtx.shadowColor = "rgba(0, 240, 255, 0.8)";
        targetCtx.shadowBlur = 20;

        targetCtx.fillText("MEDIA TEAM", centerX, centerY1);

        targetCtx.font = `900 ${fontSize2}px "Montserrat", "Inter", sans-serif`;
        targetCtx.fillText("STUDENT COUNCIL", centerX, centerY2);
      }

      targetCtx.restore();
    };

    // Draw subtle cinematic geometric camera & film accents
    const drawCinematicGeometry = (targetCtx: CanvasRenderingContext2D) => {
      targetCtx.save();

      // Subtle diagonal polygon mesh lines
      targetCtx.strokeStyle = "rgba(0, 240, 255, 0.025)";
      targetCtx.lineWidth = 1;
      const step = 140;
      for (let x = -height; x < width + height; x += step) {
        targetCtx.beginPath();
        targetCtx.moveTo(x, 0);
        targetCtx.lineTo(x + height, height);
        targetCtx.stroke();
      }

      // Subtle Aperture Ring in Background
      const ringX = width * 0.85;
      const ringY = height * 0.25;
      targetCtx.strokeStyle = "rgba(0, 240, 255, 0.04)";
      targetCtx.lineWidth = 1;
      targetCtx.beginPath();
      targetCtx.arc(ringX, ringY, 180, 0, Math.PI * 2);
      targetCtx.stroke();
      targetCtx.beginPath();
      targetCtx.arc(ringX, ringY, 120, 0, Math.PI * 2);
      targetCtx.stroke();

      // Viewfinder Crosshairs at 4 screen corners
      const chOffset = 40;
      const chLen = 14;
      targetCtx.strokeStyle = "rgba(0, 240, 255, 0.09)";
      targetCtx.lineWidth = 1.5;

      const corners = [
        [chOffset, chOffset],
        [width - chOffset, chOffset],
        [chOffset, height - chOffset],
        [width - chOffset, height - chOffset]
      ];

      corners.forEach(([cx, cy]) => {
        targetCtx.beginPath();
        targetCtx.moveTo(cx - chLen, cy);
        targetCtx.lineTo(cx + chLen, cy);
        targetCtx.moveTo(cx, cy - chLen);
        targetCtx.lineTo(cx, cy + chLen);
        targetCtx.stroke();
      });

      targetCtx.restore();
    };

    // Offscreen canvas for fluid mask
    const fluidCanvas = document.createElement("canvas");
    const fluidCtx = fluidCanvas.getContext("2d");

    const render = () => {
      tick++;

      // Update mouse physics (lerp)
      mouse.vx = mouse.targetX - mouse.x;
      mouse.vy = mouse.targetY - mouse.y;
      mouse.speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
      mouse.x += mouse.vx * 0.08;
      mouse.y += mouse.vy * 0.08;

      // Spawn fluid drops when moving
      if (mouse.speed > 1.2) {
        createFluidDrop(mouse.x, mouse.y, Math.min(mouse.speed / 10, 2.2));
      }

      // Resize offscreen canvas if needed
      if (fluidCanvas.width !== width || fluidCanvas.height !== height) {
        fluidCanvas.width = width;
        fluidCanvas.height = height;
      }

      // Clear main canvas
      ctx.clearRect(0, 0, width, height);

      // =========================================================================
      // 1. Draw Subtle Cinematic Background Geometry
      // =========================================================================
      drawCinematicGeometry(ctx);

      // =========================================================================
      // 2. Draw BASE HOLLOW / OUTLINE TEXT
      // =========================================================================
      drawMediaTeamText(ctx, false);

      // =========================================================================
      // 3. Render FLUID MASK on offscreen canvas
      // =========================================================================
      if (fluidCtx) {
        fluidCtx.clearRect(0, 0, width, height);

        // Draw interactive cursor fluid pool / wave
        const fluidRadius = 150 + Math.sin(tick * 0.06) * 15;
        const mainGrad = fluidCtx.createRadialGradient(
          mouse.x, mouse.y, 10,
          mouse.x, mouse.y, fluidRadius
        );
        mainGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
        mainGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.85)");
        mainGrad.addColorStop(0.8, "rgba(255, 255, 255, 0.4)");
        mainGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        fluidCtx.fillStyle = mainGrad;
        fluidCtx.beginPath();
        fluidCtx.arc(mouse.x, mouse.y, fluidRadius, 0, Math.PI * 2);
        fluidCtx.fill();

        // Draw trailing fluid drops & ripples
        for (let i = drops.length - 1; i >= 0; i--) {
          const d = drops[i];
          d.life++;
          d.x += d.vx;
          d.y += d.vy;
          d.radius += (d.maxRadius - d.radius) * 0.05;
          const currentAlpha = d.alpha * (1 - d.life / d.maxLife);

          if (d.life >= d.maxLife || currentAlpha <= 0) {
            drops.splice(i, 1);
            continue;
          }

          const dropGrad = fluidCtx.createRadialGradient(
            d.x, d.y, 0,
            d.x, d.y, d.radius
          );
          dropGrad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha})`);
          dropGrad.addColorStop(0.6, `rgba(255, 255, 255, ${currentAlpha * 0.5})`);
          dropGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

          fluidCtx.fillStyle = dropGrad;
          fluidCtx.beginPath();
          fluidCtx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
          fluidCtx.fill();
        }

        // Clip the filled text to fluid mask
        fluidCtx.globalCompositeOperation = "source-in";
        drawMediaTeamText(fluidCtx, true);

        // Reset composite operation
        fluidCtx.globalCompositeOperation = "source-over";

        // =========================================================================
        // 4. Draw Fluid-Filled Text onto Main Canvas
        // =========================================================================
        ctx.drawImage(fluidCanvas, 0, 0);
      }

      // =========================================================================
      // 5. Ambient Cyan Lens Glow & Wave Rings around Cursor
      // =========================================================================
      const rippleRadius = 170 + Math.sin(tick * 0.05) * 20;
      const ambientGrad = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, rippleRadius
      );
      ambientGrad.addColorStop(0, "rgba(0, 240, 255, 0.12)");
      ambientGrad.addColorStop(0.4, "rgba(0, 180, 216, 0.06)");
      ambientGrad.addColorStop(0.8, "rgba(6, 214, 160, 0.02)");
      ambientGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = ambientGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, rippleRadius, 0, Math.PI * 2);
      ctx.fill();

      // Cyan wave ring
      const waveRadius = ((tick * 1.5) % 190) + 30;
      const waveAlpha = Math.max(0, (1 - waveRadius / 220) * 0.16);
      ctx.strokeStyle = `rgba(0, 240, 255, ${waveAlpha})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, waveRadius, 0, Math.PI * 2);
      ctx.stroke();

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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-cinematic-navy bg-cinematic-grid">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

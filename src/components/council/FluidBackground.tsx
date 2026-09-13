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
        radius: 30 * intensity,
        maxRadius: (90 + Math.random() * 50) * intensity,
        alpha: 0.85,
        life: 0,
        maxLife: 50 + Math.random() * 30
      });
    };

    // Helper to draw the large background text
    const drawStudentCouncilText = (targetCtx: CanvasRenderingContext2D, isFilled: boolean) => {
      targetCtx.save();
      targetCtx.textAlign = "center";
      targetCtx.textBaseline = "middle";

      // Calculate responsive font sizes
      const fontSize1 = Math.min(width * 0.15, 140);
      const fontSize2 = Math.min(width * 0.17, 160);
      const centerX = width / 2;
      const centerY1 = height * 0.38;
      const centerY2 = height * 0.58;

      targetCtx.font = `900 ${fontSize1}px "Playfair Display", "Cormorant Garamond", Georgia, serif`;
      
      if (!isFilled) {
        // Empty / Outlined Hollow Text
        targetCtx.strokeStyle = "rgba(100, 27, 24, 0.14)";
        targetCtx.lineWidth = 1.5;
        targetCtx.strokeText("STUDENT", centerX, centerY1);

        targetCtx.font = `900 ${fontSize2}px "Playfair Display", "Cormorant Garamond", Georgia, serif`;
        targetCtx.strokeText("COUNCIL", centerX, centerY2);
      } else {
        // Solid Filled Text (will be masked by fluid)
        const textGrad = targetCtx.createLinearGradient(0, centerY1 - 100, 0, centerY2 + 100);
        textGrad.addColorStop(0, "#7A221E");
        textGrad.addColorStop(0.5, "#641B18");
        textGrad.addColorStop(1, "#3A100E");
        targetCtx.fillStyle = textGrad;

        targetCtx.fillText("STUDENT", centerX, centerY1);

        targetCtx.font = `900 ${fontSize2}px "Playfair Display", "Cormorant Garamond", Georgia, serif`;
        targetCtx.fillText("COUNCIL", centerX, centerY2);
      }

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
      if (mouse.speed > 1.5) {
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
      // 1. Draw BASE HOLLOW / EMPTY "STUDENT COUNCIL" OUTLINE TEXT
      // =========================================================================
      drawStudentCouncilText(ctx, false);

      // =========================================================================
      // 2. Render FLUID MASK on offscreen canvas
      // =========================================================================
      if (fluidCtx) {
        fluidCtx.clearRect(0, 0, width, height);

        // Draw interactive cursor fluid pool / wave
        const fluidRadius = 140 + Math.sin(tick * 0.06) * 15;
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
        drawStudentCouncilText(fluidCtx, true);

        // Reset composite operation
        fluidCtx.globalCompositeOperation = "source-over";

        // =========================================================================
        // 3. Draw Fluid-Filled Text onto Main Canvas
        // =========================================================================
        ctx.drawImage(fluidCanvas, 0, 0);
      }

      // =========================================================================
      // 4. Draw Ambient Fluid Liquid Glow & Ripples around Cursor
      // =========================================================================
      const rippleRadius = 160 + Math.sin(tick * 0.05) * 20;
      const ambientGrad = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, rippleRadius
      );
      ambientGrad.addColorStop(0, "rgba(100, 27, 24, 0.12)");
      ambientGrad.addColorStop(0.4, "rgba(184, 134, 11, 0.08)");
      ambientGrad.addColorStop(0.8, "rgba(124, 88, 53, 0.03)");
      ambientGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = ambientGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, rippleRadius, 0, Math.PI * 2);
      ctx.fill();

      // Fluid wave ring
      const waveRadius = ((tick * 1.5) % 180) + 40;
      const waveAlpha = Math.max(0, (1 - waveRadius / 220) * 0.15);
      ctx.strokeStyle = `rgba(184, 134, 11, ${waveAlpha})`;
      ctx.lineWidth = 1.5;
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

"use client";
import React, { useId } from "react";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background = "transparent",
    minSize = 0.4,
    maxSize = 1.4,
    speed = 1,
    particleColor = "#ffffff",
    particleDensity = 100,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const generatedId = useId();
  const containerId = id || generatedId;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const count = Math.floor((width * height) / (10000 / particleDensity) * 0.1);

    type Particle = {
      x: number; y: number;
      size: number; opacity: number;
      vx: number; vy: number;
      opacityDir: number;
    };

    const particles: Particle[] = Array.from({ length: Math.min(count, 300) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: minSize + Math.random() * (maxSize - minSize),
      opacity: Math.random(),
      vx: (Math.random() - 0.5) * speed * 0.4,
      vy: (Math.random() - 0.5) * speed * 0.4,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const hex = particleColor;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      if (background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.opacityDir * 0.008 * speed;
        if (p.opacity >= 1) { p.opacity = 1; p.opacityDir = -1; }
        if (p.opacity <= 0.05) { p.opacity = 0.05; p.opacityDir = 1; }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = hex;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(draw);
    }

    animFrameRef.current = requestAnimationFrame(draw);

    const observer = new ResizeObserver(() => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
    };
  }, [background, minSize, maxSize, speed, particleColor, particleDensity]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={cn("w-full h-full", className)}
    >
      <canvas
        id={containerId}
        ref={canvasRef}
        className="w-full h-full"
      />
    </motion.div>
  );
};

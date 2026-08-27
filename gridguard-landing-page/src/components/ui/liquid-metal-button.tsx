"use client";
import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { Sparkles } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

interface LiquidMetalButtonProps {
  label?: string;
  onClick?: () => void;
  viewMode?: "text" | "icon";
}

export function LiquidMetalButton({
  label = "Get Started",
  onClick,
  viewMode = "text",
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  // biome-ignore lint/suspicious/noExplicitAny: External library without types
  const shaderMount = useRef<any>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  const dimensions = useMemo(() => {
    if (viewMode === "icon") {
      return { width: 46, height: 46, innerWidth: 42, innerHeight: 42, shaderWidth: 46, shaderHeight: 46 };
    }
    return { width: 180, height: 52, innerWidth: 176, innerHeight: 48, shaderWidth: 180, shaderHeight: 52 };
  }, [viewMode]);

  useEffect(() => {
    const styleId = "shader-canvas-style-exploded";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-container-exploded canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes ripple-animation {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(6); opacity: 0; }
        }
        @keyframes liquid-pulse {
          0%, 100% { filter: brightness(1) saturate(1); }
          50% { filter: brightness(1.15) saturate(1.3); }
        }
      `;
      document.head.appendChild(style);
    }

    const loadShader = async () => {
      try {
        if (shaderRef.current) {
          if (shaderMount.current?.destroy) shaderMount.current.destroy();
          shaderMount.current = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            {
              u_repetition: 4,
              u_softness: 0.5,
              u_shiftRed: 0.3,
              u_shiftBlue: 0.3,
              u_distortion: 0,
              u_contour: 0,
              u_angle: 45,
              u_scale: 8,
              u_shape: 1,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.6,
          );
        }
      } catch (error) {
        console.error("Failed to load shader:", error);
      }
    };

    loadShader();
    return () => {
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
        shaderMount.current = null;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(1.8);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.6);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(3.5);
      setTimeout(() => {
        shaderMount.current?.setSpeed?.(isHovered ? 1.8 : 0.6);
      }, 400);
    }
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const ripple = { x: e.clientX - rect.left, y: e.clientY - rect.top, id: rippleId.current++ };
      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id)), 700);
    }
    onClick?.();
  };

  return (
    <div className="relative inline-block">
      <div style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}>
        <div style={{
          position: "relative",
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          transformStyle: "preserve-3d",
          transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: isHovered ? "translateY(-3px) scale(1.03)" : "none",
        }}>
          {/* Label layer */}
          <div style={{
            position: "absolute", top: 0, left: 0,
            width: `${dimensions.width}px`, height: `${dimensions.height}px`,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            transform: "translateZ(20px)", zIndex: 30, pointerEvents: "none",
          }}>
            {viewMode === "icon" && (
              <Sparkles size={18} style={{ color: "#888", filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.5))" }} />
            )}
            {viewMode === "text" && (
              <span style={{
                fontSize: "15px", fontWeight: 700, letterSpacing: "0.04em",
                color: isHovered ? "#ffffff" : "#00E5FF",
                textShadow: "0px 1px 4px rgba(0,0,0,0.9), 0 0 12px rgba(0,229,255,0.6)",
                whiteSpace: "nowrap",
                transition: "color 0.2s ease",
              }}>
                {label}
              </span>
            )}
          </div>

          {/* Dark inner ring */}
          <div style={{
            position: "absolute", top: 0, left: 0,
            width: `${dimensions.width}px`, height: `${dimensions.height}px`,
            transform: `translateZ(10px) ${isPressed ? "translateY(1px) scale(0.98)" : ""}`,
            zIndex: 20,
            transition: "all 0.2s ease",
          }}>
            <div style={{
              width: `${dimensions.innerWidth}px`, height: `${dimensions.innerHeight}px`,
              margin: "2px", borderRadius: "100px",
              background: "linear-gradient(180deg, #1a1a1a 0%, #000 100%)",
              boxShadow: isPressed ? "inset 0px 3px 6px rgba(0,0,0,0.5)" : "none",
              transition: "box-shadow 0.15s ease",
            }} />
          </div>

          {/* Shader / outer ring */}
          <div style={{
            position: "absolute", top: 0, left: 0,
            width: `${dimensions.width}px`, height: `${dimensions.height}px`,
            transform: `translateZ(0px) ${isPressed ? "translateY(1px) scale(0.98)" : ""}`,
            zIndex: 10, transition: "all 0.2s ease",
          }}>
            <div style={{
              height: `${dimensions.height}px`, width: `${dimensions.width}px`,
              borderRadius: "100px",
              boxShadow: isPressed
                ? "0px 0px 0px 1px rgba(0,0,0,0.5), 0px 1px 2px rgba(0,0,0,0.3)"
                : isHovered
                ? "0px 0px 0px 1px rgba(0,0,0,0.4), 0px 16px 30px rgba(0,0,0,0.3), 0 0 20px rgba(100,180,255,0.15)"
                : "0px 0px 0px 1px rgba(0,0,0,0.3), 0px 9px 9px rgba(0,0,0,0.12), 0px 2px 5px rgba(0,0,0,0.15)",
              transition: "box-shadow 0.3s ease",
              animation: isHovered ? "liquid-pulse 1.5s ease-in-out infinite" : "none",
            }}>
              <div ref={shaderRef} className="shader-container-exploded" style={{
                borderRadius: "100px", overflow: "hidden", position: "relative",
                width: `${dimensions.shaderWidth}px`, height: `${dimensions.shaderHeight}px`,
              }} />
            </div>
          </div>

          {/* Click surface */}
          <button
            ref={buttonRef}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            style={{
              position: "absolute", top: 0, left: 0,
              width: `${dimensions.width}px`, height: `${dimensions.height}px`,
              background: "transparent", border: "none", cursor: "pointer",
              outline: "none", zIndex: 40,
              transform: "translateZ(25px)",
              overflow: "hidden", borderRadius: "100px",
            }}
            aria-label={label}
          >
            {ripples.map((r) => (
              <span key={r.id} style={{
                position: "absolute", left: `${r.x}px`, top: `${r.y}px`,
                width: "20px", height: "20px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)",
                pointerEvents: "none", animation: "ripple-animation 0.7s ease-out",
              }} />
            ))}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

interface GlowOrbProps {
  color?: "blue" | "purple" | "mixed" | "bright-blue";
  size?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacity?: number;
  className?: string;
}

export default function GlowOrb({
  color = "blue",
  size = "600px",
  top,
  left,
  right,
  bottom,
  opacity = 0.25,
  className = "",
}: GlowOrbProps) {
  const gradientMap = {
    blue: "radial-gradient(circle, var(--color-lumience-blue), var(--color-bright-blue), transparent 70%)",
    "bright-blue":
      "radial-gradient(circle, var(--color-bright-blue), var(--color-light-blue), transparent 70%)",
    purple:
      "radial-gradient(circle, var(--color-lumience-purple), #9b59b6, transparent 70%)",
    mixed:
      "radial-gradient(circle, var(--color-lumience-blue), var(--color-lumience-purple), transparent 70%)",
  };

  return (
    <div
      className={`absolute pointer-events-none blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        opacity,
        background: gradientMap[color],
      }}
      aria-hidden="true"
    />
  );
}
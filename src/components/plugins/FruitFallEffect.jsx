import React from "react";
import { useApp } from "../../context/AppContext";

const PARTICLES = [
  { id: 1, char: "🍓", left: "8%", delay: "0s", duration: "9s", size: "20px" },
  {
    id: 2,
    char: "🍃",
    left: "18%",
    delay: "2s",
    duration: "12s",
    size: "16px",
  },
  {
    id: 3,
    char: "🍊",
    left: "28%",
    delay: "5s",
    duration: "10s",
    size: "18px",
  },
  {
    id: 4,
    char: "🌿",
    left: "42%",
    delay: "1s",
    duration: "14s",
    size: "15px",
  },
  { id: 5, char: "🍒", left: "55%", delay: "3s", duration: "8s", size: "20px" },
  {
    id: 6,
    char: "🍃",
    left: "68%",
    delay: "6s",
    duration: "13s",
    size: "17px",
  },
  {
    id: 7,
    char: "🍎",
    left: "80%",
    delay: "2.5s",
    duration: "11s",
    size: "19px",
  },
  {
    id: 8,
    char: "🍋",
    left: "92%",
    delay: "4s",
    duration: "9.5s",
    size: "18px",
  },
];

export default function FruitFallEffect() {
  const { isPluginActive } = useApp();
  const isActive = isPluginActive("wp_falling_fruits");

  if (!isActive) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="fruit-particle select-none"
          style={{
            left: p.left,
            fontSize: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const { cursorVariant } = useAppStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [isVisible]);

  const size = cursorVariant === "hover" ? 64 : cursorVariant === "text" ? 80 : 12;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border border-white/20"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          width: cursorVariant === "hover" ? 64 : 48,
          height: cursorVariant === "hover" ? 64 : 48,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] bg-[#00FF9C]"
        animate={{
          x: mousePosition.x - (size / 2),
          y: mousePosition.y - (size / 2),
          width: size,
          height: size,
          opacity: isVisible ? (cursorVariant === "text" ? 0.9 : 1) : 0,
        }}
        style={{
          mixBlendMode: cursorVariant === "text" ? "difference" : "normal",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { HeroCanvas } from "./hero-canvas";
import { AnimatedHeading } from "./animated-heading";
import { ScrollIndicator } from "./scroll-indicator";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1.2,
          pin: true,
        },
      });

      tl.to(
        contentRef.current,
        {
          y: -200,
          opacity: 0,
          scale: 0.9,
          filter: "blur(10px)",
          ease: "none",
        },
        0
      );

      tl.to(
        overlayRef.current,
        {
          opacity: 1,
          ease: "none",
        },
        0.3
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Particle canvas */}
      <HeroCanvas />

      {/* Noise grain overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="text-[#00FF9C] tracking-[0.5em] text-[11px] uppercase font-light">
            Photography · Film · Experience · by Ulhas Onkar Zambare
          </span>
        </motion.div>

        <AnimatedHeading
          text="PRATBHA"
          className="text-[clamp(4rem,12vw,14rem)] font-bold tracking-[-0.04em] text-white leading-[0.85]"
          delay={0.5}
        />
        <AnimatedHeading
          text="STUDIO"
          className="text-[clamp(4rem,12vw,14rem)] font-bold tracking-[-0.04em] text-white/80 leading-[0.85]"
          delay={0.7}
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 text-white/40 max-w-md mx-auto text-center text-sm md:text-base font-light leading-relaxed tracking-wide"
        >
          We blend story, art & technology to craft cinematic visual experiences
          that transcend the ordinary.
        </motion.p>

        <ScrollIndicator />
      </div>

      {/* Fade-to-black overlay driven by scroll */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[5] bg-black pointer-events-none opacity-0"
      />
    </section>
  );
}

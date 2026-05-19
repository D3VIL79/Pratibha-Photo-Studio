"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedHeading({
  text,
  className = "",
  delay = 0.3,
}: AnimatedHeadingProps) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const splitText = new SplitType(textRef.current, {
      types: "chars,words",
    });

    gsap.set(splitText.chars, { y: 120, opacity: 0, rotateX: -90 });

    const tl = gsap.timeline();
    tl.to(splitText.chars, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1.4,
      stagger: 0.025,
      ease: "expo.out",
      delay,
    });

    return () => {
      splitText.revert();
      tl.kill();
    };
  }, [text, delay]);

  return (
    <div className="overflow-hidden">
      <h1
        ref={textRef}
        className={`font-heading will-change-transform ${className}`}
        style={{ perspective: "600px" }}
      >
        {text}
      </h1>
    </div>
  );
}

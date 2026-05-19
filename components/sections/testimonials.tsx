"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Priya & Rohan",
    event: "Wedding, 2024",
    text: "Ulhas captured our wedding with such perfection — every frame feels like a movie. Absolutely magical.",
  },
  {
    name: "Sneha Patil",
    event: "Pre-Wedding Shoot",
    text: "The creativity and attention to detail was beyond anything we expected. The photos are stunning.",
  },
  {
    name: "Raj Deshmukh",
    event: "Product Photography",
    text: "Professional, punctual, and incredibly talented. Our product images elevated our entire brand.",
  },
  {
    name: "Ananya & Vikram",
    event: "Engagement Ceremony",
    text: "The team made us feel so comfortable. The candid shots are pure gold — we cherish every single one.",
  },
  {
    name: "Meera Shah",
    event: "Portfolio Shoot",
    text: "Best photographer in Nashik, hands down. The quality is unmatched and the vision is truly artistic.",
  },
  {
    name: "Amit Kulkarni",
    event: "Corporate Event",
    text: "Pratibha Photo Studio delivered exceptional coverage of our corporate event. Highly recommended!",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    // Duplicate children for seamless loop
    const track = marqueeRef.current;
    const clone = track.innerHTML;
    track.innerHTML += clone;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth / 2;
      gsap.to(track, {
        x: -totalWidth,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black z-20 py-32 overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-16 px-6">
        <span className="text-[#00FF9C] text-[10px] uppercase tracking-[0.5em] block mb-6">
          Client Love
        </span>
        <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight">
          What They Say
        </h2>
      </div>

      {/* Infinite marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div
          ref={marqueeRef}
          className="flex gap-6 w-fit"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[380px] p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-3 h-3 fill-[#00FF9C] text-[#00FF9C]" />
                ))}
              </div>

              <p className="text-white/50 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="border-t border-white/[0.06] pt-4">
                <span className="text-white text-sm font-medium block">
                  {t.name}
                </span>
                <span className="text-white/25 text-xs tracking-wider">
                  {t.event}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

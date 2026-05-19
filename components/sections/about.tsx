"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Text word-by-word opacity reveal on scroll
      if (textRef.current) {
        const split = new SplitType(textRef.current, {
          types: "words",
        });

        if (split.words) {
          gsap.set(split.words, { opacity: 0.1 });
          gsap.to(split.words, {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "center 40%",
              scrub: 1,
            },
          });
        }
      }

      // Image clip reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 2,
            ease: "expo.inOut",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Image parallax
      if (imageInnerRef.current) {
        gsap.fromTo(
          imageInnerRef.current,
          { scale: 1.3 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // Stats counter animation
      if (statsRef.current) {
        const statNums = statsRef.current.querySelectorAll(".stat-number");
        statNums.forEach((el) => {
          const target = parseInt(el.getAttribute("data-value") || "0", 10);
          gsap.fromTo(
            el,
            { textContent: 0 },
            {
              textContent: target,
              duration: 2,
              ease: "power2.out",
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        gsap.fromTo(
          statsRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full bg-black z-20 overflow-hidden"
    >
      {/* Manifesto block */}
      <div className="min-h-screen flex items-center px-6 md:px-16 py-32">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5">
            <span className="text-[#00FF9C] text-[10px] uppercase tracking-[0.5em] block mb-6">
              About the Studio
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight leading-tight mb-4">
              We don&apos;t just take photos.
              <br />
              <span className="text-white/40">We architect emotions.</span>
            </h2>
          </div>

          <div className="md:col-span-7">
            <p
              ref={textRef}
              className="text-2xl md:text-4xl font-heading font-light text-white leading-relaxed tracking-tight"
            >
              Every frame is a universe. We blend cutting-edge technology with
              timeless artistry, creating immersive visual narratives for luxury
              brands, editorial publications, and visionary creators who demand
              nothing less than extraordinary.
            </p>
          </div>
        </div>
      </div>

      {/* Full-width image reveal */}
      <div className="px-6 md:px-16 pb-32">
        <div
          ref={imageRef}
          className="relative w-full aspect-[21/9] overflow-hidden rounded-xl"
        >
          <div ref={imageInnerRef} className="absolute inset-0 w-full h-full">
            <Image
              src="/images/studio.png"
              alt="Studio Interior"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16">
            <span className="text-white/50 text-xs tracking-[0.3em] uppercase">
              Our Creative Space
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        ref={statsRef}
        className="max-w-[1400px] mx-auto w-full px-6 md:px-16 pb-32 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {[
          { value: 500, label: "Projects Delivered", suffix: "+" },
          { value: 12, label: "Years of Craft", suffix: "" },
          { value: 48, label: "Awards Won", suffix: "" },
          { value: 200, label: "Happy Clients", suffix: "+" },
        ].map((stat, i) => (
          <div key={i} className="text-center md:text-left">
            <div className="flex items-baseline justify-center md:justify-start gap-1">
              <span
                className="stat-number text-5xl md:text-6xl font-heading font-bold text-white"
                data-value={stat.value}
              >
                0
              </span>
              {stat.suffix && (
                <span className="text-[#00FF9C] text-3xl font-heading">
                  {stat.suffix}
                </span>
              )}
            </div>
            <span className="text-white/30 text-xs uppercase tracking-[0.2em] mt-2 block">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

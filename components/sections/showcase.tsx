"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const showcaseItems = [
  {
    image: "/images/hero_portrait.png",
    title: "LUMINANCE",
    subtitle: "Portrait Series",
    year: "2025",
    description: "A cinematic exploration of light, shadow, and human emotion captured in golden hour.",
  },
  {
    image: "/images/wedding.png",
    title: "ETERNAL",
    subtitle: "Wedding Stories",
    year: "2024",
    description: "Luxury wedding cinematography that transforms fleeting moments into timeless narratives.",
  },
  {
    image: "/images/fashion.png",
    title: "AVANT GARDE",
    subtitle: "Fashion Editorial",
    year: "2025",
    description: "High-fashion editorial work pushing the boundaries of visual storytelling and style.",
  },
  {
    image: "/images/product.png",
    title: "ESSENCE",
    subtitle: "Product & Commercial",
    year: "2024",
    description: "Premium product photography that elevates brands into the realm of luxury and desire.",
  },
  {
    image: "/images/landscape.png",
    title: "HORIZONS",
    subtitle: "Landscape & Travel",
    year: "2025",
    description: "Breathtaking vistas captured at the edge of the world, where earth meets sky.",
  },
];

function ShowcaseSlide({
  item,
  index,
}: {
  item: (typeof showcaseItems)[0];
  index: number;
}) {
  const slideRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!slideRef.current) return;

    const ctx = gsap.context(() => {
      // Image clip-path reveal from bottom
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.8,
            ease: "expo.inOut",
            scrollTrigger: {
              trigger: slideRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Image parallax on scroll
      if (imageInnerRef.current) {
        gsap.fromTo(
          imageInnerRef.current,
          { y: "-15%", scale: 1.2 },
          {
            y: "15%",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: slideRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // Title split reveal
      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: "chars" });
        gsap.fromTo(
          split.chars,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.2,
            stagger: 0.03,
            ease: "expo.out",
            scrollTrigger: {
              trigger: slideRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Subtitle, desc, line, number
      const fadeEls = [subtitleRef.current, descRef.current, lineRef.current, numberRef.current].filter(Boolean);
      gsap.fromTo(
        fadeEls,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: slideRef.current,
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={slideRef}
      className="relative w-full min-h-screen flex items-center py-16 md:py-0"
    >
      <div
        className={`max-w-[1400px] mx-auto w-full px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center ${
          isEven ? "" : "direction-rtl"
        }`}
        style={{ direction: isEven ? "ltr" : "rtl" }}
      >
        {/* Image side */}
        <div className="md:col-span-7 relative" style={{ direction: "ltr" }}>
          <div
            ref={imageRef}
            className="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden rounded-lg"
          >
            <div ref={imageInnerRef} className="absolute inset-0 w-full h-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority={index < 2}
              />
            </div>
            {/* Subtle vignette on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
          </div>
        </div>

        {/* Text side */}
        <div
          className="md:col-span-5 flex flex-col justify-center gap-6"
          style={{ direction: "ltr" }}
        >
          <span
            ref={numberRef}
            className="text-white/15 text-[8rem] md:text-[10rem] font-heading font-bold leading-none absolute -top-4 md:relative md:top-auto select-none"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div>
            <span
              ref={subtitleRef}
              className="text-[#00FF9C] text-xs uppercase tracking-[0.4em] font-light mb-3 block"
            >
              {item.subtitle} — {item.year}
            </span>
            <div className="overflow-hidden">
              <h2
                ref={titleRef}
                className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white tracking-[-0.03em] leading-[0.9]"
              >
                {item.title}
              </h2>
            </div>
          </div>

          <div
            ref={lineRef}
            className="w-16 h-[1px] bg-white/20"
          />

          <p
            ref={descRef}
            className="text-white/40 text-sm md:text-base font-light leading-relaxed max-w-sm"
          >
            {item.description}
          </p>

          <button className="group mt-4 flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-500 text-sm tracking-wider uppercase w-fit">
            <span className="font-light">View Project</span>
            <svg
              className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function ShowcaseSection() {
  return (
    <section id="work" className="relative bg-black z-20">
      {/* Section header */}
      <div className="w-full h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <span className="text-[#00FF9C] text-[10px] uppercase tracking-[0.5em] block mb-6">
            Selected Works
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight">
            Our Portfolio
          </h2>
        </div>
      </div>

      {/* Showcase items */}
      {showcaseItems.map((item, i) => (
        <ShowcaseSlide key={i} item={item} index={i} />
      ))}
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "/images/hero_portrait.png",
  "/images/wedding.png",
  "/images/fashion.png",
  "/images/product.png",
  "/images/landscape.png",
  "/images/studio.png",
];

export function FullscreenGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const totalWidth = trackRef.current!.scrollWidth - window.innerWidth;

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
          anticipatePin: 1,
        },
      });

      // Parallax each image
      const items = gsap.utils.toArray<HTMLElement>(".gallery-item");
      items.forEach((item) => {
        const img = item.querySelector(".gallery-img") as HTMLElement;
        if (!img) return;
        gsap.fromTo(
          img,
          { x: "-15%" },
          {
            x: "15%",
            ease: "none",
            scrollTrigger: {
              trigger: item,
              containerAnimation: gsap.getById?.("horizontal") || undefined,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-black overflow-hidden z-20">
      {/* Section label */}
      <div className="absolute top-8 left-8 md:left-16 z-10">
        <span className="text-[#00FF9C] text-[10px] uppercase tracking-[0.5em]">
          Gallery Reel
        </span>
      </div>

      <div
        ref={trackRef}
        className="flex items-center h-full gap-6 pl-[10vw] pr-[10vw]"
        style={{ width: "fit-content" }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="gallery-item relative flex-shrink-0 h-[70vh] overflow-hidden rounded-lg group cursor-pointer"
            style={{ width: i % 3 === 0 ? "55vw" : "35vw" }}
          >
            <div className="gallery-img absolute inset-[-15%] w-[130%] h-[130%] transition-transform duration-[1.5s] ease-out group-hover:scale-105">
              <Image
                src={src}
                alt={`Gallery ${i + 1}`}
                fill
                className="object-cover"
                sizes="60vw"
              />
            </div>
            {/* Dark gradient hover */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute bottom-6 left-6 z-10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <span className="text-white text-sm font-light tracking-widest uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll progress bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-white/10 z-10 overflow-hidden rounded">
        <div className="h-full bg-[#00FF9C]/60 w-0 gallery-progress" />
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Neon Nexus",
    category: "3D Motion",
    image: "/images/project_1.png",
  },
  {
    title: "Brutal Edge",
    category: "Architecture",
    image: "/images/project_2.png",
  },
  {
    title: "Silent Echo",
    category: "Fashion Editorial",
    image: "/images/studio.png",
  },
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    const sections = gsap.utils.toArray(".horizontal-item");

    const tl = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + scrollContainerRef.current?.offsetWidth,
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#0a141f]">
      <div className="absolute top-16 left-8 md:left-24 z-10">
        <h2 className="text-[#00FF9C] text-sm uppercase tracking-[0.3em]">Selected Works</h2>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex h-full w-[300vw] items-center"
      >
        {projects.map((project, i) => (
          <div
            key={i}
            className="horizontal-item relative h-full w-screen flex items-center justify-center p-8 md:p-24"
          >
            <div className="relative w-full max-w-5xl aspect-[16/9] group overflow-hidden rounded-2xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

              <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 z-10 translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-[#00FF9C] tracking-widest text-sm mb-2 block">{project.category}</span>
                <h3 className="text-4xl md:text-6xl font-heading font-bold text-white">{project.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

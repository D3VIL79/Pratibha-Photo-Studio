"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, Film, Sparkles, Image as ImageIcon, Video, Palette } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Camera,
    title: "Wedding Photography",
    description: "Timeless moments captured with cinematic precision and emotional depth.",
  },
  {
    icon: Film,
    title: "Wedding Cinematography",
    description: "Luxury wedding films that tell your love story in breathtaking detail.",
  },
  {
    icon: ImageIcon,
    title: "Portrait Sessions",
    description: "Editorial-quality portraits that reveal the true essence of personality.",
  },
  {
    icon: Video,
    title: "Commercial Shoots",
    description: "Product & brand photography that elevates your visual identity.",
  },
  {
    icon: Sparkles,
    title: "Event Coverage",
    description: "Full-scale event documentation with a cinematic eye for detail.",
  },
  {
    icon: Palette,
    title: "Photo Editing & Retouching",
    description: "Magazine-grade post-processing that turns great shots into masterpieces.",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger cards in
      gsap.fromTo(
        gridRef.current!.children,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-black z-20 py-32 px-6 md:px-16"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[#00FF9C] text-[10px] uppercase tracking-[0.5em] block mb-6">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight">
            Our Services
          </h2>
        </div>

        {/* Services grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] overflow-hidden transition-all duration-700 hover:border-[#00FF9C]/15 hover:bg-white/[0.03]"
            >
              {/* Number watermark */}
              <span className="absolute top-4 right-6 text-white/[0.03] text-[6rem] font-heading font-bold leading-none select-none group-hover:text-white/[0.06] transition-colors duration-700">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Hover glow */}
              <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[#00FF9C]/[0.03] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center mb-6 border border-white/[0.08] group-hover:border-[#00FF9C]/20 group-hover:bg-[#00FF9C]/10 transition-all duration-500">
                  <service.icon className="w-5 h-5 text-white/40 group-hover:text-[#00FF9C] transition-colors duration-500" />
                </div>

                <h3 className="text-xl font-heading font-semibold text-white mb-3 group-hover:text-[#00FF9C] transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-white/30 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

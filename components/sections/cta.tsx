"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Phone, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const split = new SplitType(headingRef.current, { types: "chars" });
        gsap.fromTo(
          split.chars,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.02,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "expo.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
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
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black z-20 px-6"
    >
      {/* Decorative line */}
      <div
        ref={lineRef}
        className="w-24 h-[1px] bg-[#00FF9C] mb-12 origin-left"
      />

      <span className="text-[#00FF9C] text-[10px] uppercase tracking-[0.5em] block mb-8">
        Ready to Create Magic?
      </span>

      <div className="overflow-hidden">
        <h2
          ref={headingRef}
          className="text-5xl md:text-8xl lg:text-[9rem] font-heading font-bold text-white tracking-[-0.04em] text-center leading-[0.9]"
        >
          BOOK YOUR
          <br />
          <span className="text-white/40">SESSION</span>
        </h2>
      </div>

      <p className="mt-10 text-white/30 text-sm md:text-base text-center max-w-lg font-light tracking-wide leading-relaxed">
        Have a vision? Whether it&apos;s a dream wedding, a fashion editorial, or a brand campaign — 
        Ulhas Onkar Zambare and the Pratbha team will bring it to life.
      </p>

      {/* CTA buttons */}
      <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/919604546198?text=Hi%20Pratbha%20Studio!%20I%20would%20like%20to%20inquire%20about%20your%20photography%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-10 py-5 overflow-hidden rounded-full bg-[#25D366] border border-[#25D366]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(37,211,102,0.3)]"
        >
          <div className="relative z-10 flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-white" />
            <span className="text-white font-semibold tracking-wider text-sm uppercase">
              WhatsApp Us
            </span>
          </div>
        </a>

        {/* Phone CTA */}
        <a
          href="tel:+919604546198"
          className="group relative px-10 py-5 overflow-hidden rounded-full border border-white/15 bg-transparent transition-all duration-700 hover:border-[#00FF9C]/50"
        >
          <div className="absolute inset-0 bg-[#00FF9C] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] origin-left rounded-full" />
          <div className="relative z-10 flex items-center gap-3">
            <Phone className="w-4 h-4 text-white group-hover:text-black transition-colors duration-500" />
            <span className="text-white font-medium tracking-[0.15em] uppercase text-sm group-hover:text-black transition-colors duration-500">
              Call Now
            </span>
          </div>
        </a>
      </div>

      <span className="mt-6 text-white/20 text-xs tracking-widest">
        +91 96045 46198
      </span>
    </section>
  );
}

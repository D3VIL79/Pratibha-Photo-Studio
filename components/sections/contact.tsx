"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Phone, MapPin, Mail, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 96045 46198",
    href: "tel:+919604546198",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 96045 46198",
    href: "https://wa.me/919604546198",
  },
  {
    icon: Mail,
    label: "Email",
    value: "pratbhastudio@gmail.com",
    href: "mailto:pratbhastudio@gmail.com",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Rathchakra Chowk, Nashik",
    href: "https://maps.app.goo.gl/v7kfQPQ978vAa1P6A?g_st=ac",
  },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        const split = new SplitType(headingRef.current, { types: "chars" });
        gsap.fromTo(
          split.chars,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.02,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Contact cards stagger
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Map reveal
      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current,
          { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.8,
            ease: "expo.inOut",
            scrollTrigger: {
              trigger: mapRef.current,
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
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-black z-20 py-32 px-6 md:px-16"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Top label + heading */}
        <div className="mb-20">
          <span className="text-[#00FF9C] text-[10px] uppercase tracking-[0.5em] block mb-6">
            Get in Touch
          </span>
          <div className="overflow-hidden">
            <h2
              ref={headingRef}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white tracking-[-0.03em] leading-[0.9]"
            >
              LET&apos;S WORK
              <br />
              <span className="text-white/30">TOGETHER</span>
            </h2>
          </div>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Cards + Photographer info */}
          <div>
            {/* Photographer name */}
            <div className="mb-12 border-b border-white/[0.06] pb-8">
              <span className="text-white/30 text-xs uppercase tracking-[0.3em] block mb-3">
                Lead Photographer & Founder
              </span>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-tight">
                Ulhas Onkar Zambare
              </h3>
            </div>

            {/* Contact cards */}
            <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#00FF9C]/20 hover:bg-white/[0.04]"
                >
                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-[#00FF9C]/10 flex items-center justify-center mb-4 border border-[#00FF9C]/20 group-hover:scale-110 transition-transform duration-500">
                      <item.icon className="w-4 h-4 text-[#00FF9C]" />
                    </div>
                    <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] block mb-1">
                      {item.label}
                    </span>
                    <span className="text-white text-sm font-medium">
                      {item.value}
                    </span>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="absolute top-6 right-6 w-4 h-4 text-white/10 group-hover:text-[#00FF9C] transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </a>
              ))}
            </div>

            {/* Full address */}
            <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] block mb-3">
                Studio Address
              </span>
              <p className="text-white/60 text-sm leading-relaxed">
                Wadala - Pathardi Rd, near HDFC Bank,
                <br />
                Rathchakra Chowk, Kala Nagar, Indira Nagar,
                <br />
                Nashik, Maharashtra 422009
              </p>
              <a
                href="https://maps.app.goo.gl/v7kfQPQ978vAa1P6A?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-[#00FF9C] text-xs uppercase tracking-[0.2em] hover:gap-3 transition-all duration-300"
              >
                Open in Maps
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Map embed */}
          <div ref={mapRef} className="relative rounded-2xl overflow-hidden h-[500px] lg:h-full lg:min-h-[600px] border border-white/[0.05]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.2!2d73.7896!3d19.9975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeba000000001%3A0x1!2sRathchakra+Chowk%2C+Kala+Nagar%2C+Indira+Nagar%2C+Nashik%2C+Maharashtra+422009!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.3) brightness(0.6)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pratibha Photo Studio Location"
            />
            {/* Map overlay gradient */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
}

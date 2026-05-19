"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 px-6 md:px-16 py-5 flex items-center justify-between transition-all duration-700"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backdropFilter: scrolled ? "blur(20px)" : "none",
          backgroundColor: scrolled ? "rgba(0,0,0,0.7)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "1px solid transparent",
        }}
      >
        <a href="#" className="text-xl font-heading font-bold text-white tracking-tighter">
          PRATIBHA PHOTO<span className="text-[#00FF9C]">.</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {[
            { label: "Work", id: "work" },
            { label: "About", id: "about" },
            { label: "Services", id: "services" },
            { label: "Contact", id: "contact" },
          ].map((item, i) => (
            <a
              key={i}
              href={`#${item.id}`}
              className="text-white/50 text-[11px] uppercase tracking-[0.25em] hover:text-white transition-colors duration-500 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00FF9C] group-hover:w-full transition-all duration-500" />
            </a>
          ))}
        </div>

        {/* Book button */}
        <a
          href="https://wa.me/919604546198?text=Hi%20Pratibha%20Photo%20Studio!%20I%20would%20like%20to%20inquire%20about%20your%20photography%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00FF9C]/10 border border-[#00FF9C]/20 text-[#00FF9C] text-[11px] uppercase tracking-[0.2em] hover:bg-[#00FF9C]/20 transition-all duration-500"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Book Now
        </a>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 group">
          <span className="w-6 h-[1px] bg-white group-hover:w-4 transition-all duration-300" />
          <span className="w-4 h-[1px] bg-white group-hover:w-6 transition-all duration-300" />
        </button>
      </motion.nav>

      {/* Floating WhatsApp button (mobile) */}
      <motion.a
        href="https://wa.me/919604546198?text=Hi%20Pratbha%20Studio!%20I%20would%20like%20to%20inquire%20about%20your%20photography%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 md:hidden"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.a>
    </>
  );
}

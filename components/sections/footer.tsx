"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle } from "lucide-react";

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Google Maps", href: "https://maps.app.goo.gl/v7kfQPQ978vAa1P6A?g_st=ac" },
];

export function Footer() {
  return (
    <footer className="relative w-full bg-black z-20 border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-3xl font-heading font-bold text-white tracking-tighter block mb-4">
              PRATBHA<span className="text-[#00FF9C]">.</span>
            </span>
            <p className="text-white/25 text-sm leading-relaxed max-w-xs">
              Premium photography & cinematography studio by Ulhas Onkar Zambare. 
              Crafting cinematic visual experiences since 2013.
            </p>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
          >
            <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] block mb-5">
              Contact
            </span>
            <div className="space-y-4">
              <a
                href="tel:+919604546198"
                className="flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300 text-sm"
              >
                <Phone className="w-3.5 h-3.5 text-[#00FF9C]" />
                +91 96045 46198
              </a>
              <a
                href="https://wa.me/919604546198"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-[#25D366] transition-colors duration-300 text-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                WhatsApp
              </a>
              <a
                href="https://maps.app.goo.gl/v7kfQPQ978vAa1P6A?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/50 hover:text-white transition-colors duration-300 text-sm leading-relaxed"
              >
                <MapPin className="w-3.5 h-3.5 text-[#00FF9C] mt-0.5 flex-shrink-0" />
                <span>
                  Wadala - Pathardi Rd, near HDFC Bank,<br />
                  Rathchakra Chowk, Nashik 422009
                </span>
              </a>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] block mb-5">
              Follow Us
            </span>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-white/30 text-sm hover:text-white transition-colors duration-500 flex items-center gap-2 group"
                >
                  <span className="w-0 h-[1px] bg-[#00FF9C] group-hover:w-4 transition-all duration-500" />
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/[0.04] mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/10 text-xs tracking-wider">
            © {new Date().getFullYear()} Pratbha Photo Studio. All rights reserved.
          </span>
          <span className="text-white/10 text-xs tracking-wider">
            Designed with ♥ in Nashik
          </span>
        </div>
      </div>
    </footer>
  );
}

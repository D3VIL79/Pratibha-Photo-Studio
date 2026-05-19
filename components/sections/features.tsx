"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Camera, Layers, Wand2 } from "lucide-react";

const features = [
  {
    title: "Cinematic Captures",
    description: "High-end photography and videography tailored for luxury brands and editorial stories.",
    icon: Camera,
  },
  {
    title: "Immersive WebGL",
    description: "Interactive 3D web experiences that push the boundaries of digital storytelling.",
    icon: Layers,
  },
  {
    title: "Creative Direction",
    description: "Full-scale art direction from concept to final pixel-perfect execution.",
    icon: Wand2,
  },
];

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const transform = useMotionTemplate`perspective(1000px) rotateX(${useMotionTemplate`${mouseYSpring} * -15deg`}) rotateY(${useMotionTemplate`${mouseXSpring} * 15deg`})`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transformStyle: "preserve-3d" }}
      className="relative group p-8 rounded-3xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-md overflow-hidden cursor-pointer"
    >
      {/* Dynamic Glow */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${useMotionTemplate`${mouseXSpring} * 100% + 50%`} ${useMotionTemplate`${mouseYSpring} * 100% + 50%`}, rgba(123, 97, 255, 0.15), transparent 40%)`,
          opacity: isHovered ? 1 : 0
        }}
      />
      
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-[#7B61FF]/20 flex items-center justify-center mb-6 border border-[#7B61FF]/30 group-hover:scale-110 transition-transform duration-500">
          <feature.icon className="w-6 h-6 text-[#7B61FF]" />
        </div>
        <h3 className="text-2xl font-heading text-white mb-4">{feature.title}</h3>
        <p className="text-[#8A9BB3] font-sans leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-32 px-8 md:px-24 bg-[#0B1B2B] relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-[#00FF9C] text-sm uppercase tracking-[0.3em] mb-4">Expertise</h2>
          <p className="text-4xl md:text-6xl font-heading font-bold text-white">What We Do Best</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[1000px]">
          {features.map((f, i) => (
            <FeatureCard key={i} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1.5 }}
    >
      <span className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-light">
        Scroll to explore
      </span>
      <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1.5">
        <motion.div
          className="w-1 h-1 rounded-full bg-[#00FF9C]"
          animate={{ y: [0, 16, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}

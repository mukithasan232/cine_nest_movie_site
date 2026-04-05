"use client";

import React from "react";
import { Info } from "lucide-react";
import { motion } from "framer-motion";

interface AdSlotProps {
  label?: string;
}

const AdSlot = ({ label = "Space" }: AdSlotProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-12 w-full flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-zinc-800 bg-zinc-950/60 backdrop-blur-3xl group hover:border-zinc-700 transition-colors"
    >
      <div className="flex items-center gap-3 py-2 px-5 rounded-full bg-zinc-900 border border-white/5 text-zinc-500 mb-4 group-hover:bg-zinc-800 group-hover:text-zinc-400 transition-all">
         <Info className="w-4 h-4" />
         <span className="text-[10px] font-black uppercase tracking-[0.3em]">Advertisement - {label}</span>
      </div>
      
      <p className="text-sm font-medium text-zinc-600 group-hover:text-zinc-500 transition-colors leading-relaxed text-center">
         This premium space is reserved for our cinematic partners. <br />
         Connect with millions of movie enthusiasts worldwide.
      </p>
      
      {/* AdSense Placement Script Placeholder */}
      <div className="mt-6 text-zinc-800 font-mono text-[10px] tracking-widest uppercase">
         ID: AD-SY-0492-CS
      </div>
    </motion.div>
  );
};

export default AdSlot;

"use client";

import React from "react";
import { Sparkles, Info } from "lucide-react";
import { motion } from "framer-motion";

interface AdSlotProps {
  type?: "horizontal" | "vertical" | "square";
  label?: string;
  className?: string;
}

const AdSlot = ({ type = "horizontal", label = "Exclusive Promotion", className = "" }: AdSlotProps) => {
  const containerStyle = {
    horizontal: "w-full min-h-[120px] md:h-32",
    vertical: "w-full md:w-64 h-full",
    square: "w-full aspect-square",
  }[type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`${containerStyle} ${className} relative group flex flex-col items-center justify-center rounded-[2.5rem] overflow-hidden border border-white/5 bg-zinc-900/40 backdrop-blur-3xl transition-all duration-700 hover:border-indigo-500/20 hover:shadow-2xl hover:shadow-indigo-500/5`}
    >
      {/* Decorative Gradients */}
      <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-x-0 h-px bottom-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-y-0 w-px left-0 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-y-0 w-px right-0 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="flex flex-col items-center gap-2 p-6 text-center select-none relative z-10">
        <div className="flex items-center gap-3 py-1.5 px-4 rounded-full bg-white/5 border border-white/10 mb-2 group-hover:bg-indigo-600/10 group-hover:border-indigo-600/30 transition-all duration-500">
           <Sparkles className="w-4 h-4 text-indigo-400" />
           <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">
              {label}
           </span>
           <Info className="w-3.5 h-3.5 text-white/20 hover:text-white transition-colors cursor-help" />
        </div>
        
        <p className="text-xs md:text-sm font-medium text-white/30 group-hover:text-white/60 transition-colors leading-relaxed max-w-sm">
           This premium space is reserved for our cinematic partners. <br className="hidden md:block" />
           <span className="text-zinc-600 font-bold tracking-tighter">ADSENSE PENDING APPROVAL - V04 SYNC</span>
        </p>
      </div>

      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
        <div className="w-32 h-32 rounded-[2rem] border-2 border-white/20" />
      </div>
      <div className="absolute bottom-0 left-0 p-8 opacity-5 -rotate-12 group-hover:-rotate-90 transition-transform duration-1000">
         <div className="w-24 h-24 border-2 border-white/20 rounded-full" />
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </motion.div>
  );
};

export default AdSlot;

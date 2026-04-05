"use client";

import React, { useEffect } from "react";
import { Info } from "lucide-react";
import { motion } from "framer-motion";

interface AdSlotProps {
  label?: string;
}

const AdSlot = ({ label = "Space" }: AdSlotProps) => {
  useEffect(() => {
    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      // Only push if the ins block is empty to prevent duplicates
      if (document.querySelectorAll('.adsbygoogle').length > 0) {
        adsbygoogle.push({});
      }
    } catch (err) {
      console.error("Google AdSense payload error:", err);
    }
  }, []);

  return (
    <div className="my-12 w-full flex flex-col items-center justify-center min-h-[120px] rounded-3xl bg-zinc-950/40 border border-white/5 relative overflow-hidden group">
      <div className="absolute top-4 left-4 z-0 flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
         <Info className="w-3 h-3 text-zinc-500" />
         <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Ad Space: {label}</span>
      </div>
      
      <div className="w-full relative z-10 p-6 flex justify-center items-center">
         {/* Live AdSense Unit Element */}
         <ins
           className="adsbygoogle"
           style={{ display: "block", textAlign: "center", width: "100%" }}
           data-ad-client="ca-pub-4590020337376910"
           data-ad-format="auto"
           data-full-width-responsive="true"
         />
      </div>
    </div>
  );
};

export default AdSlot;

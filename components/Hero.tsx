"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Info, TrendingUp, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden mb-16 container-fluid">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] z-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center gap-12 md:gap-24">
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 mb-6 backdrop-blur-md"
          >
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-indigo-200 tracking-wider uppercase">
              Trending This Week
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          >
            Your Ultimate <br />
            <span className="text-cinema-red">Movie Sanctuary</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-zinc-400 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed font-light"
          >
            Discover, track, and explore thousands of movies and TV shows from every genre. CoderNest Cinema brings the cinematic experience directly to your screen with a premium interface.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4"
          >
            <Link href="/movies/157336">
               <button className="px-8 py-4 rounded-2xl bg-cinema-red hover:bg-white hover:text-black text-white font-bold transition-all flex items-center gap-3 shadow-xl shadow-cinema-red/20 hover:-translate-y-1">
                 <Play className="w-5 h-5 fill-current" />
                 Watch Now
               </button>
            </Link>
            <button className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-all flex items-center gap-3 backdrop-blur-md hover:-translate-y-1">
              <Info className="w-5 h-5" />
              Learn More
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="flex-1 relative w-full mt-10 md:mt-0"
        >
          <div className="relative w-full aspect-[2/3] max-w-[250px] md:max-w-sm mx-auto md:ml-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-float">
            <Image
              src="https://image.tmdb.org/t/p/w1280/2ssWTSVklAEc98frZUQhgtGHx7s.jpg"
              alt="Interstellar Movie Backdrop"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            {/* Poster Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="text-yellow-500 font-bold">8.7</span>
                <span className="text-white/40 text-sm">/ 10</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">Interstellar</h3>
              <p className="text-white/60 text-sm">Released Oct, 2014</p>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-500/10 blur-[100px] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

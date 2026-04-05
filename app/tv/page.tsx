"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import AdSlot from "@/components/AdSlot";
import { getMovies } from "@/lib/tmdb";
import { Tv, Search, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const TVShowsPage = () => {
  const [shows, setShows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      try {
        const data = await getMovies("/tv/popular");
        if (data?.results) setShows(data.results);
      } catch (error) {
        console.error("Fetch TV Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 pb-32">
      <section className="relative pt-12 pb-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
           <div>
              <div className="flex items-center gap-3 mb-4 text-indigo-400">
                 <Tv className="w-6 h-6" />
                 <span className="text-xs font-black uppercase tracking-[0.3em]">CineNest Global</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">TV SHOWS</h1>
           </div>
           
           <div className="flex flex-wrap items-center gap-4">
              <div className="relative group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-indigo-400 transition-colors" />
                 <input 
                    type="text" 
                    placeholder="Search shows..." 
                    className="pl-12 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-indigo-500/50 outline-none w-full md:w-64 transition-all"
                 />
              </div>
              <button className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all">
                 <Clock className="w-5 h-5 font-mono" />
                 LATEST
              </button>
           </div>
        </div>

        <AdSlot label="Streaming Experience" />

        {/* TV Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-16 mt-16">
          {loading ? (
             Array(10).fill(0).map((_, i) => (
                <div key={i} className="aspect-[2/3] rounded-[2rem] bg-white/5 animate-pulse" />
             ))
          ) : (
             shows.map((show, idx) => (
                <motion.div
                   key={show.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: (idx % 5) * 0.1 }}
                >
                   <MovieCard movie={show} />
                </motion.div>
             ))
          )}
        </div>

        <section className="mt-32 p-12 md:p-24 rounded-[4rem] bg-indigo-500/5 border border-indigo-500/10 text-center relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-700">
           <div className="relative z-10">
              <div className="mb-10 inline-flex p-5 rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform duration-700">
                 <Sparkles className="w-10 h-10" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">Binge-Watch Like Never Before</h2>
              <p className="text-xl text-zinc-400 mb-12 max-w-xl mx-auto font-light leading-relaxed">
                 Discover high-end series, original productions, and cult classics curated for the ultimate streaming journey.
              </p>
              <button className="px-10 py-5 rounded-[2rem] bg-indigo-600 text-white font-black hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-500/30">
                 DISCOVER ORIGINALS
              </button>
           </div>
           
           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_0%,rgba(99,102,241,0.05)_0%,transparent_50%)]" />
        </section>
      </section>
    </div>
  );
};

export default TVShowsPage;

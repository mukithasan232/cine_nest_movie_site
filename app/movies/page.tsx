"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import AdSlot from "@/components/AdSlot";
import { fetchFromTMDB } from "@/lib/tmdb";
import { Film, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

const MoviesPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchFromTMDB("/movie/popular");
        if (data?.results) setMovies(data.results);
      } catch (error) {
        console.error("Fetch Movies Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 pb-32">
      {/* Header section with search and filter */}
      <section className="relative pt-12 pb-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
           <div>
              <div className="flex items-center gap-3 mb-4 text-indigo-400">
                 <Film className="w-6 h-6" />
                 <span className="text-xs font-black uppercase tracking-[0.3em]">CineNest Database</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">ALL MOVIES</h1>
           </div>
           
           <div className="flex flex-wrap items-center gap-4">
              <div className="relative group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-indigo-400 transition-colors" />
                 <input 
                    type="text" 
                    placeholder="Search movies..." 
                    className="pl-12 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-indigo-500/50 outline-none w-full md:w-64 transition-all"
                 />
              </div>
              <button className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all">
                 <Filter className="w-5 h-5" />
                 FILTER
              </button>
           </div>
        </div>

        <AdSlot label="Explore the Collection" />

        {/* Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-16 mt-16">
          {loading ? (
             Array(10).fill(0).map((_, i) => (
                <div key={i} className="aspect-[2/3] rounded-[2rem] bg-white/5 animate-pulse" />
             ))
          ) : (
             movies.map((movie, idx) => (
                <motion.div
                   key={movie.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: (idx % 5) * 0.1 }}
                >
                   <MovieCard movie={movie} />
                </motion.div>
             ))
          )}
        </div>
      </section>
    </div>
  );
};

export default MoviesPage;

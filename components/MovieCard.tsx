"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Play, Plus, Clock } from "lucide-react";
import { getImageUrl } from "@/lib/tmdb";
import { motion } from "framer-motion";

interface MovieCardProps {
  movie: {
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
  };
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;
  const rating = movie.vote_average?.toFixed(1) || "N/A";
  const year = releaseDate?.split("-")[0] || "Unknown";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative flex flex-col gap-6"
    >
      <Link href={`/movies/${movie.id}`} className="block relative aspect-[2/3] rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/10 transition-all duration-700 hover:border-indigo-500/30 shadow-2xl hover:shadow-indigo-500/10 active:scale-95 group-hover:-translate-y-2">
        <Image
          src={getImageUrl(movie.poster_path, "w500")}
          alt={title || "Movie Image"}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <div className="flex items-center gap-3 mb-4 scale-90 group-hover:scale-100 transition-transform duration-500">
             <button className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-xl shadow-indigo-600/30">
               <Play className="w-5 h-5 fill-current" />
             </button>
             <button className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all backdrop-blur-md">
               <Plus className="w-5 h-5" />
             </button>
          </div>
          
          <div className="flex flex-col gap-1">
             <div className="flex items-center gap-2 mb-1">
               <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
               <span className="text-white text-sm font-black">{rating} Rating</span>
             </div>
             <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold font-mono tracking-tighter">
                <Clock className="w-3 h-3" />
                <span>EPISODES</span>
             </div>
          </div>
        </div>

        {/* Rating Floating Badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-zinc-950/70 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-2 shadow-2xl group-hover:bg-indigo-600/90 transition-colors duration-500">
          <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500 group-hover:fill-white group-hover:text-white transition-colors duration-500" />
          <span className="text-white text-xs font-black leading-none tracking-tighter">{rating}</span>
        </div>
      </Link>

      <div className="flex flex-col gap-2 px-2">
        <Link href={`/movies/${movie.id}`}>
          <h3 className="text-lg font-black text-white leading-tight truncate group-hover:text-indigo-400 transition-colors duration-500 tracking-tighter">
            {title}
          </h3>
        </Link>
        <div className="flex items-center gap-3">
           <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-lg border border-white/5 bg-white/5">
             {year}
           </span>
           <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
             CINEMATIC
           </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;

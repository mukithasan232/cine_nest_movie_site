"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { getImageUrl } from "@/lib/tmdb";

interface MovieCardProps {
  movie: any;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link href={`/movies/${movie.id}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="group relative h-[450px] w-full cursor-pointer overflow-hidden rounded-3xl"
      >
        <Image
          src={getImageUrl(movie.poster_path)}
          alt={movie.title || "Movie Poster"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <div className="glass p-4 rounded-2xl">
             <h3 className="text-xl font-bold leading-tight mb-2 truncate">{movie.title || movie.name}</h3>
             <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-cinema-red text-cinema-red" />
                <span className="text-sm font-bold">{movie.vote_average?.toFixed(1) || "N/A"}</span>
             </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-xl flex items-center gap-2 group-hover:hidden">
           <Star className="w-4 h-4 fill-cinema-red text-cinema-red" />
           <span className="text-xs font-black">{movie.vote_average?.toFixed(1) || "N/A"}</span>
        </div>
      </motion.div>
    </Link>
  );
};

export default MovieCard;

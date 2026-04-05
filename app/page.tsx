import React from "react";
import Hero from "@/components/Hero";
import MovieCard from "@/components/MovieCard";
import AdSlot from "@/components/AdSlot";
import { getTrendingMovies } from "@/lib/tmdb";
import { TrendingUp, Film, Sparkles } from "lucide-react";

export const revalidate = 3600;

const Home = async () => {
  const trendingData = await getTrendingMovies();
  const trending = trendingData?.results?.slice(0, 10) || [];

  return (
    <main className="min-h-screen bg-zinc-950 pb-32 selection:bg-cinema-red selection:text-white">
      <Hero />

      <section className="container mx-auto px-6 mt-12 mb-24">
        <AdSlot label="Trending Spotlight" />
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-cinema-red shadow-2xl shadow-cinema-red/20 text-white">
               <TrendingUp className="w-7 h-7" />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase underline decoration-cinema-red/30 underline-offset-8">
               Trending Now
            </h2>
          </div>
          <button className="text-zinc-600 hover:text-white transition-colors font-black uppercase tracking-[0.3em] text-[10px]">
             View All Releases
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 gap-y-16">
          {trending.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-32 py-24 rounded-[4rem] bg-gradient-to-br from-cinema-red/10 via-zinc-950 to-zinc-950 border border-white/5 relative overflow-hidden text-center group">
         <div className="relative z-10">
            <div className="mb-10 inline-flex p-5 rounded-[2.5rem] bg-cinema-red/20 border border-cinema-red/30 text-cinema-red group-hover:scale-110 transition-transform duration-700 shadow-2xl shadow-cinema-red/10">
               <Sparkles className="w-12 h-12" />
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter">Your Next Cinematic Story <br /> Begins at CoderNest</h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed antialiased">
               Experience the gold standard of movie information. Join an elite community of film enthusiasts and explore cinematographic wonders.
            </p>
            <button className="px-14 py-6 rounded-[2.5rem] bg-indigo-600 text-white font-black hover:bg-cinema-red transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/20">
               WATCH TRAILERS NOW
            </button>
         </div>

         {/* Decor */}
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(229,9,20,0.05)_0%,transparent_60%)]" />
      </section>
    </main>
  );
};

export default Home;

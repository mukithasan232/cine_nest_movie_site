import React, { Suspense } from "react";
import Hero from "@/components/Hero";
import MovieCard from "@/components/MovieCard";
import AdSlot from "@/components/AdSlot";
import { getTrendingMovies, getUpcomingMovies } from "@/lib/tmdb";
import { TrendingUp, Calendar, Sparkles } from "lucide-react";

// Server Side Revalidation
export const revalidate = 3600;

const Home = async () => {
  const [trendingData, upcomingData] = await Promise.all([
    getTrendingMovies(),
    getUpcomingMovies(),
  ]);

  const trending = trendingData?.results?.slice(0, 5) || [];
  const upcoming = upcomingData?.results?.slice(0, 10) || [];

  const renderSection = (title: string, icon: any, movies: any[]) => (
    <section className="max-w-7xl mx-auto px-6 mb-20 scroll-mt-24">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
             {icon}
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">{title}</h2>
        </div>
        <button className="text-white/40 hover:text-white transition-all font-bold uppercase tracking-[0.2em] text-xs">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-16">
        {movies.map((movie, idx) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-zinc-950 pb-32">
      <Hero />

      <div className="container mx-auto">
        {/* Ad Slot below Navbar (Hero already has its own margin) */}
        <div className="max-w-7xl mx-auto px-6 mb-16 -mt-10 relative z-30">
          <AdSlot label="Trending Spotlight" />
        </div>

        <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>}>
          {renderSection("Trending This Week", <TrendingUp className="w-6 h-6" />, trending)}
        </Suspense>

        <div className="max-w-7xl mx-auto px-6 mb-16">
          <AdSlot label="Next Gen Cinema" />
        </div>

        <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>}>
           {renderSection("Upcoming Masterpieces", <Calendar className="w-6 h-6" />, upcoming)}
        </Suspense>

        <section className="max-w-7xl mx-auto px-6 mt-32 py-24 rounded-[4rem] bg-gradient-to-br from-indigo-950/40 via-zinc-950 to-zinc-950 border border-white/5 relative overflow-hidden text-center group">
           <div className="relative z-10">
              <div className="mb-10 inline-flex p-5 rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform duration-700">
                 <Sparkles className="w-10 h-10" />
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter">Your Cinematic Future <br /> Starts with CineNest</h2>
              <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                 Join a elite community of film enthusiasts. Get personalized recommendations, create watchlists, and share your reviews.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                 <button className="px-12 py-6 rounded-3xl bg-indigo-600 text-white font-black hover:bg-indigo-500 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/30">
                    JOIN FREE NOW
                 </button>
                 <button className="px-12 py-6 rounded-3xl bg-zinc-900 border border-white/10 text-white font-black hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95">
                    LEARN MORE
                 </button>
              </div>
           </div>

           {/* Decor */}
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.05)_0%,transparent_60%)]" />
           <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.05)_0%,transparent_60%)]" />
        </section>
      </div>
    </div>
  );
};

export default Home;

import React, { Suspense } from "react";
import Image from "next/image";
import { Star, Clock, Calendar, Globe, Play, ChevronLeft, CreditCard, Film, Info, User, Layers } from "lucide-react";
import { getMovieDetails, getImageUrl } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";

// Server Side Revalidation for SEO/ISR
export const revalidate = 3600;

interface PageProps {
  params: { id: string };
}

const MovieDetail = async ({ params }: PageProps) => {
  const movie = await getMovieDetails(params.id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-5xl font-black text-white mb-6 tracking-tighter">PROJECT NOT FOUND</h1>
        <p className="text-zinc-400 mb-12 max-w-md font-light text-xl">The cinematic masterpiece you're looking for is either in pre-production or has been vaulted.</p>
        <Link
           href="/"
           className="px-12 py-5 rounded-3xl bg-white text-black font-black hover:bg-neutral-200 transition-all font-mono tracking-tighter shadow-2xl hover:scale-105 active:scale-95"
        >
           GO BACK HOME
        </Link>
      </div>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, "original");
  const posterUrl = getImageUrl(movie.poster_path, "w500");
  const releaseYear = movie.release_date?.split("-")[0] || "Unknown";
  const rating = movie.vote_average?.toFixed(1) || "N/A";
  const runtime = movie.runtime ? `${movie.runtime}m` : "N/A";

  // JSON-LD for Movie and Review
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movie.title,
    "image": posterUrl,
    "description": movie.overview,
    "datePublished": movie.release_date,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "bestRating": "10",
      "worstRating": "1",
      "ratingCount": movie.vote_count
    },
    "director": movie.credits?.crew?.filter((p: any) => p.job === "Director").map((d: any) => ({
      "@type": "Person",
      "name": d.name
    }))
  };

  return (
    <div className="min-h-screen bg-zinc-950 pb-32 overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Movie Spotlight */}
      <section className="relative w-full h-[85vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover opacity-30 animate-pulse duration-[10s]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px] z-0" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pb-16">
           <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-8">
                 <Link
                    href="/"
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-110"
                 >
                    <ChevronLeft className="w-5 h-5 text-white" />
                 </Link>
                 <div className="px-4 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-600/30 text-indigo-400 text-xs font-black tracking-widest uppercase">
                    FEATURED PROJECT
                 </div>
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
                 {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-10 text-white/50 mb-12 font-black tracking-widest text-[10px] uppercase">
                 <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    <span className="text-white text-lg font-black tracking-tight">{rating}</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <span className="text-white/80">{releaseYear} RELEASE</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5" />
                    <span className="text-white/80">{runtime} DURATION</span>
                 </div>
                 <div className="flex items-center gap-4">
                    {movie.genres?.map((genre: any) => (
                       <span key={genre.id} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-indigo-400">
                          {genre.name}
                       </span>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 -mt-32 relative z-30">
         {/* Sidebar Poster (Always present on desktop) */}
         <div className="hidden lg:block lg:col-span-4 space-y-8">
            <div className="relative aspect-[2/3] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group cursor-pointer">
               <Image src={posterUrl} alt={movie.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-6 rounded-[2rem] bg-white text-black font-black flex items-center gap-3">
                     <Film className="w-6 h-6" />
                     VIEW TRAILER
                  </div>
               </div>
            </div>
            
            <div className="p-10 rounded-[3rem] border border-indigo-500/10 bg-indigo-500/5 backdrop-blur-3xl space-y-8">
               <div className="flex items-center gap-4 text-indigo-400">
                  <Globe className="w-6 h-6" />
                  <h3 className="text-xl font-black uppercase tracking-tighter">Platform Sync</h3>
               </div>
               <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  Seamlessly stream this cinematic journey across all your authorized devices in crystal clear 4K HDR.
               </p>
               <div className="flex flex-col gap-4">
                  <button className="w-full py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3">
                     <Play className="w-5 h-5 fill-current" />
                     SQUARE PLAY
                  </button>
                  <button className="w-full py-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black transition-all flex items-center justify-center gap-3">
                     <CreditCard className="w-5 h-5" />
                     RENT FOR $4.99
                  </button>
               </div>
            </div>
         </div>

         {/* Info Column */}
         <div className="lg:col-span-8 space-y-20">
            {/* Glassmorphism Container for Info */}
            <div className="p-10 md:p-16 rounded-[4rem] bg-zinc-900/40 backdrop-blur-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-150 transition-transform duration-1000">
                  <Layers className="w-64 h-64 text-white" />
               </div>
               
               <div className="relative z-10 space-y-12">
                  <div>
                     <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-4 uppercase tracking-tighter">
                        <Info className="w-8 h-8 text-indigo-400" />
                        Cinematic Narrative
                     </h2>
                     <p className="text-2xl text-zinc-300 leading-relaxed font-light antialiased first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-indigo-500">
                        {movie.overview}
                     </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-12 pt-12 border-t border-white/10">
                     <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-2">Director</label>
                        <p className="text-xl font-bold text-white tracking-tight">{movie.credits?.crew?.find((p: any) => p.job === "Director")?.name || "REDACTED"}</p>
                     </div>
                     <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-2">Production</label>
                        <p className="text-xl font-bold text-white tracking-tight">{movie.production_companies?.[0]?.name || "N/A"}</p>
                     </div>
                     <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-2">Original Language</label>
                        <p className="text-xl font-bold text-white tracking-tight">{movie.original_language?.toUpperCase()}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Ad Slot in Middle */}
            <div className="my-16">
               <AdSlot label="Recommended Experience" />
            </div>

            {/* Cast Section */}
            <div>
               <div className="flex items-center gap-4 mb-12">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                     <User className="w-6 h-6" />
                  </div>
                  <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Elite Cast</h2>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {movie.credits?.cast?.slice(0, 8).map((actor: any) => (
                     <div key={actor.id} className="group relative flex flex-col gap-4">
                        <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900">
                           {actor.profile_path ? (
                              <Image
                                 src={getImageUrl(actor.profile_path, "w185")}
                                 alt={actor.name}
                                 fill
                                 className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                              />
                           ) : (
                              <div className="w-full h-full flex items-center justify-center text-zinc-700 italic">No Portait</div>
                           )}
                           <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                        </div>
                        <div className="px-2">
                           <h4 className="text-white font-black flex items-center gap-2 group-hover:text-indigo-400 transition-colors">
                              {actor.name}
                           </h4>
                           <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">{actor.character}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Related Section */}
            <div>
               <div className="flex items-center gap-4 mb-12">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                     <Film className="w-6 h-6" />
                  </div>
                  <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Similar Journeys</h2>
               </div>
               
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 gap-y-12">
                  {movie.recommendations?.results?.slice(0, 6).map((rec: any) => (
                      <MovieCard key={rec.id} movie={rec} />
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MovieDetail;

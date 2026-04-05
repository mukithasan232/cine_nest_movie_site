import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { Star, Clock, Calendar, Globe, Play, ChevronLeft, CreditCard, Film, Info, User, Layers } from "lucide-react";
import { getMovieDetails, getMovieCast, getImageUrl } from "@/lib/tmdb";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  return {
    title: `${movie?.title || "Movie Details"} | CoderNest Cinema`,
    description: movie?.overview ? `${movie.overview.substring(0, 155)}...` : "Explore movie details on CoderNest Cinema.",
  };
}

const MovieDetail = async ({ params }: PageProps) => {
  const { id } = await params;

  // Graceful redirect for old static mock links that users might be currently refreshing
  if (id === "1") {
    const { redirect } = await import("next/navigation");
    redirect("/movies/157336");
  }

  const [movie, castData] = await Promise.all([
    getMovieDetails(id),
    getMovieCast(id),
  ]);

  if (!movie) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Movie Not Found</div>;
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, "original");
  const posterUrl = getImageUrl(movie.poster_path, "w500");
  const releaseYear = movie.release_date?.split("-")[0] || "Unknown";
  const rating = movie.vote_average?.toFixed(1) || "N/A";
  const cast = castData?.cast?.slice(0, 8) || [];

  return (
    <article className="min-h-screen bg-zinc-950 pb-32 overflow-x-hidden selection:bg-cinema-red selection:text-white">
      {/* Immersive Backdrop Section */}
      <section className="relative w-full h-[75vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src={backdropUrl}
            alt={movie.title || "Movie Backdrop"}
            fill
            className="object-cover opacity-30 animate-pulse duration-[10s]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px] z-0" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pb-20">
           <div className="max-w-4xl">
              <div className="flex items-center gap-5 mb-10">
                 <Link
                    href="/"
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-110 shadow-2xl"
                 >
                    <ChevronLeft className="w-5 h-5 text-white" />
                 </Link>
                 <div className="px-5 py-2 rounded-xl bg-cinema-red/20 border border-cinema-red/30 text-cinema-red text-xs font-black tracking-widest uppercase">
                    FEATURED FILM
                 </div>
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-white mb-10 leading-[0.9] tracking-tighter">
                 {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-12 text-zinc-500 mb-12 font-black tracking-widest text-[10px] uppercase">
                 <div className="flex items-center gap-4">
                    <Star className="w-6 h-6 fill-cinema-red text-cinema-red" />
                    <span className="text-white text-2xl font-black tracking-tight">{rating}</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <Calendar className="w-6 h-6" />
                    <span className="text-white/80">{releaseYear} RELEASE</span>
                 </div>
                 <div className="flex items-center gap-4 flex-wrap">
                    {movie.genres?.map((genre: any) => (
                       <span key={genre.id} className="px-4 py-1 rounded-lg bg-zinc-900 border border-white/5 text-cinema-red">
                          {genre.name}
                       </span>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Detail Content Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 -mt-32 relative z-30">
         {/* Sidebar Poster */}
         <aside className="hidden lg:block lg:col-span-4 space-y-10">
            <div className="relative aspect-[2/3] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group cursor-pointer shadow-cinema-red/10">
               <Image src={posterUrl} alt={movie.title || "Movie Poster"} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-cinema-red/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-8 rounded-[2.5rem] bg-white text-black font-black flex items-center gap-4 shadow-2xl">
                     <Film className="w-7 h-7" />
                     WATCH TRAILER
                  </div>
               </div>
            </div>
            
            <div className="p-12 rounded-[3.5rem] border border-cinema-red/10 bg-cinema-red/5 backdrop-blur-3xl space-y-10">
               <h3 className="text-2xl font-black text-white tracking-tighter">Availability Status</h3>
               <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  Seamlessly explore details and reviews for this cinematic title on CoderNest Cinema Global Hub.
               </p>
               <button className="w-full py-6 rounded-2xl bg-cinema-red hover:bg-neutral-100 hover:text-black text-white font-black transition-all shadow-2xl shadow-cinema-red/30 flex items-center justify-center gap-4">
                  <Play className="w-6 h-6 fill-current" />
                  EXPLORE DETAILS
               </button>
            </div>
         </aside>

         {/* Overview Column */}
         <section className="lg:col-span-8 space-y-20">
            <div className="p-12 md:p-20 rounded-[4rem] bg-zinc-900/40 backdrop-blur-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <Layers className="w-72 h-72 text-white" />
               </div>
               
               <div className="relative z-10 space-y-16">
                  <div className="space-y-8">
                     <h2 className="text-4xl font-black text-white flex items-center gap-5 tracking-tighter uppercase">
                        <Info className="w-10 h-10 text-cinema-red" />
                        Film Narrative
                     </h2>
                     <p className="text-2xl text-zinc-300 leading-relaxed font-light antialiased selection:bg-cinema-red selection:text-white first-letter:text-8xl first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:text-cinema-red">
                        {movie.overview}
                     </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-16 border-t border-white/10">
                     <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 block mb-3">Principal Director</label>
                        <p className="text-xl font-bold text-white tracking-tight">{movie.production_companies?.[0]?.name || "CoderNest Records"}</p>
                     </div>
                     <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 block mb-3">Studio Source</label>
                        <p className="text-xl font-bold text-white tracking-tight">{movie.original_language?.toUpperCase()} ORIGIN</p>
                     </div>
                  </div>
               </div>
            </div>

            <AdSlot label="Related Releases" />

            {/* Cast Section */}
            <section>
               <div className="flex items-center gap-5 mb-14">
                  <div className="p-4 rounded-2xl bg-cinema-red/10 border border-cinema-red/20 text-cinema-red">
                     <User className="w-8 h-8" />
                  </div>
                  <h2 className="text-5xl font-black text-white tracking-tighter uppercase underline decoration-cinema-red/20 decoration-8 underline-offset-[12px]">Elite Cast</h2>
               </div>
               
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {cast.map((actor: any) => (
                     <div key={actor.id} className="group relative flex flex-col gap-5">
                        <div className="relative aspect-square rounded-[2.5rem] overflow-hidden border-2 border-white/5 bg-zinc-900 shadow-2xl group-hover:border-cinema-red/30 transition-all duration-500">
                           {actor.profile_path ? (
                              <Image
                                 src={getImageUrl(actor.profile_path, "w185")}
                                 alt={actor.name || "Actor Portrait"}
                                 fill
                                 className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                              />
                           ) : (
                              <div className="w-full h-full flex items-center justify-center text-zinc-700 italic">Portrait Missing</div>
                           )}
                           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        </div>
                        <div className="px-2">
                           <h4 className="text-lg text-white font-black group-hover:text-cinema-red transition-colors">
                              {actor.name}
                           </h4>
                           <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1">{actor.character}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </section>
         </section>
      </section>
    </article>
  );
};

export default MovieDetail;

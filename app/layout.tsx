import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AdSlot from "@/components/AdSlot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CineNest | High-End Movie Information & Reviews",
    template: "%s | CineNest"
  },
  description: "Experience cinema in 4K with CineNest. High-end movie information, expert reviews, and real-time TMDB trending insights.",
  keywords: ["movies", "movie reviews", "tmdb", "trending films", "upcoming movies", "cinenest", "cinematic dark UI"],
  authors: [{ name: "CineNest Architecture Team" }],
  openGraph: {
    title: "CineNest",
    description: "Your Next Cinematic Journey Begins Here.",
    url: "https://cinenest-movie-engine.vercel.app",
    siteName: "CineNest",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CineNest",
    description: "Discover the magic of cinema in a beautiful dark interface.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="bg-zinc-950 text-zinc-50 font-sans min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
        <Navbar />
        
        {/* Main Content */}
        <main className="flex-1 pt-20">
          {children}
        </main>

        <footer className="py-24 border-t border-white/5 bg-zinc-950/80 backdrop-blur-3xl relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
             <div className="space-y-8">
                <div className="flex items-center gap-3">
                   <div className="p-2.5 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-600/20">
                      <svg
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         strokeWidth="2.5"
                         stroke="currentColor"
                         className="w-8 h-8 text-white"
                      >
                         <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                         />
                      </svg>
                   </div>
                   <span className="text-3xl font-black tracking-tighter text-white">CINENEST</span>
                </div>
                <p className="text-zinc-500 text-lg leading-relaxed font-light max-w-sm">
                   Precision architecture for cinematic enthusiasts. Bridging the gap between data and human wonder.
                </p>
                <div className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] pt-8 border-t border-white/5">
                   &copy; {new Date().getFullYear()} CineNest Global Engine. V.4.8.2.3. All Cinematic Rights Reserved.
                </div>
             </div>

             <div className="space-y-8">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-6">FOOTER SPONSOR</h4>
                <AdSlot label="Global Network Ad" />
             </div>
          </div>

          {/* Decor */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_0%,rgba(168,85,247,0.05)_0%,transparent_50%)]" />
        </footer>
      </body>
    </html>
  );
}

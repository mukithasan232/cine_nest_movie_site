"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Film, Menu, X, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Trending", href: "/" },
    { label: "Movies", href: "/movies" },
    { label: "TV Shows", href: "/tv" },
    { label: "Genres", href: "#" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform px-6 py-4",
        isScrolled
          ? "bg-zinc-950/80 backdrop-blur-3xl border-b border-white/5 py-3 shadow-2xl"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 group"
        >
          <div className="bg-cinema-red p-2.5 rounded-2xl shadow-xl shadow-cinema-red/20 group-hover:shadow-cinema-red/40 transition-shadow">
            <Film className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
             <span className="text-xl font-black tracking-tighter text-white leading-none">
                CODERNEST
             </span>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cinema-red leading-none mt-1">
                CINEMA
             </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-zinc-400 hover:text-white transition-colors font-black uppercase tracking-[0.2em] text-[11px]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-2.5 hover:bg-white/10 transition-colors group w-80">
          <Search className="w-5 h-5 text-zinc-500 group-focus-within:text-cinema-red transition-colors" />
          <input
            type="text"
            placeholder="Search our database..."
            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-zinc-600 w-full font-medium"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-zinc-950 backdrop-blur-3xl border-b border-white/5 p-8 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white text-3xl font-black tracking-tighter uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Popcorn, Film, Tv, TrendingUp, Menu, X } from "lucide-react";
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
    { label: "Trending", href: "/", icon: TrendingUp },
    { label: "Movies", href: "/movies", icon: Film },
    { label: "TV Shows", href: "/tv", icon: Tv },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform px-6 py-4",
        isScrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95"
        >
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
            <Popcorn className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white bg-clip-text">
            CineNest
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white/80 hover:text-white transition-colors flex items-center gap-2 font-medium group"
            >
              <link.icon className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-colors cursor-pointer group w-64 lg:w-80">
          <Search className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          <input
            type="text"
            placeholder="Search movies, shows..."
            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/40 w-full"
          />
          <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-white/20 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-white/40 opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
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
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white text-lg flex items-center gap-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <Search className="w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-white w-full"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

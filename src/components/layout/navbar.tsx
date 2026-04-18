"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "glass-panel py-3" : "bg-transparent py-5"
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-900 tracking-tight">
          Annisa<span className="text-blue-500">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#about" className="hover:text-blue-600 transition-colors">About</Link>
          <Link href="#experience" className="hover:text-blue-600 transition-colors">Experience</Link>
          <Link href="#contact" className="px-5 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-md">
            Hubungi Saya
          </Link>
        </div>
      </div>
    </nav>
  );
}
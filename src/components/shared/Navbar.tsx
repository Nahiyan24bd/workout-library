"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/logo.png";

interface NavbarProps {
  planCount?: number;
  savedCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ planCount = 0, savedCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full bg-[#0a0a0a] border-b border-zinc-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative w-7 h-7 flex items-center justify-center">
            <Image
              src={logoImg}
              alt="FITLOG Logo"
              width={28}
              height={28}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-extrabold tracking-wider uppercase">
            FITLOG
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
              isActive("/") || isActive("/workouts")
                ? "bg-[#1c2e0b] text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
              isActive("/my-plan")
                ? "bg-[#1c2e0b] text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Badges linking to /my-plan */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Plan Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-zinc-300 text-xs sm:text-sm">Plan</span>
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#ccff00] text-black font-extrabold text-[11px] sm:text-xs flex items-center justify-center">
              {planCount}
            </span>
          </Link>

          {/* Saved Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-zinc-300 text-xs sm:text-sm">Saved</span>
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-zinc-700 text-zinc-300 font-semibold text-[11px] sm:text-xs flex items-center justify-center">
              {savedCount}
            </span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ml-1"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0e0e0e] border-b border-zinc-800 px-4 pt-2 pb-4 space-y-2">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2 rounded-lg text-sm font-medium ${
              isActive("/") || isActive("/workouts")
                ? "bg-[#1c2e0b] text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2 rounded-lg text-sm font-medium ${
              isActive("/my-plan")
                ? "bg-[#1c2e0b] text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-zinc-900 py-6 sm:py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand Logo + FITLOG */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <Image
              src={logoImg}
              alt="FITLOG Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="text-base font-black tracking-wider uppercase text-white font-sans">
            FITLOG
          </span>
        </Link>

        {/* Right: Copyright Line */}
        <p className="text-xs sm:text-sm text-zinc-500 font-medium text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
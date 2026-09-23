import React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import bannerImg from "@/assets/banner.png";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      {/* Figma Card Container */}
      <div className="bg-[#121418] border border-zinc-800/80 rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        
        {/* Left Column: Text & CTA */}
        <div className="flex-1 space-y-6 text-left">
          {/* Eyebrow */}
          <span className="text-[#ccff00] text-xs sm:text-sm font-bold tracking-widest uppercase">
            WORKOUT LIBRARY
          </span>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.1]">
            TRAIN WITH INTENT. <br className="hidden sm:inline" />
            LOG EVERY SET.
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
            today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* CTA Button */}
          <div className="pt-2">
            <a
              href="#library"
              className="inline-flex items-center justify-center gap-2 bg-[#ccff00] text-black font-extrabold text-sm sm:text-base px-6 py-3 rounded-xl hover:bg-[#b8e600] active:scale-95 transition-all shadow-md"
            >
              BROWSE WORKOUTS
              <ArrowDown size={18} strokeWidth={2.5} />
            </a>
          </div>
        </div>

        {/* Right Column: Hero Image */}
        <div className="flex-1 flex justify-center items-center relative w-full max-w-md lg:max-w-none">
          <div className="relative w-72 sm:w-80 lg:w-[420px] aspect-square">
            <Image
              src={bannerImg}
              alt="Workout Machine Anatomy Banner"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
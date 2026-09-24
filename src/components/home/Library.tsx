"use client";

import React, { useState } from "react";
import WorkoutCard from "./WorkoutCard";
import { Workout } from "@/types/workout";

const CATEGORIES = ["ALL", "CHEST", "BACK", "ARMS", "LEGS", "CORE"];

export default function Library({ workouts }: { workouts: Workout[] }) {
  const [activeCategory, setActiveCategory] = useState("ALL");

  // ক্যাটাগরি অনুযায়ী ফিল্টারিং লজিক
  const filteredWorkouts =
    activeCategory === "ALL"
      ? workouts
      : workouts.filter((workout) =>
          workout.muscleGroups?.some(
            (muscle) => muscle.toUpperCase() === activeCategory
          )
        );

  return (
    <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Heading & Subtitle */}
      <div className="space-y-2 mb-8">
        <span className="text-xs font-black uppercase text-[#ccff00] tracking-widest">
          EXPLORE EXERCISES
        </span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
          THE LIBRARY
        </h2>
        <p className="text-sm sm:text-base text-zinc-400">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* NEW: Muscle Group Quick-Filter Pills */}
      <div className="flex flex-wrap items-center gap-2.5 mb-10">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/10 scale-105"
                  : "bg-[#121418] text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-white"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* 3x4 Responsive Grid */}
      {filteredWorkouts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-3xl">
          <p className="text-zinc-400 text-sm font-semibold">
            No workouts found for {activeCategory}.
          </p>
        </div>
      )}
    </section>
  );
}
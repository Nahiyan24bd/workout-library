"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Flame,
  Star,
  Check,
  X,
  ChevronDown,
  Loader2,
  Search,
  Timer,
} from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";
import { Workout } from "@/types/workout";
import WorkoutTimerModal from "@/components/shared/WorkoutTimerModal";

export default function MyPlanPage() {
  const {
    planList,
    savedList,
    isLoaded,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = useWorkout();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [activeTimerWorkout, setActiveTimerWorkout] = useState<Workout | null>(null);

  const currentList = activeTab === "plan" ? planList : savedList;

  // লাইভ মেট্রিক্স
  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((sum, item) => sum + (Number(item.duration) || 0), 0);
  const totalCalories = currentList.reduce((sum, item) => sum + (Number(item.caloriesBurned) || 0), 0);

  // Daily Goal (5 Lifts max)
  const planProgress = Math.min((planList.length / 5) * 100, 100);

  // সার্চ এবং সর্ট
  const filteredAndSortedWorkouts = [...currentList]
    .filter((workout) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      return (
        workout.name.toLowerCase().includes(query) ||
        workout.equipment?.toLowerCase().includes(query) ||
        workout.muscleGroups?.some((group) => group.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => {
      if (sortBy === "duration") return (Number(b.duration) || 0) - (Number(a.duration) || 0);
      if (sortBy === "calories") return (Number(b.caloriesBurned) || 0) - (Number(a.caloriesBurned) || 0);
      if (sortBy === "rating") return (parseFloat(String(b.rating)) || 0) - (parseFloat(String(a.rating)) || 0);
      return 0;
    });

  if (!isLoaded) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 text-zinc-400">
        <Loader2 className="animate-spin text-[#ccff00]" size={32} />
        <p className="text-sm tracking-wide">Loading workouts…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-1 text-left">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans">
            MY PLAN
          </h1>
          <p className="text-sm text-zinc-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Dynamic Metrics Summary */}
        <div className="bg-[#121418] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="text-xs sm:text-sm font-semibold text-zinc-400">Exercises</span>
              <div className="text-3xl sm:text-5xl font-black text-[#ccff00] mt-2">
                {totalExercises}
              </div>
            </div>
            <div>
              <span className="text-xs sm:text-sm font-semibold text-zinc-400">Minutes</span>
              <div className="text-3xl sm:text-5xl font-black text-white mt-2">
                {totalMinutes}
              </div>
            </div>
            <div>
              <span className="text-xs sm:text-sm font-semibold text-zinc-400">Calories</span>
              <div className="text-3xl sm:text-5xl font-black text-white mt-2">
                {totalCalories}
              </div>
            </div>
          </div>

          {/* NEW FEATURE: Daily Target Progress Bar */}
          <div className="border-t border-zinc-800/60 pt-4 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-zinc-400">
              <span>Today&apos;s Training Capacity</span>
              <span className="text-white font-bold">{planList.length} / 5 Lifts</span>
            </div>
            <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
              <div
                className="h-full bg-[#ccff00] transition-all duration-500 rounded-full"
                style={{ width: `${planProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Controls: Tabs, Search & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          {/* Tabs */}
          <div className="inline-flex bg-[#121418] border border-zinc-800/80 p-1 rounded-xl shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                activeTab === "plan"
                  ? "bg-[#1c222b] text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                activeTab === "saved"
                  ? "bg-[#1c222b] text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Search Box & Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search plan or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121418] border border-zinc-800 text-white text-xs font-semibold py-2 pl-9 pr-3 rounded-lg focus:outline-none focus:border-[#ccff00] transition-colors placeholder:text-zinc-600"
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <span className="text-xs">Sort By</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "duration" | "calories" | "rating")}
                  className="appearance-none bg-[#121418] border border-zinc-800 text-white text-xs font-semibold py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:border-zinc-500 cursor-pointer"
                >
                  <option value="duration">Duration</option>
                  <option value="calories">Calories</option>
                  <option value="rating">Rating</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Workout Cards */}
        {filteredAndSortedWorkouts.length > 0 ? (
          <div className="space-y-4">
            {filteredAndSortedWorkouts.map((workout: Workout) => (
              <div
                key={workout.id}
                className="bg-[#121418] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-zinc-700 transition-colors"
              >
                {/* Thumbnail & Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-zinc-900 shrink-0">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-black tracking-wide text-white uppercase font-sans">
                      {workout.name}
                    </h3>
                    <p className="text-xs text-zinc-400">{workout.equipment}</p>
                    
                    {/* Stats Icons */}
                    <div className="flex items-center gap-4 text-xs font-semibold text-zinc-300 pt-0.5">
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} className="text-[#ccff00]" /> {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Flame size={14} className="text-[#ccff00] fill-[#ccff00]" /> {workout.caloriesBurned} kcal
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Star size={14} className="text-[#ccff00] fill-[#ccff00]" /> {workout.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0 pt-2 md:pt-0">
                  {/* NEW: Start Timer Button */}
                  <button
                    type="button"
                    onClick={() => setActiveTimerWorkout(workout)}
                    className="p-2.5 bg-zinc-900 border border-zinc-700/80 hover:border-[#ccff00] text-zinc-300 hover:text-[#ccff00] text-xs font-bold rounded-xl transition-all"
                    title="Start Live Workout Timer"
                  >
                    <Timer size={16} />
                  </button>

                  <Link
                    href={`/workouts/${workout.id}`}
                    className="px-4 py-2 bg-[#181a20] border border-zinc-700/80 hover:border-zinc-500 text-zinc-200 text-xs font-bold rounded-xl transition-all"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      type="button"
                      onClick={() => markAsDone(workout)}
                      className="inline-flex items-center gap-1.5 bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-black px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      <Check size={14} strokeWidth={3} />
                      Mark as Done
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(workout.id)
                        : removeFromSaved(workout.id)
                    }
                    aria-label="Remove workout"
                    className="p-2 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="border border-dashed border-zinc-800/80 rounded-3xl py-20 px-6 text-center space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase">
              {searchQuery ? "NO RESULTS FOUND" : "NOTHING HERE YET"}
            </h2>
            <p className="text-sm text-zinc-400 max-w-md mx-auto">
              {searchQuery
                ? `No workouts found matching "${searchQuery}". Try another keyword.`
                : "Browse the library and add a lift to get today moving."}
            </p>
            {!searchQuery && (
              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center bg-[#ccff00] text-black font-extrabold text-sm px-6 py-2.5 rounded-xl hover:bg-[#b8e600] transition-all shadow-md"
                >
                  Go to workouts
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Live Timer Modal */}
        <WorkoutTimerModal
          isOpen={!!activeTimerWorkout}
          onClose={() => setActiveTimerWorkout(null)}
          workoutName={activeTimerWorkout?.name || ""}
          durationMinutes={Number(activeTimerWorkout?.duration) || 10}
        />

      </div>
    </div>
  );
}
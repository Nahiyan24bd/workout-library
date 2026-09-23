"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Check, X, ChevronDown, Loader2 } from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";
import { Workout } from "@/types/workout";

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

  // ১. বর্তমান সক্রিয় ট্যাবের লিস্ট নির্বাচন
  const currentList = activeTab === "plan" ? planList : savedList;

  // ২. লাইভ মেট্রিক্স হিসেব (বর্তমান অ্যাক্টিভ ট্যাব অনুযায়ী)
  const totalExercises = currentList.length;
  
  const totalMinutes = currentList.reduce((sum, item) => {
    const mins = Number(item.duration) || 0;
    return sum + mins;
  }, 0);

  const totalCalories = currentList.reduce((sum, item) => {
    const cal = Number(item.caloriesBurned) || 0;
    return sum + cal;
  }, 0);

  // ৩. সর্টিং লজিক (সরাসরি নতুন অ্যারে তৈরি করে সর্ট করা)
  const sortedWorkouts = [...currentList].sort((a, b) => {
    if (sortBy === "duration") {
      const durA = Number(a.duration) || 0;
      const durB = Number(b.duration) || 0;
      return durB - durA; // বড় থেকে ছোট
    }
    if (sortBy === "calories") {
      const calA = Number(a.caloriesBurned) || 0;
      const calB = Number(b.caloriesBurned) || 0;
      return calB - calA; // বড় থেকে ছোট
    }
    if (sortBy === "rating") {
      const ratA = parseFloat(String(a.rating)) || 0;
      const ratB = parseFloat(String(b.rating)) || 0;
      return ratB - ratA; // সর্বোচ্চ রেটিং আগে
    }
    return 0;
  });

  // Loading State
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

        {/* Dynamic Metrics Summary (ট্যাব পাল্টালে সাথে সাথে পাল্টাবে) */}
        <div className="bg-[#121418] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 grid grid-cols-3 gap-4">
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

        {/* Tabs & Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          {/* Tabs */}
          <div className="inline-flex bg-[#121418] border border-zinc-800/80 p-1 rounded-xl">
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

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-sm text-zinc-400 self-end sm:self-auto">
            <span>Sort By</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "duration" | "calories" | "rating")
                }
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

        {/* Workout Cards List বা Empty State */}
        {sortedWorkouts.length > 0 ? (
          <div className="space-y-4">
            {sortedWorkouts.map((workout: Workout) => (
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
                    
                    {/* Inline Stats with Figma Neon-Green Icons */}
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
                <div className="flex items-center gap-3 self-end md:self-auto shrink-0 pt-2 md:pt-0">
                  {/* View Details Button */}
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="px-4 py-2 bg-[#181a20] border border-zinc-700/80 hover:border-zinc-500 text-zinc-200 text-xs font-bold rounded-xl transition-all"
                  >
                    View Details
                  </Link>

                  {/* Mark as Done (শুধু Today's Plan-এ থাকবে) */}
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

                  {/* Remove Button (X) */}
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
              NOTHING HERE YET
            </h2>
            <p className="text-sm text-zinc-400 max-w-md mx-auto">
              Browse the library and add a lift to get today moving.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-[#ccff00] text-black font-extrabold text-sm px-6 py-2.5 rounded-xl hover:bg-[#b8e600] transition-all shadow-md"
              >
                Go to workouts
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
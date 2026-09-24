"use client";

import React from "react";
import { CalendarPlus, Bookmark } from "lucide-react";
import { Workout } from "@/types/workout";
import { useWorkout } from "@/context/WorkoutContext";

export default function DetailActions({ workout }: { workout: Workout }) {
  const { planList, savedList, addToPlan, saveForLater } = useWorkout();

  const isPlanFull = planList.length >= 5;
  const isAlreadyInPlan = planList.some((item) => item.id === workout.id);
  const isAlreadySaved = savedList.some((item) => item.id === workout.id);

  return (
    <div className="flex flex-wrap gap-4 pt-4">
      {/* Primary: Add to today's plan */}
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={isPlanFull || isAlreadyInPlan}
        className={`inline-flex items-center gap-2 font-extrabold text-sm sm:text-base px-6 py-3 rounded-xl transition-all shadow-md ${
          isPlanFull || isAlreadyInPlan
            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50"
            : "bg-[#ccff00] text-black hover:bg-[#b8e600] active:scale-95 cursor-pointer"
        }`}
      >
        <CalendarPlus size={18} strokeWidth={2.5} />
        {isAlreadyInPlan
          ? "In Today's Plan"
          : isPlanFull
          ? "Plan Full (Max 5)"
          : "Add to today's plan"}
      </button>

      {/* Secondary: Save for later */}
      <button
        type="button"
        onClick={() => saveForLater(workout)}
        disabled={isAlreadySaved}
        className={`inline-flex items-center gap-2 border text-sm sm:text-base px-6 py-3 rounded-xl transition-all ${
          isAlreadySaved
            ? "bg-zinc-900 border-zinc-800 text-zinc-500 cursor-not-allowed"
            : "bg-[#121418] border-zinc-700 text-zinc-200 font-bold hover:border-zinc-500 hover:text-white active:scale-95 cursor-pointer"
        }`}
      >
        <Bookmark size={18} />
        {isAlreadySaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
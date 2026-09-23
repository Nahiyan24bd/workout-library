"use client";

import React from "react";
import { CalendarPlus, Bookmark } from "lucide-react";
import { Workout } from "@/types/workout";
import { useWorkout } from "@/context/WorkoutContext";

export default function DetailActions({ workout }: { workout: Workout }) {
  const { addToPlan, saveForLater } = useWorkout();

  return (
    <div className="flex flex-wrap gap-4 pt-4">
      {/* Primary: Add to today's plan */}
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-extrabold text-sm sm:text-base px-6 py-3 rounded-xl hover:bg-[#b8e600] active:scale-95 transition-all shadow-md cursor-pointer"
      >
        <CalendarPlus size={18} strokeWidth={2.5} />
        Add to today&apos;s plan
      </button>

      {/* Secondary: Save for later */}
      <button
        type="button"
        onClick={() => saveForLater(workout)}
        className="inline-flex items-center gap-2 bg-[#121418] border border-zinc-700 text-zinc-200 font-bold text-sm sm:text-base px-6 py-3 rounded-xl hover:border-zinc-500 hover:text-white active:scale-95 transition-all cursor-pointer"
      >
        <Bookmark size={18} />
        Save for later
      </button>
    </div>
  );
}
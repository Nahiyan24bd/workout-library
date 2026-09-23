import React from "react";
import WorkoutCard from "./WorkoutCard";
import { Workout } from "@/types/workout";

// API থেকে ডেটা ফেচ করার সাধারণ ফাংশন
async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 3600 }, // ক্যাশিং অপ্টিমাইজেশন
    });

    if (!res.ok) {
      throw new Error("Failed to fetch workouts data");
    }

    const json = await res.json();
    // যদি API থেকে সরাসরি অ্যারে আসে অথবা { data: [...] } আকারে আসে
    return Array.isArray(json) ? json : json.data || [];
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
}

const Library = async () => {
  const workouts = await getWorkouts();

  return (
    <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8 space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
          THE LIBRARY
        </h2>
        <p className="text-sm sm:text-base text-zinc-400">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* 3x4 Grid on Large Screens & Responsive for Mobile/Tablet */}
      {workouts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-[#121418] border border-zinc-800 rounded-2xl text-zinc-400 text-sm">
          No workouts available at the moment. Please try again later.
        </div>
      )}
    </section>
  );
};

export default Library;
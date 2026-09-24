import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import Library from "@/components/home/Library";
import { Workout } from "@/types/workout";

// Loading Skeleton Animation
function LibrarySkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="h-4 w-32 bg-zinc-800/60 rounded animate-pulse mb-2" />
      <div className="h-9 w-48 bg-zinc-800/80 rounded animate-pulse mb-2" />
      <div className="h-4 w-72 bg-zinc-800/40 rounded animate-pulse mb-8" />

      {/* Filter Pills Skeleton */}
      <div className="flex flex-wrap gap-2.5 mb-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 bg-zinc-800/60 rounded-xl animate-pulse"
          />
        ))}
      </div>

      {/* 3x4 Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-[#121418] border border-zinc-800/80 rounded-2xl overflow-hidden animate-pulse"
          >
            <div className="h-52 bg-zinc-800/50 w-full" />
            <div className="p-5 space-y-4">
              <div className="h-5 w-20 bg-zinc-800 rounded-full" />
              <div className="h-6 w-3/4 bg-zinc-800 rounded" />
              <div className="h-4 w-1/2 bg-zinc-800 rounded" />
              <div className="border-t border-zinc-800/80 pt-3 flex justify-between">
                <div className="h-4 w-14 bg-zinc-800 rounded" />
                <div className="h-4 w-14 bg-zinc-800 rounded" />
                <div className="h-4 w-10 bg-zinc-800 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// API Fetching & Async Container
async function LibraryContainer() {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const workouts: Workout[] = await res.json();
  return <Library workouts={workouts} />;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Hero />
      <Suspense fallback={<LibrarySkeleton />}>
        <LibraryContainer />
      </Suspense>
    </main>
  );
}
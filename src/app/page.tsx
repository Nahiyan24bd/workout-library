import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import Library from "@/components/home/Library";

function LibrarySkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="h-8 w-48 bg-zinc-800/60 rounded-md animate-pulse mb-3" />
      <div className="h-4 w-72 bg-zinc-800/40 rounded-md animate-pulse mb-8" />
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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Hero />
      <Suspense fallback={<LibrarySkeleton />}>
        <Library />
      </Suspense>
    </div>
  );
}
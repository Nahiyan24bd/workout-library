import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Workout } from "@/types/workout";
import DetailActions from "@/components/details/DetailActions";

// নির্দিষ্ট ওয়ার্কআউটের ডাটা ফেচ করার ফাংশন
async function getWorkoutDetails(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching workout details:", error);
    return null;
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const workout = await getWorkoutDetails(resolvedParams.id);

  if (!workout) {
    notFound();
  }

  // Key specs টেবিলের ডেটা অ্যারে
  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-[#ccff00] transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Library
          </Link>
        </div>

        {/* Main Two-Column Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Visual/Media */}
          <div className="lg:col-span-5 w-full">
            <div className="relative w-full aspect-4/5 bg-[#121418] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Side: Information & Action Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title & Description */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase font-sans">
                {workout.name}
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                {workout.description}
              </p>
            </div>

            {/* Category Tag Pills */}
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups?.map((group, index) => (
                <span
                  key={index}
                  className="px-3.5 py-1 rounded-full bg-[#ccff00] text-black text-xs font-black tracking-wide uppercase"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Key Specs Table Panel */}
            <div className="bg-[#121418] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-zinc-800/50 last:border-0"
                >
                  <span className="text-zinc-500 font-bold uppercase tracking-wider">
                    {spec.label}
                  </span>
                  <span className="text-zinc-200 font-semibold">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Instructions Section */}
            <div className="space-y-3 pt-2">
              <h2 className="text-lg font-black uppercase tracking-wider text-white">
                INSTRUCTIONS
              </h2>
              <ol className="space-y-2 text-zinc-400 text-sm sm:text-base">
                {workout.instructions?.map((step, index) => (
                  <li key={index} className="flex gap-2.5">
                    <span className="text-zinc-500 font-bold">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Client Buttons: Add to today's plan & Save for later */}
            <DetailActions workout={workout} />

          </div>

        </div>
      </div>
    </div>
  );
}
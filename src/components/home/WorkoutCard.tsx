import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

interface WorkoutCardProps {
  workout: {
    id: number | string;
    name: string;
    image: string;
    muscleGroups: string[];
    equipment: string;
    duration: number;
    caloriesBurned: number;
    rating: number;
  };
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block bg-[#13151b] border border-[#222630] rounded-2xl overflow-hidden hover:border-[#383e4e] transition-all duration-300 shadow-md"
    >
      {/* 1. Workout Image */}
      <div className="relative w-full h-52 bg-zinc-900 overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* 2. Body Details */}
      <div className="p-5 space-y-4">
        {/* Category Pills (CHEST, ARMS) */}
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups?.map((group, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-[#ccff00] text-black text-[11px] font-black tracking-wide uppercase"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Workout Name & Equipment */}
        <div>
          <h3 className="text-xl font-black tracking-wide text-white uppercase font-sans line-clamp-1">
            {workout.name}
          </h3>
          <p className="text-sm text-zinc-400 mt-1 line-clamp-1">
            {workout.equipment}
          </p>
        </div>

        {/* Bottom Stats Divider */}
        <div className="border-t border-[#222630] pt-3.5 flex items-center justify-between text-zinc-400 text-xs font-semibold">
          {/* Duration */}
          <div className="flex items-center gap-1.5">
            <Clock size={15} className="text-zinc-400" />
            <span>{workout.duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-1.5">
            <Flame size={15} className="text-zinc-400" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star size={15} className="text-zinc-400 fill-zinc-400/20" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
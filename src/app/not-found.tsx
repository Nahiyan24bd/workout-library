import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-[#161922] border border-[#232734] flex items-center justify-center text-[#ccff00] mb-6 shadow-lg">
        <Dumbbell size={32} />
      </div>

      <span className="text-sm font-black text-[#ccff00] tracking-widest uppercase">
        404 ERROR
      </span>
      <h1 className="text-3xl sm:text-5xl font-black text-white uppercase mt-2 tracking-tight">
        Workout Not Found
      </h1>
      <p className="text-sm sm:text-base text-zinc-400 max-w-md mt-3 mb-8">
        The lift or page you are looking for does not exist or has been removed from the library.
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center bg-[#ccff00] text-black font-extrabold text-sm px-6 py-3 rounded-xl hover:bg-[#b8e600] active:scale-95 transition-all shadow-md"
      >
        Back to Home
      </Link>
    </div>
  );
}
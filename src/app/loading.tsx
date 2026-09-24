import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-zinc-400">
      <Loader2 className="animate-spin text-[#ccff00]" size={36} />
      <p className="text-sm tracking-wide font-medium">Loading exercises…</p>
    </div>
  );
}
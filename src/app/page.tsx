import Hero from "@/components/home/Hero";
import Library from "@/components/home/Library";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Hero />
      <Library />
    </div>
  );
}
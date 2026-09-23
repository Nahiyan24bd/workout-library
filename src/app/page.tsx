import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Hero />
      
      {/* এর পরের সেকশন যাতে #library আইডিতে স্ক্রল করতে পারে */}
      <section id="library" className="max-w-7xl mx-auto px-4 py-8">
        {/* Workout list component আসবে এখানে */}
      </section>
    </div>
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FITLOG - Workout Library",
  description: "Track and manage your daily workouts easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <WorkoutProvider>
          {/* টোস্ট নোটিফিকেশন কনটেইনার */}
          <Toaster position="top-right" />
          
          {/* গ্লোবাল নেভবার */}
          <Navbar />
          
          {/* পেজ কনটেন্ট */}
          <main className="flex-1">{children}</main>
        </WorkoutProvider>
      </body>
    </html>
  );
}
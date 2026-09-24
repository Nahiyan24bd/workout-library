"use client";

import React, { useState, useEffect } from "react";
import { X, Play, Pause, RotateCcw, Flame } from "lucide-react";

interface WorkoutTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutName: string;
  durationMinutes: number;
}

export default function WorkoutTimerModal({
  isOpen,
  onClose,
  workoutName,
  durationMinutes,
}: WorkoutTimerModalProps) {
  const initialSeconds = (durationMinutes || 10) * 60;
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  // মোডাল ওপেন বা ডিউরেশন পরিবর্তন হলে সেফলি রিসেট করা
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      setTimeLeft((durationMinutes || 10) * 60);
      setIsRunning(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [durationMinutes, isOpen]);

  // ইন্টারভাল টাইমার লজিক
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progressPercent = Math.max(
    0,
    ((initialSeconds - timeLeft) / initialSeconds) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-[#121418] border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full relative shadow-2xl text-center space-y-6">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white p-2"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div>
          <span className="text-[11px] font-black uppercase text-[#ccff00] tracking-widest">
            LIVE TRAINING TIMER
          </span>
          <h3 className="text-xl font-black uppercase text-white tracking-wide mt-1">
            {workoutName}
          </h3>
        </div>

        {/* Digital Counter */}
        <div className="relative py-4">
          <div className="text-5xl sm:text-6xl font-black tracking-widest text-white font-mono">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>

          {/* Progress Bar under time */}
          <div className="w-full bg-zinc-800/80 h-2 rounded-full overflow-hidden mt-6">
            <div
              className="bg-[#ccff00] h-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Timer Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold px-6 py-3 rounded-2xl active:scale-95 transition-all shadow-md cursor-pointer"
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
            {isRunning ? "Pause" : "Start"}
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(initialSeconds);
            }}
            className="p-3.5 bg-zinc-900 border border-zinc-700/80 hover:border-zinc-500 text-zinc-300 rounded-2xl active:scale-95 transition-all cursor-pointer"
            title="Reset"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        {timeLeft === 0 && (
          <p className="text-sm font-bold text-[#ccff00] flex items-center justify-center gap-1.5 animate-bounce">
            <Flame size={16} /> Workout Session Complete!
          </p>
        )}
      </div>
    </div>
  );
}
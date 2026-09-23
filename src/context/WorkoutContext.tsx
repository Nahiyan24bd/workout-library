"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types/workout";
import toast from "react-hot-toast";

interface WorkoutContextType {
  planList: Workout[];
  savedList: Workout[];
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [planList, setPlanList] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);

  // LocalStorage থেকে প্রাথমিক ডেটা লোড করা
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      if (storedPlan) setPlanList(JSON.parse(storedPlan));
      if (storedSaved) setSavedList(JSON.parse(storedSaved));
    } catch (e) {
      console.error("Failed to load workouts from localStorage", e);
    }
  }, []);

  // Today's Plan-এ যুক্ত করা
  const addToPlan = (workout: Workout) => {
    setPlanList((prev) => {
      const isExist = prev.some((item) => item.id === workout.id);
      if (isExist) {
        toast.error("Already added to today's plan!");
        return prev;
      }
      const updated = [...prev, workout];
      localStorage.setItem("fitlog_plan", JSON.stringify(updated));
      toast.success("Added to today's plan!", {
        style: { background: "#161922", color: "#ccff00", border: "1px solid #232734" },
      });
      return updated;
    });
  };

  // Saved for later-এ যুক্ত করা
  const saveForLater = (workout: Workout) => {
    setSavedList((prev) => {
      const isExist = prev.some((item) => item.id === workout.id);
      if (isExist) {
        toast.error("Already saved for later!");
        return prev;
      }
      const updated = [...prev, workout];
      localStorage.setItem("fitlog_saved", JSON.stringify(updated));
      toast.success("Saved for later!", {
        style: { background: "#161922", color: "#ffffff", border: "1px solid #232734" },
      });
      return updated;
    });
  };

  return (
    <WorkoutContext.Provider
      value={{ planList, savedList, addToPlan, saveForLater }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};
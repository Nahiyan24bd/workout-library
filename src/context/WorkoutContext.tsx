"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types/workout";
import toast from "react-hot-toast";

interface WorkoutContextType {
  planList: Workout[];
  savedList: Workout[];
  isLoaded: boolean;
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number | string) => void;
  saveForLater: (workout: Workout) => void;
  removeFromSaved: (id: number | string) => void;
  markAsDone: (workout: Workout) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [planList, setPlanList] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      if (storedPlan) setPlanList(JSON.parse(storedPlan));
      if (storedSaved) setSavedList(JSON.parse(storedSaved));
    } catch (e) {
      console.error("Failed to load workouts", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Today's Plan-এ যুক্ত করা
  const addToPlan = (workout: Workout) => {
    if (planList.length >= 5) {
      toast.error("Cap of 5 lifts reached for today!", { id: "plan-limit" });
      return;
    }
    if (planList.some((item) => item.id === workout.id)) {
      toast.error("Already added to today's plan!", { id: `exist-plan-${workout.id}` });
      return;
    }

    const updated = [...planList, workout];
    setPlanList(updated);
    localStorage.setItem("fitlog_plan", JSON.stringify(updated));
    toast.success("Added to today's plan!", {
      id: `add-plan-${workout.id}`,
      style: { background: "#161922", color: "#ccff00", border: "1px solid #232734" },
    });
  };

  // Plan থেকে রিমুভ করা
  const removeFromPlan = (id: number | string) => {
    const updated = planList.filter((item) => item.id !== id);
    setPlanList(updated);
    localStorage.setItem("fitlog_plan", JSON.stringify(updated));
    toast.success("Removed from today's plan!", {
      id: `remove-plan-${id}`,
      style: { background: "#161922", color: "#ffffff", border: "1px solid #232734" },
    });
  };

  // Saved-এ যুক্ত করা
  const saveForLater = (workout: Workout) => {
    if (savedList.some((item) => item.id === workout.id)) {
      toast.error("Already saved for later!", { id: `exist-saved-${workout.id}` });
      return;
    }

    const updated = [...savedList, workout];
    setSavedList(updated);
    localStorage.setItem("fitlog_saved", JSON.stringify(updated));
    toast.success("Saved for later!", {
      id: `add-saved-${workout.id}`,
      style: { background: "#161922", color: "#ffffff", border: "1px solid #232734" },
    });
  };

  // Saved থেকে রিমুভ করা
  const removeFromSaved = (id: number | string) => {
    const updated = savedList.filter((item) => item.id !== id);
    setSavedList(updated);
    localStorage.setItem("fitlog_saved", JSON.stringify(updated));
    toast.success("Removed from saved list!", {
      id: `remove-saved-${id}`,
      style: { background: "#161922", color: "#ffffff", border: "1px solid #232734" },
    });
  };

  // সম্পন্ন মার্ক করা
  const markAsDone = (workout: Workout) => {
    removeFromPlan(workout.id);
    toast.success(`Completed ${workout.name}! Great job! 🎉`, {
      id: `done-${workout.id}`,
      icon: "💪",
      style: { background: "#161922", color: "#ccff00", border: "1px solid #232734" },
    });
  };

  return (
    <WorkoutContext.Provider
      value={{
        planList,
        savedList,
        isLoaded,
        addToPlan,
        removeFromPlan,
        saveForLater,
        removeFromSaved,
        markAsDone,
      }}
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
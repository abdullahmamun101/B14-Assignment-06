"use client";

import { CalendarPlus, Bookmark } from "lucide-react";
import toast from "react-hot-toast";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";

export default function WorkoutActions({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved, isInPlan, isInSaved } = usePlan();

const handleAddToPlan = () => {
  if (isInPlan(workout.id)) {
    toast.error("Already in your plan");
    return;
  }
  const success = addToPlan(workout);
  if (success) {
    toast.success("Added to today's plan");
  } else {
    toast.error("Plan is full — remove a lift first");
  }
};

const handleSave = () => {
  if (isInSaved(workout.id)) {
    toast.error("Already in your saved list");
    return;
  }
  addToSaved(workout);
  toast.success("Saved for later");
};

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={handleAddToPlan}
        className="inline-flex h-9 items-center gap-2 rounded-full bg-[#ccff00] px-4 text-[11px] font-bold text-black transition hover:bg-[#b9eb00]"
      >
        <CalendarPlus className="h-4 w-4" />
        {isInPlan(workout.id) ? "In today's plan" : "Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={handleSave}
        className="inline-flex h-9 items-center gap-2 rounded-full border border-[#85878d] px-4 text-[11px] font-bold text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
      >
        <Bookmark className="h-4 w-4" />
        {isInSaved(workout.id) ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
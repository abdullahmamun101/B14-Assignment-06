"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Workout } from "@/types/workout";

const PLAN_LIMIT = 5;
const STORAGE_KEY = "fitlog-state-v1";

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  doneIds: number[];
  addToPlan: (workout: Workout) => boolean;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
  hydrated: boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
          // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load from localStorage on mount
        setPlan(parsed.plan ?? []);
        setSaved(parsed.saved ?? []);
        setDoneIds(parsed.doneIds ?? []);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ plan, saved, doneIds })
    );
  }, [plan, saved, doneIds, hydrated]);

  const isInPlan = (id: number) => plan.some((w) => w.id === id);
  const isInSaved = (id: number) => saved.some((w) => w.id === id);

  const addToPlan = (workout: Workout) => {
    if (isInPlan(workout.id)) return true;
    if (plan.length >= PLAN_LIMIT) return false;
    setPlan((prev) => [...prev, workout]);
    return true;
  };

  const addToSaved = (workout: Workout) => {
    if (isInSaved(workout.id)) return;
    setSaved((prev) => [...prev, workout]);
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    setDoneIds((prev) => prev.filter((d) => d !== id));
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  };

  const markAsDone = (id: number) => {
    setDoneIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        doneIds,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        isInPlan,
        isInSaved,
        hydrated,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}
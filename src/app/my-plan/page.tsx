"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { usePlan } from "@/context/PlanContext";
import PlanListCard from "@/app/components/PlanListCard";

type Tab = "plan" | "saved";
type SortKey = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    doneIds,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    hydrated,
  } = usePlan();

  const [tab, setTab] = useState<Tab>("plan");
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  const activeList = tab === "plan" ? plan : saved;

  const sortedList = useMemo(() => {
    const list = [...activeList];

    list.sort((a, b) => {
      if (sortKey === "duration") return a.duration - b.duration;
      if (sortKey === "calories") return a.caloriesBurned - b.caloriesBurned;
      return b.rating - a.rating;
    });

    return list;
  }, [activeList, sortKey]);

  const totals = useMemo(
    () => ({
      exercises: plan.length,
      minutes: plan.reduce((sum, w) => sum + w.duration, 0),
      calories: plan.reduce((sum, w) => sum + w.caloriesBurned, 0),
    }),
    [plan]
  );

  const handleRemove = (id: number) => {
    if (tab === "plan") {
      removeFromPlan(id);
      toast("Removed from plan");
    } else {
      removeFromSaved(id);
      toast("Removed from saved");
    }
  };

  const handleMarkDone = (id: number) => {
    markAsDone(id);
    toast.success("Marked as done");
  };

  return (
    <main className="bg-[#0d0f12] text-white">
      <div className="mx-auto max-w-245 px-5 py-10 md:px-0">

        {/* HEADER */}
        <h1 className="font-display text-5xl font-extrabold uppercase tracking-tight text-white">
          My Plan
        </h1>

        <p className="mt-2 text-base text-[#85878d]">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        {/* SUMMARY */}
        <div className="mt-8 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-[#1a1d23]">
          {[
            { label: "Exercises", value: totals.exercises },
            { label: "Minutes", value: totals.minutes },
            { label: "Calories", value: totals.calories },
          ].map((s) => (
            <div key={s.label} className="p-7">
              <p className="text-sm text-neutral-400">
                {s.label}
              </p>

              <p
                className={`mt-2 text-4xl font-bold ${
                  s.label === "Exercises"
                    ? "text-[#ccff00]"
                    : "text-white"
                }`}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* TABS + SORT */}
        <div className="mt-8 flex flex-wrap items-end justify-between gap-5">

          <div className="flex rounded-full border border-white/15 bg-[#1a1d23] p-1">
            {(["plan", "saved"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                  tab === t
                    ? "bg-white/10 text-[#ccff00]"
                    : "text-neutral-400"
                }`}
              >
                {t === "plan" ? "Today's Plan" : "Saved"}
              </button>
            ))}
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-neutral-400">
              Sort By
            </p>

            <select
              value={sortKey}
              onChange={(e) =>
                setSortKey(e.target.value as SortKey)
              }
              className="rounded-full border border-white/20 bg-[#1a1d23] px-5 py-2.5 text-sm font-semibold text-white outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* WORKOUT LIST */}
        <div className="mt-8 space-y-5">
          {!hydrated ? (
            <p className="py-16 text-center text-sm text-neutral-500">
              Loading workouts…
            </p>
          ) : sortedList.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-solid border-white/15 bg-[#1a1d23] py-16 text-center">
              <h3 className="text-lg font-bold uppercase text-white">
                Nothing Here Yet
              </h3>

              <p className="max-w-xs text-sm text-neutral-500">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/"
                className="mt-2 rounded-full bg-[#ccff00] px-5 py-2 text-xs font-bold text-black"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            sortedList.map((workout) => (
              <PlanListCard
                key={workout.id}
                workout={workout}
                done={
                  tab === "plan" &&
                  doneIds.includes(workout.id)
                }
                onMarkDone={
                  tab === "plan"
                    ? () => handleMarkDone(workout.id)
                    : undefined
                }
                onRemove={() => handleRemove(workout.id)}
              />
            ))
          )}
        </div>

      </div>
    </main>
  );
}
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
      if (sortKey === "duration") {
        return a.duration - b.duration;
      }

      if (sortKey === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }

      return b.rating - a.rating;
    });

    return list;
  }, [activeList, sortKey]);

  const totals = useMemo(
    () => ({
      exercises: plan.length,
      minutes: plan.reduce(
        (sum, workout) => sum + workout.duration,
        0
      ),
      calories: plan.reduce(
        (sum, workout) => sum + workout.caloriesBurned,
        0
      ),
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

      {/* CONTENT */}
      <div className="mx-auto max-w-245 px-5 pt-4 pb-8 md:px-0 md:pt-5">

        {/* HEADER */}
        <h1 className="font-display text-5xl font-extrabold uppercase tracking-tight text-white">
          My Plan
        </h1>

        <p className="mt-2 text-base text-[#85878d]">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        {/* SUMMARY */}
        <div className="mt-7 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-[#1a1d23]">

          {[
            {
              label: "Exercises",
              value: totals.exercises,
            },
            {
              label: "Minutes",
              value: totals.minutes,
            },
            {
              label: "Calories",
              value: totals.calories,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="p-7"
            >
              <p className="text-sm text-neutral-400">
                {item.label}
              </p>

              <p
                className={`mt-2 text-4xl font-bold ${
                  item.label === "Exercises"
                    ? "text-[#ccff00]"
                    : "text-white"
                }`}
              >
                {item.value}
              </p>
            </div>
          ))}

        </div>

        {/* TABS + SORT */}
        <div className="mt-7 flex flex-wrap items-end justify-between gap-5">

          {/* TABS */}
          <div className="flex rounded-full border border-white/15 bg-[#1a1d23] p-1">

            {(["plan", "saved"] as Tab[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                  tab === item
                    ? "bg-white/10 text-[#ccff00]"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {item === "plan"
                  ? "Today's Plan"
                  : "Saved"}
              </button>
            ))}

          </div>

          {/* SORT */}
          <div>
            <p className="mb-2 text-sm font-semibold text-neutral-400">
              Sort By
            </p>

            <select
              value={sortKey}
              onChange={(event) =>
                setSortKey(
                  event.target.value as SortKey
                )
              }
              className="rounded-full border border-white/20 bg-[#1a1d23] px-5 py-2.5 text-sm font-semibold text-white outline-none"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>
          </div>

        </div>

        {/* WORKOUT LIST */}
        <div className="mt-7 space-y-5">

          {!hydrated ? (
            <p className="py-16 text-center text-sm text-neutral-500">
              Loading workouts…
            </p>
          ) : sortedList.length === 0 ? (

            /* EMPTY STATE */
            <div className="flex flex-col items-center rounded-2xl border border-white/15 bg-[#1a1d23] px-5 py-14 text-center">

              <h3 className="text-xl font-bold uppercase text-white">
                Nothing Here Yet
              </h3>

              <p className="mt-2 max-w-sm text-sm text-neutral-500">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/"
                className="mt-5 rounded-full bg-[#ccff00] px-6 py-2.5 text-sm font-bold text-black transition hover:bg-[#b9eb00]"
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
                    ? () =>
                        handleMarkDone(
                          workout.id
                        )
                    : undefined
                }
                onRemove={() =>
                  handleRemove(workout.id)
                }
              />
            ))

          )}

        </div>

      </div>

    </main>
  );
}
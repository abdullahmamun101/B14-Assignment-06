"use client";

import { useEffect, useState } from "react";
import { Workout } from "../../types/workout";
import WorkoutCard from "./WorkoutCard";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load workouts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="library" className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-white font-display font-extrabold uppercase text-3xl mb-2">
        The Library
      </h2>
      <p className="text-gray-400 mb-10">
        Twelve lifts covering every major muscle group.
      </p>

      {loading ? (
        <p className="text-gray-400 animate-pulse">Loading workouts…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
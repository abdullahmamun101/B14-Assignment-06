"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Flame, Star, X } from "lucide-react";

interface Workout {
  id: number;
  name: string;
  image: string;
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
}

interface Props {
  workout: Workout;
  done: boolean;
  onMarkDone?: () => void;
  onRemove: () => void;
}

export default function PlanListCard({
  workout,
  done,
  onMarkDone,
  onRemove,
}: Props) {
  return (
    <div className="flex flex-col items-start gap-6 rounded-2xl border border-white/10 bg-[#141414] p-7 sm:flex-row sm:items-center">

      {/* IMAGE */}
      <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
          sizes="144px"
        />
      </div>

      {/* INFO */}
      <div className="flex-1">
        <h3
          className={`text-xl font-bold uppercase ${
            done
              ? "text-neutral-500 line-through"
              : "text-white"
          }`}
        >
          {workout.name}
        </h3>

        <p className="mt-2 text-base text-neutral-500">
          {workout.equipment}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-6 text-base text-neutral-400">

          <span className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-2">
            <Flame className="h-5 w-5" />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            {workout.rating}
          </span>

        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap items-center gap-3">

        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
        >
          View Details
        </Link>

        {onMarkDone && (
          <button
            type="button"
            onClick={onMarkDone}
            className="flex items-center gap-2 rounded-full bg-[#ccff00] px-5 py-2.5 text-sm font-bold text-black transition hover:bg-[#b9eb00]"
          >
            <Check className="h-5 w-5" />
            Mark as Done
          </button>
        )}

        <button
          type="button"
          onClick={onRemove}
          className="rounded-full border border-white/20 p-2.5 text-neutral-400 transition hover:border-red-400 hover:text-red-400"
          aria-label={`Remove ${workout.name}`}
        >
          <X className="h-5 w-5" />
        </button>

      </div>

    </div>
  );
}
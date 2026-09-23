import Image from "next/image";
import Link from "next/link";
import { Workout } from "../../types/workout";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/exercise/${workout.id}`}
      className="bg-[#1a1d23] border border-white/10 rounded-xl overflow-hidden hover:border-[#ccff00]/50 transition block"
    >
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={workout.image}
          alt={`${workout.name} demonstration`}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        {/* Category tags */}
        <div className="flex gap-2 mb-3">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="bg-[#ccff00]/10 text-[#ccff00] text-[10px] font-semibold uppercase px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="text-white font-bold uppercase text-sm mb-1">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="text-gray-400 text-xs mb-4">{workout.equipment}</p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-gray-300 text-xs font-medium">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#ccff00]" />
            {workout.duration} min
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[#ccff00]" />
            {workout.caloriesBurned} kcal
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Star className="w-4 h-4 text-[#ccff00]" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
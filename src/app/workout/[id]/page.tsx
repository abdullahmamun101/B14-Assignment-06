import Image from "next/image";
import {
  CalendarPlus,
  Bookmark,
} from "lucide-react";
import Footer from "@/app/components/Footer";

interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

async function getWorkout(id: string): Promise<Workout> {
  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Workout not found");
  }

  return response.json();
}

export default async function WorkoutDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workout = await getWorkout(id);

  return (
    <main className="bg-[#0d0f12] text-white">

      <section className="mx-auto max-w-245 px-5 py-8 md:px-0 md:py-7">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[600px_1fr] md:gap-12">

          {/* LEFT - IMAGE */}
          <div className="relative w-full overflow-hidden rounded-xl bg-[#f1f1f1] `aspect-[4/5]` md:aspect-auto md:h-190">
            <Image
              src={workout.image}
              alt={`${workout.name} demonstration`}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* RIGHT - CONTENT */}
          <div className="flex flex-col justify-start pt-1">

            <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white md:text-[48px]">
              {workout.name}
            </h1>

            <p className="mt-5 max-w-150 text-base leading-[1.6] text-[#b7b9bf]">
              {workout.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-[11px] font-bold text-black"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* KEY SPECS */}
            <div className="mt-5 overflow-hidden rounded-xl border border-[#292c32] bg-[#1a1d23]">

              <SpecRow
                label="EQUIPMENT"
                value={workout.equipment}
              />

              <SpecRow
                label="DIFFICULTY"
                value={workout.difficulty}
              />

              <SpecRow
                label="SETS"
                value={String(workout.sets)}
              />

              <SpecRow
                label="REPS"
                value={workout.reps}
              />

              <SpecRow
                label="DURATION"
                value={`${workout.duration} min`}
              />

              <SpecRow
                label="CALORIES"
                value={`${workout.caloriesBurned} kcal`}
              />

              <SpecRow
                label="RATING"
                value={String(workout.rating)}
                last
              />

            </div>

            {/* INSTRUCTIONS */}
            <div className="mt-7">

              <h2 className="font-display text-2xl font-bold uppercase text-white">
                Instructions
              </h2>

              <ol className="mt-4 space-y-3">

                {workout.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-4 text-[15px] leading-[1.6] text-[#e0e1e4]"
                  >
                    <span className="shrink-0 font-bold text-white">
                      {index + 1}.
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}

              </ol>

            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-6 flex flex-wrap gap-2">

              <button
                type="button"
                className="inline-flex h-9 items-center gap-2 rounded-full bg-[#ccff00] px-4 text-[11px] font-bold text-black transition hover:bg-[#b9eb00]"
              >
                <CalendarPlus className="h-4 w-4" />
                Add to today&apos;s plan
              </button>

              <button
                type="button"
                className="inline-flex h-9 items-center gap-2 rounded-full border border-[#85878d] px-4 text-[11px] font-bold text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
              >
                <Bookmark className="h-4 w-4" />
                Save for later
              </button>

            </div>

          </div>
        </div>

      </section>

      <Footer />

    </main>
  );
}


/* SPEC ROW COMPONENT */

function SpecRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex min-h-10.5 items-center justify-between px-4 ${
        !last ? "border-b border-[#292c32]" : ""
      }`}
    >
      <span className="font-display text-[11px] font-bold uppercase text-white">
        {label}
      </span>

      <span className="text-[13px] font-medium text-white">
        {value}
      </span>
    </div>
  );
}
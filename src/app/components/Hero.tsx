import Image from "next/image";

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-8">
      <section className="border border-white/10 rounded-2xl bg-[#1a1d23] px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-10">
        
        <div className="max-w-xl">
          <p className="text-[#ccff00] text-sm font-semibold tracking-widest mb-4">
            WORKOUT LIBRARY
          </p>

          <h1 className="font-display text-white font-extrabold uppercase text-4xl md:text-5xl leading-tight mb-5">
            Train with intent.<br />Log every set.
          </h1>

          <p className="text-gray-400 mb-8 leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a href="#library" className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-sm uppercase px-6 py-3 rounded-md hover:opacity-90 transition">
            Browse Workouts
          </a>
        </div>

        <div className="w-full md:w-[420px] flex justify-center">
          <Image
            src="/banner.png"
            alt="Gym Illustration"
            width={420}
            height={420}
            className="w-full h-auto"
          />
        </div>

      </section>
    </div>
  );
}
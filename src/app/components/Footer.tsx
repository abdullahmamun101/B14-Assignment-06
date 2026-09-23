import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#25282e] bg-[#191c22]">
      <div className="mx-auto flex max-w-245 flex-col items-center justify-between gap-4 px-5 py-7 sm:flex-row md:px-0">

        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />

          <span className="font-display text-lg font-bold text-white">
            FITLOG
          </span>
        </Link>

        <p className="text-center text-base text-[#85878d] sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}
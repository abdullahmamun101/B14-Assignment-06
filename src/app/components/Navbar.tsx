"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { plan, saved } = usePlan();
  const pathname = usePathname();

  const linkClass = (href: string) =>
    pathname === href ? "text-[#ccff00]" : "text-gray-300 hover:text-white";

  return (
    <nav className="w-full bg-[#0f1115] border-b border-white/10 relative sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            ☰
          </button>

          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="FitLog Logo" width={32} height={32} />
            <span className="text-white font-bold text-lg tracking-wide">FITLOG</span>
          </Link>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/" className={linkClass("/")}>
            Workouts
          </Link>
          <Link href="/my-plan" className={linkClass("/my-plan")}>
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs font-semibold text-white"
          >
            Plan
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ccff00] text-[11px] font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs font-semibold text-white"
          >
            Saved
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/40 text-[11px] font-bold text-white">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 text-sm font-medium">
          <Link href="/" className={linkClass("/")} onClick={() => setIsOpen(false)}>
            Workouts
          </Link>
          <Link href="/my-plan" className={linkClass("/my-plan")} onClick={() => setIsOpen(false)}>
            My Plan
          </Link>
        </div>
      )}
    </nav>
  );
}
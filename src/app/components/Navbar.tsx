"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-[#0f1115] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Left side: hamburger */}
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

        {/* Nav links */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/" className="text-[#ccff00]">
            Workouts
          </Link>
          <Link href="/my-plan" className="text-gray-300 hover:text-white">
            My Plan
          </Link>
        </div>

        {/* Badges - right*/}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="bg-[#ccff00] text-black text-xs font-semibold px-3 py-1 rounded-full"
          >
            Plan 0
          </Link>
          <Link
            href="/my-plan"
            className="border border-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full"
          >
            Saved 0
          </Link>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 text-sm font-medium">
          <Link href="/" className="text-[#ccff00]" onClick={() => setIsOpen(false)}>
            Workouts
          </Link>
          <Link href="/my-plan" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
            My Plan
          </Link>
        </div>
      )}
    </nav>
  );
}
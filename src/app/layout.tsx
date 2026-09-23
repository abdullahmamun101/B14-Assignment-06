import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Browse gym workouts, build today's plan, and track weekly calories with FitLog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0d0d0d]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

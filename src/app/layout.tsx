import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { PlanProvider } from "@/context/PlanContext";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} flex min-h-screen flex-col`}>
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PlanProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}

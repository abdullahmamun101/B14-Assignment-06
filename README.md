FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of workouts, add lifts to today's plan, save lifts for later, and track live totals for exercises, minutes, and calories — all backed by a shared context and persisted with localStorage.

Description

FitLog lets users explore a library of 12 workouts pulled from a live API, view detailed instructions and stats for each lift, and manage a daily workout plan (capped at 5 lifts) alongside a separate "Saved for later" list. Navbar badges update live as items are added or removed, with toast notifications confirming every action.

Technologies Used
Next.js (App Router) — routing and page structure
React — UI and component state
TypeScript — type-safe data models (Workout type)
Tailwind CSS — styling and responsive layout
React Context API — shared Plan/Saved state across pages
react-hot-toast — toast notifications
lucide-react — icons
localStorage — persisting the plan/saved lists across reloads
Features
Responsive workout library — 12 workout cards fetched live from the API, displayed in a responsive 3-column grid on desktop, collapsing on tablet/mobile.
Detailed workout pages — dynamic route (/workout/[id]) showing full specs, instructions, and equipment for each lift.
Today's Plan & Saved tabs — add lifts to a 5-lift daily plan or save them for later, each tracked separately on the My Plan page.
Live badge counters & toasts — the navbar's Plan/Saved counters update instantly, with toast notifications on every add, remove, or mark-as-done action.
Sortable plan list — sort My Plan entries by Duration, Calories, or Rating.
Persistent state — the plan and saved lists survive a page reload via localStorage.
Custom 404 page — friendly fallback for any unknown route.
Empty & loading states — dedicated "Nothing Here Yet" and "Loading workouts…" states for a polished UX.

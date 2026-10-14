# User Journey — Liftlog (Workout Tracker)

**What it is:** A lightweight, mobile-first workout tracker. Users quickly log exercises, sets, reps and weight during a workout, then review their history and personal records.

**Problem:** Lifters log workouts in notebooks or spreadsheets. It's messy mid-workout and they can't see progress over time.

**User:** One type — a gym-goer logging their own workouts on their phone between sets.

## The journey

1. **Opens the app** → lands on **Home** (`/`). Sees a greeting, their last workout, and how many workouts they've done this week.
   - First visit (no workouts yet): Home shows an empty state: "No workouts yet — start your first one!" with a Start Workout button.
2. **Taps "Start Workout"** → goes to **Log Workout** (`/log`).
3. **Names the workout** (e.g. "Push Day"), **picks an exercise**, and **adds sets** (weight in lb × reps).
   - Can add more sets, add more exercises, or delete a set with the trash icon.
   - **Mistake:** types letters or a negative number into weight/reps → an inline red message appears under that field ("Reps must be a whole number above 0"). Nothing else on the form is cleared.
   - **Leaves mid-workout** (taps History in the nav) and comes back → the draft is still there.
4. **Taps "Finish Workout"** → the workout is saved and the user goes to **History** (`/history`) with a confirmation toast "Workout saved".
   - **Mistake:** Finish with zero sets → dialog "Discard empty workout?" [Keep logging] [Discard].
5. **On History**, sees workouts newest first. Can filter by exercise and sort newest/oldest. Sees personal records (heaviest weight per exercise).
   - Filter shows nothing → "No workouts match this filter" + [Clear filter].
6. **Taps a workout** → **Workout Detail** (`/workout/:id`) shows every exercise and set. Can **Edit** (goes back into the log form, prefilled) or **Delete** (asks "Delete this workout? This can't be undone." first).
7. **Unknown URL** → a friendly 404 page with a link back Home.

## Data rules

- No backend, no API. All data lives in React state in the browser. **Refreshing the page resets everything** — that's expected for this unit.
- Seed the app with 3 sample workouts so History isn't empty on first load (Push Day Oct 12, Leg Day Oct 10, Pull Day Oct 8).

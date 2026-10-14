# Log Workout page — `/log`

**As a** lifter between sets, **I want to** add a set with as few taps as possible, **so that** logging never slows my workout down.

## On this page
- Workout name input (default "Workout — <today's date>")
- One or more exercise blocks. Each has: exercise picker (Bench Press, Squat, Deadlift, Overhead Press, Barbell Row, Pull-up, plus "Other…" free text) and a list of sets.
- Each set row: weight (lb) input, reps input, trash icon to delete the set.
- **+ Add set** (copies the previous set's weight/reps to save typing), **+ Add exercise**
- **Finish Workout** (primary, full-width)

## Rules & errors
- Weight: number ≥ 0. Reps: whole number ≥ 1. Invalid → inline red message under that field; the field gets an error border; nothing else is cleared.
- Finish with zero sets → dialog "Discard empty workout?" [Keep logging] [Discard].
- Finish with valid sets → save, go to `/history`, show toast "Workout saved".
- Navigating away and back keeps the draft (it lives in app-level state).

## Done when
- [ ] Can log 2 exercises × 3 sets and finish
- [ ] Typing "abc" in reps shows the inline error and Finish is blocked until fixed
- [ ] Draft survives going to History and back

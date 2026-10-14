# Workout Detail page — `/workout/:id`

**As a** lifter, **I want to** see every set from a past workout and fix mistakes, **so that** my history is accurate.

## On this page
- Workout name + date
- Each exercise with its sets (weight × reps), PR sets marked with a trophy
- **Edit** → opens the log form prefilled with this workout; saving updates it
- **Delete** → confirm dialog "Delete this workout? This can't be undone." [Cancel] [Delete] → back to `/history`, toast "Workout deleted"
- Back link to History

## States
- Unknown id → "We couldn't find that workout" + link to History

## Done when
- [ ] Edit changes a set and the change shows in History
- [ ] Delete removes the workout after confirming

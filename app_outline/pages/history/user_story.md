# History page — `/history`

**As a** lifter, **I want to** scroll my past workouts and see my personal records, **so that** I can tell I'm getting stronger.

## On this page
- Filter by exercise (dropdown, default "All exercises"); Sort (Newest / Oldest)
- List of workouts: date, name, number of exercises, chevron. Tap → `/workout/:id`
- Personal records section: heaviest weight per exercise, with a trophy icon

## States
- Filter matches nothing → "No workouts match this filter" + [Clear filter]
- No workouts at all → "No workouts yet" + [Start Workout]

## Done when
- [ ] The 3 seeded workouts show newest first
- [ ] Filtering by "Squat" shows only Leg Day
- [ ] A newly finished workout appears at the top

# Home page — `/`

**As a** lifter, **I want to** see my last workout and start a new one in one tap, **so that** I'm logging within seconds of walking into the gym.

## On this page
- Greeting ("Ready to lift?")
- Card: last workout — name, how long ago, number of exercises. Tapping it opens `/workout/:id`.
- Stat: number of workouts this week.
- **Start Workout** (primary, full-width) → `/log`
- **View History** (secondary) → `/history`
- Bottom nav: Home · Log · History

## States
- **Empty:** no workouts → hide the card and stat; show "No workouts yet — start your first one!" above Start Workout.

## Done when
- [ ] Start Workout navigates to `/log` without a full page reload
- [ ] Last-workout card shows the most recent seeded workout and links to its detail page
- [ ] Empty state appears if all workouts are deleted

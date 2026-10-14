import { EXERCISES } from '../store/seed.js'

// Heaviest logged weight per exercise. Bodyweight sets (0 lb) don't set records.
export function personalRecords(workouts) {
  const best = new Map()
  for (const w of workouts) {
    for (const ex of w.exercises) {
      for (const s of ex.sets) {
        const weight = Number(s.weight)
        if (weight > 0 && weight > (best.get(ex.name) ?? 0)) best.set(ex.name, weight)
      }
    }
  }
  return [...best].map(([name, weight]) => ({ name, weight })).sort((a, b) => b.weight - a.weight)
}

// Presets plus anything custom that has been logged, so every preset is filterable.
export function exerciseNames(workouts) {
  const logged = workouts.flatMap((w) => w.exercises.map((e) => e.name))
  return [...new Set([...EXERCISES, ...logged])].sort((a, b) => a.localeCompare(b))
}

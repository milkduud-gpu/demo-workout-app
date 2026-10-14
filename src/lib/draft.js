import { EXERCISES } from '../store/seed.js'

// A draft is the editable form shape: weight/reps are strings so half-typed input survives.
export const OTHER = '__other__'

const WEIGHT_MESSAGE = 'Weight must be a number, 0 or higher'
const REPS_MESSAGE = 'Reps must be a whole number above 0'

let counter = 0
export function newId(prefix = 'id') {
  counter += 1
  return `${prefix}-${Date.now().toString(36)}-${counter.toString(36)}`
}

export function defaultName(now = new Date()) {
  return `Workout — ${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
}

export function todayISO(now = new Date()) {
  const p = (n) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`
}

export function makeExercise(choice = EXERCISES[0], ids = { ex: newId('ex'), set: newId('set') }) {
  return { id: ids.ex, choice, customName: '', sets: [{ id: ids.set, weight: '', reps: '' }] }
}

export function makeDraft() {
  return { name: defaultName(), exercises: [makeExercise()] }
}

// Saved workout -> draft (used by Edit).
export function draftFromWorkout(workout) {
  return {
    name: workout.name,
    exercises: workout.exercises.map((ex) => {
      const preset = EXERCISES.includes(ex.name)
      return {
        id: ex.id,
        choice: preset ? ex.name : OTHER,
        customName: preset ? '' : ex.name,
        sets: ex.sets.map((s) => ({ id: s.id, weight: String(s.weight), reps: String(s.reps) })),
      }
    }),
  }
}

export const exerciseName = (ex) => (ex.choice === OTHER ? ex.customName.trim() : ex.choice)

export const isBlankSet = (s) => s.weight.trim() === '' && s.reps.trim() === ''

export function validateWeight(value) {
  return /^\d+(\.\d+)?$/.test(value.trim()) ? null : WEIGHT_MESSAGE
}

export function validateReps(value) {
  return /^[1-9]\d*$/.test(value.trim()) ? null : REPS_MESSAGE
}

// Blank sets are ignored; exercises with no filled sets are dropped.
// Returns the cleaned exercises plus the errors that block saving.
export function validateDraft(draft) {
  const errors = {}
  const exercises = []
  let firstInvalid = null

  for (const ex of draft.exercises) {
    const filled = ex.sets.filter((s) => !isBlankSet(s))
    if (filled.length === 0) continue

    const name = exerciseName(ex)
    if (!name) {
      errors[ex.id] = { name: 'Name this exercise' }
      firstInvalid ??= `${ex.id}-name`
    }

    const sets = []
    for (const s of filled) {
      const weight = validateWeight(s.weight)
      const reps = validateReps(s.reps)
      if (weight || reps) {
        errors[s.id] = { weight, reps }
        firstInvalid ??= weight ? `${s.id}-weight` : `${s.id}-reps`
      } else {
        sets.push({ id: s.id, weight: Number(s.weight), reps: Number(s.reps) })
      }
    }
    exercises.push({ id: ex.id, name, sets })
  }

  return { errors, exercises, firstInvalid, ok: firstInvalid === null }
}

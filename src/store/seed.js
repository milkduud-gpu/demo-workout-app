const set = (id, weight, reps) => ({ id, weight, reps })

export const EXERCISES = [
  'Bench Press',
  'Squat',
  'Deadlift',
  'Overhead Press',
  'Barbell Row',
  'Pull-up',
]

// Dates are fixed to the demo calendar; "days ago" is computed from the real today.
export const seedWorkouts = [
  {
    id: 'w-push',
    name: 'Push Day',
    date: '2026-10-12',
    exercises: [
      {
        id: 'e1',
        name: 'Bench Press',
        sets: [set('s1', 135, 8), set('s2', 145, 6), set('s3', 155, 3)],
      },
      { id: 'e2', name: 'Overhead Press', sets: [set('s4', 85, 8), set('s5', 85, 8)] },
      { id: 'e3', name: 'Incline Dumbbell Press', sets: [set('s6', 50, 10), set('s7', 55, 8)] },
      { id: 'e4', name: 'Triceps Pushdown', sets: [set('s8', 40, 12), set('s9', 45, 10)] },
    ],
  },
  {
    id: 'w-legs',
    name: 'Leg Day',
    date: '2026-10-10',
    exercises: [
      {
        id: 'e5',
        name: 'Squat',
        sets: [set('s10', 185, 8), set('s11', 205, 6), set('s12', 225, 4)],
      },
      { id: 'e6', name: 'Romanian Deadlift', sets: [set('s13', 155, 10), set('s14', 175, 8)] },
      { id: 'e7', name: 'Leg Press', sets: [set('s15', 270, 12), set('s16', 320, 10)] },
      { id: 'e8', name: 'Leg Curl', sets: [set('s17', 90, 12), set('s18', 100, 10)] },
      { id: 'e9', name: 'Calf Raise', sets: [set('s19', 120, 15), set('s20', 120, 15)] },
    ],
  },
  {
    id: 'w-pull',
    name: 'Pull Day',
    date: '2026-10-08',
    exercises: [
      { id: 'e10', name: 'Deadlift', sets: [set('s21', 225, 5), set('s22', 245, 3)] },
      { id: 'e11', name: 'Barbell Row', sets: [set('s23', 135, 8), set('s24', 145, 8)] },
      { id: 'e12', name: 'Pull-up', sets: [set('s25', 0, 8), set('s26', 0, 7)] },
      { id: 'e13', name: 'Barbell Curl', sets: [set('s27', 65, 10), set('s28', 65, 9)] },
    ],
  },
]

import { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackLink from '../components/BackLink.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import { Trophy } from '../components/icons.jsx'
import WorkoutNotFound from '../components/WorkoutNotFound.jsx'
import { formatLongDate } from '../lib/dates.js'
import { draftFromWorkout } from '../lib/draft.js'
import { personalRecords } from '../lib/records.js'
import { useLiftlog, useLiftlogDispatch, useToast } from '../store/LiftlogContext.jsx'
import '../styles/ui.css'
import '../styles/detail.css'

export default function WorkoutDetail() {
  const { id } = useParams()
  const { workouts } = useLiftlog()
  const dispatch = useLiftlogDispatch()
  const toast = useToast()
  const navigate = useNavigate()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const deleted = useRef(false)

  const workout = workouts.find((w) => w.id === id)
  // After a delete the workout is gone a moment before the route changes; render nothing, not "not found".
  if (!workout) return deleted.current ? null : <WorkoutNotFound />

  const records = new Map(personalRecords(workouts).map((r) => [r.name, r.weight]))

  function startEdit() {
    dispatch({ type: 'draft/replaced', key: `edit-${id}`, draft: draftFromWorkout(workout) })
    navigate(`/workout/${id}/edit`)
  }

  function remove() {
    deleted.current = true
    setConfirmDelete(false)
    dispatch({ type: 'workout/deleted', id })
    dispatch({ type: 'draft/cleared', key: `edit-${id}` })
    toast('Workout deleted')
    navigate('/history')
  }

  return (
    <section className="page">
      <BackLink to="/history">Back to History</BackLink>

      <header className="detail__head">
        <h1 className="detail__title">{workout.name}</h1>
        <p className="detail__date">{formatLongDate(workout.date)}</p>
      </header>

      <ul className="lifts">
        {workout.exercises.map((ex) => (
          <li key={ex.id} className="lift">
            <h2>{ex.name}</h2>
            <ol className="lift__sets">
              {ex.sets.map((s, i) => (
                <li key={s.id} className="lift__set">
                  <span className="lift__n">Set {i + 1}</span>
                  <span className="lift__score num">
                    {s.weight} lb × {s.reps}
                  </span>
                  {s.weight > 0 && s.weight === records.get(ex.name) && i === ex.sets.findIndex((x) => x.weight === s.weight) && (
                    <span className="lift__trophy" role="img" aria-label="Personal record">
                      <Trophy />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>

      <div className="detail__actions">
        <button type="button" className="btn btn--secondary" onClick={startEdit}>
          Edit
        </button>
        <button type="button" className="btn btn--ghost-danger" onClick={() => setConfirmDelete(true)}>
          Delete
        </button>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete this workout?"
        cancelLabel="Cancel"
        confirmLabel="Delete"
        onCancel={() => setConfirmDelete(false)}
        onConfirm={remove}
      >
        This can't be undone.
      </ConfirmDialog>
    </section>
  )
}

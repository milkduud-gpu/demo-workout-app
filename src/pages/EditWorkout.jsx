import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackLink from '../components/BackLink.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import WorkoutForm from '../components/WorkoutForm.jsx'
import WorkoutNotFound from '../components/WorkoutNotFound.jsx'
import { draftFromWorkout, validateDraft } from '../lib/draft.js'
import { useLiftlog, useLiftlogDispatch, useToast } from '../store/LiftlogContext.jsx'

export default function EditWorkout() {
  const { id } = useParams()
  const { workouts, drafts } = useLiftlog()
  const dispatch = useLiftlogDispatch()
  const toast = useToast()
  const navigate = useNavigate()
  const [showErrors, setShowErrors] = useState(false)
  const [confirmEmpty, setConfirmEmpty] = useState(false)
  const leaving = useRef(false)

  const key = `edit-${id}`
  const workout = workouts.find((w) => w.id === id)
  const draft = drafts[key]

  // Normally Edit seeds the draft; this covers opening the URL directly.
  useEffect(() => {
    if (workout && !draft && !leaving.current) {
      dispatch({ type: 'draft/replaced', key, draft: draftFromWorkout(workout) })
    }
  }, [workout, draft, key, dispatch])

  if (!workout) return leaving.current ? null : <WorkoutNotFound />
  if (!draft) return null

  function save() {
    const result = validateDraft(draft)
    setShowErrors(true)

    if (!result.ok) {
      document.getElementById(result.firstInvalid)?.focus()
      return
    }
    if (result.exercises.length === 0) {
      setConfirmEmpty(true)
      return
    }

    leaving.current = true
    dispatch({
      type: 'workout/saved',
      workout: { ...workout, name: draft.name.trim() || workout.name, exercises: result.exercises },
    })
    dispatch({ type: 'draft/cleared', key })
    toast('Changes saved')
    navigate(`/workout/${id}`)
  }

  function removeEmpty() {
    leaving.current = true
    setConfirmEmpty(false)
    dispatch({ type: 'workout/deleted', id })
    dispatch({ type: 'draft/cleared', key })
    toast('Workout deleted')
    navigate('/history')
  }

  return (
    <section className="page">
      <BackLink to={`/workout/${id}`} onClick={() => dispatch({ type: 'draft/cleared', key })}>
        Cancel
      </BackLink>
      <h1>Edit workout</h1>
      <WorkoutForm
        draft={draft}
        onChange={(update) => dispatch({ type: 'draft/updated', key, update })}
        showErrors={showErrors}
        onFinish={save}
        finishLabel="Save changes"
      />
      <ConfirmDialog
        open={confirmEmpty}
        title="Delete empty workout?"
        cancelLabel="Keep editing"
        confirmLabel="Delete"
        onCancel={() => setConfirmEmpty(false)}
        onConfirm={removeEmpty}
      >
        A workout needs at least one set. Deleting it can't be undone.
      </ConfirmDialog>
    </section>
  )
}

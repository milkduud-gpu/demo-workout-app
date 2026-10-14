import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import WorkoutForm from '../components/WorkoutForm.jsx'
import { defaultName, makeDraft, newId, todayISO, validateDraft } from '../lib/draft.js'
import { useLiftlog, useLiftlogDispatch, useToast } from '../store/LiftlogContext.jsx'

const KEY = 'new'

export default function LogWorkout() {
  const { drafts } = useLiftlog()
  const dispatch = useLiftlogDispatch()
  const toast = useToast()
  const navigate = useNavigate()
  const [showErrors, setShowErrors] = useState(false)
  const [confirmDiscard, setConfirmDiscard] = useState(false)
  const draft = drafts[KEY]

  function finish() {
    const result = validateDraft(draft)
    setShowErrors(true)

    if (!result.ok) {
      document.getElementById(result.firstInvalid)?.focus()
      return
    }
    if (result.exercises.length === 0) {
      setConfirmDiscard(true)
      return
    }

    dispatch({
      type: 'workout/saved',
      workout: {
        id: newId('w'),
        name: draft.name.trim() || defaultName(),
        date: todayISO(),
        exercises: result.exercises,
      },
    })
    dispatch({ type: 'draft/replaced', key: KEY, draft: makeDraft() })
    toast('Workout saved')
    navigate('/history')
  }

  function discard() {
    setConfirmDiscard(false)
    dispatch({ type: 'draft/replaced', key: KEY, draft: makeDraft() })
    navigate('/')
  }

  return (
    <section className="page">
      <h1>Log workout</h1>
      <WorkoutForm
        draft={draft}
        onChange={(update) => dispatch({ type: 'draft/updated', key: KEY, update })}
        showErrors={showErrors}
        onFinish={finish}
        finishLabel="Finish Workout"
      />
      <ConfirmDialog
        open={confirmDiscard}
        title="Discard empty workout?"
        cancelLabel="Keep logging"
        confirmLabel="Discard"
        onCancel={() => setConfirmDiscard(false)}
        onConfirm={discard}
      >
        You haven't logged any sets yet.
      </ConfirmDialog>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import {
  OTHER,
  exerciseName,
  isBlankSet,
  makeExercise,
  newId,
  validateReps,
  validateWeight,
} from '../lib/draft.js'
import { EXERCISES } from '../store/seed.js'
import { Close, Plus, Trash, Warning } from './icons.jsx'
import '../styles/ui.css'
import '../styles/log.css'

// Ids present at mount are "old"; anything added later gets the slide-in.
function useFreshIds(ids) {
  const seen = useRef(null)
  if (seen.current === null) seen.current = new Set(ids)
  const fresh = new Set(ids.filter((id) => !seen.current.has(id)))
  useEffect(() => {
    ids.forEach((id) => seen.current.add(id))
  })
  return fresh
}

function FieldError({ id, children }) {
  return (
    <p className="field-error" id={id}>
      <Warning />
      <span>{children}</span>
    </p>
  )
}

function SetRow({ exName, set, number, showErrors, isNew, onChange, onDelete }) {
  const blank = isBlankSet(set)
  const visible = (value, error) =>
    error && (value.trim() !== '' || (showErrors && !blank)) ? error : null
  const weightError = visible(set.weight, validateWeight(set.weight))
  const repsError = visible(set.reps, validateReps(set.reps))
  const label = `${exName || 'Exercise'} set ${number}`

  return (
    <li className={`set${isNew ? ' is-new' : ''}`}>
      <span className="set__n">Set {number}</span>

      <div className="set__field">
        <label className="sr-only" htmlFor={`${set.id}-weight`}>
          {label} weight in pounds
        </label>
        <input
          id={`${set.id}-weight`}
          className="input set__input"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={set.weight}
          aria-invalid={weightError ? 'true' : undefined}
          aria-describedby={weightError ? `${set.id}-weight-err` : undefined}
          onChange={(e) => onChange({ weight: e.target.value })}
        />
        <span className="set__unit" aria-hidden="true">
          lb
        </span>
      </div>

      <span className="set__x" aria-hidden="true">
        ×
      </span>

      <div className="set__field set__field--reps">
        <label className="sr-only" htmlFor={`${set.id}-reps`}>
          {label} reps
        </label>
        <input
          id={`${set.id}-reps`}
          className="input set__input"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={set.reps}
          aria-invalid={repsError ? 'true' : undefined}
          aria-describedby={repsError ? `${set.id}-reps-err` : undefined}
          onChange={(e) => onChange({ reps: e.target.value })}
        />
        <span className="set__unit" aria-hidden="true">
          reps
        </span>
      </div>

      <button type="button" className="icon-btn icon-btn--set" aria-label={`Delete ${label}`} onClick={onDelete}>
        <Trash />
      </button>

      {(weightError || repsError) && (
        <div className="set__errors">
          {weightError && <FieldError id={`${set.id}-weight-err`}>{weightError}</FieldError>}
          {repsError && <FieldError id={`${set.id}-reps-err`}>{repsError}</FieldError>}
        </div>
      )}
    </li>
  )
}

function ExerciseBlock({ exercise, canRemove, showErrors, isNew, onChange, onRemove }) {
  const freshSets = useFreshIds(exercise.sets.map((s) => s.id))
  const name = exerciseName(exercise)
  const isOther = exercise.choice === OTHER
  const hasFilled = exercise.sets.some((s) => !isBlankSet(s))
  const nameError = isOther && showErrors && hasFilled && !name

  const updateSets = (fn) => onChange((ex) => ({ ...ex, sets: fn(ex.sets) }))

  function addSet() {
    const id = newId('set')
    updateSets((sets) => {
      const prev = sets[sets.length - 1]
      return [...sets, { id, weight: prev?.weight ?? '', reps: prev?.reps ?? '' }]
    })
  }

  return (
    <section className={`block${isNew ? ' is-new' : ''}`} aria-label={name || 'New exercise'}>
      <div className="block__head">
        <div className="field block__pick">
          <label htmlFor={`${exercise.id}-choice`}>Exercise</label>
          <select
            id={`${exercise.id}-choice`}
            value={exercise.choice}
            onChange={(e) => onChange((ex) => ({ ...ex, choice: e.target.value }))}
          >
            {EXERCISES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
            <option value={OTHER}>Other…</option>
          </select>
        </div>
        {canRemove && (
          <button
            type="button"
            className="icon-btn icon-btn--head"
            aria-label={`Remove ${name || 'exercise'}`}
            onClick={onRemove}
          >
            <Close />
          </button>
        )}
      </div>

      {isOther && (
        <div className="field">
          <label htmlFor={`${exercise.id}-name`}>Exercise name</label>
          <input
            id={`${exercise.id}-name`}
            className="input"
            type="text"
            autoComplete="off"
            value={exercise.customName}
            aria-invalid={nameError ? 'true' : undefined}
            aria-describedby={nameError ? `${exercise.id}-name-err` : undefined}
            onChange={(e) => onChange((ex) => ({ ...ex, customName: e.target.value }))}
          />
          {nameError && <FieldError id={`${exercise.id}-name-err`}>Name this exercise</FieldError>}
        </div>
      )}

      <ul className="sets">
        {exercise.sets.map((set, i) => (
          <SetRow
            key={set.id}
            exName={name}
            set={set}
            number={i + 1}
            showErrors={showErrors}
            isNew={freshSets.has(set.id)}
            onChange={(patch) =>
              updateSets((sets) => sets.map((s) => (s.id === set.id ? { ...s, ...patch } : s)))
            }
            onDelete={() => updateSets((sets) => sets.filter((s) => s.id !== set.id))}
          />
        ))}
      </ul>

      <button type="button" className="btn btn--secondary btn--small" onClick={addSet}>
        <Plus /> Add set
      </button>
    </section>
  )
}

export default function WorkoutForm({ draft, onChange, showErrors, onFinish, finishLabel }) {
  const freshBlocks = useFreshIds(draft.exercises.map((e) => e.id))

  function addExercise() {
    const ids = { ex: newId('ex'), set: newId('set') }
    onChange((d) => {
      const used = new Set(d.exercises.map((e) => e.choice))
      const choice = EXERCISES.find((n) => !used.has(n)) ?? OTHER
      return { ...d, exercises: [...d.exercises, makeExercise(choice, ids)] }
    })
  }

  return (
    <form
      className="log"
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onFinish()
      }}
    >
      <div className="field">
        <label htmlFor="workout-name">Workout name</label>
        <input
          id="workout-name"
          className="input input--name"
          type="text"
          autoComplete="off"
          value={draft.name}
          onChange={(e) => onChange((d) => ({ ...d, name: e.target.value }))}
        />
      </div>

      {draft.exercises.map((ex) => (
        <ExerciseBlock
          key={ex.id}
          exercise={ex}
          canRemove={draft.exercises.length > 1}
          showErrors={showErrors}
          isNew={freshBlocks.has(ex.id)}
          onChange={(fn) =>
            onChange((d) => ({ ...d, exercises: d.exercises.map((e) => (e.id === ex.id ? fn(e) : e)) }))
          }
          onRemove={() =>
            onChange((d) => ({ ...d, exercises: d.exercises.filter((e) => e.id !== ex.id) }))
          }
        />
      ))}

      <button type="button" className="btn btn--secondary" onClick={addExercise}>
        <Plus /> Add exercise
      </button>

      <div className="finish">
        <button type="submit" className="btn btn--primary">
          {finishLabel}
        </button>
      </div>
    </form>
  )
}

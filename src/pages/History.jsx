import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Chevron, Trophy } from '../components/icons.jsx'
import { formatShortDate } from '../lib/dates.js'
import { exerciseNames, personalRecords } from '../lib/records.js'
import { useLiftlog } from '../store/LiftlogContext.jsx'
import '../styles/ui.css'
import '../styles/history.css'

const ALL = ''
const COLLAPSED_RECORDS = 5

export default function History() {
  const { workouts } = useLiftlog()
  const [exercise, setExercise] = useState(ALL)
  const [sort, setSort] = useState('newest')
  const [showAllRecords, setShowAllRecords] = useState(false)

  if (workouts.length === 0) {
    return (
      <section className="page">
        <h1>History</h1>
        <div className="empty">
          <p className="empty__title">No workouts yet</p>
          <Link className="btn btn--primary" to="/log">
            Start Workout
          </Link>
        </div>
      </section>
    )
  }

  const filtered = workouts
    .map((w, index) => ({ w, index }))
    .filter(({ w }) => exercise === ALL || w.exercises.some((e) => e.name === exercise))
    .sort((a, b) => {
      const byDate = a.w.date.localeCompare(b.w.date) || a.index - b.index
      return sort === 'newest' ? -byDate : byDate
    })
    .map(({ w }) => w)

  const matching = exercise === ALL ? workouts : filtered
  const records = personalRecords(matching).filter((r) => exercise === ALL || r.name === exercise)
  const visibleRecords = showAllRecords ? records : records.slice(0, COLLAPSED_RECORDS)

  return (
    <section className="page">
      <h1>History</h1>

      <div className="controls">
        <div className="field">
          <label htmlFor="filter-exercise">Exercise</label>
          <select id="filter-exercise" value={exercise} onChange={(e) => setExercise(e.target.value)}>
            <option value={ALL}>All exercises</option>
            {exerciseNames(workouts).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="sort">Sort</label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">
          <p className="empty__title">No workouts match this filter</p>
          <button type="button" className="btn btn--secondary" onClick={() => setExercise(ALL)}>
            Clear filter
          </button>
        </div>
      ) : (
        <>
          <ul className="rows">
            {filtered.map((w) => (
              <li key={w.id}>
                <Link className="row" to={`/workout/${w.id}`}>
                  <span className="row__date num">{formatShortDate(w.date)}</span>
                  <span className="row__body">
                    <span className="row__name">{w.name}</span>
                    <span className="row__meta">
                      {w.exercises.length} {w.exercises.length === 1 ? 'exercise' : 'exercises'}
                    </span>
                  </span>
                  <Chevron className="row__chevron" />
                </Link>
              </li>
            ))}
          </ul>

          {records.length > 0 && (
            <section className="records" aria-labelledby="records-title">
              <h2 id="records-title">Personal records</h2>
              <ul>
                {visibleRecords.map((r) => (
                  <li key={r.name} className="record">
                    <Trophy className="record__trophy" />
                    <span className="record__name">{r.name}</span>
                    <span className="record__weight num">{r.weight} lb</span>
                  </li>
                ))}
              </ul>
              {records.length > COLLAPSED_RECORDS && (
                <button
                  type="button"
                  className="records__toggle"
                  aria-expanded={showAllRecords}
                  onClick={() => setShowAllRecords((v) => !v)}
                >
                  {showAllRecords ? 'Show fewer' : `Show all ${records.length}`}
                </button>
              )}
            </section>
          )}
        </>
      )}
    </section>
  )
}

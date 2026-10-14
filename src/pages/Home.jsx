import { Link } from 'react-router-dom'
import { Chevron } from '../components/icons.jsx'
import { daysAgoLabel, isThisWeek } from '../lib/dates.js'
import { useLiftlog } from '../store/LiftlogContext.jsx'
import '../styles/ui.css'
import '../styles/home.css'

export default function Home() {
  const { workouts } = useLiftlog()
  const last = workouts.reduce((a, w) => (!a || w.date >= a.date ? w : a), null)
  const weekCount = workouts.filter((w) => isThisWeek(w.date)).length

  return (
    <section className="page">
      <h1 className="home__greeting">Ready to lift?</h1>

      {last ? (
        <>
          <Link className="last" to={`/workout/${last.id}`}>
            <div>
              <p className="last__label">Last workout</p>
              <p className="last__name">{last.name}</p>
              <p className="last__meta">
                {daysAgoLabel(last.date)} · {last.exercises.length} exercises
              </p>
            </div>
            <Chevron className="last__chevron" />
          </Link>

          <div className="scoreboard">
            <span className="scoreboard__value">{weekCount}</span>
            <span className="scoreboard__label">{weekCount === 1 ? 'workout' : 'workouts'} this week</span>
          </div>
        </>
      ) : (
        <p className="home__empty">No workouts yet — start your first one!</p>
      )}

      <div className="home__actions">
        <Link className="btn btn--primary" to="/log">
          Start Workout
        </Link>
        <Link className="btn btn--secondary" to="/history">
          View History
        </Link>
      </div>
    </section>
  )
}

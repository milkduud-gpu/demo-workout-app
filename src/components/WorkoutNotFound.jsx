import { Link } from 'react-router-dom'
import '../styles/ui.css'

export default function WorkoutNotFound() {
  return (
    <section className="page">
      <h1>We couldn't find that workout</h1>
      <p>It may have been deleted. Your other workouts are in History.</p>
      <Link className="btn btn--secondary" to="/history">
        Go to History
      </Link>
    </section>
  )
}

import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="page">
      <h1>Page not found</h1>
      <p>That page doesn't exist. Head back home to keep lifting.</p>
      <Link to="/">Back to Home</Link>
    </section>
  )
}

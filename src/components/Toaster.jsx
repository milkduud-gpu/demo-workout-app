import { useEffect } from 'react'
import { useLiftlog, useLiftlogDispatch } from '../store/LiftlogContext.jsx'
import '../styles/overlay.css'

const DURATION = 3200

function Toast({ toast }) {
  const dispatch = useLiftlogDispatch()
  useEffect(() => {
    const timer = setTimeout(() => dispatch({ type: 'toast/dismissed', id: toast.id }), DURATION)
    return () => clearTimeout(timer)
  }, [dispatch, toast.id])
  return <p className="toast">{toast.message}</p>
}

// The live region stays mounted so screen readers announce each toast as it appears.
export default function Toaster() {
  const { toasts } = useLiftlog()
  return (
    <div className="toaster" role="status" aria-live="polite">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} />
      ))}
    </div>
  )
}

import { useEffect, useId, useRef } from 'react'
import '../styles/overlay.css'

// Native <dialog>: focus is trapped, Esc cancels, and the page behind is inert.
export default function ConfirmDialog({
  open,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}) {
  const ref = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault()
        onCancel()
      }}
      onClick={(e) => e.target === ref.current && onCancel()}
    >
      <h2 id={titleId}>{title}</h2>
      {children && <p>{children}</p>}
      <div className="dialog__actions">
        <button type="button" className="btn btn--secondary" onClick={onCancel}>
          {cancelLabel}
        </button>
        <button type="button" className="btn btn--danger" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  )
}

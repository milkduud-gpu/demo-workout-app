import { createContext, useCallback, useContext, useReducer } from 'react'
import { makeDraft, newId } from '../lib/draft.js'
import { seedWorkouts } from './seed.js'

const StateContext = createContext(null)
const DispatchContext = createContext(null)

const initialState = {
  workouts: seedWorkouts,
  // Unsaved forms, keyed so a new workout and an edit never overwrite each other.
  drafts: { new: makeDraft() },
  toasts: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'workout/saved': {
      const exists = state.workouts.some((w) => w.id === action.workout.id)
      return {
        ...state,
        workouts: exists
          ? state.workouts.map((w) => (w.id === action.workout.id ? action.workout : w))
          : [...state.workouts, action.workout],
      }
    }
    case 'workout/deleted':
      return { ...state, workouts: state.workouts.filter((w) => w.id !== action.id) }
    case 'draft/updated':
      return {
        ...state,
        drafts: { ...state.drafts, [action.key]: action.update(state.drafts[action.key]) },
      }
    case 'draft/replaced':
      return { ...state, drafts: { ...state.drafts, [action.key]: action.draft } }
    case 'draft/cleared': {
      const { [action.key]: _removed, ...rest } = state.drafts
      return { ...state, drafts: rest }
    }
    case 'toast/shown':
      return { ...state, toasts: [...state.toasts, action.toast] }
    case 'toast/dismissed':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) }
    default:
      throw Error('Unknown action: ' + action.type)
  }
}

export function LiftlogProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StateContext value={state}>
      <DispatchContext value={dispatch}>{children}</DispatchContext>
    </StateContext>
  )
}

export function useLiftlog() {
  return useContext(StateContext)
}

export function useLiftlogDispatch() {
  return useContext(DispatchContext)
}

export function useToast() {
  const dispatch = useLiftlogDispatch()
  return useCallback(
    (message) => dispatch({ type: 'toast/shown', toast: { id: newId('toast'), message } }),
    [dispatch],
  )
}

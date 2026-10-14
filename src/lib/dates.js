// Workout dates are 'YYYY-MM-DD' strings; parse them as local dates, not UTC.
export function parseDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function daysAgo(iso, now = new Date()) {
  return Math.round((startOfDay(now) - parseDate(iso)) / 86400000)
}

export function daysAgoLabel(iso, now = new Date()) {
  const n = daysAgo(iso, now)
  if (n <= 0) return 'Today'
  if (n === 1) return 'Yesterday'
  return `${n} days ago`
}

// Calendar week, Monday through Sunday.
export function isThisWeek(iso, now = new Date()) {
  const today = startOfDay(now)
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7))
  const nextMonday = new Date(monday)
  nextMonday.setDate(monday.getDate() + 7)
  const d = parseDate(iso)
  return d >= monday && d < nextMonday
}

export function formatShortDate(iso) {
  return parseDate(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
}

export function formatLongDate(iso) {
  return parseDate(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

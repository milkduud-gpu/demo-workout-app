import { NavLink } from 'react-router-dom'

const icon = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const TABS = [
  {
    to: '/',
    label: 'Home',
    end: true,
    icon: (
      <svg viewBox="0 0 24 24" {...icon}>
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5.5 10v10h13V10" />
      </svg>
    ),
  },
  {
    to: '/log',
    label: 'Log',
    icon: (
      <svg viewBox="0 0 24 24" {...icon}>
        <path d="M3 9v6M6.5 6v12M17.5 6v12M21 9v6M6.5 12h11" />
      </svg>
    ),
  },
  {
    to: '/history',
    label: 'History',
    icon: (
      <svg viewBox="0 0 24 24" {...icon}>
        <path d="M4 12a8 8 0 1 0 2.6-5.9L4 8.5" />
        <path d="M4 4v4.5h4.5M12 8v4.5l3 2" />
      </svg>
    ),
  },
]

export default function TabBar() {
  return (
    <nav className="tabbar" aria-label="Main">
      <ul>
        {TABS.map((t) => (
          <li key={t.to}>
            <NavLink to={t.to} end={t.end} className="tab">
              {t.icon}
              {t.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

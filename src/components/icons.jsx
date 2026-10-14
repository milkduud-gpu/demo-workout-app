const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function Chevron({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  )
}

export function Trophy({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 3h10v2h3.5v2.2c0 2.3-1.7 4.2-4 4.6A5.5 5.5 0 0 1 13 14.9V17h3v2.5h1.5V22h-11v-2.5H8V17h3v-2.1a5.5 5.5 0 0 1-3.5-3.1c-2.3-.4-4-2.3-4-4.6V5H7V3Zm-1.5 4v.2c0 1 .6 1.8 1.5 2.2V7H5.5Zm13 0H17v2.4c.9-.4 1.5-1.2 1.5-2.2V7Z" />
    </svg>
  )
}

export function Trash({ className }) {
  return (
    <svg className={className} {...base} strokeWidth={2}>
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
    </svg>
  )
}

export function Plus({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function Close({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function Warning({ className }) {
  return (
    <svg className={className} {...base} strokeWidth={2.5}>
      <path d="M12 3 2.5 20h19L12 3ZM12 10v4.5M12 17.5v.01" />
    </svg>
  )
}

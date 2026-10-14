import { Link } from 'react-router-dom'
import { Back } from './icons.jsx'
import '../styles/detail.css'

export default function BackLink({ to, onClick, children }) {
  return (
    <Link className="back" to={to} onClick={onClick}>
      <Back />
      {children}
    </Link>
  )
}

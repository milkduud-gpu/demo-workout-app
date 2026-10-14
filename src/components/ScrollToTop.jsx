import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Route changes in an SPA keep the old scroll offset; start each page at the top.
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

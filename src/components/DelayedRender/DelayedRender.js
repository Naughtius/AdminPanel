import { useEffect, useState } from 'react'

/**
 * Позволяет рендерить `children` после указанной задержки
 */
const DelayedRender = ({ delay, children }) => {
  const [delayed, setDelayed] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), delay)
    return () => clearTimeout(timeout)
  }, [])

  return delayed ? null : <>{children}</>
}

export default DelayedRender

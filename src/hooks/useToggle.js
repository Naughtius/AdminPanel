import { useCallback, useRef, useState } from 'react'

const useToggle = (initialValue = false) => {
  const [, set] = useState(initialValue)
  const is = useRef(initialValue)

  const toggle = useCallback((value) => {
    is.current = typeof value === 'boolean' ? value : !is.current
    set(is.current)
  }, [])

  return [is.current, toggle]
}

export default useToggle

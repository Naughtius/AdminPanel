import { useEffect, useRef } from 'react'

/**
 * Хук, который запускается только при обновлении зависимостей
 */
const useUpdateEffect = (effect, deps) => {
  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
    } else {
      return effect()
    }
  }, deps)
}

export default useUpdateEffect

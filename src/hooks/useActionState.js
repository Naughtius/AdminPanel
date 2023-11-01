import { useState } from 'react'
import { message } from 'antd'

import useUpdateEffect from './useUpdateEffect'

/**
 * Регулирует работу actions в конкретном компоненте.
 * В state за один раз может быть только один action.
 * Должно помочь проще обрабатывать запросы, лучше управлять UX (блокирование),
 * регулировать вывод сообщений, избавляя от шаблонного кода
 */
const useActionState = (initialValue) => {
  const [currentAction, setAction] = useState(initialValue)

  const useActionEffect = ({
    loading,
    error,
    messageSuccess,
    messageError,
    onSuccess,
    onError,
    condition = true,
  }) => {
    useUpdateEffect(
      () => {
        if (!loading && condition) {
          setAction(initialValue)

          if (error) {
            if (
              messageError != null &&
              messageError !== '' &&
              typeof messageError !== 'boolean'
            ) {
              message.error(messageError)
            }

            if (typeof onError === 'function') {
              onError()
            }
          } else {
            if (
              messageSuccess != null &&
              messageSuccess !== '' &&
              typeof messageSuccess !== 'boolean'
            ) {
              message.success(messageSuccess)
            }

            if (typeof onSuccess === 'function') {
              onSuccess()
            }
          }
        }
      },
      // Нужно триггерить только когда меняется статус загрузки (loading)
      [loading]
    )
  }

  return { currentAction, setAction, useActionEffect }
}

export default useActionState

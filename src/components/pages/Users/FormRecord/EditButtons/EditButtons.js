import { useCallback, useMemo } from 'react'
import { Button, Popconfirm, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  CheckOutlined,
  LockOutlined,
  StopOutlined,
  UnlockOutlined,
} from '@ant-design/icons'

import { useActionState } from '@hooks/index'
import {
  selectBlockUserUpdateRequest,
  blockUserAction,
  disableUserAction,
  enableUserAction,
  unblockUserAction,
  selectDisableUserUpdateRequest,
  selectEnableUserUpdateRequest,
  selectUnblockUserUpdateRequest,
  getUserAction,
} from '@store/users'

const FormRecord = ({ id, data }) => {
  const dispatch = useDispatch()
  const { useActionEffect } = useActionState({
    type: '',
  })

  const [loadingBlock, errorBlock] = useSelector(selectBlockUserUpdateRequest)
  const [loadingUnblock, errorUnblock] = useSelector(
    selectUnblockUserUpdateRequest
  )
  const [loadingEnable, errorEnable] = useSelector(
    selectEnableUserUpdateRequest
  )
  const [loadingDisable, errorDisable] = useSelector(
    selectDisableUserUpdateRequest
  )

  const handleRefresh = useCallback(() => {
    dispatch(getUserAction(id))
  }, [dispatch, id])

  const handleBlock = useCallback(() => {
    dispatch(blockUserAction(id))
  }, [dispatch, id])

  const handleUnblock = useCallback(() => {
    dispatch(unblockUserAction(id))
  }, [dispatch, id])

  const handleEnable = useCallback(() => {
    dispatch(enableUserAction(id))
  }, [dispatch, id])

  const handleDisable = useCallback(() => {
    dispatch(disableUserAction(id))
  }, [dispatch, id])

  const disabledBtnBlock = useMemo(() => data?.blocked === 1, [data?.blocked])

  const disabledBtnDisable = useMemo(() => data?.enabled === 1, [data?.enabled])

  useActionEffect({
    loading: loadingBlock,
    error: errorBlock,
    messageError: (
      <>
        <span>Не удалось заблокировать пользователя:</span>
        <div>{errorBlock}</div>
      </>
    ),
    messageSuccess: <>Вы успешно заблокировали пользователя</>,
    onSuccess: handleRefresh,
  })

  useActionEffect({
    loading: loadingUnblock,
    error: errorUnblock,
    messageError: (
      <>
        <span>Не удалось разблокировать пользователя:</span>
        <div>{errorUnblock}</div>
      </>
    ),
    messageSuccess: <>Вы успешно разблокировали пользователя</>,
    onSuccess: handleRefresh,
  })

  useActionEffect({
    loading: loadingEnable,
    error: errorEnable,
    messageError: (
      <>
        <span>Не удалось активировать пользователя:</span>
        <div>{errorEnable}</div>
      </>
    ),
    messageSuccess: <>Вы успешно активировали пользователя</>,
    onSuccess: handleRefresh,
  })

  useActionEffect({
    loading: loadingDisable,
    error: errorDisable,
    messageError: (
      <>
        <span>Не удалось деактивировать пользователя:</span>
        <div>{errorDisable}</div>
      </>
    ),
    messageSuccess: <>Вы успешно деактивировали пользователя</>,
    onSuccess: handleRefresh,
  })

  return (
    <Space style={{ marginBottom: 30, display: 'flex' }}>
      <Popconfirm
        title="Точно заблокировать?"
        okText="Да"
        cancelText="Нет"
        onConfirm={handleBlock}
        disabled={disabledBtnBlock}
      >
        <Button
          title="Заблокировать"
          icon={<StopOutlined />}
          loading={loadingBlock}
          type="primary"
          danger
          disabled={disabledBtnBlock}
        >
          Заблокировать
        </Button>
      </Popconfirm>
      <Popconfirm
        title="Точно разблокировать?"
        okText="Да"
        cancelText="Нет"
        onConfirm={handleUnblock}
        disabled={!disabledBtnBlock}
      >
        <Button
          title="Разблокировать"
          icon={<CheckOutlined />}
          loading={loadingUnblock}
          type="primary"
          disabled={!disabledBtnBlock}
        >
          Разблокировать
        </Button>
      </Popconfirm>
      <Popconfirm
        title="Точно деактивировать?"
        okText="Да"
        cancelText="Нет"
        onConfirm={handleDisable}
        disabled={!disabledBtnDisable}
      >
        <Button
          title="Деактивировать"
          icon={<LockOutlined />}
          loading={loadingDisable}
          danger
          disabled={!disabledBtnDisable}
          style={{ marginLeft: 20 }}
        >
          Деактивировать
        </Button>
      </Popconfirm>
      <Popconfirm
        title="Точно активировать?"
        okText="Да"
        cancelText="Нет"
        onConfirm={handleEnable}
        disabled={disabledBtnDisable}
      >
        <Button
          title="Активировать"
          icon={<UnlockOutlined />}
          loading={loadingEnable}
          disabled={disabledBtnDisable}
        >
          Активировать
        </Button>
      </Popconfirm>
    </Space>
  )
}

export default FormRecord

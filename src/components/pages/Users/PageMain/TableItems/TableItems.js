import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Popconfirm, Space, Table, Tag } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'

import {
  getUsersAction,
  selectUsers,
  selectUsersGetRequest,
  deleteUserAction,
  selectUserDeleteRequest,
  selectUsersPagination,
} from '@store/users'
import EmptyText from '@components/EmptyText'
import CheckIcon from '@components/CheckIcon'
import { useActionState } from '@hooks/index'

import { sexLabels } from '../FilterForm/constants'

const defaultColumns = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Имя',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Пол',
    render: (_, { sex }) => sexLabels[sex[0]],
  },
  {
    title: 'Выбранный пол',
    render: (_, { sexChoice }) =>
      sexChoice.map((i) => <Tag key={i}>{sexLabels[i]}</Tag>),
  },
  {
    title: 'Telegram',
    dataIndex: 'telegram',
    key: 'telegram',
  },
  {
    title: 'Рейтинг',
    align: 'center',
    render: (_, { rating }) => rating?.popularity ?? '-',
  },
  {
    title: 'Дата рождения',
    dataIndex: 'birthDate',
    key: 'birthDate',
  },
  {
    title: 'Мин. возраст',
    dataIndex: 'minAge',
    key: 'minAge',
    align: 'center',
  },
  {
    title: 'Макс. возраст',
    dataIndex: 'maxAge',
    key: 'maxAge',
    align: 'center',
  },
  {
    title: 'Заблокировано',
    align: 'center',
    render: (_, { blocked }) => <CheckIcon action={blocked === 1} />,
  },
  {
    title: 'Активировано',
    align: 'center',
    render: (_, { enabled }) => <CheckIcon action={enabled === 1} />,
  },
  {
    title: 'Создано',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Обновлено',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
]

const TableItems = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { useActionEffect } = useActionState({
    type: '',
  })

  const data = useSelector(selectUsers)
  const [loading, error] = useSelector(selectUsersGetRequest)
  const [loadingDelete, errorDelete] = useSelector(selectUserDeleteRequest)
  const { page, totalItems } = useSelector(selectUsersPagination)

  const handleRefresh = useCallback(
    (values) => {
      dispatch(getUsersAction(values))
    },
    [dispatch]
  )

  const handleRemove = useCallback(
    (id) => {
      dispatch(deleteUserAction(id))
    },
    [dispatch]
  )

  const handleTableChange = useCallback(
    ({ current: currentPage }) => {
      handleRefresh({
        page: currentPage,
      })
    },
    [handleRefresh]
  )

  const columnsWithActions = useMemo(
    () => [
      {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        render: (_, { _id }) => (
          <Space>
            <Link to={`${pathname}/${_id}`}>
              <Button icon={<EyeOutlined />} />
            </Link>
            <Link to={`${pathname}/${_id}/edit`}>
              <Button icon={<EditOutlined />} />
            </Link>
            <Popconfirm
              title="Точно удалить?"
              okText="Да"
              cancelText="Нет"
              onConfirm={() => handleRemove(_id)}
            >
              <Button
                title="Удалить"
                type="primary"
                danger
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        ),
      },
      ...defaultColumns,
    ],
    [handleRemove, pathname]
  )

  useEffect(() => {
    handleRefresh()
  }, [handleRefresh])

  useActionEffect({
    loading: loadingDelete,
    error: errorDelete,
    messageError: (
      <>
        <span>Не удалось удалить пользователя:</span>
        <div>{errorDelete}</div>
      </>
    ),
    messageSuccess: <>Вы успешно удалили пользователя</>,
    onSuccess: handleRefresh,
  })

  return (
    <Table
      dataSource={data}
      columns={columnsWithActions}
      rowKey="_id"
      loading={loading}
      locale={{
        emptyText: (
          <EmptyText
            loading={loading}
            error={error}
            onRefresh={handleRefresh}
          />
        ),
      }}
      bordered
      onChange={handleTableChange}
      pagination={{
        position: ['topRight', 'bottomRight'],
        current: page,
        defaultPageSize: 20,
        total: totalItems,
        showSizeChanger: false,
      }}
      scroll={{ x: 2000 }}
    />
  )
}

export default TableItems

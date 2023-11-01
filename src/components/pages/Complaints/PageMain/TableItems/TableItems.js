import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Space, Table } from 'antd'

import {
  getComplaintsAction,
  selectComplaints,
  selectComplaintsGetRequest,
  selectComplaintsPagination,
} from '@store/complaints'
import EmptyText from '@components/EmptyText'
import ModalView from '../ModalView'

const defaultColumns = [
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    render: (_, data) => (
      <Space>
        <ModalView data={data} />
      </Space>
    ),
  },
  {
    title: 'Заголовок',
    dataIndex: 'title',
    key: 'title',
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
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
  },
]

const TableItems = () => {
  const dispatch = useDispatch()

  const data = useSelector(selectComplaints)
  const [loading, error] = useSelector(selectComplaintsGetRequest)
  const { page, totalItems } = useSelector(selectComplaintsPagination)

  const handleRefresh = useCallback(
    (values) => {
      dispatch(getComplaintsAction(values))
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

  useEffect(() => {
    handleRefresh()
  }, [handleRefresh])

  return (
    <Table
      dataSource={data}
      columns={defaultColumns}
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
    />
  )
}

export default TableItems

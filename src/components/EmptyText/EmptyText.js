import { useCallback } from 'react'
import { ReloadOutlined } from '@ant-design/icons'
import { Button, Empty } from 'antd'

import { EmptyTextError, EmptyTextInsideWrapper } from './styled'

const EmptyText = ({ loading, error, onRefresh, image, ...restProps }) => {
  const handleClick = useCallback(() => {
    if (typeof onRefresh === 'function') {
      onRefresh()
    }
  }, [onRefresh])

  return (
    <Empty
      image={image ?? Empty.PRESENTED_IMAGE_SIMPLE}
      {...restProps}
    >
      {loading ? null : (
        <EmptyTextInsideWrapper>
          {typeof error === 'string' && error !== '' ? (
            <EmptyTextError>{error}</EmptyTextError>
          ) : null}
          {typeof onRefresh === 'function' ? (
            <Button type="primary" onClick={handleClick}>
              <ReloadOutlined /> Обновить
            </Button>
          ) : null}
        </EmptyTextInsideWrapper>
      )}
    </Empty>
  )
}

export default EmptyText

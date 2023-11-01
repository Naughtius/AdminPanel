import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, Skeleton, Typography } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

import ResultStub from '@components/ResultStub'
import { getUserAction, selectUserGetRequest, selectUser } from '@store/users'
import PageContainer from '@components/PageContainer'
import { TransitionInDelayed, TransitionIn } from '@components/transition'
import { getInterestsAction, getLanguagesAction } from '@store/global'

import FormRecord from '../FormRecord'

const PageEdit = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const item = useSelector(selectUser)
  const [loading, error] = useSelector(selectUserGetRequest)

  const handleRefresh = useCallback(() => {
    dispatch(getUserAction(id))
    dispatch(getInterestsAction())
    dispatch(getLanguagesAction())
  }, [dispatch, id])

  useEffect(() => {
    handleRefresh()
  }, [handleRefresh])

  return (
    <PageContainer
      title={`Редактирование ${item?.fullName ?? ''}`}
      subtitle={
        <Typography.Text type="secondary">
          Редактирование данных пользователя
        </Typography.Text>
      }
      withBackLink
    >
      {loading ? (
        <TransitionIn>
          <Skeleton active />
        </TransitionIn>
      ) : error != null ? (
        <ResultStub
          error={error}
          extra={
            <Button
              type="primary"
              onClick={handleRefresh}
              icon={<ReloadOutlined />}
            >
              Обновить
            </Button>
          }
        />
      ) : item == null ? (
        <ResultStub title="Не найдено" error="404" />
      ) : (
        <TransitionInDelayed delay={100}>
          <FormRecord data={item} />
        </TransitionInDelayed>
      )}
    </PageContainer>
  )
}

export default PageEdit

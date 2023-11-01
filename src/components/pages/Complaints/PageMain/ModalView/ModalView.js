import { Button, Modal } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { useCallback, useMemo, useState } from 'react'

import { TextStyled, TitleStyled, WrapperStyled } from './styled'

const ModalView = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false)

  const { title, description, createdAt, updatedAt, _id } = useMemo(
    () => data,
    [data]
  )

  const handleVisible = useCallback(() => {
    setIsVisible(!isVisible)
  }, [isVisible])

  return (
    <>
      <Button onClick={handleVisible} icon={<EyeOutlined />} />
      <Modal
        open={isVisible}
        title={`Жалоба ${title}`}
        onCancel={handleVisible}
        destroyOnClose
        footer={[
          <Button key="cancel" onClick={handleVisible}>
            Закрыть
          </Button>,
        ]}
        centered
      >
        <WrapperStyled>
          <TitleStyled strong>Описание:</TitleStyled>
          <TextStyled>{description}</TextStyled>
          <TitleStyled strong>Создано:</TitleStyled>
          <TextStyled>{createdAt}</TextStyled>
          <TitleStyled strong>Обновлено:</TitleStyled>
          <TextStyled>{updatedAt}</TextStyled>
          <TitleStyled strong>ID:</TitleStyled>
          <TextStyled>{_id}</TextStyled>
        </WrapperStyled>
      </Modal>
    </>
  )
}

export default ModalView

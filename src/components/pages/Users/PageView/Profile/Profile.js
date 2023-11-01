import { Col, Image, Row, Space, Tag } from 'antd'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { last } from 'ramda'

import {
  selectUserImages,
  clearUserImages,
  getUserImagesAction,
} from '@store/users'
import CheckIcon from '@components/CheckIcon'

import { colSpan } from '../../constants'
import { TextStyled, TitleStyled } from './styled'
import { sexLabels } from '../../PageMain/FilterForm/constants'

const Profile = ({ data }) => {
  const dispatch = useDispatch()
  const userImages = useSelector(selectUserImages)

  const {
    fullName,
    email,
    phone,
    age,
    education,
    telegram,
    birthDate,
    sex,
    kids,
    maxAge,
    minAge,
    sexChoice,
    bio,
    employment,
    roles,
    languages,
    interests,
    createdAt,
    updatedAt,
    rating,
    location,
    height,
    enabled,
    blocked,
  } = useMemo(() => data, [data])

  useEffect(() => {
    const arr = data?.relationships?.images?.data?.map((item) =>
      last(item.id.split('/'))
    )
    dispatch(getUserImagesAction(arr))

    return () => {
      dispatch(clearUserImages())
    }
  }, [data, dispatch])

  return (
    <>
      {userImages && (
        <Space>
          {userImages.map((item) => (
            <Image width={200} src={item.source} key={item.uri} />
          ))}
        </Space>
      )}
      <Row gutter="15" style={{ marginTop: 30 }}>
        <Col {...colSpan}>
          <TitleStyled strong>Имя:</TitleStyled>
          <TextStyled>{fullName}</TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Email:</TitleStyled>
          <TextStyled>{email}</TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Телефон:</TitleStyled>
          <TextStyled>{phone}</TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Возраст:</TitleStyled>
          <TextStyled>{age}</TextStyled>
        </Col>
      </Row>
      <Row gutter="15" style={{ marginTop: 40 }}>
        <Col {...colSpan}>
          <TitleStyled strong>Образование:</TitleStyled>
          <TextStyled>{education}</TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Telegram:</TitleStyled>
          <TextStyled>{telegram}</TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Дата рождения:</TitleStyled>
          <TextStyled>{birthDate}</TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Пол:</TitleStyled>
          <TextStyled>{sexLabels[sex]}</TextStyled>
        </Col>
      </Row>
      <Row gutter="15" style={{ marginTop: 40 }}>
        <Col {...colSpan}>
          <TitleStyled strong>Дети:</TitleStyled>
          <TextStyled>{kids}</TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Макс. возраст:</TitleStyled>
          <TextStyled>{maxAge}</TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Мин. возраст:</TitleStyled>
          <TextStyled>{minAge}</TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Выбранный пол:</TitleStyled>
          <TextStyled>
            <Tag>{sexChoice?.map((el) => sexLabels[el])}</Tag>
          </TextStyled>
        </Col>
      </Row>
      <Row gutter="15" style={{ marginTop: 40 }}>
        <Col {...colSpan}>
          <TitleStyled strong>Биография:</TitleStyled>
          <TextStyled>{bio}</TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Работа:</TitleStyled>
          <TextStyled>{employment}</TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Роли:</TitleStyled>
          <TextStyled>
            {roles?.map((el) => (
              <Tag key={el}>{el}</Tag>
            ))}
          </TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Языки:</TitleStyled>
          <TextStyled>
            {languages?.map((el) => (
              <Tag key={el}>{el}</Tag>
            ))}
          </TextStyled>
        </Col>
      </Row>
      <Row gutter="15" style={{ marginTop: 40 }}>
        <Col {...colSpan}>
          <TitleStyled strong>Интересы:</TitleStyled>
          <TextStyled>
            {interests?.map((el) => (
              <Tag key={el}>{el}</Tag>
            ))}
          </TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Создано:</TitleStyled>
          <TextStyled>{createdAt}</TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Обновлено:</TitleStyled>
          <TextStyled>{updatedAt}</TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Рейтинг:</TitleStyled>
          <TextStyled>{rating?.popularity}</TextStyled>
        </Col>
      </Row>
      <Row gutter="15" style={{ marginTop: 40 }}>
        <Col {...colSpan}>
          <TitleStyled strong>Локация:</TitleStyled>
          <TextStyled>{location}</TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Высота:</TitleStyled>
          <TextStyled>{height}</TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Заблокировано:</TitleStyled>
          <TextStyled>
            <CheckIcon action={blocked === 1} />
          </TextStyled>
        </Col>
        <Col {...colSpan}>
          <TitleStyled strong>Активировано:</TitleStyled>
          <TextStyled>
            <CheckIcon action={enabled === 1} />
          </TextStyled>
        </Col>
      </Row>
    </>
  )
}

export default Profile

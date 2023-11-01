import { useCallback, useEffect, useMemo } from 'react'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { last } from 'ramda'

import { useActionState } from '@hooks/index'
import {
  selectUserUpdateRequest,
  updateUserAction,
  selectUserImages,
  clearUserImages,
  getUserImagesAction,
} from '@store/users'
import {
  fromEnumToSelectOptions,
  fromEntriesToSelectOption,
} from '@utils/transform-data'
import { selectInterests, selectLanguages } from '@store/global'

import { colSpan } from '../constants'
import { sexLabels } from '../PageMain/FilterForm/constants'
import EditButtons from './EditButtons'

const defaultValues = {
  fullName: '',
  email: '',
  phone: '',
  bio: '',
  telegram: '',
  age: '',
  deviceToken: '',
  languages: [],
}

const sexOptions = fromEnumToSelectOptions(sexLabels)

const FormRecord = ({ data, action }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { useActionEffect } = useActionState({
    type: '',
  })

  const userImages = useSelector(selectUserImages)
  const interests = useSelector(selectInterests)
  const languages = useSelector(selectLanguages)
  const [loading, error] = useSelector(selectUserUpdateRequest)

  const initialValues = useMemo(
    () =>
      data
        ? {
            ...data,
            sex: data.sex[0],
            birthDate: dayjs(data.birthDate),
            languages: data.languages ?? [],
            interests: data.interests ?? [],
          }
        : defaultValues,
    [data]
  )

  const interestsOptions = useMemo(
    () =>
      interests.map(({ title, name }) =>
        fromEntriesToSelectOption()([name, title])
      ),
    [interests]
  )

  const languagesOptions = useMemo(
    () =>
      languages.map(({ title, name }) =>
        fromEntriesToSelectOption()([name, title])
      ),
    [languages]
  )

  const handleFinishForm = useCallback(
    (values) => {
      const sendValues = {
        ...values,
        id: data?._id,
        sex: [values.sex],
        birthDate: dayjs(values.birthDate).format('YYYY-MM-DD'),
        min_age: values.minAge,
        max_age: values.maxAge,
        full_name: values.fullName,
      }
      dispatch(updateUserAction(sendValues))
    },
    [dispatch, data?._id]
  )

  useActionEffect({
    loading,
    error,
    messageError: (
      <>
        <span>Не удалось изменить пользователя:</span>
        <div>{error}</div>
      </>
    ),
    messageSuccess: <>Вы успешно изменили пользователя!</>,
  })

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
    <Form
      layout="vertical"
      form={form}
      initialValues={initialValues}
      onFinish={handleFinishForm}
    >
      <EditButtons action={action} id={data._id} data={data} />
      {userImages && (
        <Space>
          {userImages.map((item) => (
            <Image width={200} src={item.source} key={item.uri} />
          ))}
        </Space>
      )}
      <Row gutter="15" style={{ marginTop: 30 }}>
        <Col {...colSpan}>
          <Form.Item label="Имя" name="fullName">
            <Input />
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item label="E-mail" name="email">
            <Input />
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item label="Телефон" name="phone">
            <Input />
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item label="Возраст" name="age">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter="15">
        <Col {...colSpan}>
          <Form.Item label="Образование" name="education">
            <Input />
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item label="Telegram" name="telegram">
            <Input />
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item label="Дата рождения" name="birthDate">
            <DatePicker format="DD.MM.YYYY" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item label="Пол" name="sex">
            <Select showSearch>{sexOptions}</Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter="15">
        <Col {...colSpan}>
          <Form.Item label="Дети" name="kids">
            <Input />
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item label="Макс. возраст" name="maxAge">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item label="Мин. возраст" name="minAge">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item label="Выберите пол" name="sexChoice">
            <Select showSearch mode="multiple">
              {sexOptions}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter="15">
        <Col {...colSpan}>
          <Form.Item label="Биография" name="bio">
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item label="Работа" name="employment">
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item label="Роли" name="roles">
            <Select showSearch mode="multiple" />
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item label="Языки" name="languages">
            <Select showSearch mode="multiple">
              {languagesOptions}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter="15">
        <Col {...colSpan}>
          <Form.Item label="Интересы" name="interests">
            <Select showSearch mode="multiple">
              {interestsOptions}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col {...colSpan}>
          <Button htmlType="submit" type="primary" loading={loading}>
            Обновить
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default FormRecord

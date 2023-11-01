import { useCallback } from 'react'
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { authAction, selectAuthRequest } from '@store/auth'
import { useActionState } from '@hooks/index'

import { colSpan } from './constants'

const { Title } = Typography

const defaultValues = {
  email: '',
  password: '',
}

const FormRecord = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { useActionEffect } = useActionState({
    type: '',
  })
  const navigate = useNavigate()
  const [loading, error] = useSelector(selectAuthRequest)

  const handleFinishForm = useCallback(
    (values) => {
      dispatch(authAction(values))
    },
    [dispatch]
  )

  useActionEffect({
    loading,
    error,
    messageError: (
      <>
        <span>Не удалось авторизоваться:</span>
        <div>{error}</div>
      </>
    ),
    messageSuccess: <>Вы успешно авторизовались!</>,
    onSuccess: () => navigate('/admin/users'),
  })

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={defaultValues}
      onFinish={handleFinishForm}
    >
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col {...colSpan}>
          <Card>
            <Title level={3} style={{ marginTop: 0 }}>
              Авторизация
            </Title>
            <Form.Item label="E-mail" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Пароль" name="password">
              <Input.Password />
            </Form.Item>
            <Row justify="space-between" align="middle">
              <Col>
                <Button htmlType="submit" type="primary" loading={loading}>
                  Войти
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Form>
  )
}

export default FormRecord

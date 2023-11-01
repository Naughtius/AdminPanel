import { useCallback } from 'react'
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from 'antd'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { isEmpty } from 'ramda'

import { getUsersAction } from '@store/users'
import { fromEnumToSelectOptions } from '@utils/transform-data'
import { removeEmpty } from '@utils/other'

import { colSpan, sexLabels, statusLabels } from './constants'

const defaultValues = {
  fullName: '',
  email: '',
  telegram: '',
  status: '',
  sexChoice: [],
  birthDate: [],
  min_age: '',
  max_age: '',
  created_at: '',
  updated_at: '',
  blocked: false,
  enabled: false,
}

const { RangePicker } = DatePicker

const sexOptions = fromEnumToSelectOptions(sexLabels)
const statusOptions = fromEnumToSelectOptions(statusLabels)

const FilterForm = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const handleFinishForm = useCallback(
    ({ birthDate, created_at, updated_at, blocked, enabled, ...values }) => {
      const birthDateValues = !isEmpty(birthDate)
        ? {
            'birthDate[before]': dayjs(birthDate[0]).format('YYYY-MM-DD'),
            'birthDate[after]': dayjs(birthDate[1]).format('YYYY-MM-DD'),
          }
        : {}
      dispatch(
        getUsersAction({
          page: 1,
          ...removeEmpty(values),
          ...birthDateValues,
          created_at: created_at
            ? dayjs(created_at).format('YYYY-MM-DD')
            : undefined,
          updated_at: updated_at
            ? dayjs(updated_at).format('YYYY-MM-DD')
            : undefined,
          blocked: blocked ? 1 : 0,
          enabled: enabled ? 1 : 0,
        })
      )
    },
    [dispatch]
  )

  const handleResetForm = useCallback(() => {
    form.setFieldsValue(defaultValues)
    form.submit()
  }, [form])

  return (
    <Collapse
      items={[
        {
          key: '1',
          label: 'Фильтр',
          children: (
            <Form
              layout="vertical"
              form={form}
              initialValues={defaultValues}
              onFinish={handleFinishForm}
            >
              <Row gutter="15">
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
                  <Form.Item label="Telegram" name="telegram">
                    <Input />
                  </Form.Item>
                </Col>
                <Col {...colSpan}>
                  <Form.Item label="Выберите выбранный пол" name="sexChoice">
                    <Select showSearch mode="multiple">
                      {sexOptions}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter="15">
                <Col {...colSpan}>
                  <Form.Item label="Статус" name="status">
                    <Select showSearch>{statusOptions}</Select>
                  </Form.Item>
                </Col>
                <Col {...colSpan}>
                  <Form.Item name="birthDate" label="Дата рождения">
                    <RangePicker allowClear style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col {...colSpan}>
                  <Form.Item label="Мин. возраст" name="min_age">
                    <InputNumber style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col {...colSpan}>
                  <Form.Item label="Макс. возраст" name="max_age">
                    <InputNumber style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter="15">
                <Col {...colSpan}>
                  <Form.Item label="Создано" name="created_at">
                    <DatePicker allowClear style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col {...colSpan}>
                  <Form.Item name="updated_at" label="Обновлено">
                    <DatePicker allowClear style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col {...colSpan}>
                  <Space>
                    <Form.Item
                      label="Заблокированы"
                      name="blocked"
                      valuePropName="checked"
                    >
                      <Checkbox />
                    </Form.Item>
                    <Form.Item
                      label="Активированы"
                      name="enabled"
                      valuePropName="checked"
                    >
                      <Checkbox />
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
              <Space>
                <Button type="primary" htmlType="submit">
                  Применить
                </Button>
                <Button onClick={handleResetForm}>Сбросить</Button>
              </Space>
            </Form>
          ),
        },
      ]}
      style={{ marginBottom: 20 }}
    />
  )
}

export default FilterForm

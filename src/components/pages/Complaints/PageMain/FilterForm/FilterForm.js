import { useCallback } from 'react'
import { Button, Col, Collapse, DatePicker, Form, Row, Space } from 'antd'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { isEmpty } from 'ramda'

import { removeEmpty } from '@utils/other'
import { getComplaintsAction } from '@store/complaints'

import { colSpan } from './constants'

const defaultValues = {
  date: [],
}

const { RangePicker } = DatePicker

const FilterForm = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const handleFinishForm = useCallback(
    ({ date, ...values }) => {
      const birthDateValues = !isEmpty(date)
        ? {
            'date[before]': dayjs(date[0]).format('YYYY-MM-DD'),
            'date[after]': dayjs(date[1]).format('YYYY-MM-DD'),
          }
        : {}
      dispatch(
        getComplaintsAction({
          page: 1,
          ...removeEmpty(values),
          ...birthDateValues,
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
                  <Form.Item name="date" label="Дата">
                    <RangePicker allowClear style={{ width: '100%' }} />
                  </Form.Item>
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

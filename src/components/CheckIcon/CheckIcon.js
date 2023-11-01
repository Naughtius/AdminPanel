import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

const CheckIcon = ({ action }) =>
  action ? (
    <CheckCircleOutlined style={{ color: 'green' }} />
  ) : (
    <CloseCircleOutlined style={{ color: 'red' }} />
  )

export default CheckIcon

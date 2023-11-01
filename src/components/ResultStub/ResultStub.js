import { keys } from 'ramda'
import { Result } from 'antd'
import { IconMap } from 'antd/lib/result'

const isValuesIncludes = (objectOrArray, value) =>
  Object.values(objectOrArray).includes(value)

const statuses = [403, 404, 500, '403', '404', '500', ...keys(IconMap)]

const parseStatus = (value) => {
  const matched = /status\scode\s(\d{3})/i.exec(value)
  return matched?.[1]
}

const getStatus = (error) => {
  if (typeof error === 'number') {
    return 'error'
  }

  const value = parseStatus(error)

  return isValuesIncludes(statuses, value) ? value : 'error'
}

const ResultStub = ({ error, ...restProps }) => (
  <Result
    title={<>Не удалось получить данные</>}
    subTitle={isValuesIncludes(statuses, error) ? '' : error}
    status={isValuesIncludes(statuses, error) ? error : getStatus(error)}
    {...restProps}
  />
)

export default ResultStub

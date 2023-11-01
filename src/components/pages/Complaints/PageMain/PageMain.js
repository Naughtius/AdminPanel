import { Typography } from 'antd'

import FilterForm from './FilterForm'
import TableItems from './TableItems'

const PageMain = () => (
  <>
    <Typography.Title>Жалобы</Typography.Title>
    <FilterForm />
    <TableItems />
  </>
)

export default PageMain

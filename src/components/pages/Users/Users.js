import { Route, Routes } from 'react-router-dom'

import PageMain from './PageMain'
import PageEdit from './PageEdit'
import PageView from './PageView'

const Users = () => (
  <Routes>
    <Route index  element={<PageMain />} />
    <Route path="/:id" element={<PageView />} />
    <Route path="/:id/edit" element={<PageEdit />} />
  </Routes>
)

export default Users

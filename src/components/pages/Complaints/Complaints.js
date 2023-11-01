import { Route, Routes } from 'react-router-dom'

import PageMain from './PageMain'

const Complaints = () => (
  <Routes>
    <Route exact path="" element={<PageMain />} />
  </Routes>
)

export default Complaints

import { Routes, Route, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
// Components
import LayoutSidebar from '@components/LayoutSidebar'
// Store
import { selectIsAuth, signIn } from '@store/auth'
// Pages
import AuthPage from '@pages/AuthPage'
import UsersPage from '@pages/UsersPage'
import LogoutPage from '@pages/LogoutPage'
import ComplaintsPage from '@pages/ComplaintsPage'

const initialPath = '/admin/'

const Router = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      dispatch(signIn())
    } else {
      navigate('/admin')
    }
  }, [dispatch, navigate])

  return (
    <Routes>
      <Route path="admin" element={<AuthPage />} />
      {isAuth && (
        <Route
          element={
            <LayoutSidebar>
              <Outlet />
            </LayoutSidebar>
          }
          path="admin"
        >
          <Route path="users/*" element={<UsersPage />} />
          <Route path="complaints/*" element={<ComplaintsPage />} />
        </Route>
      )}
      <Route path={`${initialPath}logout`} element={<LogoutPage />} />
    </Routes>
  )
}

export default Router

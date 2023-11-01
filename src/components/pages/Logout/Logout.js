import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logout } from '@store/auth'

const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutAction = useCallback(() => {
    localStorage.removeItem('token')
    dispatch(logout())
    navigate('/')
  }, [navigate, dispatch])

  useEffect(() => {
    logoutAction()
  }, [logoutAction])

  return <div />
}

export default Logout

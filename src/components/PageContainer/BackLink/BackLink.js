import { useCallback } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import { BackLinkStyled, BackRouterLinkStyled } from './styled'

const BackLink = ({ to }) => {
  const navigate = useNavigate()

  const handleClickGoBack = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      navigate(-1)
    },
    [navigate]
  )

  const icon = <ArrowLeftOutlined title="Назад" />

  return to !== undefined ? (
    <BackRouterLinkStyled to={to}>{icon}</BackRouterLinkStyled>
  ) : (
    <BackLinkStyled onClick={handleClickGoBack}>{icon}</BackLinkStyled>
  )
}

export default BackLink

import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

export const BackLinkStyled = styled.a`
  color: black;
  margin-right: 20px;
`

export const BackRouterLinkStyled = BackLinkStyled.withComponent(Link)

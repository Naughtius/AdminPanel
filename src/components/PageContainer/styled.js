import styled from '@emotion/styled'

export const PageContainerSection = styled.section`
  width: 100%;
  padding: ${(p) => (p.paddingNoHorizontal ? '20px 0' : '0')};
`

export const PageContainerHeader = styled.div`
  display: flex;
`

export const PageContainerBody = styled.div`
  margin-top: 25px;
`

import BackLink from './BackLink'
import {
  PageContainerSection,
  PageContainerHeader,
  PageContainerBody,
} from './styled'

const PageContainer = ({
  title,
  subtitle,
  headerLevel = 1,
  children,
  withBackLink = false,
  backLinkTo,
  paddingNoHorizontal = false,
}) => {
  const CustomHeader = `h${headerLevel}`
  const CustomSubHeader = `h${headerLevel >= 6 ? 6 : headerLevel + 1}`
  const buttonBackLink = withBackLink ? <BackLink to={backLinkTo} /> : null

  return (
    <PageContainerSection paddingNoHorizontal={paddingNoHorizontal}>
      <PageContainerHeader>
        <CustomHeader>
          {buttonBackLink}
          {title}
        </CustomHeader>
      </PageContainerHeader>
      {subtitle == null || subtitle === '' || subtitle === false ? null : (
        <PageContainerHeader>
          <CustomSubHeader>{subtitle}</CustomSubHeader>
        </PageContainerHeader>
      )}
      <PageContainerBody>{children}</PageContainerBody>
    </PageContainerSection>
  )
}

export default PageContainer

import { some } from 'lodash'
import styled from 'styled-components'
import { COLORS } from '@tourlane/tourlane-ui'
import { ArrowRightIcon } from 'components/Icon'
import { Link as RouteLink } from 'react-router-dom'

const StyledNav = styled.nav`
  font-size: 18px;
  font-family: 'Source Sans Pro', sans-serif;
  display: flex;
  align-items: center;
`

const Link = styled(RouteLink)`
  &,
  &:visited {
    color: inherit;
    text-decoration: none;
  }
  &:hover,
  &:focus,
  &:active {
    color: ${COLORS.ADVENTURE_GREEN_FOCUSED};
  }
`

const StyledArrow = styled(ArrowRightIcon)`
  display: inline-block;
  vertical-align: text-bottom;
  position: relative;
  width: 18px;
  height: 20px;
`
/**
 * Breadcrumb
 *
 * @param {Object} breadcrumb ({ text: String, url: String })
 * @param {Boolean} idLast
 */
const Breadcrumb = ({ breadcrumb, isLast }) =>
  isLast ? (
    <strong>{breadcrumb.text}</strong>
  ) : (
    <>
      <Link to={breadcrumb.url}>{breadcrumb.text}</Link>
      <StyledArrow />
    </>
  )

const Breadcrumbs = ({ className, breadcrumbs }) => (
  <StyledNav className={className}>
    {some(breadcrumbs) &&
      breadcrumbs.map((breadcrumb, index) => (
        <Breadcrumb
          data-test={`breadcrumb-${breadcrumb}`}
          key={`breadcrumb-${index}`}
          breadcrumb={breadcrumb}
          isLast={index === breadcrumbs.length - 1}
        />
      ))}
  </StyledNav>
)

export default Breadcrumbs

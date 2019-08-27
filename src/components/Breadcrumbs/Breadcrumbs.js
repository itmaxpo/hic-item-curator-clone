import React, { Fragment } from 'react'
import { some } from 'lodash'
import styled from 'styled-components'
import { MEDIA, COLORS } from '@tourlane/tourlane-ui'
import { ArrowRightIcon } from 'components/Icon'

const StyledNav = styled.nav`
  font-size: 14px;
  ${MEDIA.only.xl`
    font-size: 16px;
  `}
`

const Link = styled.a`
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
  margin-left: 2px;
  margin-right: 2px;
  top: 3px;
  position: relative;

  ${MEDIA.only.xl`
    width: 18px;
    height: 18px;
  `}
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
    <Fragment>
      <Link href={breadcrumb.url}>{breadcrumb.text}</Link>
      <StyledArrow />
    </Fragment>
  )

/**
 * Breadcrumbs
 *
 * @param {Array<{ text: String, url: String }>} breadcrumbs
 */
const Breadcrumbs = ({ className, breadcrumbs }) => (
  <StyledNav className={className}>
    {some(breadcrumbs) &&
      breadcrumbs.map((breadcrumb, index) => (
        <Breadcrumb
          key={`breadcrumb-${index}`}
          breadcrumb={breadcrumb}
          isLast={index === breadcrumbs.length - 1}
        />
      ))}
  </StyledNav>
)

export default Breadcrumbs

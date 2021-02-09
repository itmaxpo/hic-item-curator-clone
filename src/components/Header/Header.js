import React from 'react'
import { Link } from 'react-router-dom'
import HeaderContentWrapper from '../AppContainer'
import { StyledHeader, StyledLogoSvg, HeaderWrapper } from './styles'

/**
 * Will render Logo and return all {children} that
 * will go after logo in header
 *
 * @name BaseHeader
 * @param {props} { children }
 */
let BaseHeader = ({ children }) => {
  return (
    <StyledHeader id={'sticky-header'}>
      <HeaderWrapper>
        <Link to={'/'} data-test="app-icon">
          <StyledLogoSvg>Item Curator</StyledLogoSvg>
        </Link>
        <HeaderContentWrapper>{children}</HeaderContentWrapper>
      </HeaderWrapper>
    </StyledHeader>
  )
}

export default BaseHeader

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

/**
 * This is global Header component for the whole app
 * Has 2 parts
 *
 * @name Header
 * @param
 */
const Header = ({ children }) => <BaseHeader>{children}</BaseHeader>

export default Header

import React from 'react'
import { Link } from 'react-router-dom'
import { Flex } from '@tourlane/tourlane-ui'
import HeaderContentWrapper from '../AppContainer'
import { LeftRightWrapper, StyledHeader, StyledLogoSvg } from './styles'

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
      <Flex>
        <Link to={'/'}>
          <StyledLogoSvg>Item Curator</StyledLogoSvg>
        </Link>
        <HeaderContentWrapper>{children}</HeaderContentWrapper>
      </Flex>
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
const Header = () => {
  return (
    <BaseHeader>
      {/* Specific layout for header: left and right parts */}
      <LeftRightWrapper alignItems="center" justify="between">
        {/* Left part of the header centered after logo */}
        <Flex alignItems="center"></Flex>
        {/* Right part of the header */}
        <div></div>
      </LeftRightWrapper>
    </BaseHeader>
  )
}

export default Header

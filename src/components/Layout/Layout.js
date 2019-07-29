import React from 'react'
import styled from 'styled-components'
import { Flex } from '@tourlane/tourlane-ui'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import AppContainer from 'components/AppContainer'

const BelowHeader = styled(Flex)`
  min-width: 1250px;
  margin-top: 68px;
`

/**
 * Returns Header and everything BelowHeader
 * BelowHeader:
 *  - Sidebar
 *  - Page content
 *
 * @name Layout
 * @param {props} props
 */
const Layout = ({ className, children }) => {
  return (
    <>
      <Header />
      <BelowHeader>
        <Sidebar />
        <AppContainer className={className}>{children}</AppContainer>
      </BelowHeader>
    </>
  )
}

export default Layout

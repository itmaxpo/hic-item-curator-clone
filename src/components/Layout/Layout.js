import React from 'react'
import styled from 'styled-components'
import { Flex } from '@tourlane/tourlane-ui'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import AppContainer from 'components/AppContainer'

const BelowHeader = styled(Flex)`
  min-width: 1250px;
`

/**
 * Returns Header and everything BelowHeader
 * BelowHeader:
 *  - Sidebar
 *  - Page content
 *
 * @name Layout
 * @param {Object} history
 */
const Layout = ({ className, children }) => {
  return (
    <div className={'page'}>
      <Header />
      <BelowHeader>
        <Sidebar />
        <AppContainer className={className}>{children}</AppContainer>
      </BelowHeader>
    </div>
  )
}

export default Layout

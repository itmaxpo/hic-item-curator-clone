import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Flex } from '@tourlane/tourlane-ui'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import AppContainer from 'components/AppContainer'

const BelowHeader = styled(Flex)`
  min-width: 1250px;
`

interface Props {
  headerContent?: ReactNode
  className?: string
  children?: ReactNode
}

const Layout = ({ className, children, headerContent }: Props) => (
  <div className="page">
    <Header>{headerContent}</Header>
    <BelowHeader>
      {/* @ts-ignore */}
      <Sidebar />
      <AppContainer className={className}>{children}</AppContainer>
    </BelowHeader>
  </div>
)

export default Layout

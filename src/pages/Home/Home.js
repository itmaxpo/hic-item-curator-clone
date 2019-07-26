import React from 'react'
import { Subline } from '@tourlane/tourlane-ui'
import { SecondaryLink } from 'components/Link'
import styled from 'styled-components'
import LayoutSingleCard from 'components/Layout'

const StyledSubline = styled(Subline)`
  & {
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: 600;
  }
`

const StyledSecondaryLink = styled(SecondaryLink)`
  margin-top: 20px;
  width: 100%;
`

const Home = () => {
  return (
    <LayoutSingleCard>
      {/* <StyledLogo>Gecko</StyledLogo> */}
      <StyledSubline>This is Item Curator, Tourlane’s new item manager.</StyledSubline>

      <StyledSecondaryLink to={'/'}>Go to ... here actually</StyledSecondaryLink>
    </LayoutSingleCard>
  )
}

export default Home

import React from 'react'
import styled from 'styled-components'
import { FlexContainer, Card, H3, Subline } from '@tourlane/tourlane-ui'

export const Wrapper = styled.div`
  && {
    height: 520px;
    margin: 20px 90px;
  }
`

const StyledCard = styled(Card)`
  height: 100%;
`

const StyledFlexContainer = styled(FlexContainer)`
  height: 100%;
`

export const CreateBoxContainer = props => (
  <StyledCard>
    <StyledFlexContainer px={2.5} py={1.7} {...props} />
  </StyledCard>
)

const StyledInputContainer = styled(FlexContainer)`
  width: 420px;
`

export const InputContainer = props => <StyledInputContainer p={0} mr={2.5} {...props} />

const StyledMapContainer = styled(FlexContainer)`
  height: 381px;
  width: 660px;
  flex: 1;
  > div {
    height: 100%;
    width: 100%;
  }
`

export const MapContainer = props => <StyledMapContainer p={0} {...props} />

export const Title = styled(H3)`
  margin-bottom: 20px;
`

export const Location = styled(Subline)`
  && {
    font-size: 22px;
    line-height: 32px;
  }
`

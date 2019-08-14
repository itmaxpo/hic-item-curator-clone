import React from 'react'
import { COLORS, FlexContainer, Button } from '@tourlane/tourlane-ui'
import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: 100vh;
`

const StyledSearchBoxContainer = styled(FlexContainer)`
  height: 285px;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 rgba(63, 65, 68, 0.3);
  background-color: ${COLORS.BACKGROUND_GRAY};
`

export const SearchBoxWrapper = ({ children }) => (
  <StyledSearchBoxContainer p={3 / 4}>{children}</StyledSearchBoxContainer>
)

export const CreateNewItemWrapper = styled(FlexContainer)`
  border-top: 1px solid ${COLORS.LINE_GRAY};
  padding-bottom: 80px !important;

  > p {
    font-size: 22px;
    font-weight: 600;
    line-height: 1.45;
  }
`

export const CreateButton = styled(Button)``

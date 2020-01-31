import React from 'react'
import { COLORS, FlexContainer, Skeleton } from '@tourlane/tourlane-ui'
import styled from 'styled-components'
import Loader from 'components/Loader'
import { ACCOMMODATION_ITEM_TYPE } from 'utils/constants'

export const Wrapper = styled.div`
  min-height: 80vh;
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

export const StyledLoader = styled(Loader)`
  && {
    height: 200px;
    position: relative;
  }
`

const LoaderWrapper = styled.div`
  margin: 20px 90px 0 90px;
`

export const SearchBoxLoader = ({ category }) => (
  <LoaderWrapper>
    <Skeleton
      height={category ? (category === ACCOMMODATION_ITEM_TYPE ? '518px' : '418px') : '302px'}
    />
  </LoaderWrapper>
)

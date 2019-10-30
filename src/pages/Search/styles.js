import React from 'react'
import { COLORS, FlexContainer, Button, Skeleton } from '@tourlane/tourlane-ui'
import styled from 'styled-components'
import { SadFaceIcon } from 'components/Icon'
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

export const CreateNewItemWrapper = styled(FlexContainer)`
  padding-bottom: 80px !important;
  > p {
    font-family: 'Source Sans Pro', sans-serif !important;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.45;
    color: ${COLORS.NIGHTINGALE_BLACK};
  }
`

export const SadFaceIconWrapper = styled(SadFaceIcon)`
  margin-top: 40px;
`

export const CreateButton = styled(Button)``

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
    <Skeleton height={category === ACCOMMODATION_ITEM_TYPE ? '518px' : '418px'} />
  </LoaderWrapper>
)

import React from 'react'
import styled from 'styled-components'
import Loader from 'components/Loader'
import ClipLoader from 'react-spinners/ClipLoader'
import { COLORS } from '@tourlane/tourlane-ui'

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`

export const Preloader = () => (
  <Loader>
    <ClipLoader color={COLORS.ADVENTURE_GREEN} />
  </Loader>
)

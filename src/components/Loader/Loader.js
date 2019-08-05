import React from 'react'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { COLORS } from '@tourlane/tourlane-ui'
import { LoaderContainer } from './styles'

const Loader = () => {
  return (
    <LoaderContainer center>
      <PacmanLoader color={COLORS.ADVENTURE_GREEN} />
    </LoaderContainer>
  )
}

export default Loader
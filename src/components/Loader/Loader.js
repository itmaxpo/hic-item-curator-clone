import React from 'react'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { COLORS } from '@tourlane/tourlane-ui'
import { LoaderContainer } from './styles'

const Loader = ({ className, children, top, ...rest }) => {
  return (
    <LoaderContainer className={`${className} loader`} center top={top} {...rest}>
      {children ? children : <PacmanLoader color={COLORS.ADVENTURE_GREEN} />}
    </LoaderContainer>
  )
}

export default Loader

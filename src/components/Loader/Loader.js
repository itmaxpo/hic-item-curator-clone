import React from 'react'
import { Loader as TUILoader } from '@tourlane/tourlane-ui'
import { LoaderContainer } from './styles'

const Loader = ({ className, children, top, ...rest }) => {
  return (
    <LoaderContainer className={`${className} loader`} center top={top} {...rest}>
      {children ? children : <TUILoader size={48} />}
    </LoaderContainer>
  )
}

export default Loader

import React, { ReactNode, FC } from 'react'
import { Loader as TUILoader } from '@tourlane/tourlane-ui'
import { LoaderContainer } from './styles'

interface ILoader {
  className?: string
  children?: ReactNode
  top?: string | number
}
const Loader: FC<ILoader> = ({ className, children, top, ...rest }: ILoader) => {
  return (
    <LoaderContainer className={`${className} loader`} center top={top} {...rest}>
      {children ? children : <TUILoader size={48} />}
    </LoaderContainer>
  )
}

export default Loader

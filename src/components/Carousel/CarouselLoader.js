import React from 'react'
import ReactDOM from 'react-dom'
import { Overlay } from './styles'

const CarouselLoader = () => ReactDOM.createPortal(<Overlay />, document.body)

export default CarouselLoader

import { Component } from 'react'
import { createPortal } from 'react-dom'
import { MAP } from 'react-google-maps/lib/constants'
import { object } from 'prop-types'
/**
 * This Component for add custom control to map
 * (map.controls[position].push(component))
 * NOTE:
 * Can ref to map through context in constructor (or this.context expect contructor)
 * Use constructor to add div and render will createPortal
 */
export default class MapControl extends Component {
  static defaultProps = {
    children: [],
    className: ''
  }

  static contextTypes = { [MAP]: object }

  constructor(props, context) {
    super(props)

    this.map = context[MAP]
    this.controlDiv = document.createElement('div')
    this.divIndex = this.map.controls[this.props.position].length
    this.map.controls[props.position].push(this.controlDiv)
    this.controlDiv.addEventListener('click', this.clickHandler)
  }

  clickHandler = () => {
    this.props.onClick && this.props.onClick(this.map)
  }

  componentWillUnmount() {
    // Google map detached faster then component unmounting happens
    if (this.controlDiv.removeEventListener('click', this.clickHandler)) {
      this.map.controls[this.props.position].removeAt(this.divIndex)
      this.controlDiv.removeEventListener('click', this.clickHandler)
    }
  }

  render() {
    const { className } = this.props

    if (className) {
      className.split(' ').forEach(name => {
        this.controlDiv.classList.add(name)
      })
    }

    return createPortal(this.props.children, this.controlDiv)
  }
}

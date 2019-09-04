import React, { Component } from 'react'
import styled from 'styled-components'
import { ProgressButton as TuiProgressButton } from '@tourlane/tourlane-ui'

import Stack from './Stack'

const StyledProgressButton = styled(TuiProgressButton)`
  width: 100%;

  button {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    padding: 0px;
    height: 48px;
    flex: 1;
  }
`

const initialState = {
  progress: 0
}

/**
 * ProgressButton
 *
 * Render a button that, when clicked, renders a fake progress bar that slowly increments.
 * This is used to show UI feedback on long tasks.
 */
class ProgressButtonWithSwitch extends Component {
  static defaultProps = {
    uploadTime: 2000,
    label: 'Search',

    // 'isButton' | 'isLoading' | 'isComplete'
    // When the state is "isComplete", the progress bur jumps to 100%.
    state: 'isButton',

    // called when the button is clicked
    onButtonClick: () => {},

    // called when the loading animation starts
    onLoadingStart: () => {},

    // called when the complete animation ends
    onCompleteAnimationEnd: () => {}
  }

  state = initialState

  componentDidUpdate(prevProps) {
    const changedToButton = this.props.state === 'isButton' && prevProps.state !== 'isButton'
    const changedToLoading = this.props.state === 'isLoading' && prevProps.state !== 'isLoading'
    const changedToComplete = this.props.state === 'isComplete' && prevProps.state !== 'isComplete'

    if (changedToButton) {
      if (this.stack) {
        this.stack.abort()
      }
      this.setState(initialState)
    }

    if (changedToLoading) {
      this.startProgressAnimation()
    }

    if (changedToComplete) {
      this.stack.abort()
      this.setState({ progress: 100 })
      setTimeout(() => {
        this.setState(initialState)
        this.props.onCompleteAnimationEnd()
      }, 500)
    }
  }

  componentWillUnmount() {
    if (this.stack) {
      this.stack.abort()
    }
  }

  startProgressAnimation = () => {
    const { onLoadingStart, uploadTime } = this.props

    this.stack = new Stack()

    this.stack
      .do(onLoadingStart)
      .do(() => this.setState({ progress: 0 }))
      .wait(uploadTime / 4)
      .do(() => this.setState({ progress: 25 }))
      .wait(uploadTime / 4)
      .do(() => this.setState({ progress: 50 }))
      .wait(uploadTime / 4)
      .do(() => this.setState({ progress: 75 }))
      .wait(uploadTime / 4)
      .do(() => this.setState({ progress: 90 }))
      .run()
  }

  render() {
    const { progress } = this.state
    const { label, onButtonClick, className, disabled } = this.props

    return (
      <StyledProgressButton
        className={className}
        progress={progress}
        onButtonClick={onButtonClick}
        disabled={disabled}
      >
        {label}
      </StyledProgressButton>
    )
  }
}

export default ProgressButtonWithSwitch

import React, { useState } from 'react'
import { ButtonWithProgressBar } from '@tourlane/tourlane-ui'
import { ButtonWrapper } from './styles'

/**
 * ProgressButton
 *
 * Render a button that, when clicked, renders a fake progress bar that slowly increments.
 * This is used to show UI feedback on long tasks.
 */
const ProgressButton = ({ label, onButtonClick, disabled, isLoading }) => {
  // eslint-disable-next-line
  const [progress, setProgress] = useState(0)

  const mockUpload = (progress = 20) => {
    const delay = 2000 / 4
    setProgress(progress)
    setTimeout(
      () => {
        if (progress >= 100) {
          setProgress(0)
        } else {
          mockUpload(progress + 20)
        }
      },
      progress >= 100 ? 400 : delay
    )
  }

  const onButtonClickHandler = () => {
    mockUpload()
    onButtonClick()
  }

  return (
    <ButtonWrapper>
      <ButtonWithProgressBar
        disabled={disabled}
        isLoading={isLoading}
        onClick={onButtonClickHandler}
        fullWidth
      >
        {label}
      </ButtonWithProgressBar>
    </ButtonWrapper>
  )
}

export default ProgressButton

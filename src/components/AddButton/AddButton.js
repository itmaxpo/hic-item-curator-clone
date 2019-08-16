import { AddIcon } from 'components/Icon'
import React from 'react'
import CircleButton from 'components/CircleButton'

const AddButton = ({ onAddClick, visibleOnHover, className, tooltipText = 'Add Day' }) => {
  return (
    <CircleButton
      className={className}
      onClick={onAddClick}
      visibleOnHover={visibleOnHover}
      tooltipText={tooltipText}
    >
      <AddIcon />
    </CircleButton>
  )
}

export default AddButton

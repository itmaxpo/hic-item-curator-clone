import React from 'react'
import Popover from '@material-ui/core/Popover'
import { ChevronDown } from 'components/Icon'

export const Popup = ({ id, children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const idShown = open ? id : undefined

  return (
    <div>
      <ChevronDown onClick={handleClick} />
      <Popover
        id={idShown}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClick={handleClose}
      >
        {children}
      </Popover>
    </div>
  )
}

export default Popup

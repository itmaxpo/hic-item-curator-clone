import React from 'react'
import styled from 'styled-components'
import { SvgIcon } from '@tourlane/tourlane-ui'

import { ReactComponent as AlertSvg } from 'icons/alert.svg'
import { ReactComponent as CloseSvg } from 'icons/close.svg'
import { ReactComponent as LightCloseSvg } from 'icons/lightclose.svg'
import { ReactComponent as DeleteSvg } from 'icons/delete.svg'
import { ReactComponent as PlusSvg } from 'icons/plus.svg'
import { ReactComponent as CopySvg } from 'icons/copy.svg'
import { ReactComponent as LogoutSvg } from 'icons/logout.svg'
import { ReactComponent as MenuSvg } from 'icons/menu.svg'
import { ReactComponent as SearchSvg } from 'icons/magnifier.svg'
import { ReactComponent as EditSvg } from 'icons/edit.svg'
import { ReactComponent as ChevronRightSvg } from 'icons/chevronRight.svg'
import { ReactComponent as ChevronLeftSvg } from 'icons/chevronLeft.svg'

const StyledSvgIcon = styled(SvgIcon)`
  display: flex;
  cursor: pointer;

  & svg {
    height: auto;
    width: auto;
  }
`

const AlertIcon = props => (
  <StyledSvgIcon alt="alert" {...props}>
    <AlertSvg />
  </StyledSvgIcon>
)

const LightCloseIcon = props => (
  <StyledSvgIcon alt="close" {...props}>
    <LightCloseSvg />
  </StyledSvgIcon>
)

const CloseIcon = props => (
  <StyledSvgIcon alt="close" {...props}>
    <CloseSvg />
  </StyledSvgIcon>
)

const AddIcon = props => (
  <StyledSvgIcon alt="add" {...props}>
    <PlusSvg />
  </StyledSvgIcon>
)

const DeleteIcon = props => (
  <StyledSvgIcon alt="delete" {...props}>
    <DeleteSvg />
  </StyledSvgIcon>
)

const EditIcon = props => (
  <StyledSvgIcon alt="edit" {...props}>
    <EditSvg />
  </StyledSvgIcon>
)

const CopyIcon = props => (
  <StyledSvgIcon alt="copy" {...props}>
    <CopySvg />
  </StyledSvgIcon>
)

const LogoutIcon = props => (
  <StyledSvgIcon alt="logout" {...props}>
    <LogoutSvg />
  </StyledSvgIcon>
)

const SearchIcon = props => (
  <StyledSvgIcon alt="search" {...props}>
    <SearchSvg />
  </StyledSvgIcon>
)

const MenuIcon = props => (
  <StyledSvgIcon alt="menu" {...props}>
    <MenuSvg />
  </StyledSvgIcon>
)

const ChevronRightIcon = props => (
  <StyledSvgIcon alt="chevron-right" {...props}>
    <ChevronRightSvg />
  </StyledSvgIcon>
)

const ChevronLeftIcon = props => (
  <StyledSvgIcon alt="chevron-left" {...props}>
    <ChevronLeftSvg />
  </StyledSvgIcon>
)

export {
  AlertIcon,
  LightCloseIcon,
  CloseIcon,
  AddIcon,
  DeleteIcon,
  EditIcon,
  CopyIcon,
  LogoutIcon,
  SearchIcon,
  MenuIcon,
  ChevronLeftIcon,
  ChevronRightIcon
}

import React, { useState } from 'react'
import { Slide } from '@material-ui/core'

import { MenuIcon, ChevronLeftIcon, LogoutIcon, SearchIcon } from 'components/Icon'
import {
  StyledSidebar,
  StyledCircleButton,
  StyledSubline,
  SidebarMenu,
  LogoutContainer
} from './styles'
import { useAuth0 } from 'contexts/Auth/AuthProvider'

/**
 * Renders block with next behaviour:
 *  - if expanded false - renders provided icon
 *  - if expanded true - renders block with provided inofrmation
 *
 * @name SidebarMenu
 * @param {Boolean} expanded
 */
const Sidebar = ({ expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded)
  const { logout } = useAuth0()

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    })

  return (
    <>
      {!isExpanded && (
        <StyledCircleButton
          id={'not-expanded-button'}
          isExpanded={isExpanded}
          visibleOnHover={false}
          onClick={() => {
            setIsExpanded(!isExpanded)
          }}
        >
          <MenuIcon />
        </StyledCircleButton>
      )}
      <Slide direction="right" in={isExpanded} mountOnEnter unmountOnExit>
        <StyledSidebar>
          {isExpanded && (
            <StyledCircleButton
              isExpanded={isExpanded}
              visibleOnHover={false}
              onClick={() => {
                setIsExpanded(!isExpanded)
              }}
            >
              <ChevronLeftIcon />
            </StyledCircleButton>
          )}
          <SidebarMenu>
            <a href={'https://gecko.tlservers.com/search'}>
              <SearchIcon />
              <StyledSubline>Gecko</StyledSubline>
            </a>
          </SidebarMenu>
          <LogoutContainer>
            <LogoutIcon onClick={() => logoutWithRedirect({})} />
            <StyledSubline>Log out</StyledSubline>
          </LogoutContainer>
        </StyledSidebar>
      </Slide>
    </>
  )
}

export default Sidebar

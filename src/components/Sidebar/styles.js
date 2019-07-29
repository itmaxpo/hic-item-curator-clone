import styled, { css } from 'styled-components'
import { Flex, COLORS, Subline } from '@tourlane/tourlane-ui'
import CircleButton from 'components/CircleButton'
import { BaseLink } from 'components/Link/Link'

export const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  color: ${COLORS.INACTIVE_GRAY};
  background: ${COLORS.BACKGROUND_GRAY};
  box-shadow: 1px 0 4px 0 rgba(63, 65, 68, 0.3);
  width: 148px;
  height: calc(100vh - 68px);
  position: fixed;
  top: 68px;
  left: 0;
  padding: 30px 0;
  z-index: 3;
`

export const StyledCircleButton = styled(CircleButton)`
  z-index: 3;
  ${({ isExpanded }) =>
    isExpanded
      ? css`
          position: absolute;
          top: 24px;
          right: -12px;
        `
      : css`
          position: fixed;
          top: 92px;
          left: -2px;
        `}
`

export const LogoutContainer = styled(Flex)`
  position: absolute;
  left: 25px;
  bottom: 80px;
`

export const StyledSubline = styled(Subline)`
  display: inline-block;
  margin-left: 5px;
  margin-top: 2px;
  && {
    font-size: 16px;
    line-height: 1.44;
  }
`

export const SidebarMenu = styled.ul`
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  padding: 0;
  margin: 0 30px 0 30px;
`

export const MenuItem = styled.li`
  width: 100%;
  list-style-type: none;
`

export const StyledLink = styled(BaseLink)`
  display: flex;
  flex-direction: row;
  text-decoration: none;
`

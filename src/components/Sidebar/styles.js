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
  width: 90px;
  height: 100vh;
  top: 0;
  padding: 20px 0 30px 0;
  position: sticky;
  left: 0;
  z-index: 3;
`

export const StyledCircleButton = styled(CircleButton)`
  z-index: 100;
  position: absolute;
  top: 143px;

  ${({ isExpanded }) =>
    isExpanded
      ? css`
          top: 75px;
          right: -14px;
        `
      : css`
          left: -2px;
        `}
`

export const LogoutContainer = styled(Flex)`
  position: absolute;
  bottom: 80px;
  padding: 0 5px;
`

export const StyledSubline = styled(Subline)`
  display: inline-block;
  margin-left: 5px;
  margin-top: 4px;
  && {
    font-size: 12px;
    line-height: 1.44;
  }
`

export const SidebarMenu = styled.ul`
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  padding: 60px 0;
  margin: 0 5px 0 5px;

  > a {
    text-decoration: none;

    > span {
      float: left;
    }
  }
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

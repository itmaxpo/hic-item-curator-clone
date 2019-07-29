import styled from 'styled-components'
import { COLORS, Flex } from '@tourlane/tourlane-ui'
import { ReactComponent as LogoSvg } from 'icons/itemCuratorLogo.svg'

export const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 68px;
  min-width: 1250px;
  background: ${COLORS.BACKGROUND_GRAY};
  box-shadow: 0 1px 4px 0 rgba(63, 65, 68, 0.3);
  z-index: 31;
  pointer-events: ${({ canDrop }) => canDrop && 'none'};
`

export const LeftRightWrapper = styled(Flex)`
  padding: 0 20px 0 100px;
  height: 100%;
`

export const StyledLogoSvg = styled(LogoSvg)`
  padding: 0 20px;
`

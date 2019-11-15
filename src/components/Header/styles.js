import styled from 'styled-components'
import { COLORS } from '@tourlane/tourlane-ui'
import { ReactComponent as LogoShortSvg } from 'icons/itemCuratorLogoShort.svg'

export const StyledHeader = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 68px;
  width: 100%;
  z-index: 3;
  background: ${COLORS.BACKGROUND_GRAY};
  box-shadow: 0 1px 4px 0 rgba(63, 65, 68, 0.3);
  pointer-events: ${({ canDrop }) => canDrop && 'none'};
  transition: all 0.5s ease-out;
`

export const StyledLogoSvg = styled(LogoShortSvg)`
  padding: 10px 20px;
`

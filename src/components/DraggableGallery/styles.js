import styled from 'styled-components'
import Sortable from 'react-sortablejs'
import { COLORS } from '@tourlane/tourlane-ui'

export const ItemList = styled(Sortable)`
  display: flex
  flex-wrap: wrap
  list-style-type: none;

  > li  {
    width: 25%;
    padding: 20px;
    box-sizing: border-box;

    &.blue-background-class {
      background-color: ${COLORS.ADVENTURE_GREEN}
      opacity: 0.5
    }
  }
`

export const Item = styled.li``

export const ImgWrapper = styled.img`
  max-width: 100%;
  max-height: 170px;
  border-radius: 4px;
  // Uncomment this if we need image to fit full width & height of parent block
  // object-fit: contain;
`

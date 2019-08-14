import styled, { css } from 'styled-components'
import Sortable from 'react-sortablejs'
import { COLORS } from '@tourlane/tourlane-ui'

const galleryItems = css`
  display: flex
  flex-wrap: wrap
  list-style-type: none;

  > li  {
    width: 23%;
    padding: 10px 1%;

    &.blue-background-class {
      background-color: ${COLORS.ADVENTURE_GREEN}
      opacity: 0.5
    }
  }
`

export const ItemList = styled(Sortable)`
  ${galleryItems}
`

export const GalleryList = styled.div`
  ${galleryItems}
`

export const Item = styled.li``

export const ImgWrapper = styled.img`
  max-width: 100%;
  max-height: 170px;
  border-radius: 4px;
  // Uncomment this if we need image to fit full width & height of parent block
  // object-fit: contain;
`

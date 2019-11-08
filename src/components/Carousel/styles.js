import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog'
import { ImagesCarousel } from '@tourlane/tourlane-ui'
import ResizedImage from 'components/ResizedImage'

export const StyledDialog = styled(Dialog)`
  && {
    > div {
      background-color: rgba(0, 0, 0, 0.55);
    }
  }
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  z-index: 100;
  height: 200vh;
  width: 100%;
  opacity: 1;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: rgba(0, 0, 0, 0.55);
`

export const StyledCloseContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 16px;
`

export const StyledImagesCarousel = styled(ImagesCarousel)`
  background-color: black;
  width: 900px;
  height: 600px;
  text-align: center;
`

export const ImgWrapper = styled(ResizedImage)`
  border-radius: 4px;
  position: relative;
  top: 300px;
  transform: translateY(-50%);
`

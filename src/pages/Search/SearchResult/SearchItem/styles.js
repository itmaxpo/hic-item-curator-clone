import styled from 'styled-components'
import { FlexContainer, Checkbox, COLORS, Subline, Base } from '@tourlane/tourlane-ui'
import { UnhappyIcon } from 'components/Icon'

export const SearchItemWrapper = styled(FlexContainer)`
  margin-bottom: 20px;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 rgba(63, 65, 68, 0.3);
  background-color: ${COLORS.SENSATION_WHITE};
  transition: box-shadow 0.5s ease-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 17px 0 rgba(63, 65, 68, 0.3);
    transition: box-shadow 0.5s ease-out;
  }
`

export const SearchItemCheckbox = styled(Checkbox)`
  margin-top: 4px;
`

export const SearchItemBodyWrapper = styled(FlexContainer)`
  && {
    flex-grow: 2;
    margin-right: 30px;
    margin-left: 10px;
    position: relative;
  }
`

export const ContentContainer = styled(FlexContainer)`
  flex-grow: 2;
  margin-right: 18px !important;
  position: relative;
`

export const ItemTitle = styled(Subline)`
  margin-top: 2px;
  font-size: 22px !important;
`

export const ItemSubtitle = styled(Base)`
  margin-top: 0;
  margin-bottom: 10px;
  color: ${COLORS.INACTIVE_GRAY};
  font-weight: bold;
`

export const ItemDescription = styled.div`
  margin-top: 0;
  margin-bottom: 10px;
  color: ${COLORS.NIGHTINGALE_BLACK};
`

export const BadgeWrapper = styled.div`
  position: absolute;
  top: -2px;
  right: 12px;
  font-weight: 600;
`

export const SearchItemPhotosWrapper = styled(FlexContainer)`
  width: 280px;
  height: 170px;
  position: relative;
  flex-shrink: 0;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 rgba(63,65,68,0.3);}

  ${({ isEmpty }) =>
    isEmpty
      ? `
        background-color: ${COLORS.BACKGROUND_GRAY};
        `
      : ''}
`

export const BadgeWrapperPhoto = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
`

export const ImgWrapper = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 4px;
  // Uncomment this if we need image to fit full width & height of parent block
  // object-fit: contain;
`

export const StyledUnhappyIcon = styled(UnhappyIcon)`
  margin: auto;
`

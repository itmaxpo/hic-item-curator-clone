import styled from 'styled-components'
import { FlexContainer, Flex, Checkbox, COLORS, Subline, Base } from '@tourlane/tourlane-ui'
import { UnhappyIcon } from 'components/Icon'
import ResizedImage from 'components/ResizedImage'

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

  ${({ isMerged }) =>
    isMerged
      ? `
          border-bottom: 4px solid ${COLORS.ADVENTURE_GREEN};
        `
      : ''}
`

export const SearchItemCheckbox = styled(Checkbox)`
  margin-top: 4px;
`

export const SearchItemContentContainer = styled(Flex)`
  width: 100%;
`

export const SearchItemInfoWrapper = styled(FlexContainer)`
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

export const StyledResizedImage = styled(ResizedImage)`
  border-radius: 4px;
`

export const StyledUnhappyIcon = styled(UnhappyIcon)`
  margin: auto;
`

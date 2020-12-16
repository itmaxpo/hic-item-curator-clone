import styled from 'styled-components'
import { FlexContainer, Flex, COLORS, Subline, Base } from '@tourlane/tourlane-ui'
import { Link } from 'react-router-dom'

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

export const ItemTitleWrapper = styled(Flex)`
  margin-top: 2px;
`

export const ItemTitle = styled(Subline)`
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

export const StyledResizedImage = styled(ResizedImage)`
  border-radius: 4px;
`

// since this is rendered as parent of a FlexContainer, setting width to 100%
export const UnstyledLink = styled(Link)`
  width: 100%;
  text-decoration: none;
`

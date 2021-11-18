import React from 'react'
import styled, { css } from 'styled-components'
import Sortable from 'react-sortablejs'
import { COLORS, Big, FlexContainer, Checkbox } from '@tourlane/tourlane-ui'
import LinearProgress from '@material-ui/core/LinearProgress'
import ResizedImage from 'components/ResizedImage'

export const GalleryWrapper = styled(FlexContainer)`
  background-color: ${COLORS.BACKGROUND_GRAY};
  min-height: 205px;
  border-radius: 4px;
  padding: 20px 0 0 0 !important;
  margin-top: 20px !important;
  position: relative;
`

export const StyledBadge = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 0 8px;
  border-radius: 14px;
  z-index: 2;
  height: 21px;
  background-color: ${COLORS.SENSATION_WHITE};
  font-family: 'Source Sans Pro', sans-serif;
  font-family: 'Source Sans Pro', sans-serif;
  text-align: center;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 21px;
  letter-spacing: normal;
`

const galleryItems = (isAllShown) => css`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  justify-content: 'left';
  width: 98%;
  padding: 20px 0 20px 0;

  ${!isAllShown &&
  `
    justify-content: left;
    max-height: 300px;
    overflow: hidden;
    transform: rotate(0);
    transition: all .1s linear;
  `}

  > li {
    width: 180px;
    height: 110px;
    margin: 20px 20px;
    max-height: 110px;
    border-radius: 4px;
    background-color: ${COLORS.LINE_GRAY};
  }
`

export const DeleteIconWrapper = styled.div`
  position: absolute;
  top: 25px;
  left: 20px;

  svg > path {
    fill: ${COLORS.ELEMENT_GRAY};
  }
`

export const ItemWrapper = styled.div`
  position: relative;
  height: 110px;
`

export const ProgressWrapper = styled.div`
  padding: 0 10%;
  margin-top: 31%;
`

export const ProgressBar = () => (
  <LinearProgress
    style={{
      height: 8,
      borderRadius: 4
    }}
  />
)

export const ItemList = styled(Sortable)`
  ${({ isAllShown }) => galleryItems(isAllShown)}
`

export const GalleryList = styled.div`
  ${({ isAllShown }) => galleryItems(isAllShown)}
`

export const Item = styled.li`
  position: relative;
`

export const CoverImageBlock = styled.div`
  position: absolute;
  top: -30px;
  left: -10px;
  text-align: center;
  width: 200px;
  height: 152px;
  font-size: 18px;
  color: ${COLORS.INACTIVE_GRAY};
  // border: 1.5px dashed ${COLORS.ELEMENT_GRAY};
  font-family: 'Source Sans Pro', sans-serif;
  text-shadow: 0 0 0 ${COLORS.INACTIVE_GRAY};
  padding-top: 4px;

  background: linear-gradient(to right, ${COLORS.ELEMENT_GRAY} 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(${COLORS.ELEMENT_GRAY} 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(to right, ${COLORS.ELEMENT_GRAY} 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(${COLORS.ELEMENT_GRAY} 50%, rgba(255, 255, 255, 0) 0%);
  background-position: top, right, bottom, left;
  background-repeat: repeat-x, repeat-y;
  background-size: 10px 1px, 1px 10px;
`

export const CheckboxWrapper = styled(Checkbox)`
  position: absolute;
  left: calc(100% - 34px);
  top: 10px;
  z-index: 10;
`

export const ImgWrapperHoveredBlock = styled.div`
  position: absolute;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  width: 180px;
  height: 110px;
  border-radius: 4px;

  > div {
    width: 100%;
    height: 100%;
  }

  > div > p {
    position: relative;
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    top: 37.5%;
    color: ${COLORS.SENSATION_WHITE};

    &:hover {
      cursor: pointer;
    }
  }
`

export const ImgWrapper = styled(ResizedImage)`
  border-radius: 4px;

  ${({ isVisible }) =>
    isVisible &&
    `
      border-bottom: 4px solid ${COLORS.ADVENTURE_GREEN};
    `}
`

export const GalleryTitle = styled(Big)`
  text-align: center;
  color: ${COLORS.INACTIVE_GRAY};
`

export const PlaceholderText = styled(Big)`
  color: ${COLORS.INACTIVE_GRAY};
  margin: 90px auto;
`

export const BottomLine = styled.hr`
  width: 100%;
  height: 6px;
  box-sizing: border-box;
  border-color: transparent;
  margin-top: 20px;
  margin-bottom: 0;
  border-radius: 4px;
  border-bottom: 4px solid ${COLORS.ADVENTURE_GREEN};
`

export const ToggleAll = styled.div`
  background-color: ${COLORS.LINE_GRAY};
  font-family: 'Source Sans Pro', sans-serif;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  width: 125px;
  color: ${COLORS.NIGHTINGALE_BLACK};
  padding: 6px 28px;
  border-radius: 21px;
  position: relative;

  > [alt='chevron-down'] {
    position: absolute;
    top: 3px;
    right: 15px;

    &:hover {
      cursor: pointer;
    }
  }

  ${({ isAllShown }) =>
    isAllShown &&
    `
    > [alt="chevron-down"] {
      transform: rotate(180deg);
      transition: all .1s linear;
    }
    `}
`

export const ToggleWrapper = styled(FlexContainer)`
  && {
    margin-bottom: 20px;
    padding-bottom: 20px;
    cursor: pointer;
  }
`

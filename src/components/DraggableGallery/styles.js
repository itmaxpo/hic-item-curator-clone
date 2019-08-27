import React from 'react'
import styled, { css } from 'styled-components'
import Sortable from 'react-sortablejs'
import { COLORS, Big, FlexContainer, Checkbox } from '@tourlane/tourlane-ui'
import LinearProgress from '@material-ui/core/LinearProgress'

export const GalleryWrapper = styled(FlexContainer)`
  background-color: ${COLORS.BACKGROUND_GRAY};
  min-height: 205px;
  border-radius: 4px;
  padding: 20px 1% 0 1px !important;
  margin-top: 20px !important;
  position: relative;

  ${({ isVisible, disabled }) =>
    isVisible && !disabled && `border: 1px dashed ${COLORS.ELEMENT_GRAY}`}
`

const galleryItems = css`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0 10px;
  width: 98%;

  > li {
    width: 18%;
    height: 110px;
    margin: 20px 1%;
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
  ${galleryItems}
`

export const GalleryList = styled.div`
  ${galleryItems}
  padding: 20px 1% 20px 1px !important;

  ${({ isAllShown }) =>
    !isAllShown &&
    `
    max-height: 300px;
    overflow: hidden;
    transform: rotate(0);
    transition: all .1s linear;
  `}
`

export const Item = styled.li`
  position: relative;
`

export const CoverImageBlock = styled.div`
  position: absolute;
  top: -25%;
  left: -6%;
  text-align: center;
  width: 110%;
  height: 146px;
  color: ${COLORS.INACTIVE_GRAY};
  border: 1px dashed ${COLORS.INACTIVE_GRAY};
  font-family: 'Source Sans Pro';
  font-weight: bold;
  padding-top: 5px;
`

export const CheckboxWrapper = styled(Checkbox)`
  position: relative;
  left: calc(100% - 34px);
  top: 10px;
`

export const ImgWrapperHoveredBlock = styled.div`
  position: absolute;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 110px;
  border-radius: 4px;

  > p {
    position: relative;
    text-align: center;
    font-weight: 600;
    top: 40px;
    color: ${COLORS.SENSATION_WHITE};

    &:hover {
      cursor: pointer;
    }
  }
`

export const ImgWrapper = styled.img`
  max-width: 100%;
  max-height: 110px;
  border-radius: 4px;

  ${({ isVisible }) =>
    isVisible &&
    `
    border-bottom: 4px solid ${COLORS.ADVENTURE_GREEN};
  `} // Uncomment this if we need image to fit full width & height of parent block
  // object-fit: contain;
`

export const GalleryTitle = styled(Big)`
  text-align: center;
  color: ${COLORS.INACTIVE_GRAY};

  ${({ isVisible }) => isVisible && `margin-bottom: 20px`}
`

export const PlaceholderText = styled(Big)`
  padding: 90px 0;
  color: ${COLORS.INACTIVE_GRAY};
`

export const BottomLine = styled.hr`
  width: 101%;
  height: 6px;
  box-sizing: border-box;
  border-color: transparent;
  margin-top: 20px;
  margin-bottom: 0;
  border-radius: 4px;
  border-bottom: 4px solid ${COLORS.ADVENTURE_GREEN};
`

export const ToggleAll = styled.div`
  position: absolute;
  bottom: 0;
  left: 44.555555%;
  background-color: ${COLORS.LINE_GRAY};
  font-family: 'Source Sans Pro', sans-serif;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  width: 105px;
  color: ${COLORS.NIGHTINGALE_BLACK};
  padding: 6px 28px;
  border-radius: 21px;

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
    bottom: 25px;

    > [alt="chevron-down"] {
      transform: rotate(180deg);
      transition: all .1s linear;
    }
    `}
`

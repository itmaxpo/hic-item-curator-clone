import React from 'react'
import styled, { css } from 'styled-components'
import BeatLoader from 'react-spinners/BeatLoader'
import { COLORS, DropdownSelect, TextField, FlexContainer, Flex } from '@tourlane/tourlane-ui'

export const Wrapper = styled.div`
  margin: 30px 90px;
  color: ${COLORS.NIGHTINGALE_BLACK};
`

export const ActiveWrapper = styled.div`
  > div {
    height: 26px;
    padding: 0;
  }

  && h4 {
    font-size: 10px;
    color: ${COLORS.SENSATION_WHITE};
    font-weight: bold;
  }
`

export const ActiveTitleWrapper = styled(FlexContainer)`
  > span {
    position: relative;
    top: 5px;
    margin-left: 10px;

    svg path {
      fill: ${COLORS.ADVENTURE_GREEN};
    }
  }

  > input {
    margin-left: 20px;
  }
`

export const CheckboxWrapper = styled(FlexContainer)`
  font-weight: 600;

  > span {
    position: relative;
    top: 3px;
    margin-left: 10px;
  }
`

export const TitleWrapper = styled.div`
  position: relative;
  z-index: 2; // Needed for dropdowm to overlap

  h2 {
    margin: 20px 0 10px 0;
  }

  p {
    font-weight: 600;
    color: ${COLORS.ELEMENT_GRAY};
  }
`

export const SupplierDropdown = styled(DropdownSelect)`
  width: 580px;
  margin-bottom: 20px;
  background-color: ${COLORS.SENSATION_WHITE}
  z-index: 2;
`

export const TitleField = styled(TextField)`
  width: 580px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-right: 20px;
  font-family: PlayfairDisplay, serif;
`

export const TitleLangWrapper = styled(FlexContainer)`
  font-family: 'Source Sans Pro', sans-serif;
`

export const LanguageDropdown = styled.select`
  border-width: 0;
  width: 50px;
  background-color: 0;
`

export const LanguageBlock = styled(FlexContainer)`
  font-family: "Source Sans Pro", sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.44;
  color: ${COLORS.ELEMENT_GRAY};
  margin-top: -5px;

  p {
    display: inline-block;
    margin-right: 10px;
  }

  .MuiSelect-icon {
    width: 20px;
    color: ${COLORS.ELEMENT_GRAY}
  }

  .MuiInput-root {
    // font-weight: normal !important;
    font-family: "Source Sans Pro", sans-serif;
  }

  ${({ isEditing }) =>
    isEditing &&
    css`
      margin-top: -20px;
    `}

  .MuiSelect-selectMenu {
    position: relative;
    padding: 15px 20px 5px 5px;
    top: -1px;

    &:hover {
      border-bottom: 2px solid ${COLORS.ADVENTURE_GREEN}
      padding-bottom: 3px;
    }
  }

  .MuiSelect-select:focus {
    background-color: transparent;
  }
`

const LoaderWrapper = styled.div`
  height: 23px;
`
export const BreadcrumbsLoader = () => (
  <LoaderWrapper>
    <BeatLoader size="9" margin="2px" color={COLORS.ADVENTURE_GREEN_FOCUSED} />
  </LoaderWrapper>
)

export const MissingNameWrapper = styled(Flex)`
  align-items: flex-end;

  > div {
    margin-left: 10px;
    width: auto;
    > div {
      width: 48px !important;
      height: 48px !important;
      padding: 0 !important;
      position: relative;
    }
  }
`

export const BreadcrumbsWrapper = styled.div`
  height: 23px;
`

export const TabsPanelWrapper = styled.div`
  padding-top: 40px;
  margin-top: 35px;
  box-shadow: 0 1px 4px 0 rgba(63, 65, 68, 0.3);
`

import styled, { css } from 'styled-components'
import { COLORS, DropdownSelect, TextField, FlexContainer } from '@tourlane/tourlane-ui'

export const Wrapper = styled.div`
  margin: 30px 90px;
  color: ${COLORS.NIGHTINGALE_BLACK};
`

export const StyledP = styled.p`
  height: 19px;
  margin: 0;
  padding: 0;
`

export const TitleWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  z-index: 2; // Needed for dropdowm to overlap

  ${({ isEditing }) =>
    isEditing
      ? css`
          max-height: 160px; // Needed for animation
          transition: max-height 0.5s ease-out;
        `
      : css`
          max-height: 100px; // Needed for animation
        `}

  h2 {
    margin: 20px 0 10px 0;
  }

  p {
    font-weight: 600;
    color: ${COLORS.ELEMENT_GRAY};
  }
`

export const SupplierDropdown = styled(DropdownSelect)`
  width: 780px;
  margin-bottom: 20px;
  background-color: ${COLORS.SENSATION_WHITE}
  z-index: 2;
`

export const TitleField = styled(TextField)`
  width: 780px;
  margin-bottom: 20px;
  margin-top: 20px;
  font-family: PlayfairDisplay, serif;
`

export const TitleLangWrapper = styled(FlexContainer)`
  font-family: SourceSansPro;
`

export const LanguageDropdown = styled.select`
  border-width: 0;
  width: 50px;
  background-color: 0;
`

export const LanguageBlock = styled.div`
  font-family: SourceSansPro;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.44;
  color: ${COLORS.ELEMENT_GRAY};
  margin-top: -5px;

  p {
    display: inline-block;
  }

  .MuiSelect-icon {
    width: 20px;
    color: ${COLORS.ELEMENT_GRAY}
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

import styled, { css } from 'styled-components'
import { COLORS, DropdownSelect, TextField, FlexContainer } from '@tourlane/tourlane-ui'
import { Breadcrumbs } from '@material-ui/core'

export const Wrapper = styled.div`
  min-height: 100vh;
  margin: 20px 90px;
  color: ${COLORS.NIGHTINGALE_BLACK};
`

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  font-family: SourceSansPro;
  li:last-child > p {
    font-weight: bold;
  }
`

export const TitleWrapper = styled.div`
  position: relative;
  z-index: 2; // Needed for dropdowm to overlap

  ${({ isEditing }) =>
    isEditing
      ? css`
          max-height: 160px; // Needed for animation
          transition: max-height 0.5s ease-out;
        `
      : css`
          transition: max-height 0.5s ease-out;
          max-height: 100px; // Needed for animation
        `}

  h1 {
    font-family: PlayfairDisplay;
    font-size: 42px;
    font-weight: bold;
    line-height: 1.29;
    color: ${COLORS.NIGHTINGALE_BLACK};
    margin: 0;
    padding: 0;
  }

  p {
    font-family: SourceSansPro;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.44;
    color: ${COLORS.ELEMENT_GRAY};
    padding: 0 0 20px 0;
    margin: 0;
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

  .MuiSelect-icon {
    width: 20px;
    color: ${COLORS.ELEMENT_GRAY}
  }

  &.editing {
    margin-top: -20px;

    .MuiInputBase-root {
      top: 3px;
    }
  }

  .MuiInputBase-root {
    position: relative;
    top: 2.5px;
  }

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

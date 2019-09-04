import React from 'react'
import {
  COLORS,
  FlexContainer,
  H3,
  DropdownSelect as TUIDropdown,
  TextField,
  Subline
} from '@tourlane/tourlane-ui'
import styled from 'styled-components'
import ProgressButton from 'components/ProgressButton'

const StyledSearchBoxContainer = styled(FlexContainer)`
  min-height: 274px;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 rgba(63, 65, 68, 0.3);
  background-color: ${COLORS.BACKGROUND_GRAY};
`

const Wrapper = styled.div`
  margin: 20px 90px 0 90px;
`

export const SearchBoxWrapper = ({ children }) => (
  <Wrapper>
    <StyledSearchBoxContainer pt={3 / 4} pb={2} direction="ttb">
      {children}
    </StyledSearchBoxContainer>
  </Wrapper>
)

export const SearchBoxTitle = styled(H3)`
  width: 100%;
  height: 36px;
  text-align: center;
`

const StyledSubline = styled(Subline)`
  && {
    margin-bottom: 4px;
    font-size: 18px;
    line-height: 26px;
  }
`

const StyledDropdown = styled(TUIDropdown)`
  width: 360px;

  ${({ renderMarginRight }) => renderMarginRight && `margin-right: 20px;`}
  ${({ renderMarginBottom }) => renderMarginBottom && `margin-bottom: 20px;`}
`

const StyledTextField = styled(TextField)`
  width: 360px;
`

const DropdownContainer = styled.div`
  ${({ hidden }) => hidden && `display: none`}
`

export const Dropdown = ({ label, hidden, ...rest }) => (
  <DropdownContainer hidden={hidden}>
    <StyledSubline>{label}</StyledSubline>
    <StyledDropdown isClearable {...rest} />
  </DropdownContainer>
)

export const NameField = ({ label, ...rest }) => (
  <div>
    <StyledSubline>{label}</StyledSubline>
    <StyledTextField {...rest} />
  </div>
)

export const Search = ({ destination, ...rest }) => (
  <ProgressButton {...rest} label={destination ? `Go to ${destination}` : 'Search'} />
)

export const CategoryCardsWrapper = styled(FlexContainer)`
  && {
    width: 460px;
    align-self: center;
  }
`

export const SearchWrapper = styled(FlexContainer)`
  min-height: 48px;
  min-width: 360px;
  align-self: center;
`

export const SearchFieldsWrapper = styled(FlexContainer)`
  align-self: center;
  max-width: 740px;
`

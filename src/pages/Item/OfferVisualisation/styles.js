import styled from 'styled-components'
import { FlexContainer, COLORS, Flex } from '@tourlane/tourlane-ui'

export const TitleWithContent = styled.div`
  margin-bottom: 40px;
  padding: 0 60px;
  font-family: SourceSansPro;
  position: relative;

  ${({ withoutPadding }) => withoutPadding && `padding: 0 0;`}

  > h4 {
    color: #3f4144;
    margin-bottom: 20px;

    ${({ withoutPadding }) => withoutPadding && `padding: 0 60px;`}
  }
`

export const MapWrapper = styled.div`
  height: 500px;
  padding-bottom: 60px;
`

export const SearchItemWrapper = styled(FlexContainer)`
  border-top: 1px solid ${COLORS.LINE_GRAY};
  background-color: ${COLORS.SENSATION_WHITE};
  font-family: 'Source Sans Pro', serif;
  font-size: 20px;
  padding: 40px 60px !important;

  &:last-child {
    border-bottom: 1px solid ${COLORS.LINE_GRAY};
  }
`

export const LatLonWrapper = styled(FlexContainer)`
  > div {
    width: 48%;
  }
`

export const PhoneWrapper = styled.div`
  flex-grow: 1;
  margin-left: 4%;
`

export const PhoneBlock = styled(Flex)`
  width: 36%;
`

export const AddressBlock = styled(FlexContainer)`
  width: 36%;
`

export const NoLocationWrapper = styled(FlexContainer)`
  height: 100%;
`

export const CountryCodeWrapper = styled(Flex)`
  > div:first-child {
    min-width: 132px;
  }
`

import styled from 'styled-components'
import { Flex, COLORS } from '@tourlane/tourlane-ui'
import RichTextEditor from 'components/RichTextEditor'

export const Wrapper = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 20px;
`

export const StyledCollapse = styled.div`
  text-align: left;
  border-bottom: 1px solid ${COLORS.LINE_GRAY};
  oberflow: hidden;

  &:first-child {
    border-top: 1px solid ${COLORS.LINE_GRAY};
  }

  padding: ${({ spacing }) => {
    if (spacing === 'M') return '40px 60px;'
    else return '20px'
  }};
`

export const StyledHeader = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  text-align: left;
  font-size: 22px;
  font-weight: 600;
  border-radius: 0;
  outline: none;
  border-width: 0;

  > span {
    transition: transform 0.25s ease-out;
  }

  &:hover {
    cursor: pointer;
  }
`

export const StyledBody = styled.div``

export const BadgeContainer = styled.div`
  display: flex;
  height: 22px;
  margin-left: 20px;
  justify-content: center;
  border-radius: 10px;
  padding: 0 2px 0 5px;
  background-color: ${({ color }) => {
      switch (color) {
        case 'red':
          return COLORS.RIOJA_RED
        case 'green':
          return COLORS.ADVENTURE_GREEN
        default:
          return COLORS.ELEMENT_GRAY
      }
    }}
    > span {
    text-transform: uppercase;
    font-family: Montserrat;
    font-size: 10px;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: 2.86px;
    text-align: center;
    color: ${COLORS.SENSATION_WHITE};
  }
`

export const StyledRichTextEditor = styled(RichTextEditor)`
  height: 100%;

  > div {
    height: 100%;
  }

  > div > div {
    height: 100%;
  }
`

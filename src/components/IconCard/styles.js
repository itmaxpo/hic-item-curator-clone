import styled from 'styled-components'
import { Card, Subline, COLORS } from '@tourlane/tourlane-ui'

export const Wrapper = styled.div`
  min-width: 140px;
  height: 90px;
  cursor: pointer;
`

export const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  box-sizing: border-box;
  border-bottom: solid 5px ${({ selected }) => (selected ? COLORS.ADVENTURE_GREEN : 'transparent')};

  && * {
    margin: 0 auto;
  }

  && > span {
    margin-top: 10px;
    width: 24px;
    height: 24px;

    &[alt='flag'] {
      position: relative;
      left: 10px;
      top: 2.5px;
    }
  }

  > p {
    position: relative;
    top: 5px;
  }
`

export const StyledSubline = styled(Subline)`
  & {
    font-size: 16px;
    line-height: 26px;
  }
`

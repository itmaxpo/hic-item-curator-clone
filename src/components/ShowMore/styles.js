import styled from 'styled-components'
import { COLORS } from '@tourlane/tourlane-ui'

export const ButtonWrapper = styled.span`
  font-weight: 600;
  font-size: 18px;
  
  > button {
    padding: 0;
    margin-left: 7px;
    background-color: transparent;
    border: 0;
    font-weight: 600;
    font-size: 18px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    border-bottom: 3px solid ${COLORS.ADVENTURE_GREEN}

    &:focus {
      outline: none;
    }

    &:hover {
      cursor: pointer;
    }
  }
`

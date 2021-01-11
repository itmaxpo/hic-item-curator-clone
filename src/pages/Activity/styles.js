import styled from 'styled-components'
import { TextField, Card } from '@tourlane/tourlane-ui'

export const StyledCard = styled(Card)`
  width: 120px;
  height: 120px;
`

export const StyledTextField = styled(TextField)`
  & {
    flex: 1;
  }
`

import styled from 'styled-components'

import { Box } from '@tourlane/tourlane-ui'

export const FlexChildContainer = styled(Box)<{ width: string }>`
  flex: ${({ width }) => `0 0 ${width}`};
`

import React from 'react'
import { MARKETS_FLAGS } from 'utils/constants'
import { BlockedIndicatorWrapper, StyledIconFlag, StyledChip } from './styles'
import { Flex } from '@tourlane/tourlane-ui'

const getMarketsFlags = markets => (
  <Flex inline>
    {markets.map(market => (
      <StyledIconFlag
        data-test={`Blacklisted-${MARKETS_FLAGS[market]}`}
        country={MARKETS_FLAGS[market]}
        rounded
      />
    ))}
  </Flex>
)

const BlacklistedMarketsChip = ({ markets, ...rest }) => (
  <BlockedIndicatorWrapper {...rest}>
    <StyledChip strong>Blocked markets: {getMarketsFlags(markets)}</StyledChip>
  </BlockedIndicatorWrapper>
)

export default BlacklistedMarketsChip

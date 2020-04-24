import React from 'react'
import { MARKETS_FLAGS } from 'utils/constants'
import { BlackListIndicatorWrapper, StyledIconFlag, StyledChip } from './styles'
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
  <BlackListIndicatorWrapper {...rest}>
    <StyledChip strong>Blacklisted markets: {getMarketsFlags(markets)}</StyledChip>
  </BlackListIndicatorWrapper>
)

export default BlacklistedMarketsChip

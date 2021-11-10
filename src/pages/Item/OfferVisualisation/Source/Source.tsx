import { FC } from 'react'
import { Big, Flex, H4 } from '@tourlane/tourlane-ui'
import { beautifyString } from 'utils/helpers'

interface Props {
  source: [string]
}
export const Source: FC<Props> = ({ source }) => {
  return (
    <Flex direction={'ttb'}>
      <H4>Source</H4>
      <Flex pt={24}>
        <Flex>
          <Big data-test="source">
            {beautifyString(source.sort((a, b) => a.localeCompare(b)).join(', '))}
          </Big>
        </Flex>
      </Flex>
    </Flex>
  )
}

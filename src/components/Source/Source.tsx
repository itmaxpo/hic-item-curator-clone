import { FC, ReactNode } from 'react'
import { Big, Flex, H4 } from '@tourlane/tourlane-ui'
import { beautifyString } from 'utils/helpers'

interface Props {
  source: string[]
  label?: ReactNode | string
}
export const Source: FC<Props> = ({ source, label }) => {
  return (
    <Flex direction={'ttb'}>
      {label ?? <H4>Source</H4>}
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

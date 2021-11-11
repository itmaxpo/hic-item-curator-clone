import React from 'react'
import {
  Base,
  Box,
  COLORS,
  ExtraSmall,
  Flex,
  FlexBox,
  IconButton,
  Small,
  SvgIcon,
  Tooltip
} from '@tourlane/tourlane-ui'
import TooltipIcon from '@tourlane/iconography/Glyphs/Navigation/Tooltip'
import CheckmarkIcon from '@tourlane/iconography/Glyphs/Other/Checkmark'
import ErrorIcon from '@tourlane/iconography/Glyphs/Other/Error'
import { MergeWarningsContainer } from './styles'

const RECOMMENDED_MERGE_CONDITIONS = [
  'Locations are less than 100m apart.',
  'DMC’s are the same.',
  'Google and Wetu identifies them as the same accommodation.'
]

interface MergeWarningsProps {
  mergeWarnings: string[]
}

/**
 * Render merge warnings, if any.
 */
export const MergeWarnings = ({ mergeWarnings }: MergeWarningsProps) => {
  if (!mergeWarnings.length) return null

  return (
    <>
      <FlexBox justify="center" mb={15}>
        <Box mr={8}>
          <Base bold>The following conflicts were found</Base>
        </Box>
        <Tooltip
          flex
          multiline
          content={
            <FlexBox direction="ttb" width={270}>
              <ExtraSmall bold withBottomMargin>
                Recommended merging conditions:
              </ExtraSmall>
              {RECOMMENDED_MERGE_CONDITIONS.map((condition) => (
                <Flex key={condition}>
                  <Box mr={8}>
                    <SvgIcon size={24} color={COLORS.ADVENTURE_GREEN}>
                      <CheckmarkIcon />
                    </SvgIcon>
                  </Box>
                  <ExtraSmall>{condition}</ExtraSmall>
                </Flex>
              ))}
            </FlexBox>
          }
        >
          <IconButton icon={<TooltipIcon />} iconSize={22} />
        </Tooltip>
      </FlexBox>
      <MergeWarningsContainer>
        {mergeWarnings.map((warning) => (
          <FlexBox key={warning}>
            <Box mr={8}>
              <SvgIcon size={24} color={COLORS.RIOJA_RED}>
                <ErrorIcon />
              </SvgIcon>
            </Box>
            <Small>{warning}</Small>
          </FlexBox>
        ))}
      </MergeWarningsContainer>
    </>
  )
}

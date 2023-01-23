import { useMemo } from 'react'

import { Base, Flex, H2, COLORS, Box, SvgIcon } from '@tourlane/tourlane-ui'
import DeIcon from '@tourlane/iconography/Flags/Rectangle/De'
import UsIcon from '@tourlane/iconography/Flags/Rectangle/Us'
import FrIcon from '@tourlane/iconography/Flags/Rectangle/Fr'
import GbIcon from '@tourlane/iconography/Flags/Rectangle/Gb'
import NlIcon from '@tourlane/iconography/Flags/Rectangle/Nl'

import { HFCheckbox } from 'components/hook-form'
import ItemBadge from 'components/ItemBadge'
import { ActiveBadge } from 'components/ItemBadge/styles'
import { HFTextField } from 'components/hook-form'
import { Market } from 'components/Market'
import { formSpacing } from 'utils/constants'
import type { ILocale } from 'types/ILocale'

interface Props {
  isEditing: boolean
  name: string | null
  active_destination: boolean
  visualization_destination: boolean
  locale: string
  nameTestId?: string
}

export const Intro = ({
  isEditing,
  name,
  locale,
  active_destination,
  visualization_destination,
  nameTestId
}: Props) => {
  const getCountryFlag = useMemo(
    () => ({
      'de-DE': <DeIcon />,
      'en-GB': <GbIcon />,
      'en-US': <UsIcon />,
      'fr-FR': <FrIcon />,
      'nl-NL': <NlIcon />
    }),
    []
  )
  return (
    <Flex justifyContent="between" mt={20}>
      <Box width="50%">
        {!isEditing ? (
          <>
            <H2>
              {name ||
                (locale && (
                  <Flex alignItems="center" gap={10}>
                    <span> No item name found for</span>
                    <SvgIcon size={30}>{getCountryFlag[locale as ILocale]}</SvgIcon>
                  </Flex>
                ))}
            </H2>
            <Flex mt={10}>
              {active_destination && (
                <ItemBadge
                  width={'85px'}
                  height={'26px'}
                  padding={'0 5px'}
                  background={COLORS.ADVENTURE_GREEN}
                  color={COLORS.SENSATION_WHITE}
                >
                  <ActiveBadge>Active</ActiveBadge>
                </ItemBadge>
              )}
              <Flex ml={10}>
                {visualization_destination && (
                  <ItemBadge
                    width={'270px'}
                    height={'26px'}
                    padding={'0 5px'}
                    background={COLORS.ADVENTURE_GREEN}
                    color={COLORS.SENSATION_WHITE}
                  >
                    <ActiveBadge>Visualization destination</ActiveBadge>
                  </ItemBadge>
                )}
              </Flex>
            </Flex>
          </>
        ) : (
          <>
            <HFTextField name="name" maxLength={38} required data-testid={nameTestId ?? ''} />
            <Flex mt={15}>
              <Flex p={0} mr="12px">
                <HFCheckbox
                  name="active_destination"
                  label="Is active destination"
                  data-testid="active_destination"
                />
              </Flex>
              <Flex p={0} mr="12px">
                <HFCheckbox
                  name="visualization_destination"
                  label="Is visualization destination"
                  data-testid="visualization_destination"
                />
              </Flex>
            </Flex>
          </>
        )}
      </Box>

      <Flex alignSelf="center" gap={formSpacing}>
        <Base color={COLORS.ELEMENT_GRAY} bold>
          Switch content to:
        </Base>
        <Market disabled={isEditing} />
      </Flex>
    </Flex>
  )
}

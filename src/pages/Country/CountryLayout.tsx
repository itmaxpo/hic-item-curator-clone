import { useForm } from 'react-hook-form'
import { capitalize } from 'lodash'

import {
  Base,
  Box,
  ButtonWithLoader,
  Card,
  COLORS,
  Flex,
  GhostButton,
  H2,
  H5,
  SecondaryButton
} from '@tourlane/tourlane-ui'

import { Image } from 'components/Image/Images'
import { IAttachment } from 'services/attachmentsApi'
import Layout from 'components/Layout'
import { FullWidthHr } from 'components/FullWidthHr'
import parse from 'html-react-parser'
import ShowMore from 'components/ShowMore/ShowMore'
import InformationComponent from '../Area/components/Information'
import {
  HFCheckbox,
  HFTextField,
  HookForm,
  HFTextArea,
  HFRichTextEditorConfigured
} from 'components/hook-form'
import type { CountryType, Information as InformationType } from 'types/Country'
import { Market } from 'components/Market'
import { FlexChildContainer } from 'components/FlexChildContainer'
import { ActiveBadge } from 'components/ItemBadge/styles'
import ItemBadge from 'components/ItemBadge'
import { usePrompt } from 'components/RouterPrompt'
import type { ILocale } from 'types/ILocale'
import { COUNTRY_ITEM_TYPE, formSpacing } from 'utils/constants'

const EditableField = ({
  isEditing,
  title,
  value,
  name,
  placeholder,
  label,
  maxLength,
  ...props
}: {
  isEditing: boolean
  title: string
  value: string
  name: string
  label?: string
  placeholder?: string
  hasRichText?: boolean
  maxLength?: number
}) => (
  <>
    <H5 withBottomMargin>{title}</H5>
    {isEditing ? (
      <HFTextArea
        {...props}
        maxLength={maxLength}
        label={label}
        name={name}
        placeholder={placeholder}
      />
    ) : (
      <ShowMore collapsed height="350px" size="20px" lines={12}>
        {value ? (
          <div style={{ whiteSpace: 'pre-wrap' }}>{parse(value)}</div>
        ) : (
          `No ${capitalize(title ?? label)}`
        )}
      </ShowMore>
    )}
  </>
)

export const CountryLayout = ({
  country,
  locale,
  isEditing,
  updateCountry,
  setIsEditing
}: {
  country: CountryType
  locale: ILocale
  isEditing: boolean
  updateCountry: (
    data: CountryType,
    locale: ILocale,
    uuid: string,
    dirtyFields: any
  ) => Promise<void>
  setIsEditing: (status: boolean) => void
}) => {
  usePrompt('If you continue, all changes will be lost', isEditing)

  const form = useForm<
    CountryType & {
      images: IAttachment[]
    }
  >({ defaultValues: { ...country } })

  const { handleSubmit, reset, watch, clearErrors, formState } = form
  const [uuid, name, description, active_destination, title, heading, lead, introduction] = watch([
    'uuid',
    'name',
    'description',
    'active_destination',
    'offer_preview.title',
    'offer_preview.heading',
    'offer_preview.lead',
    'offer_preview.introduction'
  ])

  const { dirtyFields } = formState

  return (
    <Layout
      headerContent={
        <Flex fullHeight mx={33} justifyContent="flex-end" alignItems="center">
          {isEditing ? (
            <Flex gap={formSpacing}>
              <GhostButton
                size="small"
                onClick={() => {
                  setIsEditing(false)
                  reset({
                    ...country
                  })
                  clearErrors()
                  setIsEditing(false)
                }}
              >
                Cancel
              </GhostButton>

              <ButtonWithLoader
                type="submit"
                size="small"
                data-testid="update-country"
                isLoading={formState?.isSubmitting}
                onClick={handleSubmit(async (data) => {
                  updateCountry(data, locale, uuid, dirtyFields).then()
                  setIsEditing(false)
                })}
              >
                Save
              </ButtonWithLoader>
            </Flex>
          ) : (
            <>
              <Flex gap={formSpacing}>
                <SecondaryButton size="small" onClick={() => setIsEditing(true)}>
                  Edit Content
                </SecondaryButton>
              </Flex>
            </>
          )}
        </Flex>
      }
    >
      <>
        <Box mx={90} my={30}>
          <HookForm form={form}>
            <Flex justifyContent="between" mt={20}>
              <FlexChildContainer width="30%">
                {!isEditing ? (
                  <H2 data-testid="country_name">{name}</H2>
                ) : (
                  <HFTextField data-testid="country_name" name="name" maxLength={38} required />
                )}
              </FlexChildContainer>

              <Flex alignSelf="center" gap={formSpacing}>
                <Base color={COLORS.ELEMENT_GRAY} bold>
                  Switch content to:
                </Base>
                <Market disabled={isEditing} />
              </Flex>
            </Flex>

            <Flex mt={10}>
              {isEditing ? (
                <Flex direction="ltr" mr={12}>
                  <HFCheckbox
                    name="active_destination"
                    data-testid="active_destination"
                    label="Is active destination"
                  />
                </Flex>
              ) : (
                <>
                  {active_destination && (
                    <ItemBadge
                      width="85px"
                      height="26px"
                      padding="0 5px"
                      background={COLORS.ADVENTURE_GREEN}
                      color={COLORS.SENSATION_WHITE}
                    >
                      <ActiveBadge>Active</ActiveBadge>
                    </ItemBadge>
                  )}
                </>
              )}
            </Flex>

            <Box mb={35} py={40}>
              <Card>
                <Box p={40}>
                  <EditableField
                    name="offer_preview.title"
                    isEditing={isEditing}
                    title="Offer title"
                    value={title}
                    placeholder="Please add an offer title"
                    maxLength={60}
                    data-testid="offer_preview_title"
                  />

                  <Box as={FullWidthHr} space={40} py={20} />

                  <Box mt={40}>
                    <EditableField
                      name="offer_preview.heading"
                      label="Headline"
                      isEditing={isEditing}
                      title="Trip Introduction"
                      value={heading}
                      placeholder="Please add an offer title"
                      maxLength={55}
                      data-testid="offer_preview_heading"
                    />
                  </Box>
                  <Box mt={40}>
                    <EditableField
                      label="Subheading"
                      isEditing={isEditing}
                      title=""
                      value={lead}
                      placeholder="Please add an subheading"
                      name="offer_preview.lead"
                      maxLength={235}
                      data-testid="offer_preview_lead"
                    />
                  </Box>

                  <Box mt={40}>
                    <EditableField
                      name="offer_preview.introduction"
                      label="Body Copy"
                      isEditing={isEditing}
                      title=""
                      value={introduction}
                      placeholder="Please add a body copy"
                      maxLength={310}
                      data-testid="offer_preview_introduction"
                    />
                  </Box>

                  <Box as={FullWidthHr} space={40} py={20} />

                  <Box mt={40}>
                    <H5 withBottomMargin>description</H5>
                    {isEditing ? (
                      <HFRichTextEditorConfigured name="description" data-test="description" />
                    ) : (
                      <ShowMore
                        data-test="item-show-more"
                        collapsed
                        height="350px"
                        size="20px"
                        lines={12}
                      >
                        <div data-testid="description" style={{ whiteSpace: 'pre-wrap' }}>
                          {description ? parse(description) : 'No Description'}
                        </div>
                      </ShowMore>
                    )}
                  </Box>

                  <Box as={FullWidthHr} space={40} />
                  <Image
                    isEditing={isEditing}
                    errorMessage={(formState.errors?.images as any)?.message}
                  />

                  <Box as={FullWidthHr} space={40} py={20} />
                </Box>

                <InformationComponent
                  item={formState.defaultValues as InformationType}
                  isEditing={isEditing}
                  type={COUNTRY_ITEM_TYPE}
                />
              </Card>
            </Box>
          </HookForm>
        </Box>
      </>
    </Layout>
  )
}

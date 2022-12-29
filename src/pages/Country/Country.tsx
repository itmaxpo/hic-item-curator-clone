import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as Sentry from '@sentry/browser'

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

import { AreaImages } from '../Area/components/areaImages'
import { IAttachment } from 'services/attachmentsApi'
import { useNotification } from 'components/Notification'
import Layout from 'components/Layout'
import LoadingPage from '../Loading/Loading'
import { FullWidthHr } from 'components/FullWidthHr'
import parse from 'html-react-parser'
import ShowMore from 'components/ShowMore/ShowMore'
import InformationComponent from '../Area/components/Information'
import {
  HFCheckbox,
  HFRichTextEditorConfigured,
  HFTextField,
  HookForm,
  HFTextArea
} from 'components/hook-form'
import { getCountryById } from './coutryApi'
import type { CountryType, Information as InformationType } from 'types/Country'
import { Market } from 'components/Market'
import { FlexChildContainer } from 'components/FlexChildContainer'
import { ActiveWrapperTitle } from '../Area/components/intro'
import ItemBadge from 'components/ItemBadge'
import { usePrompt } from 'components/RouterPrompt'
import type { ILocale } from 'types/ILocale'
import useRefValue from 'utils/useRefValue'
import { COUNTRY_UPDATED_ITEM_TYPE, formSpacing } from 'utils/constants'

const EditableField = ({
  isEditing,
  title,
  value,
  name,
  placeholder,
  label,
  maxLength
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
      <HFTextArea maxLength={maxLength} label={label} name={name} placeholder={placeholder} />
    ) : (
      <ShowMore collapsed height="350px" size="20px" lines={12}>
        {value ? <div style={{ whiteSpace: 'pre-wrap' }}>{parse(value)}</div> : `No : ${title}`}
      </ShowMore>
    )}
  </>
)

export const Country = () => {
  const { id } = useParams()
  const [urlParams] = useSearchParams()
  const locale = urlParams.get('language') as ILocale
  const { enqueueNotification } = useNotification()
  const [isFetchingData, setIsFetchingData] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [country, setCountry] = useState<CountryType | null>(null)
  usePrompt('If you continue, all changes will be lost', isEditing)

  const form = useForm<
    CountryType & {
      images: IAttachment[]
    }
  >({ mode: 'onChange' })

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

  useEffect(() => {
    const retrieveCountryData = async () => {
      getCountryById(id as string, locale)
        .then(async (data) => setCountry(data))
        .catch((e: any) => {
          enqueueNotification({
            variant: 'error',
            message: `Failed to edit item ${e.message}`
          })
          Sentry.captureException(e)
        })
        .finally(() => setIsFetchingData(false))
    }

    retrieveCountryData().then()
  }, [enqueueNotification, id, locale, setCountry])

  const previousArea = useRefValue(country).previousValue

  useEffect(() => {
    if (previousArea !== country) {
      reset({
        ...country
      })
    }
  }, [country, previousArea, reset])

  const updateCountry = async (
    data: CountryType & { locale: ILocale; uuid: string },
    dirtyField: any
  ) => {
    // TODO: replace it with server request
    console.log('saved to the server data', dirtyField, data)
  }

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
                isLoading={formState?.isSubmitting}
                onClick={handleSubmit(async (data) => {
                  updateCountry(
                    {
                      ...data,
                      locale,
                      uuid: uuid as string
                    },
                    dirtyFields
                  ).then()
                  setIsEditing(false)
                })}
              >
                Save
              </ButtonWithLoader>
            </Flex>
          ) : (
            <>
              <Flex gap={formSpacing}>
                <SecondaryButton
                  disabled={isFetchingData}
                  size="small"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Content
                </SecondaryButton>
              </Flex>
            </>
          )}
        </Flex>
      }
    >
      {isFetchingData ? (
        <LoadingPage />
      ) : (
        <>
          <Box mx={90} my={30}>
            <HookForm form={form}>
              <Flex justifyContent="between" mt={20}>
                <FlexChildContainer width="30%">
                  {!isEditing ? (
                    <H2>{name}</H2>
                  ) : (
                    <HFTextField name="name" maxLength={38} required />
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
                    <HFCheckbox name="active_destination" label="Is active destination" />
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
                        <ActiveWrapperTitle>Active</ActiveWrapperTitle>
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
                      />
                    </Box>

                    <Box as={FullWidthHr} space={40} py={20} />

                    <Box mt={40}>
                      <H5 withBottomMargin>description</H5>
                      {isEditing ? (
                        <HFRichTextEditorConfigured name="description" />
                      ) : (
                        <ShowMore
                          data-test="item-show-more"
                          collapsed
                          height="350px"
                          size="20px"
                          lines={12}
                        >
                          {description ? (
                            <div style={{ whiteSpace: 'pre-wrap' }}>{parse(description)}</div>
                          ) : (
                            'No Description'
                          )}
                        </ShowMore>
                      )}
                    </Box>

                    <Box as={FullWidthHr} space={40} />
                    <AreaImages
                      isEditing={isEditing}
                      errorMessage={(formState.errors?.images as any)?.message}
                    />

                    <Box as={FullWidthHr} space={40} py={20} />
                  </Box>

                  <InformationComponent
                    item={country as InformationType}
                    isEditing={isEditing}
                    type={COUNTRY_UPDATED_ITEM_TYPE}
                  />
                </Card>
              </Box>
            </HookForm>
          </Box>
        </>
      )}
    </Layout>
  )
}

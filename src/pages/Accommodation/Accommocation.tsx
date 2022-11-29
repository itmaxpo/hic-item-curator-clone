import { lazy, Suspense, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import * as Sentry from '@sentry/browser'
import parse from 'html-react-parser'
import { useForm, Controller } from 'react-hook-form'
import styled from 'styled-components'

import {
  Base,
  ButtonWithLoader,
  Flex,
  GhostButton,
  H2,
  SecondaryButton,
  Card,
  Box,
  COLORS,
  H5,
  Big,
  TextField,
  SvgIcon
} from '@tourlane/tourlane-ui'
import { CountryCodeSelect } from '@tourlane/rooster'
import PhoneIcon from '@tourlane/iconography/Glyphs/Navigation/Phone'
import WarningIcon from '@tourlane/iconography/Glyphs/Notifications/Warning'

import { getAccommodationById, getCountry, getAreasById } from './accommodationApi'
import { getItemAttachments, IAttachment } from 'services/attachmentsApi'
import { mapSources, validatePhoneNumber } from './utils'
import { Market } from '../Activity/Market'
import Blocking from '../Item/ItemLayout/Blocking'
import { useAccommodationCategories } from 'contexts/AccommCategories/AccommCategories'
import LoadingPage from '../Loading/Loading'
import { updateItemAttachmentsById } from 'services/contentApi'
import { getSuppliers } from 'services/configurationsApi'
import { CountryCodeWrapper, NoLocationWrapper } from '../Item/OfferVisualisation/styles'
import { rankingOptions } from 'utils/rankingOptions'
import { usePromise } from 'utils/usePromise'
import { HFRichTextEditorConfigured, HFTextField, HookForm, HFDropdown } from 'components/hook-form'
import { FullWidthHr } from 'components/FullWidthHr'
import { ItemImagesUpload } from 'components/ItemImagesUpload'
import { useNotification } from 'components/Notification'
import Map from 'components/Map'
import NoLocation from 'components/NoLocation'
import ShowMore from 'components/ShowMore/ShowMore'
import Layout from 'components/Layout'
import { CarouselLoader } from 'components/Carousel'
import Breadcrumbs from 'components/Breadcrumbs'
import type { ILocale } from 'types/ILocale'
import type { AccommodationType, Blocked } from 'types/Accommodation'
import { AccommodationLocation } from '../Item/OfferVisualisation/AccommodationLocation'
import { Geolocation } from '../Item/OfferVisualisation/AccommodationLocation'
import { Images } from '../Activity/Activity'
import { generateBreadcrumbs } from '../Item/ItemLayout/utils'
import useRefValue from 'utils/useRefValue'

const ImageCarousel = lazy(
  () => import(/* webpackChunkName: "ImageCarousel" */ 'components/Carousel')
)

const PositionedWarningIcon = styled(WarningIcon)`
  position: relative;
  top: 7px;
`

const FlexChildContainer = styled(Box)<{ width: string }>`
  flex: ${({ width }) => `0 0 ${width}`};
`

type AccommodationFormType = AccommodationType & {
  images: IAttachment[]
  areaCode: string
  phoneNumber: string
}
const formSpacing = [12, 12, 15, 18, 24]

export const Accommodation = () => {
  const { id } = useParams()
  const [urlParams] = useSearchParams()
  const locale = urlParams.get('language') as ILocale
  const { enqueueNotification } = useNotification()

  const [accommodation, setAccommodation] = useState<AccommodationType | null>(null)
  const [isImageCarouselOpen, toggleImageCarousel] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [sources, setSources] = useState<string[]>([])
  const [breadcrumbs, setBreadcrumbs] = useState<{ name: string; id: string }[]>([])
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const categoriesOptions: { value: string; label: string }[] = useAccommodationCategories(true)

  const [{ data: images = [] }, reFetchImages] = usePromise(async () => {
    const images = await getItemAttachments({ itemId: id as string, itemType: 'accommodation' })
    return images.filter(({ tags }) => tags?.visible !== false)
  }, [])

  const form = useForm<
    AccommodationType & {
      images: IAttachment[]
      areaCode: string
      phoneNumber: string
      isValid: boolean
      countryCode: string
    }
  >({})

  const { setValue, control, formState, handleSubmit, reset, watch, clearErrors } = form

  const [
    ranking,
    accommodation_category_id,
    uuid,
    name,
    phoneNumber,
    areaCode,
    isValid,
    countryCode,
    blocked,
    description,
    location
  ] = watch([
    'ranking',
    'accommodation_category_id',
    'uuid',
    'name',
    'phoneNumber',
    'areaCode',
    'isValid',
    'countryCode',
    'blocked',
    'description',
    'location'
  ])

  const currentRank = (rankingOptions.find(({ value }) => value === ranking) ?? rankingOptions[0])
    .label
  const currentCategory = (
    categoriesOptions.find(({ value }) => value === accommodation_category_id) ??
    categoriesOptions[0]
  ).label

  useEffect(() => {
    const retrieveAccommodationData = async () => {
      setIsFetchingData(true)

      await Promise.all([getAccommodationById(id as string, locale), getSuppliers()])
        .then(async ([accommodationData, suppliersData]) => {
          setSources(mapSources(suppliersData, accommodationData))
          setAccommodation(accommodationData)

          const { data: country } = await getCountry(
            accommodationData.ancestors.find((item) => item.item_type === 'Country')?.uuid as string
          )

          const { data: areas } = await getAreasById({
            area_uuids: accommodationData.ancestors
              ?.filter((item) => item.item_type === 'Area')
              .map((item) => item.uuid),
            locale
          })

          setBreadcrumbs(
            [
              country,
              ...areas,
              {
                id: '',
                uuid: '',
                original_name: '',
                name: accommodationData.name,
                area_type: null
              }
            ]
              .filter(
                (item) =>
                  (item?.original_name || item?.name) &&
                  (!item?.area_type || item?.area_type === 'admin')
              )
              .map((item) => ({ name: item?.name ?? item?.original_name, id: item?.uuid }))
          )
        })
        .catch((e: any) => {
          enqueueNotification({
            variant: 'error',
            message: `Failed to edit item ${e.message}`
          })
          Sentry.captureException(e)
        })
        .finally(() => setIsFetchingData(false))
    }
    retrieveAccommodationData().then()
  }, [enqueueNotification, id, locale, setAccommodation])

  const previousAccommodation = useRefValue(accommodation).previousValue

  useEffect(() => {
    if (previousAccommodation !== accommodation) {
      const frontDeskPhone = validatePhoneNumber(accommodation?.front_desk_phone ?? '')

      reset({
        ...accommodation,
        ...frontDeskPhone
      })
    }
  }, [accommodation, previousAccommodation, reset])

  const updateAccommodation = async (
    data: AccommodationFormType & { locale: ILocale; uuid: string }
  ) => {
    setValue('front_desk_phone', `${data.areaCode}${data.phoneNumber}`)

    // TODO: replace it with server request
    console.log('saved to the server data', data)
  }
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
                    ...accommodation,
                    areaCode,
                    phoneNumber
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
                  updateAccommodation({
                    ...data,
                    locale,
                    uuid: uuid as string
                  }).then()
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
            <Breadcrumbs breadcrumbs={generateBreadcrumbs(breadcrumbs)} className="" />

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

              <Box mt={10}>
                <Blocking
                  isEditing={isEditing}
                  blocked={blocked}
                  onChange={(field: 'blocked', data: Blocked | null) => setValue(field, data)}
                />
              </Box>

              <Box mb={35} py={40}>
                <Card>
                  <Box p={40}>
                    <H5 withBottomMargin>Description</H5>

                    {isEditing ? (
                      <HFRichTextEditorConfigured name="description" />
                    ) : (
                      <ShowMore
                        data-test={'item-show-more'}
                        collapsed={true}
                        height={'350px'}
                        size={'20px'}
                        lines={12}
                      >
                        {description ? parse(description) : 'No Description'}
                      </ShowMore>
                    )}

                    <Box as={FullWidthHr} space={40} py={20} />

                    <Flex gap={40} mt={40}>
                      <FlexChildContainer width="30%">
                        <H5 withBottomMargin>Budget Category</H5>
                        {isEditing ? (
                          <HFDropdown
                            name="accommodation_category_id"
                            placeholder="Select Priority"
                            options={categoriesOptions}
                          />
                        ) : (
                          <Big>{currentCategory}</Big>
                        )}
                      </FlexChildContainer>
                      <FlexChildContainer width="30%">
                        <H5 withBottomMargin>Ranking</H5>
                        {isEditing ? (
                          <HFDropdown
                            name="ranking"
                            placeholder="Select Priority"
                            options={rankingOptions}
                          />
                        ) : (
                          <Big>{currentRank}</Big>
                        )}
                      </FlexChildContainer>
                    </Flex>

                    <Box as={FullWidthHr} space={40} py={20} />
                    <Box mt={40}>
                      <H5 withBottomMargin>Images</H5>

                      <Flex gap={formSpacing}>
                        {isEditing && (
                          <Flex flex={1} direction="column">
                            <ItemImagesUpload
                              itemId={id as string}
                              itemType="accommodation"
                              onUpload={reFetchImages}
                              error={(formState.errors?.images as any)?.message}
                            />
                          </Flex>
                        )}

                        <Flex flex={1}>
                          <Images
                            images={images}
                            isEditing={isEditing}
                            onImageClick={(i) => {
                              setSelectedImageIndex(i)
                              toggleImageCarousel(true)
                            }}
                            onDelete={async (imageId, imageOrder) => {
                              try {
                                const deletedImage: any = await updateItemAttachmentsById(
                                  id as string,
                                  'accommodation',
                                  [{ id: imageId, order: imageOrder }] as any,
                                  false
                                )

                                reFetchImages()

                                if (deletedImage[0]?.error?.length > 0) {
                                  throw Error(deletedImage[0].error.join(', '))
                                }
                              } catch (e) {
                                if (e instanceof Error) {
                                  enqueueNotification({
                                    variant: 'error',
                                    message: `Failed to update image. ${e?.message}`
                                  })
                                  console.error(e)
                                }
                              }
                            }}
                          />
                        </Flex>
                      </Flex>

                      {isImageCarouselOpen && (
                        <Suspense fallback={<CarouselLoader />}>
                          {/*@ts-ignore*/}
                          <ImageCarousel
                            selectedItem={selectedImageIndex}
                            images={images}
                            open={isImageCarouselOpen}
                            onClose={() => toggleImageCarousel(false)}
                          />
                        </Suspense>
                      )}
                    </Box>

                    <Box as={FullWidthHr} space={40} py={20} />

                    <Box mt={40}>
                      <H5 withBottomMargin>Frontdesk number</H5>

                      {isEditing ? (
                        <Flex>
                          <CountryCodeWrapper>
                            <Controller
                              control={control}
                              name="areaCode"
                              render={({ field: { value, onChange } }) => {
                                return (
                                  <CountryCodeSelect
                                    market={locale}
                                    initialCountryCode={countryCode}
                                    value={value}
                                    onChange={(str) => {
                                      if (str) {
                                        onChange(str.dialCode)
                                      }
                                    }}
                                  />
                                )
                              }}
                            />
                          </CountryCodeWrapper>

                          <FlexChildContainer ml={20} width="20%">
                            <Controller
                              control={control}
                              name="phoneNumber"
                              render={({ field: { value, onChange } }) => {
                                return (
                                  <TextField
                                    type="tel"
                                    shrinkPlaceholder
                                    placeholder="Phone"
                                    value={value}
                                    onValueChange={onChange}
                                    icon={<PhoneIcon />}
                                  />
                                )
                              }}
                            />
                          </FlexChildContainer>
                        </Flex>
                      ) : (
                        <Box>
                          {phoneNumber && isValid ? (
                            <Base
                              color={phoneNumber && !isValid ? COLORS.CHEERFUL_ORANGE : undefined}
                            >
                              {areaCode} {phoneNumber}
                            </Base>
                          ) : (
                            <Flex alignItems="baseline" gap={14} mt={8}>
                              <SvgIcon
                                size={20}
                                color={COLORS.CHEERFUL_ORANGE}
                                colorActive={COLORS.RIOJA_RED}
                              >
                                <PositionedWarningIcon />
                              </SvgIcon>

                              <Base color={COLORS.CHEERFUL_ORANGE}>
                                The phone number is invalid, please specify correct one
                              </Base>
                            </Flex>
                          )}
                        </Box>
                      )}
                    </Box>

                    <Box as={FullWidthHr} space={40} py={20} />

                    <Box mt={40}>
                      <H5 withBottomMargin>Location</H5>

                      <Flex mb={40}>
                        {isEditing ? (
                          <Controller
                            control={control}
                            name="address"
                            render={({ field: { value, onChange } }) => (
                              <AccommodationLocation
                                address={{
                                  label: value,
                                  value: value
                                }}
                                geolocation={location as { lat: number; lon: number }}
                                onChange={(g: Geolocation | null, address: string) => {
                                  onChange('address', address)
                                  setValue('location', g?.lat ? { lat: +g.lat, lon: +g.lon } : null)
                                }}
                              />
                            )}
                          />
                        ) : (
                          <Box fullWidth height="500px">
                            {location ? (
                              <Map
                                coordinates={{
                                  lat: location?.lat,
                                  lng: location?.lon
                                }}
                              />
                            ) : (
                              <NoLocationWrapper p={0} pt={1} justify="center">
                                <NoLocation alt="map-placeholder" height="70%" width="70%" />
                              </NoLocationWrapper>
                            )}
                          </Box>
                        )}
                      </Flex>

                      <Box as={FullWidthHr} space={40} py={5} />

                      <Box mt={40}>
                        <H5 withBottomMargin>Source</H5>
                        <Big>{sources.join(', ')}</Big>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </HookForm>
          </Box>
        </>
      )}
    </Layout>
  )
}

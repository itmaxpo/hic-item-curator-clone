import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Location from './components/areaLocation'
import { flatten } from 'lodash'
import * as Sentry from '@sentry/browser'

import { getAreaById, AreaType } from './areaApi'
import type { ILocale } from 'types/ILocale'

import useRefValue from 'utils/useRefValue'
import { formSpacing } from 'utils/constants'
import { getItemPolygonCoordinatesById } from 'services/contentApi'

import {
  Base,
  ButtonWithLoader,
  Flex,
  GhostButton,
  SecondaryButton,
  Card,
  Box,
  H5,
  COLORS
} from '@tourlane/tourlane-ui'
import { Intro } from './components/intro'
import { AreaImages } from './components/areaImages'
import { IAttachment } from 'services/attachmentsApi'
import { useNotification } from 'components/Notification'
import Layout from 'components/Layout'
import Breadcrumbs from 'components/PageBreadcrumbs'
import LoadingPage from '../Loading/Loading'
import { FullWidthHr } from 'components/FullWidthHr'
import parse from 'html-react-parser'
import ShowMore from 'components/ShowMore/ShowMore'
import Information from './components/Information'
import BeatLoader from 'react-spinners/BeatLoader'
import { HFRichTextEditorConfigured, HFTextField, HookForm } from 'components/hook-form'

export const Area = () => {
  const { id } = useParams()
  const [urlParams] = useSearchParams()
  const locale = urlParams.get('language') as ILocale
  const { enqueueNotification } = useNotification()
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [area, setArea] = useState<AreaType | null>(null)

  const [polygon, setPolygon] = useState<string[]>([])

  const form = useForm<
    AreaType & {
      images: IAttachment[]
    }
  >({})

  const { formState, handleSubmit, reset, watch, clearErrors } = form
  const [
    uuid,
    name,
    visualization_destination,
    active_destination,
    offer_preview,
    description,
    original_name
  ] = watch([
    'uuid',
    'name',
    'visualization_destination',
    'active_destination',
    'offer_preview',
    'description',
    'original_name'
  ])

  useEffect(() => {
    const retrieveAreaData = async () => {
      setIsFetchingData(true)
      await Promise.all([
        getAreaById(id as string, locale),
        getItemPolygonCoordinatesById(id as string)
      ])
        .then(async ([areaData, { data: polygonData }]) => {
          setArea(areaData)
          setPolygon(flatten(polygonData.coordinates))
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
    retrieveAreaData().then()
  }, [enqueueNotification, id, locale, setArea])

  const previousArea = useRefValue(area).previousValue

  useEffect(() => {
    if (previousArea !== area) {
      reset({
        ...area
      })
    }
  }, [area, previousArea, reset])

  const updateArea = async (data: AreaType & { locale: ILocale; uuid: string }) => {
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
                    ...area
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
                  updateArea({
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
            <>
              {area ? (
                <Breadcrumbs
                  ancestors={area?.ancestors}
                  className=""
                  name={area?.name}
                  originalName={area.original_name}
                />
              ) : (
                <BeatLoader size="9" margin="2px" color={COLORS.ADVENTURE_GREEN_FOCUSED} />
              )}
            </>

            <HookForm form={form}>
              <Intro
                isEditing={isEditing}
                name={name}
                active_destination={active_destination}
                visualization_destination={visualization_destination}
              />
              <Box mb={35} py={40}>
                <Card>
                  <Box p={40}>
                    <Box>
                      <H5 withBottomMargin>Offer title</H5>

                      {isEditing ? (
                        <HFTextField
                          name="offer_preview.title"
                          placeholder="Please add an offer title"
                          multiline
                        />
                      ) : (
                        <Base>
                          {offer_preview?.title ? parse(offer_preview?.title) : 'No Offer title'}
                        </Base>
                      )}
                    </Box>
                    <Box as={FullWidthHr} space={40} py={20} />
                    <Box mt={40}>
                      <H5 withBottomMargin>TRIP INTRODUCTION</H5>
                      {isEditing ? (
                        <HFTextField
                          name="offer_preview.heading"
                          placeholder="Please add a headline"
                          multiline
                          label={'Headline'}
                          withBottomMargin
                        />
                      ) : (
                        <Base>
                          {offer_preview?.heading
                            ? parse(offer_preview?.heading)
                            : 'No headline title'}
                        </Base>
                      )}
                      {isEditing ? (
                        <HFTextField
                          name="offer_preview.lead"
                          placeholder="Please add a subheading"
                          multiline
                          label={'Subheading'}
                          withBottomMargin
                        />
                      ) : (
                        <Base>
                          {offer_preview?.lead ? parse(offer_preview?.lead) : 'No Subheading title'}
                        </Base>
                      )}
                      {isEditing ? (
                        <HFTextField
                          name="offer_preview.introduction"
                          placeholder="Please add a body copy"
                          multiline
                          label={'Body Copy'}
                        />
                      ) : (
                        <Base>
                          {offer_preview?.introduction
                            ? parse(offer_preview?.introduction)
                            : 'No body copy title'}
                        </Base>
                      )}
                    </Box>
                    <Box as={FullWidthHr} space={40} py={20} />
                    <Box mt={40}>
                      <H5 withBottomMargin>description</H5>
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
                    </Box>
                    <Box as={FullWidthHr} space={40} py={20} />
                    <AreaImages
                      isEditing={isEditing}
                      errorMessage={(formState.errors?.images as any)?.message}
                    />
                    <Box as={FullWidthHr} space={40} py={20} />
                    {polygon.length > 0 && (
                      <Location
                        polygonData={polygon}
                        locationInfo={{
                          address: name || original_name
                        }}
                      />
                    )}
                    <Box as={FullWidthHr} space={40} py={20} />
                  </Box>
                  {area && <Information item={area} isEditing={isEditing} type="admin_area" />}
                </Card>
              </Box>
            </HookForm>
          </Box>
        </>
      )}
    </Layout>
  )
}

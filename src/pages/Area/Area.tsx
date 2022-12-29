import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { flatten } from 'lodash'
import * as Sentry from '@sentry/browser'
import parse from 'html-react-parser'

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

import Location from './components/areaLocation'
import { getAreaById, AreaType, updateAreas } from './areaApi'
import { getChangedFields } from './util'
import type { ILocale } from 'types/ILocale'
import useRefValue from 'utils/useRefValue'
import { formSpacing } from 'utils/constants'
import { getItemPolygonCoordinatesById } from 'services/contentApi'
import { Intro } from './components/intro'
import { AreaImages } from './components/areaImages'
import { IAttachment } from 'services/attachmentsApi'
import { useNotification } from 'components/Notification'
import Layout from 'components/Layout'
import Breadcrumbs from 'components/PageBreadcrumbs'
import LoadingPage from '../Loading/Loading'
import { FullWidthHr } from 'components/FullWidthHr'
import ShowMore from 'components/ShowMore/ShowMore'
import Information from './components/Information'
import BeatLoader from 'react-spinners/BeatLoader'
import { usePrompt } from 'components/RouterPrompt'
import { HFRichTextEditorConfigured, HookForm, HFTextArea } from 'components/hook-form'
import { Information as InformationType } from 'types/Country'

const WrapperBase = styled(Base)`
  white-space: pre-wrap;
`
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

  const { formState, handleSubmit, reset, watch, clearErrors, getValues } = form
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

  const handleError = (message: string, error: any) => {
    enqueueNotification({
      variant: 'error',
      message: `${message}`
    })
    if (error instanceof Error) {
      console.error(error)
    }
  }

  const updateArea = async (data: AreaType, locale: ILocale, uuid: string, dirtyFields: any) => {
    setIsEditing(false)
    let payload = getChangedFields(dirtyFields, data)
    await updateAreas(uuid, locale, payload)
      .then(async () => {
        enqueueNotification({
          message: `Area updated  successfully`
        })
        reset(getValues())
      })
      .catch((error: any) => {
        handleError(error[0], error)
        Sentry.captureException(error[0])
      })
  }
  const { dirtyFields, isDirty } = form.formState
  usePrompt('If you continue, all changes will be lost', isDirty)
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
                  updateArea(data, locale, uuid, dirtyFields).then()
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
                locale={locale}
                active_destination={active_destination}
                visualization_destination={visualization_destination}
              />
              <Box mb={35} py={40}>
                <Card>
                  <Box p={40}>
                    <Box>
                      <H5 withBottomMargin>Offer title</H5>

                      {isEditing ? (
                        <HFTextArea
                          name="offer_preview.title"
                          placeholder="Please add a offer title"
                          isEditing={isEditing}
                          rows={2}
                          maxLength={60}
                        />
                      ) : (
                        <WrapperBase>
                          {offer_preview?.title ? parse(offer_preview?.title) : 'No Offer title'}
                        </WrapperBase>
                      )}
                    </Box>
                    <Box as={FullWidthHr} space={40} py={20} />
                    <Box mt={40}>
                      <H5 withBottomMargin>TRIP INTRODUCTION</H5>
                      {isEditing ? (
                        <Box marginBottom="24px">
                          <HFTextArea
                            maxLength={55}
                            rows={2}
                            name="offer_preview.heading"
                            placeholder="Please add a headline"
                            label={'Headline'}
                          />
                        </Box>
                      ) : (
                        <WrapperBase>
                          {offer_preview?.heading
                            ? parse(offer_preview?.heading)
                            : 'No headline title'}
                        </WrapperBase>
                      )}
                      {isEditing ? (
                        <Box marginBottom="24px">
                          <HFTextArea
                            maxLength={235}
                            rows={2}
                            name="offer_preview.lead"
                            placeholder="Please add a subheading"
                            label={'Subheading'}
                            withBottomMargin
                          />
                        </Box>
                      ) : (
                        <Box mt={40}>
                          <WrapperBase>
                            {offer_preview?.lead
                              ? parse(offer_preview?.lead)
                              : 'No Subheading title'}
                          </WrapperBase>
                        </Box>
                      )}
                      {isEditing ? (
                        <HFTextArea
                          maxLength={310}
                          rows={2}
                          name="offer_preview.introduction"
                          placeholder="Please add a body copy"
                          label={'Body Copy'}
                        />
                      ) : (
                        <Box mt={40}>
                          <WrapperBase>
                            {offer_preview?.introduction
                              ? parse(offer_preview?.introduction)
                              : 'No body copy title'}
                          </WrapperBase>
                        </Box>
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
                          <Base>{description ? parse(description) : 'No Description'}</Base>
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
                  {area && (
                    <Information
                      item={area as InformationType}
                      isEditing={isEditing}
                      type="admin_area"
                    />
                  )}
                </Card>
              </Box>
            </HookForm>
          </Box>
        </>
      )}
    </Layout>
  )
}

import React, { lazy, Suspense, useEffect, useState, FC, useRef } from 'react'
import get from 'lodash/get'
import { Controller, useForm } from 'react-hook-form'
import mapValues from 'lodash/mapValues'
import { useNavigate, useParams } from 'react-router-dom'

import {
  Base,
  ButtonWithLoader,
  Card,
  COLORS,
  Flex,
  GhostButton,
  H2,
  H5,
  Hr,
  SecondaryButton,
  FlexBox,
  Strong,
  Big,
  AlarmButton
} from '@tourlane/tourlane-ui'
import { useNotification } from 'components/Notification'
import { Images } from 'components/Image'
import Breadcrumbs from 'components/Breadcrumbs'
import MapComponent, { SearchBox } from 'components/Map'
import Layout from 'components/Layout'
import {
  createHelpers,
  HFCheckbox,
  HFDropdown,
  HFRichTextEditorConfigured,
  HFTextField,
  HookForm,
  REQUIRED_ERROR_MESSAGE,
  useHFContext
} from 'components/hook-form'
import { ItemImagesUpload } from '../../components/ItemImagesUpload'
import { deleteActivity, getActivityById, IActivity, updateActivity } from 'services/activityApi'
import { getItemAttachments, IAttachment } from '../../services/attachmentsApi'
import { usePromise } from '../../utils/usePromise'
import { Market, useMarket } from 'components/Market'
import { getActivityBreadcrumbs, getThemes } from './utils'
import NoLocation from 'components/NoLocation'
import { CarouselLoader } from 'components/Carousel'
import { updateItemAttachmentsById } from '../../services/contentApi'
import { ACTIVITY_ITEM_TYPE } from 'utils/constants'
import useRefValue from 'utils/useRefValue'
import Dialogue from 'components/Dialogue'
import LoadingPage from 'pages/Loading'

const ImageCarousel = lazy(
  () => import(/* webpackChunkName: "ImageCarousel" */ 'components/Carousel')
)

const formSpacing = [12, 12, 15, 18, 24]

const FieldGroup: FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <>
    <H5 withBottomMargin>{title}</H5>

    <Flex flexDirection="column" gap={formSpacing}>
      {children}
    </Flex>
  </>
)

const AddressSearch = () => {
  let {
    disabled,
    form: { register, setValue, formState, control }
  } = useHFContext()!

  // Register the "location" field. It's not a real field, but it's updated every time the
  // user selects an address.
  register('location')

  return (
    <Controller
      control={control}
      name="address"
      rules={{ required: REQUIRED_ERROR_MESSAGE }}
      render={({ field: { value, onChange, ...fieldProps } }) => {
        return (
          <SearchBox
            disabled={disabled}
            error={get(formState.errors, 'address')?.message as string}
            placeholder="Address"
            value={{ label: value, value }}
            onChange={(v: any) => {
              // Update the "address" field.
              onChange(v?.display_name)
              // Update the "location" field too.
              setValue('location', v?.lat ? { lat: +v.lat, lon: +v.lon } : null)
            }}
            {...fieldProps}
          />
        )
      }}
    />
  )
}

const defaultImages: IAttachment[] = []

type FormFields = IActivity & { images: IAttachment[] }

export const Activity = () => {
  const { id } = useParams<{ id: string }>()
  const [market] = useMarket()
  const [{ data: activity, isLoading }] = usePromise(
    () => getActivityById(id as string | number, market),
    [id, market]
  )
  const { enqueueNotification } = useNotification()

  const form = useForm<FormFields>({})
  const { setErrors } = createHelpers(form)
  const { isSubmitting } = form.formState
  const [isEditing, setIsEditing] = useState(false)
  const [isImageCarouselOpen, toggleImageCarousel] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const [{ data: images = defaultImages }, reFetchImages] = usePromise(async () => {
    const images = await getItemAttachments({ itemId: id as string, itemType: 'activity' })
    return images.filter(({ tags }) => tags?.visible !== false)
  })

  let location = form.watch('location')
  const areas = activity?.touristic_areas?.map(({ name }) => name).join(', ')

  const { register, setValue, reset } = form
  const navigate = useNavigate()

  // Register the "images" field.
  register('images', {
    validate: (images) => images?.length >= 1 || 'There should be at least one image'
  })

  useEffect(() => {
    if (activity?.active === false) {
      navigate('/?type=activity')
    }
  }, [activity, navigate])

  // Update the form's "images" value every time the images change.
  useEffect(() => {
    setValue('images', images, { shouldValidate: true })
  }, [images, setValue])

  // Reset form values when the activity loads.
  const previousActivity = useRefValue(activity).previousValue
  useEffect(() => {
    if (previousActivity !== activity) {
      reset({ ...activity, images })
    }
  }, [activity, images, previousActivity, reset])

  const toggleDeleteModal = () => {
    setOpenDeleteModal((currentState) => !currentState)
  }

  const handleError = (message: string, error: any) => {
    enqueueNotification({
      variant: 'error',
      message: `${message}`
    })
    if (error instanceof Error) {
      console.error(error)
    } else {
      setErrors(mapValues(error as Record<string, unknown[]>, (errors) => errors.join(', ')))
    }
  }

  const handleUpdateActivity = async (data: IActivity & { locale: string }) => {
    try {
      setIsEditing(false)
      await updateActivity({ ...data })
      enqueueNotification({
        message: 'Activity updated successfully'
      })
    } catch (error) {
      setIsEditing(true)
      handleError('failed to update', error)
    }
  }

  const handleDeleteActivity = async (uuid: string) => {
    try {
      await deleteActivity(uuid)
      toggleDeleteModal()
      enqueueNotification({
        message: 'Activity deleted successfully'
      })
      navigate('/?type=activity')
    } catch (error) {
      handleError('failed to delete', error)
    }
  }

  const imagesRef = useRef<HTMLDivElement>(null)

  return (
    // @ts-ignore
    <Layout
      headerContent={
        <Flex data-test={'item-title-wrapper'} justifyContent="space-between" alignItems="center">
          <H2>{form.watch('name')}</H2>

          {isEditing ? (
            <Flex gap={formSpacing}>
              <GhostButton
                size="small"
                onClick={() => {
                  setIsEditing(false)
                  form.reset({ ...activity, images })
                  form.clearErrors()
                }}
              >
                Cancel
              </GhostButton>

              <ButtonWithLoader
                size="small"
                isLoading={isSubmitting}
                onClick={form.handleSubmit(
                  (data) => {
                    handleUpdateActivity({ ...data, locale: market, uuid: activity!.uuid })
                  },
                  (errors) => {
                    // If there are errors in any of the fields, react-hook-form scrolls into
                    // them, but we can't do that for the images field because it doesn't have a
                    // focusable input. So we trigger the scroll manually if images is the only
                    // field with an error message.
                    const onlyImagesFieldHasError =
                      Object.keys(errors).length === 1 && Boolean(errors.images)
                    if (onlyImagesFieldHasError) {
                      setTimeout(() => {
                        imagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      }, 0)
                    }
                  }
                )}
              >
                Save
              </ButtonWithLoader>
            </Flex>
          ) : (
            <>
              <Flex gap={formSpacing}>
                <SecondaryButton
                  size="small"
                  onClick={() => setIsEditing(true)}
                  data-test="edit-content"
                >
                  Edit Content
                </SecondaryButton>
                <AlarmButton size="small" onClick={toggleDeleteModal} data-test="delete-content">
                  Delete
                </AlarmButton>
              </Flex>
              <Dialogue
                isOpen={openDeleteModal}
                onClose={toggleDeleteModal}
                hasHeader
                header="Delete Activity"
              >
                <Base>Are you sure you want to delete this activity?</Base>
                <Flex justifyContent="right" gap={formSpacing}>
                  <GhostButton size="small" onClick={toggleDeleteModal}>
                    Cancel
                  </GhostButton>

                  <ButtonWithLoader
                    size="small"
                    isLoading={isSubmitting}
                    data-test="confirm-delete"
                    onClick={() => {
                      handleDeleteActivity(id as string)
                    }}
                  >
                    confirm
                  </ButtonWithLoader>
                </Flex>
              </Dialogue>
            </>
          )}
        </Flex>
      }
    >
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Flex flexDirection="column" px={90} py={30} gap={formSpacing}>
          <Flex justifyContent="between">
            {/* @ts-ignore */}
            <Breadcrumbs breadcrumbs={getActivityBreadcrumbs(activity)} />

            <Flex gap={formSpacing}>
              <Base color={COLORS.ELEMENT_GRAY} bold>
                Switch content to:
              </Base>
              <Market disabled={isEditing} />
            </Flex>
          </Flex>

          <div>
            {activity?.supplier_id && (
              <>
                <Strong>Supplier: </Strong> {activity?.supplier_id},{' '}
              </>
            )}
            {activity?.provider && (
              <>
                <Strong>Provider:</Strong> {activity?.provider}
              </>
            )}
          </div>

          <HookForm data-test="activity-form" form={form} disabled={!isEditing}>
            <Card>
              <Flex flexDirection="column" p={32} gap={formSpacing}>
                <Flex gap={formSpacing}>
                  <Flex flexDirection="column" flex={1} gap={formSpacing}>
                    <HFTextField
                      name="display_name"
                      label="Display Name (38 characters max)"
                      maxLength={38}
                      required
                    />
                    <HFDropdown
                      name="themes"
                      label="Theme"
                      multiple
                      options={getThemes()}
                      closeMenuOnSelect={false}
                    />

                    <Big strong>Area(s)</Big>
                    <Base>{areas}</Base>

                    <FlexBox direction="ttb" maxWidth="800px">
                      <H5 withBottomMargin>Activity Location</H5>
                      <AddressSearch />
                    </FlexBox>
                  </Flex>

                  <Flex flex={1}>
                    {location ? (
                      <MapComponent coordinates={{ lat: location.lat, lng: location.lon }} />
                    ) : (
                      <NoLocation
                        itemType={ACTIVITY_ITEM_TYPE}
                        alt="map-placeholder"
                        height="140px"
                      />
                    )}
                  </Flex>
                </Flex>

                <Hr />

                <HFRichTextEditorConfigured name="description" label="Description" required />

                <Flex flexDirection="column">
                  <H5 withBottomMargin ref={imagesRef} id="images-header">
                    Images
                  </H5>

                  <Flex gap={formSpacing}>
                    {isEditing && (
                      <Flex flex={1} direction="column">
                        <ItemImagesUpload
                          itemId={id as string}
                          itemType="activity"
                          onUpload={reFetchImages}
                          error={(form.formState.errors?.images as any)?.message}
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
                              'activity',
                              [{ id: imageId, order: imageOrder }] as any,
                              false
                            )

                            reFetchImages()

                            // TODO: upon accommodation image deletion complete - let's move error handling to the service
                            if (deletedImage[0]?.error?.length > 0) {
                              throw Error(deletedImage[0].error.join(', '))
                            }
                          } catch (e: any) {
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
                    </Flex>
                  </Flex>
                </Flex>

                <Flex gap={formSpacing}>
                  <Flex direction="ttb" flex={1} gap={formSpacing}>
                    <HFRichTextEditorConfigured name="inclusions" label="Inclusions" />
                    <HFRichTextEditorConfigured name="what_to_bring" label="What to bring" />

                    <FieldGroup title="Additional PAX information">
                      <HFCheckbox
                        name="restrictions.shoes_size_required"
                        label="Shoes size required"
                      />
                      <HFCheckbox
                        name="restrictions.clothes_size_required"
                        label="Clothes size required"
                      />
                      <HFCheckbox
                        name="restrictions.other_pax_information.required"
                        label="Other information required"
                      />

                      {form.watch('restrictions.other_pax_information.required') && (
                        <HFTextField
                          name="restrictions.other_pax_information.notes"
                          placeholder="Please specify required information"
                        />
                      )}
                    </FieldGroup>
                  </Flex>

                  <Flex flexDirection="column" gap={formSpacing} flex={1}>
                    <HFRichTextEditorConfigured name="exclusions" label="Exclusions" />

                    <FieldGroup title="Activity Restrictions">
                      <HFCheckbox
                        name="restrictions.weight.restricted"
                        label="Weight restrictions (indicate value)"
                      />

                      {form.watch('restrictions.weight.restricted') && (
                        <Flex gap={formSpacing}>
                          <HFTextField
                            name="restrictions.weight.min"
                            type="number"
                            placeholder="Min(kg)"
                            shrinkPlaceholder
                          />
                          <HFTextField
                            name="restrictions.weight.max"
                            type="number"
                            placeholder="Max(kg)"
                            shrinkPlaceholder
                          />
                        </Flex>
                      )}

                      <HFCheckbox
                        name="restrictions.height.restricted"
                        label="Height restrictions (indicate value)"
                      />

                      {form.watch('restrictions.height.restricted') && (
                        <Flex gap={formSpacing}>
                          <HFTextField
                            name="restrictions.height.min"
                            type="number"
                            placeholder="Min(cm)"
                            shrinkPlaceholder
                          />
                          <HFTextField
                            name="restrictions.height.max"
                            type="number"
                            placeholder="Max(cm)"
                            shrinkPlaceholder
                          />
                        </Flex>
                      )}

                      <HFCheckbox
                        name="restrictions.pregnancy_restricted"
                        label="Pregnancy restrictions"
                      />
                      <HFCheckbox
                        name="restrictions.disability_restricted"
                        label="Disability restrictions"
                      />
                      <HFCheckbox
                        name="restrictions.physical_conditions.restricted"
                        label="Physical conditions restrictions"
                      />

                      {form.watch('restrictions.physical_conditions.restricted') && (
                        <HFTextField
                          name="restrictions.physical_conditions.notes"
                          placeholder="Notes"
                          shrinkPlaceholder
                        />
                      )}
                    </FieldGroup>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
          </HookForm>
        </Flex>
      )}
    </Layout>
  )
}

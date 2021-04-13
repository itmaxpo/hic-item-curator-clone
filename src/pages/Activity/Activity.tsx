import type React from 'react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import mapValues from 'lodash/mapValues'
import type { RouteComponentProps } from 'react-router-dom'

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
  Image,
  SecondaryButton,
  FlexBox,
  Strong
} from '@tourlane/tourlane-ui'

import Breadcrumbs from 'components/Breadcrumbs'
import MapComponent, { SearchBox } from 'components/Map'
import Layout from 'components/Layout'
import {
  createHelpers,
  HFCheckbox,
  HFDropdown,
  HFRichTextEditor,
  HFTextField,
  HookForm,
  useHFContext
} from 'components/hook-form'
import { UnhappyIcon } from '../../components/Icon'
import { ItemImagesUpload } from '../../components/ItemImagesUpload'
import { getActivityById, IActivity, updateActivity } from 'services/activityApi'
import { getItemAttachments } from '../../services/attachmentsApi'
import { usePromise } from '../../utils/usePromise'
import { Market, useMarket } from './Market'
import { getActivityBreadcrumbs, getThemes } from './utils'
import NoLocation from '../Item/OfferVisualisation/NoLocation'
import { CarouselLoader } from 'components/Carousel'

const ImageCarousel = lazy(
  () => import(/* webpackChunkName: "ImageCarousel" */ 'components/Carousel')
)

const formSpacing = [12, 12, 15, 18, 24]

const FieldGroup: React.FC<{ title: string }> = ({ title, children }) => (
  <>
    <H5 withBottomMargin>{title}</H5>

    <Flex flexDirection="column" gap={formSpacing}>
      {children}
    </Flex>
  </>
)

const IMAGE_SIZE = 120

const ImageCard: React.FC<{ onClick?: () => void }> = ({ children, onClick }) => (
  <Card onClick={onClick} height={IMAGE_SIZE} width={IMAGE_SIZE} withOverflowHidden withHover>
    {children}
  </Card>
)

const Images: React.FC<{ images: { url: string }[]; onImageClick: (i: number) => void }> = ({
  images,
  onImageClick
}) =>
  images.length ? (
    <Flex gap={formSpacing} flexWrap="wrap">
      {images.map(({ url }, i) => (
        <ImageCard key={url} onClick={() => onImageClick(i)}>
          <Image src={url} height={IMAGE_SIZE} />
        </ImageCard>
      ))}
    </Flex>
  ) : (
    <ImageCard>
      <Flex justifyContent="center" alignItems="center" fullHeight>
        <UnhappyIcon />
      </Flex>
    </ImageCard>
  )

const AddressSearch: React.FC<{}> = () => {
  let {
    disabled,
    form: { register, unregister, setValue, watch }
  } = useHFContext()!

  const address = watch('address')

  useEffect(() => {
    register('location')
    register('address')

    return () => {
      unregister('location')
      unregister('address')
    }
  }, [register, unregister])

  return (
    <SearchBox
      key={address}
      disabled={disabled}
      placeholder="Address"
      defaultInputValue={address}
      onChange={(v: any) => {
        if (v) {
          setValue('location', { lat: +v.lat, lon: +v.lon })
          setValue('address', v.display_name)
        }
      }}
    />
  )
}

const RichTextEditorWithEditorProps: React.FC<{ name: string; label: string }> = ({
  name,
  label
}) => (
  <HFRichTextEditor
    name={name}
    label={label}
    resizable
    editorProps={{
      toolbar: {
        options: ['inline', 'list'],
        inline: {
          options: ['bold']
        },
        list: {
          options: ['unordered']
        }
      }
    }}
  />
)

export const Activity: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const id = match.params?.id
  const [market] = useMarket()
  const [{ data: activity }] = usePromise(() => getActivityById(id, market), [id, market])

  const form = useForm<IActivity>({})
  const { setErrors } = createHelpers(form)
  const { isSubmitting } = form.formState
  const [isEditing, setIsEditing] = useState(false)
  const [isImageCarouselOpen, toggleImageCarousel] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    form.reset(activity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity])

  let [{ data: images = [] }, reFetchImages] = usePromise(() =>
    getItemAttachments({ itemId: id, itemType: 'activity' })
  )

  let location = form.watch('location')

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
                  form.reset(activity)
                  form.clearErrors()
                }}
              >
                Cancel
              </GhostButton>

              <ButtonWithLoader
                size="small"
                isLoading={isSubmitting}
                onClick={form.handleSubmit(async (data) => {
                  try {
                    setIsEditing(false)
                    await updateActivity({ ...data, locale: market, uuid: activity!.uuid })
                  } catch (e) {
                    setIsEditing(true)

                    if (e instanceof Error) {
                      console.error(e)
                    } else {
                      setErrors(mapValues(e, (errors) => errors.join(', ')))
                    }
                  }
                })}
              >
                Save
              </ButtonWithLoader>
            </Flex>
          ) : (
            <SecondaryButton
              size="small"
              onClick={() => setIsEditing(true)}
              data-test="edit-content"
            >
              Edit Content
            </SecondaryButton>
          )}
        </Flex>
      }
    >
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

        <HookForm data-test="activity-form" form={form} disabled={!isEditing || isSubmitting}>
          <Card>
            <Flex flexDirection="column" p={32} gap={formSpacing}>
              <Flex gap={formSpacing}>
                <Flex flexDirection="column" flex={1} gap={formSpacing}>
                  <HFTextField name="display_name" label="Display Name" />

                  <HFDropdown
                    name="themes"
                    label="Theme"
                    multiple
                    options={getThemes()}
                    closeMenuOnSelect={false}
                  />

                  <FlexBox direction="ttb" maxWidth="800px">
                    <H5 withBottomMargin>Activity Location</H5>
                    <AddressSearch />
                  </FlexBox>
                </Flex>

                <Flex flex={1}>
                  {location ? (
                    <MapComponent coordinates={{ lat: location.lat, lng: location.lon }} />
                  ) : (
                    <NoLocation alt="map-placeholder" height="140px" />
                  )}
                </Flex>
              </Flex>

              <Hr />

              <RichTextEditorWithEditorProps name="description" label="Description" />

              <Flex flexDirection="column">
                <H5 withBottomMargin>Images</H5>

                <Flex gap={formSpacing}>
                  {isEditing && (
                    <Flex flex={1}>
                      <ItemImagesUpload itemId={id} itemType="activity" onUpload={reFetchImages} />
                    </Flex>
                  )}

                  <Flex flex={1}>
                    <Images
                      images={images}
                      onImageClick={(i) => {
                        setSelectedImageIndex(i)
                        toggleImageCarousel(true)
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
                  <RichTextEditorWithEditorProps name="inclusions" label="Inclusions" />
                  <RichTextEditorWithEditorProps name="what_to_bring" label="What to bring" />

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
                  <RichTextEditorWithEditorProps name="exclusions" label="Exclusions" />

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
    </Layout>
  )
}

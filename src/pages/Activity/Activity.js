import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import mapValues from 'lodash/mapValues'

import {
  FlexContainer,
  Flex,
  Box,
  Card,
  H2,
  H5,
  Hr,
  Base,
  COLORS,
  SecondaryButton,
  GhostButton,
  ButtonWithLoader,
  Image
} from '@tourlane/tourlane-ui'
import Breadcrumbs from 'components/Breadcrumbs'
import { SearchBox } from 'components/Map'
import Layout from 'components/Layout'
import { HFCheckbox, HFDropdown, HFTextField, HookForm } from 'components/hook-form'
import { UnhappyIcon } from '../../components/Icon'
import { ItemImagesUpload } from '../../components/ItemImagesUpload'
import { getActivityById, updateActivity } from '../../services/activityApi'
import { getItemAttachments } from '../../services/attachmentsApi'
import { usePromise } from '../../utils/usePromise'
import { Map } from './Map'
import { Market, useMarket } from './Market'
import { getActivityBreadcrumbs, getThemes } from './utils'

const formSpacing = [12, 12, 15, 18, 24]

const FieldGroup = ({ title, children }) => (
  <>
    <H5 withBottomMargin>{title}</H5>

    <Flex flexDirection="column" gap={formSpacing}>
      {children}
    </Flex>
  </>
)

const IMAGE_SIZE = 120

const ImageCard = ({ children }) => (
  <Card height={IMAGE_SIZE} width={IMAGE_SIZE} withOverflowHidden withHover>
    {children}
  </Card>
)

export const Images = ({ images }) =>
  images.length ? (
    <Flex gap={formSpacing} flexWrap="wrap">
      {images.map(({ url }) => (
        <ImageCard key={url}>
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

export const Activity = ({ match }) => {
  const id = match.params?.id
  const [market] = useMarket()
  const [{ data: activity }] = usePromise(() => getActivityById(id, market), [id, market])

  const form = useForm({})
  const { isSubmitting } = form.formState
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    form.reset(activity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity])

  const coordinates = { lat: activity?.location?.lat, lng: activity?.location?.lon }

  let [{ data: images = [] }, reFetchImages] = usePromise(() =>
    getItemAttachments({ itemId: id, itemType: 'activity' })
  )

  return (
    <Layout>
      <Box px={90} py={30}>
        <Flex justifyContent="between">
          <Breadcrumbs breadcrumbs={getActivityBreadcrumbs(activity)} />
          <Flex>
            <Base color={COLORS.ELEMENT_GRAY} bold>
              Switch content to:
            </Base>
            <Market disabled={isEditing} />
          </Flex>
        </Flex>

        <HookForm
          data-test="activity-form"
          form={form}
          disabled={!isEditing || isSubmitting}
          onSubmit={async (data, { setErrors }) => {
            try {
              setIsEditing(false)
              await updateActivity({ locale: market, uuid: activity.uuid, ...data })
            } catch (e) {
              setIsEditing(true)

              if (e instanceof Error) {
                console.error(e)
              } else {
                setErrors(mapValues(e, (errors) => errors.join(', ')))
              }
            }
          }}
        >
          <FlexContainer data-test={'item-title-wrapper'} px={0} justifyContent="between">
            <H2>{form.watch('name')}</H2>

            {isEditing ? (
              <Flex gap={16}>
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

                <ButtonWithLoader type="submit" isLoading={isSubmitting}>
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
          </FlexContainer>

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
                    hideSelectedOptions={false}
                    withToggleAll
                  />

                  <Flex direction="ttb">
                    <H5 withBottomMargin>Activity Location</H5>

                    <SearchBox
                      disabled={!isEditing}
                      placeholder="Address"
                      defaultValue={{
                        label: '',
                        value: `${coordinates.lat},${coordinates.lng}`
                      }}
                      onChange={() => {}}
                    />
                  </Flex>
                </Flex>

                <Map coordinates={coordinates} />
              </Flex>

              <Hr />

              <HFTextField name="description" label="Description" multiline />

              <Flex flexDirection="column">
                <H5 withBottomMargin>Images</H5>

                <Flex gap={formSpacing}>
                  {isEditing && (
                    <Flex flex={1}>
                      <ItemImagesUpload itemId={id} itemType="activity" onUpload={reFetchImages} />
                    </Flex>
                  )}

                  <Flex flex={1}>
                    <Images images={images} />
                  </Flex>
                </Flex>
              </Flex>

              <Flex gap={formSpacing}>
                <Flex direction="ttb" flex={1} gap={formSpacing}>
                  <HFTextField name="inclusions" label="Inclusions" multiline />
                  <HFTextField name="what_to_bring" label="What to bring" multiline />

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
                  <HFTextField name="exclusions" multiline label="Exclusions" />

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
                          placeholder="Min"
                          shrinkPlaceholder
                        />
                        <HFTextField
                          name="restrictions.weight.max"
                          type="number"
                          placeholder="Max"
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
                          placeholder="Min"
                          shrinkPlaceholder
                        />
                        <HFTextField
                          name="restrictions.height.max"
                          type="number"
                          placeholder="Max"
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
      </Box>
    </Layout>
  )
}

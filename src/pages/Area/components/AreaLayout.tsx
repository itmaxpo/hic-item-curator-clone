import { useForm } from 'react-hook-form'
import styled from 'styled-components'
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

import Location from './AreaLocation'
import { formSpacing } from 'utils/constants'
import { Intro } from './Intro'
import { Image } from 'components/Image/Images'
import Layout from 'components/Layout'
import Breadcrumbs from 'components/PageBreadcrumbs'
import { FullWidthHr } from 'components/FullWidthHr'
import ShowMore from 'components/ShowMore/ShowMore'
import Information from './Information'
import BeatLoader from 'react-spinners/BeatLoader'
import { usePrompt } from 'components/RouterPrompt'
import { HFRichTextEditor, HookForm, HFTextArea } from 'components/hook-form'
import { Information as InformationType } from 'types/Country'
import { AreaType } from '../areaApi'

const WrapperBase = styled(Base)`
  white-space: pre-wrap;
`

interface Props {
  area: AreaType | null
  loading: boolean
  polygon: string[]
  isEditing: boolean
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  updateArea: any
  locale: string
}

export const AreaLayout = ({
  area,
  loading,
  polygon,
  isEditing,
  setIsEditing,
  updateArea,
  locale
}: Props) => {
  const form = useForm<any>({
    defaultValues: area
  })
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
                data-testid="update-area"
                onClick={handleSubmit(async (data) => {
                  updateArea(data, uuid, dirtyFields).then(reset(getValues()))
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
            <BeatLoader size="9px" margin="2px" color={COLORS.ADVENTURE_GREEN_FOCUSED} />
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
                      data-testid="offer_preview_title"
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
                        data-testid="offer_preview_heading"
                      />
                    </Box>
                  ) : (
                    <WrapperBase>
                      {offer_preview?.heading ? parse(offer_preview?.heading) : 'No headline title'}
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
                        data-testid="offer_preview_lead"
                      />
                    </Box>
                  ) : (
                    <Box mt={40}>
                      <WrapperBase>
                        {offer_preview?.lead ? parse(offer_preview?.lead) : 'No Subheading title'}
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
                      data-testid="offer_preview_introduction"
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
                    <HFRichTextEditor name="description" data-test="description" />
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
                <Image
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
                  item={formState.defaultValues as InformationType}
                  isEditing={isEditing}
                  type="admin_area"
                />
              )}
            </Card>
          </Box>
        </HookForm>
      </Box>
    </Layout>
  )
}

import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
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
  Dropdown,
  Button,
  SecondaryButton,
  GhostButton
} from '@tourlane/tourlane-ui'
import { getActivityById } from 'services/contentApi'
import Breadcrumbs from 'components/Breadcrumbs'
import { SearchBox } from 'components/Map'
import Layout from 'components/Layout'
import { Restriction } from './Restriction'
import { Images } from './Images'
import { Map } from './Map'
import { Text } from './Text'
import { Market } from './Market'
import { getActivityBreadcrumbs, getThemes } from './utils'

export const Activity = ({ match, history }) => {
  const [activity, setActivity] = useState({})
  const images = []
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const getActivity = async () => {
      const { data } = await getActivityById(
        match.params?.id,
        queryString.parse(history.location.search)?.language
      )
      setActivity(data)
    }

    getActivity()
  }, [history, match, match.params])

  const onLanguageChange = (e, locale) => {
    e.preventDefault()
    history.push(`?${queryString.stringify({ language: locale })}`)
  }

  const handleEditClick = value => () => {
    setIsEditing(value)
  }

  const coordinates = { lat: activity?.location?.lat, lng: activity?.location?.lon }

  return (
    <Layout>
      <Box px={90} py={30}>
        <Flex justifyContent="between">
          <Breadcrumbs breadcrumbs={getActivityBreadcrumbs(activity)} />
          <Flex>
            <Base color={COLORS.ELEMENT_GRAY} bold>
              Switch content to:
            </Base>
            <Market
              language={queryString.parse(history.location.search)?.language}
              disabled={isEditing}
              onLanguageChange={onLanguageChange}
            />
          </Flex>
        </Flex>
        <FlexContainer data-test={'item-title-wrapper'} px={0} justifyContent="between">
          <H2>{activity?.name}</H2>
          {isEditing ? (
            <Flex>
              <Box pr={15}>
                <GhostButton size={'small'} onClick={handleEditClick(false)}>
                  Cancel
                </GhostButton>
              </Box>
              <Box>
                <Button size={'small'}>Save</Button>
              </Box>
            </Flex>
          ) : (
            <Box>
              <SecondaryButton
                size={'small'}
                onClick={handleEditClick(true)}
                data-test="edit-content"
              >
                Edit Content
              </SecondaryButton>
            </Box>
          )}
        </FlexContainer>
        <Card>
          <FlexContainer p={2}>
            <Flex direction="ttb" flex={1} pr={[12, 12, 15, 18, 24]}>
              <Text
                disabled={!isEditing}
                data-test="display-name"
                label="Display Name"
                value={activity?.display_name}
                onChange={() => {}}
              />
              <Flex direction="ttb" pb={[12, 12, 15, 18, 24]}>
                <H5 withBottomMargin>Theme</H5>
                <Dropdown
                  disabled={!isEditing}
                  data-test="themes"
                  multiple
                  options={getThemes()}
                  value={activity?.themes}
                  onChange={() => {}}
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  withToggleAll
                />
              </Flex>
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
            <Flex flex={1} pl={[12, 12, 15, 18, 24]}>
              <Map coordinates={coordinates} />
            </Flex>
          </FlexContainer>
          <Hr />
          <FlexContainer direction="ttb" flex={1} p={2} pb={1}>
            <Text
              disabled={!isEditing}
              multiline
              data-test="description"
              label="Description"
              value={activity?.description}
              onChange={() => {}}
            />
            <FlexContainer direction="ttb" p={0}>
              <H5 withBottomMargin>Images</H5>
              <Images images={images} isEditing={isEditing} />
            </FlexContainer>
          </FlexContainer>
          <FlexContainer p={2} pt={0}>
            <Flex direction="ttb" flex={1} pr={[12, 12, 15, 18, 24]}>
              <Text
                disabled={!isEditing}
                multiline
                data-test="inclusions"
                label="Inclusions"
                value={activity?.inclusions}
                onChange={() => {}}
              />
              <Text
                disabled={!isEditing}
                multiline
                data-test="what-to-bring"
                label="What to bring"
                value={activity?.what_to_bring}
                onChange={() => {}}
              />
            </Flex>
            <Flex direction="ttb" flex={1} pl={[12, 12, 15, 18, 24]}>
              <Text
                disabled={!isEditing}
                multiline
                data-test="exclusions"
                label="Exclusions"
                value={activity?.exclusions}
                onChange={() => {}}
              />
              <Flex direction="ttb">
                <H5 withBottomMargin>Activity Restrictions</H5>
                <Box pb={[12, 12, 15, 18, 24]}>
                  <Restriction
                    disabled={!isEditing}
                    label="Weight restrictions (indicate value)"
                    data-test="weight-restrictions"
                    checked={activity?.restrictions?.weight?.restricted}
                    values={[
                      { label: 'Min', value: activity?.restrictions?.weight?.min },
                      { label: 'Max', value: activity?.restrictions?.weight?.max }
                    ]}
                    onChange={() => {}}
                  />
                </Box>
                <Box pb={[12, 12, 15, 18, 24]}>
                  <Restriction
                    disabled={!isEditing}
                    label="Height restrictions (indicate value)"
                    data-test="height-restrictions"
                    checked={activity?.restrictions?.height?.restricted}
                    values={[
                      { label: 'Min', value: activity?.restrictions?.height?.min },
                      { label: 'Max', value: activity?.restrictions?.height?.max }
                    ]}
                    onChange={() => {}}
                  />
                </Box>
                <Box pb={[12, 12, 15, 18, 24]}>
                  <Restriction
                    disabled={!isEditing}
                    label="Pregnancy restrictions"
                    data-test="pregnancy-restrictions"
                    checked={activity?.restrictions?.pregnancy_restricted}
                    onChange={() => {}}
                  />
                </Box>
                <Box pb={[12, 12, 15, 18, 24]}>
                  <Restriction
                    disabled={!isEditing}
                    label="Disability restrictions"
                    data-test="disability-restrictions"
                    checked={activity?.restrictions?.disability_restricted}
                    onChange={() => {}}
                  />
                </Box>
                <Box pb={[12, 12, 15, 18, 24]}>
                  <Restriction
                    disabled={!isEditing}
                    label="Physical conditions restrictions"
                    data-test="physical-conditions-restrictions"
                    checked={activity?.restrictions?.physical_conditions?.restricted}
                    values={[
                      { label: 'Notes', value: activity?.restrictions?.physical_conditions?.notes }
                    ]}
                    onChange={() => {}}
                  />
                </Box>
              </Flex>
            </Flex>
          </FlexContainer>
        </Card>
      </Box>
    </Layout>
  )
}

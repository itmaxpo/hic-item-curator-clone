import React, { lazy, Suspense, useEffect, useState, useCallback } from 'react'
import queryString from 'query-string'
import { get } from 'lodash'
import { useNavigate } from 'react-router-dom'
import Layout from 'components/Layout'
import { Button, SecondaryButton, AlarmButton } from 'components/Button'
import {
  Wrapper,
  TitleWrapper,
  TitleField,
  TitleLangWrapper,
  LanguageBlock,
  ActiveTitleWrapper,
  ActiveWrapper,
  CheckboxWrapper,
  BreadcrumbsWrapper,
  BreadcrumbsLoader,
  MissingNameWrapper,
  TabsPanelWrapper,
  ActionButtonsWrapper,
  VisualizationWrapper
} from './styles'
import { generateBreadcrumbs } from './utils'
import {
  H2,
  H4,
  Base,
  COLORS,
  Checkbox,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabsContainer,
  PageContainer,
  Flex
} from '@tourlane/tourlane-ui'
import { SelectMarket } from '@tourlane/rooster'
import { getItemFieldsById } from 'services/contentApi'
import {
  getFieldName,
  FIELD_NAME,
  FIELD_ACTIVE_DESTINATION,
  FIELD_ORIGINAL_NAME,
  FIELD_BLOCKED,
  FIELD_VISUALIZATION_DESTINATION,
  getFieldContent
} from '../itemParser'
import {
  ACCOMMODATION_ITEM_TYPE,
  TOURISTIC_AREA_ITEM_TYPE,
  COUNTRY_ITEM_TYPE,
  AREA_ITEM_TYPE
} from 'utils/constants'
import ItemBadge from 'components/ItemBadge'
import LazyLoader from 'components/LazyLoader'
import Blocking from './Blocking'

const Breadcrumbs = lazy(() =>
  import(/* webpackChunkName: "Breadcrumbs" */ 'components/Breadcrumbs')
)

/**
 * Will render Item page layout with required fields
 * Render provided tab contents and breadcrumbs
 * Responsible for changing:
 *  - Title
 *  - Suppliers
 *  - Language
 *
 * @name ItemLayout
 * @param {Array<String>} tabs
 * @param {Array<React.Component>} tabContents
 * @param {Object} item
 * @param {Boolean} isEditing
 * @param {Function} onChange (receives prop and value of item to change)
 * @param {Function} onCountryUpdate (updates countryCode)
 * @returns ItemLayout component
 */
const ItemLayout = ({
  tabs,
  tabContents,
  item,
  isEditing,
  onEdit,
  onChange,
  onCountryUpdate,
  onCancel,
  onSave
}) => {
  // used to generate breadcrumbs
  const breadcrumbName =
    get(item, `locales['en-GB'].name`) ||
    get(item, `locales['de-DE'].name`) ||
    item[FIELD_ORIGINAL_NAME]
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [isFetchingBreadcrumbs, setIsFetchingBreadcrumbs] = useState(false)
  const navigate = useNavigate()

  const onTitleChange = (e) => {
    onChange(FIELD_NAME, e.target.value)
  }

  const onLanguageChange = (e, locale) => {
    e.preventDefault()
    navigate(`?${queryString.stringify({ language: locale })}`)
  }

  const onActiveDestinationChange = (e) => {
    onChange(FIELD_ACTIVE_DESTINATION, e.target.checked)
  }

  const onVizDestinationChange = (e) => {
    onChange(FIELD_VISUALIZATION_DESTINATION, e.target.checked)
  }

  // force re-render of SelectMarket component
  // so the flag icon represents the actual item language
  const SelectMarketCallback = useCallback(() => {
    return (
      <div data-test="item-language-switcher">
        <SelectMarket
          disabled={isEditing}
          showOnTop={false}
          onSelect={onLanguageChange}
          preSelectedMarket={item.language}
        />
      </div>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.language, isEditing])

  useEffect(() => {
    setBreadcrumbs([{ id: item.id, name: breadcrumbName }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id])

  // effect to update item name in breadcrumbs when changed by user
  useEffect(() => {
    if (breadcrumbs.length > 1) {
      setBreadcrumbs((prevBreadcrumbs) => {
        const lastBreadcrumb = prevBreadcrumbs[prevBreadcrumbs.length - 1]

        if (lastBreadcrumb) {
          const newBreadcrumbs = prevBreadcrumbs.slice(0, prevBreadcrumbs.length - 1)
          return [...newBreadcrumbs, { ...lastBreadcrumb, name: breadcrumbName }]
        } else {
          return prevBreadcrumbs
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breadcrumbName])

  useEffect(() => {
    // Async and recursive get parent of the item
    async function fetchParent(id) {
      const { data } = await getItemFieldsById(id)
      const name = getFieldName(data)
      if (data.item_type === COUNTRY_ITEM_TYPE) {
        onCountryUpdate(getFieldContent(data, 'iso_code'))
      }
      // Store only item with a name
      if (name && data.item_type !== TOURISTIC_AREA_ITEM_TYPE) {
        setBreadcrumbs((prevValues) => [{ id: data.uuid, name }, ...prevValues])
      }

      // If there is a parent, fetch it
      if (data.parent_uuid) {
        await fetchParent(data.parent_uuid)
      }
    }
    // Store all parents of the item to build breadcrumbs
    async function fetchAllItemParents() {
      // If item has parent - start recursive retreiving of the parents
      if (item.parentId) {
        setIsFetchingBreadcrumbs(true)
        await fetchParent(item.parentId)
        setIsFetchingBreadcrumbs(false)
      }
    }

    fetchAllItemParents()
  }, [item.parentId, onCountryUpdate])

  const missingNameForLocaleFlagUrl = `//www.countryflags.io/${
    item.language?.split('-')[1]
  }/flat/48.png`

  return (
    <Layout
      headerContent={
        <ActionButtonsWrapper>
          {isEditing ? (
            <>
              <AlarmButton data-test={'cancel-item-button'} title={'cancel'} onClick={onCancel} />
              <Button data-test={'save-item-button'} title={'save content'} onClick={onSave} />
            </>
          ) : (
            <SecondaryButton
              data-test={'edit-item-button'}
              title={'edit content'}
              onClick={onEdit}
            />
          )}
        </ActionButtonsWrapper>
      }
    >
      <Wrapper>
        <BreadcrumbsWrapper>
          {isFetchingBreadcrumbs ? (
            <BreadcrumbsLoader />
          ) : (
            <Suspense fallback={<BreadcrumbsLoader />}>
              <Breadcrumbs breadcrumbs={generateBreadcrumbs(breadcrumbs)} />
            </Suspense>
          )}
        </BreadcrumbsWrapper>

        <TitleWrapper data-test={'item-title-wrapper'} isEditing={isEditing}>
          <TitleLangWrapper p={0} alignItems={'center'} justifyContent={'space-between'}>
            {!isEditing ? (
              <ActiveTitleWrapper p={0} direction={'ttb'}>
                <H2>
                  {item.name ||
                    (item.language && (
                      <MissingNameWrapper>
                        No item name found for
                        <LazyLoader src={missingNameForLocaleFlagUrl} height="48px">
                          <img
                            src={missingNameForLocaleFlagUrl}
                            alt={`${item.language.split('-')[1]} Flag`}
                          />
                        </LazyLoader>
                      </MissingNameWrapper>
                    ))}
                </H2>
                <Flex>
                  <ActiveWrapper>
                    {item[FIELD_ACTIVE_DESTINATION] && (
                      <ItemBadge
                        width={'85px'}
                        background={COLORS.ADVENTURE_GREEN}
                        color={COLORS.SENSATION_WHITE}
                      >
                        <H4 bold>Active</H4>
                      </ItemBadge>
                    )}
                  </ActiveWrapper>
                  <VisualizationWrapper>
                    {item[FIELD_VISUALIZATION_DESTINATION] && (
                      <ItemBadge
                        width={'260px'}
                        background={COLORS.ADVENTURE_GREEN}
                        color={COLORS.SENSATION_WHITE}
                      >
                        <H4 bold>Visualization destination</H4>
                      </ItemBadge>
                    )}
                  </VisualizationWrapper>
                </Flex>
              </ActiveTitleWrapper>
            ) : (
              <ActiveTitleWrapper p={0} direction={'ttb'}>
                <TitleField
                  data-test={'item-title-input'}
                  defaultValue={item.name}
                  placeholder={breadcrumbName}
                  onChange={onTitleChange}
                />
                <Flex>
                  {item.type !== ACCOMMODATION_ITEM_TYPE && (
                    <CheckboxWrapper p={0} direction={'ltr'}>
                      <Checkbox
                        data-test={'item-is-active-checkbox'}
                        defaultChecked={item[FIELD_ACTIVE_DESTINATION]}
                        onChange={onActiveDestinationChange}
                      />
                      <span>Is active destination</span>
                    </CheckboxWrapper>
                  )}
                  {item.type === AREA_ITEM_TYPE && (
                    <CheckboxWrapper p={0} direction={'ltr'}>
                      <Checkbox
                        data-test={'item-is-viz-checkbox'}
                        defaultChecked={item[FIELD_VISUALIZATION_DESTINATION]}
                        onChange={onVizDestinationChange}
                      />
                      <span>Is visualization destination</span>
                    </CheckboxWrapper>
                  )}
                </Flex>
              </ActiveTitleWrapper>
            )}

            <LanguageBlock p={0} direction={'ltr'} isEditing={isEditing}>
              <Base>Switch content to: </Base>
              {item.language && <SelectMarketCallback />}
            </LanguageBlock>
          </TitleLangWrapper>
        </TitleWrapper>

        {item.type === ACCOMMODATION_ITEM_TYPE && (
          <Blocking isEditing={isEditing} blocked={item[FIELD_BLOCKED]} onChange={onChange} />
        )}
        <Tabs defaultSelected={tabs[0]}>
          <TabsContainer>
            <PageContainer>
              <TabList label={'item'}>
                {tabs.map((tab) => (
                  <Tab key={tab} name={tab}>
                    {tab}
                  </Tab>
                ))}
              </TabList>
            </PageContainer>
          </TabsContainer>
          <TabsPanelWrapper isBlocked={!isEditing && !!item[FIELD_BLOCKED]}>
            {tabContents.map((tabPanel, i) => (
              <TabPanel key={tabPanel} name={tabs[i]}>
                {tabPanel}
              </TabPanel>
            ))}
          </TabsPanelWrapper>
        </Tabs>
      </Wrapper>
    </Layout>
  )
}

export default ItemLayout

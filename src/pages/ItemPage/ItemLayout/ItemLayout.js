import React, { useContext, useEffect, useState, useCallback } from 'react'
import queryString from 'query-string'
import { get } from 'lodash'
import Layout from 'components/Layout'
import {
  Wrapper,
  TitleWrapper,
  SupplierDropdown,
  TitleField,
  TitleLangWrapper,
  LanguageBlock,
  ActiveTitleWrapper,
  ActiveWrapper,
  CheckboxWrapper,
  StyledImg,
  BreadCrumbsLoader
} from './styles'
import TabsWrapper from 'components/Tabs'
import { generateBreadcumbs } from './utils'
import { H2, H4, Base, COLORS, Checkbox } from '@tourlane/tourlane-ui'
import { SelectMarket } from '@tourlane/rooster'
import Breadcrumbs from 'components/Breadcrumbs'
import { getItemFieldsById } from 'services/contentApi'
import { getFieldName, FIELD_NAME, FIELD_ACTIVE_DESTINATION } from '../itemParser'
import { LANGUAGES, ACCOMMODATION_ITEM_TYPE } from 'utils/constants'
import ItemBadge from 'components/ItemBadge'
import SuppliersContext from 'contexts/Suppliers'
/**
 * Will render Item page layout with required fields
 * Render provided tab contents and breadcrumbs
 * Responsible for changing:
 *  - Title
 *  - Suppliers
 *  - Language
 *
 * @name ItemLayout
 * @param {Object} history from react-router
 * @param {Array<String>} tabs
 * @param {Array<React.Component>} tabContents
 * @param {Object} item
 * @param {Boolean} isEditing
 * @param {Function} onChange (receives prop and value of item to change)
 * @returns ItemLayout component
 */
const ItemLayout = ({ history, tabs, tabContents, item, isEditing, onChange }) => {
  // used to generate breadcrumbs
  const breadcrumbName = get(item, `locales['en-GB'].name`) || get(item, `locales['de-DE'].name`)
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [isFetchingBreadcrumbs, setIsFetchingBreadcrumbs] = useState(false)
  const { suppliers } = useContext(SuppliersContext)

  const onTitleChange = e => {
    onChange(FIELD_NAME, e.target.value)
  }

  const onSuppliersChange = val => {
    onChange('supplier_tag', val.value)
  }

  const onLanguageChange = language => {
    if (!language) return
    history.push(`?${queryString.stringify({ language: LANGUAGES[language.title] })}`)
  }

  const onActiveDestinationChange = e => {
    onChange(FIELD_ACTIVE_DESTINATION, e.target.checked)
  }

  // force re-render of SelectMarket component
  // so the flag icon represents the actual item language
  const SelectMarketCallback = useCallback(() => {
    return (
      <SelectMarket
        data-test={'item-language-switcher'}
        disabled={isEditing}
        showOnTop={false}
        onSelect={onLanguageChange}
        preSelectedMarket={item.language}
      />
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.language, isEditing])

  useEffect(() => {
    setBreadcrumbs([{ id: item.id, name: breadcrumbName }])
  }, [item.id, breadcrumbName])

  useEffect(() => {
    // Async and recursive get parent of the item
    async function fetchParent(id) {
      const { data } = await getItemFieldsById(id)
      const name = getFieldName(data)
      // Store only item with a name
      if (name) {
        setBreadcrumbs(prevValues => [{ id: data.uuid, name }, ...prevValues])
      }

      // If there is a parent - load him if not set flag to true
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
  }, [item.parentId])

  return (
    <Layout>
      <Wrapper>
        {isFetchingBreadcrumbs ? (
          <BreadCrumbsLoader />
        ) : (
          <Breadcrumbs breadcrumbs={generateBreadcumbs(breadcrumbs)} />
        )}

        <TitleWrapper data-test={'item-title-wrapper'} isEditing={isEditing}>
          <TitleLangWrapper p={0} alignItems={'center'} justifyContent={'space-between'}>
            {!isEditing ? (
              <ActiveTitleWrapper p={0} direction={'ttb'}>
                <H2>
                  {item.name || (
                    <span>
                      No item name found for
                      <StyledImg
                        src={`//www.countryflags.io/${item.language.split('-')[1]}/flat/48.png`}
                      />
                    </span>
                  )}
                </H2>
                <ActiveWrapper>
                  {item[FIELD_ACTIVE_DESTINATION] && (
                    <ItemBadge
                      width={'85px'}
                      background={COLORS.ADVENTURE_GREEN}
                      color={COLORS.SENSATION_WHITE}
                    >
                      <H4>Active</H4>
                    </ItemBadge>
                  )}
                </ActiveWrapper>
              </ActiveTitleWrapper>
            ) : (
              <ActiveTitleWrapper p={0} direction={'ttb'}>
                <TitleField
                  data-test={'item-title-input'}
                  defaultValue={item.name}
                  placeholder={breadcrumbName}
                  onChange={onTitleChange}
                />
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
              </ActiveTitleWrapper>
            )}

            <LanguageBlock p={0} direction={'ltr'} isEditing={isEditing}>
              <Base>Switch content to: </Base>
              {item.language && <SelectMarketCallback />}
            </LanguageBlock>
          </TitleLangWrapper>

          {item.type === ACCOMMODATION_ITEM_TYPE && (
            <>
              {!isEditing ? (
                item.supplier_tag && (
                  <Base>
                    {' '}
                    Supplier tag: <span data-test={'item-supplier-tag'}>{item.supplier_tag}</span>
                  </Base>
                )
              ) : (
                <div data-test={'item-supplier-dropdown'}>
                  <SupplierDropdown
                    placeholder={'Select supplier tag...'}
                    options={suppliers}
                    defaultValue={suppliers.filter(s => item.supplier_tag === s.value)}
                    onChange={onSuppliersChange}
                  />
                </div>
              )}
            </>
          )}
        </TitleWrapper>

        <TabsWrapper tabs={tabs} tabContents={tabContents} />
      </Wrapper>
    </Layout>
  )
}

export default ItemLayout

import React, { useEffect, useRef, useState } from 'react'
import { isEmpty, get } from 'lodash'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Layout from 'components/Layout'
import {
  Wrapper,
  TitleWrapper,
  SupplierDropdown,
  TitleField,
  TitleLangWrapper,
  LanguageBlock,
  StyledP,
  ActiveTitleWrapper,
  CheckboxWrapper
} from './styles'
import TabsWrapper from 'components/Tabs'
import { flagEmoji, suppliers, generateBreadcumbs } from './utils'
import { H2, Base, Checkbox } from '@tourlane/tourlane-ui'
import Breadcrumbs from 'components/Breadcrumbs'
import { getItemFieldsById } from 'services/contentApi'
import {
  getFieldName,
  FIELD_NAME,
  COUNTRY_ITEM_TYPE,
  AREA_ITEM_TYPE,
  FIELD_ACTIVE_DESTINATION
} from '../itemParser'
import { WorldIcon } from 'components/Icon'
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
 * @returns ItemLayout component
 */
const ItemLayout = ({ tabs, tabContents, item, isEditing, onChange }) => {
  // used to generate breadcrumbs
  const breadcrumbName = get(item, `locales['en-GB'].name`) || get(item, `locales['de-DE'].name`)
  const allItemParents = useRef([{ id: item.id, name: breadcrumbName }])
  const [areItemsLoaded, setAreItemsLoaded] = useState(false)

  const onTitleChange = e => {
    onChange(FIELD_NAME, e.target.value)
  }

  const onSuppliersChange = val => {
    onChange('suppliers', val.map(v => v.value))
  }

  const onLanguageChange = e => {
    onChange('language', e.target.value)
  }

  const onIsActiveDestinationChange = e => {
    onChange(FIELD_ACTIVE_DESTINATION, e.target.checked)
  }

  useEffect(() => {
    // Async and recursive get parent of the item
    async function fetchParent(id) {
      const { data } = await getItemFieldsById(id)
      const itemName = getFieldName(data)
      // Store only item with a name
      if (itemName) {
        allItemParents.current.unshift({
          id: data.uuid,
          name: itemName
        })
      }

      // If there is a parent - load him if not set flag to true
      if (data.parent_uuid) {
        await fetchParent(data.parent_uuid)
      } else {
        setAreItemsLoaded(true)
      }
    }
    // Store all parents of the item to build breadcrumbs
    async function fetchAllItemParents() {
      // If item has parent - start recursive retreiving of the parents
      if (item.parentId) {
        await fetchParent(item.parentId)
      }
    }

    fetchAllItemParents()
  }, [item.parentId])

  return (
    <Layout>
      <Wrapper>
        {areItemsLoaded ? (
          <Breadcrumbs breadcrumbs={generateBreadcumbs(allItemParents.current)} />
        ) : (
          <StyledP>&nbsp;</StyledP>
        )}

        <TitleWrapper isEditing={isEditing}>
          <TitleLangWrapper p={0} alignItems={'center'} justifyContent={'space-between'}>
            {!isEditing ? (
              <ActiveTitleWrapper alignItems={'center'}>
                <H2>{item.name}</H2>
                <span>{item[FIELD_ACTIVE_DESTINATION] && <WorldIcon />}</span>
              </ActiveTitleWrapper>
            ) : (
              <ActiveTitleWrapper alignItems={'center'}>
                <TitleField defaultValue={item.name} onChange={onTitleChange} />
                {(item.type === COUNTRY_ITEM_TYPE || item.type === AREA_ITEM_TYPE) && (
                  <CheckboxWrapper>
                    <span>Active: </span>
                    <Checkbox
                      value={item[FIELD_ACTIVE_DESTINATION]}
                      name="isActiveDestination"
                      defaultChecked={item[FIELD_ACTIVE_DESTINATION]}
                      onChange={onIsActiveDestinationChange}
                    />
                  </CheckboxWrapper>
                )}
              </ActiveTitleWrapper>
            )}

            <LanguageBlock isEditing={isEditing}>
              <Base>Switch content to: </Base>
              <Select
                disableUnderline
                value={flagEmoji.find(lang => lang.value === item.language).value}
                onChange={onLanguageChange}
                inputProps={{
                  name: 'flag',
                  id: 'flag-simple'
                }}
              >
                {flagEmoji.map(lang => (
                  <MenuItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </MenuItem>
                ))}
              </Select>
            </LanguageBlock>
          </TitleLangWrapper>

          {item.suppliers && !isEmpty(item.suppliers) && (
            <>
              {!isEditing ? (
                <Base>
                  {' '}
                  Suppliers:
                  {item.suppliers.map((s, i) => (
                    <span key={i}> {`${i !== item.suppliers.length - 1 ? s + ',' : s}`}</span>
                  ))}
                </Base>
              ) : (
                <SupplierDropdown
                  isMulti
                  options={suppliers}
                  defaultValue={suppliers.filter(s => item.suppliers.includes(s.value))}
                  onChange={onSuppliersChange}
                />
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

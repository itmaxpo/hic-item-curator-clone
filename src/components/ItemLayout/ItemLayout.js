import React, { Fragment } from 'react'
import { isEmpty } from 'lodash'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Layout from 'components/Layout'
import {
  Wrapper,
  StyledBreadcrumbs,
  TitleWrapper,
  SupplierDropdown,
  TitleField,
  TitleLangWrapper,
  LanguageBlock
} from './styles'
import TabsWrapper from 'components/Tabs'
import { ChevronRightIcon } from 'components/Icon'
import { flagEmoji, suppliers, generateBreadcumbs } from './utils'

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
  // TODO: Actual location change to search page with selected item pre-filled
  const onBreadcrumbClick = () => {
    console.log(item)
  }

  const onTitleChange = e => {
    onChange('title', e.target.value)
  }

  const onSuppliersChange = val => {
    onChange('suppliers', val.map(v => v.value))
  }

  const onLanguageChange = e => {
    onChange('language', e.target.value)
  }

  return (
    <Layout>
      <Wrapper>
        <StyledBreadcrumbs aria-label="breadcrumb" separator={<ChevronRightIcon />}>
          {generateBreadcumbs(item, onBreadcrumbClick).map((bc, i) => (
            <Fragment key={i}>{bc}</Fragment>
          ))}
        </StyledBreadcrumbs>

        <TitleWrapper isEditing={isEditing}>
          <TitleLangWrapper p={0} alignItems={'center'} justifyContent={'space-between'}>
            {!isEditing ? (
              <h1>{item.title}</h1>
            ) : (
              <TitleField defaultValue={item.title} onChange={onTitleChange} />
            )}

            <LanguageBlock className={`${isEditing ? 'editing' : ''}`}>
              <span>Switch content to: </span>
              <Select
                disableUnderline
                value={item.language}
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

          {!isEmpty(item.suppliers) && !isEditing ? (
            <p>
              {' '}
              Suppliers:
              {item.suppliers.map((s, i) => (
                <span key={i}> {`${i !== item.suppliers.length - 1 ? s + ',' : s}`}</span>
              ))}
            </p>
          ) : (
            <SupplierDropdown
              isMulti
              options={suppliers}
              defaultValue={suppliers.filter(s => item.suppliers.includes(s.value))}
              onChange={onSuppliersChange}
            />
          )}
        </TitleWrapper>

        <TabsWrapper tabs={tabs} tabContents={tabContents} />
      </Wrapper>
    </Layout>
  )
}

export default ItemLayout

import React from 'react'
import { isEmpty } from 'lodash'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Layout from 'components/Layout'
import {
  Wrapper,
  TitleWrapper,
  SupplierDropdown,
  TitleField,
  TitleLangWrapper,
  LanguageBlock
} from './styles'
import TabsWrapper from 'components/Tabs'
import { flagEmoji, suppliers, generateBreadcumbs } from './utils'
import { H2, Base } from '@tourlane/tourlane-ui'
import Breadcrumbs from 'components/Breadcrumbs'

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
        <Breadcrumbs breadcrumbs={generateBreadcumbs(item)} />

        <TitleWrapper isEditing={isEditing}>
          <TitleLangWrapper p={0} alignItems={'center'} justifyContent={'space-between'}>
            {!isEditing ? (
              <H2>{item.title}</H2>
            ) : (
              <TitleField defaultValue={item.title} onChange={onTitleChange} />
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

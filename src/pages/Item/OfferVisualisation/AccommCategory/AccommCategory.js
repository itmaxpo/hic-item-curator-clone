import React, { Fragment, useContext } from 'react'
import { H4, Dropdown, Big } from '@tourlane/tourlane-ui'
import { TitleWithContent, SearchItemWrapper } from '../styles'
import { Wrapper } from './styles'
import CategoriesContext, {
  getCategoryLabel,
  getCategoryValue,
  getDefaultCategoryValue
} from 'contexts/AccommCategories'
import { ACCOMM_CATEGORY_COMPONENT_NAME } from 'pages/Item/utils'

export const AccommCategory = ({ key, isEditing, item, onChange }) => {
  const categories = useContext(CategoriesContext)

  const categoryLabel = getCategoryLabel(item)
  const value = getCategoryValue(item)

  const handleChange = value => {
    const categoryValue = !value ? getDefaultCategoryValue() : value
    onChange([ACCOMM_CATEGORY_COMPONENT_NAME], `kiwi://Elephant/Item/${categoryValue}`)
  }
  return (
    <Fragment key={key}>
      <TitleWithContent withoutPadding data-test="category">
        <SearchItemWrapper p={0} direction={'ttb'}>
          <H4>CATEGORY</H4>
          {isEditing ? (
            <Wrapper>
              <Dropdown
                data-test="category-dropdown"
                placeholder="Select Category"
                value={value}
                fullWidth={false}
                options={categories}
                onChange={handleChange}
              />
            </Wrapper>
          ) : (
            <Big withTopPadding>{categoryLabel}</Big>
          )}
        </SearchItemWrapper>
      </TitleWithContent>
    </Fragment>
  )
}

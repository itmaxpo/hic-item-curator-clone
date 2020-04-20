import React, { Fragment, useContext } from 'react'
import { H4, Dropdown, Big } from '@tourlane/tourlane-ui'
import { TitleWithContent, SearchItemWrapper } from '../styles'
import { Wrapper } from './styles'
import AccommCategoriesContext, {
  getCategoryLabel,
  getDefaultCategoryValue
} from 'contexts/AccommodationCategories'
import { CATEGORY_COMPONENT_NAME } from 'pages/Item/utils'

export const Category = ({ key, isEditing, item, onChange }) => {
  const accommCategories = useContext(AccommCategoriesContext)

  const categoryLabel = getCategoryLabel(item)
  const defaultValue = getDefaultCategoryValue(item)

  const handleChange = value => {
    onChange([CATEGORY_COMPONENT_NAME], `kiwi://Elephant/Item/${value}`)
  }
  return (
    <Fragment key={key}>
      <TitleWithContent withoutPadding>
        <SearchItemWrapper p={0} direction={'ttb'}>
          <H4>CATEGORY</H4>
          {isEditing ? (
            <Wrapper>
              <Dropdown
                placeholder="Select Budget"
                value={defaultValue}
                fullWidth={false}
                options={accommCategories}
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

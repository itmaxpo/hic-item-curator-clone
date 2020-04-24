import React, { useContext } from 'react'
import { H4, Dropdown, Big } from '@tourlane/tourlane-ui'
import { Wrapper } from './styles'
import CategoriesContext, {
  getCategoryLabel,
  getCategoryValue,
  getDefaultCategoryValue
} from 'contexts/AccommCategories'

export const AccommCategory = ({ isEditing, item, onChange }) => {
  const categories = useContext(CategoriesContext)

  const categoryLabel = getCategoryLabel(item)
  const value = getCategoryValue(item)

  const handleChange = value => {
    const categoryValue = !value ? getDefaultCategoryValue() : value
    onChange(categoryValue)
  }

  return (
    <div data-test="category">
      <H4>Budget Category</H4>
      {isEditing ? (
        <Wrapper>
          <Dropdown
            data-test="category-dropdown"
            placeholder="Select Category"
            value={value}
            fullWidth
            options={categories}
            onChange={handleChange}
            notClearable
          />
        </Wrapper>
      ) : (
        <Big withTopPadding>{categoryLabel}</Big>
      )}
    </div>
  )
}

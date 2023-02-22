import React from 'react'
import { H4, Dropdown, Big } from '@tourlane/tourlane-ui'
import { useAccommodationCategories } from 'contexts/AccommCategories/AccommCategories'
import { Wrapper } from './styles'
import {
  getCategoryLabel,
  getCategoryValue,
  getDefaultCategoryValue
} from 'contexts/AccommCategories'

export const AccommCategory = ({ isEditing, item, onChange }) => {
  const categories = useAccommodationCategories()
  const categoryLabel = getCategoryLabel(item, categories)
  const value = getCategoryValue(item, categories)

  const handleChange = (value) => {
    const categoryValue = !value ? getDefaultCategoryValue(categories) : value
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

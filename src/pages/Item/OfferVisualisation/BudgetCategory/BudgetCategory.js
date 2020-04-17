import React, { Fragment, useContext } from 'react'
import { H4, Dropdown, Big } from '@tourlane/tourlane-ui'
import { TitleWithContent, SearchItemWrapper } from '../styles'
import { Wrapper } from './styles'
import AccommCategoriesContext, { getCategoryLabel } from 'contexts/AccommodationCategories'
import { ACCOMM_CATEGORY_COMPONENT_NAME } from 'pages/Item/utils'

export const BudgetCategory = ({ key, isEditing, item, onChange }) => {
  const accommCategories = useContext(AccommCategoriesContext)

  const categoryLabel = getCategoryLabel(item)

  const handleChange = value => {
    onChange([ACCOMM_CATEGORY_COMPONENT_NAME], `kiwi://Elephant/Item/${value}`)
  }
  return (
    <Fragment key={key}>
      <TitleWithContent withoutPadding>
        <SearchItemWrapper p={0} direction={'ttb'}>
          <H4>BUDGET CATEGORY</H4>
          {isEditing ? (
            <Wrapper>
              <Dropdown
                placeholder="Select Budget"
                value={categoryLabel ? categoryLabel : ''}
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

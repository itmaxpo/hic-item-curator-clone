import React, { Fragment, useContext } from 'react'
import { H4, Dropdown, Big } from '@tourlane/tourlane-ui'
import { TitleWithContent, SearchItemWrapper } from '../styles'
import { Wrapper } from './styles'
import AccommCategoriesContext from 'contexts/AccommodationCategories'

export const BudgetCategory = ({ key, isEditing, item }) => {
  const accommCategories = useContext(AccommCategoriesContext)
  return (
    <Fragment key={key}>
      <TitleWithContent withoutPadding>
        <SearchItemWrapper p={0} direction={'ttb'}>
          <H4>BUDGET CATEGORY</H4>
          {isEditing ? (
            <Wrapper>
              <Dropdown placeholder="Select Budget" fullWidth={false} options={accommCategories} />
            </Wrapper>
          ) : (
            <Big withTopPadding>{item.budget_category}</Big>
          )}
        </SearchItemWrapper>
      </TitleWithContent>
    </Fragment>
  )
}

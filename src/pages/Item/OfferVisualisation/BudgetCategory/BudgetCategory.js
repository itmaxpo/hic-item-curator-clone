import React, { Fragment } from 'react'
import { H4, Dropdown, Big } from '@tourlane/tourlane-ui'
import { TitleWithContent, SearchItemWrapper } from '../styles'
import { Wrapper } from './styles'

export const BudgetCategory = ({ key, isEditing }) => (
  <Fragment key={key}>
    <TitleWithContent withoutPadding>
      <SearchItemWrapper p={0} direction={'ttb'}>
        <H4>BUDGET CATEGORY</H4>
        {isEditing ? (
          <Wrapper>
            <Dropdown placeholder="Select Budget" fullWidth={false} />
          </Wrapper>
        ) : (
          <Big withTopPadding>Eco-Budget</Big>
        )}
      </SearchItemWrapper>
    </TitleWithContent>
  </Fragment>
)

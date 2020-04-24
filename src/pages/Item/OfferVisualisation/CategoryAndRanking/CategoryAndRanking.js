import React, { useState } from 'react'

import { ACCOMM_CATEGORY_COMPONENT_NAME } from 'pages/Item/utils'
import { getCategoryLabel } from 'contexts/AccommCategories'

import AccommCategory from '../AccommCategory'
import AccommRanking from '../AccommRanking'

import { TitleWithContent, SearchItemWrapper } from '../styles'
import { Wrapper } from './styles'

export const CategoryAndRanking = ({ isEditing, item, onChange }) => {
  const [state, setState] = useState({
    ranking: item?.ranking,
    category: item?.accommodation_category
  })

  const handleOnChange = field => value => {
    setState({
      ...state,
      [field]: value
    })

    if (field === 'category') {
      onChange(ACCOMM_CATEGORY_COMPONENT_NAME, `kiwi://Elephant/Item/${value}`)
      onChange('ranking', null)
    } else {
      onChange('ranking', value)
    }
  }

  const noCategory = getCategoryLabel(item) === 'No Category'
  const disabledRanking = noCategory || !state.category

  return (
    <TitleWithContent withoutPadding data-test="category_and_ranking">
      <SearchItemWrapper p={0} direction={'ttb'}>
        <Wrapper isEditing={isEditing}>
          <AccommCategory isEditing={isEditing} item={item} onChange={handleOnChange('category')} />
          <AccommRanking
            isEditing={isEditing}
            ranking={noCategory ? null : state.ranking}
            onChange={handleOnChange('ranking')}
            disabled={disabledRanking}
          />
        </Wrapper>
      </SearchItemWrapper>
    </TitleWithContent>
  )
}

import React, { useCallback } from 'react'

import { ACCOMM_CATEGORY_COMPONENT_NAME } from 'pages/Item/utils'

import AccommCategory from '../AccommCategory'
import AccommRanking from '../AccommRanking'

import { TitleWithContent, SearchItemWrapper } from '../styles'
import { Wrapper } from './styles'

export const CategoryAndRanking = ({ isEditing, item, onChange }) => {
  const handleRankingChange = useCallback(
    (value = null) => {
      onChange('ranking', value)
    },
    [onChange]
  )
  const handleCategoryChange = useCallback(
    (value = null) => {
      onChange(ACCOMM_CATEGORY_COMPONENT_NAME, value)
      onChange('ranking', null)
    },
    [onChange]
  )
  const noCategory = item[ACCOMM_CATEGORY_COMPONENT_NAME] == null
  const disabledRanking = noCategory || !item.accommodation_category

  return (
    <TitleWithContent withoutPadding data-test="category_and_ranking">
      <SearchItemWrapper p={0} direction={'ttb'}>
        <Wrapper isEditing={isEditing}>
          <AccommCategory isEditing={isEditing} item={item} onChange={handleCategoryChange} />
          <AccommRanking
            isEditing={isEditing}
            ranking={noCategory ? null : item.ranking}
            onChange={handleRankingChange}
            disabled={disabledRanking}
          />
        </Wrapper>
      </SearchItemWrapper>
    </TitleWithContent>
  )
}

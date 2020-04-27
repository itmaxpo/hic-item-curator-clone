import React, { useCallback, useReducer } from 'react'

import { ACCOMM_CATEGORY_COMPONENT_NAME } from 'pages/Item/utils'
import { getCategoryLabel } from 'contexts/AccommCategories'

import AccommCategory from '../AccommCategory'
import AccommRanking from '../AccommRanking'

import { TitleWithContent, SearchItemWrapper } from '../styles'
import { Wrapper } from './styles'

export const CategoryAndRanking = ({ isEditing, item, onChange }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'category':
        let newState = { category: action.value }
        onChange(ACCOMM_CATEGORY_COMPONENT_NAME, action.value)
        newState = { ...newState, ranking: null }
        onChange('ranking', null)
        return newState

      case 'ranking':
        onChange('ranking', action.value)
        return { ...state, ranking: action.value }
      default:
        console.error('Unknown field type passed to CategoryAndRanking')
        break
    }
  }
  const initialState = {
    category: item?.accommodation_category,
    ranking: item?.ranking
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleOnChange = useCallback(
    field => (value = null) => {
      dispatch({ type: field, value })
    },
    []
  )
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

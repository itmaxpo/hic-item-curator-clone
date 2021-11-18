import React from 'react'
import { H4, Dropdown, Big } from '@tourlane/tourlane-ui'
import { Wrapper } from './styles'

const rankingOptions = [
  {
    value: null,
    label: 'No Rank'
  },
  {
    value: 1,
    label: '1st (Highest Priority)'
  },
  {
    value: 2,
    label: '2nd'
  },
  {
    value: 3,
    label: '3rd'
  },
  {
    value: 4,
    label: '4th'
  },
  {
    value: 5,
    label: '5th (Lowest Priority)'
  }
]

export const AccommRanking = ({ isEditing, ranking, onChange, disabled }) => {
  const rankOption = rankingOptions.find((el) => el.value === ranking) || rankingOptions[0]

  return (
    <div data-test="ranking" data-test-disabled={disabled ? 'true' : 'false'}>
      <H4>Ranking</H4>
      {isEditing ? (
        <Wrapper>
          <Dropdown
            data-test="ranking-dropdown"
            placeholder="Select Priority"
            value={ranking}
            fullWidth
            options={rankingOptions}
            onChange={onChange}
            disabled={disabled}
            notClearable
          />
        </Wrapper>
      ) : (
        <Big withTopPadding>{rankOption?.label}</Big>
      )}
    </div>
  )
}

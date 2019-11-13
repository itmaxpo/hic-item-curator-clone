import { get } from 'lodash'

export const parseSearchBoxResponse = data =>
  data.map(address => ({
    label: get(address, 'display_name'),
    value: get(address, 'display_name'),
    ...address
  }))

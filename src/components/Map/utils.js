import { get, omit } from 'lodash'

export const parseSearchBoxResponse = data =>
  data.map(address => ({
    label: get(address, 'display_name'),
    value: get(address, 'display_name'),
    ...omit(address, 'icon')
  }))

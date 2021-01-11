import React from 'react'
import { Flex, Checkbox, Label, TextField } from '@tourlane/tourlane-ui'

export const RangeRestriction = ({ label, checked, disabled, from, to, ...rest }) => {
  return (
    <Flex>
      <Label disabled={disabled}>
        <Checkbox disabled={disabled} {...rest} />
        {label}
      </Label>
      {checked ? (
        <Flex>
          <TextField placeholder="From" value={from} shrinkingPlaceholder />
          <TextField placeholder="To" value={to} shrinkingPlaceholder />
        </Flex>
      ) : null}
    </Flex>
  )
}

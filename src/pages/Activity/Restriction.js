import React from 'react'
import { Flex, Checkbox, Label, FlexContainer } from '@tourlane/tourlane-ui'
import { StyledTextField } from './styles'

export const Restriction = ({ label, checked, disabled, values, ...rest }) => {
  return (
    <Flex direction="ttb" fullWidth>
      <Label disabled={disabled}>
        <Checkbox checked={checked} disabled={disabled} {...rest} />
        {label}
      </Label>
      {checked && values ? (
        <Flex>
          {values.map(value => (
            <FlexContainer fullWidth py={1 / 2} pl={1} pr={0}>
              <StyledTextField
                disabled={disabled}
                placeholder={value.label}
                data-test={value.label}
                value={value.value}
                shrinkPlaceholder
              />
            </FlexContainer>
          ))}
        </Flex>
      ) : null}
    </Flex>
  )
}

import React from 'react'
import { Flex, H5, TextField } from '@tourlane/tourlane-ui'

export const Text = ({ label, value, disabled, onChange, ...rest }) => (
  <Flex direction="ttb" pb={[12, 12, 15, 18, 24]}>
    <H5 withBottomMargin>{label}</H5>
    <TextField disabled={disabled} value={value} onChange={onChange} {...rest} />
  </Flex>
)

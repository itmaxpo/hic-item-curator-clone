import React from 'react'
import { SelectMarket } from '@tourlane/rooster'
import { Box } from '@tourlane/tourlane-ui'

export const Market = ({ language, onLanguageChange, disabled }) =>
  language ? (
    <Box data-test="item-language-switcher" pl={15}>
      <SelectMarket
        disabled={disabled}
        showOnTop={false}
        onSelect={onLanguageChange}
        preSelectedMarket={language}
      />
    </Box>
  ) : null

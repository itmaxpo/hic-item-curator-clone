import React from 'react'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import { Button as TuiButton, COLORS } from '@tourlane/tourlane-ui'
import { sharedButtonStyle } from 'components/Button'

// returns true if an url is external
const isExternal = (url) => /^https?:\/\//.test(url)

/**
 * Extension of react-router's Link that also works for external URL's
 *
 * @name BaseLink
 * @param {string} to
 */
const BaseLink = ({ to, children, ...otherProps }) => {
  return isExternal(to) ? (
    <a href={to} {...otherProps}>
      {children}
    </a>
  ) : (
    <RouterLink to={to} {...otherProps}>
      {children}
    </RouterLink>
  )
}

/** Link components sharing the same style as "Button" & "SecondaryButton".
 * NOTE: This copies some styles from tourlane-ui because of limitations when changing the
 * base DOM element.
 *
 * @name Link
 * @param {props} props
 * */

const Link = styled((props) => (
  <TuiButton as={BaseLink} activeBackgroundColor={COLORS.ADVENTURE_GREEN_FOCUSED} {...props} />
))`
  ${sharedButtonStyle}
  background-color: ${COLORS.ADVENTURE_GREEN};
  color: ${COLORS.SENSATION_WHITE};
`

/**
 * The same as Link component, but with different styles
 *
 * @name SecondaryLink
 * @param {props} props
 */
const SecondaryLink = styled((props) => (
  <TuiButton as={BaseLink} activeBackgroundColor={COLORS.BACKGROUND_GRAY} {...props} />
))`
  ${sharedButtonStyle}
  background-color: ${COLORS.SENSATION_WHITE};
  color: ${COLORS.ADVENTURE_GREEN};
`

export { Link, SecondaryLink, BaseLink }

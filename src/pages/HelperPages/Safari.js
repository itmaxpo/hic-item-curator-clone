import React from 'react'
import { ReactComponent as LogoSvg } from 'icons/itemCuratorLogo.svg'
import { P, Link } from '@tourlane/tourlane-ui'
import { StyledP } from './styles'
import { BackgroundSingleCard } from 'components/Background'

/**
 * Render this page when user is using Safari
 *
 * @name SafariPage
 * @returns {Object} Safari Page
 */

const SafariPage = ({ onContinue }) => {
  return (
    <BackgroundSingleCard cardProps={{ width: 'auto' }}>
      <LogoSvg>Item Curator</LogoSvg>
      <StyledP>Hey, looks like you are using Safari!</StyledP>
      <P>
        In order for this website to work, please go to your browser's{' '}
        <strong>Preferences {'>'} Privacy</strong> tab and uncheck the{' '}
        <strong>Prevent cross-site tracking</strong> option and restart your browser
      </P>
      <img
        src="https://cdn2.auth0.com/docs/media/articles/api-auth/safari-privacy-preferences.png"
        alt="Safari privacy preferences pane"
      />
      <P>
        If you already did this, <Link onClick={onContinue}>continue to Item Curator</Link>
      </P>
    </BackgroundSingleCard>
  )
}

export default SafariPage

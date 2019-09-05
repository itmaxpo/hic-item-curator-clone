import React from 'react'
import { ReactComponent as LogoSvg } from 'icons/itemCuratorLogo.svg'
import { useAuth0 } from 'contexts/Auth/AuthProvider'
import { P, Button } from '@tourlane/tourlane-ui'
import { StyledP, StyledLink } from './styles'
import { BackgroundSingleCard } from 'components/Background'

/**
 * This is the 404/Missing Page component
 * Every time the route is missing will be redirected to this page
 *
 * @name MissingPage
 * @returns {Object} Missing Page
 */

const MissingPage = ({ history }) => {
  const { user } = useAuth0()

  return (
    <BackgroundSingleCard>
      <LogoSvg>Item Curator</LogoSvg>
      {user && (
        <StyledP>
          Hey, <b>{user.given_name}</b>, looks like you are lost!
        </StyledP>
      )}
      <P>In this case just click the magic button to go to Search page</P>
      <Button onClick={() => history.push('/')}>
        <StyledLink to={'/'}>Sweet home, Alabama!</StyledLink>
      </Button>
    </BackgroundSingleCard>
  )
}

export default MissingPage

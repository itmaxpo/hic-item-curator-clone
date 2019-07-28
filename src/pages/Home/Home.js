import React from 'react'
import { P } from '@tourlane/tourlane-ui'
import { SecondaryButton } from 'components/Button'
import styled from 'styled-components'
import LayoutSingleCard from 'components/Layout'
import { ReactComponent as LogoSvg } from 'icons/itemCuratorLogo.svg'
import { useAuth0 } from 'contexts/Auth/AuthWrapper'

const StyledP = styled(P)`
  & {
    margin-top: 24px;
  }
`

const StyledButton = styled(SecondaryButton)`
  width: 100%;
`

/**
 * This is the Home Page component
 *
 * @name Home
 * @returns {Object} Home Page
 */

const Home = () => {
  const { user, logout } = useAuth0()

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    })

  return (
    <LayoutSingleCard>
      <LogoSvg>Item Curator</LogoSvg>
      {user && <StyledP>{`Welcome ${user.given_name}`}</StyledP>}
      <StyledButton onClick={() => logoutWithRedirect()}>Logout</StyledButton>
    </LayoutSingleCard>
  )
}

export default Home

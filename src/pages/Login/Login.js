import React from 'react'
import { P } from '@tourlane/tourlane-ui'
import { Button } from 'components/Button'
import styled from 'styled-components'
import { BackgroundSingleCard } from 'components/Background'
import { ReactComponent as LogoSvg } from 'icons/itemCuratorLogo.svg'
import { useAuth0 } from 'contexts/Auth'

const StyledP = styled(P)`
  & {
    margin-top: 24px;
  }
`

const StyledButton = styled(Button)`
  width: 100%;
`

/**
 * This is the Login Page component
 *
 * @name Login
 * @returns {Object} Login Page
 */

const Login = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <BackgroundSingleCard>
      <LogoSvg>Item Curator</LogoSvg>
      <StyledP>Seamless and smooth item management.</StyledP>
      <StyledButton onClick={() => loginWithRedirect({})}>Login with Google</StyledButton>
    </BackgroundSingleCard>
  )
}

export default Login

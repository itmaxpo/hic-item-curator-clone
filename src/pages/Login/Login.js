import React from 'react'
import { BackgroundSingleCard } from 'components/Background'
import { ReactComponent as LogoSvg } from 'icons/itemCuratorLogo.svg'
import { useAuth0 } from 'contexts/Auth'
import { StyledP, StyledButton } from './styles'

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

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
      <StyledButton
        onClick={() =>
          // https://github.com/auth0/auth0-spa-js/issues/574#issuecomment-688838781
          loginWithRedirect({
            appState: {
              // this targetUrl is used in src/indexjs/:onRedirectCallback()
              targetUrl: window.location.href
            }
          })
        }
      >
        Login with Google
      </StyledButton>
    </BackgroundSingleCard>
  )
}

export default Login

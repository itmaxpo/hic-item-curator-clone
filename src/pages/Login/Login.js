import React from 'react'
import { BackgroundSingleCard } from 'components/Background'
import { ReactComponent as LogoSvg } from 'icons/itemCuratorLogo.svg'
import { authManager } from '../../utils/AuthManager'
import { StyledP, StyledButton } from './styles'

const Login = () => (
  <BackgroundSingleCard>
    <LogoSvg>Item Curator</LogoSvg>
    <StyledP>Seamless and smooth item management.</StyledP>
    <StyledButton onClick={() => authManager.loginWithPopup()}>Login with Google</StyledButton>
  </BackgroundSingleCard>
)

export default Login

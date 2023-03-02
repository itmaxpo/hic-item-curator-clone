import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import { BackgroundSingleCard } from 'components/Background'
import { ReactComponent as LogoSvg } from 'icons/itemCuratorLogo.svg'
import { authManager } from 'utils/AuthManager'
import { StyledP, StyledButton } from './styles'
import { saveLastUrl } from 'utils/saveLastUrl'

const Login = () => {
  const location = useLocation()

  useEffect(() => saveLastUrl(location), [location])

  return (
    <BackgroundSingleCard>
      <LogoSvg>Item Curator</LogoSvg>
      <StyledP>Seamless and smooth item management.</StyledP>
      <StyledButton
        onClick={async () => {
          await authManager.loginWithPopup()

          const savedPath = sessionStorage.getItem('savedPath')
          window.location.href = savedPath ?? '/'
        }}
      >
        Login with Google
      </StyledButton>
    </BackgroundSingleCard>
  )
}

export default Login

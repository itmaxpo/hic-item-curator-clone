import { useHistory } from 'react-router-dom'

import { BackgroundSingleCard } from 'components/Background'
import { ReactComponent as LogoSvg } from 'icons/itemCuratorLogo.svg'
import { authManager } from 'utils/AuthManager'
import { StyledP, StyledButton } from './styles'

const Login = () => {
  let history = useHistory()

  return (
    <BackgroundSingleCard>
      <LogoSvg>Item Curator</LogoSvg>
      <StyledP>Seamless and smooth item management.</StyledP>
      <StyledButton
        onClick={async () => {
          await authManager.loginWithPopup()
          history.push('/')
        }}
      >
        Login with Google
      </StyledButton>
    </BackgroundSingleCard>
  )
}

export default Login

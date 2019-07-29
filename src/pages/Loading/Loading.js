import React from 'react'
import Background from 'components/Background'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { COLORS } from '@tourlane/tourlane-ui'

/**
 * This is the Loading Page component
 *
 * @name Loading
 * @returns {Object} Loading Page
 */

const Loading = () => (
  <Background>
    <PacmanLoader color={COLORS.ADVENTURE_GREEN} />
  </Background>
)

export default Loading

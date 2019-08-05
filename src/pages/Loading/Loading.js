import React from 'react'
import Background from 'components/Background'
import Loader from 'components/Loader'

/**
 * This is the Loading Page component
 *
 * @name Loading
 * @returns {Object} Loading Page
 */

const Loading = () => (
  <Background>
    <Loader />
  </Background>
)

export default Loading

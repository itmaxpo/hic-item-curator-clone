import React from 'react'
import styled from 'styled-components'
import Loader from 'components/Loader'

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

/**
 * This is the Loading Page component
 *
 * @name Loading
 * @returns {Object} Loading Page
 */

const Loading = () => (
  <Wrapper>
    <Loader />
  </Wrapper>
)

export default Loading

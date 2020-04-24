import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;

  > div {
    flex: ${({ isEditing }) => (isEditing ? '0 35%' : '0 30%')};
  }
`

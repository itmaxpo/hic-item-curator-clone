import React from 'react'
import styled from 'styled-components'
import { BrowserRouter, Switch } from 'react-router-dom'
import PrivateRoute from 'components/PrivateRoute'
import Home from 'pages/Home'
import Login from 'pages/Login'
import { useAuth0 } from 'contexts/Auth/AuthWrapper'

const AppWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
`

function App() {
  const { isAuthenticated, loading } = useAuth0()

  if (loading) {
    return <span>Loading</span>
  }

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <AppWrapper>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="*" component={Home} />
        </Switch>
      </BrowserRouter>
    </AppWrapper>
  )
}

export default App

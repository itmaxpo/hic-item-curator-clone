import React from 'react'
import styled from 'styled-components'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import MissingPage from 'pages/Missing'
import SearchPage from 'pages/Search'
import Login from 'pages/Login'
import Loading from 'pages/Loading'
import SandboxPage from 'pages/Sandbox'
import { useAuth0 } from 'contexts/Auth'

const AppWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
`

/**
 * This is entry container for the whole app
 * Will check if user isAuthenticated, if not - go to Login page
 *
 * @name App
 * @returns App
 */
function App() {
  const { isAuthenticated, loading } = useAuth0()

  if (loading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <AppWrapper>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route exact path="/sandbox" component={SandboxPage} />
          <Route path="*" component={MissingPage} />
        </Switch>
      </BrowserRouter>
    </AppWrapper>
  )
}

export default App
